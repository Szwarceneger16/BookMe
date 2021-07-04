###### English version of description coming soon.
# BookMe
Jest to aplikacja pozwalająca na umawianie się na wizyty dla **dowolnej placówki** np. przychodni, salonu kosmetycznego.
Aplikacja składa się z trzech panelów.
1. **Panel klienta** - pozwalający sprawdzić, odwołać, ponownie opłacić wizytę,
2. **Panel specjalisty** - pozwalający zobaczyć nadchodące wizyty,
3. **Panel administratora** - najbardziej rozbudowany, pozwala dodać specjalistów, przypisać im godziny pracy, dodać usługi w placówce, oraz więcej.

Dowolny klient może wybrać odpowiadającego mu specjalistę i usługę, a następnie termin. Po wybraniu terminu może założyć konto, zalogować się i finalnie opłacić kaucję za wizytę.
___
Projekt został stworzony w ramach zajęć *"Inżynierski projekt zespołowy 2"* Przez następujące osoby:
* [Krzysztof Osman](https://github.com/OsmanK98) Backend developer
* [Grzegorz Szwarc](https://github.com/Szwarceneger16) Frontend developer
* [Patryk Kowalczyk](https://github.com/Patryk-Kowalczyk) Fullstack developer

Instalacja
-
Projekt można odpalić przy pomocy **Dockera**.
Należy najpierw w katalogu ```backend``` skonfigurować  plik ```.env```

Po sklonowaniu repozytorium w katalogu projektu należy uruchomić komendę
```
docker-compose up
```
Następnie przy uruchomionych kontenerach uruchomić migrację
```
docer exec -it bookme_docker_bookme_backend_1 php artisan migrate
```
I wgrać seedery
```
docer exec -it bookme_docker_bookme_backend_1 php artisan db:seed
```