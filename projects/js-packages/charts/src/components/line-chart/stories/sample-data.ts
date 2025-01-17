import type { SeriesData } from '../../../types';

// Sample data
const temperatureData: SeriesData[] = [
	{
		label: 'London',
		data: [
			// 2022 data
			{ date: new Date( '2022-01-01' ), value: 7.8 },
			{ date: new Date( '2022-01-08' ), value: 7.2 },
			{ date: new Date( '2022-01-15' ), value: 6.9 },
			{ date: new Date( '2022-01-22' ), value: 6.5 },
			{ date: new Date( '2022-01-29' ), value: 7.1 },
			{ date: new Date( '2022-02-05' ), value: 8.3 },
			{ date: new Date( '2022-02-12' ), value: 8.9 },
			{ date: new Date( '2022-02-19' ), value: 9.2 },
			{ date: new Date( '2022-02-26' ), value: 8.7 },
			{ date: new Date( '2022-03-05' ), value: 9.4 },
			{ date: new Date( '2022-03-12' ), value: 10.2 },
			{ date: new Date( '2022-03-19' ), value: 11.5 },
			{ date: new Date( '2022-03-26' ), value: 12.3 },
			{ date: new Date( '2022-04-02' ), value: 13.1 },
			{ date: new Date( '2022-04-09' ), value: 13.8 },
			{ date: new Date( '2022-04-16' ), value: 14.6 },
			{ date: new Date( '2022-04-23' ), value: 15.2 },
			{ date: new Date( '2022-04-30' ), value: 15.9 },
			{ date: new Date( '2022-05-07' ), value: 16.7 },
			{ date: new Date( '2022-05-14' ), value: 17.4 },
			{ date: new Date( '2022-05-21' ), value: 18.2 },
			{ date: new Date( '2022-05-28' ), value: 18.9 },
			{ date: new Date( '2022-06-04' ), value: 19.7 },
			{ date: new Date( '2022-06-11' ), value: 20.5 },
			{ date: new Date( '2022-06-18' ), value: 21.3 },
			{ date: new Date( '2022-06-25' ), value: 22.1 },
			{ date: new Date( '2022-07-02' ), value: 22.8 },
			{ date: new Date( '2022-07-09' ), value: 23.6 },
			{ date: new Date( '2022-07-16' ), value: 24.4 },
			{ date: new Date( '2022-07-23' ), value: 25.2 },
			{ date: new Date( '2022-07-30' ), value: 24.8 },
			{ date: new Date( '2022-08-06' ), value: 24.1 },
			{ date: new Date( '2022-08-13' ), value: 23.5 },
			{ date: new Date( '2022-08-20' ), value: 22.8 },
			{ date: new Date( '2022-08-27' ), value: 21.9 },
			{ date: new Date( '2022-09-03' ), value: 20.7 },
			{ date: new Date( '2022-09-10' ), value: 19.5 },
			{ date: new Date( '2022-09-17' ), value: 18.3 },
			{ date: new Date( '2022-09-24' ), value: 17.1 },
			{ date: new Date( '2022-10-01' ), value: 16.2 },
			{ date: new Date( '2022-10-08' ), value: 15.1 },
			{ date: new Date( '2022-10-15' ), value: 14.2 },
			{ date: new Date( '2022-10-22' ), value: 13.1 },
			{ date: new Date( '2022-10-29' ), value: 12.2 },
			{ date: new Date( '2022-11-05' ), value: 11.1 },
			{ date: new Date( '2022-11-12' ), value: 10.2 },
			{ date: new Date( '2022-11-19' ), value: 9.1 },
			{ date: new Date( '2022-11-26' ), value: 8.2 },
			{ date: new Date( '2022-12-03' ), value: 7.1 },
			{ date: new Date( '2022-12-10' ), value: 6.2 },
			{ date: new Date( '2022-12-17' ), value: 5.5 },
			{ date: new Date( '2022-12-24' ), value: 5.2 },
			{ date: new Date( '2022-12-31' ), value: 6.8 },
			// 2023 data
			{ date: new Date( '2023-01-01' ), value: 8.2 },
			{ date: new Date( '2023-01-08' ), value: 7.9 },
			{ date: new Date( '2023-01-15' ), value: 5.1 },
			{ date: new Date( '2023-01-22' ), value: 4.8 },
			{ date: new Date( '2023-01-29' ), value: 6.3 },
			{ date: new Date( '2023-02-05' ), value: 7.2 },
			{ date: new Date( '2023-02-12' ), value: 9.4 },
			{ date: new Date( '2023-02-19' ), value: 8.7 },
			{ date: new Date( '2023-02-26' ), value: 7.1 },
			{ date: new Date( '2023-03-05' ), value: 8.3 },
			{ date: new Date( '2023-03-12' ), value: 9.5 },
			{ date: new Date( '2023-03-19' ), value: 11.2 },
			{ date: new Date( '2023-03-26' ), value: 12.8 },
			{ date: new Date( '2023-04-02' ), value: 13.4 },
			{ date: new Date( '2023-04-09' ), value: 14.1 },
			{ date: new Date( '2023-04-16' ), value: 15.3 },
			{ date: new Date( '2023-04-23' ), value: 14.8 },
			{ date: new Date( '2023-04-30' ), value: 15.7 },
			{ date: new Date( '2023-05-07' ), value: 16.9 },
			{ date: new Date( '2023-05-14' ), value: 17.2 },
			{ date: new Date( '2023-05-21' ), value: 18.4 },
			{ date: new Date( '2023-05-28' ), value: 19.1 },
			{ date: new Date( '2023-06-04' ), value: 20.3 },
			{ date: new Date( '2023-06-11' ), value: 21.5 },
			{ date: new Date( '2023-06-18' ), value: 22.8 },
			{ date: new Date( '2023-06-25' ), value: 21.9 },
			{ date: new Date( '2023-07-02' ), value: 23.1 },
			{ date: new Date( '2023-07-09' ), value: 22.7 },
			{ date: new Date( '2023-07-16' ), value: 24.2 },
			{ date: new Date( '2023-07-23' ), value: 23.8 },
			{ date: new Date( '2023-07-30' ), value: 22.9 },
			{ date: new Date( '2023-08-06' ), value: 23.4 },
			{ date: new Date( '2023-08-13' ), value: 22.8 },
			{ date: new Date( '2023-08-20' ), value: 21.9 },
			{ date: new Date( '2023-08-27' ), value: 20.7 },
			{ date: new Date( '2023-09-03' ), value: 19.8 },
			{ date: new Date( '2023-09-10' ), value: 18.9 },
			{ date: new Date( '2023-09-17' ), value: 17.6 },
			{ date: new Date( '2023-09-24' ), value: 16.8 },
			{ date: new Date( '2023-10-01' ), value: 15.9 },
			{ date: new Date( '2023-10-08' ), value: 14.7 },
			{ date: new Date( '2023-10-15' ), value: 13.8 },
			{ date: new Date( '2023-10-22' ), value: 12.9 },
			{ date: new Date( '2023-10-29' ), value: 11.7 },
			{ date: new Date( '2023-11-05' ), value: 10.8 },
			{ date: new Date( '2023-11-12' ), value: 9.9 },
			{ date: new Date( '2023-11-19' ), value: 8.7 },
			{ date: new Date( '2023-11-26' ), value: 7.8 },
			{ date: new Date( '2023-12-03' ), value: 6.9 },
			{ date: new Date( '2023-12-10' ), value: 5.8 },
			{ date: new Date( '2023-12-17' ), value: 4.9 },
			{ date: new Date( '2023-12-24' ), value: 5.7 },
			{ date: new Date( '2023-12-31' ), value: 6.2 },
		],
	},
	{
		label: 'Canberra',
		data: [
			// 2022 data
			{ date: new Date( '2022-01-01' ), value: 27.9 },
			{ date: new Date( '2022-01-08' ), value: 28.4 },
			{ date: new Date( '2022-01-15' ), value: 29.2 },
			{ date: new Date( '2022-01-22' ), value: 28.9 },
			{ date: new Date( '2022-01-29' ), value: 28.1 },
			{ date: new Date( '2022-02-05' ), value: 27.3 },
			{ date: new Date( '2022-02-12' ), value: 26.5 },
			{ date: new Date( '2022-02-19' ), value: 25.4 },
			{ date: new Date( '2022-02-26' ), value: 24.2 },
			{ date: new Date( '2022-03-05' ), value: 23.1 },
			{ date: new Date( '2022-03-12' ), value: 22.3 },
			{ date: new Date( '2022-03-19' ), value: 21.2 },
			{ date: new Date( '2022-03-26' ), value: 20.1 },
			{ date: new Date( '2022-04-02' ), value: 19.2 },
			{ date: new Date( '2022-04-09' ), value: 18.1 },
			{ date: new Date( '2022-04-16' ), value: 16.9 },
			{ date: new Date( '2022-04-23' ), value: 15.8 },
			{ date: new Date( '2022-04-30' ), value: 14.9 },
			{ date: new Date( '2022-05-07' ), value: 13.8 },
			{ date: new Date( '2022-05-14' ), value: 12.9 },
			{ date: new Date( '2022-05-21' ), value: 11.8 },
			{ date: new Date( '2022-05-28' ), value: 10.9 },
			{ date: new Date( '2022-06-04' ), value: 9.8 },
			{ date: new Date( '2022-06-11' ), value: 8.9 },
			{ date: new Date( '2022-06-18' ), value: 8.1 },
			{ date: new Date( '2022-06-25' ), value: 7.5 },
			{ date: new Date( '2022-07-02' ), value: 6.9 },
			{ date: new Date( '2022-07-09' ), value: 6.7 },
			{ date: new Date( '2022-07-16' ), value: 7.1 },
			{ date: new Date( '2022-07-23' ), value: 7.9 },
			{ date: new Date( '2022-07-30' ), value: 8.8 },
			{ date: new Date( '2022-08-06' ), value: 9.9 },
			{ date: new Date( '2022-08-13' ), value: 11.2 },
			{ date: new Date( '2022-08-20' ), value: 12.4 },
			{ date: new Date( '2022-08-27' ), value: 13.6 },
			{ date: new Date( '2022-09-03' ), value: 14.8 },
			{ date: new Date( '2022-09-10' ), value: 16.1 },
			{ date: new Date( '2022-09-17' ), value: 17.3 },
			{ date: new Date( '2022-09-24' ), value: 18.5 },
			{ date: new Date( '2022-10-01' ), value: 19.8 },
			{ date: new Date( '2022-10-08' ), value: 21.1 },
			{ date: new Date( '2022-10-15' ), value: 22.3 },
			{ date: new Date( '2022-10-22' ), value: 23.5 },
			{ date: new Date( '2022-10-29' ), value: 24.6 },
			{ date: new Date( '2022-11-05' ), value: 25.7 },
			{ date: new Date( '2022-11-12' ), value: 26.5 },
			{ date: new Date( '2022-11-19' ), value: 27.4 },
			{ date: new Date( '2022-11-26' ), value: 28.2 },
			{ date: new Date( '2022-12-03' ), value: 28.9 },
			{ date: new Date( '2022-12-10' ), value: 29.5 },
			{ date: new Date( '2022-12-17' ), value: 29.1 },
			{ date: new Date( '2022-12-24' ), value: 28.2 },
			{ date: new Date( '2022-12-31' ), value: 28.7 },
			// 2023 data
			{ date: new Date( '2023-01-01' ), value: 28.5 },
			{ date: new Date( '2023-01-08' ), value: 29.2 },
			{ date: new Date( '2023-01-15' ), value: 30.1 },
			{ date: new Date( '2023-01-22' ), value: 29.8 },
			{ date: new Date( '2023-01-29' ), value: 28.9 },
			{ date: new Date( '2023-02-05' ), value: 27.8 },
			{ date: new Date( '2023-02-12' ), value: 26.9 },
			{ date: new Date( '2023-02-19' ), value: 25.7 },
			{ date: new Date( '2023-02-26' ), value: 24.8 },
			{ date: new Date( '2023-03-05' ), value: 23.9 },
			{ date: new Date( '2023-03-12' ), value: 22.8 },
			{ date: new Date( '2023-03-19' ), value: 21.7 },
			{ date: new Date( '2023-03-26' ), value: 20.8 },
			{ date: new Date( '2023-04-02' ), value: 19.6 },
			{ date: new Date( '2023-04-09' ), value: 18.4 },
			{ date: new Date( '2023-04-16' ), value: 17.2 },
			{ date: new Date( '2023-04-23' ), value: 16.1 },
			{ date: new Date( '2023-04-30' ), value: 15.3 },
			{ date: new Date( '2023-05-07' ), value: 14.2 },
			{ date: new Date( '2023-05-14' ), value: 13.1 },
			{ date: new Date( '2023-05-21' ), value: 12.3 },
			{ date: new Date( '2023-05-28' ), value: 11.4 },
			{ date: new Date( '2023-06-04' ), value: 10.2 },
			{ date: new Date( '2023-06-11' ), value: 9.1 },
			{ date: new Date( '2023-06-18' ), value: 8.3 },
			{ date: new Date( '2023-06-25' ), value: 7.8 },
			{ date: new Date( '2023-07-02' ), value: 7.1 },
			{ date: new Date( '2023-07-09' ), value: 6.9 },
			{ date: new Date( '2023-07-16' ), value: 7.2 },
			{ date: new Date( '2023-07-23' ), value: 8.1 },
			{ date: new Date( '2023-07-30' ), value: 9.3 },
			{ date: new Date( '2023-08-06' ), value: 10.4 },
			{ date: new Date( '2023-08-13' ), value: 11.6 },
			{ date: new Date( '2023-08-20' ), value: 12.8 },
			{ date: new Date( '2023-08-27' ), value: 13.9 },
			{ date: new Date( '2023-09-03' ), value: 15.2 },
			{ date: new Date( '2023-09-10' ), value: 16.4 },
			{ date: new Date( '2023-09-17' ), value: 17.6 },
			{ date: new Date( '2023-09-24' ), value: 18.9 },
			{ date: new Date( '2023-10-01' ), value: 20.1 },
			{ date: new Date( '2023-10-08' ), value: 21.3 },
			{ date: new Date( '2023-10-15' ), value: 22.5 },
			{ date: new Date( '2023-10-22' ), value: 23.7 },
			{ date: new Date( '2023-10-29' ), value: 24.8 },
			{ date: new Date( '2023-11-05' ), value: 25.9 },
			{ date: new Date( '2023-11-12' ), value: 26.7 },
			{ date: new Date( '2023-11-19' ), value: 27.8 },
			{ date: new Date( '2023-11-26' ), value: 28.6 },
			{ date: new Date( '2023-12-03' ), value: 29.4 },
			{ date: new Date( '2023-12-10' ), value: 30.2 },
			{ date: new Date( '2023-12-17' ), value: 29.8 },
			{ date: new Date( '2023-12-24' ), value: 28.9 },
			{ date: new Date( '2023-12-31' ), value: 29.3 },
		],
	},
	{
		label: 'Mars',
		data: [
			// 2022 data
			{ date: new Date( '2022-01-01' ), value: -62 },
			{ date: new Date( '2022-01-08' ), value: -63 },
			{ date: new Date( '2022-01-15' ), value: -64 },
			{ date: new Date( '2022-01-22' ), value: -62 },
			{ date: new Date( '2022-01-29' ), value: -61 },
			{ date: new Date( '2022-02-05' ), value: -59 },
			{ date: new Date( '2022-02-12' ), value: -56 },
			{ date: new Date( '2022-02-19' ), value: -53 },
			{ date: new Date( '2022-02-26' ), value: -50 },
			{ date: new Date( '2022-03-05' ), value: -47 },
			{ date: new Date( '2022-03-12' ), value: -44 },
			{ date: new Date( '2022-03-19' ), value: -41 },
			{ date: new Date( '2022-03-26' ), value: -37 },
			{ date: new Date( '2022-04-02' ), value: -34 },
			{ date: new Date( '2022-04-09' ), value: -31 },
			{ date: new Date( '2022-04-16' ), value: -27 },
			{ date: new Date( '2022-04-23' ), value: -24 },
			{ date: new Date( '2022-04-30' ), value: -21 },
			{ date: new Date( '2022-05-07' ), value: -17 },
			{ date: new Date( '2022-05-14' ), value: -14 },
			{ date: new Date( '2022-05-21' ), value: -11 },
			{ date: new Date( '2022-05-28' ), value: -7 },
			{ date: new Date( '2022-06-04' ), value: -4 },
			{ date: new Date( '2022-06-11' ), value: -1 },
			{ date: new Date( '2022-06-18' ), value: 1 },
			{ date: new Date( '2022-06-25' ), value: 3 },
			{ date: new Date( '2022-07-02' ), value: 6 },
			{ date: new Date( '2022-07-09' ), value: 9 },
			{ date: new Date( '2022-07-16' ), value: 11 },
			{ date: new Date( '2022-07-23' ), value: 13 },
			{ date: new Date( '2022-07-30' ), value: 16 },
			{ date: new Date( '2022-08-06' ), value: 18 },
			{ date: new Date( '2022-08-13' ), value: 21 },
			{ date: new Date( '2022-08-20' ), value: 23 },
			{ date: new Date( '2022-08-27' ), value: 21 },
			{ date: new Date( '2022-09-03' ), value: 19 },
			{ date: new Date( '2022-09-10' ), value: 16 },
			{ date: new Date( '2022-09-17' ), value: 13 },
			{ date: new Date( '2022-09-24' ), value: 9 },
			{ date: new Date( '2022-10-01' ), value: 6 },
			{ date: new Date( '2022-10-08' ), value: 3 },
			{ date: new Date( '2022-10-15' ), value: -1 },
			{ date: new Date( '2022-10-22' ), value: -4 },
			{ date: new Date( '2022-10-29' ), value: -7 },
			{ date: new Date( '2022-11-05' ), value: -11 },
			{ date: new Date( '2022-11-12' ), value: -14 },
			{ date: new Date( '2022-11-19' ), value: -17 },
			{ date: new Date( '2022-11-26' ), value: -21 },
			{ date: new Date( '2022-12-03' ), value: -24 },
			{ date: new Date( '2022-12-10' ), value: -27 },
			{ date: new Date( '2022-12-17' ), value: -31 },
			{ date: new Date( '2022-12-24' ), value: -36 },
			{ date: new Date( '2022-12-31' ), value: -37 },
			// 2023 data
			{ date: new Date( '2023-01-01' ), value: -63 },
			{ date: new Date( '2023-01-08' ), value: -64 },
			{ date: new Date( '2023-01-15' ), value: -65 },
			{ date: new Date( '2023-01-22' ), value: -63 },
			{ date: new Date( '2023-01-29' ), value: -62 },
			{ date: new Date( '2023-02-05' ), value: -60 },
			{ date: new Date( '2023-02-12' ), value: -58 },
			{ date: new Date( '2023-02-19' ), value: -55 },
			{ date: new Date( '2023-02-26' ), value: -52 },
			{ date: new Date( '2023-03-05' ), value: -48 },
			{ date: new Date( '2023-03-12' ), value: -45 },
			{ date: new Date( '2023-03-19' ), value: -42 },
			{ date: new Date( '2023-03-26' ), value: -38 },
			{ date: new Date( '2023-04-02' ), value: -35 },
			{ date: new Date( '2023-04-09' ), value: -32 },
			{ date: new Date( '2023-04-16' ), value: -28 },
			{ date: new Date( '2023-04-23' ), value: -25 },
			{ date: new Date( '2023-04-30' ), value: -22 },
			{ date: new Date( '2023-05-07' ), value: -18 },
			{ date: new Date( '2023-05-14' ), value: -15 },
			{ date: new Date( '2023-05-21' ), value: -12 },
			{ date: new Date( '2023-05-28' ), value: -8 },
			{ date: new Date( '2023-06-04' ), value: -5 },
			{ date: new Date( '2023-06-11' ), value: -2 },
			{ date: new Date( '2023-06-18' ), value: 0 },
			{ date: new Date( '2023-06-25' ), value: 2 },
			{ date: new Date( '2023-07-02' ), value: 5 },
			{ date: new Date( '2023-07-09' ), value: 8 },
			{ date: new Date( '2023-07-16' ), value: 10 },
			{ date: new Date( '2023-07-23' ), value: 12 },
			{ date: new Date( '2023-07-30' ), value: 15 },
			{ date: new Date( '2023-08-06' ), value: 17 },
			{ date: new Date( '2023-08-13' ), value: 20 },
			{ date: new Date( '2023-08-20' ), value: 22 },
			{ date: new Date( '2023-08-27' ), value: 20 },
			{ date: new Date( '2023-09-03' ), value: 18 },
			{ date: new Date( '2023-09-10' ), value: 15 },
			{ date: new Date( '2023-09-17' ), value: 12 },
			{ date: new Date( '2023-09-24' ), value: 8 },
			{ date: new Date( '2023-10-01' ), value: 5 },
			{ date: new Date( '2023-10-08' ), value: 2 },
			{ date: new Date( '2023-10-15' ), value: -2 },
			{ date: new Date( '2023-10-22' ), value: -5 },
			{ date: new Date( '2023-10-29' ), value: -8 },
			{ date: new Date( '2023-11-05' ), value: -12 },
			{ date: new Date( '2023-11-12' ), value: -15 },
			{ date: new Date( '2023-11-19' ), value: -18 },
			{ date: new Date( '2023-11-26' ), value: -22 },
			{ date: new Date( '2023-12-03' ), value: -25 },
			{ date: new Date( '2023-12-10' ), value: -28 },
			{ date: new Date( '2023-12-17' ), value: -32 },
			{ date: new Date( '2023-12-24' ), value: -35 },
			{ date: new Date( '2023-12-31' ), value: -38 },
		],
	},
];

export default temperatureData;
