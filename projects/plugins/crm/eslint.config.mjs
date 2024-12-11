import makeBaseConfig from 'jetpack-js-tools/eslintrc/base.mjs';

export default [
	...makeBaseConfig( import.meta.url, {
		envs: [ 'browser', 'jquery' ],
	} ),
	{
		rules: {
			'jsdoc/require-jsdoc': 'off',
		},
	},
];