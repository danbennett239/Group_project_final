// Save the basket content when the page is unloaded
window.addEventListener("beforeunload", function() {
  var basketContent = document.getElementById("basket-container").innerHTML;
  localStorage.setItem("basketContent", basketContent);
});

// Retrieve the basket content when the new page loads
window.addEventListener("load", function() {
  var storedBasketContent = localStorage.getItem("basketContent");
  if (storedBasketContent) {
    document.getElementById("basket-container").innerHTML = storedBasketContent;
  }
});