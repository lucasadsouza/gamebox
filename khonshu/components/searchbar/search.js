class JaroWinkler {
  jaro (input, text) {
    if (input === '') {return 0.0}

    let m = 0;
    const s1 = input.length;
    const s2 = text.length;
    let t = 0;
    const dFactor = Math.max(s1, s2) / 2 - 1
    let match = '';
    let dMatch = '';
    let clone1, clone2;

    if (input === text) {return 1.0}

    clone1 = text;
    input.split('').map((current) => {
      if (clone1.indexOf(current) !== -1) {
        clone1 = clone1.replace(current, '');

        match += current;
        m++;
      }
    });

    if (m === 0) {return 0.0}

    clone1 = input, clone2 = text;
    match.split('').map((current) => {
      if (clone1[clone1.indexOf(current)] !== clone2[clone2.indexOf(current)]) {
        clone1.replace(current, '');
        clone2.replace(current, '');

        dMatch += current;
      }
    });

    clone1 = input, clone2 = text;
    dMatch.split('').map((current) => {
      if (clone1.indexOf(current) > clone2.indexOf(current)) {
        if ((clone1.indexOf(current) - clone2.indexOf(current)) > dFactor) {
          clone1.replace(current, '');
          clone2.replace(current, '');

          t++;

        } else if ((clone2.indexOf(current) - clone1.indexOf(current)) > dFactor) {
          clone1.replace(current, '');
          clone2.replace(current, '');

          t++;
        }
      }
    });

    return (m / s1 + m / s2 + (m - t) / m) * 1 / 3;
  }

  jaroWinkler(input, text) {
    input = input.toLocaleLowerCase();
    text = text.toLocaleLowerCase();
  
    const simJ = this.jaro(input, text);

    if (simJ == 0.0) {return 0.0}
    else if (simJ == 1.0) {return 1.0}

    const p = 0.1;
    let l = 0;

    for (let i = 0; i < text.length; i++) {
      if (text[i] !== input[i]) {break}

      l++;
    }

    let simW = simJ + ((l * p) * (1 - simJ));

    if (simW >= 1.0) {return 1.0}

    return simW;
  }
}


class Search {
  constructor (URL) {
    this.URL = URL;
  }

  _searchBox = document.querySelector("khonshu-searchbar");
  _inputBox = this._searchBox.shadowRoot.querySelector("#search-input");
  _suggBox = this._searchBox.shadowRoot.querySelector("#auto-comp-container");

  async find (get_data) {
    this.data = await get_data();

    this._inputBox.oninput = (curQuery) => {
      let query = (curQuery.target.value).toLocaleLowerCase();

      const jaroWinkler = new JaroWinkler();
      let results = {
        sortedValue: [],
        value: [],
        title: []
      };

      this.data.map((current) => {
        const simJ = jaroWinkler.jaroWinkler(query, current.title);
        results.sortedValue.push(simJ);
        results.value.push(simJ);
        results.title.push(current.title);
      });

      results.sortedValue.sort().reverse();

      let queries = [];
      if (query) {
        queries = this.data.filter((current) => {
          return current.title.toLocaleLowerCase().startsWith(query);
        });
      }

      let avoid_rerender = [];
      queries = results.sortedValue.map((current, idx) => {
        let title = results.title[results.value.indexOf(current)];
        this.data.map((cur) => {
          if (cur.title === title) {
            title = cur;
          }
        });

        if (current >= 0.70 && idx < 5) {
          let querie = `<li onclick="khonshu_navigation.navigate('${this.URL}${title.id}');" >${`${title.title}`.toLocaleLowerCase().replace(query, `<span>${query}</span>`)}</li>`;

          if (avoid_rerender.indexOf(querie) == -1) {
            avoid_rerender.push(querie);
            return querie;
          }

          return;
        }
      });

      this.show(queries);
    }
  }

  show(queries) {
    let stringQueries;
    if(queries.length) {
      stringQueries = queries.join('');
    }

    if (queries[0]) {
      this._suggBox.style.display = "block";

    } else {
      this._suggBox.style.display = "none";
    }

    this._suggBox.innerHTML = stringQueries;
  }

  select(query) {
    window.location.href = `${this.URL}?id=${query}`;
  }

  key_select() {
    let current_query = 0;
    let last_navigation_key = '';
    this._inputBox.addEventListener('keydown', (e) => {
      if (e.key == 'ArrowDown') {
        let length = this._suggBox.querySelectorAll('li').length;

        if (last_navigation_key == 'ArrowUp') {
          current_query += 2;
        }
        last_navigation_key = e.key;

        if (current_query >= length) {
          this._suggBox.querySelectorAll('li')[current_query - 1].classList.remove('selected');
          current_query = 0;
        }

        if (current_query > 0) {
          this._suggBox.querySelectorAll('li')[current_query - 1].classList.remove('selected');
        }

        this._suggBox.querySelectorAll('li')[current_query].classList.add('selected');
        this._inputBox.value = this._suggBox.querySelectorAll('li')[current_query].innerText;
        current_query++;

      } else if (e.key == 'ArrowUp') {
        let length = this._suggBox.querySelectorAll('li').length;

        if (last_navigation_key == 'ArrowDown') {
          current_query -= 2;
        }
        last_navigation_key = e.key;

        if (current_query < 0) {
          this._suggBox.querySelectorAll('li')[current_query + 1].classList.remove('selected');
          current_query = length - 1;
        }

        if (current_query < length - 1) {
          console.log('here' + current_query);
          this._suggBox.querySelectorAll('li')[current_query + 1].classList.remove('selected');
        }

        this._suggBox.querySelectorAll('li')[current_query].classList.add('selected');
        this._inputBox.value = this._suggBox.querySelectorAll('li')[current_query].innerText;
        current_query--;

      } else if (last_navigation_key == '' && e.key == 'Enter') {
        this._suggBox.querySelectorAll('li')[0].click();
        this._suggBox.style.display = "none";

      } else if (last_navigation_key == 'ArrowDown' && e.key == 'Enter') {
        this._suggBox.querySelectorAll('li')[current_query - 1].click();
        this._suggBox.style.display = "none";
        current_query = 0;
        last_navigation_key = '';

      } else if (last_navigation_key == 'ArrowUp' && e.key == 'Enter') {
        this._suggBox.querySelectorAll('li')[current_query + 1].click();
        this._suggBox.style.display = "none";
        current_query = 0;
        last_navigation_key = '';
      }
    });
  }
}
