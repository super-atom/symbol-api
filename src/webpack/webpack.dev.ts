import * as merge from 'webpack-merge';
import * as common from './webpack.common';

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        compress: true,
        port: 3000
    }
})