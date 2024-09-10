<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Requests\CommissioningStoreRequest;
use App\Http\Requests\CommissionLinkRequest;
use App\Mail\CommissionOwner;
use App\Mail\CommissionLink;
use Illuminate\Http\Request;

class CommissioningController extends Controller
{
  public $labels = [
    'subscription' => 'Abonnement',
    'subscription_payment' => 'Zahlungsart',
    'subscription_payment_ew' => 'Elektrizitätswerk',
    'subscription_payment_power_product' => 'Stromprodukt',
    'subscription_meter_type' => 'Zählertyp',
    'subscription_meter_number' => 'Zählernummer',
    'subscription_meter_commissioning_date' => 'Inbetriebnahmedatum',
    'subscription_meter_commissioning_quarter' => 'Inbetriebnahmequartal',
    'location_address' => 'Standort Adresse',
    'location_zip' => 'Standort PLZ',
    'location_city' => 'Standort Ort',
    'operator' => 'Betreiber',
    'operator_company' => 'Betreiber Firma',
    'operator_contact' => 'Betreiber Ansprechpartner',
    'operator_phone' => 'Betreiber Telefon',
    'operator_email' => 'Betreiber E-Mail',
    'operator_address' => 'Betreiber Adresse',
    'operator_zip' => 'Betreiber PLZ',
    'operator_location' => 'Betreiber Ort',
    'operator_existing_company' => 'Bestehende Firma',
    'operator_existing_customer_number' => 'Kundennummer',
    'operator_login_email' => 'Betreiber Login E-Mail',
    'finance_company' => 'Auszahlung an',
    'finance_address' => 'Auszahlung Adresse',
    'finance_zip' => 'Auszahlung PLZ',
    'finance_city' => 'Auszahlung Ort',
    'finance_bank' => 'Auszahlung Bank',
    'finance_bank_account' => 'Auszahlung Bankkonto',
    'finance_iban' => 'Auszahlung IBAN',
    'finance_credit_note_email' => 'Gutschrift E-Mail',
    'rfid_tariff' => 'RFID Tarif',
    'rfid_tariff_start' => 'RFID Tarif Start',
    'rfid_tariff_time' => 'RFID Tarif Zeit',
    'rfid_tariff_add' => 'RFID Tarif Zuschlag',
    'rfid_tariff_flat' => 'RFID Tarif Pauschal',
    'rfid_tariff_high' => 'RFID Tarif Hoch',
    'rfid_tariff_low' => 'RFID Tarif Niedrig',
    'qr_tariff' => 'QR Tarif',
    'qr_tariff_start' => 'QR Tarif Start',
    'qr_tariff_time' => 'QR Tarif Zeit',
    'qr_tariff_add' => 'QR Tarif Zuschlag',
    'qr_tariff_flat' => 'QR Tarif Pauschal',
    'qr_tariff_high' => 'QR Tarif Hoch',
    'qr_tariff_low' => 'QR Tarif Niedrig',
    'time_weekday_start_tariff_high' => 'Hochtarif Wochentag Start',
    'time_weekday_end_tariff_high' => 'Hochtarif Wochentag Ende',
    'time_saturday_start_tariff_high' => 'Hochtarif Samstag Start',
    'time_saturday_end_tariff_high' => 'Hochtarif Samstag Ende',
    'time_sunday_start_tariff_high' => 'Hochtarif Sonntag Start',
    'time_sunday_end_tariff_high' => 'Hochtarif Sonntag Ende',
    'users' => 'Benutzer',
    'contract' => 'Vertrag',
  ];
  
  /**
   * Display the specified resource.
   *
   * @param  string  $uuid
   * @return \Illuminate\Http\Response
   */
  public function get($uuid)
  {
    $path = storage_path('app/commissioning/temp/' . $uuid . '.json');
    if (file_exists($path)) {
      $json = file_get_contents($path);
      return response()->json(json_decode($json), 200);
    } else {
      return response()->json(['message' => 'Form not found'], 404);
    }
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  CommissioningStoreRequest  $request
   * @return \Illuminate\Http\Response
   */
  public function store(CommissioningStoreRequest $request)
  {
    $data = $request->all();

    // Check if a UUID is provided, if not generate a new one
    $uuid = $request->uuid ? $request->uuid : \Str::uuid();

    // Handle the contract file upload
    $contract = null;
    if ($request->contract)
    {
      $contract = $this->handleUpload($uuid, $request->contract);
      $data['contract'] = $contract;
    }

    // Handle operator_login_email (coma separated list of emails), remove if empty
    if (!$request->operator_login_email)
    {
      unset($data['operator_login_email']);
    }

    // Handle finance_credit_note_email, remove if empty
    if (!$request->finance_credit_note_email)
    {
      unset($data['finance_credit_note_email']);
    }

    // Handle users (object with name, email, mobile, qty_cards)
    if ($request->users)
    {
      $data['users'] = json_decode($request->users);
    }

    // Remove fields that start with 'time_' if subscription is 'basic'
    if ($request->subscription == 'basic')
    {
      foreach ($data as $key => $value)
      {
        if (strpos($key, 'time_') === 0)
        {
          unset($data[$key]);
        }
      }
    }

    // Save the request as json
    $path = storage_path('app/commissioning');
    if (!file_exists($path))
    {
      mkdir($path, 0777, true);
    }

    $filename = $uuid . '.json';
    file_put_contents($path . '/' . $filename, json_encode($data));

    // Create a csv file with the data
    $csv = $this->createCsv($uuid, $data);
    $data['csv'] = $csv;

    // Remove the temp file
    $tempPath = storage_path('app/commissioning/temp/' . $uuid . '.json');
    if (file_exists($tempPath)) {
      unlink($tempPath);
    }

    // Send email to owner
    try {
      \Mail::to(env('TENANT_MAIL_RECIPIENT'))
          ->cc(explode(',', env('TENANT_MAIL_CC')))
          ->send(new CommissionOwner(['data' => $data]));
    } catch (\Exception $e) {
      \Log::error('Error sending commissioning email: ' . $e->getMessage());
    }

    return response()->json(['message' => 'Form submitted'], 200);
  }

  /**
   * Save a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */

  public function save(Request $request)
  {
    // store the request as json in /storage/app/commissioning/temp
    // create the folder if it does not exist
    $path = storage_path('app/commissioning/temp');
    if (!file_exists($path)) {
      mkdir($path, 0777, true);
    }
    
    // Generate a UUID for the filename if it does not exist
    $uuid = $request->uuid ? $request->uuid : \Str::uuid();
    $filename = $uuid . '.json';

    $data = $request->all();

    // Handle the contract file upload
    $contract = null;
    if ($request->contract)
    {
      $contract = $this->handleUpload($uuid, $request->contract);
      $data['contract'] = $contract;
    }

    // Save the request as json
    file_put_contents($path . '/' . $filename, json_encode($data));

    // Generate download link to the route 'page_commissioning' with the UUID as parameter
    // get current locale
    $locale = app()->getLocale();
    $url = route($locale . '.page_commissioning', ['uuid' => $uuid]);
    return response()->json(['edit_url' => $url], 200);
  }

  public function removeContract($uuid)
  {
    // get json file from /storage/app/commissioning/temp
    $path = storage_path('app/commissioning/temp/' . $uuid . '.json');

    if (file_exists($path))
    {
      $json = file_get_contents($path);
      $data = json_decode($json, true);
      if (isset($data['contract']))
      {
        $contract = $data['contract'];
        $filename = $contract['filename'];
        $contractPath = storage_path('app/public/form/contracts/' . $filename);
        if (file_exists($contractPath))
        {
          unlink($contractPath);
        }
        unset($data['contract']);
        file_put_contents($path, json_encode($data));
        return response()->json(['message' => 'Contract removed'], 200);
      }
    }

    return response()->json(['message' => 'Contract removed'], 200);

  }

  /**
   * Send an email to the given email address with the form data
   * 
   * @param  CommissionLinkRequest  $request
   * @return \Illuminate\Http\Response
   */
  public function sendUrl(CommissionLinkRequest $request)
  {
    $data = $request->all();
    $email = $data['email'];

    try {
      \Mail::to($email)->send(new CommissionLink(['data' => $data]));
    } catch (\Exception $e) {
      \Log::error('Error sending commissioning email: ' . $e->getMessage());
    }

    return response()->json(['message' => 'Email sent'], 200);
  }

  private function handleUpload($uuid, $file)
  {
    // move the file to /storage/app/public/form/contracts
    $path = storage_path('app/public/commissioning/contracts');
    if (!file_exists($path))
    {
      mkdir($path, 0777, true);
    }

    // create a unique filename (UUID + filename without spaces and special characters)
    $filename = $uuid . '_' . preg_replace('/[^A-Za-z0-9.\-]/', '_', $file->getClientOriginalName());
    $file->move($path, $filename);

    return [
      'uri' => url('/storage/commissioning/contracts/' . $filename),
      'filename' => $filename,
    ];
  }

  private function createCsv($uuid, $data)
  {
    // create a csv file with the data
    $path = storage_path('app/commissioning');
    if (!file_exists($path))
    {
      mkdir($path, 0777, true);
    }

    $filename = $uuid . '.csv';
    $csv = fopen($path . '/' . $filename, 'w');

    foreach ($data as $key => $value)
    {
      // continue if key = uuid
      if ($key == 'uuid')
      {
        continue;
      }

      // if the key is 'users' we need to loop through the array
      if ($key == 'users')
      {
        foreach ($value as $key => $user)
        {
          // create a string with the user data
          $user_string = 'Name: ' . $user->name . ', Email: ' . $user->email . ', Mobile: ' . $user->mobile . ', RFID Karten: ' . $user->qty_cards . ', Parkplatz Nr.: ' . $user->no_parking;
          fputcsv($csv, ['Registrierte Fahrer ' . $key, $user_string]);
        }
        continue;
      }
      else if ($key == 'contract')
      {
        fputcsv($csv, ['Vertrag', $value['uri']]);
        continue;
      }
      else
      {
        fputcsv($csv, [$this->labels[$key], $value]);
      }
    }

    fclose($csv);
    return $filename;
  }
}