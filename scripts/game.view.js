async function youtube_iframe_change_by_scroll() {
  const current_game = (await (await coral.get_games(get_url_status_parameter('q'))).json())[0];
  current_game.release_date = new Date(current_game.release_date);

  document.querySelector('#details-title').innerText = current_game.title || '';
  document.querySelector('#details-cover').src = `${coral.url}/images/games/${current_game.cover}` || 'src/default.png';
  document.querySelector('#game_description').innerText = current_game.game_description || '';
  document.querySelector('#release_date').innerText = `Lançamento: ${current_game.release_date.toLocaleDateString('pt-BR') || ''}`;
  document.querySelector('#studio').innerText = `Estudio: ${current_game.studio || ''}`;
  document.querySelector('#developer').innerText = `Desenvolvedora: ${current_game.developer || ''}`;
  document.querySelector('#game_mode').innerText = `Modo de jogo: ${current_game.game_mode || ''}`;
  document.querySelector('#franchise').innerText = `Franquia: ${current_game.franchise || ''}`;

  const youtube_iframe = document.querySelector('iframe');
  youtube_iframe.src = `https://www.youtube.com/embed/${current_game.trailer_token || '-bKvQMv6Jnk'}?autoplay=1&mute=1&loop=1&playlist=${current_game.trailer_token || '-bKvQMv6Jnk'}`

  window.addEventListener('scroll', () => {
    let scroll_height = 400;
    if (window.innerWidth <= 1054) {scroll_height = 240;}

    if (window.scrollY >= scroll_height) {
      youtube_iframe.classList.add('video-iframe-scrolled');
      youtube_iframe.classList.remove('video-iframe-full');

    } else {
      youtube_iframe.classList.add('video-iframe-full');
      youtube_iframe.classList.remove('video-iframe-scrolled');
    }
  });
}
