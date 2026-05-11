(function () {
  "use strict";

  const TAGS = [
    { value: "__ALL__", label: "Todos" },
    { value: "Conferencia", label: "Conferencias" },
    { value: "Visita", label: "Visitas" },
    { value: "Taller", label: "Talleres" },
    { value: "Networking", label: "Networking" },
  ];

  let booted = false;
  let active = "__ALL__";

  function $(id) { return document.getElementById(id); }

  function pillClass(isActive) {
    return [
      "font-label-mono text-label-mono uppercase tracking-wider",
      "px-4 py-2 border-2 border-on-surface cursor-pointer transition-colors",
      isActive
        ? "bg-on-surface text-surface-container-lowest"
        : "bg-surface-container-lowest text-on-surface hover:bg-surface-container",
    ].join(" ");
  }

  function render() {
    const row = $("eventos-tag-pills");
    if (!row) return;
    row.innerHTML = "";
    TAGS.forEach((t) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.dataset.tagValue = t.value;
      btn.className = pillClass(t.value === active);
      btn.textContent = t.label;
      btn.addEventListener("click", () => { active = t.value; sync(); applyDomFilter(); render(); });
      row.appendChild(btn);
    });
  }

  function sync() {
    document.querySelectorAll(".filter-evento-cat").forEach((cb) => {
      cb.checked = active !== "__ALL__" && cb.value === active;
      cb.dispatchEvent(new Event("change", { bubbles: true }));
    });
  }

  function applyDomFilter() {
    const list = $("dynamic-eventos");
    if (!list) return;
    const items = Array.from(list.children).filter(
      (el) => el.nodeType === 1 && !el.classList.contains("animate-pulse")
    );
    let visible = 0;
    items.forEach((item) => {
      const tag = item.dataset?.tag || "";
      const show = active === "__ALL__" || tag === "" || tag === active;
      if (item.dataset?.tag) item.style.display = show ? "" : "none";
      if (show) visible++;
    });
    const counter = $("eventos-visible-count");
    if (counter) counter.textContent = visible || items.length;
  }

  function boot() {
    if (booted) return;
    const row = $("eventos-tag-pills");
    if (!row) return;
    booted = true;
    render();
    applyDomFilter();
    const list = $("dynamic-eventos");
    if (list) new MutationObserver(applyDomFilter).observe(list, { childList: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
  setTimeout(boot, 300);
  setTimeout(boot, 1200);
})();
