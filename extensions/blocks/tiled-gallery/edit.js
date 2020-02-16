/**
 * External Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { filter, get, pick } from 'lodash';
import {
	BlockControls,
	BlockIcon,
	InspectorControls,
	MediaPlaceholder,
	MediaUpload,
} from '@wordpress/block-editor';
import { mediaUpload } from '@wordpress/editor';
import {
	DropZone,
	FormFileUpload,
	PanelBody,
	RangeControl,
	SelectControl,
	Toolbar,
	withNotices,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import FilterToolbar from './filter-toolbar';
import Layout from './layout';
import { ALLOWED_MEDIA_TYPES, LAYOUT_STYLES, MAX_COLUMNS, MAX_GUTTER } from './constants';
import { getActiveStyleName } from '../../shared/block-styles';
import { icon } from '.';
import EditButton from '../../shared/edit-button';

const linkOptions = [
	{ value: 'attachment', label: __( 'Attachment Page', 'jetpack' ) },
	{ value: 'media', label: __( 'Media File', 'jetpack' ) },
	{ value: 'none', label: __( 'None', 'jetpack' ) },
];

// @TODO keep here or move to ./layout ?
function layoutSupportsColumns( layout ) {
	return [ 'columns', 'circle', 'square' ].includes( layout );
}

function layoutSupportsGutter( layout ) {
	return [ 'columns', 'rectangular' ].includes( layout );
}

export function defaultColumnsNumber( attributes ) {
	return Math.min( 3, attributes.images.length );
}

export const pickRelevantMediaFiles = image => {
	const imageProps = pick( image, [ [ 'alt' ], [ 'id' ], [ 'link' ] ] );
	imageProps.url =
		get( image, [ 'sizes', 'large', 'url' ] ) ||
		get( image, [ 'media_details', 'sizes', 'large', 'source_url' ] ) ||
		image.url;
	return imageProps;
};

class TiledGalleryEdit extends Component {
	state = {
		selectedImage: null,
	};

	static getDerivedStateFromProps( props, state ) {
		// Deselect images when deselecting the block
		if ( ! props.isSelected && null !== state.selectedImage ) {
			return { selectedImage: null };
		}
		return null;
	}

	setAttributes( attributes ) {
		if ( attributes.ids ) {
			throw new Error(
				'The "ids" attribute should not be changed directly. It is managed automatically when "images" attribute changes'
			);
		}

		if ( attributes.images ) {
			attributes = {
				...attributes,
				ids: attributes.images.map( ( { id } ) => parseInt( id, 10 ) ),
			};
		}

		this.props.setAttributes( attributes );
	}

	addFiles = files => {
		const currentImages = this.props.attributes.images || [];
		const { noticeOperations } = this.props;
		mediaUpload( {
			allowedTypes: ALLOWED_MEDIA_TYPES,
			filesList: files,
			onFileChange: images => {
				const imagesNormalized = images.map( image => pickRelevantMediaFiles( image ) );
				this.setAttributes( { images: currentImages.concat( imagesNormalized ) } );
			},
			onError: noticeOperations.createErrorNotice,
		} );
	};

	onRemoveImage = index => () => {
		const images = filter( this.props.attributes.images, ( img, i ) => index !== i );
		const { columns } = this.props.attributes;
		this.setState( {
			selectedImage: null,
		} );
		this.setAttributes( {
			images,
			columns: columns ? Math.min( images.length, columns ) : columns,
		} );
	};

	onSelectImage = index => () => {
		if ( this.state.selectedImage !== index ) {
			this.setState( {
				selectedImage: index,
			} );
		}
	};

	onSelectImages = images => {
		const { columns } = this.props.attributes;
		this.setAttributes( {
			columns: columns ? Math.min( images.length, columns ) : columns,
			images: images.map( image => pickRelevantMediaFiles( image ) ),
		} );
	};

	setColumnsNumber = value => this.setAttributes( { columns: value } );

	setGutter = value => this.setAttributes( { gutter: value } );

	setImageAttributes = index => attributes => {
		const {
			attributes: { images },
		} = this.props;
		if ( ! images[ index ] ) {
			return;
		}
		this.setAttributes( {
			images: [
				...images.slice( 0, index ),
				{ ...images[ index ], ...attributes },
				...images.slice( index + 1 ),
			],
		} );
	};

	setLinkTo = value => this.setAttributes( { linkTo: value } );

	uploadFromFiles = event => this.addFiles( event.target.files );

	render() {
		const { selectedImage } = this.state;
		const {
			attributes,
			isSelected,
			className,
			noticeOperations,
			noticeUI,
			setAttributes,
		} = this.props;
		const {
			align,
			columns = defaultColumnsNumber( attributes ),
			gutter,
			imageFilter,
			images,
			linkTo,
		} = attributes;

		const dropZone = <DropZone onFilesDrop={ this.addFiles } />;

		const controls = (
			<BlockControls>
				{ !! images.length && (
					<Fragment>
						<Toolbar>
							<MediaUpload
								onSelect={ this.onSelectImages }
								allowedTypes={ ALLOWED_MEDIA_TYPES }
								multiple
								gallery
								value={ images.map( img => img.id ) }
								render={ ( { open } ) => (
									<EditButton label={ __( 'Edit Gallery', 'jetpack' ) } onClick={ open } />
								) }
							/>
						</Toolbar>
						<FilterToolbar
							value={ imageFilter }
							onChange={ value => {
								setAttributes( { imageFilter: value } );
								this.setState( { selectedImage: null } );
							} }
						/>
					</Fragment>
				) }
			</BlockControls>
		);

		if ( images.length === 0 ) {
			return (
				<Fragment>
					{ controls }
					<MediaPlaceholder
						icon={ <BlockIcon icon={ icon } /> }
						className={ className }
						labels={ {
							title: __( 'Tiled Gallery', 'jetpack' ),
							name: __( 'images', 'jetpack' ),
						} }
						onSelect={ this.onSelectImages }
						accept="image/*"
						allowedTypes={ ALLOWED_MEDIA_TYPES }
						multiple
						notices={ noticeUI }
						onError={ noticeOperations.createErrorNotice }
					/>
				</Fragment>
			);
		}

		const layoutStyle = getActiveStyleName( LAYOUT_STYLES, attributes.className );

		return (
			<Fragment>
				{ controls }
				<InspectorControls>
					<PanelBody title={ __( 'Tiled Gallery settings', 'jetpack' ) }>
						{ layoutSupportsColumns( layoutStyle ) && images.length > 1 && (
							<RangeControl
								label={ __( 'Columns', 'jetpack' ) }
								value={ columns }
								onChange={ this.setColumnsNumber }
								min={ 1 }
								max={ Math.min( MAX_COLUMNS, images.length ) }
							/>
						) }
						{ layoutSupportsGutter( layoutStyle ) && images.length > 1 && (
							<RangeControl
								label={ __( 'Gutter', 'jetpack' ) }
								value={ gutter }
								onChange={ this.setGutter }
								min={ 0 }
								max={ MAX_GUTTER }
							/>
						) }
						<SelectControl
							label={ __( 'Link To', 'jetpack' ) }
							value={ linkTo }
							onChange={ this.setLinkTo }
							options={ linkOptions }
						/>
					</PanelBody>
				</InspectorControls>

				{ noticeUI }

				<Layout
					align={ align }
					className={ className }
					columns={ columns }
					gutter={ gutter }
					imageFilter={ imageFilter }
					images={ images }
					layoutStyle={ layoutStyle }
					linkTo={ linkTo }
					onRemoveImage={ this.onRemoveImage }
					onSelectImage={ this.onSelectImage }
					selectedImage={ isSelected ? selectedImage : null }
					setImageAttributes={ this.setImageAttributes }
				>
					{ dropZone }
					{ isSelected && (
						<div className="tiled-gallery__add-item">
							<FormFileUpload
								multiple
								isLarge
								className="tiled-gallery__add-item-button"
								onChange={ this.uploadFromFiles }
								accept="image/*"
								icon="insert"
							>
								{ __( 'Upload an image', 'jetpack' ) }
							</FormFileUpload>
						</div>
					) }
				</Layout>
			</Fragment>
		);
	}
}

export default withNotices( TiledGalleryEdit );
