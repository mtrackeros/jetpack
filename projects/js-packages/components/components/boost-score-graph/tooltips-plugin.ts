import { dateI18n } from '@wordpress/date';
import ReactDOM from 'react-dom/client';
import uPlot from 'uplot';
import { Tooltip } from './tooltip';

/**
 * Custom tooltips plugin for uPlot.
 *
 * @returns {object} The uPlot plugin object with hooks.
 */
export function tooltipsPlugin() {
	const reactRoot = document.createElement( 'div' );
	let reactDom;

	/**
	 * Initializes the tooltips plugin.
	 *
	 * @param {uPlot} u - The uPlot instance.
	 * @param {object} _opts - Options for the uPlot instance.
	 */
	function init( u, _opts ) {
		const over = u.over;
		reactDom = ReactDOM.createRoot( reactRoot );
		reactRoot.style.position = 'absolute';
		reactRoot.style.bottom = -20 + 'px';
		reactRoot.style.translate = '-50% calc( 100% - 20px )';

		over.appendChild( reactRoot );

		/**
		 * Hides all tooltips.
		 */
		function hideTips() {
			reactRoot.style.display = 'none';
		}

		/**
		 * Shows all tooltips.
		 */
		function showTips() {
			reactRoot.style.display = null;
		}

		over.addEventListener( 'mouseleave', () => {
			if ( ! u.cursor._lock ) {
				hideTips();
			}
		} );

		over.addEventListener( 'mouseenter', () => {
			showTips();
		} );

		if ( u.cursor.left < 0 ) {
			hideTips();
		} else {
			showTips();
		}
	}

	/**
	 * Sets the cursor for tooltips.
	 *
	 * @param {uPlot} u - The uPlot instance.
	 */
	function setCursor( u ) {
		const { idx } = u.cursor;

		const mobileScore = u.data[ 1 ][ idx ];
		const desktopScore = u.data[ 2 ][ idx ];

		// Timestamp of the cursor position
		const timestamp = u.data[ 0 ][ idx ];

		// Find start and end of day for the cursor position
		const startOfDay = timestamp - ( timestamp % 86400 );
		const endOfDay = startOfDay + 86400;

		// Find the left position, and width of the box, bounded by the range of the graph
		const boxLeft = u.valToPos( Math.max( startOfDay, u.scales.x.min ), 'x' );
		const boxWidth = u.valToPos( Math.min( endOfDay, u.scales.x.max ), 'x' ) - boxLeft;
		const boxCenter = boxLeft + boxWidth / 2;

		reactRoot.style.left = boxCenter + 'px';
		reactDom.render(
			Tooltip( {
				date: dateI18n( 'F j, Y', new Date( u.data[ 0 ][ idx ] * 1000 ), false ),
				desktopScore,
				mobileScore,
			} )
		);
	}

	return {
		hooks: {
			init,
			setCursor,
		},
	};
}
