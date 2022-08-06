const textareainputTemplate = document.createElement('template');
textareainputTemplate.innerHTML = `
<style>
  #text-input-container {
    margin: 0;
    /*box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);*/
  }

  #text-input-container #text-input-data textarea {
    margin-top: 10px;
    height: 100%;
    width: 100%;
    background: var(--textinput-background-color);
    color: var(--textinput--text-color);
    font-size: 17px;
    border: 2px solid black;
    border-radius: 5px;
    text-align: center;
    resize: none;
    transition: ease 0.3s;
  }

  #text-input-container #text-input-data textarea:focus {
    outline: none;
  }

  #text-input-container #text-input-data textarea:valid {
    border: 2px solid var(--textinput-margin-color);
  }

  #text-input-container #text-input-data label {
    font-family: var(--modern-family-font);
    color: var(--textinput-label-color);
  }

  @media (max-width: 767px) {
    
  }
</style>

<div id="text-input-container">
  <div id="text-input-data">
    <label><b><slot name="textarea-input-label"></slot></b></label>
    <textarea autocomplete="off" required></textarea>
  </div>
</div>
`

class slTextareaInput extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(textareainputTemplate.content.cloneNode(true));
  }

  connectedCallback () {
    this.setProperties();
  }

  setProperties () {
    this.shadowRoot.querySelector("textarea").setAttribute("rows", this.getAttribute("pass_rows"));
  }
}

window.customElements.define('sl-textarea-input', slTextareaInput);