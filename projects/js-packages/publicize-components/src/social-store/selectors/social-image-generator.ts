import { store as coreStore } from '@wordpress/core-data';
import { createRegistrySelector } from '@wordpress/data';
import { getSocialScriptData } from '../../utils';
import { SIG_SETTINGS_KEY } from '../constants';
import { SocialImageGeneratorConfig, SocialSettingsFields } from '../types';

/**
 * Returns the Social Image Generator settings for the current site.
 */
export const getSocialImageGeneratorConfig = createRegistrySelector( select => () => {
	// @ts-expect-error TS2339 - https://github.com/WordPress/gutenberg/issues/67847
	const { getSite } = select( coreStore );

	const settings = getSite( undefined, { _fields: SIG_SETTINGS_KEY } ) as SocialSettingsFields;

	// If the settings are not available in the store yet, use the default settings.
	return settings?.[ SIG_SETTINGS_KEY ] ?? getSocialScriptData().settings.socialImageGenerator;
} ) as ( state: object ) => SocialImageGeneratorConfig;
