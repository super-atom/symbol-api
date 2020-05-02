import path from 'path';
import nodeExternals from 'webpack-node-externals';

module.exports = {
    entry: path.resolve(__dirname, "./server.ts"),
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    target: 'node',
    externals: [nodeExternals()]
};
