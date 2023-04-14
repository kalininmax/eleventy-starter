module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['airbnb-base'],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
		'no-unused-vars': 'warn',
		'no-console': 'off',
		'func-names': 'off',
		'no-process-exit': 'off',
		'object-shorthand': 'off',
		'class-methods-use-this': 'off',
		'global-require': 'off',
		'no-underscore-dangle': 'off',
		'no-class-assign': 'off',
		'dot-notation': 'off',
		'prefer-template': 'off',
		'no-plusplus': 'off',
		'prefer-rest-params': 'off',
		'no-param-reassign': 'off',
		'no-multi-assign': 'off',
		'prefer-spread': 'off',
		'no-unused-expressions': 'off',
		'no-restricted-syntax': 'off',
		'prefer-const': 'warn',
		'no-lonely-if': 'off',
		eqeqeq: 'warn',
		'prefer-destructuring': 'off',
		'lines-between-class-members': 'off',
		'spaced-comment': 'off',
		'no-useless-constructor': 'off',
		'new-cap': 'off',
		'guard-for-in': 'off',
		camelcase: 'off',
		'operator-assignment': 'off',
		'no-new': 'off',
		'no-tabs': 0,
		'max-classes-per-file': 'off',
		'no-return-assign': 'off',
		'no-continue': 'off',
		'no-debugger': 'off',
		indent: ['error', 'tab'],
		'consistent-return': 'off',
		'import/first': 'off',
		'import/no-unresolved': 'off',
		'import/no-named-as-default': 'off',
		'import/newline-after-import': 'off',
		'import/prefer-default-export': ['off'],
		'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
	},
};