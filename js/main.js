// HAMBURGUESA
const bar=document.getElementById('bar');
const  nav=document.getElementById("navbar");
const close=document.getElementById("close")

const modal = document.querySelector(".Modal");
const lgbag = document.querySelector("#lg-bag");

if(bar){
    bar.addEventListener('click',()=>{
        nav.classList.add('active');
    })
}

if(close){
    close.addEventListener('click',()=>{
        nav.classList.remove('active');
    })
}

// MODAL CARRITO
modal.style.display = "none";
lgbag.addEventListener('click', ()=> {
  if (modal.style.display == "none") {
    modal.style.display = "flex";
  } else {
    modal.style.display = "none";
  }
})


//SWIPER SLIDER BANNER
var swiper = new Swiper('.swiper', {
  centeredSlides: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
});