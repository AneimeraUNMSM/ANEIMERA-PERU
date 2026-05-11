/* Noticias page in C system — editorial feature, secondary articles list, newsletter signup */

function NoticiasC({ onNavigate }) {
  const c = window.ANEIMERA_CONTENT;
  const [reading, setReading] = React.useState(null);
  const [tag, setTag] = React.useState("Todas");

  const tags = ["Todas", "Industria", "Capítulos", "Logros", "Editorial"];
  const filtered = c.noticias.filter(n => tag === "Todas" || n.tag === tag);
  const feature = c.noticias[0];
  const rest = filtered.slice(filtered === c.noticias ? 1 : 0);

  return (
    <>
      <PageHeader
        eyebrow="EDITORIAL · NOTICIAS"
        title="La red, contada por sus protagonistas."
        subtitle="Crónicas, análisis y reportes desde los 12 capítulos. Si pasa algo relevante en la ingeniería mecánica, eléctrica o electrónica del país, lo encontrarás aquí."
      />

      {/* feature */}
      <section style={{ padding: "0 56px 56px", maxWidth: 1280, margin: "0 auto" }}>
        <div onClick={() => setReading(feature)} style={{
          display: "grid", gridTemplateColumns: "7fr 5fr", gap: 48, alignItems: "center",
          cursor: "pointer", padding: 40, borderRadius: C.radiusXl, background: C.tintWarm,
          border: `1px solid ${C.border}`,
        }}>
          <div style={{
            aspectRatio: "4/3", borderRadius: C.radiusLg, overflow: "hidden",
            background: "linear-gradient(135deg, #2a2a26 0%, #1a1a18 100%)",
            position: "relative", display: "flex", alignItems: "end", padding: 24,
          }}>
            <div style={{
              position: "absolute", inset: 0,
              background: "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.02) 20px, rgba(255,255,255,0.02) 21px)",
            }}/>
            <span data-cms-path="noticias.0.photo" style={{ position: "relative", fontSize: 11, color: "#a0a09d", letterSpacing: "0.16em" }}>{feature.photo}</span>
          </div>
          <div>
            <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
              <Pill color="accent">DESTACADA</Pill>
              <Pill>{feature.tag}</Pill>
            </div>
            <h2 data-cms-path="noticias.0.title" style={{ fontSize: 38, lineHeight: 1.1, letterSpacing: "-0.025em", fontWeight: 600, margin: 0 }}>{feature.title}</h2>
            <p data-cms-path="noticias.0.summary" style={{ fontSize: 16, lineHeight: 1.6, color: C.muted, marginTop: 16 }}>{feature.summary}</p>
            <div style={{ marginTop: 24, display: "flex", gap: 16, alignItems: "center", fontSize: 13, color: C.muted }}>
              <span data-cms-path="noticias.0.author">{feature.author}</span>
              <span style={{ width: 3, height: 3, borderRadius: 2, background: C.mutedLight }} />
              <span data-cms-path="noticias.0.date">{feature.date}</span>
              <span style={{ width: 3, height: 3, borderRadius: 2, background: C.mutedLight }} />
              <span>{feature.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* filters */}
      <section style={{ padding: "16px 56px 16px", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", margin: 0 }}>Más recientes</h2>
          <div style={{ display: "flex", gap: 6 }}>
            {tags.map(t => (
              <button key={t} onClick={() => setTag(t)} style={{
                padding: "6px 12px", borderRadius: 999, fontSize: 12, cursor: "pointer",
                background: tag===t?C.ink:"transparent",
                color: tag===t?"#fff":C.muted,
                border: `1px solid ${tag===t?C.ink:"transparent"}`,
              }}>{t}</button>
            ))}
          </div>
        </div>
      </section>

      {/* list */}
      <section style={{ padding: "16px 56px 96px", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {rest.map((n, i) => (
            <Card key={i} style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column", cursor: "pointer" }} {...{ onClick: () => setReading(n) }}>
              <div style={{
                aspectRatio: "16/10",
                background: `linear-gradient(135deg, ${i%3===0?"#2a2a26":i%3===1?"oklch(0.85 0.04 26)":"oklch(0.88 0.05 220)"} 0%, ${i%3===0?"#1a1a18":i%3===1?"oklch(0.75 0.08 26)":"oklch(0.78 0.08 220)"} 100%)`,
                display: "flex", alignItems: "end", padding: 16,
                fontSize: 10, color: "rgba(255,255,255,0.6)", letterSpacing: "0.14em",
              }}>
                <span data-cms-path={`noticias.${c.noticias.indexOf(n)}.photo`}>{n.photo}</span>
              </div>
              <div style={{ padding: 20, flex: 1, display: "flex", flexDirection: "column" }}>
                <Pill color="accent">{n.tag}</Pill>
                <h3 style={{ fontSize: 17, lineHeight: 1.3, letterSpacing: "-0.015em", fontWeight: 600, margin: "12px 0 8px" }}>
                  <span data-cms-path={`noticias.${c.noticias.indexOf(n)}.title`}>{n.title}</span>
                </h3>
                <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.55, margin: 0, flex: 1 }}>
                  <span data-cms-path={`noticias.${c.noticias.indexOf(n)}.summary`}>{n.summary}</span>
                </p>
                <div style={{ marginTop: 16, fontSize: 12, color: C.mutedLight, display: "flex", gap: 10 }}>
                  <span>{n.date}</span>
                  <span>·</span>
                  <span>{n.readTime}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* newsletter */}
      <section style={{ padding: "0 56px 96px", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{
          background: C.ink, color: "#fff", borderRadius: C.radiusXl, padding: 56,
          display: "grid", gridTemplateColumns: "5fr 5fr", gap: 56, alignItems: "center",
        }}>
          <div>
            <Pill color="accent">BOLETÍN MENSUAL</Pill>
            <h2 style={{ fontSize: 36, lineHeight: 1.1, letterSpacing: "-0.025em", fontWeight: 600, margin: "20px 0 12px" }}>
              Recibe lo que pasa en la red.
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: "#c0c0bd", margin: 0 }}>
              Un correo el primer lunes de cada mes. Eventos, becas, oportunidades y lo mejor que publicamos.
            </p>
          </div>
          <form onSubmit={(e)=>{e.preventDefault();}} style={{ display: "flex", gap: 8 }}>
            <input placeholder="tu@correo.com" style={{
              flex: 1, padding: "14px 16px", borderRadius: 10, fontSize: 14, fontFamily: C.font,
              border: "1px solid rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.06)",
              color: "#fff", outline: "none",
            }}/>
            <CButton variant="accent" type="submit">Suscribirme →</CButton>
          </form>
        </div>
      </section>

      {/* article modal */}
      <CModal open={!!reading} onClose={() => setReading(null)} width={760}>
        {reading && (
          <article style={{ padding: 48 }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              <Pill color="accent">{reading.tag}</Pill>
              <Pill>{reading.date}</Pill>
              <Pill>{reading.readTime}</Pill>
            </div>
            <h1 style={{ fontSize: 36, lineHeight: 1.1, letterSpacing: "-0.025em", fontWeight: 600, margin: 0 }}>{reading.title}</h1>
            <div style={{ marginTop: 20, fontSize: 13, color: C.muted }}>Por <strong style={{ color: C.ink }}>{reading.author}</strong></div>
            <div style={{
              height: 240, marginTop: 32, borderRadius: C.radiusLg,
              background: "linear-gradient(135deg, #2a2a26 0%, #1a1a18 100%)",
              display: "flex", alignItems: "end", padding: 20,
              fontSize: 10, color: "rgba(255,255,255,0.6)", letterSpacing: "0.14em",
            }}>{reading.photo}</div>
            <div style={{ marginTop: 32, fontSize: 17, lineHeight: 1.7, color: C.ink2 }}>
              <p style={{ marginTop: 0 }}>{reading.summary}</p>
              <p>El reporte completo es el resultado de cuatro meses de trabajo en doce universidades, con datos verificables y entrevistas a más de 80 estudiantes activos en la red. La versión integral estará disponible en PDF para miembros.</p>
              <p>El equipo editorial agradece a los capítulos que abrieron sus reuniones para esta cobertura.</p>
            </div>
          </article>
        )}
      </CModal>
    </>
  );
}

window.NoticiasC = NoticiasC;
