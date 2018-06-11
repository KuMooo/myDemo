var webpack = require('webpack');
var uglifyjs = require('uglifyjs-webpack-plugin');
// var ProvidePlugin = new webpack.ProvidePlugin({
//         "$": "jquery",
//         "jQuery": "jquery",
//         "window.jQuery": "jquery"
//     });
var providePlugin = new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery'});
module.exports = {
    entry:{
        index:'./src/js/index.js',
        goodsinfo: './src/js/goodsInfo.js'
    },

    output: {
        path:__dirname + '/out',
        filename: '[name].bundle.js',
        publicPath:'http://localhost:8088/out'
    },

    module: {
        rules:[
            {test:/.jpg|png$/,use:['url-loader?limit=5&name=./[name].[ext]']},
            {test:/.less$/,use:['style-loader','css-loader','less-loader']},
            {test:/.css$/,use:['style-loader','css-loader']},
        ]
    },

    mode:'development',
    
    plugins:[
        new uglifyjs(),
        // new webpack.ProvidePlugin({
        //     $: "jquery",
        //     jQuery: "jquery"
        //   }),
        providePlugin     
    ],
    devServer: {
        inline:true,
        port: 8088
      },
}