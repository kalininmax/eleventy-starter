const path = require('node:path');
const yaml = require('js-yaml');
const htmlMinifier = require('html-minifier-terser');
const htmlPrettifier = require('html-prettify');
const sass = require('sass');
const postcss = require('postcss');
const postcssMediaMinmax = require('postcss-media-minmax');
const autoprefixer = require('autoprefixer');
const postcssCsso = require('postcss-csso');
const esbuild = require('esbuild');
const Image = require('@11ty/eleventy-img');
const pluginIcons = require('eleventy-plugin-icons');

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

module.exports = config => {
	config.ignores.add('src/components');

	config.addShortcode('image', async function(src, sizes = '100vw', alt = '') {
		const originalFormat = src.split('.').pop();

		const metadata = await Image(`src/assets/images/${src}`, {
			widths: [640, 960, 1280, 1920, 2560],
			formats: ['avif', 'webp', originalFormat],
			urlPath: 'assets/images/',
			outputDir: 'build/assets/images/'
		});

		const imageAttr = {
			alt,
			sizes,
			loading: 'lazy',
			decoding: 'async',
		};

		return Image.generateHTML(metadata, imageAttr);
	})

	config.addDataExtension('yml', content => yaml.load(content));

	// HTML
	isDev && config.addTransform('html-prettify', (content, path) => {
		if (path && path.endsWith('.html')) {
			return htmlPrettifier(content);
		}

		return content;
	});
	isProd && config.addTransform('html-minify', (content, path) => {
		if (path && path.endsWith('.html')) {
			return htmlMinifier.minify(
				content, {
					collapseBooleanAttributes: true,
					collapseWhitespace: true,
					decodeEntities: true,
					includeAutoGeneratedTags: false,
					removeComments: true,
					sortAttributes: true,
					sortClassName: true
				}
			);
		}

		return content;
	});

	// SCSS
	const postcssPlugins = [
		postcssMediaMinmax,
		autoprefixer,
		isProd && postcssCsso,
	].filter((value) => value);

	config.addTemplateFormats('scss');
	config.addExtension('scss', {
		outputFileExtension: 'css',

		compile: async function(inputContent, inputPath) {
			const parsed = path.parse(inputPath);

			if(parsed.name.startsWith('_')) {
				return;
			}

			let result = sass.compileString(inputContent, {
				loadPaths: [
					parsed.dir || '.',
					'node_modules'
				],
				sourceMap: isDev,
				sourceMapIncludeSources: isDev,
			});

			this.addDependencies(inputPath, result.loadedUrls);

			return async () => {
				const output = await postcss(postcssPlugins).process(result.css, { from: inputPath });
				return output.css;
			};
		}
	});

	// JS

	config.addTemplateFormats('js');
	config.addExtension('js', {
		outputFileExtension: 'js',
		compile: async (content, path) => {
			if (path !== './src/assets/scripts/index.js') {
				return;
			}

			return async () => {
				let output = await esbuild.build({
					target: 'es2020',
					entryPoints: [path],
					minify: isProd,
					bundle: true,
					write: false,
					sourcemap: isDev,
				});

				return output.outputFiles[0].text;
			}
		}
	});


	// Passthrough copy
	[
		'src/assets/fonts',
	].forEach(
		path => config.addPassthroughCopy(path)
	);

	// Dev Server
	config.setServerOptions({
		watch: ['build/assets/images/svg/sprite.svg']
	});

	config.addPlugin(pluginIcons, {
		mode: 'sprite',
		sources: { icons: 'src/assets/images/svg/' },
		default: 'icons',
		optimize: true,
		icon: {
				shortcode: 'icon',
		},
		sprites: {
				shortcode: 'spriteSheet',
				generateFile: 'assets/images/svg/sprite.svg',
				insertAll: true,
		}
	});

	// Config
	return {
		dir: {
			input: 'src',
			includes: 'includes',
			layouts: 'templates',
			data: 'data',
			output: 'build'
		}
	};
}
