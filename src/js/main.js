require("./lib/social");
require("./lib/ads");
// require("./lib/comments");
var track = require("./lib/tracking");

require("component-image-slider");

require("./scrollWash");
require("./sticky");
require("./scrollClass");
require("./headerVideo");
// require("./logs");
require("./featuring");
require("./jump");
require("./lazyload");

var map = document.querySelector(".map-container");

map.addEventListener("click", () => map.classList.toggle("expanded"));

var $ = require("./lib/qsa");

$(".splash-container").forEach(function(el) {
  el.addEventListener("click", () => el.classList.toggle("reveal"))
});
