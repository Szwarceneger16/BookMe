@component('mail::message')
<b>Cześć {{$reservation['client']}}, <b><br>
<h1> Twoja rezerwacja została zarejestrowana:</h1>
Termin rozpoczęcia: {{ $reservation['datetime_start'] }}<br>
Termin zakończenia: {{ $reservation['datetime_end']}}<br>
Usługa: {{ $reservation['service'] }}<br>
Pracownik: {{ $reservation['employee'] }}<br>
<br>
Dziękujemy,<br>
{{ config('app.name') }}
@endcomponent
