import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  ArrowRight,
  ArrowUpRight,
  Star,
  Instagram,
  Twitter,
  Youtube,
  ChevronRight,
} from "lucide-react";

/* ------------------------------------------------------------------ *
 *  MOCK JSON DATA SOURCES
 *  In production these live as separate files (site.json, hero.json,
 *  categories.json, products.json, offers.json, reviews.json,
 *  navigation.json) and are fetched at runtime. They are inlined here
 *  only so this single-file preview can render without a build step —
 *  every component below still treats them as opaque data, not as
 *  hardcoded markup.
 * ------------------------------------------------------------------ */

const siteData = {
  name: "NOCTURNE",
  tagline: "Gear for after dark.",
};

const navData = [
  { label: "New Drops", href: "#drops" },
  { label: "Footwear", href: "#drops" },
  { label: "Outerwear", href: "#drops" },
  { label: "Accessories", href: "#drops" },
];

const heroData = {
  eyebrow: "DROP 014 — MIDNIGHT RUN",
  titleLines: ["AFTER DARK", "IS WHEN WE", "MOVE."],
  subtitle:
    "Six pieces, one night only. Engineered for the hours between last call and first light — restocks are not a promise we make.",
  ctaPrimary: "Shop The Drop",
  ctaSecondary: "Watch Teaser",
  stat: { value: "01:47:12", label: "until drop closes" },
};

const categoriesData = [
  "Footwear",
  "Outerwear",
  "Tech Layers",
  "Headwear",
  "Accessories",
  "Eyewear",
  "Bags",
  "Limited",
];

const productsData = [
  {
    id: "ntn-001",
    name: "Vantablack Runner",
    category: "Footwear",
    price: 218,
    originalPrice: null,
    tag: "New",
    seed: "vantablack-runner",
    hue: "violet",
  },
  {
    id: "ntn-002",
    name: "Static Bomber",
    category: "Outerwear",
    price: 340,
    originalPrice: 410,
    tag: "-17%",
    seed: "static-bomber",
    hue: "cyan",
  },
  {
    id: "ntn-003",
    name: "Glacier Cargo",
    category: "Tech Layers",
    price: 196,
    originalPrice: null,
    tag: null,
    seed: "glacier-cargo",
    hue: "cyan",
  },
  {
    id: "ntn-004",
    name: "Voltage Hoodie",
    category: "Outerwear",
    price: 168,
    originalPrice: null,
    tag: "New",
    seed: "voltage-hoodie",
    hue: "violet",
  },
  {
    id: "ntn-005",
    name: "Obsidian Cap",
    category: "Headwear",
    price: 64,
    originalPrice: null,
    tag: null,
    seed: "obsidian-cap",
    hue: "coral",
  },
  {
    id: "ntn-006",
    name: "Phantom Sling",
    category: "Bags",
    price: 122,
    originalPrice: 150,
    tag: "-19%",
    seed: "phantom-sling",
    hue: "violet",
  },
];

const flashSaleData = {
  code: "DROP 014 / ITEM 01",
  name: "Eclipse Trainer",
  description:
    "Reflective cage upper over a dead-black midsole. Glows faint violet under UV — built for the walk home.",
  price: 249,
  originalPrice: 320,
  seed: "eclipse-trainer",
  stockLeft: 12,
  stockTotal: 40,
  endsInSeconds: 38 * 3600 + 24 * 60 + 9,
};

const reviewsData = [
  {
    id: 1,
    quote:
      "Cop'd the Static Bomber at 2am and it sold out nine minutes later. Fit is unreal, the glow detail is not a gimmick.",
    handle: "@low.frequency",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "First brand that actually photographs true-to-color in low light. The cyan stitching reads exactly like the site.",
    handle: "@midnight.archive",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "Drop alerts are merciless — thirty seconds late and the cargos were gone. Worth setting an actual alarm for.",
    handle: "@ghostlane",
    rating: 4,
  },
];

/* ------------------------------------------------------------------ *
 *  UTILITIES
 * ------------------------------------------------------------------ */

function useCountdown(totalSeconds) {
  const [remaining, setRemaining] = useState(totalSeconds);
  useEffect(() => {
    const id = setInterval(() => {
      setRemaining((r) => (r > 0 ? r - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, []);
  const h = Math.floor(remaining / 3600);
  const m = Math.floor((remaining % 3600) / 60);
  const s = remaining % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return { h: pad(h), m: pad(m), s: pad(s) };
}

function placeholderImg(seed, w = 700, h = 850) {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

const HUES = {
  violet: { core: "#A855F7", soft: "rgba(168,85,247,0.35)" },
  cyan: { core: "#22D3EE", soft: "rgba(34,211,238,0.35)" },
  coral: { core: "#FF4D6D", soft: "rgba(255,77,109,0.35)" },
};

/* ------------------------------------------------------------------ *
 *  PRELOADER — the signature moment: a neon sign catching power
 * ------------------------------------------------------------------ */

function Preloader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const letters = siteData.name.split("");

  useEffect(() => {
    const start = Date.now();
    const duration = 2200;
    const id = setInterval(() => {
      const pct = Math.min(100, ((Date.now() - start) / duration) * 100);
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(id);
        setTimeout(onDone, 420);
      }
    }, 16);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: "#08080C" }}
      exit={{
        clipPath: "inset(0 0 100% 0)",
        transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
      }}
    >
      <div className="relative flex items-center gap-1">
        {letters.map((ch, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0.3, 1, 1],
            }}
            transition={{
              delay: 0.15 * i,
              duration: 0.5,
              times: [0, 0.3, 0.45, 0.6, 1],
            }}
            style={{
              fontFamily: "'Unbounded', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2.2rem, 8vw, 4.5rem)",
              color: "#F4F4F6",
              textShadow:
                "0 0 8px rgba(168,85,247,0.9), 0 0 24px rgba(168,85,247,0.6), 0 0 48px rgba(168,85,247,0.35)",
              letterSpacing: "0.04em",
            }}
          >
            {ch}
          </motion.span>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: letters.length * 0.15 + 0.3, duration: 0.5 }}
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.7rem",
          letterSpacing: "0.35em",
          color: "#8C8C99",
          marginTop: "14px",
          textTransform: "uppercase",
        }}
      >
        {siteData.tagline}
      </motion.p>

      <div
        style={{
          width: "180px",
          height: "1px",
          background: "rgba(255,255,255,0.1)",
          marginTop: "34px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: `${progress}%`,
            background:
              "linear-gradient(90deg, #A855F7, #22D3EE)",
            boxShadow: "0 0 10px rgba(168,85,247,0.8)",
          }}
        />
      </div>
      <p
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.65rem",
          color: "#4B4B54",
          marginTop: "10px",
        }}
      >
        {Math.floor(progress)}%
      </p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ *
 *  CURSOR SPOTLIGHT — ambient glow that follows the pointer
 * ------------------------------------------------------------------ */

function CursorSpotlight() {
  const ref = useRef(null);
  useEffect(() => {
    const handle = (e) => {
      if (ref.current) {
        ref.current.style.transform = `translate(${e.clientX - 250}px, ${
          e.clientY - 250
        }px)`;
      }
    };
    window.addEventListener("pointermove", handle);
    return () => window.removeEventListener("pointermove", handle);
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "500px",
        height: "500px",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 1,
        background:
          "radial-gradient(circle, rgba(168,85,247,0.09) 0%, rgba(168,85,247,0) 70%)",
        mixBlendMode: "screen",
        willChange: "transform",
      }}
    />
  );
}

/* ------------------------------------------------------------------ *
 *  NAVBAR
 * ------------------------------------------------------------------ */

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-40 w-full"
      style={{
        background: "rgba(8,8,12,0.7)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <span
          style={{
            fontFamily: "'Unbounded', sans-serif",
            fontWeight: 700,
            fontSize: "1.1rem",
            color: "#F4F4F6",
            letterSpacing: "0.02em",
          }}
        >
          {siteData.name}
        </span>

        <nav className="hidden md:flex items-center gap-8">
          {navData.map((item) => (
            <a
              key={item.label}
              href={item.href}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.82rem",
                color: "#B8B8C2",
                letterSpacing: "0.02em",
              }}
              className="hover:text-white transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <Search size={18} color="#B8B8C2" className="cursor-pointer hover:opacity-70 hidden sm:block" />
          <div className="relative cursor-pointer hover:opacity-70">
            <Heart size={18} color="#B8B8C2" />
          </div>
          <div className="relative cursor-pointer hover:opacity-70">
            <ShoppingBag size={18} color="#B8B8C2" />
            <span
              style={{
                position: "absolute",
                top: "-8px",
                right: "-9px",
                background: "#A855F7",
                color: "#08080C",
                fontSize: "0.6rem",
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                borderRadius: "999px",
                width: "16px",
                height: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              2
            </span>
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X size={20} color="#F4F4F6" />
            ) : (
              <Menu size={20} color="#F4F4F6" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {navData.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  style={{ color: "#B8B8C2", fontSize: "0.9rem" }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ------------------------------------------------------------------ *
 *  HERO
 * ------------------------------------------------------------------ */

function Hero() {
  const stat = useCountdown(6432);
  return (
    <section
      className="relative overflow-hidden px-6 pt-20 pb-28 md:pt-28 md:pb-36"
      style={{ background: "#08080C" }}
    >
      {/* ambient glow orbs */}
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "-10%",
          right: "5%",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(168,85,247,0.22) 0%, rgba(168,85,247,0) 70%)",
          filter: "blur(10px)",
        }}
      />
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          bottom: "-15%",
          left: "0%",
          width: "380px",
          height: "380px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(34,211,238,0.16) 0%, rgba(34,211,238,0) 70%)",
          filter: "blur(10px)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.72rem",
            letterSpacing: "0.25em",
            color: "#A855F7",
          }}
        >
          {heroData.eyebrow}
        </motion.p>

        <h1
          style={{
            fontFamily: "'Unbounded', sans-serif",
            fontWeight: 700,
            color: "#F4F4F6",
            fontSize: "clamp(2.6rem, 8vw, 5.6rem)",
            lineHeight: 1.02,
            marginTop: "18px",
            letterSpacing: "-0.01em",
          }}
        >
          {heroData.titleLines.map((line, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.12, duration: 0.6, ease: "easeOut" }}
              style={{ display: "block" }}
            >
              {line}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            color: "#9C9CA8",
            fontSize: "1rem",
            maxWidth: "460px",
            marginTop: "24px",
            lineHeight: 1.6,
          }}
        >
          {heroData.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.5 }}
          className="flex flex-wrap items-center gap-4 mt-10"
        >
          <MagneticButton>
            {heroData.ctaPrimary} <ArrowRight size={16} />
          </MagneticButton>
          <button
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.85rem",
              color: "#E5E5EA",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
            className="hover:opacity-70 transition-opacity"
          >
            {heroData.ctaSecondary} <ArrowUpRight size={14} />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-16 inline-flex items-center gap-4 rounded-xl px-5 py-4"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(10px)",
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "1.4rem",
              color: "#22D3EE",
              textShadow: "0 0 14px rgba(34,211,238,0.5)",
            }}
          >
            {stat.h}:{stat.m}:{stat.s}
          </span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.75rem",
              color: "#8C8C99",
            }}
          >
            {heroData.stat.label}
          </span>
        </motion.div>
      </div>
    </section>
  );
}

function MagneticButton({ children }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return (
    <motion.button
      ref={ref}
      onMouseMove={(e) => {
        const rect = ref.current.getBoundingClientRect();
        setPos({
          x: (e.clientX - rect.left - rect.width / 2) * 0.3,
          y: (e.clientY - rect.top - rect.height / 2) * 0.3,
        });
      }}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12 }}
      style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 600,
        fontSize: "0.85rem",
        color: "#08080C",
        background: "linear-gradient(90deg, #A855F7, #C084FC)",
        padding: "14px 26px",
        borderRadius: "999px",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        boxShadow: "0 0 24px rgba(168,85,247,0.45)",
      }}
    >
      {children}
    </motion.button>
  );
}

/* ------------------------------------------------------------------ *
 *  CATEGORY MARQUEE
 * ------------------------------------------------------------------ */

function CategoryMarquee() {
  const loop = [...categoriesData, ...categoriesData];
  return (
    <div
      className="relative py-6 overflow-hidden"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "#0B0B10",
      }}
      id="drops"
    >
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {loop.map((cat, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'Unbounded', sans-serif",
              fontSize: "0.95rem",
              color: i % categoriesData.length === 0 ? "#A855F7" : "#5A5A66",
              letterSpacing: "0.03em",
            }}
          >
            {cat} <span style={{ margin: "0 12px", color: "#33333C" }}>/</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 *  PRODUCT CARD + GRID
 * ------------------------------------------------------------------ */

function ProductCard({ product, index }) {
  const [liked, setLiked] = useState(false);
  const hue = HUES[product.hue];
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.08, duration: 0.55, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      className="relative rounded-2xl overflow-hidden group"
      style={{
        background: "#121218",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 0 1px ${hue.core}55, 0 0 30px ${hue.soft}`,
          borderRadius: "1rem",
        }}
      />
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={placeholderImg(product.seed)}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          style={{
            filter: `grayscale(0.35) contrast(1.1) saturate(1.3) hue-rotate(${
              product.hue === "cyan" ? "10deg" : product.hue === "coral" ? "-20deg" : "0deg"
            })`,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(8,8,12,0) 50%, rgba(8,8,12,0.75) 100%)",
          }}
        />
        {product.tag && (
          <span
            style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              padding: "4px 9px",
              borderRadius: "999px",
              background: "rgba(8,8,12,0.7)",
              color: hue.core,
              border: `1px solid ${hue.core}55`,
              backdropFilter: "blur(6px)",
            }}
          >
            {product.tag}
          </span>
        )}
        <button
          onClick={() => setLiked(!liked)}
          aria-label="Toggle wishlist"
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: "rgba(8,8,12,0.6)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <motion.span animate={{ scale: liked ? [1, 1.3, 1] : 1 }} transition={{ duration: 0.3 }}>
            <Heart
              size={15}
              color={liked ? "#FF4D6D" : "#E5E5EA"}
              fill={liked ? "#FF4D6D" : "none"}
            />
          </motion.span>
        </button>
      </div>

      <div className="p-4">
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.68rem",
            color: "#6B6B78",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          {product.category}
        </p>
        <h3
          style={{
            fontFamily: "'Unbounded', sans-serif",
            fontSize: "0.92rem",
            color: "#F4F4F6",
            marginTop: "4px",
          }}
        >
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mt-2">
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.85rem",
              color: "#F4F4F6",
            }}
          >
            ${product.price}
          </span>
          {product.originalPrice && (
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.75rem",
                color: "#5A5A66",
                textDecoration: "line-through",
              }}
            >
              ${product.originalPrice}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function TrendingProducts() {
  return (
    <section className="px-6 py-24" style={{ background: "#08080C" }}>
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.7rem",
                letterSpacing: "0.25em",
                color: "#22D3EE",
              }}
            >
              CURRENTLY TRENDING
            </p>
            <h2
              style={{
                fontFamily: "'Unbounded', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
                color: "#F4F4F6",
                marginTop: "8px",
              }}
            >
              Worn tonight, gone by morning
            </h2>
          </div>
          <a
            href="#drops"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.82rem",
              color: "#B8B8C2",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
            className="hover:text-white transition-colors"
          >
            View all <ChevronRight size={14} />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {productsData.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 *  FLASH SALE
 * ------------------------------------------------------------------ */

function FlashSale() {
  const t = useCountdown(flashSaleData.endsInSeconds);
  const stockPct = (flashSaleData.stockLeft / flashSaleData.stockTotal) * 100;

  return (
    <section className="px-6 py-24" style={{ background: "#0B0B10" }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-6xl rounded-3xl overflow-hidden relative grid md:grid-cols-2"
        style={{
          background: "#121218",
          border: "1px solid rgba(255,77,109,0.25)",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,77,109,0.25) 0%, rgba(255,77,109,0) 70%)",
          }}
        />
        <div className="relative aspect-[4/3] md:aspect-auto">
          <img
            src={placeholderImg(flashSaleData.seed, 800, 900)}
            alt={flashSaleData.name}
            loading="lazy"
            className="w-full h-full object-cover"
            style={{ filter: "grayscale(0.3) contrast(1.15) saturate(1.2)" }}
          />
        </div>

        <div className="relative p-8 md:p-12 flex flex-col justify-center">
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.68rem",
              letterSpacing: "0.2em",
              color: "#FF4D6D",
            }}
          >
            {flashSaleData.code} — FLASH SALE
          </p>
          <h3
            style={{
              fontFamily: "'Unbounded', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              color: "#F4F4F6",
              marginTop: "10px",
            }}
          >
            {flashSaleData.name}
          </h3>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.9rem",
              color: "#9C9CA8",
              marginTop: "12px",
              lineHeight: 1.6,
              maxWidth: "420px",
            }}
          >
            {flashSaleData.description}
          </p>

          <div className="flex items-baseline gap-3 mt-6">
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "1.6rem",
                color: "#F4F4F6",
              }}
            >
              ${flashSaleData.price}
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "1rem",
                color: "#5A5A66",
                textDecoration: "line-through",
              }}
            >
              ${flashSaleData.originalPrice}
            </span>
          </div>

          <div className="flex gap-3 mt-6">
            {[
              { v: t.h, l: "HRS" },
              { v: t.m, l: "MIN" },
              { v: t.s, l: "SEC" },
            ].map((b) => (
              <div
                key={b.l}
                className="flex flex-col items-center justify-center rounded-lg"
                style={{
                  width: "56px",
                  height: "56px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,77,109,0.3)",
                }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "1.05rem",
                    color: "#FF4D6D",
                  }}
                >
                  {b.v}
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.55rem",
                    color: "#6B6B78",
                    letterSpacing: "0.1em",
                  }}
                >
                  {b.l}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-7">
            <div className="flex justify-between mb-2">
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.75rem",
                  color: "#8C8C99",
                }}
              >
                {flashSaleData.stockLeft} left of {flashSaleData.stockTotal}
              </span>
            </div>
            <div
              style={{
                height: "4px",
                width: "100%",
                background: "rgba(255,255,255,0.07)",
                borderRadius: "999px",
                overflow: "hidden",
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${stockPct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                style={{
                  height: "100%",
                  background: "linear-gradient(90deg, #FF4D6D, #A855F7)",
                }}
              />
            </div>
          </div>

          <MagneticButton>
            Claim Before It's Gone <ArrowRight size={16} />
          </MagneticButton>
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 *  TESTIMONIALS
 * ------------------------------------------------------------------ */

function Testimonials() {
  return (
    <section className="px-6 py-24" style={{ background: "#08080C" }}>
      <div className="mx-auto max-w-6xl">
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.7rem",
            letterSpacing: "0.25em",
            color: "#A855F7",
            textAlign: "center",
          }}
        >
          FROM THE ARCHIVE
        </p>
        <h2
          style={{
            fontFamily: "'Unbounded', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
            color: "#F4F4F6",
            marginTop: "8px",
            textAlign: "center",
          }}
        >
          Verified drop members
        </h2>

        <div className="grid md:grid-cols-3 gap-5 mt-12">
          {reviewsData.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="rounded-2xl p-6"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    size={13}
                    color={idx < r.rating ? "#22D3EE" : "#2A2A32"}
                    fill={idx < r.rating ? "#22D3EE" : "none"}
                  />
                ))}
              </div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.88rem",
                  color: "#C7C7D1",
                  lineHeight: 1.65,
                }}
              >
                {r.quote}
              </p>
              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.72rem",
                  color: "#6B6B78",
                  marginTop: "16px",
                }}
              >
                {r.handle}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 *  NEWSLETTER
 * ------------------------------------------------------------------ */

function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  return (
    <section className="px-6 py-24" style={{ background: "#0B0B10" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-2xl text-center"
      >
        <h2
          style={{
            fontFamily: "'Unbounded', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.6rem, 4vw, 2.3rem)",
            color: "#F4F4F6",
          }}
        >
          Get drop alerts before they sell out
        </h2>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.88rem",
            color: "#8C8C99",
            marginTop: "10px",
          }}
        >
          One email, right when the drop opens. No noise between.
        </p>

        {submitted ? (
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.85rem",
              color: "#22D3EE",
              marginTop: "24px",
            }}
          >
            You're on the list.
          </p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email.includes("@")) setSubmitted(true);
            }}
            className="flex flex-col sm:flex-row gap-3 justify-center mt-8"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.85rem",
                color: "#F4F4F6",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "999px",
                padding: "13px 20px",
                minWidth: "260px",
                outline: "none",
              }}
              className="focus:border-violet-400"
            />
            <button
              type="submit"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: "0.85rem",
                color: "#08080C",
                background: "linear-gradient(90deg, #A855F7, #C084FC)",
                borderRadius: "999px",
                padding: "13px 26px",
                boxShadow: "0 0 20px rgba(168,85,247,0.4)",
              }}
            >
              Notify Me
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 *  FOOTER
 * ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer
      className="px-6 pt-16 pb-8"
      style={{ background: "#08080C", borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between gap-10">
        <div className="max-w-xs">
          <span
            style={{
              fontFamily: "'Unbounded', sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
              color: "#F4F4F6",
            }}
          >
            {siteData.name}
          </span>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.82rem",
              color: "#6B6B78",
              marginTop: "10px",
              lineHeight: 1.6,
            }}
          >
            Small-batch drops, released after dark. Once it's gone, it's gone.
          </p>
          <div className="flex gap-4 mt-6">
            <Instagram size={16} color="#6B6B78" className="cursor-pointer hover:text-white" />
            <Twitter size={16} color="#6B6B78" className="cursor-pointer hover:text-white" />
            <Youtube size={16} color="#6B6B78" className="cursor-pointer hover:text-white" />
          </div>
        </div>

        <div className="flex gap-16 flex-wrap">
          <div>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.68rem",
                color: "#5A5A66",
                letterSpacing: "0.1em",
                marginBottom: "14px",
              }}
            >
              SHOP
            </p>
            {["New Drops", "Footwear", "Outerwear", "Accessories"].map((l) => (
              <p
                key={l}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.82rem",
                  color: "#9C9CA8",
                  marginBottom: "9px",
                }}
              >
                {l}
              </p>
            ))}
          </div>
          <div>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.68rem",
                color: "#5A5A66",
                letterSpacing: "0.1em",
                marginBottom: "14px",
              }}
            >
              SUPPORT
            </p>
            {["Shipping", "Returns", "Size Guide", "Contact"].map((l) => (
              <p
                key={l}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.82rem",
                  color: "#9C9CA8",
                  marginBottom: "9px",
                }}
              >
                {l}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div
        className="mx-auto max-w-6xl mt-12 pt-6 flex flex-col sm:flex-row justify-between gap-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", color: "#4B4B54" }}>
          © 2026 {siteData.name}. All rights reserved.
        </p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", color: "#4B4B54" }}>
          Privacy · Terms
        </p>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ *
 *  ROOT APP
 * ------------------------------------------------------------------ */

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "#08080C" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@500;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        ::selection { background: #A855F7; color: #08080C; }
        input:focus { border-color: #A855F7 !important; box-shadow: 0 0 0 2px rgba(168,85,247,0.25); }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      <AnimatePresence>
        {loading && <Preloader key="preloader" onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <CursorSpotlight />
          <Navbar />
          <Hero />
          <CategoryMarquee />
          <TrendingProducts />
          <FlashSale />
          <Testimonials />
          <Newsletter />
          <Footer />
        </>
      )}
    </div>
  );
}
