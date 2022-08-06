const khonshu_toast = document.createElement('template');
khonshu_toast.innerHTML = /*html*/ `
<style>
  #toast {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;

    position: fixed;
    bottom: 25px;
    left: 30px;
    z-index: 10;
    border-radius: 5px;
    background-color: var(--background-color);
    padding: 10px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.25);
    overflow: hidden;
    transform: translateX(calc(-30px - 100%));
    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.35);
  }

  #toast.active {
    transform: translateX(0%);
  }

  #toast[type=info] {
    border-left: 6px solid var(--info);
  }

  #content {
    display: flex;
    align-items: center;
    padding: 5px 25px 5px 10px;
    color: var(--text-color);
  }

  #icon {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3px;
    font-size: 17pt;
    color: var(--white);
    border-radius: 50%;
  }

  #icon[type=main] {
    background-color: var(--main-color);
  }

  #icon[type=success] {
    background-color: var(--success);
  }

  #icon[type=danger] {
    background-color: var(--danger);
  }

  #icon[type=warning] {
    background-color: var(--warning);
  }

  #icon[type=info] {
    background-color: var(--info);
  }



  #message {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0 15px;
  }

  #title {
    font-weight: bold;
    margin-bottom: 7px;
  }

  #close {
    color: var(--inactive);
    font-size: 32px;
    font-weight: lighter;
  }

  #close:hover,
  #close:focus {
    filter: brightness(60%);
    cursor: pointer;
  }

  #progressbar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: var(--background-color);
  }

  #progressbar:before {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0%;
    height: 100%;
    width: 100%;
  }

  #progressbar[type=main]:before {
    background-color: var(--main-color);
  }

  #progressbar[type=success]:before {
    background-color: var(--success);
  }

  #progressbar[type=danger]:before {
    background-color: var(--danger);
  }

  #progressbar[type=warning]:before {
    background-color: var(--warning);
  }

  #progressbar[type=info]:before {
    background-color: var(--info);
  }

  #progressbar.active:before {
    animation: progress 5s linear forwards;
  }

  @keyframes progress {
    100% {
      right: 100%;
    }
  }
</style>

<div id="toast">
  <div id="content">
    <div id="icon" type="info"><slot name="icon"></slot></div>

    <div id="message">
      <span id="title">Title</span>
      <span id="description"><slot>Description</slot></span>
    </div>
  </div>

  <span id="close">&times;</span>

  <div id="progressbar" type="info"></div>
</div>
`

class KhonshuToast extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(khonshu_toast.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ['title', 'type'];
  }

  get toast() {
    return this.shadowRoot.querySelector('#toast');
  }

  get icon() {
    return this.shadowRoot.querySelector('#icon');
  }

  get title() {
    return this.shadowRoot.querySelector('#title');
  }

  get close() {
    return this.shadowRoot.querySelector('#close');
  }

  get progressbar() {
    return this.shadowRoot.querySelector('#progressbar');
  }

  attributeChangedCallback(name, oldVal, newVal) {
    switch(name) {
      case 'title':
        this.title.innerHTML = newVal;
        break;

      case 'type':
        this.icon.setAttribute('type', newVal);
        this.progressbar.setAttribute('type', newVal);
        break;
    }
  }

  connectedCallback() {
    // When the user clicks on <span> (x), close the modal
    this.close.onclick = () => {
      this.hide();
    }
  }

  show() {
    this.toast.classList.add('active');
    this.progressbar.classList.add('active');

    setTimeout(() => this.hide(), 5000);
  }

  hide() {
    this.toast.classList.remove('active');
    setTimeout(() => this.progressbar.classList.remove('active'), 300);
  }
}

window.customElements.define('khonshu-toast', KhonshuToast);