# Sources des visuels

Photos du catalogue de [Filtra Maroc](https://filtra.ma/fr/), exportées le 16 septembre 2026 pour la refonte demandée par le propriétaire de la boutique. Les fichiers locaux évitent la dépendance aux hotlinks et à la protection anti-bot du site.

| Fichier dans `public/products/` | Source                                                                        |
| ------------------------------- | ----------------------------------------------------------------------------- |
| `logo.webp`                     | `https://filtra.ma/img/logo.png`                                              |
| `tank-pro.webp`                 | `https://filtra.ma/24-home_default/tank-pro-filter-6-purification-noirr.jpg`  |
| `tank-pro-large.webp`           | `https://filtra.ma/24-large_default/tank-pro-filter-6-purification-noirr.jpg` |
| `tank-pro-detail.webp`          | `https://filtra.ma/25-home_default/tank-pro-filter-6-purification-noirr.jpg`  |
| `tank-pro-side.webp`            | `https://filtra.ma/26-home_default/tank-pro-filter-6-purification-noirr.jpg`  |
| `tank-pro-s.webp`               | `https://filtra.ma/30-home_default/tank-pro-s.jpg`                            |
| `tank-power.webp`               | `https://filtra.ma/37-home_default/tank-power-3-stages.jpg`                   |
| `cartridge-pf.webp`             | `https://filtra.ma/48-home_default/tank-pro-ro-cartridge-pf.jpg`              |
| `koldair.webp`                  | `https://filtra.ma/51-home_default/koldair-bottom-load-a-black.jpg`           |
| `tank-ro.webp`                  | `https://filtra.ma/78-home_default/tank-pro-ro.jpg`                           |
| `pack-power.webp`               | `https://filtra.ma/155-home_default/tank-cartridge-economy-pack-3-stages.jpg` |
| `bottle.webp`                   | `https://filtra.ma/141-home_default/ice-bottle-4.jpg`                         |
| `cartridge-pro.webp`            | `https://filtra.ma/119-home_default/cartridge-pro-6.jpg`                      |

Le serveur fournit du WebP malgré les extensions historiques JPG/PNG ; les fichiers locaux portent le type réel. Aucun retrait de fond ou changement du produit : `object-fit: contain` et `mix-blend-mode: multiply` assurent l’intégration en CSS. Les visuels restent soumis aux droits de leurs titulaires et sont inclus pour la refonte de cette boutique.
