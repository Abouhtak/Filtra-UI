import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Droplets,
  Truck,
  Banknote,
  PackageCheck,
  RefreshCw,
  Plus,
  Check,
  SlidersHorizontal,
  MoveUpRight,
  Search,
  MapPin,
} from "lucide-react";
import { products, categories, asset, money, storeUrl } from "./catalog";

export default function Home({ add, finder, Card }) {
  const [selection, setSelection] = useState("filters");
  const selectionProducts = products
    .filter((p) => p.category === selection)
    .slice(0, 4);
  return (
    <>
      <section className="new-hero">
        <div className="hero-content">
          <span className="overline">
            <span /> FILTRA MAROC · L’EAU, EN MIEUX
          </span>
          <h1>
            Changez l’eau.
            <br />
            Changez votre
            <br />
            <span>quotidien.</span>
          </h1>
          <p>
            Des filtres bien pensés, des gestes plus simples.
            <br />
            Trouvez votre solution pour une eau qui vous accompagne, chez vous
            et partout ailleurs.
          </p>
          <div className="hero-ctas">
            <a href="#/shop/filters" className="button">
              Découvrir les filtres <ArrowUpRight size={20} />
            </a>
            <button className="link-button" onClick={finder}>
              Quel filtre pour moi ? <ArrowRight size={17} />
            </button>
          </div>
          <div className="hero-proof">
            <span className="proof-check">
              <Check size={16} />
            </span>
            <span>
              Livraison offerte au Maroc.
              <br />
              <b>Payez seulement à la réception.</b>
            </span>
          </div>
        </div>
        <div className="hero-stage">
          <span className="stage-label">LE QUOTIDIEN MÉRITE MIEUX.</span>
          <div className="water-orbit orbit-a" />
          <div className="water-orbit orbit-b" />
          <div className="stage-disc" />
          <span className="stage-big-word" aria-hidden="true">
            TANK
          </span>
          <img
            className="hero-machine"
            src={asset("tank-pro-large")}
            alt="Filtre TANK Pro noir, 6 fonctions de filtration"
            fetchPriority="high"
          />
          <span className="hero-sticker">
            <b>6</b>
            <span>
              fonctions
              <br />
              de filtration
            </span>
          </span>
          <a className="hero-product-link" href="#/product/tank-pro">
            <span>
              <small>COMPACT. COMPLET. TANK PRO.</small>
              <b>Votre nouveau réflexe.</b>
            </span>
            <span className="hero-product-price">
              <del>950 DH</del>
              <strong>749 DH</strong>
            </span>
            <span className="circle-arrow">
              <ArrowUpRight size={23} />
            </span>
          </a>
        </div>
      </section>
      <div className="service-bar">
        <span>
          <Truck />
          <span>
            <b>Livraison offerte</b>Partout au Maroc
          </span>
        </span>
        <span>
          <Banknote />
          <span>
            <b>Payez à la réception</b>Simple et rassurant
          </span>
        </span>
        <span>
          <PackageCheck />
          <span>
            <b>Vérifiez votre colis</b>Avant de régler
          </span>
        </span>
        <span>
          <RefreshCw />
          <span>
            <b>Pensez à l’entretien</b>Les bonnes cartouches
          </span>
        </span>
      </div>
      <section className="category-discovery section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">À CHAQUE BESOIN, SA SOLUTION</span>
            <h2>
              Et vous, de quoi
              <br />
              avez-vous <em>besoin ?</em>
            </h2>
          </div>
          <p>
            À la maison, au bureau, en déplacement.
            <br />
            Il y a une solution Filtra pour chaque moment.
          </p>
          <a href="#/shop/all" className="text-link">
            Explorer la boutique <ArrowUpRight size={19} />
          </a>
        </div>
        <div className="category-ribbon">
          {categories.slice(1).map((c, i) => (
            <a href={`#/shop/${c.id}`} key={c.id}>
              <span className="category-number">/ 0{i + 1}</span>
              <div className="category-visual">
                <img src={asset(c.image)} alt="" loading="lazy" />
              </div>
              <div className="category-bottom">
                <h3>{c.name}</h3>
                <ArrowUpRight size={20} />
              </div>
              <p>{c.description}</p>
            </a>
          ))}
        </div>
      </section>
      <section className="best-section section" id="shop">
        <div className="section-heading">
          <div>
            <span className="eyebrow">LA SÉLECTION FILTRA</span>
            <h2>
              De bons choix.
              <br />
              <em>Chaque jour.</em>
            </h2>
          </div>
          <div
            className="home-tabs"
            role="group"
            aria-label="Sélection de produits"
          >
            {[
              ["filters", "Les filtres"],
              ["cartridges", "Les cartouches"],
              ["dispensers", "Les fontaines"],
            ].map(([id, label]) => (
              <button
                key={id}
                aria-pressed={selection === id}
                className={selection === id ? "active" : ""}
                onClick={() => setSelection(id)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="product-grid home-products">
          {selectionProducts.map((p) => (
            <Card key={p.id} product={p} add={add} />
          ))}
        </div>
        <a className="collection-link" href={`#/shop/${selection}`}>
          Tout voir dans cette catégorie <ArrowRight size={19} />
        </a>
      </section>
      <section className="choice-panel">
        <div className="choice-graphic" aria-hidden="true">
          <div className="choice-icon">
            <SlidersHorizontal size={45} />
          </div>
          <span className="choice-dot dot-a" />
          <span className="choice-dot dot-b" />
          <span className="choice-path" />
        </div>
        <div className="choice-copy">
          <span className="eyebrow">PAS BESOIN D’ÊTRE UN EXPERT</span>
          <h2>
            Le bon filtre ?<br />
            On vous aide à <em>le trouver.</em>
          </h2>
          <p>
            Vous équipez votre cuisine ou remplacez une cartouche ?<br />
            Partez de votre besoin. On vous montre les options.
          </p>
          <button className="button button-white" onClick={finder}>
            Trouver ma solution <ArrowUpRight size={19} />
          </button>
        </div>
        <span className="choice-water" aria-hidden="true">
          ?
        </span>
      </section>
      <section className="daily-grid section">
        <a className="daily-card daily-maintenance" href="#/shop/cartridges">
          <span className="eyebrow">ON GARDE LES BONNES HABITUDES</span>
          <h2>
            Un petit changement.
            <br />
            Et ça <em>repart.</em>
          </h2>
          <p>
            Les cartouches adaptées à votre filtre.
            <br />
            L’entretien devient un réflexe.
          </p>
          <span className="text-link">
            Trouver ma cartouche <ArrowUpRight size={19} />
          </span>
          <img
            src={asset("cartridge-pro")}
            alt="Cartouches TANK Pro"
            loading="lazy"
          />
          <span className="daily-mark" aria-hidden="true">
            <RefreshCw />
          </span>
        </a>
        <a className="daily-card daily-bottle" href="#/product/bottle">
          <span className="eyebrow">À EMPORTER, À REMPLIR, À RECOMMENCER</span>
          <h2>
            Votre eau.
            <br />
            Votre <em>mouvement.</em>
          </h2>
          <p>
            Tank Me, la bouteille de 0,65 L<br />
            qui suit votre rythme.
          </p>
          <span className="text-link">
            Découvrir Tank Me <ArrowUpRight size={19} />
          </span>
          <img
            src={asset("bottle")}
            alt="Bouteille réutilisable Tank Me bleue"
            loading="lazy"
          />
          <span className="bottle-ring" aria-hidden="true" />
        </a>
      </section>
      <section className="why-section section" id="difference">
        <div className="section-heading">
          <div>
            <span className="eyebrow">BIENVENUE CHEZ FILTRA MAROC</span>
            <h2>
              L’eau, c’est essentiel.
              <br />
              <em>La confiance aussi.</em>
            </h2>
          </div>
          <p>
            Des produits utiles. Des informations claires.
            <br />
            Et un parcours simple, jusqu’à votre porte.
          </p>
        </div>
        <div className="why-grid">
          {[
            [
              Truck,
              "01",
              "Tout le Maroc. Zéro frais.",
              "Votre commande arrive chez vous, sans minimum d’achat ni frais de livraison.",
            ],
            [
              Banknote,
              "02",
              "Vous recevez. Vous vérifiez.",
              "Après confirmation téléphonique, vérifiez le produit devant le livreur et réglez à réception.",
            ],
            [
              RefreshCw,
              "03",
              "On pense aussi à la suite.",
              "Retrouvez les cartouches de votre gamme pour entretenir votre filtre dans la durée.",
            ],
          ].map(([Icon, n, t, d]) => (
            <article key={n}>
              <div>
                <Icon size={29} />
                <span>{n}</span>
              </div>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="faq section" id="faq">
        <div>
          <span className="eyebrow">ON VOUS RÉPOND</span>
          <h2>
            Tout est
            <br />
            <em>plus clair.</em>
          </h2>
          <p>Encore une question ? Notre équipe est là.</p>
          <a
            className="text-link"
            href={`${storeUrl}contactez-nous`}
            target="_blank"
            rel="noreferrer"
          >
            Parlons-en <ArrowUpRight size={18} />
          </a>
        </div>
        <div>
          {[
            [
              "Quel filtre choisir pour ma maison ?",
              "Commencez par votre installation et votre besoin. TANK Pro réunit six fonctions dans un format compact, Pro S en propose quatre et TANK Power un système en trois étapes. Notre guide vous aide à explorer ces modèles. Pour une eau particulière, demandez conseil avant de choisir.",
            ],
            [
              "La livraison est-elle vraiment offerte ?",
              "Oui. Filtra Maroc prévoit la livraison offerte sur tous les produits, sans minimum de commande et partout au Maroc.",
            ],
            [
              "Comment payer ma commande ?",
              "Vous réglez en espèces à la réception, après vérification du colis. L’équipe vous appelle au préalable pour confirmer la commande et votre adresse.",
            ],
            [
              "Quels sont les délais de livraison ?",
              "Après confirmation téléphonique : 24 à 48 h ouvrables dans les grandes villes, 48 à 72 h ailleurs et jusqu’à 5 jours dans les zones éloignées. Les dimanches et jours fériés ne sont pas inclus.",
            ],
            [
              "Comment trouver la bonne cartouche ?",
              "Repérez la gamme et la référence de votre appareil. Le guide distingue les cartouches TANK Pro six fonctions, Power trois étapes et Pro RO. Vérifiez toujours la compatibilité avant de commander.",
            ],
          ].map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <Plus size={19} />
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="final-call">
        <span className="eyebrow">UNE NOUVELLE HABITUDE VOUS ATTEND</span>
        <h2>
          Le prochain verre,
          <br />
          <span>c’est chez vous.</span>
        </h2>
        <a href="#/shop/all" className="button">
          Je découvre la boutique <ArrowUpRight size={20} />
        </a>
        <div className="final-rings" aria-hidden="true" />
      </section>
    </>
  );
}

export function Footer({ section, notify }) {
  return (
    <footer className="new-footer">
      <div className="footer-newsletter">
        <div>
          <span className="eyebrow">ON GARDE LE CONTACT ?</span>
          <h2>
            Du nouveau.
            <br />
            Pas du <em>superflu.</em>
          </h2>
        </div>
        <div>
          <p>Nos nouveautés et conseils pour votre eau au quotidien.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              notify("Merci ! Inscription de démonstration, non enregistrée.");
              e.target.reset();
            }}
          >
            <label className="sr-only" htmlFor="newsletter-email">
              Votre adresse e-mail pour la newsletter
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Votre adresse e-mail"
              required
            />
            <button aria-label="S’inscrire à la newsletter">
              <ArrowRight size={23} />
            </button>
          </form>
        </div>
      </div>
      <div className="footer-main">
        <div className="footer-brand">
          <a href="#/" aria-label="Filtra Maroc — accueil">
            <img src={asset("logo")} alt="Filtra Maroc" />
          </a>
          <p>
            Des solutions pour votre eau.
            <br />
            De la simplicité pour votre quotidien.
          </p>
          <span>
            <MapPin size={14} /> Partout au Maroc.
          </span>
        </div>
        <div>
          <b>À découvrir</b>
          {categories.slice(1).map((c) => (
            <a key={c.id} href={`#/shop/${c.id}`}>
              {c.name}
            </a>
          ))}
        </div>
        <div>
          <b>On vous accompagne</b>
          <button onClick={() => section("faq")}>Questions fréquentes</button>
          <a
            href={`${storeUrl}content/1-livraison`}
            target="_blank"
            rel="noreferrer"
          >
            Livraison & paiement
          </a>
          <a
            href={`${storeUrl}contactez-nous`}
            target="_blank"
            rel="noreferrer"
          >
            Contactez-nous
          </a>
          <a href={`${storeUrl}mon-compte`} target="_blank" rel="noreferrer">
            Mon compte sur filtra.ma
          </a>
        </div>
        <div className="footer-promise">
          <Truck size={24} />
          <b>
            Livraison offerte.
            <br />
            Sérénité incluse.
          </b>
          <span>
            Paiement à la réception
            <br />
            après vérification du colis.
          </span>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Filtra Maroc</span>
        <span>
          <a
            href={`${storeUrl}content/2-mentions-legales`}
            target="_blank"
            rel="noreferrer"
          >
            Mentions légales
          </a>
          <a
            href={`${storeUrl}content/3-conditions-generales-de-vente`}
            target="_blank"
            rel="noreferrer"
          >
            Conditions de vente
          </a>
        </span>
        <span>Français · MAD (DH) · Aperçu du thème</span>
      </div>
    </footer>
  );
}
