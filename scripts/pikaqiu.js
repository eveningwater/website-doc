function initPiKaQiu() {
    const input = $("#drawSpeedInput"),
          endBtn = $("#endDrawBtn"),
          startBtn = $("#startDrawBtn"),
          startBySpeedBtn = $("#drawBySpeedBtn"),
          iframe = $("#drawIframe").contentWindow;
    const allButton =[{ el:endBtn,type:"end" },{ el:startBtn,type:"start" },{ el:startBySpeedBtn,type:"speed"}];
    allButton.forEach(item => {
        on(item.el,'click',() => {
            switch(item.type){
                case 'end':
                    iframe.stopWriteCode(iframe.code);
                    break;
                case 'start':
                    iframe.writeCode(iframe.code,100, false);
                    break;
                case 'speed':
                    const val = input.value;
                    if(!val || isNaN(Number(val)) || Number(val) % 1 !== 0){
                        return $message.info("请输入正整数的数字");
                    }else if(Number(val) <= 0 || Number(val) > 100){
                        return $message('数字大小应在1 ~ 100之间! ');
                    } else {
                        iframe.writeCode(iframe.code, Number(val), false);
                    }
                    break;
            }
        })
    })
}