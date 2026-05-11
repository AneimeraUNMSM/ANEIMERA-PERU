(function () {
  "use strict";

  const CITIES = ["Todas", "Lima", "Arequipa", "Trujillo", "Cusco", "Piura", "Huancayo", "Tacna", "Iquitos", "Chiclayo", "Puno"];
  const state = { city: "Todas", query: "" };
  let booted = false;

  function $(id) { return document.getElementById(id); }

  function pillClass(active) {
    return [
      "font-label-mono text-label-mono uppercase tracking-wider",
      "px-3 py-1.5 border-2 border-on-surface cursor-pointer transition-colors",
      active
        ? "bg-on-surface text-surface-container-lowest"
        : "bg-surface-container-lowest text-on-surface hover:bg-surface-container",
    ].join(" ");
  }

  function renderPills(citiesPresent) {
    const container = $("capitulos-city-pills");
    if (!container) return;
    container.innerHTML = "";
    const visible = ["Todas", ...CITIES.slice(1).filter((c) => citiesPresent.has(c))];
    visible.forEach((city) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.dataset.city = city;
      btn.className = pillClass(city === state.city);
      btn.textContent = city;
      btn.addEventListener("click", () => { state.city = city; applyFilter(); });
      container.appendChild(btn);
    });
  }

  function getCardCity(card) {
    if (card.dataset && card.dataset.city) return card.dataset.city;
    const txt = (card.textContent || "").toLowerCase();
    for (const c of CITIES.slice(1)) if (txt.includes(c.toLowerCase())) return c;
    return "";
  }

  function getCardSearchable(card) {
    const explicit = [card.dataset?.name, card.dataset?.code, card.dataset?.city].filter(Boolean).join(" ");
    return (explicit || card.textContent || "").toLowerCase();
  }

  function applyFilter() {
    const grid = $("grid-capitulos");
    if (!grid) return;
    const cards = Array.from(grid.children).filter(
      (el) => el.nodeType === 1 && !el.classList.contains("animate-pulse")
    );
    const citiesPresent = new Set();
    let visible = 0;

    cards.forEach((card) => {
      const city = getCardCity(card);
      if (city) citiesPresent.add(city);
      const text = getCardSearchable(card);
      const matchCity = state.city === "Todas" || city === state.city;
      const matchQ = state.query === "" || text.includes(state.query);
      const show = matchCity && matchQ;
      card.style.display = show ? "" : "none";
      if (show) visible++;
    });

    renderPills(citiesPresent);
    const countEl = $("capitulos-count");
    const totalEl = $("capitulos-total");
    if (countEl) countEl.textContent = visible;
    if (totalEl) totalEl.textContent = cards.length;
  }

  function attachSearch() {
    const input = $("search-capitulos");
    if (!input || input.dataset.cfBound) return;
    input.dataset.cfBound = "1";
    input.addEventListener("input", (e) => {
      state.query = (e.target.value || "").trim().toLowerCase();
      applyFilter();
    });
  }

  function boot() {
    if (booted) return;
    const grid = $("grid-capitulos");
    if (!grid) return;
    booted = true;
    attachSearch();
    applyFilter();
    new MutationObserver(applyFilter).observe(grid, { childList: true, subtree: false });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
  setTimeout(boot, 300);
  setTimeout(boot, 1200);
})();
