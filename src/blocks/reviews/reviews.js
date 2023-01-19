import ready from '../../js/utils/documentReady'
import Swiper, { Navigation } from 'swiper';

ready(function() {
  const showAllButton = document.querySelector('.reviews__show-button')
  const itemsWrapper = document.querySelector('.reviews__wrapper')
  const mediaQuery = window.matchMedia('(min-width: 1280px)')

  const showAllItems = () => {
    console.log(itemsWrapper.scrollHeight)
    if (itemsWrapper.style.maxHeight) {
      itemsWrapper.style.maxHeight = null
      itemsWrapper.classList.remove('reviews__wrapper--active')
      showAllButton.innerText = 'Смотреть все отзывы'
    } else {
      itemsWrapper.style.maxHeight = itemsWrapper.scrollHeight + 'px'
      itemsWrapper.classList.add('reviews__wrapper--active')
      showAllButton.innerText = 'Свертнуть отзывы'
    }
  }

  showAllButton?.addEventListener('click', showAllItems)

  const handleDescChange = (e) => {
    if (e.matches) {
      const reviewsSwiper = new Swiper('.reviews__swipper', {
        modules: [ Navigation ],
        loop: false,
        slidesPerView: 4,
        spaceBetween: 40,
        navigation: {
          nextEl: '.reviews__next',
          prevEl: '.reviews__prev',
        }
      });
    }
  }
  mediaQuery.addListener(handleDescChange)
  handleDescChange(mediaQuery)
})