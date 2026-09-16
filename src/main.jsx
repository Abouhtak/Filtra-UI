import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  ArrowRight,
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
  ChevronDown,
  ArrowLeft,
  LockKeyhole,
  Waves,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";
import ProductArt from "./ProductArt";
import "./styles.css";

const products = [
  {
    id: "flow",
    name: "Filtra Flow",
    type: "counter",
    tag: "THE EVERYDAY UPGRADE",
    desc: "A fresh start, straight from your countertop.",
    price: 249,
    label: "Our signature",
    detail:
      "Meet your new favorite daily ritual. Beautifully simple countertop filtration, made to fit naturally into your kitchen. Just fill, touch, and enjoy.",
  },
  {
    id: "pour",
    name: "Filtra Pour",
    type: "pitcher",
    tag: "SMALL SPACE. BIG DIFFERENCE.",
    desc: "Better water. Wherever you call home.",
    price: 59,
    label: "Small-space favorite",
    detail:
      "Your everyday pitcher, thoughtfully reimagined. A comfortable handle, an easy-fill lid, and a shape that belongs on the table as much as in the fridge.",
  },
  {
    id: "fresh",
    name: "Fresh Start Filter",
    type: "filter",
    tag: "KEEP THE GOOD FLOWING",
    desc: "A little refresh for your daily ritual.",
    price: 29,
    label: "The essential refill",
    detail:
      "Keep your Filtra Flow ready for the everyday. A simple twist-in replacement cartridge designed to make filter changes feel effortless.",
  },
];
const money = (n) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
function getCart() {
  try {
    const c = JSON.parse(localStorage.getItem("filtra-cart") || "[]");
    return Array.isArray(c)
      ? c.filter(
          (i) =>
            products.some((p) => p.id === i.id) &&
            ["Chalk", "Ocean", "Sage"].includes(i.color) &&
            Number.isInteger(i.qty) &&
            i.qty > 0 &&
            i.qty <= 20,
        )
      : [];
  } catch {
    return [];
  }
}
function App() {
  const [route, setRoute] = useState(location.hash || "#/");
  const [cart, setCart] = useState(getCart);
  const [bag, setBag] = useState(false);
  const [menu, setMenu] = useState(false);
  const [quiz, setQuiz] = useState(false);
  const [quizResult, setQuizResult] = useState(null);
  const [toast, setToast] = useState("");
  useEffect(() => {
    const handler = () => {
      setRoute(location.hash || "#/");
      setMenu(false);
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("filtra-cart", JSON.stringify(cart));
    } catch {
      /* Keep shopping usable when browser storage is unavailable. */
    }
  }, [cart]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 4000);
    return () => clearTimeout(t);
  }, [toast]);
  useEffect(() => {
    document.body.style.overflow = bag || quiz ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [bag, quiz]);
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const total = cart.reduce(
    (s, i) => s + products.find((p) => p.id === i.id).price * i.qty,
    0,
  );
  const add = (id, color, qty = 1) => {
    setCart((c) => {
      const old = c.find((i) => i.id === id && i.color === color);
      return old
        ? c.map((i) =>
            i === old ? { ...i, qty: Math.min(20, i.qty + qty) } : i,
          )
        : [...c, { id, color, qty }];
    });
    setBag(true);
  };
  const update = (id, color, d) =>
    setCart((c) =>
      c
        .map((i) =>
          i.id === id && i.color === color
            ? { ...i, qty: Math.min(20, i.qty + d) }
            : i,
        )
        .filter((i) => i.qty > 0),
    );
  const goShop = () => {
    location.hash = "#/";
    setTimeout(
      () =>
        document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }),
      80,
    );
  };
  const goSection = (id) => {
    location.hash = "#/";
    setMenu(false);
    setTimeout(
      () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }),
      80,
    );
  };
  const checkout = route.startsWith("#/checkout");
  const product = route.startsWith("#/product/")
    ? products.find((p) => p.id === route.split("/")[2])
    : null;
  return (
    <>
      <a href="#main" className="skip">
        Skip to content
      </a>
      <div className="announcement">
        <span>Good water. Good days.</span> Free shipping on orders $75+{" "}
        <ArrowUpRight size={13} />
      </div>
      <header>
        <a className="wordmark" href="#/" aria-label="Filtra home">
          filtra<span>®</span>
        </a>
        {!checkout && (
          <nav className={menu ? "nav-open" : ""} aria-label="Main navigation">
            <button onClick={goShop}>
              Shop all <ChevronDown size={13} />
            </button>
            <button onClick={() => goSection("difference")}>
              The Filtra difference
            </button>
            <button onClick={() => goSection("story")}>Our story</button>
            <button onClick={() => goSection("faq")}>Good to know</button>
          </nav>
        )}
        <div className="header-actions">
          {checkout ? (
            <span className="secure">
              <LockKeyhole size={15} /> Secure checkout
            </span>
          ) : (
            <>
              <button
                className="find-link"
                onClick={() => {
                  setQuizResult(null);
                  setQuiz(true);
                }}
              >
                Find your flow <ArrowUpRight size={15} />
              </button>
              <button
                className="bag-button"
                aria-label={`Open bag, ${count} items`}
                onClick={() => setBag(true)}
              >
                <ShoppingBag size={20} />
                <span>{count}</span>
              </button>
              <button
                className="mobile-menu"
                aria-label="Toggle navigation"
                aria-expanded={menu}
                onClick={() => setMenu(!menu)}
              >
                {menu ? <X /> : <Menu />}
              </button>
            </>
          )}
        </div>
      </header>
      <main id="main">
        {checkout ? (
          <Checkout
            cart={cart}
            total={total}
            update={update}
            clear={() => setCart([])}
          />
        ) : product ? (
          <Product key={product.id} product={product} add={add} />
        ) : route === "#/" || route === "" ? (
          <Home
            goShop={goShop}
            quiz={() => {
              setQuizResult(null);
              setQuiz(true);
            }}
          />
        ) : (
          <section className="empty">
            <h1>A little off course.</h1>
            <a className="button" href="#/">
              Back to Filtra <ArrowRight size={18} />
            </a>
          </section>
        )}
      </main>
      {!checkout && (
        <footer>
          <div className="footer-top">
            <div>
              <a href="#/" className="wordmark">
                filtra<span>®</span>
              </a>
              <h2>
                Good things
                <br />
                start with water.
              </h2>
            </div>
            <div className="footer-links">
              <div>
                <b>Explore</b>
                <button onClick={goShop}>Shop the collection</button>
                <button onClick={() => goSection("difference")}>
                  Our difference
                </button>
                <button onClick={() => goSection("faq")}>
                  Questions & answers
                </button>
              </div>
              <div>
                <b>A little more Filtra</b>
                <p>
                  Fresh ideas for your everyday.
                  <br />
                  Join our world.
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setToast("You’re on the list — demo signup complete.");
                    e.target.reset();
                  }}
                >
                  <input
                    aria-label="Email for newsletter"
                    type="email"
                    placeholder="Your email address"
                    required
                  />
                  <button aria-label="Subscribe to newsletter">
                    <ArrowRight size={20} />
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} Filtra. A fresher everyday.
            </span>
            <span>Concept storefront · USD $ · English</span>
            <span>
              Made for a better flow. <Droplets size={14} />
            </span>
          </div>
        </footer>
      )}
      {toast && (
        <div role="status" className="toast">
          <CheckCircle2 size={18} />
          {toast}
        </div>
      )}
      {bag && (
        <Modal close={() => setBag(false)} drawer title="Your bag">
          <div className="bag-heading">
            <h2>
              Your good-water essentials <span>({count})</span>
            </h2>
          </div>
          {cart.length ? (
            <>
              <p className="shipping-note">
                <Truck size={17} />
                {total >= 75
                  ? "Your order qualifies for free shipping."
                  : `${money(75 - total)} away from free shipping.`}
              </p>
              <div className="bag-items">
                {cart.map((i) => (
                  <CartItem key={i.id + i.color} item={i} update={update} />
                ))}
              </div>
              <div className="bag-bottom">
                <div className="total-line">
                  <span>Subtotal</span>
                  <strong>{money(total)}</strong>
                </div>
                <p>Shipping calculated at checkout.</p>
                <a
                  href="#/checkout"
                  className="button full"
                  onClick={() => setBag(false)}
                >
                  Continue to checkout <ArrowRight size={18} />
                </a>
                <button className="text-button" onClick={() => setBag(false)}>
                  Keep exploring
                </button>
              </div>
            </>
          ) : (
            <div className="empty">
              <ShoppingBag size={42} />
              <h3>A fresh start awaits.</h3>
              <p>Your bag is ready for something good.</p>
              <button
                className="button"
                onClick={() => {
                  setBag(false);
                  goShop();
                }}
              >
                Explore the collection <ArrowRight size={18} />
              </button>
            </div>
          )}
        </Modal>
      )}
      {quiz && (
        <Modal close={() => setQuiz(false)} title="Find your flow">
          <span className="eyebrow">A MATCH FOR YOUR EVERYDAY</span>
          <h2>
            {quizResult
              ? "Meet your kind of Filtra."
              : "Where does your water fit in?"}
          </h2>
          {quizResult ? (
            <>
              <ProductArt type={quizResult.type} className="quiz-art" />
              <h3>{quizResult.name}</h3>
              <p>{quizResult.desc}</p>
              <a
                href={`#/product/${quizResult.id}`}
                className="button full"
                onClick={() => setQuiz(false)}
              >
                Explore {quizResult.name} <ArrowRight size={18} />
              </a>
              <button
                className="text-button"
                onClick={() => setQuizResult(null)}
              >
                Start again
              </button>
            </>
          ) : (
            <div className="quiz-options">
              <button onClick={() => setQuizResult(products[0])}>
                <Droplets />
                <span>
                  <b>At the heart of my kitchen</b>
                  <small>A countertop companion for the whole household.</small>
                </span>
                <ArrowRight />
              </button>
              <button onClick={() => setQuizResult(products[1])}>
                <Leaf />
                <span>
                  <b>In a small space, or on the table</b>
                  <small>A simple pitcher that goes where you do.</small>
                </span>
                <ArrowRight />
              </button>
              <button onClick={() => setQuizResult(products[2])}>
                <RefreshCw />
                <span>
                  <b>I already have a Filtra Flow</b>
                  <small>Keep your routine fresh with a replacement.</small>
                </span>
                <ArrowRight />
              </button>
            </div>
          )}
        </Modal>
      )}
    </>
  );
}
function Modal({ children, close, drawer, title }) {
  const ref = React.useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    const el = ref.current;
    el.querySelector("button")?.focus();
    const key = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab") {
        const items = [...el.querySelectorAll("button,a,input,select")].filter(
          (i) => !i.disabled,
        );
        if (e.shiftKey && document.activeElement === items[0]) {
          e.preventDefault();
          items.at(-1).focus();
        } else if (!e.shiftKey && document.activeElement === items.at(-1)) {
          e.preventDefault();
          items[0].focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("keydown", key);
      previous?.focus();
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
          aria-label={`Close ${title}`}
        >
          <X size={21} />
        </button>
        {children}
      </section>
    </div>
  );
}
function Home({ goShop, quiz }) {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="tiny-dot" /> LESS ORDINARY. MORE PURE.
          </span>
          <h1>
            A little better,
            <br />
            every{" "}
            <span className="serif sip-word">
              sip.
              <svg
                className="underline"
                viewBox="0 0 160 16"
                aria-hidden="true"
              >
                <path d="M3 12Q74-3 156 7" />
              </svg>
            </span>
          </h1>
          <p>
            Beautifully simple water filtration.
            <br />
            For a healthier home, a happier planet,
            <br className="desktop-break" /> and all the little moments in
            between.
          </p>
          <div className="hero-buttons">
            <button className="button" onClick={goShop}>
              Meet your everyday upgrade <ArrowUpRight size={18} />
            </button>
            <button className="hero-text" onClick={quiz}>
              Find your Filtra <ArrowRight size={17} />
            </button>
          </div>
          <div className="hero-note">
            <span className="note-icon">
              <Leaf size={20} />
            </span>
            <span>
              A fresh perspective on a daily essential.
              <br />
              <b>Thoughtfully designed. Naturally simple.</b>
            </span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <div className="visual-top">
            <span>YOUR DAILY DOSE OF BETTER.</span>
            <Droplets size={24} />
          </div>
          <div className="floating-label">
            <span className="tiny-dot" /> A fresher kind of flow
          </div>
          <ProductArt />
          <div className="pedestal" />
          <div className="hero-product-caption">
            <div>
              <span>MEET FILTRA FLOW</span>
              <p>
                Pure simplicity.
                <br />
                On your countertop.
              </p>
            </div>
            <a href="#/product/flow" aria-label="Explore Filtra Flow">
              <ArrowUpRight size={26} />
            </a>
          </div>
          <div className="vertical-label">
            DESIGNED TO MAKE WAVES — NOT WASTE
          </div>
        </div>
      </section>
      <div className="benefit-strip">
        <span>
          <Truck /> Free shipping over $75
        </span>
        <span>
          <RefreshCw /> Easy-to-change filters
        </span>
        <span>
          <Leaf /> A reusable everyday ritual
        </span>
        <span>
          <ShieldCheck /> Thoughtful by design
        </span>
      </div>
      <section className="collection section" id="shop">
        <div className="section-heading">
          <div>
            <span className="eyebrow">GOOD WATER STARTS HERE</span>
            <h2>
              Find your <span className="serif">flow.</span>
            </h2>
          </div>
          <p>
            For your kitchen. Your table. Your everyday.
            <br />
            There’s a Filtra that feels right at home.
          </p>
          <button className="round-link" onClick={quiz}>
            Help me choose <ArrowUpRight size={17} />
          </button>
        </div>
        <div className="product-grid">
          {products.map((p, i) => (
            <a className="product-card" key={p.id} href={`#/product/${p.id}`}>
              <div className={`product-image image-${i}`}>
                <span className="pill">{p.label}</span>
                <ProductArt type={p.type} />
                <span className="product-arrow">
                  <ArrowUpRight size={23} />
                </span>
              </div>
              <div className="product-title">
                <h3>{p.name}</h3>
                <span>{money(p.price)}</span>
              </div>
              <p>{p.desc}</p>
              <span className="product-category">
                {p.type === "counter"
                  ? "Countertop water filter"
                  : p.type === "pitcher"
                    ? "Everyday filter pitcher"
                    : "Replacement cartridge"}{" "}
                <ArrowRight size={14} />
              </span>
            </a>
          ))}
        </div>
      </section>
      <section className="difference" id="difference">
        <div className="difference-intro">
          <span className="eyebrow">SMALL CHANGE. BEAUTIFUL DIFFERENCE.</span>
          <h2>
            More than better water.
            <br />A better <span className="serif">everyday.</span>
          </h2>
          <p>
            We believe the things you use every day should feel good, look good,
            and do a little good, too.
          </p>
          <a href="#/product/flow" className="light-link">
            Discover Filtra Flow <ArrowUpRight size={18} />
          </a>
          <div className="water-mark">
            <Waves />
          </div>
        </div>
        <div className="difference-list">
          {[
            [
              Droplets,
              "01",
              "Made for your daily refill",
              "A simple filtration ritual, from your first morning glass to your last cup of tea.",
            ],
            [
              Leaf,
              "02",
              "Less single-use. More possibility.",
              "Make refilling second nature. One small habit that leaves disposable bottles behind.",
            ],
            [
              Waves,
              "03",
              "Fits in. Stands out.",
              "Calm colors, considered details, and an easy routine. Designed to belong in your home.",
            ],
          ].map(([Icon, n, title, text]) => (
            <div className="difference-row" key={n}>
              <Icon size={27} />
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
              <span>{n}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="story section" id="story">
        <div className="story-art">
          <div className="sunlight" />
          <span className="eyebrow">THE ART OF SLOWING DOWN.</span>
          <ProductArt type="pitcher" />
          <div className="story-table" />
          <div className="story-caption">Just add a moment for yourself.</div>
        </div>
        <div className="story-copy">
          <span className="eyebrow">LESS COMPLICATED. MORE CONSIDERED.</span>
          <h2>
            Life is full.
            <br />
            Your water can
            <br />
            be <span className="serif">simple.</span>
          </h2>
          <p>
            Morning coffee. A shared meal. That well-earned moment to yourself.
            Water is part of it all.
          </p>
          <p>
            We created Filtra to make that everyday essential a little more
            intentional. Easy to use, lovely to live with, and ready for
            whatever your day brings.
          </p>
          <button className="text-link" onClick={goShop}>
            Make room for better <ArrowUpRight size={18} />
          </button>
        </div>
      </section>
      <section className="faq section" id="faq">
        <div>
          <span className="eyebrow">A LITTLE CLARITY</span>
          <h2>
            Good questions.
            <br />
            <span className="serif">Clear answers.</span>
          </h2>
          <p>Getting started should feel easy.</p>
        </div>
        <div>
          {[
            [
              "Which Filtra is right for me?",
              "Choose Flow for a dedicated countertop station, Pour for a portable pitcher and small spaces, or Fresh Start to replace the filter in your existing Flow. Our “Find your flow” guide can help you choose.",
            ],
            [
              "Does Filtra Flow need plumbing?",
              "The Flow concept is a refillable countertop design. Fill the removable reservoir and place the unit on a level surface near a power outlet. Final installation instructions will accompany the production product.",
            ],
            [
              "How do I change my filter?",
              "The Fresh Start cartridge is designed for a simple twist-in replacement. Filter life and replacement schedules should be confirmed against final product specifications before launch.",
            ],
            [
              "What are my shipping options?",
              "This concept store offers standard shipping for $5.95, free on orders of $75 or more, and an express option for $14.95. Checkout lets you preview both options.",
            ],
            [
              "Can I place a real order here?",
              "This is an interactive storefront concept. Prices and products are illustrative, and checkout creates a demo confirmation only. No payment is collected and no order is sent.",
            ],
          ].map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <Plus size={18} />
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="closing">
        <span className="eyebrow">YOUR NEXT GOOD HABIT STARTS HERE</span>
        <h2>
          Here’s to a <span className="serif">fresher</span> everyday.
        </h2>
        <button className="button" onClick={goShop}>
          Find your Filtra <ArrowUpRight size={18} />
        </button>
        <Droplets className="closing-drop" />
      </section>
    </>
  );
}
function Product({ product: p, add }) {
  const [color, setColor] = useState("Chalk");
  const [qty, setQty] = useState(1);
  const [view, setView] = useState(0);
  return (
    <>
      <div className="breadcrumbs">
        <a href="#/">Home</a>
        <span>/</span>
        <a href="#/">The collection</a>
        <span>/</span>
        <span>{p.name}</span>
      </div>
      <section className="product-detail">
        <div>
          <div className={`detail-art detail-view-${view}`}>
            <span className="pill">{p.label}</span>
            <ProductArt type={p.type} color={color} />
            <span className="detail-art-note">
              THOUGHTFULLY DESIGNED. BEAUTIFULLY SIMPLE.
            </span>
          </div>
          <div className="thumbnails">
            {["Full view", "A closer look", "Another perspective"].map(
              (v, i) => (
                <button
                  className={view === i ? "selected" : ""}
                  key={v}
                  onClick={() => setView(i)}
                  aria-label={v}
                  aria-pressed={view === i}
                >
                  <ProductArt type={p.type} color={color} />
                </button>
              ),
            )}
          </div>
        </div>
        <div className="product-info">
          <span className="eyebrow">{p.tag}</span>
          <h1>
            {p.name}
            <span className="serif">
              {p.type === "counter"
                ? "Your daily upgrade."
                : p.type === "pitcher"
                  ? "Pour a little joy."
                  : "A fresh beginning."}
            </span>
          </h1>
          <div className="product-price">
            {money(p.price)} <span>Designed for your everyday</span>
          </div>
          <p className="product-description">{p.detail}</p>
          <div className="product-perks">
            <span>
              <Check size={16} /> Easy to use
            </span>
            <span>
              <Check size={16} /> Considered design
            </span>
            <span>
              <Check size={16} /> Replaceable filter
            </span>
          </div>
          {p.type !== "filter" && (
            <div className="color-picker">
              <b>
                Color — <span>{color}</span>
              </b>
              <div>
                {["Chalk", "Ocean", "Sage"].map((c) => (
                  <button
                    key={c}
                    className={`swatch ${c.toLowerCase()} ${color === c ? "selected" : ""}`}
                    aria-label={`Select ${c}`}
                    aria-pressed={color === c}
                    onClick={() => setColor(c)}
                  >
                    {color === c && <Check size={16} />}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="stock">
            <span className="tiny-dot" /> Ready for a fresh start
          </div>
          <div className="buy-row">
            <div className="quantity">
              <button
                aria-label="Decrease quantity"
                disabled={qty === 1}
                onClick={() => setQty(qty - 1)}
              >
                <Minus size={15} />
              </button>
              <span>{qty}</span>
              <button
                aria-label="Increase quantity"
                disabled={qty === 20}
                onClick={() => setQty(qty + 1)}
              >
                <Plus size={15} />
              </button>
            </div>
            <button className="button" onClick={() => add(p.id, color, qty)}>
              Add to bag — {money(p.price * qty)} <ArrowRight size={18} />
            </button>
          </div>
          <div className="purchase-note">
            <Truck size={17} />
            {p.price >= 75
              ? "Free standard shipping on this item"
              : "Free standard shipping on orders $75+"}
          </div>
          <div className="product-accordions">
            <details open>
              <summary>
                The little details <Plus size={17} />
              </summary>
              <p>
                {p.type === "counter"
                  ? "Refillable reservoir · Touch control · Removable drip tray · Replaceable cartridge"
                  : p.type === "pitcher"
                    ? "Easy-fill lid · Comfortable handle · Removable filter · Table-ready design"
                    : "Designed for Filtra Flow · Twist-in cartridge · Single replacement filter"}
              </p>
            </details>
            <details>
              <summary>
                What’s in the box <Plus size={17} />
              </summary>
              <p>
                {p.name}, {p.type !== "filter" ? "one starter filter, " : ""}and
                a quick-start guide. Product specifications are illustrative for
                this storefront concept.
              </p>
            </details>
            <details>
              <summary>
                Delivery & returns <Plus size={17} />
              </summary>
              <p>
                Preview standard or express delivery at checkout. This demo does
                not ship products or process returns; final store policies must
                be supplied before launch.
              </p>
            </details>
          </div>
        </div>
      </section>
      <section className="product-banner">
        <Droplets size={36} />
        <h2>
          Better water.{" "}
          <span className="serif">Beautifully uncomplicated.</span>
        </h2>
        <p>A little change to your space. A lovely change to your day.</p>
      </section>
      <section className="section related">
        <span className="eyebrow">GOOD THINGS GO TOGETHER</span>
        <h2>
          Keep the good <span className="serif">flowing.</span>
        </h2>
        <div className="related-grid">
          {products
            .filter((a) => a.id !== p.id)
            .map((a) => (
              <a href={`#/product/${a.id}`} key={a.id}>
                <ProductArt type={a.type} />
                <div>
                  <h3>{a.name}</h3>
                  <p>{a.desc}</p>
                  <b>
                    {money(a.price)} <ArrowUpRight size={18} />
                  </b>
                </div>
              </a>
            ))}
        </div>
      </section>
    </>
  );
}
function CartItem({ item: i, update }) {
  const p = products.find((p) => p.id === i.id);
  return (
    <div className="cart-item">
      <div className="cart-art">
        <ProductArt type={p.type} color={i.color} />
      </div>
      <div className="cart-item-info">
        <h3>{p.name}</h3>
        <p>
          {i.color} ·{" "}
          {p.type === "filter" ? "Replacement filter" : "Water filter"}
        </p>
        <div className="quantity small">
          <button
            aria-label={`Decrease ${p.name} quantity`}
            onClick={() => update(i.id, i.color, -1)}
          >
            <Minus size={13} />
          </button>
          <span>{i.qty}</span>
          <button
            aria-label={`Increase ${p.name} quantity`}
            disabled={i.qty === 20}
            onClick={() => update(i.id, i.color, 1)}
          >
            <Plus size={13} />
          </button>
        </div>
      </div>
      <div className="cart-item-end">
        <b>{money(p.price * i.qty)}</b>
        <button
          aria-label={`Remove ${p.name}`}
          onClick={() => update(i.id, i.color, -i.qty)}
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
}
function Checkout({ cart, total, update, clear }) {
  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState("standard");
  const [done, setDone] = useState(false);
  const [data, setData] = useState({});
  const [confirmed, setConfirmed] = useState(null);
  const cost = shipping === "express" ? 14.95 : total >= 75 ? 0 : 5.95;
  const price = (n) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD" });
  const submit = (e) => {
    e.preventDefault();
    setData(Object.fromEntries(new FormData(e.target)));
    setStep(2);
    window.scrollTo(0, 0);
  };
  if (done)
    return (
      <section className="confirmation">
        <span className="confirmation-icon">
          <Check size={34} />
        </span>
        <span className="eyebrow">A FRESH START LOOKS GOOD ON YOU</span>
        <h1>
          You’re all <span className="serif">set.</span>
        </h1>
        <p>Thanks, {data.first}. Your demo order is complete.</p>
        <div className="confirmation-details">
          <b>Demo order · FILTRA-1001</b>
          <span>
            {confirmed.count} item{confirmed.count !== 1 ? "s" : ""} ·{" "}
            {price(confirmed.total)}
          </span>
          <p>
            No payment was taken and no order was sent.
            <br />
            This is a preview of your Filtra checkout experience.
          </p>
        </div>
        <a href="#/" className="button">
          Back to the good flow <ArrowRight size={18} />
        </a>
      </section>
    );
  if (!cart.length)
    return (
      <section className="empty checkout-empty">
        <ShoppingBag size={42} />
        <h1>Your bag is taking a breather.</h1>
        <p>Find a fresh addition to your everyday.</p>
        <a href="#/" className="button">
          Explore Filtra <ArrowRight size={18} />
        </a>
      </section>
    );
  return (
    <section className="checkout">
      <div className="checkout-form">
        <a href="#/" className="back-link">
          <ArrowLeft size={16} /> Keep exploring
        </a>
        <span className="eyebrow">ONE STEP CLOSER TO BETTER WATER</span>
        <h1>
          A fresh <span className="serif">start.</span>
        </h1>
        <div className="steps">
          <button
            className={step === 1 ? "active" : ""}
            onClick={() => setStep(1)}
          >
            <span>{step === 2 ? <Check size={12} /> : "1"}</span> Your details
          </button>
          <div />
          <span className={step === 2 ? "active" : ""}>
            <i>2</i> Review & confirm
          </span>
        </div>
        {step === 1 ? (
          <form onSubmit={submit}>
            <h2>Let’s start with you.</h2>
            <label>
              Email address
              <input
                type="email"
                name="email"
                autoComplete="email"
                defaultValue={data.email}
                placeholder="you@example.com"
                required
              />
            </label>
            <h2>Where’s the good water going?</h2>
            <div className="form-grid">
              <label>
                First name
                <input
                  name="first"
                  autoComplete="given-name"
                  defaultValue={data.first}
                  required
                />
              </label>
              <label>
                Last name
                <input
                  name="last"
                  autoComplete="family-name"
                  defaultValue={data.last}
                  required
                />
              </label>
            </div>
            <label>
              Street address
              <input
                name="address"
                autoComplete="address-line1"
                defaultValue={data.address}
                required
              />
            </label>
            <label>
              Apartment, suite, etc. <span>(optional)</span>
              <input
                name="apartment"
                autoComplete="address-line2"
                defaultValue={data.apartment}
              />
            </label>
            <div className="form-grid">
              <label>
                City
                <input
                  name="city"
                  autoComplete="address-level2"
                  defaultValue={data.city}
                  required
                />
              </label>
              <label>
                State / region
                <input
                  name="region"
                  autoComplete="address-level1"
                  defaultValue={data.region}
                  required
                />
              </label>
            </div>
            <div className="form-grid">
              <label>
                Country
                <select
                  name="country"
                  autoComplete="country-name"
                  defaultValue={data.country || "United States"}
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                  <option>Morocco</option>
                  <option>France</option>
                </select>
              </label>
              <label>
                ZIP / postal code
                <input
                  name="postal"
                  autoComplete="postal-code"
                  defaultValue={data.postal}
                  required
                />
              </label>
            </div>
            <h2>Choose your delivery.</h2>
            <div className="shipping-options">
              {[
                [
                  "standard",
                  "Standard delivery",
                  "5–7 business days",
                  total >= 75 ? "Free" : "$5.95",
                ],
                ["express", "Express delivery", "2–3 business days", "$14.95"],
              ].map(([v, t, d, c]) => (
                <label className={shipping === v ? "selected" : ""} key={v}>
                  <input
                    type="radio"
                    name="delivery"
                    value={v}
                    checked={shipping === v}
                    onChange={() => setShipping(v)}
                  />
                  <span>
                    <b>{t}</b>
                    <small>{d}</small>
                  </span>
                  <b>{c}</b>
                </label>
              ))}
            </div>
            <button className="button full" type="submit">
              Review your order <ArrowRight size={18} />
            </button>
            <p className="demo-note">
              <LockKeyhole size={14} /> Demo checkout. No payment details
              required.
            </p>
          </form>
        ) : (
          <div className="review">
            <h2>All the little details.</h2>
            <div className="review-card">
              <div>
                <h3>Contact & delivery</h3>
                <button className="text-button" onClick={() => setStep(1)}>
                  Edit
                </button>
              </div>
              <p>{data.email}</p>
              <p>
                {data.first} {data.last}
                <br />
                {data.address}
                {data.apartment && `, ${data.apartment}`}
                <br />
                {data.city}, {data.region} {data.postal}
                <br />
                {data.country}
              </p>
              <p>
                {shipping === "express"
                  ? "Express · 2–3 business days"
                  : "Standard · 5–7 business days"}
              </p>
            </div>
            <div className="demo-box">
              <ShieldCheck size={24} />
              <div>
                <b>You’re exploring a demo.</b>
                <p>
                  No card details needed. Confirming creates a sample order on
                  this screen only.
                </p>
              </div>
            </div>
            <button
              className="button full"
              onClick={() => {
                setConfirmed({
                  count: cart.reduce((s, i) => s + i.qty, 0),
                  total: total + cost,
                });
                setDone(true);
                clear();
                window.scrollTo(0, 0);
              }}
            >
              Confirm demo order · {price(total + cost)}{" "}
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
      <aside className="order-summary">
        <span className="eyebrow">GOOD CHOICES, ALL AROUND</span>
        <h2>
          In your bag <span>({cart.reduce((s, i) => s + i.qty, 0)})</span>
        </h2>
        {cart.map((i) => (
          <CartItem key={i.id + i.color} item={i} update={update} />
        ))}
        <div className="summary-totals">
          <div>
            <span>Subtotal</span>
            <span>{price(total)}</span>
          </div>
          <div>
            <span>Shipping</span>
            <span>{cost ? price(cost) : "On us"}</span>
          </div>
          <div>
            <span>Tax</span>
            <span>$0.00 (demo)</span>
          </div>
          <div className="grand-total">
            <b>Total</b>
            <strong>
              <small>USD</small> {price(total + cost)}
            </strong>
          </div>
        </div>
        <div className="summary-note">
          <Leaf size={21} />
          <span>
            A small change to your routine.
            <br />A fresh perspective on your everyday.
          </span>
        </div>
        <p className="summary-disclaimer">
          Illustrative products and pricing. Tax and delivery estimates are for
          this design preview only.
        </p>
      </aside>
    </section>
  );
}

createRoot(document.getElementById("root")).render(<App />);
