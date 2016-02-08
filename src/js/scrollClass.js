var $ = require("./lib/qsa");
var debounce = require("./lib/debounce");

var elements = $("[scroll-class]").map(function(target) {
  var area = target.getAttribute("scroll-trigger");
  if (area) {
    area = document.querySelector(area) || target;
  } else {
    area = target;
  }
  var className = target.getAttribute("scroll-class") || "scroll-activated"
  return { target, area, className };
});

window.addEventListener("scroll", debounce(function() {
  elements.forEach(function(scroll) {
    var bounds = scroll.area.getBoundingClientRect();
    if (bounds.top < window.innerHeight * .5) {
      scroll.target.classList.add(scroll.className);
    } else {
      scroll.target.classList.remove(scroll.className);
    }
  })
}));