import ready from "./utils/documentReady"

ready(function() {
  const returnObj = JSON.parse(localStorage.getItem('items'))
  const sumWrapper = document.querySelector('.confirm__result-value')
  let itemsWrapper = document.querySelector('.basket__wrapper')

  const getBasketData = () => {
    for (let i = 0; i < returnObj.length; i++) {
      const name = returnObj[i].name
      const amound = returnObj[i].amound
      const price = returnObj[i].price
      const img = returnObj[i].img

      itemsWrapper.innerHTML += `
        <div class="basket__item" data-price=${price}>
          <div class="basket__img-wrapper">
            <img class="basket__img" src="${img}" alt="">
          </div>
          <div class="basket__name">${name}</div>
          <div class="basket__control">
            <div class="basket__remove">
              <img src="img/close-item.svg" alt="" width="8">
            </div>
            <img src="img/fav-item.svg" alt="" width="14">
          </div>
          <div class="basket__bju">
            <span class="basket__energy"><span class="basket__energy--gray">Б </span>2.5 г</span><span class="basket__energy"><span class="basket__energy--gray">Ж </span>20 г</span><span class="basket__energy"><span class="basket__energy--gray">У </span>2.9 г</span></div>
          <div class="basket__price">
            <span class="basket__price-value">${price * amound}</span> руб.
          </div>
          <div class="basket__count">
            <span class="basket__count-button basket__count-button--decr">-</span>
            <span class="basket__count-value">${amound}</span>
            <span class="basket__count-button basket__count-button--incr">+</span></div>
        </div>
      `
    }
  }

  const getPriceSum = () => {
    const cost = document.querySelectorAll('.basket__price-value')
    const pricesArr = []

    cost.forEach(item => {
      const price = Number(item.innerText.replace(/[^0-9]/g, ''))
      pricesArr.push(price)
    })

    const sum = pricesArr.reduce((a, b) => {
      return a + b
    })

    sumWrapper.innerText = sum
  }

  const recordInLocalStorage = () => {
    const allItems = document.querySelectorAll('.basket__item')
    const allGoods = []
    localStorage.removeItem('items')

    allItems.forEach(item => {
      const name = item.querySelector('.basket__name').innerText
      const img = item.querySelector('.basket__img').src
      const price = item.dataset.price
      const amound = item.querySelector('.basket__count-value').innerText
      const itemObj = {
        name,
        price,
        amound,
        img
      }
      allGoods.push(itemObj)
    })

    localStorage.setItem('items', JSON.stringify(allGoods))
  }

  const recount = (e) => {
    const currentItem = e.target.closest('.basket__item')
    const currentPrice = currentItem.dataset.price
    const currentAmount = currentItem.querySelector('.basket__count-value')
    let amoundValue = Number(currentAmount.innerText)

    if (e.target.closest('.basket__count-button--decr')) {
      if (amoundValue <= 0) return
      amoundValue--
    } else if (e.target.closest('.basket__count-button--incr')) {
      amoundValue++
    }

    currentItem.querySelector('.basket__price-value').innerText = currentPrice * amoundValue
    currentAmount.innerHTML = amoundValue
    getPriceSum()
    recordInLocalStorage()
  }

  const removeProduct = (e) => {
    if (e.target.closest('.basket__remove')) {
      const currentItem = e.target.closest('.basket__item')
      currentItem.remove()
      recordInLocalStorage()
    } 
  }

  itemsWrapper?.addEventListener('click', (e) => {
    if (e.target.closest('.basket__item')) recount(e)
  })

  itemsWrapper?.addEventListener('click', (e) => {
    if (e.target.closest('.basket__item')) removeProduct(e)
  })

  if (itemsWrapper) getBasketData()
  if (itemsWrapper) getPriceSum()
})