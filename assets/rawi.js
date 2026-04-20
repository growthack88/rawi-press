// Shared JS for Rawi Press prototype
(function () {
  // Theme
  const savedTheme = localStorage.getItem('rawi-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  window.RawiPress = {
    toggleTheme() {
      const cur = document.documentElement.getAttribute('data-theme');
      const next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('rawi-theme', next);
    },
    setLang(lang) {
      localStorage.setItem('rawi-lang', lang);
      // Just visual; real app would swap copy
      document.body.dataset.lang = lang;
    },
    lang: localStorage.getItem('rawi-lang') || 'ar',
  };

  // Wire ticker items — derived from real RAWI_CONTENT when available
  window.RAWI_WIRE_ITEMS = (window.RAWI_CONTENT && window.RAWI_CONTENT.length) ? null : [
    { tag: 'LIVE', text: 'مواجهة الوحدة والهلال — ضمن الدوري السعودي', time: '25 FEB' },
    { tag: 'WIRE', text: 'فريق نيوم ماكلارين فورمولا إي — سباق الدرعية إي بري', time: '25 FEB' },
    { tag: 'EXCLUSIVE', text: 'أبرز أحداث تطوير مدينة القدية — رؤية 2030', time: '01 FEB' },
    { tag: 'WIRE', text: 'قمة النصر والاتحاد — مواجهة اثنين من أكبر أندية الكرة السعودية', time: '05 FEB' },
    { tag: 'LIVE', text: 'مواجهة الشباب والفتح — دوري روشن السعودي', time: '25 FEB' },
  ];

  function deriveWireFromContent() {
    if (!window.RAWI_CONTENT) return null;
    const sorted = [...window.RAWI_CONTENT].sort((a,b) => b.publishedAt.localeCompare(a.publishedAt));
    return sorted.map((v,i) => ({
      tag: v.featured ? (i===0?'LIVE':'EXCLUSIVE') : 'WIRE',
      text: v.ar.title,
      time: window.formatDateAR ? window.formatDateAR(v.publishedAt).split(' ').slice(0,2).join(' ') : ''
    }));
  }

  // Build a wire ticker in place
  window.buildWireTicker = function (el, options = {}) {
    const items = window.RAWI_WIRE_ITEMS || deriveWireFromContent() || [];
    const double = [...items, ...items]; // for seamless loop
    el.classList.add('wire-ticker');
    el.innerHTML = `
      <div class="wire-ticker-label">LIVE · RAWI WIRE</div>
      <div class="wire-ticker-track">
        ${double.map(it => `
          <span class="wire-ticker-item">
            <strong>${it.tag}</strong>
            <span>${it.text}</span>
            <span class="dot">·</span>
            <span>${it.time}</span>
          </span>
        `).join('')}
      </div>
    `;
  };

  // Live clock
  window.startClock = function (el) {
    function tick() {
      const now = new Date();
      // RUH is GMT+3
      const ruh = new Date(now.getTime() + (3 * 60 - -now.getTimezoneOffset()) * 60000);
      const h = String(ruh.getUTCHours()).padStart(2, '0');
      const m = String(ruh.getUTCMinutes()).padStart(2, '0');
      const s = String(ruh.getUTCSeconds()).padStart(2, '0');
      el.textContent = `${h}:${m}:${s} RUH · GMT+3`;
    }
    tick(); setInterval(tick, 1000);
  };
})();
