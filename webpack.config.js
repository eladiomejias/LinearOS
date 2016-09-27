var webpack = require('webpack');

module.exports = {
    entry: {
        app: './app/app.js',
        vendor: ['angular', 'angular-animate', 'angular-aria', 'angular-material', 'angular-ui-router/release/angular-ui-router.js', 'angular-messages', 'jquery/dist/jquery.js']
    },
    output: {
        path: './public/js',
        filename: 'app.bundle.js'
    },
    plugins: [new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")]
};
