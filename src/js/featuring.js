var $ = require("./lib/qsa");
var flip = require("./lib/flip");
var closest = require("./lib/closest");
var WashEffect = require("./wash");

var sections = $(".featuring");

sections.forEach(function(section) {
  var guid = 0;

  section.classList.add("toggle-section");
  var poi = $(".point-of-interest", section);
  var washes = {};
  poi.forEach(function(element) {
    var id = guid++;
    var image = element.querySelector(".image-container");
    if (!image) return;
    var wash = new WashEffect(image);
    image.setAttribute("data-guid", id);
    washes[id] = wash;
  });

  var selected = section.querySelector(".selected-area");
  var deck = section.querySelector(".on-deck");

  var first = selected.querySelector(".image-container");
  washes[first.getAttribute("data-guid")].play();

  deck.addEventListener("click", function(e) {
    var item = closest(e.target, (".point-of-interest"));
    if (!item) return;
    var previously = selected.querySelector(".point-of-interest");
    var previousImage = previously.querySelector(".image-container");
    washes[previousImage.getAttribute("data-guid")].clear();
    var image = item.querySelector(".image-container");
    var wash = washes[image.getAttribute("data-guid")];
    flip(image, function() {
      selected.removeChild(previously);
      previously.classList.add("faded");
      deck.appendChild(previously);
      deck.removeChild(item);
      item.classList.add("faded");
      selected.appendChild(item);
      var reflow = item.offsetWidth;
      previously.classList.remove("faded");
      item.classList.remove("faded");
    });
    setTimeout(wash.play.bind(wash), 500);
  });

});

