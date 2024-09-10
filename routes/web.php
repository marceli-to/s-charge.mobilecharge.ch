<?php

/*
|--------------------------------------------------------------------------
| Form "Inbetriebnahme" Routes
|--------------------------------------------------------------------------
|
*/

Route::view('/{uuid?}', 'layout.commissioning')->name('de.page_commissioning');
Route::view('/en/commissioning-form/{uuid?}', 'layout.commissioning')->name('en.page_commissioning');
Route::view('/fr/formulaire-de-mise-en-service/{uuid?}', 'layout.commissioning')->name('fr.page_commissioning');
Route::view('/it/modulo-di-messa-in-servizio/{uuid?}', 'layout.commissioning')->name('it.page_commissioning');



/*
|--------------------------------------------------------------------------
| Artisan Routes
|--------------------------------------------------------------------------
|
*/

Route::get('/artisan/cache', function () {
	Artisan::call('cache:clear');
});

Route::get('/artisan/config', function () {
	Artisan::call('config:clear');
});

Route::get('/artisan/view', function () {
	Artisan::call('view:clear');
});

Route::get('/artisan/symlink', function () {
	Artisan::call('storage:link');
});