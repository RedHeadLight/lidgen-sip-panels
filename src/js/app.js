//=include ./helpers/elementsNodeList.js
//=include ./helpers/toggleBodyLock.js
//=include ./modules/index.js

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
