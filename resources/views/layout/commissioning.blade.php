<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
<meta charset="utf-8">
<title>{{__('content.seo_title')}}</title>
<meta name="description" content="{{__('content.seo_description')}}">
<meta name="keywords" content="{{__('content.seo_keywords')}}">
<meta property="og:title" content="{{__('content.seo_title')}}">
<meta property="og:description" content="{{__('content.seo_description')}}">
<meta property="og:url" content="{{url()->current()}}">
<meta property="og:image" content="{{ asset('assets/img/opengraph.jpg') }}">
<meta property="og:site_name" content="{{__('content.seo_title')}}">
<link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
<meta name="msapplication-TileColor" content="#da532c">
<meta name="theme-color" content="#ffffff">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="format-detection" content="telephone=no">
<link href="{{ mix('assets/css/page.css') }}" rel="stylesheet" />
<link href="{{ mix('assets/css/theme.css') }}" rel="stylesheet" />
<script src="/assets/js/modernizr.js"></script>
<meta name="csrf-token" value="{{ csrf_token() }}" />
</head>
<body>
{{-- @include('layout.partials.header') --}}
<main id="app-form">
  <commissioning-form uuid="{{ request()->uuid ?? null }}" />
</main>
@include('layout.partials.footer')
<script src="{{ mix('assets/js/page.js') }}" type="text/javascript"></script>
<script src="{{ mix('assets/js/commissioning.js') }}" type="text/javascript"></script>
{{-- @include('tracking') --}}
</body>
</html>
{{-- @include('signature') --}}
