module.exports = (api) => {
    if (api.env('test')) {
        return {
            "plugins": [
                "@babel/plugin-transform-react-jsx",
                "@babel/plugin-transform-runtime"
            ],
            "presets": ["@babel/preset-env"]
        }
    }
}