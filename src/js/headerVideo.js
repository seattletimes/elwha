var canvid = require("canvid");
var aerial = document.querySelector(".splash video");

var logE = e => document.querySelector(".splash").innerHTML += e;

var check = function() {
  setTimeout(function() {

    aerial.removeEventListener("canplay", check);

    // for (var key in aerial) logE(key)

    if (!aerial.currentTime) {

      var cv = canvid({
        selector: ".aerial-video",
        videos: {
          aerial: { src: "./assets/video/video.jpg", frames: 151, cols: 6 }
        },
        width: 532,
        height: 300,
        loaded: () => cv.play("aerial")
      });

    }
  }, 100);
};

//check for ability to play
aerial.addEventListener("canplay", check);
