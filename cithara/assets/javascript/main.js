function toggleFullscreen() {
    if (!document.fullscreenElement) {
        // If the document is not currently in fullscreen mode
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) { // Firefox
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
          document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
          document.documentElement.msRequestFullscreen();
        }
      } else {
        // If the document is currently in fullscreen mode
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
          document.msExitFullscreen();
        }
    }
}

const fullscreenButtons = document.querySelectorAll(".fullscreen");

fullscreenButtons.forEach(button => {
    button.addEventListener("click", toggleFullscreen);
})