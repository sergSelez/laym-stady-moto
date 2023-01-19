import ready from '../../js/utils/documentReady'

ready(function() {
  const burger = document.querySelector('.header__burger')
  const descMenu = document.querySelector('.header__menu')
  const menu = document.querySelector('.menu')
  const menuList = document.querySelectorAll('.menu__item')
  const subMenuList = document.querySelectorAll('.menu__submenu-wrapper')
  const substrate = document.querySelector('.menu__dark-wrapper')

  const addActive = (item) => {
    item.classList.add('active')
  }

  const removeActive = (item) => {
    item.classList.remove('active')
  }

  const showCloseMenu = () => {
    if (menu.classList.contains('active')) {
      menuList.forEach(item => item.classList.remove('active'))
      subMenuList.forEach(item => item.classList.remove('active'))
    }

    menu.classList.toggle('active')
    substrate.classList.toggle('active')
  }

  const showCloseSubmenu = (e) => {
    if (e.target.closest('.menu__item')) {
      const currentItem = e.target.closest('.menu__item')
      const nextItem = currentItem.nextElementSibling

      if (currentItem.classList.contains('active')) {
        removeActive(currentItem)
        removeActive(nextItem)
        return
      }

      menuList.forEach(item => removeActive(item))
      subMenuList.forEach(item => removeActive(item))
      addActive(currentItem)
      addActive(nextItem)
    }
  }

  burger.addEventListener('click', showCloseMenu)
  descMenu.addEventListener('click', showCloseMenu)
  substrate?.addEventListener('click', showCloseMenu)
  menu.addEventListener('click', (e) => showCloseSubmenu(e))
})