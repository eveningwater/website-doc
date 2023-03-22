function toTop(top, scrollEl) {
    let event = scrollEl ? scrollEl : window;
    if (!scrollEl) scrollEl = document.documentElement || document.body;
    let clientHeight = scrollEl.offsetHeight;
    let timer = null;
    let backTop = true;
    event.onscroll = function () {
        let oTop = scrollEl.scrollTop;
        if (oTop >= clientHeight) {
            top.style.visibility = "visible";
        } else {
            top.style.visibility = "hidden";
        }
        if (!backTop) {
            clearTimeout(timer);
        }
        backTop = true;
    }
    let toTopHandler = function () {
        let oTop = scrollEl.scrollTop;
        let speed = Math.floor(-oTop / 6);
        scrollEl.scrollTop = oTop + speed;
        backTop = false;
        if (oTop == 0) {
            clearTimeout(timer);
            top.style.visibility = "hidden";
        }else{
            setTimeout(toTopHandler,30);
        }
    }
    top.onclick = function () {
        toTopHandler();
    }
}