import { test, expect } from "@playwright/test";

test("French catalog, categories, sorting, search, and image assets", async ({
  page,
}, info) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(
    page.getByRole("heading", {
      name: "Changez l’eau. Changez votre quotidien.",
    }),
  ).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator(".hero-machine")).toBeVisible();
  expect(
    await page
      .locator(".hero-machine")
      .evaluate((img) => img.complete && img.naturalWidth > 0),
  ).toBeTruthy();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  await page.screenshot({
    path: `test-results/home-${info.project.name}.png`,
    fullPage: true,
  });
  await page
    .getByRole("button", { name: "Les cartouches", exact: true })
    .click();
  await expect(page.locator(".product-card")).toHaveCount(3);
  await page
    .getByRole("button", { name: "Les fontaines", exact: true })
    .click();
  await expect(page.locator(".product-card")).toHaveCount(1);
  await page.getByRole("button", { name: "Les filtres", exact: true }).click();
  await expect(page.locator(".product-card")).toHaveCount(4);
  await page
    .getByRole("link", { name: "Découvrir les filtres", exact: true })
    .click();
  await expect(page.locator(".product-card")).toHaveCount(4);
  await page.getByLabel("Trier les produits").selectOption("low");
  await expect(page.locator(".product-card h3").first()).toHaveText(
    "TANK Power",
  );
  await page.getByRole("button", { name: /Cartouches\s*3/ }).click();
  await expect(page.locator(".product-card")).toHaveCount(3);
  await page.getByLabel("Filtrer les produits").fill("inexistant");
  await expect(
    page.getByRole("heading", { name: "Aucun résultat pour ce choix." }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Afficher tous les produits" })
    .click();
  await expect(page.locator(".product-card")).toHaveCount(9);
  await page.getByRole("button", { name: "Comparer les filtres" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.locator(".comparison h3")).toHaveCount(3);
  await page.keyboard.press("Escape");
  await page
    .getByRole("button", { name: "Rechercher un produit", exact: true })
    .click();
  await page.getByLabel("Rechercher dans le catalogue").fill("Koldair");
  await expect(page.locator(".search-results>a")).toHaveCount(1);
  await page.locator(".search-results>a").click();
  await expect(page.locator(".product-info h1")).toContainText(
    "Koldair Bottom Load",
  );
  expect(errors).toEqual([]);
});

test("guide matches cartridges to filter families and dialogs keep focus", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Quel filtre pour moi ?" }).click();
  await page.keyboard.press("Shift+Tab");
  await expect(
    page.getByRole("button", { name: /Emporter mon eau/ }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("button", { name: "Fermer le guide" }),
  ).toBeFocused();
  await page.getByRole("button", { name: /Remplacer ma cartouche/ }).click();
  await page
    .getByRole("button", { name: "TANK Pro · 6 fonctions", exact: true })
    .click();
  await expect(page.locator(".finder-results>a")).toHaveCount(1);
  await page.locator(".finder-results>a").click();
  await expect(page.locator(".product-info h1")).toContainText(
    "Cartouche TANK Pro",
  );
  await page
    .getByRole("button", { name: "Ajouter au panier", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Retirer Cartouche TANK Pro" })
    .click();
  await expect(
    page.getByRole("heading", {
      name: "Votre panier attend son premier choix.",
    }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.goto("/#/checkout");
  await expect(
    page.getByRole("heading", { name: "Votre panier est encore vide." }),
  ).toBeVisible();
});

test("Morocco checkout validates phone, retains edits, totals and clears demo cart", async ({
  page,
}, info) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/#/product/tank-pro");
  await page
    .getByRole("button", { name: "Vue 2 de TANK Pro", exact: true })
    .click();
  await expect(page.locator(".real-detail img")).toHaveAttribute(
    "src",
    "/products/tank-pro-detail.webp",
  );
  await page
    .getByRole("button", { name: "Vue 1 de TANK Pro", exact: true })
    .click();
  await page.screenshot({
    path: `test-results/product-${info.project.name}.png`,
    fullPage: true,
  });
  await page
    .getByRole("button", { name: "Augmenter TANK Pro", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Ajouter au panier", exact: true })
    .click();
  await expect(page.locator(".total-line")).toContainText(/1[.\s]*498 DH/);
  await page.getByRole("button", { name: "Fermer le panier" }).click();
  await page.reload();
  await page
    .getByRole("button", { name: "Ouvrir le panier, 2 articles" })
    .click();
  await page.getByRole("link", { name: "Passer ma commande" }).click();
  await page.screenshot({
    path: `test-results/checkout-${info.project.name}.png`,
    fullPage: true,
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  await page.getByRole("button", { name: "Vérifier ma commande" }).click();
  await expect(
    page.getByRole("heading", { name: "À qui livre-t-on ?" }),
  ).toBeVisible();
  await page.getByLabel("Prénom", { exact: true }).fill("Amine");
  await page.getByLabel("Nom", { exact: true }).fill("Test");
  await page.locator("input[name=phone]").fill("123");
  await page
    .getByLabel("Adresse complète", { exact: true })
    .fill("10 rue de la Paix");
  await page.getByRole("button", { name: "Vérifier ma commande" }).click();
  await expect(
    page.getByRole("heading", { name: "À qui livre-t-on ?" }),
  ).toBeVisible();
  expect(
    await page
      .locator("input[name=phone]")
      .evaluate((el) => el.validity.patternMismatch),
  ).toBeTruthy();
  await page.locator("input[name=phone]").fill("06 12 34 56 78");
  await page.getByLabel("Ville", { exact: true }).selectOption("Autre ville");
  await page
    .getByLabel("Nom de votre ville", { exact: true })
    .fill("Essaouira");
  await page.getByRole("button", { name: "Vérifier ma commande" }).click();
  await expect(
    page.getByRole("heading", { name: "Tout est correct ?" }),
  ).toBeVisible();
  await expect(page.locator(".review-card")).toContainText("Essaouira, Maroc");
  await page.getByRole("button", { name: "Modifier", exact: true }).click();
  await expect(page.getByLabel("Prénom", { exact: true })).toHaveValue("Amine");
  await expect(
    page.getByLabel("Nom de votre ville", { exact: true }),
  ).toHaveValue("Essaouira");
  await page.locator("input[name=phone]").fill("+212 6 12 34 56 78");
  await page.getByRole("button", { name: "Vérifier ma commande" }).click();
  await expect(page.locator(".grand-total")).toContainText(/1[.\s]*498 DH/);
  await expect(page.locator(".free-shipping")).toHaveText("Offerte");
  await page
    .getByRole("button", { name: "Confirmer la démonstration" })
    .click();
  await expect(
    page.getByRole("heading", { name: "Merci, Amine." }),
  ).toBeVisible();
  await expect(page.locator(".confirmation-details")).toContainText(
    /2 articles · 1[.\s]*498 DH TTC/,
  );
  expect(
    await page.evaluate(() =>
      JSON.parse(localStorage.getItem("filtra-maroc-cart-v1")),
    ),
  ).toEqual([]);
  expect(errors).toEqual([]);
});

test("mobile menu, FAQ and malformed saved cart recover cleanly", async ({
  page,
}, info) => {
  await page.addInitScript(() =>
    localStorage.setItem("filtra-maroc-cart-v1", '{"invalid":true}'),
  );
  await page.goto("/");
  await expect(
    page.getByRole("button", { name: "Ouvrir le panier, 0 articles" }),
  ).toBeVisible();
  if (info.project.name === "mobile") {
    await page.getByRole("button", { name: "Ouvrir le menu" }).click();
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "Fontaines", exact: true })
      .click();
    await expect(page.locator(".product-card")).toHaveCount(1);
    await expect(page.getByRole("navigation")).not.toBeVisible();
  }
  await page.goto("/");
  await page
    .getByText("La livraison est-elle vraiment offerte ?", { exact: true })
    .click();
  await expect(
    page.getByText("Oui. Filtra Maroc prévoit", {
      exact: false,
    }),
  ).toBeVisible();
});
