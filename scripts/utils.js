function get_url_status_parameter(param) {
  let url_string = window.location.href;
  let url = new URL(url_string);

  let current_status = url.searchParams.get(param);

  if (current_status === null) {return 0;}

  return Number(current_status);
}
