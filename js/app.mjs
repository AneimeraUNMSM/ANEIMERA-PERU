// 1. Importaciones del SDK (Usando la versión estable actual)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, limit, doc, getDoc, setDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

// 2. Tu configuración técnica
const firebaseConfig = {
  apiKey: "AIzaSyCNW5JWDEO8BgfpUODrhUNy7p1P0ZEecJE",
  authDomain: "aneimera-peru.firebaseapp.com",
  projectId: "aneimera-peru",
  storageBucket: "aneimera-peru.firebasestorage.app",
  messagingSenderId: "706894806005",
  appId: "1:706894806005:web:e238c117955b77d011febc",
  measurementId: "G-HXTQ9VHVXF"
};

// 3. Inicialización
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- PARCHE ANTI-XSS ---
export const escapeHTML = (str) => {
    if (!str) return '';
    return String(str).replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
        }[tag])
    );
};

// Función de Modal para Información
window.showInfoModal = (title, body) => {
    const modal = document.getElementById('info-modal');
    const modalTitle = document.getElementById('info-modal-title');
    const modalBody = document.getElementById('info-modal-body');
    if (!modal || !modalTitle || !modalBody) return;
    modalTitle.textContent = title;
    modalBody.textContent = body;
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
};

window.closeInfoModal = () => {
    const modal = document.getElementById('info-modal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.style.display = 'none';
};

// Función de Toast para notificaciones
window.showToast = (message, type = 'info') => {
    const container = document.getElementById('toast-container') || (() => {
        const div = document.createElement('div');
        div.id = 'toast-container';
        div.className = 'fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none';
        document.body.appendChild(div);
        return div;
    })();
    
    const toast = document.createElement('div');
    const colors = {
        'success': 'bg-secondary text-white',
        'error': 'bg-error text-white',
        'info': 'bg-on-surface text-surface'
    };
    
    toast.className = `${colors[type] || colors['info']} px-6 py-4 font-label-mono text-label-mono border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-pulse pointer-events-auto`;
    toast.textContent = message;
    
    container.appendChild(toast);
    
    setTimeout(() => toast.remove(), 3000);
};

// Cerrar modal al hacer clic fuera
document.getElementById('info-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'info-modal') window.closeInfoModal();
});

  const fechaHeader = document.getElementById('header-fecha-actual');
  if (fechaHeader) {
    const now = new Date();
    const months = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
    fechaHeader.textContent = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
  }

// --- MENÚ MÓVIL ---
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
let menuOpen = false;

mobileMenuBtn.addEventListener('click', () => {
    menuOpen = !menuOpen;
    if (menuOpen) {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('flex');
        mobileMenuBtn.innerHTML = '<span class="material-symbols-outlined text-3xl">close</span>';
    } else {
  const eventosRef = collection(db, 'eventos');
    }
});

window.closeMobileMenu = () => {
    menuOpen = false;
    mobileMenu.classList.add('hidden');
    mobileMenu.classList.remove('flex');
    mobileMenuBtn.innerHTML = '<span class="material-symbols-outlined text-3xl">menu</span>';
};

// 4. Lógica de captura del formulario de membresía
// Buscamos el formulario dentro del tab de membresía
const form = document.querySelector('#tab-membresia form');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Feedback visual inmediato (Estilo executive: deshabilitar botón)
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerText = "PROCESANDO...";

    // Recolección de datos basada en los IDs de tu HTML
    const formData = {
      nombres: document.getElementById('nombres').value,
      apellidos: document.getElementById('apellidos').value,
      email: document.getElementById('email').value,
      telefono: document.getElementById('telefono').value,
      universidad: document.getElementById('universidad').value,
      carrera: document.getElementById('carrera').value,
      ciclo: document.getElementById('ciclo').value,
      area_interes: document.querySelector('input[name="area"]:checked')?.value || "No especificado",
      fecha_registro: serverTimestamp(),
      status: "pendiente"
    };

    try {
      // Escritura asíncrona en Firestore
      const docRef = await addDoc(collection(db, "postulaciones_membresia"), formData);
      
      form.parentElement.innerHTML = `
        <div class="bg-primary-container text-white p-8 border-2 border-primary-container shadow-[8px_8px_0px_0px_rgba(26,28,28,1)] animate-fade-in">
            <div class="flex items-center gap-4 mb-6 border-b border-white/20 pb-4">
                <span class="material-symbols-outlined text-4xl">task_alt</span>
                <h3 class="font-headline-sm text-2xl uppercase font-black tracking-widest">Postulación Recibida</h3>
            </div>
            <div class="font-label-mono text-sm mb-4 opacity-80">SYS_TICKET_GEN: OK</div>
            <div class="bg-black/20 p-4 border border-white/20 font-label-mono text-lg mb-6">
                <span class="text-white/50 block text-xs mb-1">ID DE SEGUIMIENTO</span>
                ${docRef.id}
            </div>
            <p class="font-body-md text-white/90">Nuestros administradores revisarán su perfil. Por favor, guarde su ID de seguimiento para futuras consultas.</p>
        </div>
      `;
    } catch (error) {
      console.error("Error en Firebase:", error);
      showToast("No se pudo conectar con el servidor.", "error");
    } finally {
      if (document.body.contains(submitBtn)) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    }
  });
}

// 4.5 Lógica de captura de solicitudes de capítulo
const formCap = document.getElementById('form-capitulos');
if (formCap) {
  formCap.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerText = "PROCESANDO...";
    
    try {
      await addDoc(collection(db, "solicitudes_capitulo"), {
        universidad: document.getElementById('cap-uni').value,
        representante: document.getElementById('cap-rep').value,
        email: document.getElementById('cap-email').value,
        fecha_registro: serverTimestamp(),
        status: "pendiente"
      });
      formCap.innerHTML = `<div class="bg-surface-container-low p-6 text-center border-2 border-black"><span class="material-symbols-outlined text-primary text-4xl mb-4">check_circle</span><h4 class="font-headline-sm uppercase mb-2">Solicitud Enviada</h4><p class="font-body-md">Nuestro equipo se pondrá en contacto pronto.</p></div>`;
    } catch (error) {
      console.error("Error", error);
      showToast("Error al enviar solicitud.", "error");
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
}
// 4.6 Filtrado de Capítulos (Hardcoded DOM filtering)
function applyCapituloSearch() {
  const searchInput = document.getElementById('search-capitulos');
  if (!searchInput) return;
  const term = searchInput.value.toLowerCase();
  const articles = document.querySelectorAll('#grid-capitulos article');
  articles.forEach(article => {
    const text = article.innerText.toLowerCase();
    article.style.display = text.includes(term) ? 'flex' : 'none';
  });
};

const searchInputElem = document.getElementById('search-capitulos');
if (searchInputElem) {
  searchInputElem.addEventListener('input', applyCapituloSearch);
}

const applyEventFilters = () => {
  const activeCats = Array.from(document.querySelectorAll('.filter-evento-cat:checked')).map(cb => cb.value.toUpperCase());
  const sedeSelect = document.getElementById('filter-evento-sede');
  const activeSede = sedeSelect ? sedeSelect.value.toUpperCase() : 'ALL';

  document.querySelectorAll('#dynamic-eventos .evento-card').forEach(card => {
    const tipo = (card.getAttribute('data-tipo') || '').toUpperCase();
    const sede = (card.getAttribute('data-sede') || '').toUpperCase();
    const catMatch = activeCats.length === 0 || activeCats.some(cat => tipo.includes(cat) || cat.includes(tipo));
    const sedeMatch = activeSede === 'ALL' || sede.includes(activeSede) || activeSede.includes(sede);
    card.style.display = (catMatch && sedeMatch) ? 'flex' : 'none';
  });
};

document.querySelectorAll('.filter-evento-cat').forEach(cb => cb.addEventListener('change', applyEventFilters));
const sedeSelectDOM = document.getElementById('filter-evento-sede');
if (sedeSelectDOM) sedeSelectDOM.addEventListener('change', applyEventFilters);


// 5. Renderizado en Tiempo Real de Eventos
const eventosRef = collection(db, 'eventos');
const qEventos = query(eventosRef, orderBy('timestamp', 'desc'), limit(20));

onSnapshot(qEventos, (snapshot) => {
  const container = document.getElementById('dynamic-eventos');
  const containerPasados = document.getElementById('dynamic-eventos-pasados');
  if (!container) return;

  container.innerHTML = '';
  if (containerPasados) containerPasados.innerHTML = '';

  if (snapshot.empty) {
    container.innerHTML = '<div class="col-span-full p-12 text-center border-2 border-black bg-surface-container-low uppercase font-label-mono text-tertiary">No hay eventos programados por el momento.</div>';
    container.removeAttribute('aria-busy');
    if (containerPasados) {
      containerPasados.innerHTML = '<div class="col-span-full p-12 text-center border-2 border-dashed border-on-background uppercase font-label-mono text-tertiary opacity-60">No hay eventos pasados registrados aún.</div>';
      containerPasados.removeAttribute('aria-busy');
    }
    return;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let hasUpcoming = false;
  let hasPast = false;

  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    if (data.estado === 'BORRADOR') return;
    if (data.estado === 'PROGRAMADO' && data.fechaProgramada && new Date(data.fechaProgramada) > new Date()) return;

    const safeTitulo = escapeHTML(data.titulo);
    const safeDesc = escapeHTML((data.descripcion || '').replace(/<[^>]*>?/gm, ''));
    const safeLugar = escapeHTML(data.lugar);
    const safeTipo = escapeHTML(data.tipo || 'EVENTO');
    const safeEventId = escapeHTML(data.eventId || docSnap.id);
    const safeImagenUrl = escapeHTML(data.imagenUrl || '');
    const parts = (data.fecha || '').split('-');
    const day = parts[2] || '00';
    const monthName = { '01':'ENE','02':'FEB','03':'MAR','04':'ABR','05':'MAY','06':'JUN','07':'JUL','08':'AGO','09':'SEP','10':'OCT','11':'NOV','12':'DIC' }[parts[1]] || 'MES';
    const fechaEvento = parts[0] ? new Date(`${parts[0]}-${parts[1] || '01'}-${parts[2] || '01'}T00:00:00`) : null;
    const esPasado = fechaEvento ? fechaEvento < today : false;

    if (!esPasado) {
      hasUpcoming = true;
      const card = `
        <div data-tipo="${safeTipo.toUpperCase()}" data-sede="${safeLugar.toUpperCase()}" class="evento-card border-2 border-on-background flex flex-col md:flex-row bg-surface-container-lowest hover:border-primary transition-colors group">
          ${safeImagenUrl ? `<div class="md:w-48 border-r-2 border-on-background overflow-hidden bg-surface-container"><img src="${safeImagenUrl}" loading="lazy" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" /></div>` : ''}
          <div class="${safeImagenUrl ? 'md:w-32' : 'md:w-64'} bg-surface-container-high border-r-2 border-on-background p-6 flex flex-col justify-center items-center text-on-background group-hover:bg-primary group-hover:text-surface-container-lowest transition-colors">
            <span class="${safeImagenUrl ? 'font-headline-lg text-4xl' : 'font-display-xl text-display-xl'}">${day}</span>
            <span class="${safeImagenUrl ? 'font-label-mono text-sm' : 'font-body-lg text-body-lg'} uppercase font-bold tracking-widest">${monthName}</span>
          </div>
          <div class="p-6 flex-1 flex flex-col justify-between">
            <div>
              <div class="flex justify-between items-start mb-2">
                <span class="font-label-mono text-label-mono border border-on-background px-2 py-1 font-bold">${safeTipo}</span>
                <span class="font-label-mono text-label-mono text-tertiary">ID: ${safeEventId}</span>
              </div>
              <h3 class="font-headline-sm text-headline-sm mb-2 uppercase">${safeTitulo}</h3>
              <p class="font-body-md text-body-md text-tertiary mb-4">${safeDesc}</p>
            </div>
            <div class="flex flex-col sm:flex-row justify-between items-end sm:items-center gap-4 border-t border-surface-dim pt-4">
              <div class="flex items-center gap-1"><span class="material-symbols-outlined text-sm">location_on</span><span class="font-label-mono text-label-mono">${safeLugar}</span></div>
              <button onclick="window.location.href='pages/evento.html?id=${docSnap.id}'" class="bg-primary text-on-primary font-inter font-bold uppercase px-6 py-2 hover:bg-on-background transition-colors flex items-center gap-2">
                VER DETALLES <span class="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>`;
      container.insertAdjacentHTML('beforeend', card);
    } else if (containerPasados) {
      hasPast = true;
      const pastCard = `
        <div class="border-2 border-on-background bg-surface-container-lowest flex flex-col h-full">
          <div class="h-48 border-b-2 border-on-background bg-surface-dim relative overflow-hidden group">
            ${safeImagenUrl ? `<img alt="${safeTitulo}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" src="${safeImagenUrl}" loading="lazy"/>` : `<div class="w-full h-full flex items-center justify-center"><span class="material-symbols-outlined text-6xl text-surface-variant">event</span></div>`}
            <div class="absolute top-2 right-2 bg-on-background text-surface-container-lowest font-label-mono text-[10px] px-2 py-1">${day} ${monthName}</div>
          </div>
          <div class="p-6 flex-1 flex flex-col">
            <span class="font-label-mono text-label-mono text-primary mb-2 block uppercase">${safeTipo}</span>
            <h4 class="font-body-lg text-body-lg font-bold uppercase mb-2">${safeTitulo}</h4>
            <div class="font-label-mono text-label-mono text-tertiary mb-4">Sede: ${safeLugar}</div>
            <p class="font-body-md text-on-surface-variant flex-1">${safeDesc}</p>
          </div>
        </div>`;
      containerPasados.insertAdjacentHTML('beforeend', pastCard);
    }
  });

  if (!hasUpcoming) container.innerHTML = '<div class="col-span-full p-12 text-center border-2 border-black bg-surface-container-low uppercase font-label-mono text-tertiary">No hay eventos próximos programados.</div>';
  if (containerPasados && !hasPast) containerPasados.innerHTML = '<div class="col-span-full p-12 text-center border-2 border-dashed border-on-background uppercase font-label-mono text-tertiary opacity-60">No hay eventos pasados registrados aún.</div>';

  container.removeAttribute('aria-busy');
  if (containerPasados) containerPasados.removeAttribute('aria-busy');

  applyEventFilters();
});

// 6. Noticias: reportaje principal, actualizaciones y archivo técnico
const categoriaContador = { investigacion: 0, institucional: 0, opinion: 0, comunidad: 0 };

const sumarCategoria = (categoria) => {
  const cat = (categoria || '').toLowerCase();
  if (cat.includes('investigaci')) categoriaContador.investigacion += 1;
  else if (cat.includes('institucional')) categoriaContador.institucional += 1;
  else if (cat.includes('opini')) categoriaContador.opinion += 1;
  else if (cat.includes('comunidad')) categoriaContador.comunidad += 1;
};

async function loadReportajePrincipal() {
  try {
    let noticiaData = null;
    let noticiaDocId = null;

    const featuredSnap = await getDoc(doc(db, 'config', 'featured_noticia'));
    const featuredId = featuredSnap.exists() ? featuredSnap.data().noticiaId : null;

    if (featuredId) {
      const noticiaSnap = await getDoc(doc(db, 'noticias', featuredId));
      if (noticiaSnap.exists()) {
        const data = noticiaSnap.data();
        if (data.estado !== 'BORRADOR' && (data.estado !== 'PROGRAMADO' || !data.fechaProgramada || new Date(data.fechaProgramada) <= new Date())) {
          noticiaData = data;
          noticiaDocId = featuredId;
        }
      }
    }

    if (!noticiaData) {
      const fallbackSnap = await getDocs(query(collection(db, 'noticias'), orderBy('timestamp', 'desc'), limit(5)));
      fallbackSnap.forEach((d) => {
        if (noticiaData) return;
        const data = d.data();
        if (data.estado === 'BORRADOR') return;
        if (data.estado === 'PROGRAMADO' && (!data.fechaProgramada || new Date(data.fechaProgramada) > new Date())) return;
        noticiaData = data;
        noticiaDocId = d.id;
      });
    }

    if (!noticiaData) return;

    const imgWrapper = document.getElementById('rp-img-wrapper');
    const metaEl = document.getElementById('rp-meta');
    const titEl = document.getElementById('rp-titulo');
    const descEl = document.getElementById('rp-desc');
    const linkEl = document.getElementById('rp-link');

    const safeTitulo = escapeHTML(noticiaData.titulo || '');
    const rawDesc = String(noticiaData.descripcion || '').replace(/<[^>]*>?/gm, '');
    const safeCat = escapeHTML(noticiaData.categoria || 'GENERAL');
    const safeImagenUrl = escapeHTML(noticiaData.imagenUrl || '');

    if (imgWrapper) {
      imgWrapper.classList.remove('animate-pulse');
      imgWrapper.innerHTML = safeImagenUrl
        ? `<img alt="${safeTitulo}" class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" src="${safeImagenUrl}" loading="lazy"/>`
        : `<div class="w-full h-full bg-gradient-to-br from-black via-surface-container to-primary-container/20 flex items-center justify-center"><span class="material-symbols-outlined text-[200px] text-surface-dim">article</span></div>`;
    }
    if (metaEl) metaEl.innerHTML = `<span class="border border-primary px-2 py-1">${safeCat}</span>`;
    if (titEl) titEl.textContent = noticiaData.titulo || '';
    if (descEl) descEl.textContent = `${rawDesc.slice(0, 300)}${rawDesc.length > 300 ? '...' : ''}`;
    if (linkEl) {
      linkEl.href = `pages/noticia.html?id=${noticiaDocId}`;
      linkEl.removeAttribute('aria-disabled');
      linkEl.removeAttribute('tabindex');
      linkEl.classList.remove('cursor-not-allowed', 'opacity-60', 'pointer-events-none');
      linkEl.classList.add('hover:bg-primary', 'cursor-pointer');
    }
    const rpContainer = document.getElementById('reportaje-principal-container');
    if (rpContainer) rpContainer.removeAttribute('aria-busy');
  } catch (error) {
    console.error('Error cargando reportaje principal:', error);
    const titEl = document.getElementById('rp-titulo');
    const rpContainer = document.getElementById('reportaje-principal-container');
    if (titEl) titEl.textContent = 'No se pudo cargar el reportaje. Recarga la página.';
    if (rpContainer) { rpContainer.removeAttribute('aria-busy'); rpContainer.setAttribute('aria-label', 'Error al cargar reportaje'); }
  }
}

loadReportajePrincipal();

const qUltimas = query(collection(db, 'noticias'), orderBy('timestamp', 'desc'), limit(10));
onSnapshot(qUltimas, (snapshot) => {
  const container = document.getElementById('ultimas-actualizaciones-container');
  if (!container) return;

  container.innerHTML = '';
  categoriaContador.investigacion = 0;
  categoriaContador.institucional = 0;
  categoriaContador.opinion = 0;
  categoriaContador.comunidad = 0;

  const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
  let count = 0;

  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    if (data.estado === 'BORRADOR') return;
    if (data.estado === 'PROGRAMADO' && (!data.fechaProgramada || new Date(data.fechaProgramada) > new Date())) return;

    sumarCategoria(data.categoria || '');
    if (count >= 4) return;
    count += 1;

    const ts = data.timestamp;
    let timeStr = '';
    if (ts && ts.toDate) {
      const d = ts.toDate();
      const diffHours = Math.floor((Date.now() - d.getTime()) / 3600000);
      timeStr = diffHours < 24 ? `${diffHours < 1 ? 'HACE POCO' : `${diffHours}H`} | ` : `${d.getDate()} ${months[d.getMonth()]} | `;
    }

    const safeCat = escapeHTML(data.categoria || 'GENERAL');
    const safeTitulo = escapeHTML(data.titulo || '');

    container.insertAdjacentHTML('beforeend', `
      <a href="pages/noticia.html?id=${docSnap.id}" class="border-b border-surface-container-highest pb-4 block cursor-pointer hover:bg-surface-container-lowest transition-colors group -mx-4 px-4 last:border-b-0 last:pb-0">
        <span class="font-label-mono text-label-mono text-primary mb-1 block">${timeStr}${safeCat.toUpperCase()}</span>
        <h3 class="font-headline-sm text-[18px] leading-tight mb-1 group-hover:text-primary transition-colors">${safeTitulo}</h3>
      </a>`);
  });

  if (count === 0) container.innerHTML = '<p class="font-label-mono text-label-mono text-tertiary uppercase text-center py-6">Sin publicaciones recientes.</p>';
  container.removeAttribute('aria-busy');

  const countInvest = document.getElementById('cat-count-investigacion'); if (countInvest) countInvest.textContent = categoriaContador.investigacion || '—';
  const countInstit = document.getElementById('cat-count-institucional'); if (countInstit) countInstit.textContent = categoriaContador.institucional || '—';
  const countOpinion = document.getElementById('cat-count-opinion'); if (countOpinion) countOpinion.textContent = categoriaContador.opinion || '—';
  const countComu = document.getElementById('cat-count-comunidad'); if (countComu) countComu.textContent = categoriaContador.comunidad || '—';
});

const qNoticiasInvestigacion = query(collection(db, 'noticias'), orderBy('timestamp', 'desc'), limit(30));
onSnapshot(qNoticiasInvestigacion, (snapshot) => {
  const container = document.getElementById('dynamic-noticias');
  if (!container) return;

  container.innerHTML = '';
  let shown = 0;

  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    if (data.estado === 'BORRADOR') return;
    if (data.estado === 'PROGRAMADO' && (!data.fechaProgramada || new Date(data.fechaProgramada) > new Date())) return;
    const categoria = (data.categoria || '').toLowerCase();
    if (!categoria.includes('investigaci')) return;

    shown += 1;

    const safeTitulo = escapeHTML(data.titulo || '');
    const rawDesc = String(data.descripcion || '').replace(/<[^>]*>?/gm, '');
    const safeDesc = escapeHTML(rawDesc.slice(0, 160));
    const safeCat = escapeHTML(data.categoria || 'INVESTIGACIÓN');
    const safeNoticiaId = escapeHTML(data.noticiaId || docSnap.id);
    const safeImagenUrl = escapeHTML(data.imagenUrl || '');

    container.insertAdjacentHTML('beforeend', `
      <div class="border border-black bg-white group hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex flex-col">
        <div class="bg-black text-white p-2 flex justify-between font-label-mono text-label-mono">
          <span>ID: ${safeNoticiaId}</span><span>INVESTIGACIÓN</span>
        </div>
        <div class="h-48 w-full border-b border-black overflow-hidden bg-surface-container">
          ${safeImagenUrl ? `<img src="${safeImagenUrl}" loading="lazy" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />` : `<div class="w-full h-full flex items-center justify-center bg-surface-container-high"><span class="material-symbols-outlined text-6xl text-surface-variant">science</span></div>`}
        </div>
        <div class="p-6 flex-grow flex flex-col">
          <div class="flex gap-2 font-label-mono text-label-mono mb-4 text-tertiary">
            <span class="border border-primary px-1 uppercase text-primary">${safeCat}</span>
          </div>
          <h3 class="font-headline-sm text-[24px] uppercase leading-tight mb-4 group-hover:text-primary transition-colors">${safeTitulo}</h3>
          <p class="font-body-md text-on-surface-variant mb-6 flex-grow">${safeDesc}${rawDesc.length > 160 ? '...' : ''}</p>
          <a class="font-label-mono text-label-mono text-primary flex items-center gap-1 uppercase hover:underline" href="pages/noticia.html?id=${docSnap.id}">Leer Artículo <span class="material-symbols-outlined text-[14px]">arrow_forward</span></a>
        </div>
      </div>`);
  });

  if (shown === 0) container.innerHTML = '<div class="col-span-full p-12 text-center border-2 border-dashed border-black bg-surface-container-low uppercase font-label-mono text-tertiary opacity-60">No hay artículos de investigación publicados aún.</div>';
});

const formSuscripcion = document.getElementById('form-suscripcion');
if (formSuscripcion) {
  formSuscripcion.addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailVal = document.getElementById('email_sub').value.trim().toLowerCase();
    if (!emailVal) return;
    const btn = document.getElementById('btn-suscribirse');
    const originalText = btn ? btn.innerHTML : '';
    if (btn) {
      btn.disabled = true;
      btn.innerText = 'PROCESANDO...';
    }
    try {
      await setDoc(doc(db, 'suscriptores_boletin', emailVal), {
        email: emailVal,
        fecha_suscripcion: serverTimestamp(),
        activo: true
      });
      formSuscripcion.innerHTML = `<div class="text-center py-6"><span class="material-symbols-outlined text-primary text-5xl mb-4">mark_email_read</span><p class="font-label-mono text-label-mono text-white uppercase tracking-widest">¡Suscripción registrada!</p><p class="font-body-md text-surface-dim mt-2">Recibirás notificaciones de nuevas publicaciones en <strong>${escapeHTML(emailVal)}</strong></p></div>`;
    } catch (error) {
      console.error(error);
      showToast('Error al registrar suscripción.', 'error');
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = originalText;
      }
    }
  });
}

// 7. Renderizado en Tiempo Real de Capítulos
const capitulosRef = collection(db, 'capitulos');
const qCapitulos = query(capitulosRef, orderBy('codigo', 'asc'), limit(50));

onSnapshot(qCapitulos, (snapshot) => {
  const container = document.getElementById('grid-capitulos');
  if (!container) return;

  container.innerHTML = '';

  if (snapshot.empty) {
    container.innerHTML = '<div class="col-span-full p-12 text-center border-2 border-black bg-surface-container-low uppercase font-label-mono text-tertiary">No hay capítulos registrados en el sistema</div>';
    return;
  }

  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const bgStatus = data.estado === 'ACTIVO' ? 'bg-secondary text-white' : (data.estado === 'EN FORMACIÓN' ? 'bg-outline text-black' : 'bg-primary-container text-white');
    const txtStatus = data.estado === 'EN FORMACIÓN' ? 'bg-black text-white' : 'bg-white text-black';
    
    const imgHtml = data.imagenUrl ? `<img src="${escapeHTML(data.imagenUrl)}" class="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 transition-opacity" />` : `<span class="material-symbols-outlined text-6xl text-on-surface-variant">account_balance</span>`;
    
    const safeCod = escapeHTML(data.codigo);
    const safeUni = escapeHTML(data.universidad);
    const safeFac = escapeHTML(data.facultad);
    const safeSede = escapeHTML(data.sede);
    const safeEstado = escapeHTML(data.estado);

    const card = `
      <article class="border border-black bg-white group ${data.estado !== 'ACTIVO' ? 'opacity-75 grayscale hover:grayscale-0' : ''} hover:-translate-y-1 transition-all duration-200 flex flex-col">
        <div class="${bgStatus} font-label-mono text-label-mono p-2 border-b border-black flex justify-between items-center uppercase">
          <span class="truncate">COD: ${safeCod}</span>
          <span class="${txtStatus} px-1 whitespace-nowrap">${safeEstado}</span>
        </div>
        <div class="p-6 text-center border-b border-black aspect-video flex items-center justify-center bg-surface-container-low overflow-hidden relative">
          ${imgHtml}
        </div>
        <div class="p-6 flex flex-col flex-1">
          <h3 class="font-headline-sm text-headline-sm uppercase mb-2 line-clamp-1" title="${safeUni}">${safeUni}</h3>
          <p class="font-label-mono text-label-mono text-on-surface-variant uppercase mb-4">${safeSede}</p>
          <p class="font-body-md text-body-md text-on-surface mb-6 border-l-2 ${data.estado === 'ACTIVO' ? 'border-primary' : 'border-black'} pl-4 flex-1">${safeFac}</p>
          <${data.estado === 'ACTIVO' ? `a href="pages/capitulo.html?id=${docSnap.id}"` : 'button'} class="w-full py-3 ${data.estado === 'ACTIVO' ? 'bg-black text-white hover:bg-primary' : 'bg-transparent text-black border border-black hover:bg-black hover:text-white'} font-inter uppercase font-bold text-sm transition-colors flex justify-center items-center gap-2 mt-auto">
              ${data.estado === 'ACTIVO' ? 'VER PERFIL <span class="material-symbols-outlined text-sm">arrow_forward</span>' : 'ESTADO <span class="material-symbols-outlined text-sm">pending</span>'}
          </${data.estado === 'ACTIVO' ? 'a' : 'button'}>

        </div>
      </article>
    `;
    container.insertAdjacentHTML('beforeend', card);
  });
  // Re-aplicar búsqueda si hay un término activo
  applyCapituloSearch();
});
