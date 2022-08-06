/* SEARCH */
const url = '/game?q=';
const search = new Search(url);
search.find(async () => await (await coral.get_games()).json());
search.key_select();

const listrender = new Khonshu.ListRender();

const spinner = document.querySelector('khonshu-modal-spinner');

/* NAVIGATION */
const khonshu_navigation = new Khonshu.Navigation(
	routes=[
		{ path: '/404', view: new Khonshu.View('GameBox | 404', '404.view.html'), actions: [] },

		{ path: '/', view: new Khonshu.View('GameBox | Ínicio', 'index.view.html'), actions: [
			() => spinner.show(),
			() => {listrender.render(genres_list, document.querySelector('#carousels-section'), games_catalog)},
			() => set_owl_carousel(),
			() => spinner.hide()
		] },

		{ path: '/list', view: new Khonshu.View('GameBox | Lista', 'list.view.html'), actions: [
			check_auth,
			() => spinner.show(),
			() => change_status_section(get_url_status_parameter('s')),
			() => spinner.hide()
		] },

		{ path: '/sign-in', view: new Khonshu.View('GameBox | Entrar', 'sign-in.view.html'), actions: [check_auth] },

		{ path: '/sign-up', view: new Khonshu.View('GameBox | Cadastrar', 'sign-up.view.html'), actions: [check_auth] },

		{ path: '/game', view: new Khonshu.View('GameBox | Game', 'game.view.html'), actions: [youtube_iframe_change_by_scroll] }
	]
);

khonshu_navigation.run();


/* CHANGE THEME */
const khonshu_change_themer = new Khonshu.ChangeThemer('bi bi-moon', 'bi bi-sun');

khonshu_change_themer.load_theme();
