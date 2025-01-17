import moment from 'moment';
import { useEffect, useState } from 'react';
import MediaLoadingPlaceholder from '../../media-browser/placeholder';
import { getGooglePhotosPickerCachedSessionId } from '../../media-service';
import { MediaSource } from '../../media-service/types';
import withMedia from '../with-media';
import GooglePhotosAuth from './google-photos-auth';
import GooglePhotosAuthUpgrade from './google-photos-auth-upgrade';
import GooglePhotosMedia from './google-photos-media';
import GooglePhotosPickerButton from './google-photos-picker-button';

function GooglePhotos( props ) {
	const {
		isAuthenticated,
		pickerSession,
		createPickerSession,
		fetchPickerSession,
		getPickerStatus,
		setAuthenticated,
	} = props;

	const [ cachedSessionId ] = useState( getGooglePhotosPickerCachedSessionId() );
	const [ pickerFeatureEnabled, setPickerFeatureEnabled ] = useState( null );
	const [ isCachedSessionChecked, setIsCachedSessionChecked ] = useState( false );
	const [ isAuthUpgradeRequired, setIsAuthUpgradeRequired ] = useState( false );

	const isLoadingState = pickerFeatureEnabled === null;
	const isPickerSessionAccurate = pickerSession !== null && ! ( 'code' in pickerSession );
	const isSessionExpired =
		pickerSession?.expireTime && moment( pickerSession.expireTime ).isBefore( new Date() );

	// Check if the picker feature is enabled and the connection status
	useEffect( () => {
		getPickerStatus().then( picker => {
			setPickerFeatureEnabled( picker.enabled );

			switch ( picker.connection_status ) {
				case 'ok':
					setAuthenticated( true );
					setIsAuthUpgradeRequired( false );
					break;

				case 'invalid':
					setAuthenticated( true );
					setIsAuthUpgradeRequired( true );
					break;

				case 'not_connected':
					setAuthenticated( false );
					setIsAuthUpgradeRequired( false );
					break;
			}
		} );
	}, [ isAuthenticated, getPickerStatus, setAuthenticated ] );

	// Check if the user has a cached session
	useEffect( () => {
		if ( pickerFeatureEnabled && isAuthenticated && ! isAuthUpgradeRequired ) {
			Promise.resolve( cachedSessionId )
				.then( id => ( id ? fetchPickerSession( id ) : id ) )
				.finally( () => setIsCachedSessionChecked( true ) );
		}
	}, [
		isAuthenticated,
		pickerFeatureEnabled,
		isAuthUpgradeRequired,
		cachedSessionId,
		fetchPickerSession,
	] );

	// Create a new picker session if the cached session is not accurate
	// or if the session has expired
	useEffect( () => {
		if (
			pickerFeatureEnabled &&
			isCachedSessionChecked &&
			isAuthenticated &&
			! isAuthUpgradeRequired &&
			( ! isPickerSessionAccurate || isSessionExpired )
		) {
			createPickerSession();
		}
	}, [
		pickerFeatureEnabled,
		isAuthUpgradeRequired,
		isCachedSessionChecked,
		isPickerSessionAccurate,
		isAuthenticated,
		isSessionExpired,
		createPickerSession,
		pickerSession,
	] );

	if ( isLoadingState ) {
		return <MediaLoadingPlaceholder />;
	}

	if ( ! isAuthenticated ) {
		return <GooglePhotosAuth { ...props } />;
	}

	if ( isAuthUpgradeRequired ) {
		return <GooglePhotosAuthUpgrade { ...props } />;
	}

	if ( pickerFeatureEnabled && ! pickerSession?.mediaItemsSet ) {
		return <GooglePhotosPickerButton { ...props } />;
	}

	return <GooglePhotosMedia pickerFeatureEnabled={ pickerFeatureEnabled } { ...props } />;
}

export default withMedia( MediaSource.GooglePhotos )( GooglePhotos );
