# Filtra Maroc

Refonte frontend de [filtra.ma/fr](https://filtra.ma/fr/) : une base visuelle et interactive pour un futur thème PrestaShop. React + Vite, contenu français, prix en dirhams, photos du catalogue réel et une identité océan / sauge.

## Démarrer

Node.js 22.12 ou supérieur.

```sh
npm ci
npm run dev
```

```sh
npm run build
npm run preview
```

## Pages et fonctionnalités

- **Accueil** : TANK Pro en vedette, quatre catégories, sélection de produits, guide de choix, entretien et FAQ.
- **Boutique** : `/#/shop/all`, catégories `filters`, `cartridges`, `dispensers`, `bottles`, recherche, tri des prix et comparaison de trois filtres.
- **Produit** : `/#/product/tank-pro` et huit autres fiches, photos réelles, détails, quantités et cartouches associées.
- **Panier** : ajout, quantités, suppression, persistance locale et total TTC.
- **Commande** : `/#/checkout`, téléphone marocain validé, villes, adresse, livraison offerte, paiement à réception, modification du récapitulatif et confirmation de démonstration.
- **Accessibilité** : navigation clavier, focus des dialogues, fermeture Échap, réduction des animations et mise en page mobile.

## Tests

```sh
npx playwright install chromium
npm test
npm run format:check
```

Tests desktop et mobile : catalogue, recherche, tri, guide de cartouches, focus, galerie, panier persistant, validation du téléphone, autres villes, édition des coordonnées, totaux et confirmation. Captures locales dans `test-results/` (ignoré par Git). GitHub Actions exécute formatage, build et tests.

## Utiliser ce travail dans PrestaShop

Lire [le guide de portage](docs/PRESTASHOP.md) : correspondances entre composants et templates, hooks, données produit, checkout natif, langue et tests de préproduction. Les données sont séparées dans `src/catalog.js` ; les styles spécifiques dans `src/maroc.css`. [Sources des photos](docs/ASSETS.md).

**Ce dépôt n’est pas encore un thème PrestaShop installable.** Il ne modifie pas filtra.ma. Aucune commande, inscription ou donnée personnelle n’est envoyée. Seul le panier est enregistré dans le navigateur ; les coordonnées restent en mémoire jusqu’à la fermeture ou au rechargement. Les prix et politiques sont un instantané du site public observé le 16 septembre 2026 ; la version finale devra utiliser les données du serveur.

Les liens de contact, compte et mentions légales ouvrent la boutique existante. La maquette est en français ; une version arabe nécessite traduction et validation RTL lors du portage.
