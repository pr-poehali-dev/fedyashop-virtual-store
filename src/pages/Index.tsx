import { useState } from "react";
import Icon from "@/components/ui/icon";

const PRODUCTS = [
  {
    id: 1,
    name: "V-Bucks x1000",
    game: "Fortnite",
    price: 549,
    oldPrice: 699,
    emoji: "💎",
    category: "currency",
    rating: 4.9,
    reviews: 342,
    badge: "ХИТ",
    badgeColor: "bg-neon-cyan text-cyber-dark",
    popular: true,
  },
  {
    id: 2,
    name: "Valorant Points x1650",
    game: "Valorant",
    price: 749,
    oldPrice: null,
    emoji: "⚡",
    category: "currency",
    rating: 4.8,
    reviews: 218,
    badge: "НОВИНКА",
    badgeColor: "bg-neon-purple text-white",
    popular: true,
  },
  {
    id: 3,
    name: "GTA$ 100 млн",
    game: "GTA Online",
    price: 399,
    oldPrice: 599,
    emoji: "💰",
    category: "currency",
    rating: 4.7,
    reviews: 487,
    badge: "-33%",
    badgeColor: "bg-neon-pink text-white",
    popular: true,
  },
  {
    id: 4,
    name: "Скин «Призрак»",
    game: "CS2",
    price: 1299,
    oldPrice: null,
    emoji: "👻",
    category: "skin",
    rating: 5.0,
    reviews: 93,
    badge: "РЕДКИЙ",
    badgeColor: "bg-yellow-400 text-black",
    popular: false,
  },
  {
    id: 5,
    name: "Робуксы x4500",
    game: "Roblox",
    price: 299,
    oldPrice: 399,
    emoji: "🟢",
    category: "currency",
    rating: 4.6,
    reviews: 654,
    badge: "ХИТ",
    badgeColor: "bg-neon-cyan text-cyber-dark",
    popular: false,
  },
  {
    id: 6,
    name: "Apex Coins x2150",
    game: "Apex Legends",
    price: 899,
    oldPrice: null,
    emoji: "🔴",
    category: "currency",
    rating: 4.8,
    reviews: 176,
    badge: null,
    badgeColor: "",
    popular: false,
  },
];

const REVIEWS = [
  {
    id: 1,
    name: "Макс_Гамер",
    avatar: "🎮",
    rating: 5,
    text: "Купил V-Bucks, пришли за 5 минут. Всё чётко, цены лучшие в сети!",
    game: "Fortnite",
    date: "2 дня назад",
  },
  {
    id: 2,
    name: "ProPlayer_777",
    avatar: "⚡",
    rating: 5,
    text: "Уже 3-й раз беру здесь. Поддержка отвечает быстро, рекомендую.",
    game: "Valorant",
    date: "5 дней назад",
  },
  {
    id: 3,
    name: "DarkStar99",
    avatar: "💀",
    rating: 4,
    text: "Скин получил моментально. Качество огонь, буду заходить ещё.",
    game: "CS2",
    date: "1 неделю назад",
  },
  {
    id: 4,
    name: "NeonKiller",
    avatar: "🔫",
    rating: 5,
    text: "GTA деньги зачислились пока я моргнуть не успел. Топ магазин!",
    game: "GTA Online",
    date: "3 дня назад",
  },
];

const CATEGORIES = ["Все", "Валюта", "Скины", "Популярное"];

type CartItem = { id: number; name: string; price: number; emoji: string; qty: number };

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={s <= Math.round(rating) ? "star-filled" : "star-empty"} style={{ fontSize: 12 }}>
          ★
        </span>
      ))}
    </span>
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState<"home" | "catalog" | "popular" | "cart">("home");
  const [activeCategory, setActiveCategory] = useState("Все");
  const [cart, setCart] = useState<CartItem[]>([]);

  const cartCount = cart.reduce((a, c) => a + c.qty, 0);
  const cartTotal = cart.reduce((a, c) => a + c.price * c.qty, 0);

  const addToCart = (p: typeof PRODUCTS[0]) => {
    setCart((prev) => {
      const ex = prev.find((c) => c.id === p.id);
      if (ex) return prev.map((c) => (c.id === p.id ? { ...c, qty: c.qty + 1 } : c));
      return [...prev, { id: p.id, name: p.name, price: p.price, emoji: p.emoji, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) => setCart((prev) => prev.filter((c) => c.id !== id));

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeSection === "popular") return p.popular;
    if (activeCategory === "Валюта") return p.category === "currency";
    if (activeCategory === "Скины") return p.category === "skin";
    if (activeCategory === "Популярное") return p.popular;
    return true;
  });

  return (
    <div className="min-h-screen cyber-grid" style={{ background: "linear-gradient(180deg, #030912 0%, #050d1a 100%)" }}>
      {/* Scanline */}
      <div className="scan-line" />

      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          background: "rgba(3,9,18,0.92)",
          backdropFilter: "blur(20px)",
          borderColor: "rgba(0,245,255,0.15)",
          boxShadow: "0 0 30px rgba(0,245,255,0.05)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => setActiveSection("home")} className="flex items-center gap-2 group">
            <div
              className="w-8 h-8 flex items-center justify-center text-sm font-bold"
              style={{
                background: "linear-gradient(135deg, #00f5ff, #0066cc)",
                clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
                color: "#030912",
                fontFamily: "Orbitron, monospace",
              }}
            >
              F
            </div>
            <span className="font-orbitron font-black text-xl tracking-widest neon-cyan animate-neon-pulse">
              FEDYA<span style={{ color: "#bf00ff", textShadow: "0 0 8px #bf00ff" }}>SHOP</span>
            </span>
          </button>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {(["home", "catalog", "popular"] as const).map((s) => {
              const labels = { home: "Главная", catalog: "Каталог", popular: "Популярное" };
              return (
                <button
                  key={s}
                  onClick={() => setActiveSection(s)}
                  className="px-4 py-2 text-sm font-rajdhani font-semibold tracking-wider uppercase transition-all"
                  style={{
                    color: activeSection === s ? "#00f5ff" : "rgba(150,200,220,0.7)",
                    textShadow: activeSection === s ? "0 0 10px #00f5ff" : "none",
                    borderBottom: activeSection === s ? "1px solid #00f5ff" : "1px solid transparent",
                  }}
                >
                  {labels[s]}
                </button>
              );
            })}
          </nav>

          {/* Cart */}
          <button
            onClick={() => setActiveSection("cart")}
            className="relative flex items-center gap-2 px-4 py-2 btn-cyber-outline"
          >
            <Icon name="ShoppingCart" size={16} />
            <span className="font-rajdhani font-bold tracking-wider">Корзина</span>
            {cartCount > 0 && (
              <span
                className="absolute -top-2 -right-2 w-5 h-5 text-xs flex items-center justify-center font-bold rounded-full"
                style={{ background: "#ff0090", color: "#fff", boxShadow: "0 0 8px #ff0090" }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-20">
        {/* ===== HOME ===== */}
        {activeSection === "home" && (
          <div>
            {/* Hero */}
            <section className="py-16 md:py-24 relative overflow-hidden">
              {/* BG glow */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(0,245,255,0.06) 0%, transparent 70%)" }}
              />
              <div
                className="absolute top-20 right-10 w-64 h-64 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(191,0,255,0.05) 0%, transparent 70%)" }}
              />

              <div className="text-center relative z-10 animate-fade-in-up">
                <div
                  className="inline-block mb-4 px-4 py-1 text-xs font-mono tracking-widest"
                  style={{
                    border: "1px solid rgba(0,245,255,0.3)",
                    color: "#00f5ff",
                    background: "rgba(0,245,255,0.05)",
                    clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                  }}
                >
                  ▶ ИГРОВОЙ МАГАЗИН v2.0
                </div>
                <h1
                  className="text-5xl md:text-7xl font-orbitron font-black mb-4 leading-none"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  <span className="neon-cyan">FEDYA</span>
                  <span className="neon-purple">SHOP</span>
                </h1>
                <p
                  className="text-lg md:text-xl font-rajdhani mb-2 max-w-xl mx-auto"
                  style={{ color: "rgba(150,220,235,0.8)", letterSpacing: "0.05em" }}
                >
                  Игровая валюта и предметы — мгновенно и безопасно
                </p>
                <p className="text-sm font-mono mb-10" style={{ color: "rgba(0,245,255,0.5)" }}>
                  // 10 000+ геймеров уже с нами
                </p>

                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={() => setActiveSection("catalog")}
                    className="px-8 py-3 btn-cyber text-sm"
                  >
                    Открыть каталог
                  </button>
                  <button
                    onClick={() => setActiveSection("popular")}
                    className="px-8 py-3 btn-cyber-outline text-sm"
                  >
                    Популярное
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto">
                {[
                  { val: "10K+", label: "Покупателей" },
                  { val: "5 мин", label: "Доставка" },
                  { val: "100%", label: "Гарантия" },
                ].map((s) => (
                  <div key={s.label} className="text-center cyber-card p-4 corner-cut-sm">
                    <div className="font-orbitron font-black text-2xl neon-cyan">{s.val}</div>
                    <div className="text-xs font-rajdhani mt-1" style={{ color: "rgba(150,200,220,0.6)", letterSpacing: "0.08em" }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Featured */}
            <section className="py-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-8" style={{ background: "linear-gradient(180deg, #00f5ff, #bf00ff)" }} />
                <h2 className="font-orbitron text-xl font-bold" style={{ color: "#fff" }}>
                  ГОРЯЧИЕ <span className="neon-cyan">ПРЕДЛОЖЕНИЯ</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {PRODUCTS.slice(0, 3).map((p, i) => (
                  <ProductCard key={p.id} product={p} onAdd={addToCart} delay={i * 100} />
                ))}
              </div>
            </section>

            {/* Reviews */}
            <ReviewsSection />
          </div>
        )}

        {/* ===== CATALOG ===== */}
        {activeSection === "catalog" && (
          <div className="py-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8" style={{ background: "linear-gradient(180deg, #00f5ff, #bf00ff)" }} />
              <h2 className="font-orbitron text-2xl font-black text-white">КАТАЛОГ</h2>
            </div>

            {/* Filter tabs */}
            <div className="flex gap-2 mb-8 flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-4 py-2 text-xs font-orbitron transition-all"
                  style={{
                    background: activeCategory === cat ? "linear-gradient(135deg, #00f5ff, #0066cc)" : "rgba(13,21,38,0.9)",
                    color: activeCategory === cat ? "#030912" : "rgba(0,245,255,0.7)",
                    border: activeCategory === cat ? "none" : "1px solid rgba(0,245,255,0.2)",
                    clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                    fontWeight: activeCategory === cat ? 700 : 500,
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} onAdd={addToCart} delay={i * 80} />
              ))}
            </div>
          </div>
        )}

        {/* ===== POPULAR ===== */}
        {activeSection === "popular" && (
          <div className="py-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8" style={{ background: "linear-gradient(180deg, #ffee00, #ff0090)" }} />
              <h2 className="font-orbitron text-2xl font-black text-white">
                ПОПУЛЯРНОЕ <span style={{ color: "#ffee00", textShadow: "0 0 10px #ffee00" }}>🔥</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {PRODUCTS.filter((p) => p.popular).map((p, i) => (
                <ProductCard key={p.id} product={p} onAdd={addToCart} delay={i * 100} />
              ))}
            </div>
            <ReviewsSection />
          </div>
        )}

        {/* ===== CART ===== */}
        {activeSection === "cart" && (
          <div className="py-10 max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8" style={{ background: "linear-gradient(180deg, #00f5ff, #bf00ff)" }} />
              <h2 className="font-orbitron text-2xl font-black text-white">КОРЗИНА</h2>
            </div>

            {cart.length === 0 ? (
              <div className="cyber-card corner-cut p-12 text-center">
                <div className="text-5xl mb-4">🛒</div>
                <p className="font-orbitron text-lg mb-2" style={{ color: "rgba(0,245,255,0.6)" }}>
                  КОРЗИНА ПУСТА
                </p>
                <p className="text-sm font-rajdhani mb-6" style={{ color: "rgba(150,200,220,0.5)" }}>
                  Добавь товары из каталога
                </p>
                <button onClick={() => setActiveSection("catalog")} className="px-6 py-3 btn-cyber">
                  В каталог
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="cyber-card flex items-center gap-4 p-4 corner-cut-sm animate-fade-in-up"
                  >
                    <div
                      className="w-12 h-12 flex items-center justify-center text-2xl flex-shrink-0"
                      style={{
                        background: "rgba(0,245,255,0.08)",
                        border: "1px solid rgba(0,245,255,0.2)",
                        clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
                      }}
                    >
                      {item.emoji}
                    </div>
                    <div className="flex-1">
                      <div className="font-orbitron text-sm font-bold text-white">{item.name}</div>
                      <div className="font-mono text-xs mt-1" style={{ color: "#00f5ff" }}>
                        {item.price} ₽ × {item.qty} = <span className="font-bold">{item.price * item.qty} ₽</span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="w-8 h-8 flex items-center justify-center transition-all hover:scale-110"
                      style={{ color: "#ff0090" }}
                    >
                      <Icon name="X" size={16} />
                    </button>
                  </div>
                ))}

                {/* Total */}
                <div
                  className="mt-6 p-6 corner-cut"
                  style={{
                    background: "rgba(0,245,255,0.04)",
                    border: "1px solid rgba(0,245,255,0.25)",
                    boxShadow: "0 0 20px rgba(0,245,255,0.06)",
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-rajdhani text-lg font-semibold" style={{ color: "rgba(150,220,235,0.8)" }}>
                      ИТОГО:
                    </span>
                    <span className="font-orbitron text-2xl font-black neon-cyan">{cartTotal} ₽</span>
                  </div>
                  <button className="w-full py-4 btn-cyber text-sm">
                    Оформить заказ
                  </button>
                  <p className="text-center text-xs font-mono mt-3" style={{ color: "rgba(0,245,255,0.4)" }}>
                    // Доставка мгновенно · Гарантия возврата
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Bottom nav mobile */}
      <nav
        className="fixed bottom-0 left-0 right-0 md:hidden flex z-50"
        style={{
          background: "rgba(3,9,18,0.97)",
          borderTop: "1px solid rgba(0,245,255,0.15)",
          backdropFilter: "blur(20px)",
        }}
      >
        {(["home", "catalog", "popular", "cart"] as const).map((s) => {
          const icons = { home: "Home", catalog: "LayoutGrid", popular: "Flame", cart: "ShoppingCart" };
          const labels = { home: "Главная", catalog: "Каталог", popular: "Топ", cart: "Корзина" };
          return (
            <button
              key={s}
              onClick={() => setActiveSection(s)}
              className="flex-1 flex flex-col items-center gap-1 py-3 transition-all"
              style={{ color: activeSection === s ? "#00f5ff" : "rgba(150,200,220,0.4)" }}
            >
              {s === "cart" && cartCount > 0 ? (
                <div className="relative">
                  <Icon name={icons[s]} size={20} />
                  <span
                    className="absolute -top-2 -right-2 w-4 h-4 text-xs flex items-center justify-center font-bold rounded-full"
                    style={{ background: "#ff0090", color: "#fff", fontSize: 9 }}
                  >
                    {cartCount}
                  </span>
                </div>
              ) : (
                <Icon name={icons[s]} size={20} />
              )}
              <span className="text-xs font-rajdhani" style={{ fontSize: 10, letterSpacing: "0.05em" }}>
                {labels[s]}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

function ProductCard({
  product,
  onAdd,
  delay = 0,
}: {
  product: typeof PRODUCTS[0];
  onAdd: (p: typeof PRODUCTS[0]) => void;
  delay?: number;
}) {
  return (
    <div
      className="cyber-card corner-cut p-5 flex flex-col gap-3 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        <div
          className="w-14 h-14 flex items-center justify-center text-3xl"
          style={{
            background: "rgba(0,245,255,0.06)",
            border: "1px solid rgba(0,245,255,0.15)",
            clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
          }}
        >
          {product.emoji}
        </div>
        {product.badge && (
          <span
            className={`cyber-badge ${product.badgeColor} font-orbitron font-bold text-xs`}
          >
            {product.badge}
          </span>
        )}
      </div>

      {/* Info */}
      <div>
        <div className="font-orbitron text-sm font-bold text-white leading-tight">{product.name}</div>
        <div
          className="text-xs font-mono mt-1"
          style={{ color: "rgba(0,245,255,0.5)", letterSpacing: "0.06em" }}
        >
          // {product.game}
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <Stars rating={product.rating} />
        <span className="text-xs font-mono" style={{ color: "rgba(150,200,220,0.6)" }}>
          {product.rating} ({product.reviews})
        </span>
      </div>

      {/* Price */}
      <div className="flex items-end justify-between mt-auto pt-2" style={{ borderTop: "1px solid rgba(0,245,255,0.08)" }}>
        <div>
          <div className="font-orbitron text-xl font-black neon-cyan">{product.price} ₽</div>
          {product.oldPrice && (
            <div
              className="text-xs font-mono line-through mt-0.5"
              style={{ color: "rgba(255,100,100,0.5)" }}
            >
              {product.oldPrice} ₽
            </div>
          )}
        </div>
        <button
          onClick={() => onAdd(product)}
          className="flex items-center gap-1.5 px-4 py-2 btn-cyber text-xs"
        >
          <Icon name="Plus" size={12} />
          Купить
        </button>
      </div>
    </div>
  );
}

function ReviewsSection() {
  return (
    <section className="py-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1 h-8" style={{ background: "linear-gradient(180deg, #ffee00, #ff0090)" }} />
        <h2 className="font-orbitron text-xl font-bold text-white">
          ОТЗЫВЫ <span className="neon-cyan">ГЕЙМЕРОВ</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {REVIEWS.map((r, i) => (
          <div
            key={r.id}
            className="cyber-card corner-cut-sm p-5 animate-fade-in-up"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 flex items-center justify-center text-xl flex-shrink-0"
                style={{
                  background: "rgba(191,0,255,0.1)",
                  border: "1px solid rgba(191,0,255,0.3)",
                  clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
                }}
              >
                {r.avatar}
              </div>
              <div>
                <div className="font-orbitron text-xs font-bold" style={{ color: "#00f5ff" }}>
                  {r.name}
                </div>
                <div className="text-xs font-mono mt-0.5" style={{ color: "rgba(0,245,255,0.4)" }}>
                  // {r.game}
                </div>
              </div>
              <div className="ml-auto text-right">
                <Stars rating={r.rating} />
                <div className="text-xs font-mono mt-1" style={{ color: "rgba(150,200,220,0.4)", fontSize: 10 }}>
                  {r.date}
                </div>
              </div>
            </div>
            <p className="font-rajdhani text-sm" style={{ color: "rgba(180,220,235,0.85)", lineHeight: 1.6 }}>
              "{r.text}"
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
