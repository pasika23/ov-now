# ÖV-Now

## Beschreibung
ÖV-Now ist eine App, die Sie über den Verkehr auf dem Laufenden hält, so dass Sie immer die beste Route wählen können.
Die Details entnehmen sie unserer GitHub (Page)[Mattia-V01.github.io/ov-now/]

## Installation
1. Klone das Repository auf deinen Computer:
   ```
   git clone git@github.com:benutzername/ov-now.git
   ```
2. Navigiere in das Hauptverzeichnis des Projekts:
   ```
   cd ..\ov-now\client
   ```
3. Installiere die Abhängigkeiten:
   ```
   npm install
   ```

## Konfiguration
löschen vor Abgabe wenn nichts reinkommt.

## Backend

### Datenabfrage

### Datenherkunft
Zuerst wollten wir intuitiv die Daten von der SBB oder OpenData.ch beziehen. Leider sind alle diese API's etwas anderes als wir benötigen oder / und sie sind nicht zugänglich für nichts zahlende Studenten. So endeten wir bei GeoOps. 

### Limitationen
#### Genauigkeit
Die Positionierungsgenauigkeit ist uns nicht bekannt, ebenfalls ist uns nicht bekannt über welche Hard & Software die Positionierung erstellt wird.

Und wurde vom Opendata-Verantworlichen* der SBB bestätigt, was ebenfalls bei GeoOps im kleingedruckten steht: Die Aktuelle Position der Züge gibt es in Westeuropa nicht. Es gibt keinen Datensatz, der unseren Use-case tatsächlich abdeckt. 

*Kontakt konnte nur hergestellt werden indem auf GitHub ein Issue eröffnet wurde

Alle Vorbilder wie folgende sind sommit nicht akkurat. Das heisst die gezeigten Positionen sind nicht real, sondern nur Interpolationen aus den Streckenabschnitten, den Abfahrtszeiten und Verspätungen.
[https://maps.trafimage.ch/](https://maps.trafimage.ch/ch.sbb.netzkarte?baselayers=ch.sbb.netzkarte,ch.sbb.netzkarte.dark,ch.sbb.netzkarte.luftbild.group,ch.sbb.netzkarte.landeskarte,ch.sbb.netzkarte.landeskarte.grau&lang=de&layers=ch.sbb.puenktlichkeit-ferry,ch.sbb.puenktlichkeit-bus,ch.sbb.puenktlichkeit-tram,ch.sbb.puenktlichkeit-nv,ch.sbb.puenktlichkeit-fv,ch.sbb.ch_gemeinden,ch.sbb.netzkarte.buslinien,ch.sbb.bahnhofplaene.printprodukte&x=959424.28&y=5870241.48&z=9.46)
[https://www.map.signalbox.io/](https://www.map.signalbox.io/?train=202402276727821&location=@52.59865,-1.98746,9Z)
[https://mobility.portal.geops.io/](https://mobility.portal.geops.io/world.geops.transit?layers=paerke,strassennamen,haltekanten,haltestellen,pois,tramlinien,world.geops.traviclive&x=941076.59&y=5983545.01&z=9.18)

Wir haben auch keine Angaben zu der Genauigkeit temporalen Auflösung, wir werden jedoch selbst aus im nächsten Kapitel folgenden Gründen darauf beschränken, die Daten in grösseren Zeitlichen Abständen zu beziehen als für eine Produktive App eigentlich notwendig:

#### Zugriff
Da die SBB & OpenData -Spuren beide im Sand verliefen nutzen wir nun die Daten der [GeoOps-API](https://developer.geops.io/apis/realtime). Diese ist eigentlich eine kostenpflichtige API aber bietet eine gratis Testmöglichkeit nachdem man einen Account erstellt hat. Das Pricing ist in folgender Tabelle ersichtlich:

| SERVICE | UNIT | CREDITS |
|:------------------ |:-------------------:| -------------------:|
| Maps Standard | 1000 requests for vector tiles | 1 |
| Maps Raster | 1000 requests for raster map tiles | 10 |
| Routing | 1000 routing requests | 25 |
| Stops | 1000 search requests for stops | 10 |
| Realtime via Get | 1000 requests for vehicle position, stop times | 5 |
| Realtime via Websocket | 1000 minutes of open websocket connection | 50 |

Hierbei hat man 100 Credits pro Monat zur Verfüguung. Wir haben verschiedene Accounts die wir jeweils durchswapen können.


#### Weitere Mögliche Datenquellen:

* allgemeine Zugstörungsinformationen oder alle anderen Daten der SBB auf diesem Portal über die folgenden Links:
https://data.sbb.ch/explore/dataset/rail-traffic-information/api/
https://data.sbb.ch/api/explore/v2.1/console
https://data.sbb.ch/explore/?sort=modified


* Haltestellen des öffentlichen Verkehres
https://www.geocat.ch/geonetwork/srv/ger/catalog.search#/metadata/841d42ff-8177-4e07-a96b-e8e5455ae048


### Datenverarbeitung

#### Slicing
Pascal

#### Weiterverarbeitung
Pascal

## Frontend
1. Navigiere in das Verzeichnis `client`:
   ```
   cd ..\ov-now\client
   ```
2. Starte den Frontend-Server:
   ```
   npm start
   ```

## Verwendung
1. Öffne deinen Browser und gehe zu `http://localhost:3000`.
2. 
3. 
4. 

