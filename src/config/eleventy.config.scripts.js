const esbuild = require('esbuild');
const PATHS = require('../../paths');
const { exec } = require('child_process');

const isProd = process.env.ELEVENTY_ENV === 'production';

async function execCmd(command) {
	return new Promise((resolve, reject) => {
		exec(command, (error, stdout, stderr) => {
			if (error) {
				reject([error, stdout, stderr]);
				return;
			}
			resolve(stdout);
		});
	});
}

/** @param {import("@11ty/eleventy").UserConfig} config */
module.exports = async (config) => {
	config.addTemplateFormats('js');
	config.addExtension('js', {
		outputFileExtension: 'js',
		compile: async (file, path) => async () => {
			await esbuild.build({
				target: 'es2020',
				entryPoints: ['./src/assets/scripts/index.js'],
				entryNames: '[dir]/bundle',
				minify: isProd,
				bundle: true,
				write: true,
				sourcemap: true,
				outbase: PATHS.src.root,
				outdir: PATHS.build.root,
			});
		},
	});

	config.on('eleventy.before', async ({ dir, runMode, outputMode }) => {
		await execCmd('npx tsc --noEmit').then(
			() => {},
			([_, stdout, stderr]) => {
				if (stderr.length > 0) {
					console.error(stderr);
				}

				if (stdout.length > 0) {
					console.error(stdout);
				}
			},
		);
	});
};
