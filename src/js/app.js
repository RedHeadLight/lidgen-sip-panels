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
    
    let processItems = document.querySelectorAll(".process__item")
    processItems.forEach((item) => {
        item.addEventListener('click', () => {
            item.classList.toggle("process__item--active")
        })
    } )
});


// Фиксированный header ==================================================================================
headerFixed()
// =======================================================================================================

togglePopupWindows()
// =======================================================================================================
