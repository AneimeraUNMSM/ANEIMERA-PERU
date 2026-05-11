/* C system — design tokens + primitives shared across all pages.
 * Refined corporate-editorial style: soft borders, subtle shadows, oklch accents,
 * Inter typography, generous whitespace, B2B partner-friendly.
 */

const C = {
  ink: "#0a0a0a",
  ink2: "#2a2a28",
  bg: "#ffffff",
  tint: "#f7f7f5",
  tintWarm: "#faf8f3",
  border: "rgba(10,10,10,0.08)",
  borderStrong: "rgba(10,10,10,0.14)",
  muted: "#5b5b58",
  mutedLight: "#a3a39e",
  accent: "var(--c-accent, oklch(0.55 0.16 26))",
  accentSoft: "var(--c-accent-soft, oklch(0.95 0.04 26))",
  accentInk: "var(--c-accent-ink, oklch(0.45 0.18 26))",
  radius: 12,
  radiusLg: 16,
  radiusXl: 24,
  shadow: "0 1px 2px rgba(10,10,10,0.04), 0 1px 3px rgba(10,10,10,0.06)",
  shadowMd: "0 1px 3px rgba(10,10,10,0.04), 0 12px 36px -12px rgba(10,10,10,0.10)",
  font: "'Inter', system-ui, -apple-system, sans-serif",
  fontMono: "'JetBrains Mono', ui-monospace, monospace",
};
window.C = C;

function NavBar({ active, onNavigate }) {
  const c = window.ANEIMERA_CONTENT;
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "18px 56px", borderBottom: `1px solid ${C.border}`,
      position: "sticky", top: 0, background: "rgba(255,255,255,0.92)",
      backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", zIndex: 100,
    }}>
      <a href="#" onClick={(e)=>{e.preventDefault(); onNavigate?.("home");}} style={{
        display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: C.ink,
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8, background: C.ink, color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 700, fontSize: 14, letterSpacing: "-0.02em",
        }}>A</div>
        <div style={{ lineHeight: 1.1 }}>
          <Edit path="brand.name" as="div" style={{ fontWeight: 600, fontSize: 14 }}>{c.brand.name}</Edit>
          <Edit path="brand.suffix" as="div" style={{ fontSize: 11, color: C.muted }}>{c.brand.suffix}</Edit>
        </div>
      </a>
      <div style={{ display: "flex", gap: 28, fontSize: 14 }}>
        {c.nav.map(n => (
          <a key={n.id} href={`#${n.id}`} onClick={(e)=>{e.preventDefault(); onNavigate?.(n.id);}} style={{
            color: active === n.id ? C.ink : "#3a3a38",
            textDecoration: "none", paddingBottom: 4,
            borderBottom: active === n.id ? `2px solid ${C.accent}` : "2px solid transparent",
            fontWeight: active === n.id ? 500 : 400,
            transition: "all .2s",
          }}>{n.label}</a>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <a href="#" style={{ fontSize: 14, color: "#3a3a38", textDecoration: "none", padding: "8px 14px" }}>Ingresar</a>
        <a href="#aliarse" onClick={(e)=>{e.preventDefault(); onNavigate?.("alianzas");}} style={{
          background: C.ink, color: "#fff", padding: "10px 18px", borderRadius: 8, textDecoration: "none",
          fontSize: 14, fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 8,
          boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
        }}>Aliarse <span style={{ color: C.accent }}>→</span></a>
      </div>
    </div>
  );
}

function CButton({ variant="primary", as: Tag="button", children, style, ...rest }) {
  const styles = {
    primary: { background: C.ink, color: "#fff", boxShadow: C.shadow },
    secondary: { background: "transparent", color: C.ink, border: `1px solid ${C.borderStrong}` },
    ghost: { background: "transparent", color: C.ink },
    accent: { background: C.accent, color: "#fff" },
  }[variant];
  return (
    <Tag {...rest} style={{
      padding: "12px 20px", borderRadius: 10, fontSize: 14, fontWeight: 500,
      display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none",
      border: "none", cursor: "pointer", transition: "transform .12s, box-shadow .12s, background .12s",
      ...styles, ...style,
    }}
    onMouseEnter={(e)=>{ e.currentTarget.style.transform = "translateY(-1px)"; }}
    onMouseLeave={(e)=>{ e.currentTarget.style.transform = "translateY(0)"; }}
    >{children}</Tag>
  );
}

function Pill({ children, color = "muted" }) {
  const palette = {
    muted: { bg: C.tint, fg: C.muted },
    accent: { bg: C.accentSoft, fg: C.accentInk },
    ink: { bg: C.ink, fg: "#fff" },
  }[color];
  return <span style={{
    display: "inline-flex", alignItems: "center", gap: 6,
    padding: "4px 10px", borderRadius: 999, fontSize: 11, letterSpacing: "0.06em",
    background: palette.bg, color: palette.fg, fontWeight: 500,
  }}>{children}</span>;
}

function Card({ children, style, hover = true, ...rest }) {
  const [h, setH] = React.useState(false);
  return (
    <div {...rest} style={{
      background: "#fff", border: `1px solid ${C.border}`, borderRadius: C.radiusLg,
      transition: "transform .15s, box-shadow .15s, border-color .15s",
      transform: hover && h ? "translateY(-2px)" : "translateY(0)",
      boxShadow: hover && h ? C.shadowMd : C.shadow,
      borderColor: hover && h ? C.borderStrong : C.border,
      ...style,
    }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
    >{children}</div>
  );
}

function PageHeader({ eyebrow, title, subtitle, children }) {
  return (
    <section style={{ padding: "80px 56px 56px", maxWidth: 1280, margin: "0 auto" }}>
      {eyebrow && <div style={{ fontSize: 13, color: C.accent, fontWeight: 500, marginBottom: 16 }}>{eyebrow}</div>}
      <h1 style={{ fontSize: 64, lineHeight: 1.05, letterSpacing: "-0.035em", fontWeight: 600, margin: 0, maxWidth: 900 }}>{title}</h1>
      {subtitle && <p style={{ fontSize: 19, lineHeight: 1.55, color: C.muted, margin: "24px 0 0", maxWidth: 720 }}>{subtitle}</p>}
      {children && <div style={{ marginTop: 32 }}>{children}</div>}
    </section>
  );
}

function Footer({ onNavigate }) {
  const c = window.ANEIMERA_CONTENT;
  return (
    <section style={{ padding: "64px 56px", borderTop: `1px solid ${C.border}`, background: C.tint, marginTop: 96 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: C.ink, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>A</div>
            <div style={{ fontWeight: 600, fontSize: 15 }}>{c.brand.name} <span style={{ color: C.muted, fontSize: 12 }}>{c.brand.suffix}</span></div>
          </div>
          <Edit path="brand.tagline" as="div" style={{ fontSize: 13, color: C.muted, maxWidth: 280 }}>{c.brand.tagline}</Edit>
        </div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, marginBottom: 12, fontWeight: 500 }}>Secciones</div>
          {c.nav.map(n => (
            <div key={n.id} onClick={()=>onNavigate?.(n.id)} style={{ fontSize: 13, marginBottom: 6, cursor: "pointer" }}>{n.label}</div>
          ))}
        </div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, marginBottom: 12, fontWeight: 500 }}>Contacto</div>
          <Edit path="footer.email" as="div" style={{ fontSize: 13, marginBottom: 6 }}>{c.footer.email}</Edit>
          <Edit path="footer.phone" as="div" style={{ fontSize: 13 }}>{c.footer.phone}</Edit>
        </div>
        <div style={{ alignSelf: "end" }}>
          <Edit path="footer.legal" as="div" style={{ fontSize: 11, color: C.muted }}>{c.footer.legal}</Edit>
        </div>
      </div>
    </section>
  );
}

/* Lightweight modal */
function CModal({ open, onClose, children, width = 640 }) {
  React.useEffect(() => {
    if (!open) return;
    const h = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(10,10,10,0.40)", backdropFilter: "blur(4px)",
      zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
      animation: "fadeIn .15s ease-out",
    }}>
      <div onClick={(e)=>e.stopPropagation()} style={{
        background: "#fff", borderRadius: C.radiusXl, width: "100%", maxWidth: width, maxHeight: "85vh",
        overflow: "auto", boxShadow: "0 24px 48px -12px rgba(10,10,10,0.30)",
        animation: "popIn .2s cubic-bezier(.2,.9,.3,1.2)",
      }}>{children}</div>
      <style>{`
        @keyframes fadeIn { from {opacity:0} to {opacity:1} }
        @keyframes popIn { from {opacity:0; transform: scale(.96) translateY(8px)} to {opacity:1; transform: scale(1) translateY(0)} }
      `}</style>
    </div>
  );
}

Object.assign(window, { NavBar, CButton, Pill, Card, PageHeader, Footer, CModal });
