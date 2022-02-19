<?php

/**
 * Module Name: Custom CSS
 * Module Description: Adds options for CSS preprocessor use, disabling the theme's CSS, or custom image width.
 * Sort Order: 2
 * First Introduced: 1.7
 * Requires Connection: No
 * Auto Activate: No
 * Module Tags: Appearance
 * Feature: Appearance
 * Additional Search Queries: css, customize, custom, style, editor, less, sass, preprocessor, font, mobile, appearance, theme, stylesheet
 */

function jetpack_load_custom_css() {
	// If WordPress has the core version of Custom CSS, load our new version.
	// @see https://core.trac.wordpress.org/changeset/38829
	if ( function_exists( 'wp_get_custom_css' ) ) {
		if ( ! Jetpack_Options::get_option( 'custom_css_4.7_migration' ) ) {
			include_once dirname( __FILE__ ) . '/custom-css/migrate-to-core.php';
		}

		include_once dirname( __FILE__ ) . '/custom-css/custom-css/preprocessors.php';
		include_once dirname( __FILE__ ) . '/custom-css/custom-css-4.7.php';
		return;
	}

	include_once dirname( __FILE__ ) . "/custom-css/custom-css.php";
	add_action( 'init', array( 'Jetpack_Custom_CSS', 'init' ) );
}

add_action( 'jetpack_modules_loaded', 'custom_css_loaded' );

function custom_css_loaded() {
	Jetpack::enable_module_configurable( __FILE__ );
	add_filter( 'jetpack_module_configuration_url_custom-css', 'jetpack_custom_css_configuration_url' );

}

/**
 * Overrides default configuration url
 *
 * @uses admin_url
 * @return string module settings URL
 */
function jetpack_custom_css_configuration_url( $default_url ) {
	return Jetpack_Custom_CSS_Enhancements::customizer_link(
		array( 'return_url' => wp_get_referer() )
	);
}


jetpack_load_custom_css();
