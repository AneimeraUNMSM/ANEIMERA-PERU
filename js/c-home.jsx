/* Home page in C system — refined hero, network preview, value props, testimonial,
 * partnership tiers with click-to-detail modal, agenda preview, alliance form.
 */

function HomeC({ onNavigate }) {
  const c = window.ANEIMERA_CONTENT;
  const [tier, setTier] = React.useState(null);
  const [sent, setSent] = React.useState(false);
  const [form, setForm] = React.useState({ company: "", name: "", email: "", objective: "talento" });

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ company: "", name: "", email: "", objective: "talento" });
  };

  return (
    <>
    {/* hero */}
    <section style={{ padding: "112px 56px 96px", maxWidth: 1280, margin: "0 auto" }}>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 12px 6px 8px",
        background: C.tint, border: `1px solid ${C.border}`, borderRadius: 999,
        fontSize: 12, color: "#3a3a38", marginBottom: 32,
      }}>
        <span style={{ width: 8, height: 8, borderRadius: 4, background: C.accent }} />
        <Edit path="hero.eyebrow">{c.hero.eyebrow}</Edit>
      </div>
      <Edit path="hero.title" as="h1" style={{
        fontSize: 80, lineHeight: 1.02, letterSpacing: "-0.035em", fontWeight: 600, margin: 0, maxWidth: 1040,
      }}>{c.hero.title}</Edit>
      <Edit path="hero.subtitle" as="p" style={{
        fontSize: 20, lineHeight: 1.55, color: C.muted, margin: "32px 0 0", maxWidth: 720,
      }}>{c.hero.subtitle}</Edit>
      <div style={{ marginTop: 40, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <CButton onClick={() => document.getElementById("aliarse")?.scrollIntoView({behavior:"smooth", block:"start"})}>
          <Edit path="hero.primaryCta.label">{c.hero.primaryCta.label}</Edit> →
        </CButton>
        <CButton variant="secondary" onClick={() => onNavigate?.("red")}>
          <Edit path="hero.secondaryCta.label">{c.hero.secondaryCta.label}</Edit>
        </CButton>
        <span style={{ marginLeft: 16, fontSize: 13, color: C.muted }}>
          12 universidades · 5.2k estudiantes · 9 regiones
        </span>
      </div>

      {/* live network card */}
      <div style={{
        marginTop: 64, border: `1px solid ${C.border}`, borderRadius: C.radiusLg, background: C.tintWarm,
        padding: 24, boxShadow: C.shadowMd,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13, color: C.muted }}>
            <span style={{ width: 8, height: 8, background: C.accent, borderRadius: 4, animation: "pulse 2s infinite" }} />
            Mapa nacional · actualizado en vivo
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {["Resumen", "Capítulos", "Eventos"].map((t,i)=>(
              <button key={t} style={{
                padding: "6px 12px", borderRadius: 8, fontSize: 12,
                background: i===0?"#fff":"transparent", border: `1px solid ${i===0?C.borderStrong:"transparent"}`,
                color: i===0?C.ink:C.muted, cursor: "pointer",
              }}>{t}</button>
            ))}
          </div>
        </div>
        <div style={{
          background: "#fff", borderRadius: C.radius, border: `1px solid ${C.border}`, padding: 28,
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
        }}>
          {c.metrics.map((m, i) => (
            <div key={i} style={{ padding: "8px 24px", borderLeft: i > 0 ? `1px solid ${C.border}` : "none" }}>
              <div data-cms-path={`metrics.${i}.label`} style={{ fontSize: 12, color: C.muted, marginBottom: 8 }}>{m.label}</div>
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <span data-cms-path={`metrics.${i}.value`} style={{ fontSize: 36, fontWeight: 600, letterSpacing: "-0.025em" }}>{m.value}</span>
                <span data-cms-path={`metrics.${i}.suffix`} style={{ fontSize: 24, color: C.accent, marginLeft: 2 }}>{m.suffix}</span>
              </div>
              <div data-cms-path={`metrics.${i}.note`} style={{ marginTop: 4, fontSize: 12, color: C.muted }}>{m.note}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }`}</style>
    </section>

    {/* trust strip */}
    <section style={{ padding: "0 56px 80px", maxWidth: 1280, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <Edit path="trustStrip.label" as="span" style={{ fontSize: 12, color: C.muted, letterSpacing: "0.16em" }}>{c.trustStrip.label}</Edit>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8 }}>
        {c.trustStrip.logos.map((l, i) => (
          <div key={i} data-cms-path={`trustStrip.logos.${i}`} style={{
            height: 52, display: "flex", alignItems: "center", justifyContent: "center",
            background: C.tint, borderRadius: 10, fontSize: 11, color: C.mutedLight, letterSpacing: "0.14em",
          }}>{l}</div>
        ))}
      </div>
    </section>

    {/* value props */}
    <section style={{ padding: "96px 56px", maxWidth: 1280, margin: "0 auto" }}>
      <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 64px" }}>
        <div style={{ fontSize: 13, color: C.accent, fontWeight: 500, marginBottom: 16 }}>POR QUÉ ALIARSE</div>
        <h2 style={{ fontSize: 48, lineHeight: 1.05, letterSpacing: "-0.03em", fontWeight: 600, margin: 0 }}>
          Una sola red, tres formas de generar valor.
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.6, color: C.muted, marginTop: 16 }}>
          Diseñamos cada alianza alrededor de tus objetivos. Contratación, I+D o marca empleadora — armamos el plan en una semana.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {c.valueProps.map((v, i) => (
          <Card key={i} style={{ padding: 32, display: "flex", flexDirection: "column", cursor: "pointer" }}>
            <div style={{
              width: 44, height: 44, borderRadius: 10, marginBottom: 24,
              background: i===0?"oklch(0.95 0.04 26)":i===1?"oklch(0.94 0.04 220)":"oklch(0.95 0.05 140)",
              color: i===0?"oklch(0.45 0.18 26)":i===1?"oklch(0.45 0.18 220)":"oklch(0.40 0.16 140)",
              display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 18,
            }}>{i===0?"◐":i===1?"◇":"◎"}</div>
            <div data-cms-path={`valueProps.${i}.tag`} style={{ fontSize: 11, color: C.muted, letterSpacing: "0.14em", marginBottom: 12 }}>{v.tag}</div>
            <h3 data-cms-path={`valueProps.${i}.title`} style={{ fontSize: 21, lineHeight: 1.25, letterSpacing: "-0.018em", fontWeight: 600, margin: "0 0 12px" }}>{v.title}</h3>
            <p data-cms-path={`valueProps.${i}.body`} style={{ fontSize: 14, lineHeight: 1.6, color: C.muted, margin: 0, flex: 1 }}>{v.body}</p>
            <a href="#" style={{ marginTop: 24, fontSize: 13, color: C.accent, fontWeight: 500, textDecoration: "none" }}>Ver detalles →</a>
          </Card>
        ))}
      </div>
    </section>

    {/* testimonial */}
    <section style={{ padding: "0 56px 96px", maxWidth: 1280, margin: "0 auto" }}>
      <div style={{
        background: C.tint, borderRadius: C.radiusXl, padding: 56,
        display: "grid", gridTemplateColumns: "auto 1fr", gap: 48, alignItems: "center",
      }}>
        <div style={{
          width: 200, height: 200, borderRadius: 16, overflow: "hidden",
          background: "repeating-linear-gradient(135deg, #e8e6df, #e8e6df 6px, #f0eee8 6px, #f0eee8 12px)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span data-cms-path="partnerStory.photo" style={{ fontSize: 11, color: C.mutedLight, letterSpacing: "0.14em" }}>{c.partnerStory.photo}</span>
        </div>
        <div>
          <Edit path="partnerStory.quote" as="blockquote" style={{
            fontSize: 28, lineHeight: 1.35, letterSpacing: "-0.018em", fontWeight: 500, margin: 0, color: C.ink,
          }}>“{c.partnerStory.quote}”</Edit>
          <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 32, height: 1, background: C.accent }} />
            <div>
              <Edit path="partnerStory.name" as="div" style={{ fontSize: 14, fontWeight: 600 }}>{c.partnerStory.name}</Edit>
              <Edit path="partnerStory.role" as="div" style={{ fontSize: 13, color: C.muted }}>{c.partnerStory.role}</Edit>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* tiers + alliance form */}
    <section id="aliarse" style={{ padding: "96px 56px", background: C.tint, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ marginBottom: 56 }}>
          <Edit path="partnership.eyebrow" as="div" style={{ fontSize: 13, color: C.accent, fontWeight: 500, marginBottom: 12 }}>{c.partnership.eyebrow}</Edit>
          <Edit path="partnership.title" as="h2" style={{ fontSize: 44, lineHeight: 1.05, letterSpacing: "-0.03em", fontWeight: 600, margin: 0, maxWidth: 720 }}>{c.partnership.title}</Edit>
          <Edit path="partnership.body" as="p" style={{ fontSize: 17, lineHeight: 1.6, color: C.muted, marginTop: 16, maxWidth: 640 }}>{c.partnership.body}</Edit>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 64 }}>
          {c.partnership.tiers.map((t, i) => (
            <div key={i} onClick={() => setTier(i)} style={{
              background: "#fff", border: i===1?`1.5px solid ${C.ink}`:`1px solid ${C.border}`,
              borderRadius: C.radiusLg, padding: 28, position: "relative", cursor: "pointer",
              boxShadow: i===1?"0 12px 32px -12px rgba(10,10,10,0.18)":C.shadow,
              transition: "transform .15s",
            }}
              onMouseEnter={(e)=> e.currentTarget.style.transform = "translateY(-3px)"}
              onMouseLeave={(e)=> e.currentTarget.style.transform = "translateY(0)"}
            >
              {i===1 && <div style={{
                position: "absolute", top: -12, right: 20, background: C.ink, color: "#fff",
                padding: "4px 10px", borderRadius: 999, fontSize: 11, fontWeight: 500,
              }}>Más elegida</div>}
              <div data-cms-path={`partnership.tiers.${i}.code`} style={{ fontSize: 11, color: C.muted, letterSpacing: "0.16em", marginBottom: 16 }}>{t.code}</div>
              <h3 data-cms-path={`partnership.tiers.${i}.name`} style={{ fontSize: 26, fontWeight: 600, letterSpacing: "-0.02em", margin: "0 0 8px" }}>{t.name}</h3>
              <div data-cms-path={`partnership.tiers.${i}.price`} style={{ fontSize: 14, color: C.muted, marginBottom: 24 }}>{t.price}</div>
              <div style={{ height: 1, background: C.border, marginBottom: 20 }} />
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {t.bullets.map((b, j) => (
                  <li key={j} data-cms-path={`partnership.tiers.${i}.bullets.${j}`} style={{ fontSize: 14, color: C.ink2, display: "flex", gap: 10 }}>
                    <span style={{ color: C.accent }}>✓</span>{b}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: 24, textAlign: "center", padding: "12px 16px", borderRadius: 10,
                background: i===1?C.ink:"transparent", color: i===1?"#fff":C.ink,
                border: i===1?"none":`1px solid ${C.borderStrong}`, fontSize: 14, fontWeight: 500,
              }}>Ver detalles</div>
            </div>
          ))}
        </div>

        {/* alliance form */}
        <div style={{ background: "#fff", borderRadius: C.radiusXl, padding: 48, border: `1px solid ${C.border}`, boxShadow: C.shadow }}>
          <div style={{ display: "grid", gridTemplateColumns: "5fr 7fr", gap: 64, alignItems: "start" }}>
            <div>
              <h3 style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em", margin: 0 }}>Programar conversación</h3>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: C.muted, marginTop: 12 }}>
                Cuéntanos qué buscas y armamos una propuesta a tu medida. Respondemos en menos de 48 horas.
              </p>
              <div style={{ marginTop: 32, padding: 20, background: C.tint, borderRadius: C.radius, fontSize: 13, color: C.muted }}>
                <strong style={{ color: C.ink, display: "block", marginBottom: 8 }}>O escríbenos directo</strong>
                <Edit path="footer.email">{c.footer.email}</Edit><br/>
                <Edit path="footer.phone">{c.footer.phone}</Edit>
              </div>
            </div>
            <form onSubmit={submit} style={{ display: "grid", gap: 16 }}>
              <CField label="Empresa" value={form.company} onChange={(v)=>setForm({...form, company:v})} placeholder="Razón social" />
              <CField label="Tu nombre" value={form.name} onChange={(v)=>setForm({...form, name:v})} placeholder="Nombres y apellidos" />
              <CField label="Correo corporativo" value={form.email} type="email" onChange={(v)=>setForm({...form, email:v})} placeholder="nombre@empresa.com" />
              <div>
                <label style={{ fontSize: 12, color: C.muted, fontWeight: 500, display: "block", marginBottom: 8 }}>Objetivo principal</label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                  {[{v:"talento",l:"Talento"},{v:"ID",l:"I+D"},{v:"marca",l:"Marca"}].map(o => (
                    <button type="button" key={o.v} onClick={()=>setForm({...form, objective:o.v})} style={{
                      padding: "10px 14px", borderRadius: 10, fontSize: 13, cursor: "pointer",
                      background: form.objective===o.v?C.ink:"#fff",
                      color: form.objective===o.v?"#fff":C.ink,
                      border: form.objective===o.v?`1px solid ${C.ink}`:`1px solid ${C.border}`,
                    }}>{o.l}</button>
                  ))}
                </div>
              </div>
              <CButton style={{ marginTop: 8, justifyContent: "center", width: "100%" }} type="submit">
                {sent ? "✓ Solicitud enviada · gracias" : "Enviar solicitud →"}
              </CButton>
            </form>
          </div>
        </div>
      </div>
    </section>

    {/* tier detail modal */}
    <CModal open={tier !== null} onClose={() => setTier(null)}>
      {tier !== null && (
        <div style={{ padding: 40 }}>
          <Pill color="accent">{c.partnership.tiers[tier].code}</Pill>
          <h2 style={{ fontSize: 36, fontWeight: 600, letterSpacing: "-0.025em", margin: "16px 0 8px" }}>
            {c.partnership.tiers[tier].name}
          </h2>
          <p style={{ fontSize: 15, color: C.muted, margin: 0 }}>{c.partnership.tiers[tier].price}</p>
          <div style={{ height: 1, background: C.border, margin: "32px 0" }} />
          <div style={{ fontSize: 13, color: C.muted, marginBottom: 16, fontWeight: 500 }}>INCLUIDO</div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
            {c.partnership.tiers[tier].bullets.map((b, j) => (
              <li key={j} style={{ display: "flex", gap: 12, fontSize: 15, color: C.ink2 }}>
                <span style={{ color: C.accent, fontWeight: 700 }}>✓</span>{b}
              </li>
            ))}
          </ul>
          <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
            <CButton onClick={() => { setTier(null); document.getElementById("aliarse")?.scrollIntoView({behavior:"smooth"}); }}>
              Programar conversación →
            </CButton>
            <CButton variant="secondary" onClick={() => setTier(null)}>Cerrar</CButton>
          </div>
        </div>
      )}
    </CModal>
    </>
  );
}

function CField({ label, value, onChange, placeholder, type="text" }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <div>
      <label style={{ fontSize: 12, color: C.muted, fontWeight: 500, display: "block", marginBottom: 8 }}>{label}</label>
      <input type={type} value={value} onChange={(e)=>onChange(e.target.value)} placeholder={placeholder}
        onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)}
        style={{
          width: "100%", padding: "12px 14px", borderRadius: 10, fontSize: 15,
          border: `1px solid ${focus?C.ink:C.border}`, outline: "none", background: "#fff",
          fontFamily: C.font, transition: "border-color .15s, box-shadow .15s", boxSizing: "border-box",
          boxShadow: focus ? `0 0 0 3px ${C.accentSoft}` : "none",
        }}
      />
    </div>
  );
}

window.HomeC = HomeC;
window.CField = CField;
