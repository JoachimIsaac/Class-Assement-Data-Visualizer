let overlay, textEl;

function ensure() {
  if (!overlay) {
    overlay = document.getElementById('loading-overlay');
    textEl = overlay?.querySelector('.loading-text');
  }
}

export function showLoading(message = 'Loading…') {
  ensure();
  if (!overlay) return;
  if (textEl) textEl.textContent = message;
  overlay.removeAttribute('hidden');
}

export function hideLoading() {
  ensure();
  overlay?.setAttribute('hidden', '');
}

// Optional: Add a utility for wrapping async operations
export async function withLoading(asyncFn, message = 'Loading…') {
  try {
    showLoading(message);
    return await asyncFn();
  } finally {
    hideLoading();
  }
}

// Optional: Add a utility for fetch operations with loading
export async function fetchWithLoader(url, options, message = 'Loading…') {
  try {
    showLoading(message);
    return await fetch(url, options);
  } finally {
    hideLoading();
  }
}
