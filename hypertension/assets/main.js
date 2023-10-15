window.addEventListener("scroll", function() {
    const topbar = document.querySelector("nav div.top-bar");

    if(document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
        topbar?.classList.add("scrolled");
    } else {
        topbar?.classList.remove("scrolled");
    }
})