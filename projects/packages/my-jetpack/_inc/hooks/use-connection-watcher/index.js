/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { useEffect } from 'react';
import { useDispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { STORE_ID } from '../../state/store';
import useMyJetpackConnection from '../use-my-jetpack-connection';
import useMyJetpackNavigate from '../use-my-jetpack-navigate';
import useProducts from '../use-products';

/**
 * React custom hook to watch connection.
 * For instance, when the user is not connected,
 * the hook dispatches an action to populate the global notice.
 */
export default function useConnectionWatcher() {
	const navToConnection = useMyJetpackNavigate( '/connection' );
	const { setGlobalNotice } = useDispatch( STORE_ID );

	const { productsThatRequiresUserConnection } = useProducts();

	const { hasConnectedOwner } = useMyJetpackConnection();

	const requiresUserConnection =
		! hasConnectedOwner && productsThatRequiresUserConnection.length > 0;

	const oneProductMessage = sprintf(
		/* translators: placeholder is product name. */
		__(
			'Jetpack %s needs a user connection to WordPress.com to be able to work.',
			'jetpack-my-jetpack'
		),
		productsThatRequiresUserConnection[ 0 ]
	);

	const message =
		productsThatRequiresUserConnection.length > 1
			? __(
					'Some products need a user connection to WordPress.com to be able to work.',
					'jetpack-my-jetpack'
			  )
			: oneProductMessage;

	useEffect( () => {
		if ( requiresUserConnection ) {
			setGlobalNotice( message, {
				status: 'error',
				actions: [
					{
						label: __( 'Connect your user account to fix this', 'jetpack-my-jetpack' ),
						onClick: navToConnection,
						variant: 'link',
						noDefaultClasses: true,
					},
				],
			} );
		}
	}, [ message, requiresUserConnection, navToConnection, setGlobalNotice ] );
}
