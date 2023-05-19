//navigationbarjs

//DOM
const toggleButton = document.getElementsByClassName('toggle-button')[0];
const navbarLinks = document.getElementsByClassName('navbar-links')[0];
//DOM Event Listener - Showing the menu when hamburger is clicked
toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active');
});


//generaljs


//swiperjs

const swiper = new Swiper('.swiper', {
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
});