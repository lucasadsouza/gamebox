var owl = $('.owl-carousel');
owl.owlCarousel({
	loop: false, margin: 20, nav: true,
	dots: false, lazyLoad: true, lazyLoadEager: 20,
	responsive: {
		0: {items: 2}, 340: {items: 3}, 600: {items: 4},
		960: {items: 6}, 1200: {items: 8}
	}
});
