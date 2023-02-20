import { BlockIcon } from '@wordpress/block-editor';
import { Placeholder } from '@wordpress/components';
// import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import './editor.scss';
import icon from './icon';

function BloggingPromptsBetaEdit( {
	// attributes,
	className,
	// noticeOperations,
	noticeUI,
	// setAttributes,
} ) {
	/**
	 * Write the block editor UI.
	 *
	 * @returns {object} The UI displayed when user edits this block.
	 */
	// const [ notice, setNotice ] = useState();

	/* Call this function when you want to show an error in the placeholder. */
	// const setErrorNotice = () => {
	// 	noticeOperations.removeAllNotices();
	// 	noticeOperations.createErrorNotice( __( 'Put error message here.', 'jetpack' ) );
	// };

	return (
		<div className={ className }>
			<Placeholder
				label={ __( 'Writing Prompts', 'jetpack' ) }
				instructions={ __( 'Instructions go here.', 'jetpack' ) }
				icon={ <BlockIcon icon={ icon } /> }
				notices={ noticeUI }
			>
				{ __( 'User input goes here?', 'jetpack' ) }
			</Placeholder>
		</div>
	);
}

export default BloggingPromptsBetaEdit;
