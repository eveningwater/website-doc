function mainScroll(scrollEle, showEle) {
    scrollEle.scroll(function () {
        var top = $(this).scrollTop();
        if (top >= 100) {
            showEle.fadeIn(600);
        } else {
            showEle.fadeOut(600);
        }
    });
}
function clickToTop(scrollEle, showEle) {
    showEle.click(function () {
        scrollEle.animate({ scrollTop: 0 }, 600);
    });
}
function runTop(){
    mainScroll($('.container'), $('.mainToTop'));
    clickToTop($('.container'), $('.mainToTop'));
}