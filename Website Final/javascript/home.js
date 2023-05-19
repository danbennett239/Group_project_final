var gameId = [];

function fetchTrending() {
  url = 'https://db1087.brighton.domains/gp/api.php?option=trending&num=6';

  return fetch(url)
        .then(response => {
            if(response.ok){
                return response.json();
            } else {
        throw new Error(`Request failed with status code: ${response.status}`);
        }})
        .then(data => {
                console.log(data);
                if (data.results) {
                    
                    for (i=0; i<6; i++){
                        var title = document.getElementById("trending-title-" + (i+1));
                        var image = document.getElementById("trending-cover-" + (i+1));
                        var imageURL = "images/game_number_" + (data.results[i].id) + ".png";
                        var price = document.getElementById("trending-price-" + (i+1));
                        title.textContent = data.results[i].title;
                        price.textContent = "£" + data.results[i].price;
                        image.src = imageURL;
                        image.alt = data.results[i].title;
                        // Adding ID of each game to array
                        gameId.push(data.results[i].id);
                    }
                }
            })
        .catch(error => {
            console.error(error);
        });
}

fetchTrending();

function fetchBestsellers() {
const url = "https://db1087.brighton.domains/gp/api.php?option=bestsellers&num=6"
return fetch(url)
        .then(response => {
            if(response.ok){
                return response.json();
            } else {
        throw new Error(`Request failed with status code: ${response.status}`);
        }})
        .then(data => {
                console.log(data);
                if (data.results) {
                    
                    for (i=0; i<6; i++){
                        var title = document.getElementById("bestsellers-title-" + (i+1));
                        var image = document.getElementById("bestsellers-cover-" + (i+1));
                        var imageURL = "images/game_number_" + (data.results[i].id) + ".png";
                        var price = document.getElementById("bestsellers-price-" + (i+1));
                        title.textContent = data.results[i].title;
                        price.textContent = "£" + data.results[i].price;
                        image.src = imageURL;
                        image.alt = data.results[i].title;
                    }
                }
            })
        .catch(error => {
            console.error(error);
        });
}

fetchBestsellers();

function fetchLatestreleases() {
  const url = "https://db1087.brighton.domains/gp/api.php?option=latest_releases&num=6"

  return fetch(url)
        .then(response => {
            if(response.ok){
                return response.json();
            } else {
        throw new Error(`Request failed with status code: ${response.status}`);
        }})
        .then(data => {
                console.log(data);
                if (data.results) {
                    
                    for (i=0; i<6; i++){
                        var title = document.getElementById("latest_releases-title-" + (i+1));
                        var image = document.getElementById("latest_releases-cover-" + (i+1));
                        var imageURL = "images/game_number_" + (data.results[i].id) + ".png";
                        var price = document.getElementById("latest_releases-price-" + (i+1));
                        title.textContent = data.results[i].title;
                        price.textContent = "£" + data.results[i].price;
                        image.src = imageURL;
                        image.alt = data.results[i].title;
                    }
                }
            })
        .catch(error => {
            console.error(error);
        });

}
fetchLatestreleases();




function addToBasket(event) {
  var buttonID = event.target.getAttribute("data-id");
  switch (buttonID) {
    case 'GTAV':
      recommendationBasket('Grand Theft Auto V', 9.73);
      break;
    case 'Destiny':
      recommendationBasket('Destiny 2: Lightfall', 40);
      break;
    case 'Hogwarts':
      recommendationBasket('Hogwarts Legacy', 65);
      break;
    case 'Fifa':
      recommendationBasket('Fifa 23', 18.99);
      break;
    case 'DBD':
      recommendationBasket('Dead by Daylight', 5);
      break
    default:
      var index = gameId[buttonID];
      if (index !== -1) {
        fetchBasketAdd(index);
      } else {
     console.log("Button ID not found in gameIDs array");
  }
  }  
}



function fetchBasketAdd(index) {
  const url = 'https://db1087.brighton.domains/gp/api.php?option=single&id=' + index;
  
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Request failed with status code: ${response.status}`);
      }
    })
    .then(data => {
      console.log(data);
      if(data.results) {
          var basketTitle = data.results[0].title;
          var basketPrice = data.results[0].price;

          console.log(basketPrice);

          var basketTitlePara = document.createElement("p");
          basketTitlePara.id = "basket-title";
          basketTitlePara.textContent = "Title: " + basketTitle;

          var basketPricePara = document.createElement("p");
          basketPricePara.id = "basket-price";
          basketPricePara.textContent = "Price: £" + basketPrice;

          var basketContainer = document.getElementById("basket-container");
          basketContainer.appendChild(basketTitlePara);
          basketContainer.appendChild(basketPricePara);
      }
    })
    .catch(error => {
      console.error(error);
    });   
}

function recommendationBasket(title, price) {
  var basketTitlePara = document.createElement("p");
  basketTitlePara.id = "basket-title";
  basketTitlePara.textContent = "Title: " + title;

  var basketPricePara = document.createElement("p");
  basketPricePara.id = "basket-price";
  basketPricePara.textContent = "Price: £" + price;

  var basketContainer = document.getElementById("basket-container");
  basketContainer.appendChild(basketTitlePara);
  basketContainer.appendChild(basketPricePara);
}

function checkOut() {
  var basketContainer = document.getElementById("basket-container");
  basketContainer.innerHTML = "";
  alert("Thank you for choosing UB Games");
}


const addToBasketButtons = document.querySelectorAll('.add-to-basket');

addToBasketButtons.forEach(button => {
  button.addEventListener('click', addToBasket);
});

const checkOutButton = document.getElementById('check-out-button');
checkOutButton.addEventListener('click', checkOut);

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
