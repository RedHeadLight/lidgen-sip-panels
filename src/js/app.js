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
