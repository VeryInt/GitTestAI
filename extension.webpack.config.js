const path = require('path')
const {CleanWebpackPlugin } = require( 'clean-webpack-plugin' );

const outDir = path.resolve(__dirname, './extension')
const scriptPath = path.resolve(__dirname, './app/scripts/')
const root = path.resolve(__dirname, './');

module.exports = {
    mode: 'production', // 设置为 'development' 或 'production'
    resolve: {
        extensions: ['.js', '.ts'],
        alias: {
            "@": root,
        }
    },
    entry: {
        content: path.resolve(scriptPath, './content'),
        inject: path.resolve(scriptPath, './inject'),
    },
    output: {
        path: outDir,
        filename: '[name]-script.js',
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx'], // 解析的文件扩展名包括 .ts 和 .js
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.resolve(outDir, 'content-script.js'), path.resolve(outDir, 'inject-script.js')],
        })
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    // transpileOnly: true,
                    compilerOptions: {
                        target: 'es5',
                        noEmit: false,
                    },
                },
                exclude: /node_modules/,
            },
            {
                test: /\.tsx$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                        },
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            // transpileOnly: true,
                            compilerOptions: {
                                target: 'es5',
                                noEmit: false,
                            },
                        },
                    },
                ],
            },
        ],
    },
    stats: {
        colors: true,
        modules: true,
        reasons: true,
        errorDetails: true
    },
}
