const khonshu_text_input_template = document.createElement('template');
khonshu_text_input_template.innerHTML = /*html*/ `
<style>
  #text-input-container {
    margin: 0;
  }

  #text-input-container #text-input-data input {
    margin-top: 10px;
    height: 100%;
    width: 100%;
    background: var(--background-color);
    color: var(--text-color);
    font-size: 17px;
    border: none;
    border-bottom: 2px solid var(--text-color);
    transition: ease 0.3s;
  }

  #text-input-container #text-input-data input:focus {
    outline: none;
  }

  #text-input-container #text-input-data .invalid-input:invalid {
    border-bottom: 2px solid var(--danger);
  }

  #text-input-container #text-input-data input:valid {
    border-bottom: 2px solid var(--main-color);
  }

  #text-input-container #text-input-data label {
    color: var(--text-color);
  }

  @media (max-width: 767px) {
    
  }
</style>

<div id="text-input-container">
  <div id="text-input-data">
    <label><slot></slot></label>
    <input type="text" maxlength="150" autocomplete="off" required>
  </div>
</div>
`

class KhonshuTextInput extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(khonshu_text_input_template.content.cloneNode(true));
  }

  get input() {
    return this.shadowRoot.querySelector('input');
  }

  connectedCallback () {
    this.setProperties();

    this.input.addEventListener("input", function(){
      if (this.value.length == 0) {
        this.className = '';

      } else {
        this.className = 'invalid-input';
      }
    });
  }

  setProperties () {
    this.input.setAttribute("id", this.getAttribute("pass-id"));
    this.input.setAttribute("type", this.getAttribute("type"));
    this.input.setAttribute("placeholder", this.getAttribute("placeholder"));
  }
}

window.customElements.define('khonshu-text-input', KhonshuTextInput);