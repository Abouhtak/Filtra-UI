import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  Droplets,
  Leaf,
  Truck,
  ShieldCheck,
  Plus,
  Minus,
  X,
  ShoppingBag,
  Menu,
  Check,
  LockKeyhole,
  Waves,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Banknote,
  MapPin,
  CheckCircle2,
  Scale,
  Package,
} from "lucide-react";
import {
  products,
  categories,
  money,
  categoryName,
  asset,
  storeUrl,
  deliveryText,
} from "./catalog";
import Home, { Footer } from "./Home";
import "./design.css";

const CART_KEY = "filtra-maroc-cart-v1";
function readCart() {
  try {
    const c = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    return Array.isArray(c)
      ? c.filter(
          (i) =>
            products.some((p) => p.id === i.id) &&
            Number.isInteger(i.qty) &&
            i.qty > 0 &&
            i.qty <= 20,
        )
      : [];
  } catch {
    return [];
  }
}
function Photo({ product, name, className = "", ...props }) {
  return (
    <img
      className={`product-photo ${className}`}
      src={asset(name || product.image)}
      alt={product ? `${product.name} — ${product.subtitle}` : ""}
      {...props}
    />
  );
}
function Logo() {
  return (
    <a className="brand" href="#/" aria-label="Filtra Maroc — accueil">
      <img src={asset("logo")} alt="Filtra Maroc" />
    </a>
  );
}
function Modal({ title, close, drawer = false, children }) {
  const ref = useRef(null);
  const closeRef = useRef(close);
  closeRef.current = close;
  useEffect(() => {
    const prior = document.activeElement;
    const el = ref.current;
    el.querySelector("button")?.focus();
    function key(e) {
      if (e.key === "Escape") closeRef.current();
      if (e.key === "Tab") {
        const items = [
          ...el.querySelectorAll("button,a[href],input,select"),
        ].filter((x) => !x.disabled && x.getClientRects().length);
        if (e.shiftKey && document.activeElement === items[0]) {
          e.preventDefault();
          items.at(-1)?.focus();
        } else if (!e.shiftKey && document.activeElement === items.at(-1)) {
          e.preventDefault();
          items[0]?.focus();
        }
      }
    }
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("keydown", key);
      prior?.focus();
    };
  }, []);
  return (
    <div
      className={`modal-backdrop ${drawer ? "drawer-backdrop" : ""}`}
      onClick={close}
    >
      <section
        ref={ref}
        className={drawer ? "drawer" : "modal"}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="close-button"
          onClick={close}
          aria-label={`Fermer ${title}`}
        >
          <X size={20} />
        </button>
        {children}
      </section>
    </div>
  );
}
function Quantity({ qty, onChange, name = "le produit" }) {
  return (
    <div className="quantity">
      <button
        aria-label={`Diminuer ${name}`}
        disabled={qty <= 1}
        onClick={() => onChange(qty - 1)}
      >
        <Minus size={14} />
      </button>
      <span aria-label="Quantité">{qty}</span>
      <button
        aria-label={`Augmenter ${name}`}
        disabled={qty >= 20}
        onClick={() => onChange(qty + 1)}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
function CartItem({ item, update }) {
  const p = products.find((p) => p.id === item.id);
  return (
    <div className="cart-item">
      <a className="cart-art" href={`#/product/${p.id}`}>
        <Photo product={p} />
      </a>
      <div className="cart-item-info">
        <h3>{p.name}</h3>
        <p>{p.subtitle}</p>
        <Quantity
          qty={item.qty}
          name={p.name}
          onChange={(qty) => update(p.id, qty)}
        />
      </div>
      <div className="cart-item-end">
        <b>{money(p.price * item.qty)}</b>
        <button
          aria-label={`Retirer ${p.name}`}
          onClick={() => update(p.id, 0)}
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
}
function ProductCard({ product: p, add }) {
  return (
    <article className="product-card">
      <a
        className={`product-image category-${p.category}`}
        href={`#/product/${p.id}`}
      >
        <span className="pill">{p.tag}</span>
        <Photo product={p} loading="lazy" />
        <span className="product-arrow">
          <ArrowUpRight size={21} />
        </span>
      </a>
      <span className="card-brand">
        {p.category === "dispensers" ? "KOLDAIR" : "TANK"}{" "}
        <span>{categoryName(p.category)}</span>
      </span>
      <a href={`#/product/${p.id}`}>
        <h3>{p.name}</h3>
      </a>
      <p>{p.subtitle}</p>
      <div className="card-price">
        <div>
          <strong>{money(p.price)}</strong>
          <del>{money(p.oldPrice)}</del>
        </div>
        <button
          aria-label={`Ajouter ${p.name} au panier`}
          onClick={() => add(p.id)}
        >
          <Plus size={18} />
        </button>
      </div>
    </article>
  );
}

function App() {
  const [route, setRoute] = useState(location.hash || "#/");
  const [cart, setCart] = useState(readCart);
  const [bag, setBag] = useState(false);
  const [menu, setMenu] = useState(false);
  const [dialog, setDialog] = useState(null);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState("");
  useEffect(() => {
    function change() {
      setRoute(location.hash || "#/");
      setMenu(false);
      setBag(false);
      setDialog(null);
      window.scrollTo(0, 0);
    }
    window.addEventListener("hashchange", change);
    return () => window.removeEventListener("hashchange", change);
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      /* Cart stays usable without browser storage. */
    }
  }, [cart]);
  useEffect(() => {
    document.body.style.overflow = bag || dialog ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [bag, dialog]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 4000);
    return () => clearTimeout(t);
  }, [toast]);
  const count = cart.reduce((s, i) => s + i.qty, 0),
    total = cart.reduce(
      (s, i) => s + products.find((p) => p.id === i.id).price * i.qty,
      0,
    );
  const add = (id, qty = 1) => {
    setCart((c) =>
      c.some((i) => i.id === id)
        ? c.map((i) =>
            i.id === id ? { ...i, qty: Math.min(20, i.qty + qty) } : i,
          )
        : [...c, { id, qty }],
    );
    setBag(true);
  };
  const update = (id, qty) =>
    setCart((c) =>
      c
        .map((i) => (i.id === id ? { ...i, qty: Math.min(20, qty) } : i))
        .filter((i) => i.qty > 0),
    );
  const section = (id) => {
    location.hash = "#/";
    setMenu(false);
    setTimeout(
      () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }),
      80,
    );
  };
  const isCheckout = route === "#/checkout";
  const p = products.find((p) => route === `#/product/${p.id}`);
  const shop = route.startsWith("#/shop");
  const cat = route.split("/")[2] || "all";
  useEffect(() => {
    document.title = `${isCheckout ? "Votre commande" : p ? p.name : shop ? "La boutique" : "Changez l’eau. Changez votre quotidien."} | Filtra Maroc`;
  }, [route, p, isCheckout, shop]);
  return (
    <>
      <a
        className="skip"
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main").focus();
        }}
      >
        Aller au contenu
      </a>
      <div className="announcement">
        <Truck size={13} />
        <span>Partout au Maroc</span> Livraison offerte · Paiement à la
        livraison <ArrowUpRight size={13} />
      </div>
      <header>
        <Logo />
        {!isCheckout && (
          <nav
            aria-label="Navigation principale"
            className={menu ? "nav-open" : ""}
          >
            <a href="#/shop/filters">Filtres à eau</a>
            <a href="#/shop/cartridges">Cartouches</a>
            <a href="#/shop/dispensers">Fontaines</a>
            <a href="#/shop/bottles">Bouteilles</a>
            <button onClick={() => section("difference")}>
              Pourquoi Filtra ?
            </button>
          </nav>
        )}
        <div className="header-actions">
          {isCheckout ? (
            <span className="secure">
              <LockKeyhole size={15} /> Commande en toute simplicité
            </span>
          ) : (
            <>
              <button className="find-link" onClick={() => setDialog("finder")}>
                Bien choisir <ArrowUpRight size={15} />
              </button>
              <button
                className="icon-button"
                aria-label="Rechercher un produit"
                onClick={() => {
                  setQuery("");
                  setDialog("search");
                }}
              >
                <Search size={20} />
                <span className="search-hint">Rechercher un produit...</span>
              </button>
              <button
                className="bag-button"
                aria-label={`Ouvrir le panier, ${count} articles`}
                onClick={() => setBag(true)}
              >
                <ShoppingBag size={20} />
                <span>{count}</span>
              </button>
              <button
                className="mobile-menu"
                aria-label="Ouvrir le menu"
                aria-expanded={menu}
                onClick={() => setMenu(!menu)}
              >
                {menu ? <X /> : <Menu />}
              </button>
            </>
          )}
        </div>
      </header>
      <main id="main" tabIndex={-1}>
        {isCheckout ? (
          <Checkout
            cart={cart}
            total={total}
            update={update}
            clear={() => setCart([])}
          />
        ) : p ? (
          <Product key={p.id} p={p} add={add} />
        ) : shop ? (
          <Shop
            key={cat}
            initialCategory={cat}
            add={add}
            compare={() => setDialog("compare")}
          />
        ) : route === "#/" ? (
          <Home
            Card={ProductCard}
            add={add}
            finder={() => setDialog("finder")}
            section={section}
          />
        ) : (
          <div className="empty">
            <h1>Cette page prend une pause.</h1>
            <a href="#/" className="button">
              Retour à l’accueil <ArrowRight size={18} />
            </a>
          </div>
        )}
      </main>
      {!isCheckout && <Footer section={section} notify={setToast} />}
      {toast && (
        <div className="toast" role="status">
          <CheckCircle2 size={18} />
          {toast}
        </div>
      )}
      {bag && (
        <Modal title="le panier" close={() => setBag(false)} drawer>
          <div className="bag-heading">
            <span className="eyebrow">UNE BONNE HABITUDE COMMENCE ICI</span>
            <h2>
              Votre panier <span>({count})</span>
            </h2>
          </div>
          {cart.length ? (
            <>
              <p className="shipping-note">
                <Truck size={17} /> La livraison est offerte, partout au Maroc.
              </p>
              <div className="bag-items">
                {cart.map((i) => (
                  <CartItem key={i.id} item={i} update={update} />
                ))}
              </div>
              <div className="bag-bottom">
                <div className="total-line">
                  <span>Total TTC</span>
                  <strong>{money(total)}</strong>
                </div>
                <p>Paiement à la réception · Aucun frais de livraison</p>
                <a
                  href="#/checkout"
                  className="button full"
                  onClick={() => setBag(false)}
                >
                  Passer ma commande <ArrowRight size={18} />
                </a>
                <button className="text-button" onClick={() => setBag(false)}>
                  Continuer mes achats
                </button>
              </div>
            </>
          ) : (
            <div className="empty">
              <ShoppingBag size={40} />
              <h3>Votre panier attend son premier choix.</h3>
              <p>Un filtre, une cartouche, une nouvelle habitude.</p>
              <a
                href="#/shop/all"
                className="button"
                onClick={() => setBag(false)}
              >
                Découvrir la boutique <ArrowRight size={17} />
              </a>
            </div>
          )}
        </Modal>
      )}
      {dialog === "finder" && (
        <Modal title="le guide" close={() => setDialog(null)}>
          <Finder close={() => setDialog(null)} />
        </Modal>
      )}
      {dialog === "compare" && (
        <Modal title="le comparatif" close={() => setDialog(null)}>
          <span className="eyebrow">CHOISIR EN UN COUP D’ŒIL</span>
          <h2>À chacun son filtre.</h2>
          <div className="comparison">
            {products
              .filter((p) =>
                ["tank-pro", "tank-pro-s", "tank-power"].includes(p.id),
              )
              .map((p) => (
                <div key={p.id}>
                  <Photo product={p} />
                  <h3>{p.name}</h3>
                  <p>{p.subtitle}</p>
                  <b>{money(p.price)}</b>
                  <a className="button full" href={`#/product/${p.id}`}>
                    Découvrir <ArrowUpRight size={15} />
                  </a>
                </div>
              ))}
          </div>
          <p className="compare-note">
            Comparez le format et les fonctions. Le choix d’un système dépend
            aussi de votre eau et de votre installation.
          </p>
        </Modal>
      )}
      {dialog === "search" && (
        <Modal title="la recherche" close={() => setDialog(null)}>
          <span className="eyebrow">UN PRODUIT EN TÊTE ?</span>
          <h2>Trouvez votre essentiel.</h2>
          <div className="search-field">
            <Search size={19} />
            <input
              aria-label="Rechercher dans le catalogue"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="TANK Pro, cartouche, fontaine…"
            />
          </div>
          <div className="search-results">
            {products
              .filter((p) =>
                `${p.name} ${p.subtitle} ${categoryName(p.category)}`
                  .toLocaleLowerCase("fr")
                  .includes(query.toLocaleLowerCase("fr")),
              )
              .map((p) => (
                <a key={p.id} href={`#/product/${p.id}`}>
                  <Photo product={p} />
                  <span>
                    <b>{p.name}</b>
                    <small>{p.subtitle}</small>
                  </span>
                  <strong>{money(p.price)}</strong>
                  <ArrowUpRight size={17} />
                </a>
              ))}
            {!products.some((p) =>
              `${p.name} ${p.subtitle} ${categoryName(p.category)}`
                .toLocaleLowerCase("fr")
                .includes(query.toLocaleLowerCase("fr")),
            ) && (
              <p className="no-results">
                Aucun produit trouvé. Essayez « TANK » ou « cartouche ».
              </p>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}
function Shop({ initialCategory, add, compare }) {
  const [category, setCategory] = useState(
    categories.some((c) => c.id === initialCategory) ? initialCategory : "all",
  );
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const list = products
    .filter(
      (p) =>
        (category === "all" || p.category === category) &&
        `${p.name} ${p.subtitle}`
          .toLocaleLowerCase("fr")
          .includes(search.toLocaleLowerCase("fr")),
    )
    .sort((a, b) =>
      sort === "low"
        ? a.price - b.price
        : sort === "high"
          ? b.price - a.price
          : 0,
    );
  return (
    <section className="section shop-page">
      <div className="breadcrumbs">
        <a href="#/">Accueil</a>
        <span>/</span>
        <span>Boutique</span>
      </div>
      <div className="section-heading">
        <div>
          <span className="eyebrow">LES SOLUTIONS FILTRA MAROC</span>
          <h1>
            Le quotidien, en <span className="serif">mieux.</span>
          </h1>
        </div>
        <button className="round-link" onClick={compare}>
          <Scale size={17} /> Comparer les filtres
        </button>
      </div>
      <div
        className="category-tabs"
        role="group"
        aria-label="Filtrer par catégorie"
      >
        {categories.map((c) => (
          <button
            key={c.id}
            className={category === c.id ? "active" : ""}
            aria-pressed={category === c.id}
            onClick={() => setCategory(c.id)}
          >
            {c.short}
            <span>
              {
                products.filter((p) => c.id === "all" || p.category === c.id)
                  .length
              }
            </span>
          </button>
        ))}
      </div>
      <div className="shop-toolbar">
        <div className="search-field">
          <Search size={17} />
          <input
            aria-label="Filtrer les produits"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher dans la sélection…"
          />
        </div>
        <span aria-live="polite">
          {list.length} produit{list.length !== 1 ? "s" : ""}
        </span>
        <label>
          Trier par{" "}
          <select
            aria-label="Trier les produits"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="featured">Notre sélection</option>
            <option value="low">Prix croissant</option>
            <option value="high">Prix décroissant</option>
          </select>
        </label>
      </div>
      <div className="product-grid maroc-grid">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} add={add} />
        ))}
      </div>
      {!list.length && (
        <div className="empty">
          <Search size={35} />
          <h2>Aucun résultat pour ce choix.</h2>
          <button
            className="button"
            onClick={() => {
              setSearch("");
              setCategory("all");
            }}
          >
            Afficher tous les produits <ArrowRight size={17} />
          </button>
        </div>
      )}
      <p className="catalog-note">
        Prix TTC en dirhams · Livraison offerte au Maroc · Sélection issue du
        catalogue Filtra Maroc
      </p>
    </section>
  );
}
function Finder({ close }) {
  const [need, setNeed] = useState(null);
  const [model, setModel] = useState("");
  const choices = [
    ["home", Droplets, "Équiper ma cuisine", "Un filtre pour la maison."],
    [
      "cartridges",
      RefreshCw,
      "Remplacer ma cartouche",
      "Retrouver la bonne référence.",
    ],
    [
      "office",
      Waves,
      "Équiper un espace partagé",
      "Une fontaine pour la maison ou le bureau.",
    ],
    [
      "bottle",
      Leaf,
      "Emporter mon eau",
      "Une bouteille pour mes déplacements.",
    ],
  ];
  const ids =
    need === "home"
      ? ["tank-pro", "tank-pro-s", "tank-power"]
      : need === "office"
        ? ["koldair"]
        : need === "bottle"
          ? ["bottle"]
          : model === "pro"
            ? ["cartridge-pro"]
            : model === "power"
              ? ["pack-power"]
              : model === "ro"
                ? ["cartridge-pf"]
                : [];
  return (
    <>
      <span className="eyebrow">LE GUIDE FILTRA</span>
      <h2>
        {!need
          ? "De quoi avez-vous envie ?"
          : need === "cartridges" && !model
            ? "Quel filtre avez-vous ?"
            : "Votre sélection, tout simplement."}
      </h2>
      {!need ? (
        <div className="quiz-options">
          {choices.map(([id, Icon, title, desc]) => (
            <button key={id} onClick={() => setNeed(id)}>
              <Icon />
              <span>
                <b>{title}</b>
                <small>{desc}</small>
              </span>
              <ArrowRight />
            </button>
          ))}
        </div>
      ) : need === "cartridges" && !model ? (
        <div className="quiz-options">
          {[
            ["pro", "TANK Pro · 6 fonctions"],
            ["power", "TANK Power · 3 étapes"],
            ["ro", "TANK Pro RO"],
          ].map(([id, title]) => (
            <button key={id} onClick={() => setModel(id)}>
              <span>
                <b>{title}</b>
              </span>
              <ArrowRight />
            </button>
          ))}
          <a href="#/shop/cartridges" className="text-link" onClick={close}>
            Je ne connais pas mon modèle <ArrowUpRight size={17} />
          </a>
        </div>
      ) : (
        <div className="finder-results">
          {ids.map((id) => {
            const p = products.find((p) => p.id === id);
            return (
              <a href={`#/product/${id}`} key={id} onClick={close}>
                <Photo product={p} />
                <div>
                  <h3>{p.name}</h3>
                  <p>{p.subtitle}</p>
                  <b>{money(p.price)}</b>
                </div>
                <ArrowUpRight size={20} />
              </a>
            );
          })}
          <p>
            Vérifiez la référence de votre appareil et les besoins de votre
            installation avant de commander.
          </p>
        </div>
      )}
      {need && (
        <button
          className="text-button"
          onClick={() => {
            setNeed(null);
            setModel("");
          }}
        >
          <ArrowLeft size={14} /> Recommencer
        </button>
      )}
    </>
  );
}
function Product({ p, add }) {
  const [qty, setQty] = useState(1);
  const [view, setView] = useState(0);
  const gallery = p.gallery || [p.image];
  const related =
    p.compatible?.map((id) => products.find((x) => x.id === id)) ||
    products
      .filter((x) => x.category === p.category && x.id !== p.id)
      .slice(0, 3);
  return (
    <>
      <div className="breadcrumbs">
        <a href="#/">Accueil</a>
        <span>/</span>
        <a href={`#/shop/${p.category}`}>{categoryName(p.category)}</a>
        <span>/</span>
        <span>{p.name}</span>
      </div>
      <section className="product-detail">
        <div>
          <div className="detail-art real-detail">
            <span className="pill">{p.tag}</span>
            <Photo product={p} name={gallery[view]} />
            <span className="detail-art-note">
              FILTRA MAROC · LE QUOTIDIEN, EN MIEUX.
            </span>
          </div>
          {gallery.length > 1 && (
            <div className="thumbnails">
              {gallery.map((name, i) => (
                <button
                  key={name}
                  className={view === i ? "selected" : ""}
                  aria-label={`Vue ${i + 1} de ${p.name}`}
                  aria-pressed={view === i}
                  onClick={() => setView(i)}
                >
                  <Photo product={p} name={name} />
                </button>
              ))}
            </div>
          )}
          <div className="photo-caption">
            <ShieldCheck size={15} />
            <span>Photos du catalogue Filtra Maroc</span>
          </div>
        </div>
        <div className="product-info">
          <span className="eyebrow">
            {categoryName(p.category).toLocaleUpperCase("fr")} ·{" "}
            {p.category === "dispensers" ? "KOLDAIR" : "TANK"}
          </span>
          <h1>
            {p.name}
            <span className="serif">{p.subtitle}</span>
          </h1>
          <div className="product-price">
            {money(p.price)} <del>{money(p.oldPrice)}</del>
            <span className="saving">
              Économisez {money(p.oldPrice - p.price)}
            </span>
          </div>
          <p className="tax-label">TTC · Livraison offerte</p>
          <p className="product-description">{p.description}</p>
          <ul className="feature-checks">
            {p.features.map((f) => (
              <li key={f}>
                <Check size={16} />
                {f}
              </li>
            ))}
          </ul>
          <div className="buy-row">
            <Quantity qty={qty} onChange={setQty} name={p.name} />
            <button className="button" onClick={() => add(p.id, qty)}>
              Ajouter au panier <ShoppingBag size={17} />
            </button>
          </div>
          <div className="delivery-box">
            <Truck size={21} />
            <div>
              <b>Chez vous, sans frais de livraison.</b>
              <p>
                24–48 h ouvrables dans les grandes villes, après confirmation
                téléphonique.
              </p>
            </div>
          </div>
          <div className="purchase-note">
            <Banknote size={17} /> Payez à la réception, après vérification du
            produit.
          </div>
          <div className="product-accordions">
            <details open>
              <summary>
                Les détails qui comptent <Plus size={17} />
              </summary>
              <dl className="specs">
                {(
                  p.specs || [
                    [
                      "Marque",
                      p.category === "dispensers" ? "Koldair" : "TANK",
                    ],
                    ["Modèle", p.name],
                    ["Catégorie", categoryName(p.category)],
                  ]
                ).map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </details>
            <details>
              <summary>
                Livraison & paiement <Plus size={17} />
              </summary>
              <p>
                Livraison offerte dans tout le Maroc. Comptez 24–48 h ouvrables
                dans les grandes villes, 48–72 h ailleurs et jusqu’à 5 jours
                dans les zones éloignées, après confirmation téléphonique.
                Paiement en espèces à la réception.
              </p>
            </details>
            <details>
              <summary>
                Entretien & compatibilité <Plus size={17} />
              </summary>
              <p>
                {p.category === "cartridges"
                  ? "Vérifiez la gamme et la référence de votre filtre avant de commander. Les cartouches Pro, Power et Pro RO ne sont pas interchangeables."
                  : "Suivez la notice du fabricant pour l’installation, l’utilisation et l’entretien. La fréquence de remplacement des consommables dépend du modèle et des conditions d’utilisation."}
              </p>
            </details>
          </div>
          {p.url && (
            <a
              className="source-link"
              href={storeUrl + p.url}
              target="_blank"
              rel="noreferrer"
            >
              Consulter la fiche sur filtra.ma <ArrowUpRight size={12} />
            </a>
          )}
        </div>
      </section>
      {related.length > 0 && (
        <section className="section related">
          <span className="eyebrow">
            {p.compatible ? "LE BON COMPLÉMENT" : "À DÉCOUVRIR AUSSI"}
          </span>
          <h2>
            {p.compatible ? "Et pour la suite ?" : "D’autres façons de"}{" "}
            <span className="serif">
              {p.compatible ? "Tout est prévu." : "bien choisir."}
            </span>
          </h2>
          <div className="product-grid related-products">
            {related.map((x) => (
              <ProductCard product={x} key={x.id} add={add} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
function Checkout({ cart, total, update, clear }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ city: "Casablanca" });
  const [done, setDone] = useState(null);
  const [city, setCity] = useState("Casablanca");
  function submit(e) {
    e.preventDefault();
    setData(Object.fromEntries(new FormData(e.target)));
    setStep(2);
    window.scrollTo(0, 0);
  }
  if (done)
    return (
      <section className="confirmation">
        <span className="confirmation-icon">
          <Check size={34} />
        </span>
        <span className="eyebrow">VOTRE NOUVELLE HABITUDE COMMENCE ICI</span>
        <h1>
          Merci, <span className="serif">{data.first}.</span>
        </h1>
        <p>Votre parcours de commande est terminé.</p>
        <div className="confirmation-details">
          <b>Confirmation de démonstration</b>
          <span>
            {done.count} article{done.count > 1 ? "s" : ""} ·{" "}
            {money(done.total)} TTC
          </span>
          <p>
            Aucune commande n’a été envoyée et aucun paiement n’a été effectué.
            <br />
            Sur la boutique, un conseiller vous appellera pour confirmer la
            livraison.
          </p>
        </div>
        <a className="button" href="#/">
          Retour à l’accueil <ArrowRight size={18} />
        </a>
      </section>
    );
  if (!cart.length)
    return (
      <section className="empty checkout-empty">
        <ShoppingBag size={42} />
        <h1>Votre panier est encore vide.</h1>
        <p>Choisissez le produit qui vous accompagnera au quotidien.</p>
        <a className="button" href="#/shop/all">
          Découvrir la boutique <ArrowRight size={18} />
        </a>
      </section>
    );
  return (
    <section className="checkout">
      <div className="checkout-form">
        <a className="back-link" href="#/shop/all">
          <ArrowLeft size={16} /> Continuer mes achats
        </a>
        <span className="eyebrow">SIMPLE, DU CHOIX À LA LIVRAISON</span>
        <h1>
          Presque <span className="serif">chez vous.</span>
        </h1>
        <div className="steps">
          <button
            className={step === 1 ? "active" : ""}
            onClick={() => setStep(1)}
          >
            <span>{step === 2 ? <Check size={12} /> : "1"}</span> Vos
            coordonnées
          </button>
          <div />
          <span className={step === 2 ? "active" : ""}>
            <i>2</i> Vérifier & confirmer
          </span>
        </div>
        {step === 1 ? (
          <form onSubmit={submit}>
            <h2>À qui livre-t-on ?</h2>
            <div className="form-grid">
              <label>
                Prénom
                <input
                  name="first"
                  autoComplete="given-name"
                  defaultValue={data.first}
                  required
                />
              </label>
              <label>
                Nom
                <input
                  name="last"
                  autoComplete="family-name"
                  defaultValue={data.last}
                  required
                />
              </label>
            </div>
            <label>
              Téléphone
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                defaultValue={data.phone}
                placeholder="06 12 34 56 78"
                pattern="(0[5-7]([ .\-]?[0-9]){8}|\+212[ .\-]?[5-7]([ .\-]?[0-9]){8})"
                title="Numéro marocain : 06 12 34 56 78 ou +212 6 12 34 56 78"
                required
              />
              <small>
                Pour confirmer votre commande et organiser la livraison.
              </small>
            </label>
            <label>
              Adresse e-mail <span>(facultatif)</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                defaultValue={data.email}
                placeholder="vous@exemple.ma"
              />
            </label>
            <h2>Votre adresse de livraison</h2>
            <div className="form-grid">
              <label>
                Ville
                <select
                  name="city"
                  aria-label="Ville"
                  autoComplete="address-level2"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  {[
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
                    "Autre ville",
                  ].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>
              <label>
                Pays
                <input
                  name="country"
                  autoComplete="country-name"
                  value="Maroc"
                  readOnly
                />
              </label>
            </div>
            {city === "Autre ville" && (
              <label>
                Nom de votre ville
                <input
                  name="otherCity"
                  defaultValue={data.otherCity}
                  required
                />
              </label>
            )}
            <label>
              Adresse complète
              <input
                name="address"
                autoComplete="street-address"
                defaultValue={data.address}
                placeholder="Rue, numéro, immeuble, appartement…"
                required
              />
            </label>
            <label>
              Quartier ou repère <span>(facultatif)</span>
              <input
                name="landmark"
                defaultValue={data.landmark}
                placeholder="Pour aider votre livreur à vous trouver"
              />
            </label>
            <div className="delivery-box">
              <Truck size={21} />
              <div>
                <b>Livraison offerte</b>
                <p>{deliveryText(city)}.</p>
              </div>
            </div>
            <h2>Votre mode de paiement</h2>
            <div className="payment-option">
              <Banknote size={24} />
              <span>
                <b>Paiement à la livraison</b>
                <small>En espèces, après vérification du colis.</small>
              </span>
              <CheckCircle2 size={20} />
            </div>
            <button type="submit" className="button full">
              Vérifier ma commande <ArrowRight size={18} />
            </button>
            <p className="demo-note">
              <LockKeyhole size={14} /> Aperçu du thème · Aucune commande réelle
            </p>
          </form>
        ) : (
          <div className="review">
            <h2>Tout est correct ?</h2>
            <div className="review-card">
              <div>
                <h3>Coordonnées & livraison</h3>
                <button className="text-button" onClick={() => setStep(1)}>
                  Modifier
                </button>
              </div>
              <p>
                {data.first} {data.last}
                <br />
                {data.phone}
                {data.email && (
                  <>
                    <br />
                    {data.email}
                  </>
                )}
              </p>
              <p>
                {data.address}
                <br />
                {data.landmark && (
                  <>
                    {data.landmark}
                    <br />
                  </>
                )}
                {data.city === "Autre ville" ? data.otherCity : data.city},
                Maroc
              </p>
              <p>Livraison offerte · {deliveryText(data.city)}</p>
              <p>
                Paiement à la livraison · <b>{money(total)}</b>
              </p>
            </div>
            <div className="demo-box">
              <ShieldCheck size={24} />
              <div>
                <b>Vous explorez le futur thème Filtra.</b>
                <p>
                  Cette confirmation est une démonstration. Aucune commande ni
                  donnée personnelle n’est envoyée à la boutique.
                </p>
              </div>
            </div>
            <button
              className="button full"
              onClick={() => {
                setDone({ count: cart.reduce((s, i) => s + i.qty, 0), total });
                clear();
                window.scrollTo(0, 0);
              }}
            >
              Confirmer la démonstration <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
      <aside className="order-summary">
        <span className="eyebrow">VOS ESSENTIELS, BIENTÔT CHEZ VOUS</span>
        <h2>
          Votre panier <span>({cart.reduce((s, i) => s + i.qty, 0)})</span>
        </h2>
        {cart.map((i) => (
          <CartItem key={i.id} item={i} update={update} />
        ))}
        <div className="summary-totals">
          <div>
            <span>Articles TTC</span>
            <span>{money(total)}</span>
          </div>
          <div>
            <span>Livraison au Maroc</span>
            <span className="free-shipping">Offerte</span>
          </div>
          <div className="grand-total">
            <b>Total TTC</b>
            <strong>{money(total)}</strong>
          </div>
        </div>
        <div className="summary-note">
          <Banknote size={22} />
          <span>
            Rien à payer maintenant.
            <br />
            Vous réglez à la réception.
          </span>
        </div>
        <p className="summary-disclaimer">
          Prix issus du catalogue public. Cette maquette n’est pas connectée aux
          stocks ni aux commandes PrestaShop.
        </p>
      </aside>
    </section>
  );
}
createRoot(document.getElementById("root")).render(<App />);
