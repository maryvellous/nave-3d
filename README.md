# Galeone 3D

Visualizzatore essenziale per osservare e ingrandire un **vero modello 3D di galeone**, con mouse o touch. Nessuna scenografia cosmica: la reference originale riguarda la **struttura della nave** (scafo alto, più ponti, vele quadre, sartiame, poppa elaborata), non l'ambiente circostante.

La vecchia galea procedurale con remi e decine di controlli è stata completamente eliminata.

## Comandi
- Trascina (mouse o dito) per girare attorno al galeone.
- Rotellina o pinch per zoomare; tasto destro o due dita per spostare il centro della camera.
- Pulsante discreto ↶ oppure **R** per ripristinare la vista.
- Unica scritta persistente: attribuzione richiesta dalla licenza del modello.

## Modello utilizzato

**Nautical Galleon** di **R-LAB (rakshaan)**, disponibile su Sketchfab: https://sketchfab.com/3d-models/nautical-galleon-870b8df2456241269cbc030a101edc50

Licenza: **Creative Commons Attribution 4.0 (CC BY 4.0)** — https://creativecommons.org/licenses/by/4.0/

Il GLB si trova in un altro progetto aperto, https://github.com/urcraft/ship-in-a-bottle, che ne documenta l'origine in `public/models/ATTRIBUTION.md` e lo ridistribuisce con accredito a R-LAB. La web app carica il modello da questo progetto (prima dal deploy GitHub Pages, poi dal GitHub Raw / jsDelivr come fallback). **Il file binario GLB non è vendorizzato in questo repository** e il caricamento richiede una connessione e che almeno uno di questi servizi sia disponibile. In caso di fallimento l'app mostra un errore chiaro. Per produzione autonoma e affidabilità massima conviene in seguito archiviare una copia del GLB con attribution nel repo.

Il modellino non è una ricostruzione filologica certificata, ma un asset artistico esterno. Non alteriamo la struttura o la geometria del galeone; il viewer lo centra, regola luce e camera, nasconde solo eventuali podi da esposizione compresi nel GLB.

## Avvio
Servi la cartella con un server statico, per esempio:

```bash
python3 -m http.server 8000
```

Apri `http://localhost:8000/`. Three.js viene caricato da jsDelivr via import map: non ci sono dipendenze di build, Node, database o API.

## Deploy GitHub Pages
**Settings → Pages → Deploy from a branch → main → / (root)**.

Il sito dovrebbe diventare disponibile all'indirizzo https://maryvellous.github.io/nave-3d/.

## Verifiche
`node --test tests/source.test.mjs` esegue controlli statici. Il workflow GitHub Actions `verify.yml` prova a caricare il GLB in Chromium e conserva screenshot desktop/mobile. Una risposta positiva del test browser è necessaria prima di dichiarare il viewer visivamente verificato.
