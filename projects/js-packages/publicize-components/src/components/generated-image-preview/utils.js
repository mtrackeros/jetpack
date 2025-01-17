import { getRedirectUrl } from '@automattic/jetpack-components';

/**
 * Returns the URL to the image generated by the Social Image Generator.
 *
 * @param {string} token - The token for the image.
 * @return {string} - The URL to the image.
 */
export function getSigImageUrl( token ) {
	return token ? getRedirectUrl( 'sigenerate', { query: `t=${ token }` } ) : '';
}
