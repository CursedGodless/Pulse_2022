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


const catalog = document.querySelector('.catalog'),
	catalogItem = catalog.querySelector('.catalog__item'),
	catalogTabs = catalog.querySelector('.catalog__tabs'),
	catalogContents = catalog.querySelectorAll('.catalog__content');

catalogContents.forEach(item => {
	item.addEventListener('click', (e) => {
		e.preventDefault();
		const target = e.target,
			parent = target.closest('.catalog__item-wrapper');
		if (target && target.matches('.catalog__item-link')) {
			parent.classList.toggle('catalog__item-wrapper_active');
		}
	})
});

catalogTabs.addEventListener('click', (e) => {
	const target = e.target;
	if (target && target.matches('.catalog__tab > span')) {
		const parent = target.closest('.catalog__tab');
		catalogTabs.querySelectorAll('.catalog__tab').forEach(tab => tab.classList.remove('catalog__tab_active'));
		parent.classList.add('catalog__tab_active');

		catalogContents.forEach(item => {
			item.classList.remove('catalog__content_active');
		});

		catalogContents[parent.getAttribute('data-tab-number') - 1].classList.add('catalog__content_active');
	}
});


// Modals

const consultationBtns = document.querySelectorAll('[data-modal=consultation]'),
	overlay = document.querySelector('.overlay'),
	modals = overlay.querySelectorAll('.modal'),
	forms = document.querySelectorAll('.form');

forms.forEach(item => {
	item.addEventListener('submit', (e) => {
		e.preventDefault();
		item.reset();
	});
});

function openModal(modalType) {
	overlay.classList.add('overlay_active');
	document.querySelector(modalType).classList.add('modal_active');
}

consultationBtns.forEach(item => {
	item.addEventListener('click', () => {
		openModal('#consultation');
	});
});

overlay.addEventListener('click', (e) => {
	const target = e.target;
	if (target && target.matches('.cross') || target.matches('.overlay')) {
		overlay.classList.remove('overlay_active');
		modals.forEach(item => {
			item.classList.remove('modal_active');
		})
	}
});

catalog.addEventListener('click', (e) => {
	const target = e.target;
	if (target && target.matches('.catalog__btn')) {
		openModal('#order');
		document.querySelector('#order .modal__subtitle').textContent = `${target.closest('.catalog__item').querySelector('.catalog__item-name').textContent}`;
	}
})