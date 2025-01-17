import { Dialog, ProductOffer, TermsOfService } from '@automattic/jetpack-components';
import { useConnection } from '@automattic/jetpack-connection';
import { __ } from '@wordpress/i18n';
import React from 'react';
import background from './background.svg';
import illustration from './illustration.png';
import styles from './styles.module.scss';

const ConnectionScreen = () => {
	const { userIsConnecting, siteIsRegistering, handleRegisterSite, registrationError } =
		useConnection( {
			from: 'jetpack-social',
			redirectUri: 'admin.php?page=jetpack-social',
		} );

	const buttonText = __( 'Get Started', 'jetpack-social' );

	return (
		<Dialog
			className={ styles.card }
			primary={
				<div className={ styles.column }>
					<ProductOffer
						className={ styles.offer }
						slug={ 'jetpack-social' }
						title={ __( 'Jetpack Social', 'jetpack-social' ) }
						subTitle={ __(
							'Share your posts with your social media network and increase your site’s traffic',
							'jetpack-social'
						) }
						features={ [
							__(
								'Share to Facebook, Instagram, LinkedIn, Mastodon, Tumblr, Threads, Bluesky, and Nextdoor',
								'jetpack-social'
							),
							__( 'Post to multiple channels at once', 'jetpack-social' ),
							__( 'Manage all of your channels from a single hub', 'jetpack-social' ),
						] }
						isCard={ false }
						isBundle={ false }
						onAdd={ handleRegisterSite }
						buttonText={ buttonText }
						icon="social"
						isLoading={ siteIsRegistering || userIsConnecting }
						buttonDisclaimer={
							<TermsOfService
								className={ styles[ 'terms-of-service' ] }
								agreeButtonLabel={ buttonText }
							/>
						}
						error={
							registrationError
								? __( 'An error occurred. Please try again.', 'jetpack-social' )
								: null
						}
					/>
				</div>
			}
			secondary={
				<div className={ styles.sidebar }>
					<img className={ styles.background } src={ background } alt="" />
					<img className={ styles.illustration } src={ illustration } alt="" />
				</div>
			}
		/>
	);
};

export default ConnectionScreen;
