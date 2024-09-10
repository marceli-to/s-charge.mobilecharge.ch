const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Webpack config
 |--------------------------------------------------------------------------
 |
 */

mix.webpackConfig({
  resolve: {
    extensions: ['.js', '.vue', '.json', '.scss'],
    alias: {
      //'vue$': 'vue/dist/vue.esm.js',
      '@': __dirname + '/resources/js/',
    },
  },
});


/*
 |--------------------------------------------------------------------------
 | Form Comissioning
 |--------------------------------------------------------------------------
 |
 */

mix.js('resources/js/commissioning.js', 'public/assets/js').version();

/*
 |--------------------------------------------------------------------------
 | Global
 |--------------------------------------------------------------------------
 |
 */

mix.sass('resources/sass/global/page.scss', 'public/assets/css').options({ processCssUrls: false }).version();

mix.js('resources/js/tenants/s-charge/page.js', 'public/assets/js').version();
mix.sass('resources/sass/tenants/s-charge/theme.scss', 'public/assets/css').options({ processCssUrls: false }).version();