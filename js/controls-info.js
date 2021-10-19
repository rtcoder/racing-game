class ControlsInfo extends HTMLElement {
  constructor() {
    super();
    const controlsType = this.getAttribute('type');
    this._root = this.attachShadow({mode: 'open'});

    this.renderHtml(controlsType);
  }

  renderHtml(type) {
    const touchControls = `
    <div class="touch-controls">
        <p>Swipe</p>
        <div class="row">
          <div class="keys">
            <div class="key">⇧</div>
          </div>
          <div>Accelerate</div>
  
        </div>
        <div class="row">
          <div class="keys">
            <div class="key">⇩</div>
          </div>
          <div>Brake</div>
  
        </div>
        <div class="row">
          <div class="keys">
            <div class="key">⇦</div>
          </div>
          <div>Turn left</div>
  
        </div>
        <div class="row">
          <div class="keys">
            <div class="key">⇨</div>
          </div>
          <div>Turn right</div>
  
        </div>
      </div>
    `;
    const keyboardControls = `
    <div class="keyboard-controls">
        <div class="row">
          <div class="keys">
            <div class="key">W</div>
            <span>/</span>
            <div class="key">⇧</div>
          </div>
          <div>Accelerate</div>
  
        </div>
        <div class="row">
          <div class="keys">
            <div class="key">S</div>
            <span>/</span>
            <div class="key">⇩</div>
          </div>
          <div>Brake</div>
  
        </div>
        <div class="row">
          <div class="keys">
            <div class="key">A</div>
            <span>/</span>
            <div class="key">⇦</div>
          </div>
          <div>Turn left</div>
  
        </div>
        <div class="row">
          <div class="keys">
            <div class="key">D</div>
            <span>/</span>
            <div class="key">⇨</div>
          </div>
          <div>Turn right</div>
  
        </div>
      </div>
`;

    const styles = `
    <style>
    
      .row,
      .row .keys{
        display: flex;
        align-items: center;
      }
      .row .keys{
        margin-right: 10px;
      }
      
      .row span {
        margin: 0 5px
      }
      
      .key {
        border-radius: 5px;
        border: 1px solid #ccc;
        padding: 3px;
        margin: 2px;
        width: 24px;
        text-align: center;
      }
      
    </style>
    `;

    const container = `
    <div class="controls-info">
      ${type === 'touch' ?
        touchControls
        : keyboardControls}
    </div>
    `;

    this._root.innerHTML = `
    ${container}
    
    ${styles}
    `;
  }

  setType(type) {
    this.renderHtml(type);
  }


  static get observedAttributes() {
    return ['type'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'type') {
      this.setType(newValue);
    }
  }
}

window.customElements.define('controls-info', ControlsInfo);
