const khonshu_anchor = document.createElement('template');
khonshu_anchor.innerHTML = /*html*/ `
<style>
    a {
      position: relative;
      text-decoration: none;
      white-space: nowrap;

      line-height: 1.6;
      margin: 0 2px;

      transition: all 0.3s ease;
    }

    a:hover {
      cursor: pointer;
      filter: brightness(70%);
    }

    a[size=tiny] {
      font-size: 8pt;
    }

    a[size=small] {
      font-size: 12pt;
    }

    a[size=medium] {
      font-size: 16pt;
    }

    a[size=large] {
      font-size: 20pt;
    }

    a[size=huge] {
      font-size: 24pt;
    }

    a[bg=transparent] {
      background-color: transparent;
    }

    a[bg=main] {
      background-color: var(--main-color);
    }

    a[bg=success] {
      background-color: var(--success);
    }

    a[bg=danger] {
      background-color: var(--danger);
    }

    a[bg=warning] {
      background-color: var(--warning);
    }

    a[bg=info] {
      background-color: var(--info);
    }

    a[bg-border=main] {
      border: 2px solid var(--main-color);
    }

    a[bg-border=danger] {
      border: 2px solid var(--danger);
    }

    a[bg-border=white] {
      border: 2px solid var(--danger);
    }

    a[bg-border=inactive] {
      border: 2px solid var(--inactive);
    }

    a[color=background] {
      color: var(--background-color);
    }

    a[color=black] {
      color: var(--black);
    }

    a[color=white] {
      color: var(--white);
    }

    a[color=main] {
      color: var(--main-color);
    }

    a[color=success] {
      color: var(--success);
    }

    a[color=danger] {
      color: var(--danger);
    }

    a[color=warning] {
      color: var(--warning);
    }

    a[color=info] {
      color: var(--info);
    }

    a[color=text] {
      color: var(--text-color);
    }

    a[active] {
      color: var(--active);
      background-color: transparent;
    }

    a[inactive] {
      color: var(--inactive);
      background-color: transparent;
    }

    a[inactive]:hover {
      filter: brightness(100%);
    }

    a[fill=true] {
      padding: 10px 20px;
      border-radius: 5px;
    }

    a[fill=false] {
      padding: 2px 6px;
      border-radius: 5px;
    }

    a[fill=icon] {
      padding: 3px 7px 7px 7px;
      border-radius: 5px;
    }

    a[fill=img-tag] {
      padding: 3px 6px;
      border-radius: 0 0 5px 0;
    }

    #badge {
      position: absolute;
      top: 2px;
      right: -2px;

      padding: 2px 8px 0px 7px;
      color: var(--white);
      background-color: var(--danger);
      border-radius: 5px;
      display: none;
      justify-content: center;
      align-items: center;

      font-size: 9pt;
    }

    #badge[counter=true] {
      line-height: 0;
      padding: 0;
      top: calc(50% + 1px);
      left: 50%;
      transform: translate(-50%, calc(50% + 1px));

      color: var(--text-color);
      background-color: transparent;
    }

    @media (max-width: 424px) {
      a[size=small] {
        font-size: 10pt;
      }

      a[size=medium] {
        font-size: 14pt;
      }

      a[size=large] {
        font-size: 18pt;
      }

      a[fill=true] {
        padding: 8px 12px;
      }
    }

    @media (max-width: 424px) {
      a[size=small] {
        font-size: 8pt;
      }

      a[size=medium] {
        font-size: 12pt;
      }

      a[size=large] {
        font-size: 16pt;
      }

      a[fill=true] {
        padding: 6px 10px;
      }
    }
  </style>

  <a size="small" bg="main" color="white">
    <slot></slot>
    <span id="badge" badge="0"></span>
  </a>
`

class KhonshuAnchor extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(khonshu_anchor.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ['href', 'size', 'bg', 'bg-border', 'color', 'active', 'inactive', 'fill', 'badge', 'counter'];
  }

  get element() {
    return this.shadowRoot.querySelector('a');
  }

  get badge() {
    return this.shadowRoot.querySelector('#badge');
  }

  get href() {
    return this.element.href;
  }

  attributeChangedCallback(name, oldVal, newVal) {
    switch(name) {
      case 'href':
        this.element.href = newVal;
        break;

      case 'size':
        this.element.setAttribute('size', newVal);
        break;

      case 'bg':
        this.element.setAttribute('bg', newVal);
        break;

      case 'bg-border':
        this.element.setAttribute('bg-border', newVal);
        break;

      case 'color':
        this.element.setAttribute('color', newVal);
        break;

      case 'active':
        this.element.setAttribute('active', newVal);
        break;

      case 'inactive':
        if (newVal == null) {
          this.element.removeAttribute('inactive');

        } else {
          this.element.setAttribute('inactive', newVal);
        }
        break;

      case 'fill':
        this.element.setAttribute('fill', newVal);
        break;

      case 'badge':
        this.badge.setAttribute('badge', newVal);

        if (newVal == '-') {
          this.badge.style.display = 'flex';
          this.badge.innerHTML = '?';

        } else if (newVal > 0 && newVal < 9) {
          this.badge.style.display = 'flex';
          this.badge.innerHTML = newVal;

        } else if (newVal > 9) {
          this.badge.style.display = 'flex';
          this.badge.innerHTML = '+9';

        } else {
          this.badge.style.display = 'none';
        }
        break;

      case 'counter':
        this.badge.setAttribute('counter', newVal);
        break;
    }
  }
}

window.customElements.define('khonshu-anchor', KhonshuAnchor);