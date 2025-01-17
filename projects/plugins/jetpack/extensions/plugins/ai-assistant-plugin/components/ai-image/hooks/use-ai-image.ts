/**
 * External dependencies
 */
import {
	useImageGenerator,
	ImageStyleObject,
	ImageStyle,
	askQuestionSync,
} from '@automattic/jetpack-ai-client';
import { useDispatch, useSelect } from '@wordpress/data';
import { useCallback, useEffect, useRef, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { cleanForSlug } from '@wordpress/url';
/**
 * Internal dependencies
 */
import useAiFeature from '../../../../../blocks/ai-assistant/hooks/use-ai-feature';
import useSaveToMediaLibrary from '../../../hooks/use-save-to-media-library';
/**
 * Types
 */
import { CoreSelectors, FEATURED_IMAGE_FEATURE_NAME, GENERAL_IMAGE_FEATURE_NAME } from '../types';
import type { CarrouselImageData, CarrouselImages } from '../components/carrousel';
import type { RoleType } from '@automattic/jetpack-ai-client';
import type { FeatureControl } from 'extensions/store/wordpress-com/types.js';

type ImageFeatureControl = FeatureControl & {
	styles: Array< ImageStyleObject > | [];
};

type AiImageType = 'featured-image-generation' | 'general-image-generation';
type AiImageFeature = typeof FEATURED_IMAGE_FEATURE_NAME | typeof GENERAL_IMAGE_FEATURE_NAME;
export type ImageResponse = {
	image?: string;
	libraryId?: string;
	libraryUrl?: string;
	revisedPrompt?: string;
};

export default function useAiImage( {
	feature,
	type,
	cost,
	autoStart = true,
	previousMediaId,
}: {
	feature: AiImageFeature;
	type: AiImageType;
	cost: number;
	autoStart?: boolean;
	previousMediaId?: number;
} ) {
	const { generateImageWithParameters } = useImageGenerator();
	const { increaseRequestsCount, featuresControl } = useAiFeature();
	const { saveToMediaLibrary } = useSaveToMediaLibrary();
	const { createNotice } = useDispatch( 'core/notices' );

	/* Images Control */
	// pointer keeps track of request/generation iteration
	const pointer = useRef( 0 );
	// and current keeps track of what is the image exposed at the moment
	// TODO: should current be any relevant here? It's just modal/carrousel logic after all
	const [ current, setCurrent ] = useState( 0 );
	const [ images, setImages ] = useState< CarrouselImages >( [ { generating: autoStart } ] );

	// map feature-to-control prop, if this goes over 2 options, make a hook for it
	const featureControl = feature === FEATURED_IMAGE_FEATURE_NAME ? 'featured-image' : 'image';
	const imageFeatureControl = featuresControl?.[ featureControl ] as ImageFeatureControl;
	const imageStyles: Array< ImageStyleObject > = imageFeatureControl?.styles;

	/* Merge the image data with the new data. */
	const updateImages = useCallback( ( data: CarrouselImageData, index ) => {
		setImages( currentImages => {
			const newImages = [ ...currentImages ];
			newImages[ index ] = {
				...newImages[ index ],
				...data,
			};
			return newImages;
		} );
	}, [] );

	// the selec/useEffect combo...
	const loadedMedia = useSelect(
		( select: ( store ) => CoreSelectors ) => select( 'core' )?.getMedia?.( previousMediaId ),
		[ previousMediaId ]
	);
	useEffect( () => {
		if ( loadedMedia ) {
			updateImages(
				{
					image: loadedMedia.source_url,
					libraryId: loadedMedia.id,
					libraryUrl: loadedMedia.source_url,
					generating: false,
				},
				pointer.current
			);
		}
	}, [ loadedMedia, updateImages ] );

	/*
	 * Function to show a snackbar notice on the editor.
	 */
	const showSnackbarNotice = useCallback(
		( message: string ) => {
			createNotice( 'success', message, {
				type: 'snackbar',
				isDismissible: true,
			} );
		},
		[ createNotice ]
	);

	/*
	 * Function to update the requests count after a featured image generation.
	 */
	const updateRequestsCount = useCallback( () => {
		increaseRequestsCount( cost );
	}, [ increaseRequestsCount, cost ] );

	/*
	 * Function to suggest a name for the image based on the user prompt.
	 */
	const getImageNameSuggestion = useCallback( ( userPrompt: string ) => {
		if ( ! userPrompt ) {
			return 'image.png';
		}

		const truncatedPrompt = userPrompt.split( ' ' ).slice( 0, 10 ).join( ' ' );
		return cleanForSlug( truncatedPrompt ) + '.png';
	}, [] );

	/*
	 * Function to generate a new image with the current value of the post content.
	 */
	const processImageGeneration = useCallback(
		( {
			userPrompt,
			postContent,
			notEnoughRequests,
			style = null,
		}: {
			userPrompt?: string | null;
			postContent?: string | null;
			notEnoughRequests: boolean;
			style?: string;
		} ) => {
			return new Promise< ImageResponse >( ( resolve, reject ) => {
				if ( previousMediaId && pointer.current === 0 ) {
					pointer.current++;
				}
				updateImages( { generating: true, error: null }, pointer.current );

				// Ensure the site has enough requests to generate the image.
				if ( notEnoughRequests ) {
					updateImages(
						{
							generating: false,
							error: new Error(
								__( "You don't have enough requests to generate another image.", 'jetpack' )
							),
						},
						pointer.current
					);
					resolve( {} );
					return;
				}

				/**
				 * Make a generic call to backend and let it decide the model.
				 */
				const generateImagePromise = generateImageWithParameters( {
					feature,
					size: '1792x1024', // the size, when the generation happens with DALL-E-3
					responseFormat: 'b64_json', // the response format, when the generation happens with DALL-E-3
					messages: [
						{
							role: 'jetpack-ai',
							context: {
								type,
								request: userPrompt ? userPrompt : null,
								content: postContent,
								style,
							},
						},
					],
					style: style || '',
				} );

				const name = getImageNameSuggestion( userPrompt );

				generateImagePromise
					.then( result => {
						if ( result.data.length > 0 ) {
							const image = 'data:image/png;base64,' + result.data[ 0 ].b64_json;
							const prompt = userPrompt || null;
							const revisedPrompt = result.data[ 0 ].revised_prompt || null;
							updateImages( { image, prompt, revisedPrompt }, pointer.current );
							updateRequestsCount();
							saveToMediaLibrary( image, name )
								.then( savedImage => {
									showSnackbarNotice( __( 'Image saved to media library.', 'jetpack' ) );
									updateImages(
										{ libraryId: savedImage?.id, libraryUrl: savedImage?.url, generating: false },
										pointer.current
									);
									pointer.current += 1;
									resolve( {
										image,
										libraryId: savedImage?.id,
										libraryUrl: savedImage?.url,
										revisedPrompt,
									} );
								} )
								.catch( () => {
									updateImages( { generating: false }, pointer.current );
									pointer.current += 1;
									resolve( { image } );
								} );
						}
					} )
					.catch( e => {
						updateImages( { generating: false, error: e }, pointer.current );
						reject( e );
					} );
			} );
		},
		[
			updateImages,
			generateImageWithParameters,
			feature,
			type,
			updateRequestsCount,
			saveToMediaLibrary,
			showSnackbarNotice,
			getImageNameSuggestion,
			previousMediaId,
		]
	);

	const handlePreviousImage = useCallback( () => {
		setCurrent( Math.max( current - 1, 0 ) );
	}, [ current ] );

	const handleNextImage = useCallback( () => {
		setCurrent( Math.min( current + 1, images.length - 1 ) );
	}, [ current, images.length ] );

	const guessStyle = useCallback(
		async function (
			prompt: string,
			requestType: string = '',
			content: string = ''
		): Promise< ImageStyle | null > {
			if ( ! imageStyles || ! imageStyles.length ) {
				return null;
			}

			const messages = [
				{
					role: 'jetpack-ai' as RoleType,
					context: {
						type: requestType || 'general-image-guess-style',
						request: prompt,
						content,
					},
				},
			];

			try {
				const style = await askQuestionSync( messages, { feature: 'jetpack-ai-image-generator' } );

				if ( ! style ) {
					return null;
				}
				const styleObject = imageStyles.find( ( { value } ) => value === style );

				if ( ! styleObject ) {
					return null;
				}

				return styleObject.value;
			} catch ( error ) {
				Promise.reject( error );
			}
		},
		[ imageStyles ]
	);

	return {
		current,
		setCurrent,
		processImageGeneration,
		handlePreviousImage,
		handleNextImage,
		currentImage: images[ current ],
		currentPointer: images[ pointer.current ],
		images,
		pointer,
		imageStyles,
		guessStyle,
	};
}
