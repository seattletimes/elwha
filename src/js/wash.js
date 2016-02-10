var DROP_COUNT = 5;
var DROP_SPEED = .15;

var lookup = [];
var tau = Math.PI * 2;
var points = 16;
for (var i = 0; i < points; i++) {
  lookup.push({
    cos: Math.cos(tau / points * i),
    sin: Math.sin(tau / points * i)
  });
}

class WashEffect {
  constructor(element) {
    this.element = element;
    this.image = element.querySelector("img.base");
    this.canvas = element.querySelector("canvas");
    this.context = this.canvas.getContext("2d");
    this.playing = false;
    this.time = 0;
    this.pattern = null;
    this.ready = false;

    var source = new Image();
    source.src = this.canvas.getAttribute("data-src");

    source.onload = () => this.imageLoaded(source);
  }

  imageLoaded(source) {
    this.canvas.width = source.width;
    this.canvas.height = source.height;

    this.pattern = this.context.createPattern(source, "no-repeat");
    this.context.fillStyle = this.pattern;
    this.context.globalAlpha = 0.1;

    this.ready = true;
    if (this.pending) {
      this.pending = false;
      this.play();
    }
  }

  play() {
    if (!this.ready) return this.pending = true;
    if (this.animating) cancelRequestAnimationFrame(this.animating);
    this.time = Date.now();
    var self = this;

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    var radius = 0;
    var drops = [];
    for (var i = 0; i < DROP_COUNT; i++) {
      drops.push({
        x: self.canvas.width * Math.random(),
        y: self.canvas.height * Math.random()
      })
    }
    
    var splot = function(radius) {
      drops.forEach(function(point) {
        self.context.beginPath();
        self.context.moveTo(point.x + radius, point.y)
        for (var i = 0; i < lookup.length; i++) {
          var j = 1 - (Math.random() * .2);
          var r = radius * j;
          var s = r * lookup[i].sin;
          var c = r * lookup[i].cos;
          self.context.lineTo(point.x + c, point.y + s);
        }
        // context.arc(c.x, c.y, radius * (1 - i), 0, Math.PI * 2);
        self.context.fill();
      });
    };

    var check = function() {
      var bounds = self.canvas.getBoundingClientRect();
      return (bounds.top > window.innerHeight || bounds.bottom < 0);
    }

    var pause = function() {
      setTimeout(function() {
        self.time = Date.now();
        frame();
      }, 200)
    }

    var frame = function() {
      if (check()) return pause();
      var now = Date.now();
      var elapsed = now - self.time;
      self.time = now;
      splot(radius);
      radius += elapsed * .15;
      if (radius > self.canvas.width) return;
      self.animating = requestAnimationFrame(frame);
    };

    frame();
  }
}

module.exports = WashEffect;
    