(function () {
  "use strict";

  const MODAL_ID = "noticia-modal";

  function buildModal() {
    if (document.getElementById(MODAL_ID)) return;
    const m = document.createElement("div");
    m.id = MODAL_ID;
    m.setAttribute("role", "dialog");
    m.setAttribute("aria-modal", "true");
    m.setAttribute("aria-labelledby", "noticia-modal-title");
    m.className = "fixed inset-0 z-[80] bg-black/80 p-4 overflow-y-auto";
    m.style.display = "none";
    m.innerHTML = `
      <div class="max-w-3xl mx-auto my-8 bg-surface-container-lowest border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" id="noticia-modal-card">
        <div class="flex items-center justify-between border-b-2 border-black bg-on-surface text-surface-container-lowest px-6 py-4 gap-4">
          <div class="flex gap-3 items-center flex-wrap min-w-0">
            <span id="noticia-modal-tag" class="font-label-mono text-label-mono uppercase px-2 py-1 bg-primary-container text-surface-container-lowest tracking-widest whitespace-nowrap"></span>
            <span id="noticia-modal-date" class="font-label-mono text-label-mono text-surface-dim uppercase truncate"></span>
          </div>
          <button type="button" id="noticia-modal-close" aria-label="Cerrar"
            class="font-label-mono text-label-mono uppercase hover:text-primary-container transition-colors whitespace-nowrap">
            Cerrar ✕
          </button>
        </div>
        <div class="px-6 py-8 md:px-10 md:py-10">
          <h2 id="noticia-modal-title" class="font-headline-md text-headline-md uppercase mb-3 leading-tight"></h2>
          <div id="noticia-modal-meta" class="flex flex-wrap gap-4 font-label-mono text-label-mono text-tertiary mb-6 pb-4 border-b border-on-surface uppercase"></div>
          <div id="noticia-modal-image" class="w-full aspect-[16/9] border-2 border-black mb-6 bg-surface-container overflow-hidden circuit-pattern flex items-end p-4"></div>
          <div id="noticia-modal-body" class="font-body-lg text-body-lg text-on-surface-variant leading-relaxed space-y-4"></div>
        </div>
        <div class="border-t-2 border-black px-6 py-4 flex justify-end bg-surface-container-low">
          <button type="button" id="noticia-modal-close-2"
            class="border-2 border-on-surface text-on-surface font-inter uppercase font-bold text-xs px-6 py-3 hover:bg-surface-container-highest transition-colors tracking-widest bg-surface-container-lowest">
            Cerrar
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(m);
    m.addEventListener("click", (e) => { if (e.target === m) close(); });
    m.querySelector("#noticia-modal-close").addEventListener("click", close);
    m.querySelector("#noticia-modal-close-2").addEventListener("click", close);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && m.style.display !== "none") close();
    });
  }

  function open(data) {
    buildModal();
    const m = document.getElementById(MODAL_ID);
    if (!m) return;
    data = data || {};

    const tag = (data.tag || data.categoria || "EDITORIAL").toString().toUpperCase();
    const date = data.date || data.fecha || "";
    const title = data.title || data.titulo || "Sin título";
    const author = data.author || data.autor || "";
    const readTime = data.readTime || data.tiempoLectura || "";
    const summary = data.summary || data.resumen || data.desc || "";
    const content = data.content || data.contenido || "";
    const image = data.image || data.imagen || "";
    const photo = data.photo || "";

    document.getElementById("noticia-modal-tag").textContent = tag;
    document.getElementById("noticia-modal-date").textContent = date;
    document.getElementById("noticia-modal-title").textContent = title;

    const meta = document.getElementById("noticia-modal-meta");
    meta.innerHTML = "";
    if (author) {
      const a = document.createElement("span");
      a.innerHTML = `POR <strong class="text-on-surface">${escapeHtml(author)}</strong>`;
      meta.appendChild(a);
    }
    if (readTime) {
      const r = document.createElement("span");
      r.textContent = readTime;
      meta.appendChild(r);
    }

    const img = document.getElementById("noticia-modal-image");
    img.innerHTML = "";
    if (image) {
      const el = document.createElement("img");
      el.src = image;
      el.alt = title;
      el.loading = "lazy";
      el.className = "w-full h-full object-cover";
      img.appendChild(el);
      img.classList.remove("circuit-pattern", "p-4");
    } else {
      img.classList.add("circuit-pattern", "p-4");
      img.innerHTML = `<span class="font-label-mono text-label-mono uppercase tracking-widest text-tertiary">${escapeHtml(photo || "IMAGEN · PLACEHOLDER")}</span>`;
    }

    const body = document.getElementById("noticia-modal-body");
    body.innerHTML = "";
    if (summary) {
      const lead = document.createElement("p");
      lead.className = "text-xl font-bold text-on-surface border-l-2 border-primary-container pl-4";
      lead.textContent = summary;
      body.appendChild(lead);
    }
    if (content) {
      content.split(/\n\s*\n/).forEach((para) => {
        const p = document.createElement("p");
        p.textContent = para.trim();
        body.appendChild(p);
      });
    } else if (!summary) {
      const p = document.createElement("p");
      p.className = "italic text-tertiary";
      p.textContent = "Contenido completo no disponible en esta vista previa.";
      body.appendChild(p);
    }

    m.style.display = "";
    document.body.style.overflow = "hidden";
    setTimeout(() => document.getElementById("noticia-modal-close")?.focus(), 50);
  }

  function close() {
    const m = document.getElementById(MODAL_ID);
    if (!m) return;
    m.style.display = "none";
    document.body.style.overflow = "";
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]
    );
  }

  function deriveFromCard(card) {
    if (!card) return {};
    const jsonHost = card.closest("[data-noticia-json]");
    if (jsonHost) {
      try { return JSON.parse(jsonHost.dataset.noticiaJson); } catch (_) {}
    }
    const data = {};
    const rpTitle = document.getElementById("rp-titulo");
    const rpDesc = document.getElementById("rp-desc");
    const rpMeta = document.getElementById("rp-meta");
    if (card.closest("#reportaje-principal-container") && rpTitle) {
      data.title = rpTitle.textContent?.trim();
      data.summary = rpDesc?.textContent?.trim();
      data.tag = rpMeta?.querySelector("[data-tag], .tag, span")?.textContent?.trim();
      data.date = rpMeta?.textContent?.trim();
      const imgEl = card.querySelector("img");
      if (imgEl) data.image = imgEl.src;
      return data;
    }
    const heading = card.querySelector("h1, h2, h3, h4");
    const summary = card.querySelector("p");
    const imgEl = card.querySelector("img");
    const tagEl = card.querySelector("[data-tag], .tag");
    data.title = heading?.textContent?.trim() || card.textContent?.trim().slice(0, 80);
    data.summary = summary?.textContent?.trim();
    data.tag = tagEl?.textContent?.trim() || "Noticia";
    if (imgEl) data.image = imgEl.src;
    return data;
  }

  const NOTICIA_CONTAINERS = "#reportaje-principal-container, #ultimas-actualizaciones-container, #dynamic-noticias";

  function onDocumentClick(e) {
    const explicit = e.target.closest("[data-noticia-open]");
    if (explicit) {
      e.preventDefault();
      e.stopPropagation();
      open(deriveFromCard(explicit));
      return;
    }
    const link = e.target.closest("a");
    if (!link) return;
    const inNoticias = link.closest(NOTICIA_CONTAINERS);
    if (!inNoticias) return;
    const href = link.getAttribute("href") || "";
    if (/^https?:\/\//i.test(href) && !href.includes(location.host)) return;
    e.preventDefault();
    e.stopPropagation();
    const card = link.closest("article") || link.closest("[class*='border-2']") || link.parentElement;
    open(deriveFromCard(card || link));
  }

  document.addEventListener("click", onDocumentClick, true);

  window.openNoticiaModal = open;
  window.closeNoticiaModal = close;
})();
