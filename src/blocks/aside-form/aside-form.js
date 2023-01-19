import ready from '../../js/utils/documentReady'

ready(function() {
  const orderWrapper = document.querySelector('.aside-form__order-wrapper')
  const orderItem = document.querySelectorAll('.aside-form__order-item')

  const selectionActiveItem = (e) => {
    const currentItem = e.target
    orderItem.forEach(item => {
      item.classList.remove('active')
    })
    currentItem.classList.add('active')
  }

  orderWrapper?.addEventListener('click', (e) => {
    if (e.target.closest('.aside-form__order-item')) {
      selectionActiveItem(e)
    }
  })
})