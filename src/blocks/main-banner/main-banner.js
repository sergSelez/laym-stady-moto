import ready from '../../js/utils/documentReady'
import Swiper, { Navigation, Pagination, EffectCards } from 'swiper';

ready(function() {
  const mainBannerSwiper = new Swiper('.main-banner__swiper', {
    modules: [EffectCards, Pagination, Navigation],
    effect: "cards",
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: '.main-banner__next',
      prevEl: '.main-banner__prev',
    },
  });

  const mobBannerSwiper = new Swiper('.main-banner__mob-swiper', {
    slidesPerView: 'auto',
    spaceBetween: 10,
    centeredSlides: true,
    loop: true,
    modules: [Pagination, Navigation],
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: '.main-banner__next',
      prevEl: '.main-banner__prev',
    }
  })
})