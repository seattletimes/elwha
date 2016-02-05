// require("./lib/social");
// require("./lib/ads");
// var track = require("./lib/tracking");

var $ = s => Array.prototype.slice.call(document.querySelectorAll(s));
var DROP_COUNT = 5;

var lookup = [];
var tau = Math.PI * 2;
var points = 16;
for (var i = 0; i < points; i++) {
  lookup.push({
    cos: Math.cos(tau / points * i),
    sin: Math.sin(tau / points * i)
  });
}

var faders = $(".image-container.wash");

var scrollNotified = [];

window.addEventListener("scroll", function() {
  scrollNotified = scrollNotified.filter(function(sub) {
    var bounds = sub.el.getBoundingClientRect();
    if (bounds.top > 0 && bounds.top < window.innerHeight / 2) {
      sub.callback();
      return false;
    }
    return true;
  });
});

var subscribe = function(el, callback) {
  scrollNotified.push({ el, callback });
};

faders.forEach(function(fader) {

  var image = fader.querySelector("img.base");
  var canvas = fader.querySelector("canvas");
  var context = canvas.getContext("2d");

  var source = new Image();
  source.src = canvas.getAttribute("data-src");

  source.onload = function() {
    canvas.width = source.width;
    canvas.height = source.height;

    var pattern = context.createPattern(source, "no-repeat");
    context.fillStyle = pattern;
    context.globalAlpha = 0.1;

    var radius = 0;
    var drops = [];
    for (var i = 0; i < DROP_COUNT; i++) {
      drops.push({
        x: canvas.width * Math.random(),
        y: canvas.height * Math.random()
      })
    }
    
    var splot = function(radius) {
      drops.forEach(function(point) {
        context.beginPath();
        context.moveTo(point.x + radius, point.y)
        for (var i = 0; i < lookup.length; i++) {
          var j = 1 - (Math.random() * .2);
          var r = radius * j;
          var s = r * lookup[i].sin;
          var c = r * lookup[i].cos;
          context.lineTo(point.x + c, point.y + s);
        }
        // context.arc(c.x, c.y, radius * (1 - i), 0, Math.PI * 2);
        context.fill();
      });
    };

    var frame = function() {
      var now = Date.now();
      var elapsed = now - time;
      time = now;
      splot(radius);
      radius += elapsed * .1;
      if (radius > canvas.width) return;
      requestAnimationFrame(frame);
    };

    var time;
    subscribe(fader, function() {
      time = Date.now();
      frame();
    });
  };

});
