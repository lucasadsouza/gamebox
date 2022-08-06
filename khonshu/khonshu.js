class View {
  constructor(title, view_file) {
    this.title = title;
    this.view_file = view_file;
  }

  setTitle() {
    document.title = this.title;
  }

  async getHTML() {
    let view_html = await (await fetch(this.view_file)).text();
    return view_html;
  }
}


class Navigation {
  constructor(routes) {
    this.routes = routes;
  }

  async router() {
    const potentialMatches = this.routes.map(route => {
      return {
        route: route,
        isMatch: location.pathname === route.path
      }
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

    // handle 404.
    if (!match) {
      match = {
        route: this.routes[0],
        isMatch: true
      }

      this.navigate(match.route.path);
    }

    match.route.view.setTitle();
    document.querySelector('#khonshu-view').innerHTML = await match.route.view.getHTML();

    await match.route.actions.map(async (action) => await action());
  }

  navigate(url) {
    history.pushState(null, null, url);

    this.router();
  }


  run() {
    document.addEventListener('DOMContentLoaded', () => {
      document.body.addEventListener('click', e => {
        if (e.target.matches('[khonshu-link]')) {
          e.preventDefault();
          this.navigate(e.target.href);

        } else if (e.target.parentElement.matches('[khonshu-link]')) {
          e.preventDefault();
          this.navigate(e.target.parentElement.href);
        }
      });

      this.router();
    });

    window.onpopstate = this.router;
  }
}



class ChangeThemer {
  constructor(light_icon, dark_icon) {
    this.dark = 'dark';
    this.light = 'light';
    this.key_name = 'theme';

    this.body = document.querySelector('body');
    this.icon = document.querySelector('#khonshu-theme-icon');
    this.icon_name = {light: light_icon, dark: dark_icon};
  }

  load_theme() {
    this.theme = localStorage.getItem(this.key_name);

    if (this.theme == null) {
      this.theme = this.body.getAttribute(this.key_name);
      localStorage.setItem(this.key_name, this.theme);
    }

    this.body.setAttribute(this.key_name, this.theme);
    this.icon.className = this.icon_name[this.theme];
  }

  change_theme() {
    if (this.theme === this.dark) {
      localStorage.setItem(this.key_name, this.light);

    } else {
      localStorage.setItem(this.key_name, this.dark);
    }

    this.load_theme();
  }
}


class ListRender {
  render(data, target, template_handler, optional=null, show_spinner=false) {
    data.forEach(async (item, idx) => {
      const to_render = await template_handler(item, idx, optional);
      if (to_render) {
        target.appendChild(document.importNode(to_render.content, true));
      }
    });
  }
}


var Khonshu = {Navigation: Navigation, View: View, ChangeThemer: ChangeThemer, ListRender: ListRender};
