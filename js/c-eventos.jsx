/* Eventos page in C system — featured event hero, list with filters, registration form */

function EventosC({ onNavigate }) {
  const c = window.ANEIMERA_CONTENT;
  const [filter, setFilter] = React.useState("Todos");
  const [registering, setRegistering] = React.useState(null);
  const [confirmed, setConfirmed] = React.useState(false);

  const tags = ["Todos", "Congreso", "Charla", "Visita", "Concurso"];
  const events = c.eventos.filter(e => filter === "Todos" || e.tag === filter);
  const featured = c.eventos[0];

  return (
    <>
      <PageHeader
        eyebrow="AGENDA · 2026"
        title="Cada semana sucede algo en la red."
        subtitle="Charlas con industria, visitas a planta, congresos regionales y concursos técnicos. Si eres miembro, te llegan al correo. Si no, este es un buen lugar para empezar."
      />

      {/* featured event */}
      <section style={{ padding: "0 56px 56px", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{
          background: "linear-gradient(135deg, #1a1a18 0%, #2a2a26 100%)",
          color: "#fff", borderRadius: C.radiusXl, padding: 56,
          display: "grid", gridTemplateColumns: "7fr 5fr", gap: 56, alignItems: "center",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", right: -120, top: -120, width: 400, height: 400, borderRadius: "50%",
            background: `radial-gradient(circle, ${C.accent}, transparent 70%)`, opacity: 0.20,
          }} />
          <div style={{ position: "relative" }}>
            <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
              <Pill color="accent">DESTACADO</Pill>
              <Pill color="ink">{featured.tag}</Pill>
            </div>
            <h2 style={{ fontSize: 48, lineHeight: 1.05, letterSpacing: "-0.03em", fontWeight: 600, margin: 0 }}>{featured.title}</h2>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: "#c0c0bd", marginTop: 16, maxWidth: 520 }}>{featured.summary}</p>
            <div style={{ display: "flex", gap: 32, marginTop: 32, fontSize: 13 }}>
              <div>
                <div style={{ color: "#a0a09d", marginBottom: 4 }}>FECHA</div>
                <div style={{ fontWeight: 500 }}>{featured.date}</div>
              </div>
              <div>
                <div style={{ color: "#a0a09d", marginBottom: 4 }}>SEDE</div>
                <div style={{ fontWeight: 500 }}>{featured.venue}</div>
              </div>
              <div>
                <div style={{ color: "#a0a09d", marginBottom: 4 }}>CUPO</div>
                <div style={{ fontWeight: 500 }}>{featured.capacity}</div>
              </div>
            </div>
          </div>
          <div style={{ position: "relative", textAlign: "center" }}>
            <div style={{
              background: "rgba(255,255,255,0.06)", borderRadius: C.radiusLg, padding: 32,
              backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.10)",
            }}>
              <div style={{ fontSize: 11, color: "#a0a09d", letterSpacing: "0.16em", marginBottom: 12 }}>INSCRIPCIONES ABIERTAS</div>
              <div style={{ fontSize: 56, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1 }}>{featured.spotsLeft}</div>
              <div style={{ fontSize: 13, color: "#a0a09d", marginTop: 8 }}>de {featured.capacity} cupos disponibles</div>
              <div style={{ height: 6, background: "rgba(255,255,255,0.10)", borderRadius: 3, margin: "20px 0 24px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${(featured.spotsLeft / parseInt(featured.capacity)) * 100}%`, background: C.accent }} />
              </div>
              <CButton variant="accent" style={{ width: "100%", justifyContent: "center" }} onClick={() => setRegistering(featured)}>
                Inscribirme →
              </CButton>
            </div>
          </div>
        </div>
      </section>

      {/* filters */}
      <section style={{ padding: "32px 56px 0", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
          <h2 style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em", margin: 0 }}>Próximos eventos</h2>
          <div style={{ display: "flex", gap: 6 }}>
            {tags.map(t => (
              <button key={t} onClick={()=>setFilter(t)} style={{
                padding: "8px 14px", borderRadius: 999, fontSize: 13, cursor: "pointer",
                background: filter===t?C.ink:"transparent",
                color: filter===t?"#fff":C.ink,
                border: `1px solid ${filter===t?C.ink:C.border}`,
              }}>{t}</button>
            ))}
          </div>
        </div>
      </section>

      {/* event list */}
      <section style={{ padding: "0 56px 96px", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 1, background: C.border, border: `1px solid ${C.border}`, borderRadius: C.radiusLg, overflow: "hidden" }}>
          {events.map((e, i) => (
            <div key={i} style={{
              background: "#fff", padding: "24px 28px",
              display: "grid", gridTemplateColumns: "auto 4fr 2fr 2fr auto", gap: 32, alignItems: "center",
            }}>
              <div style={{ textAlign: "center", minWidth: 56 }}>
                <div style={{ fontSize: 10, color: C.muted, letterSpacing: "0.14em" }}>{e.month}</div>
                <div style={{ fontSize: 28, fontWeight: 600, lineHeight: 1, marginTop: 4 }}>{e.day}</div>
              </div>
              <div>
                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <Pill color="accent">{e.tag}</Pill>
                  <Pill>{e.chapter}</Pill>
                </div>
                <div data-cms-path={`eventos.${i}.title`} style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.015em" }}>{e.title}</div>
              </div>
              <div style={{ fontSize: 13 }}>
                <div style={{ color: C.muted, marginBottom: 2 }}>Sede</div>
                <div>{e.venue}</div>
              </div>
              <div style={{ fontSize: 13 }}>
                <div style={{ color: C.muted, marginBottom: 2 }}>Cupo</div>
                <div>{e.spotsLeft}/{e.capacity}</div>
              </div>
              <CButton variant="secondary" onClick={() => setRegistering(e)}>Inscribirme</CButton>
            </div>
          ))}
        </div>
      </section>

      {/* registration modal */}
      <CModal open={!!registering} onClose={() => { setRegistering(null); setConfirmed(false); }} width={520}>
        {registering && !confirmed && (
          <div style={{ padding: 40 }}>
            <Pill color="accent">{registering.tag}</Pill>
            <h2 style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em", margin: "16px 0 8px" }}>{registering.title}</h2>
            <p style={{ fontSize: 14, color: C.muted, margin: 0 }}>{registering.date} · {registering.venue}</p>
            <div style={{ height: 1, background: C.border, margin: "28px 0" }} />
            <div style={{ display: "grid", gap: 14 }}>
              <CField label="Nombre completo" value="" onChange={()=>{}} placeholder="Tus nombres y apellidos" />
              <CField label="Correo" type="email" value="" onChange={()=>{}} placeholder="correo@universidad.edu.pe" />
              <CField label="Capítulo o institución" value="" onChange={()=>{}} placeholder="UNI, PUCP, otro…" />
            </div>
            <CButton style={{ marginTop: 24, width: "100%", justifyContent: "center" }} onClick={() => setConfirmed(true)}>
              Confirmar inscripción →
            </CButton>
          </div>
        )}
        {registering && confirmed && (
          <div style={{ padding: 56, textAlign: "center" }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%", background: C.accentSoft, color: C.accentInk,
              display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 24,
            }}>✓</div>
            <h2 style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em", margin: "0 0 12px" }}>Inscripción confirmada</h2>
            <p style={{ fontSize: 14, color: C.muted, margin: 0 }}>Te enviamos los detalles a tu correo. Nos vemos en {registering.date}.</p>
            <CButton variant="secondary" style={{ marginTop: 28 }} onClick={() => { setRegistering(null); setConfirmed(false); }}>Cerrar</CButton>
          </div>
        )}
      </CModal>
    </>
  );
}

window.EventosC = EventosC;
