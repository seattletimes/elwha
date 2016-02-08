if (window.matchMedia && window.matchMedia("(min-width: 600px)").matches) {
  var source = document.querySelector("header.splash video source");
  source.src = source.src.replace("small", "large");
}

