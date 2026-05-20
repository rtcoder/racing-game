class ControlsInfo extends HTMLElement {
  constructor() {
    super();
    this._root = this.attachShadow({mode: 'open'});
    this.renderHtml(this.getAttribute('type'));
  }

  renderHtml(type) {
    const rows = type === 'touch'
      ? [
        {keys: ['↑'], label: 'Gas'},
        {keys: ['↓'], label: 'Brake'},
        {keys: ['←'], label: 'Left'},
        {keys: ['→'], label: 'Right'}
      ]
      : [
        {keys: ['W', '↑'], label: 'Gas'},
        {keys: ['S', '↓'], label: 'Brake'},
        {keys: ['A', '←'], label: 'Left'},
        {keys: ['D', '→'], label: 'Right'}
      ];

    const hint = type === 'touch' ? 'Swipe' : 'Keyboard';

    this._root.innerHTML = `
      <section class="controls-info" aria-label="Controls">
        <div class="header">
          <span class="dot"></span>
          <span>${hint}</span>
        </div>
        <div class="grid">
          ${rows.map(row => `
            <div class="row">
              <div class="keys">
                ${row.keys.map(key => `<span class="key">${key}</span>`).join('')}
              </div>
              <span class="label">${row.label}</span>
            </div>
          `).join('')}
        </div>
      </section>

      <style>
        :host {
          display: block;
        }

        .controls-info {
          padding: 14px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 8px;
          background: rgba(11, 14, 18, 0.78);
          box-shadow: 0 18px 42px rgba(0, 0, 0, 0.28);
          backdrop-filter: blur(10px);
        }

        .header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
          color: #f5f7fb;
          font: 800 13px/1 ui-sans-serif, system-ui, sans-serif;
          text-transform: uppercase;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #20c7df;
          box-shadow: 0 0 14px rgba(32, 199, 223, 0.8);
        }

        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px 10px;
        }

        .row {
          display: flex;
          align-items: center;
          min-width: 0;
          gap: 8px;
          color: #d9e0ea;
          font: 700 13px/1 ui-sans-serif, system-ui, sans-serif;
        }

        .keys {
          display: flex;
          gap: 4px;
          flex: 0 0 auto;
        }

        .key {
          display: inline-grid;
          place-items: center;
          min-width: 26px;
          height: 26px;
          padding: 0 6px;
          border: 1px solid rgba(255, 255, 255, 0.28);
          border-bottom-color: rgba(255, 255, 255, 0.12);
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
          font-weight: 900;
        }

        .label {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        @media (max-width: 360px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
      </style>
    `;
  }

  setType(type) {
    this.renderHtml(type);
  }

  static get observedAttributes() {
    return ['type'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'type' && oldValue !== newValue) {
      this.setType(newValue);
    }
  }
}

window.customElements.define('controls-info', ControlsInfo);
