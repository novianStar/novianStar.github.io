window.addEventListener("scroll", function() {
    const topbar = document.querySelector("header nav div.top-bar");

    if(document.body.scrollTop > 56 || document.documentElement.scrollTop > 56) {
        topbar?.classList.add("scrolled");
    } else {
        topbar?.classList.remove("scrolled");
    }
})