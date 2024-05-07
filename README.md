# ÖV-Now

## Beschreibung
ÖV-Now ist eine App, die Sie über den Verkehr auf dem Laufenden hält, so dass Sie immer die beste Route wählen können.

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
Zuerst wollten wir intuitiv die Daten von der SBB oder OpenData.ch beziehen. Leider sind alle diese API's etwas anderes als wir benötigen oder / und sie sind nicht zugänglich für nichts zahlende Studenten. 

### Limitationen
#### Genauigkeit
Die Positionierungsgenauigkeit ist uns nicht bekannt, ebenfalls ist uns nicht bekannt über welche Hard & Software die Positionierung erstellt wird.

Und wurde vom Opendata-Verantworlichen* der SBB bestätigt, was ebenfalls bei GeoOps im kleingedruckten steht: Die Aktuelle Position der Züge gibt es in Westeuropa nicht. Es gibt keinen Datensatz, der unseren Use-case tatsächlich abdeckt. 

*Kontakt konnte nur hergestellt werden indem auf GitHub ein Issue eröffnet wurde

Alle Vorbilder wie
[https://maps.trafimage.ch/](https://maps.trafimage.ch/ch.sbb.netzkarte?baselayers=ch.sbb.netzkarte,ch.sbb.netzkarte.dark,ch.sbb.netzkarte.luftbild.group,ch.sbb.netzkarte.landeskarte,ch.sbb.netzkarte.landeskarte.grau&lang=de&layers=ch.sbb.puenktlichkeit-ferry,ch.sbb.puenktlichkeit-bus,ch.sbb.puenktlichkeit-tram,ch.sbb.puenktlichkeit-nv,ch.sbb.puenktlichkeit-fv,ch.sbb.ch_gemeinden,ch.sbb.netzkarte.buslinien,ch.sbb.bahnhofplaene.printprodukte&x=959424.28&y=5870241.48&z=9.46)
https://www.map.signalbox.io/?train=202402276727821&location=@52.59865,-1.98746,9Z
https://mobility.portal.geops.io/world.geops.transit?layers=paerke,strassennamen,haltekanten,haltestellen,pois,tramlinien,world.geops.traviclive&x=941076.59&y=5983545.01&z=9.18



#### Zugriff
-> Tabellen

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

