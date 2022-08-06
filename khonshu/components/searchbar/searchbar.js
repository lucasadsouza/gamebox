const khonshu_searchbar = document.createElement('template');
khonshu_searchbar.innerHTML = /*html*/ `
<style>
  #search-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background-color: var(--background-color);
    height: 25px;
    width: 35vw;
    border-radius: 40px;
    padding: 5px 5px 5px 5px;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    transition: all 0.3s ease;
  }

  #search-container #search-input {
    border: none;
    background: none;
    outline: none;
    float: left;
    font-size: 12pt;
    color: var(--text-color);
    line-height: 20px;
    width: 83%;
    padding: 0 4px 0 5px;
    transition: 0.2s;
  }

  #search-container #auto-comp-container {
    margin: auto;
    width: 97%;
    background-color: var(--background-color);
    text-align: left;
    border-radius: 0 0 10px 10px;
    display: none;
    overflow: hidden;
  }

  #search-container #auto-comp-container hr {
    border-color: var(--border-color);
    box-sizing: border-box;
    margin: 2px 15px 5px 15px;
  }

  #search-container #auto-comp-container li {
    list-style: none;
    padding: 0;
    color: var(--text-color);
    padding: 8px 15px;
    cursor: pointer;
    text-transform: capitalize;
    max-width: 59ch;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  #search-container #auto-comp-container li:not(:last-of-type) {
    border-bottom: 1px solid var(--border-color);
  }

  #search-container #auto-comp-container li span {
    color: var(--main-color);
  }

  #search-container #search-btn {
    width: auto;
    text-align: center;
    padding: 1px;
    border-radius: 50%;
    background-color: var(--text-color);
    display: flex;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  #search-container #search-btn:hover {
    filter: brightness(70%);
  }

  #search-container #search-btn img {
    filter: invert(var(--searchbar-icon));
  }

  .selected {
    background-color: var(--border-color);
  }

  @media (max-width: 767px) {
    #search-container {
      width: 62vw;
    }
  }
</style>

<div id="search-container">
  <input type="text" id="search-input" placeholder="Pesquisar...">

  <a href="#" id="search-btn">
    <img src="https://coral-api.herokuapp.com/images/search.svg" width="24px">
  </a>

  <div id="auto-comp-container">
    <hr/>
    <li>April Showers</li>
    <li>Tanjiro Kamado No Uta</li>
    <li>Apesar de Querer</li>
    <li>One More Time, One More Chance</li>
  </div>
</div>
`

class KhonshuSearchbar extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(khonshu_searchbar.content.cloneNode(true));
  }
}

window.customElements.define('khonshu-searchbar', KhonshuSearchbar);