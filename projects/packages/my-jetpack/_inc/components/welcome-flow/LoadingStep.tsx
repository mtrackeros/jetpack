import { Col, Text } from '@automattic/jetpack-components';
import { SVG, Path } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';
import clsx from 'clsx';
import ProductsIcons from './ProductsIcons';
import styles from './style.module.scss';

const JetpackLogo = () => (
	<SVG className={ styles.logo } viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
		<Path
			className={ styles[ 'circle-outline' ] }
			d="M44 86C67.196 86 86 67.196 86 44C86 20.804 67.196 2 44 2C20.804 2 2 20.804 2 44C2 67.196 20.804 86 44 86Z"
			stroke="#003010"
			strokeWidth="1"
		/>
		<Path
			className={ styles[ 'triangles-outline' ] }
			d="M41.7319 8.73633V51.3088H19.8159L41.7319 8.73633ZM46.1835 79.2694V36.6129H68.1835L46.1835 79.2694Z"
			stroke="#003010"
			strokeWidth="1"
		/>
		<Path
			className={ styles[ 'circle-fill' ] }
			d="M44 88C68.3005 88 88 68.3005 88 44C88 19.6995 68.3005 0 44 0C19.6995 0 0 19.6995 0 44C0 68.3005 19.6995 88 44 88Z"
			fill="#003010"
		/>
		<Path
			className={ styles[ 'triangles-fill' ] }
			fillRule="evenodd"
			clipRule="evenodd"
			d="M41.7319 8.73633V51.3088H19.8159L41.7319 8.73633ZM46.1835 79.2694V36.6129H68.1835L46.1835 79.2694Z"
			fill="#48FF50"
		/>
	</SVG>
);

interface LoadingStepProps {
	type: string;
	isReady?: boolean;
}

const LoadingStep = ( { type, isReady }: LoadingStepProps ) => {
	if ( type === 'connecting' ) {
		const connectingTitle = __( 'Connecting Jetpack', 'jetpack-my-jetpack' );
		const connectingDescription = __(
			'Getting things ready in the background — almost there!',
			'jetpack-my-jetpack'
		);
		const connectionReadyTitle = sprintf(
			/* translators: %s: is an emoji */
			__( 'Jetpack is connected %s', 'jetpack-my-jetpack' ),
			'🎉'
		);
		const connectionReadyDescription = __(
			'You’re connected and ready to fly!',
			'jetpack-my-jetpack'
		);

		return (
			<Col className={ styles[ 'loading-banner' ] }>
				<div
					className={ clsx( styles[ 'loader-container' ], {
						[ styles[ 'connection-ready' ] ]: isReady,
					} ) }
				>
					<JetpackLogo />
				</div>
				<Text variant="headline-small" mb={ 1 }>
					{ ! isReady ? connectingTitle : connectionReadyTitle }
				</Text>
				<Text variant="body">
					{ ! isReady ? connectingDescription : connectionReadyDescription }
				</Text>
			</Col>
		);
	}

	if ( type === 'recommendations' ) {
		return (
			<Col className={ styles[ 'loading-banner' ] }>
				<div className={ clsx( styles[ 'loader-container' ], styles.recommendations ) }>
					<ProductsIcons />
					<JetpackLogo />
				</div>
				<Text variant="headline-small" mb={ 1 }>
					{ __( 'Crafting your unique journey', 'jetpack-my-jetpack' ) }
				</Text>
				<Text variant="body">
					{ __(
						'Hang tight while we personalize recommendations to suit your style.',
						'jetpack-my-jetpack'
					) }
				</Text>
			</Col>
		);
	}

	return <></>;
};

export default LoadingStep;
