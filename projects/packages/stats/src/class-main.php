<?php
/**
 * Stats Main
 *
 * @package automattic/jetpack-stats
 */

namespace Automattic\Jetpack\Stats;

use Automattic\Jetpack\Connection\Manager as Connection_Manager;
use Automattic\Jetpack\Status;
use Automattic\Jetpack\Status\Visitor;
use WP_User;

/**
 * Stats Main class.
 *
 * Entrypoint for Stats.
 *
 * @since $$next-version$$
 */
class Main {

	/**
	 * Singleton Main instance.
	 *
	 * @var Main
	 **/
	private static $instance = null;

	/**
	 * Initializer.
	 *
	 * @return object
	 */
	public static function init() {
		if ( null === self::$instance ) {
			self::$instance = new Main();
		}

		return self::$instance;
	}

	/**
	 * Class constructor.
	 *
	 * @return void
	 */
	private function __construct() {
		defined( 'STATS_VERSION' ) || define( 'STATS_VERSION', '9' );
		defined( 'STATS_DASHBOARD_SERVER' ) || define( 'STATS_DASHBOARD_SERVER', 'dashboard.wordpress.com' );
		// Generate the tracking code after wp() has queried for posts.
		add_action( 'template_redirect', array( __CLASS__, 'template_redirect' ), 1 );

		add_action( 'wp_head', array( __CLASS__, 'hide_smile_css' ) );
		add_action( 'embed_head', array( __CLASS__, 'hide_smile_css' ) );

		// Map stats caps.
		add_filter( 'map_meta_cap', array( __CLASS__, 'map_meta_caps' ), 10, 3 );

		XMLRPC::init();
	}

	/**
	 * Checks if filter is set and dnt is enabled.
	 *
	 * @return bool
	 */
	public static function jetpack_is_dnt_enabled() {
		/**
		 * Filter the option which decides honor DNT or not.
		 *
		 * @module stats
		 * @since-jetpack 6.1.0
		 *
		 * @param bool false Honors DNT for clients who don't want to be tracked. Defaults to false. Set to true to enable.
		 */
		if ( false === apply_filters( 'jetpack_honor_dnt_header_for_stats', false ) ) {
			return false;
		}

		foreach ( $_SERVER as $name => $value ) {
			if ( 'http_dnt' === strtolower( $name ) && 1 === (int) $value ) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Maps view_stats cap to read cap as needed.
	 *
	 * @access public
	 * @param mixed $caps Caps.
	 * @param mixed $cap Cap.
	 * @param mixed $user_id User ID.
	 * @return array Possibly mapped capabilities for meta capability.
	 */
	public static function map_meta_caps( $caps, $cap, $user_id ) {
		// Map view_stats to exists.
		if ( 'view_stats' === $cap ) {
			$user        = new WP_User( $user_id );
			$user_role   = array_shift( $user->roles );
			$stats_roles = Options::get_option( 'roles' );

			// Is the users role in the available stats roles?
			if ( is_array( $stats_roles ) && in_array( $user_role, $stats_roles, true ) ) {
				$caps = array( 'read' );
			}
		}

		return $caps;
	}

	/**
	 * Stats Template Redirect.
	 *
	 * @access public
	 * @return void
	 */
	public static function template_redirect() {
		global $current_user;

		if (
			is_feed()
			|| is_robots()
			|| is_embed()
			|| is_trackback()
			|| is_preview()
			|| self::jetpack_is_dnt_enabled()
		) {
			return;
		}

		// @todo Is it ok to assume tracking will be enabled for any connected site?
		if ( ! ( new Connection_Manager() )->is_connected() ) {
			return;
		}

		// Staging Sites should not generate tracking stats.
		$status = new Status();
		if ( $status->is_staging_site() ) {
			return;
		}

		// Should we be counting this user's views?
		if ( ! empty( $current_user->ID ) ) {
			$count_roles = Options::get_option( 'count_roles' );
			if ( ! is_array( $count_roles ) || ! array_intersect( $current_user->roles, $count_roles ) ) {
				return;
			}
		}

		/**
		 * Allow excluding specific IP addresses from being tracked in Stats.
		 * Note: for this to work well, visitors' IP addresses must:
		 * - be stored and returned properly in IP address headers;
		 * - not be impacted by any caching setup on your site.
		 *
		 * @module stats
		 *
		 * @since-jetpack 10.6
		 *
		 * @param array $excluded_ips An array of IP address strings to exclude from tracking.
		 */
		$excluded_ips = (array) apply_filters( 'jetpack_stats_excluded_ips', array() );

		// Should we be counting views for this IP address?
		$current_user_ip = ( new Visitor() )->get_ip( true );
		if (
			! empty( $excluded_ips )
			&& in_array( $current_user_ip, $excluded_ips, true )
		) {
			return;
		}

		add_action( 'wp_footer', array( 'Automattic\Jetpack\Stats\Tracking_Pixel', 'add_to_footer' ), 101 );
		add_action( 'web_stories_print_analytics', array( 'Automattic\Jetpack\Stats\Tracking_Pixel', 'add_to_footer' ), 101 );
	}

	/**
	 * CSS to hide the tracking pixel smiley.
	 * It is now hidden for everyone (used to be visible if you had set the hide_smile option).
	 *
	 * @access public
	 * @return void
	 */
	public static function hide_smile_css() {
		?>
	<style>img#wpstats{display:none}</style>
		<?php
	}

	/**
	 * Modified from stripslashes_deep()
	 *
	 * @todo Find a better home for this. Do we really need it though?
	 *
	 * @param mixed $value Value.
	 * @return string
	 */
	public static function esc_html_deep( $value ) {
		if ( is_array( $value ) ) {
			$value = array_map( array( 'Automattic\Jetpack\Stats\Main', 'esc_html_deep' ), $value );
		} elseif ( is_object( $value ) ) {
			$vars = get_object_vars( $value );
			foreach ( $vars as $key => $data ) {
				$value->{$key} = self::esc_html_deep( $data );
			}
		} elseif ( is_string( $value ) ) {
			$value = esc_html( $value );
		}

		return $value;
	}
}
