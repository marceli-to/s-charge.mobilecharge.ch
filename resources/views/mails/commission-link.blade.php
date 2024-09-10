@component('mail::message')
# {{ __('Inbetriebnahme Formular') }}

{{__('Mit folgendem Link können Sie das Inbetriebnahme Formular jederzeit weiterbearbeiten:')}}<br><br>{{ $data['url'] }}<br><br>

Freundliche Grüsse<br>

Ferratec Technics AG<br>
Grossmattstrasse 19<br>
8964 Rudolfstetten<br>
Tel +41 56 649 21 21<br>
Fax +41 56 649 21 41<br>
info@ferratec.ch

@endcomponent
