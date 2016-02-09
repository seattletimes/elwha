var scrollNotified = [];
var noop = function() {};

var subscribe = function(el, callback = noop, test = "visible") {
  scrollNotified.push({ el, callback, test });
  onScroll();
};

subscribe.VISIBLE = "visible";
subscribe.ENTER = "enter";
subscribe.MIDDLE = "middle";

var onScroll = function() {
  scrollNotified = scrollNotified.filter(function(sub) {
    var bounds = sub.el.getBoundingClientRect();
    switch (sub.test) {
      case subscribe.ENTER:
        if (bounds.top > 0 && bounds.top < window.innerHeight) {
          sub.callback();
          return false;
        }
      break;

      case subscribe.MIDDLE:
        if (bounds.top > 0 && bounds.top < window.innerHeight * .5) {
          sub.callback();
          return false;
        }
      break;

      case subscribe.visible:
      default:
        if (bounds.top > 0 && bounds.bottom < window.innerHeight) {
          sub.callback();
          return false;
        }
    }
    
    return true;
  });
};

window.addEventListener("scroll", onScroll);


module.exports = subscribe;