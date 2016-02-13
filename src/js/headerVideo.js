var canvid = require("canvid");
var aerial = document.querySelector(".splash video");

var logE = e => document.querySelector(".splash").innerHTML += e;

var check = function(e) {

  var playing = false;

  aerial.addEventListener("playing", () => playing = true);

  setTimeout(function() {

    aerial.removeEventListener("canplay", check);

    if (!playing) {

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
  }, 300);
};

//check for ability to play
aerial.addEventListener("canplay", check);
