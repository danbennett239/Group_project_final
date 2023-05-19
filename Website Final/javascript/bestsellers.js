const base_url = "https://db1087.brighton.domains/gp/api.php";
        const option = "bestsellers";
        const num = 18;
        var gameId = [];
function fetching(){
    const url = `${base_url}?option=${option}&num=${num}`;

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
                    // Game ID array for basket feature
                    
                    for (i=0; i<18; i++){
                        var title = document.getElementById("bestsellers-title-" + (i+1));
                        var image = document.getElementById("bestsellers-cover-" + (i+1));
                        var imageURL = "images/game_number_" + (data.results[i].id) + ".png";
                        var price = document.getElementById("bestsellers-price-" + (i+1));
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
fetching();

function addToBasket(event) {
    var buttonID = event.target.getAttribute("data-id");
    var index = gameId[buttonID];
    if (index !== -1) {
      fetchBasketAdd(index);
    } else {
      console.log("Button ID not found in gameIDs array");
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
        
        // You can update the UI or perform any other actions with the retrieved data
      })
      .catch(error => {
        console.error(error);
      });   
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
  checkOutButton.addEventListener('click', checkOut)
  

