module.exports = () => ({
	mode: process.env.ELEVENTY_ENV || 'development',
	environment: process.env,
});
