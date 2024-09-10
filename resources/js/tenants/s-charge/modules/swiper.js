import Swiper, { Navigation, Autoplay, Pagination } from 'swiper';

const swiperProject = new Swiper('.js-swiper-project', {
  modules: [Navigation, Autoplay],
  direction: 'horizontal',
  loop: true,
  spaceBetween: 16,
  autoplay: {
    delay: 6000,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

const swiperPricing = new Swiper('.js-swiper-pricing', {
  modules: [Navigation, Autoplay, Pagination],
  direction: 'horizontal',
  loop: true,
  spaceBetween: 16,
  autoplay: false,
  autoHeight: true,
  pagination: {
    el: ".swiper-pagination",
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

const collapsibles = document.querySelectorAll('details[data-mobile="true"]');
collapsibles.forEach((collapsible) => {
  collapsible.addEventListener('toggle', () => {
    swiperPricing.update();
  });
});



