const path = require("path")

module.exports = {
    entry: "./src/index.ts",
    devtool: "inline-source-map",
    mode: "development",
    devServer: {
        contentBase: "./dist"
    },

    module: {
        rules: [
            // TypeScript
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            // Sass
            {
                test: /\.s(a|c)ss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    resolve: {
        extensions: [
            ".tsx", ".ts",
            ".js",
            ".scss"
        ],
        modules: ["node_modules"]
    },
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist")
    }
}