<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TranslationController extends Controller
{
  /**
   * Get translation file from ressource folder.
   * 
   * @param String $locale 
   * @return \Illuminate\Http\Response
   */
  public function fetch($locale)
  { 
    $path = resource_path('lang/'. $locale .'.json');
    
    if (file_exists($path))
    {
      $translations = file_get_contents($path);
      return response()->json($translations);      
    }
    return NULL;
  }
}
