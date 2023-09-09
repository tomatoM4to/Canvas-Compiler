const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "production",
    // mode: "development",
    watch: true,
    entry: {
        // popup: path.resolve(__dirname, "src", "app", "popup.ts"),
        background: path.resolve(__dirname, "src", "app", "background.ts"),
        content: path.resolve(__dirname, "src", "app", "content.ts"),
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "app/[name].js",
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
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [{from: ".", to: ".", context: "public"}]
        }),
    ],
};
