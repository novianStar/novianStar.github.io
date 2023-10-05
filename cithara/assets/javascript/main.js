const timeout = {};

/**
 * Toggle Fullscreen
 */
function fullscreen() {
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

/**
 * Return to previous page
 */
function previous() {
    if(history.length > 1) {
        history.back();
    } else {
        window.location.href = "/cithara";
    }
}

/**
 * Toggle Microphone
 */
function microphone(targetElement = undefined, timeout = 10000) {
    const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
    recognition.lang = "th";

    let result;

    recognition.onresult = (event) => {
        result = event.results[0][0].transcript;

        clearTimeout(timeout.microphone);
        timeout.microphone = false;

        console.log(result);
        
        return result;
    }

    if(!timeout.microphone) {
        recognition.start();
    
        this.classList.add("active");

        timeout.microphone = setTimeout(() => {
            recognition.stop();
            
            this.classList.remove("active");
            timeout.microphone = false;
        }, timeout)
    } else {
        recognition.stop();

        this.classList.remove("active");
        clearTimeout(timeout.microphone);
        timeout.microphone = false;
    }
}

/**
 * Search
 */
function search() {

}

function searchMin() {

}