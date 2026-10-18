# La Galea — Atlante navale 3D

Web app statica, responsive e interattiva: una ricostruzione **interpretativa** di galea da guerra mediterranea del XVII secolo, costruita tramite geometria procedurale con Three.js. Non è la replica filologica o metrologica di un singolo esemplare.

## Esplora
- Ruota con mouse/touch, zoom con rotellina/pinch, pan con tasto destro/due dita.
- Quattro punti di vista (tre quarti, fiancata, prua, dall'alto), ripristino camera.
- Accendi/spegni vele, remi, rotazione automatica, etichette.
- Schermo intero e scorciatoie: **R** ripristina, **F** fullscreen.

## Elementi modellati
Scafo lungo e sottile con fasciame e modanature, 24 coppie di remi e relativi banchi/strutture esterne, corsia centrale, 2 alberi con vele latine triangolari e manovre, cinque cannoni di prua, sperone, casseretto di poppa con padiglione e decorazioni, ancore di stile e supporto museale.

La geometria è generata in JavaScript senza asset 3D remoti. Le librerie Three.js e OrbitControls vengono caricate da jsDelivr tramite import map.

## Avvio locale
È sufficiente servire la cartella con un server statico, ad esempio:
```bash
python3 -m http.server 8000
```
Aprire http://localhost:8000. Non usare direttamente file://: i moduli ES richiedono un'origine HTTP(S).

## Deploy gratuito
**Vercel** → Add New → Project → Importa `maryvellous/nave-3d` → Framework Preset **Other** → Root `./` → Build Command **vuoto** → Output Directory **./** → Deploy.

Oppure **Cloudflare Pages** → Connect to Git → framework **None**, build command vuoto, output `.`.

> Il repository è privato: per connetterlo, concedere al provider di hosting il permesso di leggerlo. Nessun costo backend o database; i limiti dipendono dal piano di hosting scelto.

## Fonti e criteri storici
La ricostruzione si ispira al tipo generico delle galee mediterranee dell'età moderna (non a una nave nominativa).
- [Mozaik — Maltese galley (17th century)](https://www.mozaweb.com/en_US/Extra-3D_scenes-Maltese_galley-4736968)
- [DePaul University — The Galley and the Galleon](https://dpuspecialcollections.omeka.net/exhibits/show/mediterranean/travel/galley)
- [Renaissance War Galley 1470–1590, Osprey](https://ciia-historia-militar.iniseg.es/administracion/public/uploads/adjuntos/renaissance-war-galley-1470-1590.pdf)

Il numero dei remi, le decorazioni, le proporzioni minute e il rigging sono scelte visuali approssimative. Sono previsti affinamenti e riscontri visivi dopo test browser reali.

## Licenza
Codice originale destinato al progetto `nave-3d`. Three.js è distribuito con licenza MIT; font web Google Fonts soggetti alle rispettive licenze.
