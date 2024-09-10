<?php
namespace App\Mail;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class CommissionOwner extends Mailable
{
  use Queueable, SerializesModels;

  protected $data;

  /**
   * Create a new message instance.
   *
   * @return void
   */
  public function __construct($data)
  {
    $this->data = $data;
  }

  /**
   * Build the message.
   *
   * @return $this
   */
  public function build()
  {

    $mail = $this->from(['address' => env('TENANT_MAIL_FROM')])
                 ->subject('Inbetriebnahme Formular')
                 ->with(['data' => $this->data['data']])
                 ->markdown('mails.commission-owner');

    // make sure the file exists
    if (file_exists(storage_path('app/commissioning/' . $this->data['data']['csv'])))
    {
      $mail->attach(storage_path('app/commissioning/' . $this->data['data']['csv']), ['mime' => 'text/csv']);
    }

    return $mail;
  }
}
