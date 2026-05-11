/* Membresía page in C system — benefits, two plans, application process, FAQ */

function MembresiaC({ onNavigate }) {
  const c = window.ANEIMERA_CONTENT;
  const [open, setOpen] = React.useState(0);
  const [plan, setPlan] = React.useState(null);

  return (
    <>
      <PageHeader
        eyebrow="HACER PARTE · MEMBRESÍA"
        title="Una credencial técnica, una red para toda tu carrera."
        subtitle="Diseñada para estudiantes y egresados de Mecánica, Eléctrica y Electrónica. Acceso a eventos, mentorías, ofertas de prácticas y la comunidad nacional."
      >
        <div style={{ display: "flex", gap: 12 }}>
          <CButton onClick={() => document.getElementById("planes")?.scrollIntoView({behavior:"smooth"})}>Ver planes →</CButton>
          <CButton variant="secondary">Descargar reglamento</CButton>
        </div>
      </PageHeader>

      {/* benefits grid */}
      <section style={{ padding: "32px 56px 96px", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {c.membresia.benefits.map((b, i) => (
            <Card key={i} style={{ padding: 28 }}>
              <div style={{ fontSize: 11, color: C.muted, letterSpacing: "0.14em", marginBottom: 12 }}>0{i+1}</div>
              <div data-cms-path={`membresia.benefits.${i}.title`} style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.015em", marginBottom: 8 }}>{b.title}</div>
              <div data-cms-path={`membresia.benefits.${i}.body`} style={{ fontSize: 14, color: C.muted, lineHeight: 1.55 }}>{b.body}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* plans */}
      <section id="planes" style={{ padding: "64px 56px", background: C.tint, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 13, color: C.accent, fontWeight: 500, marginBottom: 12 }}>PLANES</div>
            <h2 style={{ fontSize: 40, fontWeight: 600, letterSpacing: "-0.025em", margin: 0 }}>Dos formas de ser parte.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 900, margin: "0 auto" }}>
            {c.membresia.plans.map((p, i) => (
              <div key={i} style={{
                background: "#fff", borderRadius: C.radiusLg, padding: 36,
                border: p.featured?`1.5px solid ${C.ink}`:`1px solid ${C.border}`,
                boxShadow: p.featured?"0 16px 36px -16px rgba(10,10,10,0.20)":C.shadow,
              }}>
                {p.featured && <div style={{ display: "inline-block", padding: "4px 10px", borderRadius: 999, background: C.accentSoft, color: C.accentInk, fontSize: 11, fontWeight: 500, marginBottom: 16 }}>Más popular</div>}
                <h3 data-cms-path={`membresia.plans.${i}.name`} style={{ fontSize: 22, fontWeight: 600, margin: 0 }}>{p.name}</h3>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, margin: "16px 0 8px" }}>
                  <span data-cms-path={`membresia.plans.${i}.price`} style={{ fontSize: 42, fontWeight: 600, letterSpacing: "-0.025em" }}>{p.price}</span>
                  <span style={{ fontSize: 14, color: C.muted }}>{p.period}</span>
                </div>
                <div data-cms-path={`membresia.plans.${i}.target`} style={{ fontSize: 13, color: C.muted, marginBottom: 24 }}>{p.target}</div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
                  {p.bullets.map((b, j) => (
                    <li key={j} data-cms-path={`membresia.plans.${i}.bullets.${j}`} style={{ display: "flex", gap: 10, fontSize: 14, color: C.ink2 }}>
                      <span style={{ color: C.accent, fontWeight: 600 }}>✓</span>{b}
                    </li>
                  ))}
                </ul>
                <CButton variant={p.featured?"primary":"secondary"} style={{ marginTop: 28, width: "100%", justifyContent: "center" }} onClick={() => setPlan(p)}>
                  Postular ahora →
                </CButton>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* process */}
      <section style={{ padding: "96px 56px", maxWidth: 1280, margin: "0 auto" }}>
        <h2 style={{ fontSize: 36, fontWeight: 600, letterSpacing: "-0.025em", margin: 0, marginBottom: 48 }}>Proceso de admisión</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, position: "relative" }}>
          {[
            { n: "01", t: "Solicitud en línea", b: "Completa el formulario. Toma 8 minutos.", d: "Día 1" },
            { n: "02", t: "Verificación", b: "Validamos vínculo con tu universidad o egreso.", d: "Día 1-3" },
            { n: "03", t: "Bienvenida", b: "Inducción virtual y entrega de credencial digital.", d: "Día 4-7" },
            { n: "04", t: "Activación", b: "Acceso a tu capítulo local y al panel nacional.", d: "Día 7" },
          ].map((s, i) => (
            <div key={s.n} style={{ position: "relative" }}>
              <div style={{ fontSize: 13, fontFamily: C.fontMono, color: C.accent, marginBottom: 12 }}>{s.n}</div>
              <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.015em", marginBottom: 8 }}>{s.t}</div>
              <div style={{ fontSize: 14, color: C.muted, lineHeight: 1.55 }}>{s.b}</div>
              <div style={{ fontSize: 12, color: C.mutedLight, marginTop: 12, fontFamily: C.fontMono }}>{s.d}</div>
              {i < 3 && <div style={{ position: "absolute", top: 8, right: -12, width: 24, height: 1, background: C.border }} />}
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "0 56px 96px", maxWidth: 880, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ fontSize: 32, fontWeight: 600, letterSpacing: "-0.025em", margin: 0 }}>Preguntas frecuentes</h2>
        </div>
        <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: C.radiusLg, overflow: "hidden" }}>
          {c.membresia.faq.map((q, i) => (
            <div key={i} style={{ borderTop: i > 0 ? `1px solid ${C.border}` : "none" }}>
              <button onClick={() => setOpen(open === i ? -1 : i)} style={{
                width: "100%", padding: "20px 24px", display: "flex", justifyContent: "space-between",
                alignItems: "center", background: "transparent", border: "none", cursor: "pointer",
                textAlign: "left", fontSize: 15, fontWeight: 500, color: C.ink, fontFamily: C.font,
              }}>
                <span data-cms-path={`membresia.faq.${i}.q`}>{q.q}</span>
                <span style={{ fontSize: 18, color: C.muted, transform: open === i ? "rotate(45deg)" : "rotate(0)", transition: "transform .2s" }}>+</span>
              </button>
              {open === i && (
                <div data-cms-path={`membresia.faq.${i}.a`} style={{ padding: "0 24px 20px", fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{q.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* application modal */}
      <CModal open={!!plan} onClose={() => setPlan(null)} width={560}>
        {plan && (
          <div style={{ padding: 40 }}>
            <Pill color="accent">POSTULACIÓN</Pill>
            <h2 style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em", margin: "16px 0 8px" }}>{plan.name}</h2>
            <p style={{ fontSize: 14, color: C.muted, margin: 0 }}>Tu solicitud tarda menos de 5 minutos. Verificamos en 72 horas.</p>
            <div style={{ height: 1, background: C.border, margin: "28px 0" }} />
            <div style={{ display: "grid", gap: 14 }}>
              <CField label="Nombre completo" value="" onChange={()=>{}} placeholder="Nombres y apellidos" />
              <CField label="DNI o CE" value="" onChange={()=>{}} placeholder="Documento de identidad" />
              <CField label="Universidad" value="" onChange={()=>{}} placeholder="Institución actual o de egreso" />
              <CField label="Correo institucional" type="email" value="" onChange={()=>{}} placeholder="correo@universidad.edu.pe" />
            </div>
            <CButton style={{ marginTop: 24, width: "100%", justifyContent: "center" }} onClick={() => setPlan(null)}>
              Enviar postulación →
            </CButton>
            <p style={{ fontSize: 11, color: C.muted, marginTop: 16, textAlign: "center" }}>Al postular aceptas el reglamento interno de ANEIMERA PERÚ.</p>
          </div>
        )}
      </CModal>
    </>
  );
}

window.MembresiaC = MembresiaC;
