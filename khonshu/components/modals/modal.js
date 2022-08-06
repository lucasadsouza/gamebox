const khonshu_modal = document.createElement('template');
khonshu_modal.innerHTML = /*html*/ `
<style>
  /* The Modal (background) */
  .modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 100; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    backdrop-filter: blur(3px);
    animation-name: animateblur;
    animation-duration: 0.4s;
  }

  /* The Close Button */
  .close {
    color: var(--inactive);
    /* float: right; */
    font-size: 42px;
    font-weight: lighter;
  }

  .close:hover,
  .close:focus {
    filter: brightness(60%);
    cursor: pointer;
  }

  /* Modal Header */
  .modal-header {
    padding: 2px 16px;
    background-color: var(--background-color);
    color: var(--text-color);
    border-bottom: 1px solid var(--border-color);
    border-radius: 5px 5px 0 0;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  /* Modal Body */
  .modal-body {padding: 2px 15px 25px 15px;}

  /* Modal Footer */
  .modal-footer {
    padding: 2px 16px;
    background-color: var(--background-color);
    color: var(--text-color);
    border-top: 1px solid var(--border-color);
    border-radius: 0 0 5px 5px;
    min-height: 60px;

    display: flex;
    align-items: center;
  }

  .modal-footer[footer-align=start] {
    justify-content: flex-start;
  }

  .modal-footer[footer-align=end] {
    justify-content: flex-end;
  }

  .modal-footer[footer-align=center] {
    justify-content: center;
  }

  .modal-footer[footer-align=space-between] {
    justify-content: space-between;
  }

  /* Modal Content */
  .modal-content {
    position: relative;
    background-color: var(--background-color);
    margin: auto;
    padding: 0;
    top: 100px;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    width: 80%;
    max-width: 650px;

    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
    animation-name: animatetop;
    animation-duration: 0.4s;
    color: var(--text-color);
  }

  .modal-body[body-align=center] {
    text-align: center;
  }

  /* Add Animation */
  @keyframes animatetop {
    from {top: -300px; opacity: 0}
    to {top: 100px; opacity: 1}
  }

  @keyframes animateblur {
    from {background-color: rgba(0,0,0,0); backdrop-filter: blur(0px);}
    to {background-color: rgba(0,0,0,0.4); backdrop-filter: blur(3px);}
  }
</style>

<!-- The Modal -->
<div id="myModal" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
    <div class="modal-header">
      <h3 id="title">Title</h3>
      <span class="close">&times;</span>
    </div>

    <div class="modal-body">
      <slot></slot>
    </div>

    <div class="modal-footer" footer-align="start">
      <slot name="footer"></slot>
    </div>
  </div>

</div>
`

class KhonshuModal extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(khonshu_modal.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ['title', 'body-align', 'footer-align'];
  }

  get modal() {
    return this.shadowRoot.querySelectorAll('.modal')[0];
  }

  get close() {
    return this.shadowRoot.querySelectorAll('.close')[0];
  }

  get title() {
    return this.shadowRoot.querySelector('#title');
  }

  get body() {
    return this.shadowRoot.querySelectorAll('.modal-body')[0];
  }

  get footer() {
    return this.shadowRoot.querySelectorAll('.modal-footer')[0];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    switch(name) {
      case 'title':
        this.title.innerHTML = newVal;
        break;

      case 'body-align':
        this.body.setAttribute('body-align', newVal);
        break;

      case 'footer-align':
        this.footer.setAttribute('footer-align', newVal);
        break;
    }
  }

  connectedCallback() {
    // When the user clicks on <span> (x), close the modal
    this.close.onclick = () => this.hide();

    // When the user clicks anywhere outside of the modal, close it
    this.modal.onclick = (event) => {
      if (event.target == this.modal) {
        this.hide();
      }
    }
  }

  show() {
    this.modal.style.display = "block";
  }

  hide() {
    this.modal.style.display = "none";
  }
}

window.customElements.define('khonshu-modal', KhonshuModal);
