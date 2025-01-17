import {
	SocialImageGeneratorConfig,
	SocialPluginSettings,
	UtmSettingsConfig,
	SocialStoreState,
} from './social-store/types';

export interface SocialUrls {
	connectionsManagementPage: string;
}

export type SharesData = {
	to_be_publicized_count: number;
	publicized_count: number;
	shared_posts_count: number;
};

export interface FeatureFlags {
	useAdminUiV1: boolean;
	useEditorPreview: boolean;
	useShareStatus: boolean;
}

export type ConnectionService = {
	ID: string;
	label: string;
	type: 'publicize' | 'other';
	description: string;
	connect_URL: string;
	external_users_only?: boolean;
	multiple_external_user_ID_support?: boolean;
};

export interface ApiPaths {
	refreshConnections: string;
	resharePost: string;
}

export type SocialSettings = {
	socialImageGenerator: SocialImageGeneratorConfig;
	utmSettings: UtmSettingsConfig;
	socialPlugin: SocialPluginSettings;
};

export type PluginInfo = Record< 'social' | 'jetpack', { version: string } >;

export interface SocialScriptData {
	api_paths: ApiPaths;
	feature_flags: FeatureFlags;
	is_publicize_enabled: boolean;
	plugin_info: PluginInfo;
	settings: SocialSettings;
	shares_data: SharesData;
	store_initial_state: SocialStoreState;
	supported_services: Array< ConnectionService >;
	urls: SocialUrls;
}
