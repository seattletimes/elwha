var canvid = require("canvid");
var aerial = document.querySelector(".splash video");

var logE = e => document.querySelector(".splash").innerHTML += e;

var playing = false;
var switched = false;

var useCanvid = function() {
  var cv = canvid({
    selector: ".aerial-video",
    videos: {
      aerial: { src: "./assets/video/video.jpg", frames: 151, cols: 6 }
    },
    width: 532,
    height: 300,
    loaded: () => cv.play("aerial")
  });
};

var test = function() {
  setTimeout(function() {

    aerial.removeEventListener("canplay", check);

    if (!playing && !switched && window.innerWidth < 800) {
      useCanvid();
      switched = true;
    }
  }, 300);
};

var check = function(e) {
  aerial.addEventListener("playing", () => playing = true);
  test();
};

if (aerial.readyState == 4) {
  //schedule playback test now
  test();
} else {
  //wait for video to load, then check
  aerial.addEventListener("loadeddata", check);
  aerial.addEventListener("canplay", check);
}

document.querySelector(".splash").addEventListener("click", function() {
  if (!switched) aerial.play();
});

