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
            mobileMenu.classList.toggle('header__list--opened')
            mobileMenu.classList.toggle('header__list--closed')
            menuBtn.classList.toggle('header__menu--active')
        })
    }

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

    // let openModalBtns = document.querySelectorAll(".open-modal")
    // let modal = document.querySelector(".modal")
    // let modalOverlay = document.querySelector(".modal-overlay")
    //
    // openModalBtns.forEach((item) => {
    //     item.addEventListener("click", () => {
    //         modal.classList.remove("modal--hidden")
    //         modalOverlay.classList.remove("modal-overlay--hidden")
    //     })
    // })
    //
    // let modalCloseBtn = document.querySelector(".modal__close")
    //
    // modalCloseBtn.addEventListener("click", () => {
    //     modal.classList.add("modal--hidden")
    //     modalOverlay.classList.add("modal-overlay--hidden")
    // })
});


// Паралакс мышей ========================================================================================
// const mousePrlx = new MousePRLX({})
// =======================================================================================================

// Фиксированный header ==================================================================================
headerFixed()
// =======================================================================================================

togglePopupWindows()
// =======================================================================================================
