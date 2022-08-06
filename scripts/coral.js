//makes it easy to concatenate the paths of an url
Object.defineProperty(String.prototype, 'coral_url', {
  value: function () {
    resp = this;
    args = Array.from(arguments);

    args.map((cur) => {
      resp += '/' + cur;
    });

    return resp;
  }
});


// REST requests types
const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';

// Coral is a class responsible for managing CoralAPI requests
class Coral {
  //url = 'http://127.0.0.1:5000';
  //url =  'https://coral.loca.lt';
  url = 'https://coral-api.herokuapp.com';
  _users = 'users';
  _games = 'games';
  _genres = 'genres';


  // It does the requests
  async do_fetch (path, method, body={}) {
    if (method === 'GET' || method === 'DELETE') {
      return await fetch(this.url.coral_url(path), {
        method: method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

    } else {
      return await fetch(this.url.coral_url(path), {
        method: method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
    };
  }


  async create_user (nickname, age, token) {
    let user = {nickname: nickname, token: token, age: age};
    return await this.do_fetch(this._users, POST, user);
  }


  async update_user (nickname, age, token) {
    let user = {nickname: nickname, age: age};
    return await this.do_fetch(this._users.coral_url(token), PUT, user);
  }


  async delete_user (token) {
    return await this.do_fetch(this._users.coral_url(token), DELETE);
  }


  async get_users (token=null) {
    if (!token) {
      return await this.do_fetch(this._users, GET);

    } else {
      return await this.do_fetch(this._users.coral_url(token), GET);
    }
  }


  async get_user_games (token, game_id=null) {
    if (!game_id) {
      let resp = await this.do_fetch(this._users.coral_url(token, this._games), GET);
      return resp;

    } else {
      return await this.do_fetch(this._users.coral_url(token, this._games, game_id), GET);
    }
  }

  async add_user_games (game_id, status, rating, token) {
    let user_games = {game: game_id, status: status, rating: rating}
    return await this.do_fetch(this._users.coral_url(token, this._games), POST, user_games);
  }

  async update_user_games (game_id, status, rating, token) {
    let user_games = {status: status, rating: rating};
    return await this.do_fetch(this._users.coral_url(token, this._games, game_id), PUT, user_games);
  }

  async remove_user_games (game_id, token) {
    return await this.do_fetch(this._users.coral_url(token, this._games, game_id), DELETE);
  }


  async get_games (game_id=null) {
    if (!game_id) {
      return await this.do_fetch(this._games, GET);

    } else {
      return await this.do_fetch(this._games.coral_url(game_id), GET);
    }
  }


  async get_genres () {
    return await this.do_fetch(this._genres, GET);
  }
}


const coral = new Coral();




// Coral REST requests testing function
async function get_resp (func, params=null) {
	if (params) {
		resp = await (await coral[func](...params)).json();

	} else {
		resp = await (await coral[func]()).json();
	}

	console.log(resp);
}
