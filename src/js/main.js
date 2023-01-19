import ready from "./utils/documentReady"

ready(function() {
  const productWrapper = document.querySelectorAll('.products__wrapper')
  const itemWrapper = document.querySelector('.aside-basket__body')
  const returnObj = JSON.parse(localStorage.getItem('items'))


  // проверка пуста ли корзина
  const itemsCheck = () => {
    if (document.querySelector('.item')) {
      document.querySelector('.aside-basket__empty-wrapper').classList.add('disable')
    } else {
      document.querySelector('.aside-basket__empty-wrapper').classList.remove('disable')
    }
  }

  const getBasketData = () => {
    for (let i = 0; i < returnObj.length; i++) {
      const name = returnObj[i].name
      const amound = returnObj[i].amound
      const price = returnObj[i].price
      const img = returnObj[i].img

      itemWrapper.innerHTML += `
        <div class="item" data-price=${price} data-img=${img}>
          <div class="item__left">
            <div class="item__img-wrapper">
              <img class="item__img" src="${img}" alt="">
            </div>
            <div class="item__count">
              <spam class="item__count-button item__count-button--incr">+</spam>
              <span class="item__amount">${amound}</span>
              <span class="item__count-button item__count-button--decr">-</span>
            </div>
          </div>
          <div class="item__right">
            <span class="item__name">${name}</span>
            <div class="item__values">
              <span class="item__price">
                <span class="item__price-value">${price * amound}</span> руб.</span>
              <span class="item__weight">450 г.</span>
            </div>
          </div>
          <img class="item__close" src="img/close.svg" alt="close">
        </div>
      `
    }
  }

  const removeItem = (e) => {
    e.target.parentElement.remove()
    getSumOfPrices()
    itemsCheck()  
    recordInLocalStorage()
  }

  const getSumOfPrices = () => {
    const priceNodes = document.querySelectorAll('.item__price-value')
    const prices = [0]
    
    priceNodes.forEach(item => prices.push(Number(item.innerText)))

    const priceSum = prices.reduce((a, b) => {
      return a + b
    })

    document.querySelector('.aside-basket__sum').innerText = priceSum
    changeBasketAmount()
  }

  // кол-во товаров в корзине
  const changeBasketAmount = () => {
    const allItems = document.querySelectorAll('.item').length
    const amountWrapper = document.querySelector('.aside-basket__amount-value')

    amountWrapper.innerText = allItems
  }

  productWrapper.forEach(item => {
    item.addEventListener('click', (e) => {
      if (e.target.closest('.products__button')) {
        e.preventDefault()
        getDataAttr(e)
        recordInLocalStorage()
      }
    })
  })

  const getDataAttr = (e) => {
    const parent = e.target.parentElement
    const dataName = parent.dataset.name
    const dataPrice = parent.dataset.price
    const dataWeight = parent.dataset.weight
    const dataImg = parent.dataset.img

    itemWrapper.innerHTML += `
      <div class="item" data-price=${dataPrice} data-img=${dataImg}>
        <div class="item__left">
          <div class="item__img-wrapper">
            <img class="item__img" src="img/${dataImg}.png" alt="${dataName}">
          </div>
          <div class="item__count">
            <spam class="item__count-button item__count-button--incr">+</spam>
            <span class="item__amount">1</span>
            <span class="item__count-button item__count-button--decr">-</span>
          </div>
        </div>
        <div class="item__right">
          <span class="item__name">${dataName}</span>
          <div class="item__values">
            <span class="item__price">
              <span class="item__price-value">${dataPrice}</span> руб.</span>
            <span class="item__weight">${dataWeight}г.</span>
          </div>
        </div>
        <img class="item__close" src="img/close.svg" alt="close">
      </div>
    `

    itemsCheck() 
    getSumOfPrices()
  }

  const changeAmount = (e) => {
    const currentItem = e.target.closest('.item')
    const currentAmount = currentItem.querySelector('.item__amount')
    const currentSum = currentItem.querySelector('.item__price-value')
    let sumValue = currentItem.dataset.price
    let amountValue = Number(currentAmount.innerText)

    if (e.target.classList.contains('item__count-button--incr')) {
      amountValue++
      currentSum.innerText = Number(currentSum.innerText) + Number(sumValue)
    } else if (e.target.classList.contains('item__count-button--decr')) {
      if (amountValue <= 0) return
      amountValue--
      currentSum.innerText = Number(currentSum.innerText) - Number(sumValue)
    }

    currentAmount.innerText = amountValue
    getSumOfPrices()
    recordInLocalStorage()
  }

  const recordInLocalStorage = () => {
    const allItems = document.querySelectorAll('.item')
    const allGoods = []
    localStorage.removeItem('items')

    allItems.forEach(item => {
      const name = item.querySelector('.item__name').innerText
      const img = item.querySelector('.item__img').src
      const price = item.dataset.price
      const amound = item.querySelector('.item__amount').innerText
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

  if(itemWrapper) {
    getBasketData()
    itemsCheck()
    changeBasketAmount()
    getSumOfPrices()
  }

  itemWrapper?.addEventListener('click', (e) => {
    if (e.target.closest('.item__count-button')) changeAmount(e)
  })

  itemWrapper?.addEventListener('click', (e) => {
    if (e.target.closest('.item__close')) removeItem(e)
  })
})