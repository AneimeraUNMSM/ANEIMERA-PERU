(function () {
  const endpoint = window.__RUM_ENDPOINT__ || '/api/rum';
  const enabled = window.__RUM_ENABLED__ !== false;

  if (!enabled || !('PerformanceObserver' in window)) return;

  const metrics = {
    path: location.pathname,
    ts: Date.now(),
    lcp: null,
    cls: 0,
    fcp: null,
    ttfb: null
  };

  try {
    const nav = performance.getEntriesByType('navigation')[0];
    if (nav) metrics.ttfb = Math.round(nav.responseStart);
  } catch (e) {}

  const send = () => {
    const body = JSON.stringify(metrics);
    if (navigator.sendBeacon) {
      navigator.sendBeacon(endpoint, new Blob([body], { type: 'application/json' }));
    } else {
      fetch(endpoint, { method: 'POST', headers: { 'content-type': 'application/json' }, body, keepalive: true }).catch(() => {});
    }
  };

  try {
    new PerformanceObserver((list) => {
      const entry = list.getEntries().pop();
      if (entry) metrics.fcp = Math.round(entry.startTime);
    }).observe({ type: 'paint', buffered: true });
  } catch (e) {}

  try {
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) metrics.cls += entry.value;
      }
    }).observe({ type: 'layout-shift', buffered: true });
  } catch (e) {}

  try {
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const last = entries[entries.length - 1];
      if (last) metrics.lcp = Math.round(last.startTime);
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (e) {}

  window.addEventListener('pagehide', send, { once: true });
  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') send();
  });
})();
