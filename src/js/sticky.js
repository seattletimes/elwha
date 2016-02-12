var $ = require("./lib/qsa");
var transform = require("./lib/prefixed").transform;

var stickyElements = $("[sticky]").map(function(element) {
  var zone = element.getAttribute("sticky");
  if (zone) zone = document.querySelector(zone);
  return {
    target: element,
    area: zone || element
  }
});

window.addEventListener("scroll", function() {
  stickyElements.forEach(function(sticky) {
    sticky.target.classList.remove("stuck");
    var bounds = sticky.area.getBoundingClientRect();
    if (bounds.top < 0 && bounds.bottom > 0) {
      sticky.target.classList.add("stuck");
    }
    if (bounds.bottom < 0) {
      sticky.target.classList.add("hidden");
    } else {
      sticky.target.classList.remove("hidden");
    }

  });
});