var $ = require("./lib/qsa");
var closest = require("./lib/closest");

var faders = $(".image-container.wash");

var scrollNotified = [];

var onScroll = function() {
  scrollNotified = scrollNotified.filter(function(sub) {
    var bounds = sub.el.getBoundingClientRect();
    if (bounds.top > 0 && bounds.bottom < window.innerHeight) {
      sub.callback();
      return false;
    }
    return true;
  });
};

window.addEventListener("scroll", onScroll);

var subscribe = function(el, callback) {
  scrollNotified.push({ el, callback });
  onScroll();
};

var Wash = require("./wash");

faders.forEach(function(element) {

  var effect = new Wash(element);

  subscribe(element, function() {
    effect.play();
  });

});

onScroll();