const base_url = "https://db1087.brighton.domains/gp/api.php";
const option = "trending";
const num = 6;

function fetching(){
    const url = `${base_url}?option=${option}&num=${num}`;
    
    return fetch(url)
        .then(response => {
            if(response.ok){
                return response.json();
            } else {
        throw new Error (`Request failed with status code: ${response.status}`);
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
                    }
                }
            })
        .catch(error => {
            console.error(error);
        });
}
fetching();    
            
        
