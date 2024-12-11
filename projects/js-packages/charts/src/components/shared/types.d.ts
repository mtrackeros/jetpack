import type { CSSProperties } from 'react';

export type DataPoint = {
	label: string;
	value: number;
};

export type DataPointDate = {
	date: Date;
	value: number;
};

export type DataPointPercentage = {
	/**
	 * Label for the data point
	 */
	label: string;
	/**
	 * Numerical value
	 */
	value: number;
	/**
	 * Formatted value for display
	 */
	valueDisplay?: string;
	/**
	 * Percentage value
	 */
	percentage: number;
	/**
	 * Color code for the segment, by default colours are taken from the theme but this property can overrides it
	 */
	color?: string;
};

/**
 * Theme configuration for chart components
 */
export type ChartTheme = {
	/** Background color for chart components */
	backgroundColor: string;
	/** Array of colors used for data visualization */
	colors: string[];
	/** Optional CSS styles for grid lines */
	gridStyles?: CSSProperties;
	/** Length of axis ticks in pixels */
	tickLength: number;
	/** Color of the grid lines */
	gridColor: string;
	/** Color of the grid lines in dark mode */
	gridColorDark: string;
};