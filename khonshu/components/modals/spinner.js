const khonshu_modal_spinner = document.createElement('template');
khonshu_modal_spinner.innerHTML = /*html*/ `
<style>
  /* The Modal (background) */
  .modal {
    display: none; /* none Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 999999; /* Sit on top */
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

  #spinner {
    box-sizing: border-box;
    position: absolute;
    top: calc(50% - 30px);
    left: calc(50% - 30px);
    height: 60px;
    width: 60px;

    display: flex;
    align-items: center;
    justify-content: center;
    animation: animateopacity 0.4s;
  }

  #spinner:after {
    content: "";
    box-sizing: border-box;
    position: absolute;
    top: calc(50% - 30px);
    left: calc(50% - 30px);
    height: 60px;
    width: 60px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: var(--main-color);
    border-bottom-color: var(--main-color);
    animation: spinner 0.7s linear infinite;
  }

  #icon {
    color: var(--white);
    font-size: 35px;
  }

  /* Add Animation */
  @keyframes spinner {
    to {transform: rotate(360deg)};
  }

  @keyframes animateopacity {
    from {opacity: 0};
    to {opacity: 1};
  }

  @keyframes animateblur {
    from {background-color: rgba(0,0,0,0); backdrop-filter: blur(0px);};
    to {background-color: rgba(0,0,0,0.4); backdrop-filter: blur(3px);};
  }
</style>

<!-- The Modal -->
<div id="myModal" class="modal">
  <div id="spinner"><slot id="icon"></slot></div>
</div>
`

class KhonshuModalSpinner extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(khonshu_modal_spinner.content.cloneNode(true));
  }

  get modal() {
    return this.shadowRoot.querySelectorAll('.modal')[0];
  }

  show() {
    this.modal.style.display = "block";
  }

  hide() {
    setTimeout(() => this.modal.style.display = "none", 500);
  }
}

window.customElements.define('khonshu-modal-spinner', KhonshuModalSpinner);
