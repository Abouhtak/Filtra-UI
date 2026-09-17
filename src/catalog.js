// Snapshot of the public Filtra Maroc catalog, reviewed 2026-09-16.
// Keep IDs/URLs when replacing this data with PrestaShop product presenters.
export const categories = [
  { id: "all", name: "Tout découvrir", short: "Tous les produits" },
  {
    id: "filters",
    name: "Filtres à eau",
    short: "Filtres à eau",
    psId: 103,
    image: "tank-pro",
    description: "Le bon filtre pour votre quotidien.",
  },
  {
    id: "cartridges",
    name: "Cartouches filtrantes",
    short: "Cartouches",
    psId: 102,
    image: "cartridge-pro",
    description: "Un nouveau départ pour votre filtre.",
  },
  {
    id: "dispensers",
    name: "Fontaines à eau",
    short: "Fontaines",
    psId: 104,
    image: "koldair",
    description: "À la maison comme au bureau.",
  },
  {
    id: "bottles",
    name: "Bouteilles d’eau",
    short: "Bouteilles",
    psId: 101,
    image: "bottle",
    description: "Votre eau vous accompagne.",
  },
];
export const products = [
  {
    id: "tank-pro",
    psId: 20,
    name: "TANK Pro",
    subtitle: "6 fonctions de filtration · Noir",
    category: "filters",
    price: 749,
    oldPrice: 950,
    image: "tank-pro-large",
    gallery: ["tank-pro-large", "tank-pro-detail", "tank-pro-side"],
    tag: "Notre sélection",
    reference: "FT6N",
    url: "filtres-a-eau/20-tank-pro-filter-6-purification-noirr.html",
    description:
      "Un format compact, un robinet pivotant et un rappel de remplacement de cartouche. Le TANK Pro trouve naturellement sa place dans votre cuisine.",
    features: [
      "6 fonctions intégrées",
      "Minuteur numérique TIMEX",
      "Robinet pivotant à 360°",
    ],
    specs: [
      ["Marque", "TANK"],
      ["Référence", "FT6N"],
      ["Dimensions", "29 × 27 × 10 cm"],
      ["Coloris", "Noir"],
      ["Entretien", "Rappel TIMEX tous les 4 mois"],
    ],
    compatible: ["cartridge-pro"],
  },
  {
    id: "tank-pro-s",
    psId: 21,
    name: "TANK Pro S",
    subtitle: "4 fonctions de filtration",
    category: "filters",
    price: 399,
    oldPrice: 499,
    image: "tank-pro-s",
    tag: "Format compact",
    url: "filtres-a-eau/21-tank-pro-s.html",
    description:
      "Un filtre compact à quatre fonctions, pour trouver simplement votre place dans l’univers TANK.",
    features: ["4 fonctions intégrées", "Format compact", "Marque TANK"],
  },
  {
    id: "tank-power",
    psId: 22,
    name: "TANK Power",
    subtitle: "Filtre à eau · 3 étapes",
    category: "filters",
    price: 359,
    oldPrice: 450,
    image: "tank-power",
    tag: "Le choix accessible",
    url: "filtres-a-eau/22-tank-power-3-stages.html",
    description:
      "Un système de filtration en trois étapes. Retrouvez les cartouches adaptées pour accompagner son entretien.",
    features: [
      "3 étapes de filtration",
      "Cartouches remplaçables",
      "Marque TANK",
    ],
    compatible: ["pack-power"],
  },
  {
    id: "tank-ro",
    psId: 33,
    name: "TANK Pro RO + UV",
    subtitle: "8 fonctions de purification",
    category: "filters",
    price: 1850,
    oldPrice: 2450,
    image: "tank-ro",
    tag: "RO + UV",
    url: "filtres-a-eau/33-tank-pro-ro.html",
    description:
      "Le système TANK Pro associant osmose inverse et UV, avec huit fonctions de purification annoncées au catalogue.",
    features: ["Osmose inverse", "Technologie UV", "8 fonctions"],
    compatible: ["cartridge-pf"],
  },
  {
    id: "cartridge-pro",
    psId: null,
    name: "Cartouche TANK Pro",
    subtitle: "6 fonctions intégrées",
    category: "cartridges",
    price: 219,
    oldPrice: 270,
    image: "cartridge-pro",
    tag: "Pour TANK Pro",
    description:
      "La cartouche de remplacement dédiée au filtre TANK Pro à six fonctions. Vérifiez la référence de votre appareil avant de choisir.",
    features: [
      "Pour TANK Pro 6 fonctions",
      "Cartouche de remplacement",
      "Vérifier la référence du filtre",
    ],
  },
  {
    id: "cartridge-pf",
    psId: 23,
    name: "Cartouche TANK Pro RO — PF",
    subtitle: "Préfiltration · Gamme Pro RO",
    category: "cartridges",
    price: 129,
    oldPrice: 160,
    image: "cartridge-pf",
    tag: "Pour TANK Pro RO",
    url: "cartouches-filtrantes/23-tank-pro-ro-cartridge-pf.html",
    description:
      "La cartouche PF de la gamme TANK Pro RO, pour entretenir votre système avec la référence correspondante.",
    features: [
      "Gamme TANK Pro RO",
      "Référence PF",
      "Cartouche de remplacement",
    ],
  },
  {
    id: "pack-power",
    psId: 46,
    name: "Pack TANK Power",
    subtitle: "3 étapes · 4 cartouches · 6 mois",
    category: "cartridges",
    price: 129,
    oldPrice: 180,
    image: "pack-power",
    tag: "L’entretien simplifié",
    url: "cartouches-filtrantes/46-tank-cartridge-economy-pack-3-stages.html",
    description:
      "Un pack de quatre cartouches pour le TANK Power trois étapes, présenté au catalogue pour six mois d’entretien. La fréquence dépend des conditions d’utilisation.",
    features: ["4 cartouches", "Pour TANK Power 3 étapes", "Pack d’entretien"],
  },
  {
    id: "koldair",
    psId: 26,
    name: "Koldair Bottom Load",
    subtitle: "Fontaine à eau · Modèle A · Noir",
    category: "dispensers",
    price: 1950,
    oldPrice: 2500,
    image: "koldair",
    tag: "Maison & bureau",
    url: "fontaines-a-eau/26-koldair-bottom-load-a-black.html",
    description:
      "Une fontaine au design sobre avec chargement de la bonbonne par le bas. Une place dédiée à l’eau dans votre maison ou votre espace de travail.",
    features: ["Chargement par le bas", "Modèle A", "Finition noire"],
  },
  {
    id: "bottle",
    psId: 42,
    name: "Tank Me",
    subtitle: "Bouteille réutilisable · 0,65 L",
    category: "bottles",
    price: 59,
    oldPrice: 99,
    image: "bottle",
    tag: "À emporter",
    url: "bouteilles-eau/42-ice-bottle-4.html",
    description:
      "Une bouteille de 0,65 litre pour emporter votre eau et garder votre routine à portée de main, au bureau ou en déplacement.",
    features: ["Capacité de 0,65 L", "Réutilisable", "Marque Tank Me"],
  },
];
export const money = (n) =>
  `${new Intl.NumberFormat("fr-MA", { maximumFractionDigits: 0 }).format(n)} DH`;
export const categoryName = (id) =>
  categories.find((c) => c.id === id)?.name || "Boutique";
export const asset = (name) => `/products/${name}.webp`;
export const storeUrl = "https://filtra.ma/fr/";
export const deliveryText = (city) =>
  [
    "Casablanca",
    "Rabat",
    "Salé",
    "Marrakech",
    "Tanger",
    "Fès",
    "Agadir",
    "Meknès",
    "Oujda",
    "Kénitra",
  ].includes(city)
    ? "24 à 48 h ouvrables après confirmation téléphonique"
    : "48 à 72 h ouvrables, jusqu’à 5 jours en zone éloignée";
