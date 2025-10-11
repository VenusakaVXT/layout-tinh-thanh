// Normalize Lucide SVG sizes to TailwindCSS classes
// - If an SVG already has w-(n) and h-(n) classes, keep them
// - Else, if SVG has numeric width/height attributes (e.g. 24), add w-6 / h-6
// - Works by wrapping lucide.createIcons and normalizing after replacement

(function () {
  if (typeof window === 'undefined') return;

  function pxToTailwindSize(px) {
    var num = parseFloat(px);
    if (!isFinite(num)) return null;
    var unitless = num / 4; // Tailwind spacing: 1 -> 4px, 6 -> 24px
    if (Number.isInteger(unitless)) return String(unitless);
    return null;
  }

  function hasBaseSizeClass(className) {
    return /(^|\s)w-\d+(\.\d+)?(\s|$)/.test(className) && /(^|\s)h-\d+(\.\d+)?(\s|$)/.test(className);
  }

  function normalizeSvgSize(root) {
    var scope = root || document;
    var svgs = scope.querySelectorAll('svg.lucide[data-lucide]');
    if (!svgs || !svgs.length) return;
    for (var i = 0; i < svgs.length; i++) {
      var svg = svgs[i];
      var cls = svg.getAttribute('class') || '';
      var hasW = /(^|\s)w-\d+(\.\d+)?(\s|$)/.test(cls);
      var hasH = /(^|\s)h-\d+(\.\d+)?(\s|$)/.test(cls);
      if (hasW && hasH) continue;

      var widthAttr = svg.getAttribute('width');
      var heightAttr = svg.getAttribute('height');

      if (!hasW && widthAttr) {
        var wUtil = pxToTailwindSize(widthAttr);
        if (wUtil) svg.classList.add('w-' + wUtil);
      }
      if (!hasH && heightAttr) {
        var hUtil = pxToTailwindSize(heightAttr);
        if (hUtil) svg.classList.add('h-' + hUtil);
      }
    }
  }

  function preNormalizeIElements(root) {
    var scope = root || document;
    var hosts = scope.querySelectorAll('[data-lucide]');
    if (!hosts || !hosts.length) return;
    for (var i = 0; i < hosts.length; i++) {
      var el = hosts[i];
      var cls = el.getAttribute('class') || '';
      var hasW = /(^|\s)w-\d+(\.\d+)?(\s|$)/.test(cls);
      var hasH = /(^|\s)h-\d+(\.\d+)?(\s|$)/.test(cls);
      if (hasW && hasH) continue;

      var widthAttr = el.getAttribute('width');
      var heightAttr = el.getAttribute('height');
      if (!hasW && widthAttr) {
        var wUtil = pxToTailwindSize(widthAttr);
        if (wUtil) el.classList.add('w-' + wUtil);
      }
      if (!hasH && heightAttr) {
        var hUtil = pxToTailwindSize(heightAttr);
        if (hUtil) el.classList.add('h-' + hUtil);
      }
    }
  }

  function wrapCreateIcons() {
    if (!window.lucide || typeof window.lucide.createIcons !== 'function') return;
    var original = window.lucide.createIcons;
    window.lucide.createIcons = function (options) {
      var opts = options || {};
      var root = opts.root || document;
      try { preNormalizeIElements(root); } catch (e) { /* noop */ }
      var result = original.call(window.lucide, opts);
      try { normalizeSvgSize(root); } catch (e) { /* noop */ }
      return result;
    };
  }

  // If Lucide is already loaded, wrap immediately; otherwise wait for load
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    wrapCreateIcons();
  } else {
    var ready = false;
    var tryWrap = function () {
      if (ready) return;
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        ready = true;
        wrapCreateIcons();
      }
    };
    document.addEventListener('DOMContentLoaded', tryWrap);
    window.addEventListener('load', tryWrap);
  }
})();


