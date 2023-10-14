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
function microphone(self, targetElement = undefined, timeout = 10000) {
    const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
    recognition.lang = "th";

    let result;

    recognition.onresult = (event) => {
        result = event.results[0][0].transcript;

        self.classList.remove("active");

        clearTimeout(timeout.microphone);
        timeout.microphone = false;

        modifiedResult = result.split(" ");
        
        modifiedResult.forEach((r, index)=> {
          if (r === "ศูนย์") {
            modifiedResult[index] = "0";
          } else if (r === "หนึ่ง") {
            modifiedResult[index] = "1";
          }
          else if (r === "สอง") {
            modifiedResult[index] = "2";
          }
          else if (r === "สาม") {
            modifiedResult[index] = "3";
          }
          else if (r === "สี่") {
            modifiedResult[index] = "4";
          }
          else if (r === "ห้า") {
            modifiedResult[index] = "5";
          }
          else if (r === "หก") {
            modifiedResult[index] = "6";
          }
          else if (r === "เจ็ด") {
            modifiedResult[index] = "7";
          }
          else if (r === "แปด") {
            modifiedResult[index] = "8";
          }
          else if (r === "เก้า") {
            modifiedResult[index] = "9";
          }
        })

        targetElement.value = targetElement ? modifiedResult.toString().replaceAll(",",  " ") : "";
        targetElement?.dispatchEvent(new Event('input'));
        
        return result;
    }

    if(!timeout.microphone) {
        recognition.start();
    
        self.classList.add("active");

        timeout.microphone = setTimeout(() => {
            recognition.stop();
            
            self.classList.remove("active");
            timeout.microphone = false;
        }, timeout)
    } else {
        recognition.stop();

        self.classList.remove("active");
        clearTimeout(timeout.microphone);
        timeout.microphone = false;
    }
}

/**
 * 
 */
function toggleSidebar() {
  const sidebar = document.querySelector(".nav-side-bar");

  sidebar.classList.toggle("active");

  if (sidebar.classList.contains("active")) {
    sideBarOverlay.classList.add("active");
  } else {
    sideBarOverlay.classList.remove("active");
  }
}

const sideBarOverlay = document.querySelector(".side-bar-overlay");

sideBarOverlay?.addEventListener("click", function() {
  toggleSidebar();
})

function toggleHelp() {
  const help = document.querySelector(".help-container");

  help.classList.toggle("active");
}