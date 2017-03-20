$(function(){
    set_height();
    $("body").on('contentchanged',function(){
        set_height();
    })
    function set_height(){
        var IframeH=document.body.offsetHeight+100;
        var s = $("#load_frame",parent.document);
        parent.document.getElementById('load_frame').style.height=IframeH;
        s.height(IframeH);
        console.log(s);
        console.log("s:",s.height())
    }

})
