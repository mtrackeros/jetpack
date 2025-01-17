import { store as coreStore } from '@wordpress/core-data';
import { createRegistrySelector } from '@wordpress/data';
import { getSocialScriptData } from '../../utils';
import { SocialPluginSettings } from '../types';

/**
 * Returns the Social plugin settings.
 */
export const getSocialPluginSettings = createRegistrySelector( select => () => {
	const data = select( coreStore ).getEntityRecord( 'jetpack/v4', 'social/settings', undefined );

	return data ?? getSocialScriptData().settings.socialPlugin;
} ) as ( state: object ) => SocialPluginSettings;

/**
 * Returns whether the Social plugin settings are being saved
 *
 * @type {() => boolean} Whether the Social plugin settings are being saved
 */
export const isSavingSocialPluginSettings = createRegistrySelector( select => () => {
	return select( coreStore ).isSavingEntityRecord( 'jetpack/v4', 'social/settings', undefined );
} ) as () => boolean;
