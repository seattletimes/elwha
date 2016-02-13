var subscribe = require("./lib/scrollNotify");
var $ = require("./lib/qsa");

var lazy = $(`img[data-src]`);

lazy.forEach(function(element) {
  subscribe(element, subscribe.CLOSE, function() {
    element.src = element.getAttribute("data-src");
  });
});