const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "production",
    // mode: "development",
    entry: {
        popup: path.resolve(__dirname, "src", "scripts", "popup.ts"),
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "scripts/[name].js",
    },
    resolve: {
        extensions: [".ts", ".js"],
        alias: {
            "@": path.resolve(__dirname, "src")
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [{from: ".", to: ".", context: "public"}]
        }),
        new HtmlWebpackPlugin({
            filename: 'popup.html',
            template: path.resolve(__dirname, 'src', 'popup.html')
        })
    ],
};
