async function show_add_edit_game_modal(id, action) {
  document.querySelector('khonshu-toast').hide();
  let current_game = [];
  const game_modal = document.querySelector('#game-modal');
  const game_status_radio = game_modal.querySelector('#game-status');
  const game_rating_radio = game_modal.querySelector('#game-rating');
  const save_button = game_modal.querySelector('#game-modal-save-btn');
  const delete_button = game_modal.querySelector('#game-modal-delete-btn');

  if (action == 'edit') {
    current_game = (await (await coral.get_user_games(user_token, id)).json())[0];

    game_status_radio.querySelectorAll('input')[current_game.g_status - 1].click();
    game_rating_radio.querySelectorAll('input')[current_game.rating].click();

    save_button.removeAttribute('data-save-game');
    save_button.setAttribute('data-edit-game', id);

    delete_button.removeAttribute('inactive');
    delete_button.setAttribute('data-delete-game', id);

  } else if (action == 'add') {
    current_game = (await (await coral.get_games(id)).json())[0];

    game_status_radio.querySelectorAll('input')[0].click();
    game_rating_radio.querySelectorAll('input')[0].click();

    save_button.removeAttribute('data-edit-game');
    save_button.setAttribute('data-save-game', id);

    delete_button.setAttribute('inactive', null);
    delete_button.removeAttribute('data-delete-game');
  }

  game_modal.setAttribute('title', current_game.title);
  game_modal.show();
}

async function add_game(id) {
  current_game = (await (await coral.get_games(id)).json())[0];

  const game_modal = document.querySelector('#game-modal');

  const toast = document.querySelector('khonshu-toast');
  toast.innerHTML = '';
  toast.setAttribute('title', 'Adicionado!');
  toast.setAttribute('type', 'success');
  toast.innerText = `${current_game.title} foi adicionado a sua lista.`;
  const toast_icon = document.createElement('i');
  toast_icon.setAttribute('slot', 'icon');
  toast_icon.className = 'bi bi-check';
  toast.appendChild(toast_icon);

  const game_status = Number(game_modal.querySelector('input[name=game-status]:checked').value);
  const game_rating = Number(game_modal.querySelector('input[name=game-rating]:checked').value) + 1;

  await coral.add_user_games(id, game_status, game_rating, user_token);

  game_modal.hide();

  if (window.location.pathname == '/') {
    khonshu_navigation.navigate('/');
  }

  setTimeout(() => toast.show(), 400);
}

async function edit_game(id) {
  current_game = (await (await coral.get_user_games(user_token, id)).json())[0];

  const game_modal = document.querySelector('#game-modal');

  const toast = document.querySelector('khonshu-toast');
  toast.innerHTML = '';
  toast.setAttribute('title', 'Editado!');
  toast.setAttribute('type', 'success');
  toast.innerText = `${current_game.title} foi editado e salvo.`;
  const toast_icon = document.createElement('i');
  toast_icon.setAttribute('slot', 'icon');
  toast_icon.className = 'bi bi-check';
  toast.appendChild(toast_icon);

  const game_status = Number(game_modal.querySelector('input[name=game-status]:checked').value);
  const game_rating = Number(game_modal.querySelector('input[name=game-rating]:checked').value) + 1;

  await coral.update_user_games(id, game_status, game_rating, user_token);

  game_modal.hide();

  if (window.location.pathname == '/') {
    khonshu_navigation.navigate('/');

  } else if (window.location.pathname == '/list') {
    khonshu_navigation.navigate('/list' + window.location.search);
  }

  setTimeout(() => toast.show(), 400);
}

async function remove_game(id) {
  current_game = (await (await coral.get_user_games(user_token, id)).json())[0];
  await coral.remove_user_games(id, user_token);

  document.querySelector('#game-modal').hide();

  const toast = document.querySelector('khonshu-toast');
  toast.innerHTML = '';
  toast.setAttribute('title', 'Removido!');
  toast.setAttribute('type', 'danger');
  toast.innerText = `${current_game.title} foi removido da sua lista.`;
  const toast_icon = document.createElement('i');
  toast_icon.setAttribute('slot', 'icon');
  toast_icon.className = 'bi bi-x';
  toast.appendChild(toast_icon);

  if (window.location.pathname == '/') {
    khonshu_navigation.navigate('/');

  } else if (window.location.pathname == '/list') {
    khonshu_navigation.navigate('/list' + window.location.search);
  }

  setTimeout(() => toast.show(), 400);
}