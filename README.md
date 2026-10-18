# Nave 3D — grande nave a vela

Visualizzatore web con **un modello 3D realistico e strutturalmente più grande**, al posto del precedente piccolo galeone. L'interfaccia resta volutamente minimale, con sola camera orbitale/zoom, doppio tap/clic per studiare un dettaglio, panoramica e reset.

## Il modello nuovo

**Ship Pinnace (Poly Haven)**, un'imbarcazione storica di circa **39,8 m di lunghezza e 9,6 m di larghezza**, con tre alberi, coperta lunga e dettagli modellati a scala realistica. La differenza è strutturale: non si aumenta semplicemente lo zoom e non si deforma l'asset precedente. La geometria, i ponti, il sartiame e i materiali appartengono tutti al nuovo modello.

Fonte: https://polyhaven.com/a/ship_pinnace

Autori: **James Ray Cock, Nicolò Zubbini, Rico Cilliers, Yann Kervran**.

Licenza: **CC0 1.0** — https://creativecommons.org/publicdomain/zero/1.0/

Versione web GLB con texture PBR (circa 20 MB), ottenuta da https://www.innerscene.com/tools/library/3d-parts/sailing-pinnace-ship-1aa984c2 , che dichiara di ridistribuire il modello Poly Haven in pubblico dominio.

**Nota storica:** è una *pinnace* coloniale, non la riproduzione di un galeone seicentesco specifico. È stata scelta per la sua coperta più generosa e il maggior dettaglio, mantenendo l'estetica delle navi d'epoca. Non si promettono interni navigabili quando non presenti nel file 3D.

## Modello ospitato localmente

Il modello è caricato prioritariamente da `models/pinnace.glb`, sullo stesso dominio GitHub Pages; l'originale sul sito Innerscene è un fallback nel caso il file locale non sia ancora presente e il server permetta l'accesso CORS.

L'importazione automatizzata è implementata in `.github/workflows/import-pinnace.yml` e si può avviare da **Actions → Import high-detail ship model → Run workflow**. Il workflow verifica che il file sia davvero un GLB, prima di committarlo su `main`. Per completare il deploy occorre che il workflow abbia **permessi di scrittura sui contents** e che il download termini correttamente.

Il modello precedente non viene più utilizzato. Se l'importazione fallisce, il viewer presenta un messaggio d'errore, senza fingere di mostrare il nuovo modello.

## Comandi

- Trascina per ruotare la telecamera.
- Rotellina o pinch per ingrandire/ridurre.
- Tasto destro o due dita per spostare la vista.
- Doppio clic/doppio tap su un dettaglio per avvicinarti.
- Piccolo pulsante ↶ oppure **R** per tornare alla vista iniziale.

## Avvio e pubblicazione

```bash
python3 -m http.server 8000
```

Apri `http://localhost:8000/`. Il sito è statico e GitHub Pages può pubblicarlo direttamente da `main` / `root`.

URL: https://maryvellous.github.io/nave-3d/

## Verifiche

- `node --test tests/source.test.mjs`: codice, strutture essenziali, sintassi JavaScript.
- `.github/workflows/verify.yml`: smoke test con Chromium, cattura screenshot desktop e mobile e fallisce se il modello non viene caricato.
- I test automatici non garantiscono da soli la qualità visiva: controllare anche nel browser reale, soprattutto su telefono.
