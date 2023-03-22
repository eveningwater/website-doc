/**
 *  锚点导航跳转功能
 */
function toggleAnchorList(h_el){
    if(!$('.toggleDynamicAnchor').length){
        $(`<aside class="toggleDynamicAnchor"></aside>`).appendTo("body");
    }
    if(!$('.dynamicAnchor').length){
        $(`<section class="dynamicAnchor"><ul></ul></section>`).appendTo("body");
    }
    let firstHTML =  '';
    for(let i = 0;i < h_el.length;i++){
        const idProp = h_el.eq(i).prop('id');
        const symbol = idProp.match(/-/g);
        if(symbol){
            firstHTML += `<li><a href="javascript:false;" data-load="${idProp}">${h_el.eq(i).text()}</a></li>`;
        }
    }
    $('.dynamicAnchor ul').html(firstHTML);
    $('.toggleDynamicAnchor').click(function(){
        $(this).next('.dynamicAnchor').show(200);
        let isActive = true;
        for(let i = 0;i < $('.dynamicAnchor li').length;i++){
            const className = $('.dynamicAnchor li').eq(i).prop('class');
            if(className.length){
                isActive = false;
                return;
            }
        }
        if(isActive){
            $('.dynamicAnchor ul li').eq(0).addClass('anchor-active');
            $('.dynamicAnchor ul li').eq(0).children().addClass('anchor-active');
        }
    });
    $(document).off('click','.dynamicAnchor a').on('click','.dynamicAnchor a',function(e){
        animateScrollTarget(this,e);
    });
    $('.container,.dynamicAnchor').on('click',function(){
        $('.dynamicAnchor').hide(200);
    });
}

function animateScrollTarget(a,d){
    d.preventDefault();
    let curId = $(a).attr('data-load'),
        curTop = $('#' + curId).offset().top,
        scroll_top = $('.container').scrollTop();
    $('.container').animate({
        scrollTop:curTop + scroll_top + 'px'
    });
    $(a).addClass('anchor-active').parent().addClass('anchor-active').siblings('li').removeClass('anchor-active').children().removeClass('anchor-active');
}