import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Menu,
  X,
  Phone,
  Mail,
  Linkedin,
  Github,
  Camera,
  ExternalLink,
  ArrowUpRight,
  MapPin,
  Sparkles,
  Boxes,
  Code2,
  Layers,
} from "lucide-react";

/* =========================================================================
   DESIGN TOKENS
   bg-1        #0B0E17   base background
   bg-2        #060810   deeper gradient stop
   glass       rgba(255,255,255,0.045)   card surface
   glass-brd   rgba(255,255,255,0.09)    card border
   text-1      #F3F4F8   primary text
   text-2      #9AA1B2   secondary text
   accent      #7C5CFF   signature violet (buttons, links, glow)
   accent-2    #4FD1C5   secondary cyan glow (used sparingly)
   Fonts: Space Grotesk (display/nav/buttons), Inter (body), JetBrains Mono (eyebrow labels)
   Signature element: cursor-tracking "spotlight" glass cards + glowing photo-upload ring
   ========================================================================= */

const FONT_ID = "portfolio-fonts-v2";
function useGoogleFonts() {
  useEffect(() => {
    if (document.getElementById(FONT_ID)) return;
    const link = document.createElement("link");
    link.id = FONT_ID;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap";
    document.head.appendChild(link);
  }, []);
}

/* ---------------- Scroll-reveal hook ---------------- */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

/* ---------------- Spotlight hover wrapper ---------------- */
function Spotlight({ className = "", style = {}, children, ...rest }) {
  const ref = useRef(null);
  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, []);
  return (
    <div ref={ref} onMouseMove={onMove} className={`spotlight ${className}`} style={style} {...rest}>
      {children}
    </div>
  );
}

/* ---------------- Placeholder content (edit freely) ---------------- */

const NAME = "Alex Chen";
const TITLE = "Full-Stack Software Engineer";
const TAGLINE =
  "I design and build fast, reliable web applications — from backend systems to the pixels people touch.";
const LOCATION = "Bengaluru, India";

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const SKILL_GROUPS = [
  {
    category: "Frontend",
    items: [
      { name: "React", level: 92 },
      { name: "TypeScript", level: 88 },
      { name: "Tailwind CSS", level: 85 },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", level: 90 },
      { name: "Python", level: 80 },
      { name: "PostgreSQL", level: 82 },
    ],
  },
  {
    category: "Cloud & Tools",
    items: [
      { name: "AWS", level: 78 },
      { name: "Docker", level: 84 },
      { name: "CI/CD", level: 80 },
    ],
  },
];

const PROJECTS = [
  {
    name: "Reactive Cache",
    description:
      "A dependency-free reactive caching layer for React with automatic invalidation and SWR-style refetching.",
    tags: ["TypeScript", "React"],
    icon: Boxes,
    gradient: "linear-gradient(135deg, #7C5CFF 0%, #4FD1C5 100%)",
    url: "#",
  },
  {
    name: "Pixel Forge",
    description:
      "A CLI tool that batch-generates optimized sprite sheets for game dev, with a live preview server.",
    tags: ["Python", "CLI"],
    icon: Code2,
    gradient: "linear-gradient(135deg, #FFB020 0%, #7C5CFF 100%)",
    url: "#",
  },
  {
    name: "Ledger Lite",
    description:
      "A minimal double-entry bookkeeping engine built to explore distributed transaction handling in Go.",
    tags: ["Go", "PostgreSQL"],
    icon: Layers,
    gradient: "linear-gradient(135deg, #4FD1C5 0%, #2C6BFF 100%)",
    url: "#",
  },
  {
    name: "Nimbus Dashboard",
    description:
      "A real-time analytics dashboard with live data streaming, custom charting, and role-based access.",
    tags: ["Next.js", "GraphQL"],
    icon: Sparkles,
    gradient: "linear-gradient(135deg, #FF6B9D 0%, #7C5CFF 100%)",
    url: "#",
  },
];

const CONTACT = {
  phone: "+91 98765 43210",
  email: "alex.chen@example.com",
  linkedin: { label: "linkedin.com/in/alexchen", url: "#" },
  github: { label: "github.com/alexchen", url: "#" },
};

/* ---------------- Navbar ---------------- */

function Navbar({ active }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(11,14,23,0.72)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid var(--glass-brd)" : "1px solid transparent",
      }}
    >
      <nav className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <a
          href="#top"
          className="font-semibold tracking-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--text-1)", fontSize: "1.05rem" }}
        >
          {NAME}
        </a>

        <div className="hidden sm:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="nav-link px-4 py-2 rounded-full text-sm transition-colors"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: active === l.id ? "var(--text-1)" : "var(--text-2)",
                background: active === l.id ? "var(--glass)" : "transparent",
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-2 px-4 py-2 rounded-full text-sm font-medium transition-transform hover:-translate-y-0.5"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
              color: "#0B0E17",
            }}
          >
            Let's talk
          </a>
        </div>

        <button
          className="sm:hidden p-2 rounded-lg"
          style={{ color: "var(--text-1)" }}
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div
          className="sm:hidden px-5 pb-4 flex flex-col gap-1"
          style={{ background: "rgba(11,14,23,0.95)", backdropFilter: "blur(16px)" }}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => setOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--text-1)" }}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

/* ---------------- Hero (with photo upload) ---------------- */

function PhotoUpload() {
  const [imgSrc, setImgSrc] = useState(null);
  const inputRef = useRef(null);
  const objectUrlRef = useRef(null);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;
    setImgSrc(url);
  }

  return (
    <div className="relative w-52 h-52 sm:w-64 sm:h-64 mx-auto">
      <div className="absolute inset-0 rounded-full glow-ring" />
      <button
        onClick={() => inputRef.current?.click()}
        className="absolute inset-3 rounded-full overflow-hidden group cursor-pointer"
        style={{ border: "1px solid var(--glass-brd)", background: "var(--glass)" }}
        aria-label="Upload profile photo"
      >
        {imgSrc ? (
          <img src={imgSrc} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ color: "var(--text-2)" }}>
            <Camera size={34} />
          </div>
        )}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ background: "rgba(6,8,16,0.55)" }}
        >
          <span
            className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full"
            style={{ background: "var(--accent)", color: "#0B0E17", fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <Camera size={13} /> {imgSrc ? "Change photo" : "Upload photo"}
          </span>
        </div>
      </button>
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 sm:pt-40 pb-20 sm:pb-28">
      <div className="blob blob-a" />
      <div className="blob blob-b" />
      <div className="max-w-6xl mx-auto px-5 sm:px-8 relative grid sm:grid-cols-5 gap-12 items-center">
        <div className="sm:col-span-3 text-center sm:text-left order-2 sm:order-1">
          <p
            className="mb-4 inline-flex items-center gap-2 text-xs tracking-widest uppercase"
            style={{ color: "var(--accent-2)", fontFamily: "'JetBrains Mono', monospace" }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#3DDC84" }} />
            Available for work
          </p>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.08] mb-5"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--text-1)" }}
          >
            {NAME}
            <br />
            <span className="grad-text">{TITLE}</span>
          </h1>
          <p
            className="text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto sm:mx-0"
            style={{ color: "var(--text-2)", fontFamily: "'Inter', sans-serif" }}
          >
            {TAGLINE}
          </p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-3 mb-6">
            <a
              href="#projects"
              className="px-5 py-2.5 rounded-full text-sm font-medium transition-transform hover:-translate-y-0.5"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
                color: "#0B0E17",
              }}
            >
              View my work
            </a>
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-full text-sm font-medium transition-colors hover:bg-white/5"
              style={{ fontFamily: "'Space Grotesk', sans-serif", border: "1px solid var(--glass-brd)", color: "var(--text-1)" }}
            >
              Get in touch
            </a>
          </div>
          <p
            className="inline-flex items-center gap-1.5 text-sm justify-center sm:justify-start"
            style={{ color: "var(--text-2)", fontFamily: "'Inter', sans-serif" }}
          >
            <MapPin size={14} /> {LOCATION}
          </p>
        </div>
        <div className="sm:col-span-2 order-1 sm:order-2">
          <PhotoUpload />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Section heading ---------------- */

function SectionHeading({ eyebrow, title, subtitle }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`reveal ${visible ? "reveal-visible" : ""} text-center max-w-xl mx-auto mb-14`}>
      <p
        className="text-xs tracking-widest uppercase mb-3"
        style={{ color: "var(--accent-2)", fontFamily: "'JetBrains Mono', monospace" }}
      >
        {eyebrow}
      </p>
      <h2
        className="text-3xl sm:text-4xl font-semibold mb-3"
        style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--text-1)" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p style={{ color: "var(--text-2)", fontFamily: "'Inter', sans-serif" }} className="leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ---------------- About ---------------- */

function About() {
  const [ref, visible] = useReveal();
  const highlights = ["Clean architecture", "Performance-minded", "Team-first collaborator", "Detail obsessed"];
  return (
    <section id="about" className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-28 scroll-mt-20">
      <SectionHeading eyebrow="About me" title="A little about my work" />
      <div ref={ref} className={`reveal ${visible ? "reveal-visible" : ""} max-w-2xl mx-auto text-center`}>
        <p className="leading-relaxed mb-6" style={{ color: "var(--text-2)", fontFamily: "'Inter', sans-serif" }}>
          I'm a software engineer who enjoys turning ambiguous problems into
          systems that are simple to reason about. Over the last five years
          I've worked across backend platforms, real-time systems, and
          developer tooling — usually gravitating toward the parts of a
          product that need to be both fast and quietly reliable.
        </p>
        <p className="leading-relaxed mb-8" style={{ color: "var(--text-2)", fontFamily: "'Inter', sans-serif" }}>
          Outside of production code, I contribute to small open-source
          tools and enjoy mentoring engineers earlier in their careers.
        </p>
        <div className="flex flex-wrap justify-center gap-2.5">
          {highlights.map((h) => (
            <span
              key={h}
              className="text-sm px-4 py-1.5 rounded-full"
              style={{ background: "var(--glass)", border: "1px solid var(--glass-brd)", color: "var(--text-1)", fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {h}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Skills ---------------- */

function SkillBar({ name, level, visible, delay }) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between mb-1.5">
        <span className="text-sm" style={{ color: "var(--text-1)", fontFamily: "'Inter', sans-serif" }}>{name}</span>
        <span className="text-xs" style={{ color: "var(--text-2)", fontFamily: "'JetBrains Mono', monospace" }}>{level}%</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
        <div
          className="h-full rounded-full skill-fill"
          style={{
            width: visible ? `${level}%` : "0%",
            background: "linear-gradient(90deg, var(--accent), var(--accent-2))",
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

function Skills() {
  return (
    <section id="skills" className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-28 scroll-mt-20">
      <SectionHeading eyebrow="What I work with" title="Skills & tools" />
      <div className="grid sm:grid-cols-3 gap-5">
        {SKILL_GROUPS.map((group) => {
          const [ref, visible] = useReveal();
          return (
            <div
              key={group.category}
              ref={ref}
              className={`reveal ${visible ? "reveal-visible" : ""} rounded-2xl p-6`}
              style={{ background: "var(--glass)", border: "1px solid var(--glass-brd)" }}
            >
              <h3
                className="text-sm tracking-wide uppercase mb-5"
                style={{ color: "var(--accent-2)", fontFamily: "'JetBrains Mono', monospace" }}
              >
                {group.category}
              </h3>
              {group.items.map((item, i) => (
                <SkillBar key={item.name} name={item.name} level={item.level} visible={visible} delay={i * 120} />
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ---------------- Projects ---------------- */

function ProjectCard({ project }) {
  const Icon = project.icon;
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <Spotlight
        className="rounded-2xl overflow-hidden h-full flex flex-col transition-transform duration-300 hover:-translate-y-1.5"
        style={{ background: "var(--glass)", border: "1px solid var(--glass-brd)" }}
      >
        <div
          className="h-40 flex items-center justify-center relative overflow-hidden"
          style={{ background: project.gradient }}
        >
          <Icon size={44} color="rgba(255,255,255,0.92)" strokeWidth={1.5} />
          <div
            className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
            style={{ background: "rgba(6,8,16,0.45)" }}
          >
            <span
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full"
              style={{ background: "rgba(255,255,255,0.95)", color: "#0B0E17", fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Visit project <ExternalLink size={12} />
            </span>
          </div>
        </div>
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--text-1)" }} className="font-semibold">
              {project.name}
            </h3>
            <ArrowUpRight size={16} style={{ color: "var(--text-2)" }} className="shrink-0 mt-0.5" />
          </div>
          <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "var(--text-2)", fontFamily: "'Inter', sans-serif" }}>
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <span
                key={t}
                className="text-[11px] px-2.5 py-1 rounded-full"
                style={{ color: "var(--accent-2)", background: "rgba(79,209,197,0.08)", fontFamily: "'JetBrains Mono', monospace" }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </Spotlight>
    </a>
  );
}

function Projects() {
  return (
    <section id="projects" className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-28 scroll-mt-20">
      <SectionHeading
        eyebrow="Selected work"
        title="Projects"
        subtitle="A few things I've built. Thumbnails are placeholders — swap them with real screenshots any time."
      />
      <div className="grid sm:grid-cols-2 gap-6">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.name} project={p} />
        ))}
      </div>
    </section>
  );
}

/* ---------------- Contact ---------------- */

function ContactCard({ icon: Icon, label, value, href }) {
  return (
    <a href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
      <Spotlight
        className="rounded-2xl p-5 flex items-center gap-4 h-full transition-transform duration-300 hover:-translate-y-1"
        style={{ background: "var(--glass)", border: "1px solid var(--glass-brd)" }}
      >
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-2))" }}
        >
          <Icon size={19} color="#0B0E17" />
        </div>
        <div className="min-w-0">
          <p className="text-xs mb-0.5" style={{ color: "var(--text-2)", fontFamily: "'JetBrains Mono', monospace" }}>
            {label}
          </p>
          <p className="text-sm truncate" style={{ color: "var(--text-1)", fontFamily: "'Inter', sans-serif" }}>
            {value}
          </p>
        </div>
      </Spotlight>
    </a>
  );
}

function Contact() {
  return (
    <section id="contact" className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-28 scroll-mt-20">
      <SectionHeading eyebrow="Get in touch" title="Let's build something" subtitle="Reach out through whichever channel works best for you." />
      <div className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
        <ContactCard icon={Phone} label="Phone" value={CONTACT.phone} href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} />
        <ContactCard icon={Mail} label="Email" value={CONTACT.email} href={`mailto:${CONTACT.email}`} />
        <ContactCard icon={Linkedin} label="LinkedIn" value={CONTACT.linkedin.label} href={CONTACT.linkedin.url} />
        <ContactCard icon={Github} label="GitHub" value={CONTACT.github.label} href={CONTACT.github.url} />
      </div>
    </section>
  );
}

/* ---------------- App ---------------- */

export default function Portfolio() {
  useGoogleFonts();
  const [active, setActive] = useState("about");

  useEffect(() => {
    const ids = ["about", "skills", "projects", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      style={{
        "--bg-1": "#0B0E17",
        "--bg-2": "#060810",
        "--glass": "rgba(255,255,255,0.045)",
        "--glass-brd": "rgba(255,255,255,0.09)",
        "--text-1": "#F3F4F8",
        "--text-2": "#9AA1B2",
        "--accent": "#7C5CFF",
        "--accent-2": "#4FD1C5",
        background: "linear-gradient(180deg, var(--bg-1), var(--bg-2))",
        minHeight: "100vh",
      }}
    >
      <style>{`
        html { scroll-behavior: smooth; }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          * { animation: none !important; transition: none !important; }
        }

        .grad-text {
          background: linear-gradient(135deg, var(--accent), var(--accent-2));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.35;
          pointer-events: none;
          animation: float 14s ease-in-out infinite;
        }
        .blob-a {
          width: 420px; height: 420px;
          background: var(--accent);
          top: -120px; right: -80px;
        }
        .blob-b {
          width: 380px; height: 380px;
          background: var(--accent-2);
          bottom: -140px; left: -100px;
          animation-delay: -7s;
        }
        @keyframes float {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(20px,-25px) scale(1.05); }
        }

        .glow-ring {
          background: conic-gradient(from 0deg, var(--accent), var(--accent-2), var(--accent));
          animation: spin 8s linear infinite;
          filter: blur(2px);
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .skill-fill {
          width: 0%;
          transition: width 1s cubic-bezier(0.4,0,0.2,1);
        }

        .nav-link:hover { color: var(--text-1) !important; }

        .spotlight { position: relative; isolation: isolate; }
        .spotlight::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: radial-gradient(500px circle at var(--mx,50%) var(--my,50%), rgba(124,92,255,0.14), transparent 60%);
          opacity: 0;
          transition: opacity 0.35s ease;
          pointer-events: none;
          z-index: 0;
        }
        .spotlight:hover::before { opacity: 1; }
        .spotlight > * { position: relative; z-index: 1; }

        a:focus-visible, button:focus-visible, input:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }
      `}</style>

      <Navbar active={active} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />

      <footer
        className="max-w-6xl mx-auto px-5 sm:px-8 py-8 text-center text-sm"
        style={{ color: "var(--text-2)", fontFamily: "'Inter', sans-serif", borderTop: "1px solid var(--glass-brd)" }}
      >
        © {new Date().getFullYear()} {NAME}. Built with React.
      </footer>
    </div>
  );
}
