$(document).ready(function () {
	$('.slider__wrapper').slick({
		infinite: true,
		speed: 300,
		autoplay: true,
		prevArrow: '<button type="button" class="slick-prev"> <img src="icons/left_arrow.png" alt="left_arrow"> </button>',
		nextArrow: '<button type="button" class="slick-next"> <img src="icons/right_arrow.png" alt="right_arrow"> </button>',
		responsive: [
			{
				breakpoint: 992,
				settings: {
					infinite: true,
					dots: true,
					arrows: false
				}
			},]
	});
});
