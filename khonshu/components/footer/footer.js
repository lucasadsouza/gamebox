const khonshu_footer = document.createElement('template');
khonshu_footer.innerHTML = /*html*/ `
<style>
  footer {
    position: relative;
    z-index: 2;
    padding: 0;
    margin: 0 auto;
    border: 0;

    width: 100%;
    margin-top: 100px;

    display: flex;
    align-items: center;
    justify-content: space-around;
    text-align: start;

    background: var(--main-color);
    color: var(--white);
  }

  footer h5, footer h6 {
    margin: 18px;
  }

  footer h5 {
    margin-bottom: 0;
    font-size: 15pt;
  }

  footer h6 {
    font-size: 10pt;
  }


  @media (max-width: 767px) {
    footer {
      padding-bottom: 18px;
      flex-direction: column;
      text-align: center;
    }
  }
</style>

<footer>
    <div>
      <h5 id="name-version">Name | V0.0</h5>
      <h6 id="date-name-copyright">Janeiro 0000 - Name</br>Copyright</h6>
    </div>
  
    <div>
      <slot></slot>
    </div>
  </footer>
`

class KhonshuFooter extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(khonshu_footer.content.cloneNode(true));

    this.ft_name = 'Name';
    this.ft_version = '0.0';
    this.ft_date = 'Janeiro 0000';
    this.copyright = 'Copyright';
  }

  static get observedAttributes() {
    return ['name', 'date', 'version', 'copyright'];
  }

  get name_version() {
    return this.shadowRoot.querySelector('#name-version');
  }

  get date_name_copyright() {
    return this.shadowRoot.querySelector('#date-name-copyright');
  }

  attributeChangedCallback(name, oldVal, newVal) {
    switch(name) {
      case 'name':
        this.ft_name = newVal;
        this.name_version.innerHTML = `${this.ft_name} | V${this.ft_version}`;
        this.date_name_copyright.innerHTML = `${this.ft_date} - ${this.ft_name}</br>${this.ft_copyright}`;
        break;

      case 'version':
        this.ft_version = newVal;
        this.name_version.innerHTML = `${this.ft_name} | V${this.ft_version}`;
        break;

      case 'date':
        this.ft_date = newVal;
        this.date_name_copyright.innerHTML = `${this.ft_date} - ${this.ft_name}</br>${this.ft_copyright}`;
        break;

      case 'copyright':
        this.ft_copyright = newVal;
        this.date_name_copyright.innerHTML = `${this.ft_date} - ${this.ft_name}</br>${this.ft_copyright}`;
        break;
    }
  }
}

window.customElements.define('khonshu-footer', KhonshuFooter);
