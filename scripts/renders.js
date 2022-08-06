function set_owl_carousel() {
	const owl_interval = setInterval(() => {
		if (document.querySelectorAll('.owl-loaded').length == 10) {clearInterval(owl_interval);}
		$('.owl-carousel').owlCarousel({
			loop: false, margin: 20, nav: !navigator.userAgentData.mobile, dots: false, lazyLoad: true, lazyLoadEager: 20,
			responsive: {
				0: {items: 2}, 340: {items: 3}, 600: {items: 4}, 960: {items: 6}, 1200: {items: 8}
			}
		});
	}, 250);
}


/* INDEX */
let genres_list = ['Aventura', 'RPG', 'Ação', 'FPS', 'Plataforma', 'Esporte', 'Terror', 'Tiro', 'Corrida', 'Luta'];
const game_status = ['Todos', 'Jogando', 'Finalizados', 'Em Espera', 'Droppados', 'Quero Jogar']
genres_list = genres_list.sort();


const games_item = (item, idx, optional) => {
  if (item.genres.indexOf(optional[0]) == -1) {return;}

	let item_template = document.querySelector('#carousel-item-template-0').cloneNode(true);

	if (user_token) {
		let add_or_edit_game = 'add';
		const filtered_optional = optional[1].filter((cur) => cur.id == item.id);
		if (filtered_optional.length !== 0) {
			add_or_edit_game = 'edit';
			item_template = document.querySelector('#carousel-item-template-2').cloneNode(true);
			item_template.content.querySelectorAll('.list-category')[0].textContent = game_status[filtered_optional[0].g_status];
			item_template.content.querySelectorAll('.list-category')[0].setAttribute('data-list-status', filtered_optional[0].g_status);

		} else {
			item_template = document.querySelector('#carousel-item-template-1').cloneNode(true);
		}

		item_template.content.querySelectorAll('.carousel-btn')[0].setAttribute('data-game-id-btn', `[${item.id}, "${add_or_edit_game}"]`);
		item_template.content.querySelectorAll('.carousel-btn')[0].querySelector('i').setAttribute('data-game-id-btn', `[${item.id}, "${add_or_edit_game}"]`);
	}

	let cover = './src/default.png';

	if (item.cover !== null) {cover = `${coral.url}/images/games/${item.cover}`}

	item_template.content.querySelectorAll('.box-cover')[0].src = cover;
	item_template.content.querySelectorAll('.carousel-item-label')[0].textContent = item.title;
	item_template.content.querySelectorAll('.box-cover')[0].setAttribute('data-game-id', item.id);
	item_template.content.querySelectorAll('.carousel-item-label')[0].setAttribute('data-game-id', item.id);

	return item_template;
}


const games_catalog = async (item) => {
  const data_games = await (await coral.get_games()).json();
	let data_user_games = await (await coral.get_user_games(user_token)).json();

	if (data_user_games.status == 404) {
		data_user_games = [];
	}

	const container_template = document.querySelector('#carousel-container-template').cloneNode(true);
	container_template.content.querySelectorAll('.genre')[0].textContent = item;

	listrender.render(data_games, container_template.content.querySelectorAll('.content')[0], games_item, [item, data_user_games]);

	return container_template;
}




/* LIST */
async function change_status_section (current_status) {
  document.querySelector(`#tabs-radio-button-${current_status}`).click();

	const current_tab = document.querySelectorAll('.khonshu-tab')[current_status];
	const current_table_body = document.querySelectorAll('.table-body')[current_status];
	const empty_list_img_template = document.querySelector('#empty-list-icon').cloneNode(true);
	let data_games = await (await coral.get_user_games(user_token)).json();

	if (data_games.status == 404) {
		data_games = [];
	}


	if (data_games.length == 0) {
		current_tab.appendChild(document.importNode(empty_list_img_template.content, true));
		return;
	}

	if (current_status == 0) {
		listrender.render(data_games, current_table_body, games_list);
		return;
	}

	const render_games = data_games.filter(current => {return current.g_status == current_status});

	if (render_games.length == 0) {
		current_tab.appendChild(document.importNode(empty_list_img_template.content, true));
		return;
	}

	listrender.render(render_games, current_table_body, games_list);
}


const games_list = async (item, idx) => {
	const row_template = document.querySelector('#table-row-template').cloneNode(true);
	let cover = './src/default.png';

	if (item.cover !== null) {cover = `${coral.url}/images/games/${item.cover}`}

	row_template.content.querySelector('#row-id').textContent = idx;
	row_template.content.querySelector('#cover').src = cover;
	row_template.content.querySelector('#title').textContent = item.title;
	row_template.content.querySelector('#rating').setAttribute('badge', item.rating || '-');
	row_template.content.querySelectorAll('.set-data-prop').forEach(current => {
		current.setAttribute('data-game-id', item.id);
	});

	row_template.content.querySelectorAll('.row-edit-btn')[0].setAttribute('data-game-id-btn', `[${item.id}, "edit"]`);
	row_template.content.querySelectorAll('.row-edit-btn')[0].querySelector('i').setAttribute('data-game-id-btn', `[${item.id}, "edit"]`);

	row_template.content.querySelectorAll('.row-delete-btn')[0].setAttribute('data-delete-game', item.id);
	row_template.content.querySelectorAll('.row-delete-btn')[0].querySelector('i').setAttribute('data-delete-game', item.id);

	return row_template;
}




document.addEventListener('click', (e) => {
	if(e.target.matches('[data-game-id]')) {
		khonshu_navigation.navigate(`/game?q=${e.target.getAttribute('data-game-id')}`);

	} else if(e.target.matches('[data-game-id-btn]')) {
		const values = JSON.parse(e.target.getAttribute('data-game-id-btn'));
		show_add_edit_game_modal(values[0], values[1]);

	} else if(e.target.matches('[data-save-game]')) {
		add_game(e.target.getAttribute('data-save-game'));

	} else if(e.target.matches('[data-edit-game]')) {
		edit_game(e.target.getAttribute('data-edit-game'));

	} else if(e.target.matches('[data-delete-game]')) {
		remove_game(e.target.getAttribute('data-delete-game'));

	} else if(e.target.matches('[data-list-status]')) {
		khonshu_navigation.navigate(`/list?s=${e.target.getAttribute('data-list-status')}`);

	} else if(e.target.matches('[class="pf-img"]')) {
		document.querySelector('#profile-modal').show();
	}
});