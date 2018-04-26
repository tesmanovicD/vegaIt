var isMobile = window.matchMedia("only screen and (max-width: 768px)").matches;
var increaseFor = isMobile ? 1 : 3;
var number = 0;
var pictureNumber = 0;
var productsArrayLength;

$(document).ready(function() {
  loadPicture(pictureNumber);

  $("#next-img").click(function() {
     if(pictureNumber < (productsArrayLength - 1) - increaseFor) {
        pictureNumber = pictureNumber + 1;
        loadPicture(pictureNumber);
      }
  })
  $("#prev-img").click(function() {
    if(pictureNumber > 0) {
      pictureNumber = pictureNumber - 1;
      loadPicture(pictureNumber);
    }
  })
})

function loadPicture(num) {
  $('.pictures-list').html('');
  $.getJSON("./storage/products.json", function(data) {
    if(!productsArrayLength) {
      productsArrayLength = data.length;
    }
    for (var i = num; i <= num+increaseFor; i++) {
      $("<figure class='picture-item'><img src='img/"+data[i].image+"' /><figcaption>"+data[i].name+"</figcaption></figure>").appendTo( ".pictures-list" );
    }
  })
}
