module.exports = {
    devtool: "inline-source-map",
    entry: "./src/index.tsx",
    output: {
        path: __dirname + "/dist",
        filename: "assets/scripts/app.js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [{ test: /\.tsx?$/, loader: "ts-loader" }]
    },
    devServer: {
        historyApiFallback: true
    }
}
