(function($){
    $.fn.show_hide_img=function(o){
        o = $.extend({
            contrlBox:".contrl ul",
            btn:'<li><a href="javascript:void(0)"></a></li>',
            btns:".contrl ul li",
            box:'.box',
            img:".box li",
            target:"index",
            type:false,
            auto:true,
            _width:0,
            start:0,
            time:4000
        },o||{});
        return this.each(function(){
            //console.log(this);
            var div = $(this),
                imgs=$(o.img,this),
                target = $(o.target,this),
                contrl_list = $(o.contrlBox,this),
                contrl_tag = o.btn,
                curr=o.start,
                type= o.type,
                _width = o._width,
                box = $(o.box,this),
                show_img,
                btns,
                total = imgs.length- 1;

            if(type){
                show_img = animate_show;
                box.width(imgs.length*_width);
            }else{
                imgs.hide();
                show_img = show_pic;
            }


            function set_target(elem){
                elem.each(function(){
                    var s = $(this).index();
                    $(this).attr(o.target,s);
                    $(contrl_tag).appendTo(contrl_list).attr(o.target,s).mouseover(function(){
                        var z = $(this).attr(o.target);

                        show_img(z);
                    });
                })
                btns = $(o.btns);
            }


            //set_target(btns);
            set_target(imgs);

            function animate_show(z){
                var re_width = z*_width;

                if( curr == total+1 ){
                    o.type?box.animate({ left : '0'}, "slow"):box.animate({ top : '0px'}, "slow");
                    curr=0;
                }else{
                    o.type?box.animate({ left : "-"+re_width }, "slow"):box.animate({ top : "-"+re_width }, "slow");
                    curr=z;
                }
                contrl_list.find("li").eq(curr).addClass("hover").siblings().removeClass("hover");


            }

            function show_pic(img){
                if(imgs.eq(img).is(":hidden")){
                    imgs.fadeOut(500)
                    imgs.eq(img).fadeIn(200);
                    btns.removeClass("hover");
                    btns.eq(img).addClass("hover");
                    curr = img;
                }
            }
            show_img(0)
            if(o.auto)
                setInterval(function(){
                    show_img(curr);
                    curr++;
                    if(curr>total){curr=0}
                }, o.time);
        })
    }

})(jQuery)