/* Content management utilities — loaded by admin.html (no JSX needed here).
 * Prototipo-C.html loads js/c-content.jsx which contains the full version + Edit component.
 */

window.ANEIMERA_CONTENT_DEFAULTS = {
  brand: {
    name: "ANEIMERA",
    suffix: "PERÚ",
    tagline: "Asociación Nacional de Estudiantes de Ingeniería Mecánica, Eléctrica y Ramas Afines.",
  },
  nav: [
    { id: "home",      label: "Inicio" },
    { id: "red",       label: "Capítulos" },
    { id: "eventos",   label: "Eventos" },
    { id: "membresia", label: "Membresía" },
    { id: "noticias",  label: "Noticias" },
  ],
  hero: {
       title: "INGENIERÍA QUE TRANSFORMA EL PERÚ",
       subtitle: "Asociación Nacional de Estudiantes de Ingeniería Mecánica, Eléctrica, Electrónica y Ramas Afines. Impulsando la excelencia técnica y el desarrollo profesional desde 1998.",
       primaryCta:   { label: "EXPLORAR CAPÍTULOS" },
       secondaryCta: { label: "¿POR QUÉ ALIARSE? →" },
  },
  metrics: [
    { label: "Capítulos activos",    value: "12",  suffix: "",  note: "+2 en 2025" },
    { label: "Estudiantes en la red",value: "5.2", suffix: "k", note: "Promedio 433/capítulo" },
    { label: "Eventos al año",       value: "180", suffix: "",  note: "Charlas, visitas, congresos" },
    { label: "Alianzas activas",     value: "27",  suffix: "",  note: "Empresas + instituciones" },
  ],
  trustStrip: {
    label: "CONFÍAN EN LA RED",
    logos: ["UNI","PUCP","UNMSM","UPC","UNSA","UNALM"],
  },
  valueProps: [
    { tag: "TALENTO", title: "Pipeline de talento técnico verificado.",    body: "Acceso prioritario a estudiantes en últimos ciclos y egresados recientes con perfiles técnicos validados por sus capítulos." },
    { tag: "I+D",     title: "Proyectos conjuntos con universidades.",       body: "Co-financiamos tesis y prototipos con problemas reales de tu industria. Coordinación a través de los directorios académicos." },
    { tag: "MARCA",   title: "Presencia editorial nacional.",               body: "Patrocinio de eventos, contenido en el boletín mensual y reconocimiento como aliado en los 12 capítulos." },
  ],
  partnerStory: {
    quote: "El programa de alianza con ANEIMERA nos dio acceso a 40 finalistas en menos de tres meses. La calidad de los perfiles superó nuestro proceso interno.",
    name:  "Lucía Mendoza",
    role:  "Gerente de Talento · Siderúrgica del Pacífico",
    photo: "RETRATO · PLACEHOLDER",
  },
  partnership: {
    eyebrow: "ALIANZAS · 3 NIVELES",
    title:   "Estructura de alianzas pensada para empresas técnicas.",
    body:    "Eliges el nivel, definimos juntos los entregables y firmamos un plan anual con KPIs claros. Sin sorpresas.",
    tiers: [
      { code: "T-01 · COLABORADOR", name: "Colaborador", price: "Desde 1,200 USD / año",
        bullets: ["Logo en pie de página","Acceso al boletín mensual","1 charla técnica al año","Reporte semestral"] },
      { code: "T-02 · ESTRATÉGICO", name: "Estratégico", price: "Desde 4,800 USD / año",
        bullets: ["Logo en home + eventos","Pipeline directo de talento (50/año)","4 charlas + 1 visita técnica","Co-branding de un congreso","Reporte trimestral"] },
      { code: "T-03 · FUNDADOR",    name: "Fundador",    price: "Custom · plan anual",
        bullets: ["Posicionamiento como fundador","Pipeline ilimitado + scouting","Programa de prácticas exclusivo","Co-financiamiento de I+D","Asiento en mesa consultiva"] },
    ],
  },
  capitulos: [
    { code: "AP-001", city: "Lima",      name: "Universidad Nacional de Ingeniería",             members: 612 },
    { code: "AP-002", city: "Lima",      name: "Pontificia Universidad Católica del Perú",       members: 488 },
    { code: "AP-003", city: "Lima",      name: "Universidad Nacional Mayor de San Marcos",       members: 401 },
    { code: "AP-004", city: "Arequipa",  name: "Universidad Nacional de San Agustín",            members: 524 },
    { code: "AP-005", city: "Trujillo",  name: "Universidad Nacional de Trujillo",               members: 387 },
    { code: "AP-006", city: "Cusco",     name: "Universidad Nacional San Antonio Abad",          members: 412 },
    { code: "AP-007", city: "Piura",     name: "Universidad de Piura",                           members: 256 },
    { code: "AP-008", city: "Piura",     name: "Universidad Nacional de Piura",                  members: 318 },
    { code: "AP-009", city: "Tacna",     name: "Universidad Nacional Jorge Basadre",             members: 224 },
    { code: "AP-010", city: "Lima",      name: "Universidad Peruana de Ciencias Aplicadas",      members: 367 },
    { code: "AP-011", city: "Huancayo",  name: "Universidad Nacional del Centro del Perú",       members: 295 },
    { code: "AP-012", city: "Iquitos",   name: "Universidad Nacional de la Amazonía Peruana",    members: 198 },
  ],
  eventos: [
    { month:"ABR", day:"18", date:"18 abr · 2026", tag:"Congreso",  chapter:"Lima · UNI",
      title:"CONIME 2026 — Congreso Nacional de Ingeniería Mecánica y Eléctrica",
      summary:"Tres días de conferencias magistrales, paneles con industria y la mayor feria de oportunidades técnicas del año. Edición XV.",
      venue:"Auditorio Central UNI · Lima", capacity:"850", spotsLeft:312 },
    { month:"MAR", day:"07", date:"7 mar · 2026", tag:"Visita", chapter:"Arequipa · UNSA",
      title:"Visita técnica · Cerro Verde · Procesos de molienda y flotación",
      venue:"Cerro Verde, Arequipa", capacity:"30", spotsLeft:8 },
    { month:"MAR", day:"14", date:"14 mar · 2026", tag:"Charla", chapter:"Lima · PUCP",
      title:"Hablemos de movilidad eléctrica con líderes del sector",
      venue:"Auditorio Tinkuy PUCP · Lima", capacity:"180", spotsLeft:67 },
  ],
  membresia: {
    benefits: [
      { title:"Eventos nacionales sin costo",  body:"Acceso prioritario al congreso anual y a todos los eventos de los 12 capítulos." },
      { title:"Bolsa de prácticas técnica",    body:"Ofertas pre-filtradas de las empresas aliadas, exclusivas para miembros." },
      { title:"Mentoría con egresados",        body:"Programa de matching 1:1 con profesionales que pasaron por la red." },
      { title:"Credencial nacional",           body:"Identificación digital reconocida por las 12 universidades de la red." },
      { title:"Biblioteca técnica",            body:"Repositorio de tesis, normas y materiales de los grupos de estudio." },
      { title:"Descuentos en certificaciones", body:"Hasta 40% en programas de capacitación de partners académicos." },
    ],
    plans: [
      { name:"Estudiante", price:"S/ 45",  period:"/ semestre", target:"Estudiantes activos de cualquier capítulo.",
        bullets:["Todos los beneficios estándar","Acceso al panel de oportunidades","Credencial digital","Voto en asamblea de capítulo"], featured:false },
      { name:"Egresado",   price:"S/ 120", period:"/ año",      target:"Profesionales hasta 5 años de egresados.",
        bullets:["Acceso al directorio de egresados","Mentor de un capítulo (opcional)","Invitación a mesa consultiva regional","Bolsa de empleos curada"], featured:true },
    ],
    faq: [
      { q:"¿Debo estar matriculado en una de las 12 universidades?", a:"Para la membresía Estudiante sí. Para Egresado, basta haber pertenecido a un capítulo durante al menos dos semestres." },
      { q:"¿Cuánto tiempo dura la verificación?", a:"Entre 24 y 72 horas hábiles. Validamos con la oficina de registro académico o con tu capítulo de origen." },
    ],
  },
  noticias: [
    { tag:"Editorial", date:"12 feb · 2026", readTime:"8 min lectura",
      title:"Por qué este 2026 es un año bisagra para la ingeniería técnica peruana",
      summary:"Tres megaproyectos, una reforma curricular y la primera generación pos-pandémica llegando al mercado laboral. La red toma posición.",
      author:"Consejo Editorial", photo:"REPORTAJE · PLACEHOLDER" },
    { tag:"Logros", date:"08 feb · 2026", readTime:"4 min",
      title:"Equipo UNI gana primer puesto en competencia regional de robótica",
      summary:"El capítulo limeño se llevó la categoría pregrado con un manipulador de 5 GDL diseñado en cuatro meses.",
      author:"Comunicaciones UNI", photo:"ROBÓTICA · UNI" },
    { tag:"Industria", date:"02 feb · 2026", readTime:"6 min",
      title:"Movilidad eléctrica: cinco empresas se suman al programa de prácticas",
      summary:"Conversamos con los directores técnicos sobre los perfiles que están buscando y qué falta en la formación universitaria.",
      author:"Sara Quispe", photo:"MOVILIDAD · CHARLA" },
  ],
  footer: {
    email: "contacto@aneimera.pe",
    phone: "+51 1 200 4567 · Lun a Vie · 9-18",
    legal: "© 2026 ANEIMERA PERÚ. Asociación civil sin fines de lucro inscrita en SUNARP.",
  },
};

/* Boot: load from localStorage, fall back to defaults */
(function bootContent() {
  function deepMerge(base, over) {
    if (Array.isArray(over)) return over;
    if (typeof over !== "object" || over === null) return over;
    const out = Array.isArray(base) ? [...base] : { ...base };
    for (const k of Object.keys(over)) {
      out[k] = (typeof base?.[k] === "object" && base[k] !== null)
        ? deepMerge(base[k], over[k]) : over[k];
    }
    return out;
  }
  try {
    const raw = localStorage.getItem("aneimera.content");
    window.ANEIMERA_CONTENT = raw
      ? deepMerge(window.ANEIMERA_CONTENT_DEFAULTS, JSON.parse(raw))
      : JSON.parse(JSON.stringify(window.ANEIMERA_CONTENT_DEFAULTS));
  } catch {
    window.ANEIMERA_CONTENT = JSON.parse(JSON.stringify(window.ANEIMERA_CONTENT_DEFAULTS));
  }
})();

window.setContentPath = function(path, value) {
  const keys = path.split(".");
  let cur = window.ANEIMERA_CONTENT;
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i].match(/^\d+$/) ? parseInt(keys[i]) : keys[i];
    if (cur[k] == null) cur[k] = keys[i + 1]?.match(/^\d+$/) ? [] : {};
    cur = cur[k];
  }
  cur[keys[keys.length - 1]] = value;
  try { localStorage.setItem("aneimera.content", JSON.stringify(window.ANEIMERA_CONTENT)); } catch {}
};

window.getContentPath = function(path) {
  const keys = path.split(".");
  let cur = window.ANEIMERA_CONTENT;
  for (const k of keys) {
    if (cur == null) return undefined;
    cur = cur[k.match(/^\d+$/) ? parseInt(k) : k];
  }
  return cur;
};
