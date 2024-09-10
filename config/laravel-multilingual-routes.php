<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Default Locale Configuration
    |--------------------------------------------------------------------------
    |
    | The main locale of the routes.
    |
    */

    'default' => 'de',

    /*
    |--------------------------------------------------------------------------
    | Prefix Configuration
    |--------------------------------------------------------------------------
    |
    | The configuration option that defines if the routes of the default
    | locale should be prefixed.
    |
    */

    'prefix_default' => 'de',

    /*
    |--------------------------------------------------------------------------
    | Home Prefix Configuration
    |--------------------------------------------------------------------------
    |
    | The configuration option defines if the home route of the default locale
    | should be prefixed.
    |
    */

    'prefix_default_home' => 'de',

    /*
    |--------------------------------------------------------------------------
    | Name Prefix Configuration
    |--------------------------------------------------------------------------
    |
    | The configuration option that defines if the route name prefix should
    | be before the locale.
    |
    */

    'name_prefix_before_locale' => env('MULTILINGUAL_ROUTES_NAME_PREFIX_BEFORE_LOCALE', false),
];
