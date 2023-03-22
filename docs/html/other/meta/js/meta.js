
var global = {
    anchorFlag:false
}
function setAnchor(){
    $('.anchor').on('click',function(){
        global.anchorFlag = !global.anchorFlag;
        openOrCloseAnchor($(this));
    });
}
function openOrCloseAnchor(el){
    if(global.anchorFlag){
        el.css({
            width:"250px"
        });
        $('.page').css({
            width:"calc(100% - 250px)",
            marginLeft:"250px"
        });
        el.find('.anchor-ul').fadeIn(600);
        el.find('.anchor-right-image').css({
            transform:"rotate(180deg)"
        });
        runAnchor(el);
    }else{
        el.css({
            width:"50px"
        });
        $('.page').css({
            width:"calc(100% - 50px)",
            marginLeft:"50px"
        });
        el.find('.anchor-ul').fadeOut(600);
        el.find('.anchor-right-image').css({
            transform:"rotate(0deg)"
        });
    }
}
function runAnchor(el){
    el.find('a').click(function(e){
        e.stopPropagation();
        const href = $(this).attr('anchor'),
            curTop = parseInt($('#' + href).offset().top),
            scrollTop = $('.page').scrollTop();
        $('.page').animate({ scrollTop:curTop + scrollTop - 5 },300);
        global.anchorFlag = false;
        openOrCloseAnchor(el);
    });
}
function codeLight(){
    const codeHtml = $('code');
    $.each(codeHtml, function (chIndex, ch) {
        const html = $(ch).html();
        $(ch).html(setStyleCode(html, 'html'));
    });
}
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
function runTop(){
    mainScroll($('.page'), $('.mainToTop'));
    clickToTop($('.page'), $('.mainToTop'));
}
function clickToTop(scrollEle, showEle) {
    showEle.click(function () {
        scrollEle.animate({ scrollTop: 0 }, 600);
    });
}
$(document).ready(function(){
    runTop();
    setAnchor();
    codeLight();
    $('.meta-image').click(function(){
        new ewViewer($(this));
    });
});
