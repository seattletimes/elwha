require("./lib/social");
require("./lib/ads");
var track = require("./lib/tracking");

require("component-image-slider");

require("./scrollWash");
require("./sticky");
require("./scrollClass");
require("./headerVideo");
// require("./logs");
require("./featuring");
require("./jump");

var map = document.querySelector(".map-container");

map.addEventListener("click", () => map.classList.toggle("expanded"));