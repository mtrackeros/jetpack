import { __ } from '@wordpress/i18n';
import React, { type FunctionComponent } from 'react';
import uPlot from 'uplot';
import Text from '../text';
import UplotLineChart from './uplot-line-chart';
import { useBoostScoreTransform } from './use-boost-score-transform';

import './style.scss';

interface ScoreValuePair {
	score: number;
	value: number;
}
export interface Period {
	timestamp: number;
	dimensions: {
		desktop_overall_score: number;
		desktop_fcp: ScoreValuePair;
		desktop_tbt: ScoreValuePair;
		desktop_tti: ScoreValuePair;
		desktop_cls: ScoreValuePair;
		desktop_lcp: ScoreValuePair;
		desktop_si: ScoreValuePair;
		mobile_overall_score: number;
		mobile_fcp: ScoreValuePair;
		mobile_tbt: ScoreValuePair;
		mobile_tti: ScoreValuePair;
		mobile_cls: ScoreValuePair;
		mobile_lcp: ScoreValuePair;
		mobile_si: ScoreValuePair;
	};
}
export interface BoostScoreGraphProps {
	periods: Period[];
	startDate: number;
	endDate: number;
	title?: string;
	isLoading?: boolean;
}

/**
 * A cell in the legend table of the BoostScoreGraph component.
 *
 * @param {object} root0 - The props object for the LegendCell component.
 * @param {string} root0.label - The label to display in the legend cell.
 * @param {string} root0.value - The value to display in the legend cell.
 * @returns {React.ReactElement} The JSX element representing the legend cell.
 */
function LegendCell( { label, value } ) {
	return (
		<div className="jb-score-graph__table-cell">
			<Text>{ label }</Text>
			<Text>{ value }</Text>
		</div>
	);
}

/**
 * BoostScoreGraph component composed by the chart and the legend.
 *
 * @param {BoostScoreGraphProps} props - The props object for the BoostScoreGraph component.
 * @param {uPlot.AlignedData} props.data - The data used to render the uPlotLineChart.
 * @param {string} props.title - Title for the chart.
 * @param {boolean} [props.isLoading=false] - Whether the component is in a loading state.
 * @returns {React.ReactElement} The JSX element representing the BoostScoreGraph component, or null if loading.
 */
export const BoostScoreGraph: FunctionComponent< BoostScoreGraphProps > = ( {
	periods,
	startDate,
	endDate,
	title,
	isLoading = false,
} ) => {
	const data = useBoostScoreTransform( periods );
	if ( isLoading || ! data?.length ) {
		return null;
	}
	return (
		<div className="jb-score-graph">
			{ title && <Text variant="title-medium">{ title }</Text> }
			<UplotLineChart data={ data } range={ { startDate, endDate } } />
			<div className="jb-score-graph__table">
				<div className="jb-score-graph__table-row">
					<LegendCell label={ __( 'Overall score', 'jetpack' ) } value="A" />
					<LegendCell
						label={ __( 'Desktop', 'jetpack' ) }
						value={ data[ 1 ][ data[ 1 ].length - 1 ] }
					/>
					<LegendCell
						label={ __( 'Mobile', 'jetpack' ) }
						value={ data[ 2 ][ data[ 2 ].length - 1 ] }
					/>
				</div>
			</div>
		</div>
	);
};

export default BoostScoreGraph;
