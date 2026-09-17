# Filtra Maroc — passage au thème

Cette application est une référence visuelle et interactive pour refaire le thème de [Filtra Maroc](https://filtra.ma/fr/). Elle ne remplace pas le moteur de vente PrestaShop et n’est pas un ZIP de thème installable.

## Ce qui a été adapté

Le catalogue fictif a été remplacé par neuf produits TANK, Koldair et Tank Me. Les familles correspondent à la boutique : filtres (103), cartouches (102), fontaines (104), bouteilles (101). Les photos proviennent des pages publiques. Prix, remises et familles sont séparés dans `src/catalog.js`.

Les catégories précèdent la sélection de produits. Recherche, comparatif de filtres et guide de cartouches simplifient le choix. Les fiches regroupent les détails utiles, prix TTC, ajout au panier, livraison et entretien. Le checkout utilise des adresses et téléphones marocains, le paiement à réception et la livraison gratuite.

## Choisir une base compatible

Les chemins publics montrent le thème `PRS03065_01` et des modules `cp_*`, mais pas la version exacte de PrestaShop. Relever dans le back-office la version, le thème parent et les modules actifs avant de créer le thème.

Pour PrestaShop 9.1 et versions ultérieures, consulter la matrice de compatibilité de Hummingbird. Pour une boutique existante, conserver une base compatible avec sa version. Ne pas installer cette application React comme thème et ne pas recopier un `theme.yml` d’une autre version.

## Correspondances

| Maquette              | Élément PrestaShop                                         | À conserver                                               |
| --------------------- | ---------------------------------------------------------- | --------------------------------------------------------- |
| Bandeau et navigation | `templates/_partials/header.tpl` et module menu            | URLs serveur, panier, langue                              |
| Hero et catégories    | `templates/index.tpl` / module éditorial sur `displayHome` | Textes et images administrables                           |
| `ProductCard`         | `templates/catalog/_partials/miniatures/product.tpl`       | Présentateur produit, prix formaté, remise, disponibilité |
| `Shop`                | `templates/catalog/listing/product-list.tpl`               | Pagination, recherche, filtres et tri serveur             |
| `Product`             | `templates/catalog/product.tpl` et partials                | Déclinaisons, galerie, quantité disponible, ajout natif   |
| Tiroir panier         | Module panier de la base, souvent `ps_shoppingcart`        | Panier serveur et événements natifs                       |
| `Checkout`            | `templates/checkout/checkout.tpl` et étapes natives        | Adresses, transporteurs, consentements, paiement          |
| FAQ et livraison      | CMS ou module éditorial                                    | Politiques administrables et traduites                    |
| Pied de page          | `templates/_partials/footer.tpl` et module newsletter      | Liens CMS, abonnement et consentement réels               |

Les blocs, sélecteurs et événements dépendent de la base choisie. Étendre les templates existants plutôt que supprimer leur logique. Conserver les hooks nécessaires aux modules et éviter de dupliquer les contenus déjà présents sur `displayHome`.

## Données et parcours commerciaux

- Remplacer `src/catalog.js` par les présentateurs PrestaShop. Utiliser les prix formatés et taxes calculés côté serveur, jamais le total JavaScript de la maquette pour une vraie commande.
- Les IDs vérifiés sont enregistrés dans `psId`. La cartouche TANK Pro six fonctions a provisoirement `psId: null` : retrouver son ID dans le back-office avant de relier le guide.
- Remplacer les liens hash par les URLs générées pour la langue du client. Conserver les URLs de la boutique pour le référencement.
- Afficher la disponibilité réelle ; la maquette ne promet pas un stock permanent.
- Utiliser les tailles d’images de la boutique et vérifier les correspondances de cartouches avant publication.
- Les prix sont ceux observés le 16 septembre 2026 et ne doivent pas devenir des constantes du thème final.
- Conserver les formulaires natifs, la validation serveur, les protections de session et les modules de paiement. Le virement peut être proposé s’il est activé dans la boutique ; la maquette illustre le paiement à réception.
- Le site d’origine propose l’arabe. Cette livraison est en français. Prévoir traductions, URLs par langue et validation RTL pour la version arabe.

## Politique de livraison reprise

La [page livraison](https://filtra.ma/fr/content/1-livraison) indique : livraison offerte sans minimum, prix TTC, paiement en espèces à réception, confirmation téléphonique et vérification du colis. Après confirmation, les délais annoncés sont de 24–48 h ouvrables dans les grandes villes, 48–72 h ailleurs, et jusqu’à 5 jours dans les zones éloignées, hors dimanches et jours fériés.

La maquette ne transmet aucune commande. La validation, les consentements et les conditions de vente doivent rester gérés par la boutique en production.

## Référence visuelle

| Élément          | Valeur                       |
| ---------------- | ---------------------------- |
| Encre / boutons  | `#153f43`                    |
| Aqua             | `#d9ece6`                    |
| Sauge            | `#e8eddd`                    |
| Fond principal   | `#fffefa`                    |
| Texte secondaire | `#60766b`                    |
| Police UI        | DM Sans                      |
| Titres           | Manrope                      |
| Accent italique  | Instrument Serif             |
| Rayon courant    | 6–8 px                       |
| Grille produit   | 4 colonnes desktop, 2 mobile |
| Seuil mobile     | 760 px                       |

`src/maroc.css` contient les adaptations et variables `--filtra-*`; `src/styles.css` contient la base. Porter les sélecteurs utiles et les encapsuler pour éviter les conflits avec les modules. La marque affichée est une proposition typographique ; le logo existant est conservé dans `public/products/logo.webp`.

## Validation sur préproduction

Tester panier, stock, déclinaisons, remises, transporteurs, taxes, emails, comptes clients, commande invitée, paiement à réception et retours. Vérifier catégories, produit, recherche et checkout sur mobile, tablette et desktop. Tester au clavier menus, dialogues et formulaires. Les tests React ne valident pas une installation PrestaShop.

## Documentation officielle

- [Structure des thèmes](https://devdocs.prestashop-project.org/9/themes/getting-started/theme-organization/)
- [Templates et layouts](https://devdocs.prestashop-project.org/9/themes/concepts/templates/templates-and-layouts/)
- [Hooks de thème](https://devdocs.prestashop-project.org/9/themes/concepts/hooks/)
- [Hummingbird et compatibilité](https://devdocs.prestashop-project.org/9/themes/getting-started/quick-start/)
- [theme.yml pour PrestaShop 8](https://devdocs.prestashop-project.org/8/themes/getting-started/theme-yml/)
