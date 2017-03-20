var s2 = 1;
(function($){
    $.fn.extend({
        getUrl: function(oBox) {
            return this.each(function(i,obj){
                $(this).unbind("mouseup");
                $(this).mouseup(function(i){
                    var tag = $(obj).parent("li").parents("ul");
                    $("ol>li",tag).removeClass('hover');
                    $(obj).parent("li").addClass('hover').parents("li").addClass('current').siblings('li').removeClass('current');
                    var urls=$(this).attr("url");
                    //window.location.hash=urls;
                    $(oBox).setHeight(urls);
                });
            });
        },
        setHeight:function(obj){
            var	locationurl=obj || "Overview";
            $(this).attr("src",locationurl);
            $("html").scrollTop(0);
            console.log($(this))
            //$.fn.menuBtn(locationurl);
            return this.each(function(){
                console.log("this:",$(this))
                $(this).unbind("load");
                var _this=this;

                $(this).load(function(){
                    var heights = $(this).contents().find('body').height()+100,
                        iframetitle=$(this).contents().find("title").html();

                    $(this).height( heights < 400 ? 400 : heights);
                    $("title").html(iframetitle);
                    $.fn.Aclick(_this);
                });
            });
        },
        Aclick:function(obj){
            var iframe=$(obj);
            if(iframe.length==0){
                iframe=$(iframe,window.parent.document);
            }
            var Id=$(iframe).attr("id");

            $("a[url]").getUrl(iframe);
            $("a[url]",window.frames[Id].document).getUrl(iframe);
            $("li[anchorfn]",window.frames[Id].document).Anchorfn(Id);
        },
        Anchorfn:function(Id){
            return this.each(function(){
                $(this).click(function(){
                    var urls=$(this).attr("anchorfn"),
                        scrolltops=$(urls,window.frames[Id].document).offset().top+176;
                    $.browser.safari?$("body").scrollTop(scrolltops):$("html").scrollTop(scrolltops);
                });
            });
        },
        menuBtn:function(btn){
            var mina=$("a[url="+btn+"]"),
                menuol=mina.parent().parent(),
                menudiv=mina.parent(),
                minA=mina.siblings("a");
            $("#menu a").removeClass("hover");
            $("#menu ol").hide();
            $(mina).addClass("hover");
            if(menudiv[0].tagName=="DIV"){
                $(menudiv).siblings("a").addClass("hover");
                $(menudiv).parent().parent().siblings("a").addClass("hover")
                $(menudiv).parent().parent().show();
            }else if(menuol[0].tagName=="OL"){
                $(menuol).siblings("a").addClass("hover")
                $(menuol).show();
            }
            var title=$(mina).parent().parent(),
                titleHTML=title.siblings("a").html();
            //console.log(title[0].tagName);
            if(title[0].tagName=="UL"){
                titleHTML=$(mina).html();
            }else if(title[0].tagName=="LI"){
                titleHTML=title.parent().siblings("a").html();
            }else if(title[0].tagName=="OL"){
                titleHTML=title.siblings("a").html()
            }
            $("#document_title").html(titleHTML);
        }

    });

})(jQuery)