var webpack = require('webpack');

module.exports = {
    entry: {
        app: './app/app.js',
        vendor: [
            'angular', 
        'angular-animate', 'angular-aria', 'angular-material', 'angular-ui-router']
    },
    output: {
        path: './public/js',
        filename: 'app.bundle.js'
    },
    plugins: [new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")]
};