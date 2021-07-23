const path = require('path');
const { resolve } = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const codeBasePath = resolve(__dirname, './src');
const customEnv = dotenv.config();
dotenvExpand(customEnv);

module.exports = {
	entry: './src/index.tsx',
	output: {
		path: path.join(__dirname, '/build'),
		filename: 'bundle.min.js',
		publicPath: '/',
	},
	devServer: {
		historyApiFallback: true,
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					'babel-loader',
					{
						loader: 'awesome-typescript-loader',
						options: {
							configFileName: resolve(
								__dirname,
								'./tsconfig.json',
							),
						},
					},
				],
			},
			{
				test: /\.js$/,
				enforce: 'pre',
				use: ['source-map-loader'],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{ test: /\.(woff|woff2|eot|ttf)$/, loader: 'file-loader' },
			{
				test: /\.(png|gif|jpg|jpeg)$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000,
							minimize: true,
						},
					},
				],
			},
			{
				test: /\.svg$/,
				loader: 'svg-url-loader',
				options: {
					limit: 10 * 1024,
					noquotes: true,
				},
			},
			{
				test: /\.mtsx$/,
				include: /node_modules/,
				type: 'javascript/auto',
			},
		],
	},
	resolve: {
		modules: ['node_modules', 'app'],
		extensions: ['.js', '.jsx', '.react.js', '.ts', '.tsx'],
		mainFields: ['browser', 'jsnext:main', 'main'],
		alias: {
			'@pages': path.resolve(codeBasePath, './pages'),
			'@utils': path.resolve(codeBasePath, './utils'),
			'@redux': path.resolve(codeBasePath, './redux'),
			'@components': path.resolve(codeBasePath, './components'),
			'@library': path.resolve(codeBasePath, './components/library'),
			'@fixtures': path.resolve(codeBasePath, './fixtures'),
			'@images': path.resolve(codeBasePath, './assets/images'),
			'@icons': path.resolve(codeBasePath, './assets/icons'),
			'@services': path.resolve(codeBasePath, './services'),
			'@httpRequests': path.resolve(
				codeBasePath,
				'./services/http_requests',
			),
			'@constants': path.resolve(codeBasePath, './utils/constants'),
		},
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
		new webpack.EnvironmentPlugin({ ...process.env }),
		new CompressionPlugin(),
	],
};
