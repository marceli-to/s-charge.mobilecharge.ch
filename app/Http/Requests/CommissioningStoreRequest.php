<?php
namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;

class CommissioningStoreRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   *
   * @return bool
   */

  public function authorize()
  {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array
   */

  public function rules()
  {
    return [
      'subscription' => 'required',
      'subscription_payment' => 'required_if:subscription,pay,pay+',
      'subscription_payment_ew' => 'required_if:subscription,pay+',
      'subscription_payment_power_product' => 'required_if:subscription,pay+',
      'subscription_meter_type' => 'required_if:subscription,pay+',
      'subscription_meter_commissioning_date' => 'required_if:subscription_meter_type,new',
      'subscription_meter_commissioning_quarter' => 'required_if:subscription_meter_type,existing',
      'subscription_meter_number' => 'required_if:subscription_meter_type,existing',
      'location_address' => 'required',
      'location_zip' => 'required',
      'location_city' => 'required',
      'operator' => 'required',
      'operator_company' => 'required_if:operator,new',
      'operator_contact' => 'required_if:operator,new',
      'operator_phone' => 'required_if:operator,new',
      'operator_email' => 'required_if:operator,new',
      'operator_address' => 'required_if:operator,new',
      'operator_zip' => 'required_if:operator,new',
      'operator_location' => 'required_if:operator,new',
      'operator_existing_company' => 'required_if:operator,existing',
      'finance_company' => 'required_if:subscription,connect,pay,pay+',
      'finance_address' => 'required_if:subscription,connect,pay,pay+',
      'finance_zip' => 'required_if:subscription,connect,pay,pay+',
      'finance_city' => 'required_if:subscription,connect,pay,pay+',
      'finance_bank' => 'required_if:subscription,connect,pay,pay+',
      'finance_bank_account' => 'required_if:subscription,connect,pay,pay+',
      'finance_iban' => 'required_if:subscription,connect,pay,pay+',
      'rfid_tariff' => 'sometimes|required_unless:subscription,basic|required_without:qr_tariff',
      'qr_tariff' => 'sometimes|required_unless:subscription,basic|required_without:rfid_tariff',
      'users.*.name' => 'required',
      'users.*.email' => 'required|email',
      'users.*.mobile' => 'required',
      'users.*.qty_cards' => 'required',
    ];
  }

  /**
   * Custom message for validation
   *
   * @return array
   */

  public function messages()
  {
    return [
      'subscription.required' => [
        'group' => 'subscription',
        'field' => 'subscription',
        'error' => 'Abonnement wird benötigt'
      ],
      'subscription_payment.required_if' => [
        'group' => 'subscription',
        'field' => 'subscription_payment',
        'error' => 'Zahlung wird benötigt'
      ],
      'subscription_payment_ew.required_if' => [
        'group' => 'subscription',
        'field' => 'subscription_payment_ew',
        'error' => 'Elektrizitätswerk wird benötigt'
      ],
      'subscription_payment_power_product.required_if' => [
        'group' => 'subscription',
        'field' => 'subscription_payment_power_product',
        'error' => 'Stromprodukt wird benötigt'
      ],
      'subscription_meter_type.required_if' => [
        'group' => 'subscription',
        'field' => 'subscription_meter_type',
        'error' => 'Zählertyp wird benötigt'
      ],
      'subscription_meter_commissioning_date.required_if' => [
        'group' => 'subscription',
        'field' => 'subscription_meter_commissioning_date',
        'error' => 'Inbetriebnahmedatum wird benötigt'
      ],
      'subscription_meter_commissioning_quarter.required_if' => [
        'group' => 'subscription',
        'field' => 'subscription_meter_commissioning_quarter',
        'error' => 'Inbetriebnahmequartal wird benötigt'
      ],
      'subscription_meter_number.required_if' => [
        'group' => 'subscription',
        'field' => 'subscription_meter_number',
        'error' => 'Zählernummer wird benötigt'
      ],
      'location_address.required' => [
        'group' => 'location',
        'field' => 'location_address',
        'error' => 'Adresse wird benötigt'
      ],
      'location_zip.required' => [
        'group' => 'location',
        'field' => 'location_zip',
        'error' => 'PLZ wird benötigt'
      ],
      'location_city.required' => [
        'group' => 'location',
        'field' => 'location_city',
        'error' => 'Stadt wird benötigt'
      ],
      'operator.required' => [
        'group' => 'operator',
        'field' => 'operator',
        'error' => 'Betreiber wird benötigt'
      ],
      'operator_company.required_if' => [
        'group' => 'operator',
        'field' => 'operator_company',
        'error' => 'Firma wird benötigt'
      ],
      'operator_contact.required_if' => [
        'group' => 'operator',
        'field' => 'operator_contact',
        'error' => 'Ansprechpartner wird benötigt'
      ],
      'operator_phone.required_if' => [
        'group' => 'operator',
        'field' => 'operator_phone',
        'error' => 'Telefon wird benötigt'
      ],
      'operator_email.required_if' => [
        'group' => 'operator',
        'field' => 'operator_email',
        'error' => 'E-Mail wird benötigt'
      ],
      'operator_email.email' => [
        'group' => 'operator',
        'field' => 'operator_email',
        'error' => 'E-Mail ist ungültig'
      ],
      'operator_address.required_if' => [
        'group' => 'operator',
        'field' => 'operator_address',
        'error' => 'Adresse wird benötigt'
      ],
      'operator_zip.required_if' => [
        'group' => 'operator',
        'field' => 'operator_zip',
        'error' => 'PLZ wird benötigt'
      ],
      'operator_location.required_if' => [
        'group' => 'operator',
        'field' => 'operator_location',
        'error' => 'Ort wird benötigt'
      ],
      'operator_existing_company.required_if' => [
        'group' => 'operator',
        'field' => 'operator_existing_company',
        'error' => 'Firma wird benötigt'
      ],
      'finance_company.required_if' => [
        'group' => 'payouts',
        'field' => 'finance_company',
        'error' => 'Firma wird benötigt'
      ],
      'finance_address.required_if' => [
        'group' => 'payouts',
        'field' => 'finance_address',
        'error' => 'Adresse wird benötigt'
      ],
      'finance_zip.required_if' => [
        'group' => 'payouts',
        'field' => 'finance_zip',
        'error' => 'PLZ wird benötigt'
      ],
      'finance_city.required_if' => [
        'group' => 'payouts',
        'field' => 'finance_city',
        'error' => 'Stadt wird benötigt'
      ],
      'finance_bank.required_if' => [
        'group' => 'payouts',
        'field' => 'finance_bank',
        'error' => 'Bank wird benötigt'
      ],
      'finance_bank_account.required_if' => [
        'group' => 'payouts',
        'field' => 'finance_bank_account',
        'error' => 'Bankkonto wird benötigt'
      ],
      'finance_iban.required_if' => [
        'group' => 'payouts',
        'field' => 'finance_iban',
        'error' => 'IBAN wird benötigt'
      ],
      'rfid_tariff.required_without' => [
        'group' => 'revenue',
        'field' => 'rfid_tariff',
        'error' => 'Tarif wird benötigt'
      ],
      'qr_tariff.required_without' => [
        'group' => 'revenue',
        'field' => 'qr_tariff',
        'error' => 'Tarif wird benötigt'
      ],
      'users.*.name.required' => [
        'group' => 'users',
        'field' => 'users.*.name',
        'error' => 'Name wird benötigt'
      ],
      'users.*.email.required' => [
        'group' => 'users',
        'field' => 'users.*.email',
        'error' => 'E-Mail wird benötigt'
      ],
      'users.*.email.email' => [
        'group' => 'users',
        'field' => 'users.*.email',
        'error' => 'E-Mail ist ungültig'
      ],
      'users.*.mobile.required' => [
        'group' => 'users',
        'field' => 'users.*.mobile',
        'error' => 'Telefon wird benötigt'
      ],
      'users.*.qty_cards.required' => [
        'group' => 'users',
        'field' => 'users.*.qty_cards',
        'error' => 'Anzahl Karten wird benötigt'
      ],

    ];
  }
}