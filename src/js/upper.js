var $ = require("./lib/qsa");
var debounce = require("./lib/debounce");
var transform = require("./lib/prefixed").transform;

var section = document.querySelector(".upper.river-zone");
var cutaway = document.querySelector(".sliding-scene");
var placeholder = document.querySelector(".upper-cutaway");
var slices = $(".log-stage");

var SHIFT_LIMIT = .7;

var setZone = debounce(function() {
  var last = null;
  for (var i = 0; i < slices.length; i++) {
    var bounds = slices[i].getBoundingClientRect();
    if (bounds.top > window.innerHeight * .5) {
      break;
    }
    last = slices[i];
  }
  if (last) {
    var current = cutaway.getAttribute("data-zone");
    var zone = last.getAttribute("data-zone");
    if (zone == current) return;
    cutaway.setAttribute("data-zone", zone);
  } else {
    cutaway.setAttribute("data-zone", "");
  }
});

window.addEventListener("scroll", function() {
  //handle the position of the sticky header
  //is the section onscreen?
  var sectionBounds = section.getBoundingClientRect();
  
  //get the size of the cutaway and its placeholder
  var cutawayBounds = cutaway.getBoundingClientRect();
  var placeBounds = placeholder.getBoundingClientRect();

  //the section doesn't need to be fixed, so unset everything
  if (placeBounds.top > 0 || sectionBounds.bottom < 0) {
    cutaway.classList.remove("fixed");
    cutaway.style[transform] = "";
    return; //no need to process further
  }

  //the section is onscreen in some way
  if (placeBounds.top < 0) {
    cutaway.classList.add("fixed");
    var boundary = cutawayBounds.height * SHIFT_LIMIT;
    var inverse = cutawayBounds.height - boundary;
    //clip against section bounds
    if (placeBounds.top > -boundary) {
      //the section is just barely offscreen to the top, so match it with the cutaway
      cutaway.style[transform] = `translateZ(0) translateY(${placeBounds.top}px)`;
    } else if (sectionBounds.bottom < inverse) {
      //the section is scrolling off the top of the screen, cutaway should go with it
      cutaway.style[transform] = `translateZ(0) translateY(${sectionBounds.bottom - cutawayBounds.height}px)`;
    } else {
      //the section fills the screen, so unset any translation
      cutaway.style[transform] = "";
    }

  }

  //update the zone
  setZone();
});