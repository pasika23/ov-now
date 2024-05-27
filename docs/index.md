---
layout: default
---
# ÖV-Now
## Motivation {#motivation}
Wir haben festgestellt, dass jemand, der sich die Informationen in der SBB-App anschaut, keine visuelle Bestätigung dafür hat, wo sich das öffentliche Verkehrsmittel, mit dem er unterwegs ist, in der Realität befindet. Dies kann zu Schwierigkeiten bei der Auswahl der besten Verbindungen führen, um das Ziel so einfach wie möglich zu erreichen.


## Ziel {#ziel}
Das Ziel dieses Projekts ist es, ein Geoportal zu schaffen, das die Visualisierung von Live-Daten aller Verkehrsmittel in der Schweiz ermöglicht. Dies wird die Wahl der Routen erleichtern, um Verspätungen zu vermeiden und mögliche unvorhergesehene Zwischenfälle zu beheben.


## Workflow {#workflow}


## ÖV-Now im konkret {#app}
### Architectur {#architektur}


### Datenbankmodell {#Datenbankmodell}


### Programmiersprachen {#Programmiersprachen}


### Bezugssystem {#bezugssystem}
Die bezogenen Daten aus der API stehen im EPSG: 3857 (Web Mercator) zur Verfügung. Die Punktkoordinaten werden ohne Transformation verwendet und auf der Karte abgebildet.


### Anwendung {#anwendung}
<video width="500" height="auto" controls>
  <source src="assets/img/Demo.mp4" type="video/mp4">
</video>
 
Wir gehen davon aus, dass die App vor allem von Personen genutzt wird, die täglich Verkehrsmittel benutzen, und zwar hauptsächlich auf mobilen Geräten.
Nachdem man sich in der App angemeldet hat, kann man auf der Karte nach dem gewünschten Verkehrsmittel suchen oder die entsprechenden Attribute in die Suchleiste eingeben.
Wenn Sie sich in einem Gebiet befinden, in dem die öffentlichen Verkehrsmittel sehr stark frequentiert sind, können Sie das Dropdown-Menü auf der rechten Seite verwenden, um die Ebenen, die Sie anzeigen möchten, ein- oder auszuschalten.
Wenn Sie die gewünschte Linie oder das gewünschte Verkehrsmittel gefunden haben, können Sie diese anklicken. Sie werden auf eine neue Seite weitergeleitet, auf der Ihnen, ähnlich wie bei der ffs-App, die Daten zur Linie und zum Verkehrsmittel angezeigt werden. Diese Daten können Verspätungen, Streckenänderungen, Zugausfälle und mehr sein.
Wenn Sie jemanden über Ihre Reise benachrichtigen wollen, vielleicht weil Sie Verspätung haben oder eine Änderung eingetreten ist, können Sie den Link zur Seite mit einer einfachen Schaltfläche teilen.
Wenn Sie mit der Infopage fertig sind, können Sie zur Karte zurückkehren, um neue Routen anzuzeigen.


## Frontend {#frontend}


### Symbologie {#symbologie}
Um die Verkehrsmittel und die Strecken, auf denen sie verkehren, zu unterscheiden, wurden Symbole eingeführt.
Die Transportsymbole stammen aus der React-Komponentenbibliothek: Material UI. Genauer gesagt aus Material Icons.

<div style="display: flex; align-items: center; margin-bottom: 10px;">
  <img src="assets/img/Buslinien.png" style="display:block; margin: 0;" alt="Buslinien"/>
</div>

<div style="display: flex; align-items: center; margin-bottom: 10px;">
  <img src="assets/img/Bus.png" style="display:block; margin: 0;" alt="Bus"/>
  <span style="margin-left: 10px;">Bus</span>
</div>

<div style="display: flex; align-items: center; margin-bottom: 10px;">
  <img src="assets/img/Zuglinien.png" style="display:block; margin: 0;" alt="Zuglinien"/>
</div>

<div style="display: flex; align-items: center; margin-bottom: 10px;">
  <img src="assets/img/Zug.png" style="display:block; margin: 0;" alt="Zug"/>
  <span style="margin-left: 10px;">Zug</span>
</div>

<div style="display: flex; align-items: center; margin-bottom: 10px;">
  <img src="assets/img/Tramlinien.png" style="display:block; margin: 0;" alt="Tramlinien"/>
</div>

<div style="display: flex; align-items: center; margin-bottom: 10px;">
  <img src="assets/img/Tram.png" style="display:block; margin: 0;" alt="Tram"/>
  <span style="margin-left: 10px;">Tram</span>
</div>

<div style="display: flex; align-items: center; margin-bottom: 10px;">
  <img src="assets/img/Schiffelinien.png" style="display:block; margin: 0;" alt="Schiffelinien"/>
</div>

<div style="display: flex; align-items: center; margin-bottom: 10px;">
  <img src="assets/img/Schiffe.png" style="display:block; margin: 0;" alt="Schiffe"/>
  <span style="margin-left: 10px;">Schiffe</span>
</div>


### Website Konzept {#website-konzept}
Wir möchten, dass sich unsere App an den Stil der ffs-App anlehnt, so dass die Menschen bereits an den Stil gewöhnt sind und keine Schwierigkeiten haben, die Informationen zu finden.
Unabhängig vom Stil der ffs-App möchten wir, dass unsere App leicht zu lesen und für jeden zugänglich ist.


### Mainpage {#mainpage}
Die Oberfläche der Hauptseite (diejenige, auf die man gelangt, wenn man die App öffnet) hat die Karte in ihrem Zentrum, sie dient als Hintergrund der App, muss aber auch im Mittelpunkt der Aufmerksamkeit des Nutzers stehen.
Aus diesem Grund wurden alle zusätzlichen Funktionen wie Ebenen und die Suchleiste an den Seiten des Bildschirms angebracht.
Bei der Anwendung wird zwischen einer Desktop- und einer mobilen Version unterschieden.

![GUI_Desktop_Main](assets/img/GUI_Desktop_Main.png){: style="display:block; margin: 0 auto;"}
In der Desktop-Version wurde versucht, die Komponenten mit eckigen Formen darzustellen, um die Ähnlichkeit mit der Bildschirmform von Laptops oder PCs zu erhalten.

![GUI_Mobile_Main](assets/img/GUI_Mobile_Main.png){: style="display:block; margin: 0 auto;"}
Im Gegensatz dazu haben die Bildschirme von Smartphones in der Regel eine eher runde Form.

Hoch über der Karte steht der Name der App auf rotem Hintergrund. Der Hintergrund soll an den Stil der SBB-App erinnern.
Alles in allem kann man von einer minimalistischen GUI sprechen, die das Lesen für die Nutzer nicht erschwert.


### Infopage {#infopage}
Auf dieser Seite werden die Daten der gewünschten Route dargestellt, diese Daten müssen im Mittelpunkt stehen.
Auch auf dieser Seite wurde, wie auf der Hauptseite, die Ähnlichkeit der Komponenten mit der Form des Bildschirms gesucht.

![GUI_Desktop_Infopage](assets/img/GUI_Desktop_Infopage.png){: style="display:block; margin: 0 auto;"}
Oben finden Sie die allgemeinen Daten der Linie, wie z. B. die Liniennummer, die Art des Verkehrsmittels, den Abfahrts- und Ankunftsort.

![GUI_Mobile_infopage](assets/img/GUI_Mobile_infopage.png){: style="display:block; margin: 0 auto;"}
Im Hauptteil finden Sie ein Liniendiagramm, das alle Bahnhöfe auf der Strecke mit eventuellen Verspätungen anzeigt, außerdem können Sie die Verbindungen für jeden Bahnhof einsehen
Die Farben Grün und Rot zeigen an, ob das Verkehrsmittel normal oder mit Verspätung verkehrt.
Vorerst nur eine Idee, es ist auch geplant, die verschiedenen Verkehrsmittel mit einem anderen Hintergrund darzustellen. Dadurch soll der Benutzer auf einen Blick erkennen, um welches Verkehrsmittel es sich handelt.

### Features {#features}

**BackgroundButton-Komponente**

Die `BackgroundButton`-Komponente ist ein vielseitiges und interaktives Element, das die Benutzererfahrung verbessert, indem es dynamische Hintergrundänderungen auf einer Karte ermöglicht. Diese Komponente ist mit React erstellt und integriert sich nahtlos mit OpenLayers zur Kartendarstellung.

**Hauptfunktionen**

- **Dynamisches Hintergrundwechseln**: Benutzer können zwischen verschiedenen Hintergrundkarten wechseln, einschließlich farbiger und grauer Karten, Luftbilder und OpenStreetMap.
- **Reaktionsfähiges Menü**: Die Komponente enthält ein reaktionsfähiges Dropdown-Menü, das verschiedene Hintergrundoptionen als klickbare Bilder anzeigt.
- **Effizientes Layer-Management**: Es wird sichergestellt, dass der vorherige Hintergrund-Layer entfernt wird, bevor ein neuer hinzugefügt wird, um die optimale Kartenleistung zu erhalten.
- **GeoData-Abruf**: Nach dem Ändern des Hintergrunds ruft die Komponente die relevanten Geodaten für den ausgewählten Hintergrundtyp ab und aktualisiert sie.

**Detaillierte Beschreibung**

1. **State-Management**: Verwendet React's `useState`, um den Zustand des Dropdown-Menüs (`menuOpen`) zu verwalten.
2. **Ereignisbehandlung**: Die Funktion `toggleMenu` schaltet die Sichtbarkeit des Dropdown-Menüs um, während `handleBackgroundChange` den Hintergrundwechsel und den Datenabruf verwaltet.
3. **Layer-Entfernung**: Die Funktion `removeBackgroundLayer` stellt sicher, dass der vorherige Hintergrund-Layer entfernt wird, um Stapelung und Leistungsprobleme zu vermeiden.
4. **Hintergrundbild-Quelle**: Die Funktion `backgroundImageSrc` gibt basierend auf dem ausgewählten Kartentyp die entsprechende Bildquelle zurück.


## Von Backend bis Frontend {#Von-Backend-bis-Frontend}


## Backend {#backend}
### Datenherkunft {#Datenherkunft}
Zuerst wollten wir intuitiv die Daten von der SBB oder OpenData.ch beziehen. Leider sind alle diese API's etwas anderes als wir benötigen oder / und sie sind nicht zugänglich für nichts zahlende Studenten. So endeten wir bei GeoOps. 


### Limitationen in der Genauigkeit {#Limitationen1}
Die Positionierungsgenauigkeit ist uns nicht bekannt, ebenfalls ist uns nicht bekannt über welche Hard & Software die Positionierung erstellt wird.

Und wurde vom Opendata-Verantworlichen* der SBB bestätigt, was ebenfalls bei GeoOps im kleingedruckten steht: Die Aktuelle Position der Züge gibt es in Westeuropa nicht. Es gibt keinen Datensatz, der unseren Use-case tatsächlich abdeckt. 

*Kontakt konnte nur hergestellt werden indem auf GitHub ein Issue eröffnet wurde

Alle Vorbilder wie folgende sind sommit nicht akkurat. Das heisst die gezeigten Positionen sind nicht real, sondern nur Interpolationen aus den Streckenabschnitten, den Abfahrtszeiten und Verspätungen.
[https://maps.trafimage.ch/](https://maps.trafimage.ch/ch.sbb.netzkarte?baselayers=ch.sbb.netzkarte,ch.sbb.netzkarte.dark,ch.sbb.netzkarte.luftbild.group,ch.sbb.netzkarte.landeskarte,ch.sbb.netzkarte.landeskarte.grau&lang=de&layers=ch.sbb.puenktlichkeit-ferry,ch.sbb.puenktlichkeit-bus,ch.sbb.puenktlichkeit-tram,ch.sbb.puenktlichkeit-nv,ch.sbb.puenktlichkeit-fv,ch.sbb.ch_gemeinden,ch.sbb.netzkarte.buslinien,ch.sbb.bahnhofplaene.printprodukte&x=959424.28&y=5870241.48&z=9.46)
[https://www.map.signalbox.io/](https://www.map.signalbox.io/?train=202402276727821&location=@52.59865,-1.98746,9Z)
[https://mobility.portal.geops.io/](https://mobility.portal.geops.io/world.geops.transit?layers=paerke,strassennamen,haltekanten,haltestellen,pois,tramlinien,world.geops.traviclive&x=941076.59&y=5983545.01&z=9.18)

Wir haben auch keine Angaben zu der Genauigkeit temporalen Auflösung, wir werden jedoch selbst aus im nächsten Kapitel folgenden Gründen darauf beschränken, die Daten in grösseren Zeitlichen Abständen zu beziehen als für eine Produktive App eigentlich notwendig:


### Limitationen im Zugriff {#Limitationen2}
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


### alternative API {#alternative-API}

* allgemeine Zugstörungsinformationen oder alle anderen Daten der SBB auf diesem Portal über die folgenden Links:
https://data.sbb.ch/explore/dataset/rail-traffic-information/api/
https://data.sbb.ch/api/explore/v2.1/console
https://data.sbb.ch/explore/?sort=modified


* Haltestellen des öffentlichen Verkehres
https://www.geocat.ch/geonetwork/srv/ger/catalog.search#/metadata/841d42ff-8177-4e07-a96b-e8e5455ae048


## Endpoints {#endpoints}

Das backend.py ist das Backend, dass auf dem Server laufen kann und 2 Enpoints anbietet:
(Dazu einfach pip install fastAPI und die anderen Bibliotheken)
Im Code hat es in den Kommentaren Beispiel-Abfragen falls es im Localhost ausgeführt wird: 
http://localhost:8000/get_all_journey/?bbox=838667,5997631,909982,6036843&key=5cc87b12d7c5370001c1d65576ce5bd4be5a4a349ca401cdd7cac1ff&zoom=12
http://localhost:8000/get_info/?train_id=sbb_139707706285552&key=5cc87b12d7c5370001c1d65576ce5bd4be5a4a349ca401cdd7cac1ff

Im Ordner example_backend_endpoints gibt es für beide Abfragen Beispiele.
Beachtet dass das ausführen des ersten Endpoints bei grosser Bounding Box mehrere Minuten gehen kann

Der erste Endpoint get_all_journey soll aufgeruft werden sobald die App initialisiert wird. Mit der dargestellten Bounding Box wird das als String mit dem Zoom Level und dem Key an den Endpoint abgegeben, dieser ruft die GeOps-API get_trajectories auf und dann für jeden erhaltenen train_ID noch einmal die get_journey.

Der zweite Endpoint get_info gibt das die GeOps-Abfrage von get_calls zurück.


## Daten {#daten}
### Slicing {#Slicing}
Pascal


### Weiterverarbeitung {#Weiterverarbeitung}
Pascal

