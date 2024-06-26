const html = document.documentElement
const body = document.body
const pageWrapper = document.querySelector('.main')
const header = document.querySelector('.header')
const firstScreen = document.querySelector('[data-observ]')
const burgerButton = document.querySelector('.icon-menu')
const menu = document.querySelector('.menu')
const lockPaddingElements = document.querySelectorAll('[data-lp]')


const toggleBodyLock = (isLock) => {
  FLS(`Попап ${isLock ? 'открыт' : 'закрыт'}`)
  const lockPaddingValue = window.innerWidth - pageWrapper.offsetWidth

  setTimeout(() => {
    if (lockPaddingElements) {
      lockPaddingElements.forEach((element) => {
        element.style.paddingRight = isLock ? `${lockPaddingValue}px` : '0px'
      })
    }
  
    body.style.paddingRight = isLock ? `${lockPaddingValue}px` : '0px'
    body.classList.toggle('lock', isLock)
  }, isLock ? 0 : 500)
}
// logger (Full Logging System) =================================================================================================================
function FLS(message) {
  setTimeout(() => (window.FLS ? console.log(message) : null), 0)
}

// Проверка браузера на поддержку .webp изображений =================================================================================================================
function isWebp() {
  // Проверка поддержки webp
  const testWebp = (callback) => {
    const webP = new Image()

    webP.onload = webP.onerror = () => callback(webP.height === 2)
    webP.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
  }
  // Добавление класса _webp или _no-webp для HTML
  testWebp((support) => {
    const className = support ? 'webp' : 'no-webp'
    html.classList.add(className)

    FLS(support ? 'webp поддерживается' : 'webp не поддерживается')
  })
}

/* Проверка мобильного браузера */
const isMobile = {
  Android: () => navigator.userAgent.match(/Android/i),
  BlackBerry: () => navigator.userAgent.match(/BlackBerry/i),
  iOS: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),
  Opera: () => navigator.userAgent.match(/Opera Mini/i),
  Windows: () => navigator.userAgent.match(/IEMobile/i),
  any: () =>
    isMobile.Android() ||
    isMobile.BlackBerry() ||
    isMobile.iOS() ||
    isMobile.Opera() ||
    isMobile.Windows(),
}
/* Добавление класса touch для HTML если браузер мобильный */
function addTouchClass() {
  // Добавление класса _touch для HTML если браузер мобильный
  if (isMobile.any()) {
    html.classList.add('touch')
  }
}

// Добавление loaded для HTML после полной загрузки страницы
function addLoadedClass() {
  window.addEventListener('load', () => {
    setTimeout(() => {
      html.classList.add('loaded')
    }, 0)
  })
}

// Получение хеша в адресе сайта
const getHash = () => {
  if (location.hash) {
    return location.hash.replace('#', '')
  }
}

// Указание хеша в адресе сайта
function setHash(hash) {
  hash = hash ? `#${hash}` : window.location.href.split('#')[0]
  history.pushState('', '', hash)
}

// Функция для фиксированной шапки при скролле =================================================================================================================
function headerFixed() {
  const headerStickyObserver = new IntersectionObserver(([entry]) => {
    header.classList.toggle('sticky', !entry.isIntersecting)
  })

  if (firstScreen) {
    headerStickyObserver.observe(firstScreen)
  }
}

// Универсальная функция для открытия и закрытия попапо =================================================================================================================
const togglePopupWindows = () => {
  document.addEventListener('click', ({ target }) => {
    if (target.closest('[data-type]')) {
      const popup = document.querySelector(
        `[data-popup="${target.dataset.type}"]`
      )

      if (document.querySelector('._is-open')) {
        document.querySelectorAll('._is-open').forEach((modal) => {
          modal.classList.remove('_is-open')
        })
      }

      popup.classList.add('_is-open')
      toggleBodyLock(true)
    }

    if (
      target.classList.contains('_overlay-bg') ||
      target.closest('.button-close')
    ) {
      const popup = target.closest('._overlay-bg')

      popup.classList.remove('_is-open')
      toggleBodyLock(false)
    }
  })
}

// Модуль работы с меню (бургер) =======================================================================================================================================================================================================================
const menuInit = () => {
  if (burgerButton) {
    document.addEventListener('click', ({ target }) => {
      if (target.closest('.icon-menu')) {
        html.classList.toggle('menu-open')
        toggleBodyLock(html.classList.contains('menu-open'))
      }
    })
  }
}
const menuOpen = () => {
  toggleBodyLock(true)
  html.classList.add('menu-open')
}
const menuClose = () => {
  toggleBodyLock(false)
  html.classList.remove('menu-open')
}


// Включить/выключить FLS (Full Logging System) (в работе)


document.addEventListener('DOMContentLoaded', function(){ // Аналог $(document).ready(function(){
    let faqBtns = document.querySelectorAll(".faq__accordion-heading")
    faqBtns.forEach((item) => {
        item.addEventListener("click", () => {
            item.closest(".faq__accordion-item").classList.toggle("faq__accordion-item--opened")
        })
    })
    
    let menuBtn = document.querySelector(".header__menu")
    let mobileMenu = document.querySelector(".header__list")

    if(menuBtn && mobileMenu){
        menuBtn.addEventListener('click', () => {
            document.body.classList.toggle('scroll-off')
            mobileMenu.classList.toggle('header__list--opened')
            mobileMenu.classList.toggle('header__list--closed')
            menuBtn.classList.toggle('header__menu--active')
        })
    }

    let menuItems = document.querySelectorAll('.header__link')
    menuItems.forEach((item) => {
        item.addEventListener('click', () => {
            document.body.classList.remove('scroll-off')
            mobileMenu.classList.remove('header__list--opened')
            mobileMenu.classList.add('header__list--closed')
            menuBtn.classList.toggle('header__menu--active')
        })
    })


    if(document.querySelector('input[name="phone"]')) {
        let inputsPhone = document.querySelectorAll('input[name="phone"]')
        inputsPhone.forEach(input => {
            $(input).mask('+7 (999) 999-99-99')
        })
    }


    if (document.getElementById('map')) {
        let addr = $('.js-map').data('addr'),
            x    = $(".js-map").data('x'),
            y    = $(".js-map").data('y')

        ymaps.ready(init);

        function init() {
            let Map = new ymaps.Map("map", {
                center: [x, y],
                zoom: 10,
                controls: [
                    'zoomControl',
                    'rulerControl',
                    'routeButtonControl',
                ]
            });
            Map.behaviors.disable('scrollZoom');
            let mark = new ymaps.Placemark([x, y], {
                hint: 'Сервисный центр ',
                balloonContent: addr,
            });

            Map.geoObjects.add(mark);
        }
    }

    let processList = document.querySelector(".process__list")
    if(processList){
        processList.addEventListener('click', () => {
            document.body.classList.remove('mobile-scroll-off')
            processList.classList.remove("process__list--active")
            let activeItem = processList.querySelector(".process__item--active")
            if(activeItem){
                activeItem.classList.remove("process__item--active")
            }
        })
    }

    let processItems = document.querySelectorAll(".process__item")
    processItems.forEach((item) => {
        item.addEventListener('click', (evt) => {
            evt.stopPropagation()
            document.body.classList.add('mobile-scroll-off')
            item.closest(".process__list").classList.add("process__list--active")
            item.classList.add("process__item--active")
        })
    })

    let processItemsCloseBtns = document.querySelectorAll(".process__item-close")
    processItemsCloseBtns.forEach((item) => {
        item.addEventListener("click", (evt) => {
            evt.stopPropagation()
            document.body.classList.remove('mobile-scroll-off')
            item.closest(".process__list").classList.remove("process__list--active")
            item.closest(".process__item").classList.remove("process__item--active")
        })
    })
});


// Фиксированный header ==================================================================================
headerFixed()
// =======================================================================================================

togglePopupWindows()
// =======================================================================================================
