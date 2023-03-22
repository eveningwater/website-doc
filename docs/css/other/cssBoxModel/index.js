var global = {
  pageWidth: 0,
  isMobile: null
};
function codeLight() {
  var codeHtml = $('.ew-code-html');
  $.each(codeHtml, function (chIndex, ch) {
    var html = $(ch).html();
    $(ch).html(setStyleCode(html, 'html'));
  });
  var codeHtml = $('.ew-code-css');
  $.each(codeHtml, function (chIndex, cs) {
    var html = $(cs).html();
    $(cs).html(setStyleCode(html, 'css'));
  });
}
function resizePage() {
  $(window).resize(function () {
    global.pageWidth = window.innerWidth;
    global.isMobile = navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i);
  });
}
$(document).ready(function () {
  global.pageWidth = window.innerWidth;
  global.isMobile = navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i);
  toggleAnchorList($('[ id *= "sec-"]'));
  codeLight();
  runTop();
  resizePage();
  $('.ew-image').click(function () {
    new ewViewer($(this), global);
  });
});
