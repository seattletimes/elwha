var $ = require("./lib/qsa");
var closest = require("./lib/closest");

var faders = $(".image-container.scroll-wash");

var subscribe = require("./lib/scrollNotify")

var Wash = require("./wash");

faders.forEach(function(element) {

  var effect = new Wash(element);

  subscribe(element, function() {
    effect.load();
    effect.play();
  });

});