/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,

	images: {
		domains: ['avatars.githubusercontent.com', 'lh3.googleusercontent.com'],
	},
	transpilePackages: [
		'antd',
		'@ant-design/icons',
		'@ant-design/icons-svg',
		'rc-util',
		'rc-pagination',
		'rc-picker',
	],
};

module.exports = nextConfig;
