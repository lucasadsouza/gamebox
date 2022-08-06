const khonshu_navbar = document.createElement('template');
khonshu_navbar.innerHTML = /*html*/ `
<style>
  nav {
    z-index: 5;
    position: fixed;
    top: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: -webkit-fill-available;

    justify-content: space-between;
    align-items: center;

    padding: 10px 20px;

    background-color: var(--navbar-color);
  }

  #logo-container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;

    align-items: center;
  }

  #logo-anchor {
    padding: 10px 13px;

    text-decoration: none;
    white-space: nowrap;

    color: white;
    font-size: 16pt;

    transition: all 0.3s ease;
  }

  #main-buttons, #other-buttons {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
  }

  #profile-container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;

    justify-content: space-evenly;
    align-items: center;
  }

  ::slotted(img) {
    width: 40px;
    aspect-radio: 1 / 1;
    padding: 0 6px;
    border-radius: 50%;
  }

  @media (max-width: 767px) {
    nav {
      padding: 8px 10px;
    }

    #searchbar-container {
      width: 100%;
      martin-top: 20px;
      display: flex;
      justify-content: center;
      order: +1;
    }
  }

  @media (max-width: 767px) {
    nav {
      padding: 8px 0;
    }
  }
</style>

<nav>
  <div id="logo-container">
    <a id="logo-anchor"><slot id="logo" name="logo"></slot></a>
    <div id="main-buttons">
      <slot name="main-button-1"></slot>
      <slot name="main-button-2"></slot>
      <slot name="main-button-3"></slot>
    </div>
  </div>

  <div id="searchbar-container">
    <slot id="searchbar" name="searchbar"></slot>
  </div>

  <div id="profile-container">
    <div id="other-buttons">
      <slot name="other-button-1"></slot>
      <slot name="other-button-2"></slot>
      <slot name="other-button-3"></slot>
    </div>
    <slot id="profile" name="profile"></slot>
  </div>
</nav>
`

class KhonshuNavbar extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(khonshu_navbar.content.cloneNode(true));
  }
}

window.customElements.define('khonshu-navbar', KhonshuNavbar);