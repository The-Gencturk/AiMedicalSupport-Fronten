const Theme = {
  modes: ['light', 'system', 'dark'],
  icons: {
    light: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
      <circle cx="12" cy="12" r="4"/>
      <line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>`,
    system: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
    </svg>`,
    dark: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>`
  },

  init() {
    const saved = localStorage.getItem('theme') || 'system';
    this._applyTheme(saved);
    this._injectStyles();
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if ((localStorage.getItem('theme') || 'system') === 'system') {
        this._applyTheme('system');
      }
    });
  },

  _isDark(mode) {
    return mode === 'dark' ||
      (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  },

  _applyTheme(mode) {
    document.documentElement.setAttribute('data-theme', this._isDark(mode) ? 'dark' : 'light');
    localStorage.setItem('theme', mode);
    this._updateToggle(mode);
  },

  _updateToggle(mode) {
    const idx = this.modes.indexOf(mode);
    const indicator = document.getElementById('_themeIndicator');
    const btns = document.querySelectorAll('._themeBtn');
    if (!indicator) return;
    indicator.style.transform = `translateX(calc(${idx} * (100% + 2px)))`;
    btns.forEach((btn, i) => btn.classList.toggle('_active', i === idx));
  },

  set(mode) {
    this._applyTheme(mode);
  },

  _injectStyles() {
    if (document.getElementById('_themeStyles')) return;
    const style = document.createElement('style');
    style.id = '_themeStyles';
    style.textContent = `
      #_themeToggle {
        display: inline-flex;
        align-items: center;
        background: var(--bg-card);
        border: 1px solid var(--border);
        border-radius: 999px;
        padding: 3px;
        position: relative;
        gap: 2px;
      }
      #_themeIndicator {
        position: absolute;
        top: 3px; left: 3px;
        width: calc((100% - 10px) / 3);
        height: calc(100% - 6px);
        background: var(--accent-light);
        border-radius: 999px;
        transition: transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
        pointer-events: none;
        opacity: 0.2;
      }
      ._themeBtn {
        position: relative; z-index: 1;
        display: flex; align-items: center; justify-content: center;
        flex: 1;
        width: 36px; height: 36px;
        border-radius: 999px;
        border: none; background: none;
        cursor: pointer;
        color: var(--text-muted);
        transition: color 0.2s, transform 0.15s;
      }
      ._themeBtn:hover { transform: scale(1.1); }
      ._themeBtn:active { transform: scale(0.95); }
      ._themeBtn._active { color: var(--accent); }
      ._themeBtn svg { display: block; pointer-events: none; }
    `;
    document.head.appendChild(style);
  },
renderToggle(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const saved = localStorage.getItem('theme') || 'system';
    const idx = this.modes.indexOf(saved);
    container.innerHTML = `
      <div id="_themeToggle">
        <div id="_themeIndicator" style="transform: translateX(calc(${idx} * (100% + 2px)))"></div>
        ${this.modes.map((mode, i) => `
          <button class="_themeBtn ${i === idx ? '_active' : ''}" onclick="Theme.set('${mode}')">
            ${this.icons[mode]}
          </button>
        `).join('')}
      </div>
    `;
  }      

};        

Theme.init();