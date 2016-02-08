var $ = require("./lib/qsa");

var elements = $("[scroll-class]").map(function(target) {
  var area = target.getAttribute("scroll-trigger");
  if (area) {
    area = document.querySelector(area);
  } else {
    area = target;
  }
  var className = target.getAttribute("scroll-class") || "scroll-activated"
  return { target, area, className };
});

window.addEventListener("scroll", function() {
  elements.forEach(function(scroll) {
    var bounds = scroll.area.getBoundingClientRect();
    if (bounds.top < window.innerHeight) {
      scroll.target.classList.add(scroll.className);
    } else {
      scroll.target.classList.remove(scroll.className);
    }
  })
})