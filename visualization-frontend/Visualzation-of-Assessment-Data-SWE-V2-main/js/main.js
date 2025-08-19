//css and javscript are interpreted here.
import '/styles/css/style.css';
import '/styles/scss/main.scss';
import '/js/plotModal.js';
import '/js/inputModal.js';
import '/js/inputting.js';
import '/js/plotting.js';

// Mark app as ready after CSS and fonts are loaded to prevent FOUC
const markReady = () => document.body.classList.add('ready');

if (document.readyState === 'complete') {
  (document.fonts?.ready || Promise.resolve()).then(markReady);
} else {
  window.addEventListener('load', () => (document.fonts?.ready || Promise.resolve()).then(markReady));
}


