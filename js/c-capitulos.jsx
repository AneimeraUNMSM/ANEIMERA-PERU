/* Capítulos page in C system — directory, search, filters, detail modal */

function CapitulosC({ onNavigate }) {
  const c = window.ANEIMERA_CONTENT;
  const [q, setQ] = React.useState("");
  const [city, setCity] = React.useState("Todas");
  const [pick, setPick] = React.useState(null);

  const cities = ["Todas", ...new Set(c.capitulos.map(x => x.city))];
  const filtered = c.capitulos.filter(x =>
    (city === "Todas" || x.city === city) &&
    (q === "" || (x.name + x.code + x.city).toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <>
      <PageHeader
        eyebrow="LA RED · CAPÍTULOS"
        title="12 capítulos universitarios, 9 regiones."
        subtitle="Cada capítulo es un nodo independiente con directiva propia, conectado a la red nacional. Explora el ecosistema o filtra por ciudad."
      >
        <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ position: "relative", width: 320 }}>
            <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Buscar universidad, código o ciudad…"
              style={{
                width: "100%", padding: "12px 14px 12px 40px", borderRadius: 10, fontSize: 14,
                border: `1px solid ${C.border}`, outline: "none", background: "#fff", fontFamily: C.font, boxSizing: "border-box",
              }}
            />
            <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: C.muted, fontSize: 14 }}>⌕</span>
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {cities.map(ci => (
              <button key={ci} onClick={()=>setCity(ci)} style={{
                padding: "8px 14px", borderRadius: 999, fontSize: 13, cursor: "pointer",
                background: city===ci?C.ink:"#fff",
                color: city===ci?"#fff":C.ink,
                border: `1px solid ${city===ci?C.ink:C.border}`,
              }}>{ci}</button>
            ))}
          </div>
          <span style={{ fontSize: 13, color: C.muted, marginLeft: "auto" }}>{filtered.length} de {c.capitulos.length} capítulos</span>
        </div>
      </PageHeader>

      {/* grid */}
      <section style={{ padding: "16px 56px 64px", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {filtered.map((cap, i) => (
            <Card key={cap.code} style={{ padding: 24, cursor: "pointer" }} {...{ onClick: () => setPick(cap) }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 20 }}>
                <Pill color="accent">{cap.code}</Pill>
                <span style={{ fontSize: 11, color: C.muted }}>{cap.city}</span>
              </div>
              <h3 style={{ fontSize: 17, lineHeight: 1.25, letterSpacing: "-0.015em", fontWeight: 600, margin: "0 0 16px", minHeight: 64 }}>
                <span data-cms-path={`capitulos.${c.capitulos.indexOf(cap)}.name`}>{cap.name}</span>
              </h3>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
                <span style={{ fontSize: 13, color: C.muted }}>Miembros activos</span>
                <span style={{ fontSize: 18, fontWeight: 600 }}>{cap.members}</span>
              </div>
            </Card>
          ))}
          {filtered.length === 0 && (
            <div style={{ gridColumn: "1 / -1", padding: 64, textAlign: "center", color: C.muted, background: C.tint, borderRadius: C.radiusLg }}>
              Sin resultados. Prueba con otro término.
            </div>
          )}
        </div>
      </section>

      {/* found a capítulo CTA */}
      <section style={{ padding: "0 56px 96px", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{
          background: C.ink, color: "#fff", borderRadius: C.radiusXl, padding: 56,
          display: "grid", gridTemplateColumns: "7fr 5fr", gap: 64, alignItems: "center",
        }}>
          <div>
            <Pill color="ink">PROTOCOLO · FUNDACIÓN</Pill>
            <h2 style={{ fontSize: 40, lineHeight: 1.1, letterSpacing: "-0.025em", fontWeight: 600, margin: "20px 0 16px" }}>
              ¿Tu universidad no está en la red?
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: "#c0c0bd", margin: 0 }}>
              Fundar un capítulo toma 4-6 semanas. Necesitas un grupo inicial de 15 estudiantes y el respaldo de la facultad. Te acompañamos paso a paso.
            </p>
          </div>
          <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: C.radiusLg, padding: 24 }}>
            {[
              { n: "01", t: "Forma un comité base", b: "15 estudiantes de Mec, Eléc o Electr." },
              { n: "02", t: "Presenta documentación", b: "Estatutos internos + plan anual" },
              { n: "03", t: "Aprobación nacional", b: "Resolución de asamblea · 2-3 semanas" },
            ].map(s => (
              <div key={s.n} style={{ display: "flex", gap: 20, padding: "16px 0", borderBottom: "1px solid rgba(255,255,255,0.10)" }}>
                <span style={{ fontSize: 14, color: C.accent, fontWeight: 600, fontFamily: C.fontMono }}>{s.n}</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>{s.t}</div>
                  <div style={{ fontSize: 13, color: "#a0a09d", marginTop: 4 }}>{s.b}</div>
                </div>
              </div>
            ))}
            <CButton variant="accent" style={{ marginTop: 20, width: "100%", justifyContent: "center" }}>Iniciar proceso →</CButton>
          </div>
        </div>
      </section>

      {/* detail modal */}
      <CModal open={!!pick} onClose={() => setPick(null)} width={680}>
        {pick && (
          <div style={{ padding: 40 }}>
            <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
              <Pill color="accent">{pick.code}</Pill>
              <Pill>{pick.city}</Pill>
              <Pill>{pick.members} miembros</Pill>
            </div>
            <h2 style={{ fontSize: 32, fontWeight: 600, letterSpacing: "-0.025em", margin: 0 }}>{pick.name}</h2>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: C.muted, marginTop: 16 }}>
              Capítulo activo desde 2008. Programa anual de visitas industriales, charlas técnicas y un proyecto de tesis dirigida por semestre.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, margin: "32px 0" }}>
              {[{l:"Fundado", v:"2008"},{l:"Directiva", v:"7 estudiantes"},{l:"Eventos / año", v:"22"}].map(s => (
                <div key={s.l} style={{ padding: 16, background: C.tint, borderRadius: 10 }}>
                  <div style={{ fontSize: 12, color: C.muted }}>{s.l}</div>
                  <div style={{ fontSize: 18, fontWeight: 600, marginTop: 4 }}>{s.v}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <CButton>Conocer directiva →</CButton>
              <CButton variant="secondary" onClick={() => setPick(null)}>Cerrar</CButton>
            </div>
          </div>
        )}
      </CModal>
    </>
  );
}

window.CapitulosC = CapitulosC;
