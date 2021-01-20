/**
 * WordPress dependencies
 */
import { registerBlockStyle } from '@wordpress/blocks';
import './view.js';

registerBlockStyle( 'core/gallery', {
	name: 'masonry',
	label: 'Masonry',
} );

registerBlockStyle( 'core/gallery', {
	name: 'tiled',
	label: 'Tiled',
} );
