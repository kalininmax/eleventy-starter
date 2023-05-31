module.exports = {
	env: {
		browser: true,
		es2022: true,
	},
	extends: ['airbnb-base', 'prettier'],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
		'prettier/prettier': 'error',
		'no-unused-vars': 'warn',
		'no-console': 'off',
		'func-names': 'off',
		'no-process-exit': 'off',
		'object-shorthand': 'off',
		'class-methods-use-this': 'off',
		'global-require': 'off',
		'import/no-unresolved': 'off',
		'no-underscore-dangle': 'off',
		'no-class-assign': 'off',
		'import/no-named-as-default': 'off',
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
		'import/first': 'off',
		'import/newline-after-import': 'off',
		'new-cap': 'off',
		'guard-for-in': 'off',
		camelcase: 'off',
		'operator-assignment': 'off',
		'no-new': 'off',
		'max-classes-per-file': 'off',
		'no-return-assign': 'off',
		'no-continue': 'off',
		'no-debugger': 'off',
		'import/no-extraneous-dependencies': 'off',
	},
	plugins: ['prettier'],
};
