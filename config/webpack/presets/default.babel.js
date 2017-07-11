import webpack from 'webpack';
import HappyPack from 'happypack';
import environment from '../../environment';

const PRODUCTION = environment.is('production');

export default {
    entry: '',
    output: {
        path: '',
        filename: ''
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new HappyPack({
            id: 'js',
            threads: 6,
            verbose: false,
            loaders: [
                {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                },
                {
                    loader: 'eslint-loader',
                    enforce: 'pre',
                    options: {
                        failOnError: PRODUCTION,
                        cache: false
                    }
                }
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exluce: /node_modules/,
                use: 'happypack/loader?id=js'
            }
        ]
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['/index.js' '.js']
    }
};
