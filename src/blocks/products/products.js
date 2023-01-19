import ready from '../../js/utils/documentReady'
import Swiper, { Navigation, Scrollbar } from 'swiper';

ready(function() {
  const swiperInit = (swiperName, swiperClass, arrowNext, arrowPrev) => {
    let name = swiperName
    name = new Swiper(swiperClass, {
      loop: false,
      slidesPerView: 'auto',
      spaceBetween: 16,
      modules: [Scrollbar, Navigation],
      scrollbar: {
        el: '.swiper-scrollbar',
      },
      breakpoints: {
        1280: {
          slidesPerView: 6,
          spaceBetween: 10,
          scrollbar: false,
          navigation: {
            nextEl: arrowNext,
            prevEl: arrowPrev,
          },
        }
      }
    });
  }
  
  swiperInit('promotionalSwiper', '.promotional__swipper', '.promotional-next', '.promotional-prev')
  swiperInit('newsSwiper', '.news__swipper', '.news-next', '.news-prev')
  swiperInit('veganSwiper', '.vegan__swipper', '.vegan-next', '.vegan-prev')
  swiperInit('popularSwiper', '.popular__swipper', '.popular-next', '.popular-prev')
})