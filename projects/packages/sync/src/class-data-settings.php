<?php
/**
 * The Data Settings class.
 *
 * @package automattic/jetpack-sync
 */

namespace Automattic\Jetpack\Sync;

/**
 * The Data_Settings class
 */
class Data_Settings {

	const DATA_FILTER_DEFAULTS = array(
		'jetpack_sync_modules'                      => array( 'Automattic\\Jetpack\\Sync\\Modules', 'DEFAULT_SYNC_MODULES' ),
		'jetpack_sync_options_whitelist'            => array( 'Automattic\Jetpack\Sync\Defaults', 'default_options_whitelist' ),
		'jetpack_sync_options_contentless'          => array( 'Automattic\Jetpack\Sync\Defaults', 'default_options_contentless' ),
		'jetpack_sync_constants_whitelist'          => array( 'Automattic\Jetpack\Sync\Defaults', 'default_constants_whitelist' ),
		'jetpack_sync_callable_whitelist'           => array( 'Automattic\Jetpack\Sync\Defaults', 'default_callable_whitelist' ),
		'jetpack_sync_multisite_callable_whitelist' => array( 'Automattic\Jetpack\Sync\Defaults', 'default_multisite_callable_whitelist' ),
		'jetpack_sync_post_meta_whitelist'          => array( 'Automattic\Jetpack\Sync\Defaults', 'post_meta_whitelist' ),
		'jetpack_sync_comment_meta_whitelist'       => array( 'Automattic\Jetpack\Sync\Defaults', 'comment_meta_whitelist' ),
		'jetpack_sync_capabilities_whitelist'       => array( 'Automattic\Jetpack\Sync\Defaults', 'default_capabilities_whitelist' ),
		'jetpack_sync_known_importers'              => array( 'Automattic\Jetpack\Sync\Defaults', 'default_known_importers' ),
	);

	/**
	 * The data associated with these filters are associative arrays.
	 */
	const ASSOCIATIVE_FILTERS = array(
		'jetpack_sync_callable_whitelist',
		'jetpack_sync_multisite_callable_whitelist',
	);

	/**
	 * A static property containing the Sync data settings.
	 *
	 * @var array
	 */
	private static $data_settings = array();

	/**
	 * Adds the data settings provided by a plugin to the Sync data settings.
	 *
	 * @param array $plugin_settings The array provided by the plugin. The array must use filters
	 *                               from the DATA_FILTER_DEFAULTS list as keys.
	 */
	public function add_settings_list( $plugin_settings ) {
		foreach ( self::DATA_FILTER_DEFAULTS as $filter => $default_value ) {

			if ( isset( $plugin_settings[ $filter ] ) && is_array( $plugin_settings[ $filter ] ) ) {
				// If the plugin provided a data setting for this filter, use it.
				$setting = $plugin_settings[ $filter ];

			} else {
				// If the plugin didn't provide a data setting for this filter, use the default.
				$setting = $this->get_default_value_for_filter( $filter );

				if ( isset( static::$data_settings[ $filter ] ) && $setting === static::$data_settings[ $filter ] ) {
					// If the current setting is the default, we don't need to add the default list again.
					continue;
				}
			}

			$this->add_filter_setting( $filter, $setting );
		}

		if ( ! did_action( 'jetpack_sync_set_data_filters' ) ) {
			// Set the sync data filters only once.
			add_action( 'plugins_loaded', array( $this, 'set_sync_data_filters' ) );
			do_action( 'jetpack_sync_set_data_filters' );
		}
	}

	/**
	 * Returns the default data settings list for the provided filter.
	 *
	 * @param string $filter The filter name.
	 *
	 * @return array The default list of data settings.
	 */
	private function get_default_value_for_filter( $filter ) {
		$default_value = self::DATA_FILTER_DEFAULTS[ $filter ];

		if ( 'jetpack_sync_modules' === $filter ) {
			// The modules list is a class constant.
			$setting = constant( $default_value[0] . '::' . $default_value[1] );

		} else {
			// The default lists are class properties.
			$value   = $default_value[1];
			$setting = $default_value[0]::$$value;
		}

		return $setting;
	}

	/**
	 * Adds the provided data setting for the provided filter.
	 *
	 * @param string $filter The filter name.
	 * @param array  $value The data setting.
	 */
	private function add_filter_setting( $filter, $value ) {
		if ( ! isset( static::$data_settings[ $filter ] ) ) {
			static::$data_settings[ $filter ] = $value;
			return;
		}

		if ( in_array( $filter, self::ASSOCIATIVE_FILTERS, true ) ) {
			$this->add_associative_filter_setting( $filter, $value );
		} else {
			$this->add_indexed_filter_setting( $filter, $value );
		}
	}

	/**
	 * Adds the provided data setting for the provided filter. This method handles
	 * adding settings to data that is stored as an associative array.
	 *
	 * @param string $filter The filter name.
	 * @param array  $value The data setting.
	 */
	private function add_associative_filter_setting( $filter, $value ) {
		foreach ( $value as $key => $item ) {
			if ( ! array_key_exists( $key, static::$data_settings[ $filter ] ) ) {
				static::$data_settings[ $filter ][ $key ] = $value;
			}
		}
	}

	/**
	 * Adds the provided data setting for the provided filter. This method handles
	 * adding settings to data that is stored as an indexed array.
	 *
	 * @param string $filter The filter name.
	 * @param array  $value The data setting.
	 */
	private function add_indexed_filter_setting( $filter, $value ) {
		foreach ( $value as $item ) {
			if ( ! in_array( $item, static::$data_settings[ $filter ], true ) ) {
				static::$data_settings[ $filter ][] = $item;
			}
		}
	}

	/**
	 * Sets up the Sync data setting filters. Each filter will return the list of
	 * data settings contained in the $data_settings property.
	 */
	public function set_sync_data_filters() {
		foreach ( static::$data_settings as $filter => $value ) {
			add_filter( $filter, array( $this, 'add_sync_data_settings' ), 999, 1 );
		}
	}

	/**
	 * The callback function added to the sync data filters.
	 *
	 * @param array $filtered_values The data revieved from the filter.
	 *
	 * @return array The data settings for the filter.
	 */
	public function add_sync_data_settings( $filtered_values ) {
		$current_filter = current_filter();

		if ( in_array( $current_filter, self::ASSOCIATIVE_FILTERS, true ) ) {
			foreach ( $filtered_values as $key => $item ) {
				if ( ! array_key_exists( $key, $this->get_default_value_for_filter( $current_filter ) ) ) {
					$this->add_associative_filter_setting( $current_filter, array( $key => $item ) );
				}
			}
		} else {
			foreach ( $filtered_values as $item ) {
				if ( ! in_array( $item, $this->get_default_value_for_filter( $current_filter ), true ) ) {
					$this->add_indexed_filter_setting( $current_filter, array( $item ) );
				}
			}
		}

		return static::$data_settings[ $current_filter ];
	}
}
