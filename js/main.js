// Register service worker and set lazy-loading for images
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').then(() => {
    console.log('Service Worker registrado');
  }).catch((err) => console.warn('SW registro fallido:', err));
}

// Apply native lazy loading to any <img> without a loading attribute
document.addEventListener('DOMContentLoaded', () => {
  try {
    document.querySelectorAll('img:not([loading])').forEach(img => img.loading = 'lazy');
  } catch (e) {
    // noop
  }
});
