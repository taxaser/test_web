/**
 * Created by shiyuming on 16-3-1.
 */
var tmpAPIHost = 'http://www.xy.com';
var tmpJumpUrlParam = '';
var tmpRegEventRun = false;
var tmpIsReg = 0;

var adCheck = {
    checkUser:function(user){
        var reg		= /^[A-Za-z0-9]{4,20}$/;
        if(reg.test(user)){
            $.getJSON(tmpAPIHost+'/account/check/username?username='+user+'&jsoncallback=?', {}, function(data){
                if (data.status == 'success'){
                    $("#regUsernameTips").html('<font class="green">输入正确</font>').prev().css({'display':'block','background-position':'-290px -88px'});
                    $("#username").attr('exists',1);
                    return true;
                }else{
                    $("#regUsernameTips").html('<font class="red">用户名已存在</font>').prev().css({'display':'block','background-position':'-312px -88px'});
                    return false;
                }
            });
        }
        $("#regUsernameTips").html('<font class="red">用户名由4-20个数字和字母组成</font>').prev().css({'display':'block','background-position':'-312px -88px'});
        return false;
    },
    checkPass:function(pass){
        if((pass.length >= 6) && (pass.length <= 20)){
            $("#regPassTips").html('<font class="green">输入正确</font>').prev().css({'display':'block','background-position':'-290px -88px'});
            $("#logPassTips").html('<font class="green">输入正确</font>').prev().css({'display':'block','background-position':'-290px -88px'});
            return true;
        }
        $("#regPassTips").html('<font class="red">密码由6-20个字符组成</font>').prev().css({'display':'block','background-position':'-312px -88px'});
        $("#logPassTips").html('<font class="red">密码由6-20个字符组成</font>').prev().css({'display':'block','background-position':'-312px -88px'});
        return false;
    },
    checkRePass:function(pass, repass){
        if((repass === pass) && (repass.length > 0)){
            $("#regRePassTips").html('<font class="green">输入正确</font>').prev().css({'display':'block','background-position':'-290px -88px'});
            return true;
        }
        $("#regRePassTips").html('<font class="red">两次输入密码不同</font>').prev().css({'display':'block','background-position':'-312px -88px'});
        return false;
    }
};


//注册框相对浏览器左上位置;
var tmpWindowWidth = ($(window).width() < tmpFlashWidth) ? tmpFlashWidth : $(window).width();
var tmpRBtop = 168;
var tmpRBleft = (tmpWindowWidth - 320)/2+44;

function showRegBox(){
    showbox();
}
function showRegBox3(){
    //$("#regbox").show();
    showbox3();
}
//获取注册框相对浏览器左上位置
function getRegPosition(){
    var position = {top:tmpRBtop,left:tmpRBleft};
    return position;
}
function resetRegPosition(){
    tmpWindowWidth = ($(window).width() < tmpFlashWidth) ? tmpFlashWidth : $(window).width();
    tmpRBleft = (tmpWindowWidth - 530)/2+44;
    //$("#regbox").css({top:tmpRBtop,left:tmpRBleft});
}
function SetCookie(key, value, seconds) {
    var expires = new Date();
    expires.setTime(expires.getTime() + parseInt(seconds) * 1000);
    document.cookie = escape(key) + '=' + escape(value) + (seconds ? ('; expires=' + expires.toGMTString()) : "") + '; path=/;'
}
function GetCookie(key) {
    var cookie_start = document.cookie.indexOf(key);
    var cookie_end = document.cookie.indexOf(";", cookie_start);
    return cookie_start == -1 ? '' : decodeURI(document.cookie.substring(cookie_start + key.length + 1, (cookie_end > cookie_start ? cookie_end : document.cookie.length)))
}
function DelCookie(key) {
    var expires = new Date();
    expires.setTime(expires.getTime() - 10000);
    document.cookie = key + "=a; expires=" + expires.toGMTString() + '; path=/;'
}
$(function(){
    resetRegPosition();

    $("#"+usernameId).blur(function(){
        var user	= $("#"+usernameId).val();
        adCheck.checkUser(user);
    });

    $("#password").blur(function(){
        var pass	= $("#password").val();
        var repass	= $("#repassword").val();
        adCheck.checkPass(pass);
        adCheck.checkRePass(pass, repass);
    });
    $("#repassword").blur(function(){
        var pass	= $("#password").val();
        var repass	= $("#repassword").val();
        adCheck.checkRePass(pass, repass);
    });
    $("#"+regSubId).click(function(){

        var user	= $("#"+usernameId).val();
        var pass	= $("#password").val();
        var repass	= $("#repassword").val();
        var userExists  = $("#"+usernameId).attr('exists');
        var passFlg		= adCheck.checkPass(pass);
        var repassFlg	= adCheck.checkRePass(pass, repass);
        adCheck.checkUser(user);
        if(userExists && passFlg && repassFlg){

            if(typeof(tmpAttach) == 'undefined' ){
                var attach = 0 ;
            }else{
                var attach = tmpAttach ;
            }
            if(typeof(tmpTime) == 'undefined' ){
                var regTime = 0 ;
            }else{
                var regTime = tmpTime ;
            }
            if(typeof(tmpToken) == 'undefined' ){
                var regToken = 0 ;
            }else{
                var regToken = tmpToken ;
            }

            var url = '';
            var param = 'designid=' + tmpDesignid + '&serverid=' + tmpSid + '&advid='+tmpAdvid+'&gid='+tmpGid+'&siteid='+tmpSiteid+'&username='+user+'&password='+pass+"&attach="+attach+'&time='+regTime+'&token='+regToken+'&jsoncallback=?';
            try {
                var encrypt_data = xxtea.encrypt(param, regToken);
                url = 'o=' + encodeURIComponent(btoa(encrypt_data))+'&t=' + regTime+'&jsoncallback=?';
            }catch (e){
                url = param;
            }
            window._w = window.open('','_blank');
            $.getJSON(tmpAPIHost+'/account/ajax_register?'+url, {}, function(data){
                if (data.status == 'success'){
                    if(tmpAdvid == 24600 || tmpAdvid == 22770){
                        var img = new Image(1,1);img.src= "http://p.l.qq.com/ping?t=z&ttp=t&dtype=32&button=922&cpid=700099737";
                    }
                    SetCookie('username',user,86400*30);
                    sendEventLog(1004);
                    tmpIsReg = 1;

                    tmpJumpUrlParam = '?'+"remoteid="+monitorId;
                    var clientGameUrl = getClientType();
                    if(clientGameUrl){
                        setAdFlashCookie(data.uid,data.token);
                        $("#downexe").attr('href',clientGameUrl);
                        $("#regsuccess_username").html(user);
                        $("#regsuccess_password").html(pass);
                        $("#regbefore").hide();
                        $("#reglater").show();
                    }else{
                        jumpUrl();
                    }
                }else{
                    window._w.close();
                    if(data.status == 'error4'){
                        $("#regUsernameTips").html('<font class="red">用户名已存在</font>').prev().css({'display':'block','background-position':'-312px -88px'});
                    }else if(data.status == 'error3'){
                        $("#regUsernameTips").html('<font class="red">用户名不合法</font>').prev().css({'display':'block','background-position':'-312px -88px'});
                    }
                }
            });
        }
    });

    $("#"+logSubId).click(function(){
        var user	= $("#logusername").val();
        var pass	= $("#"+logId).val();
        var passFlg		= adCheck.checkPass(pass);
        if(passFlg){
            if(typeof(tmpTime) == 'undefined' ){
                var regTime = 0 ;
            }else{
                var regTime = tmpTime ;
            }
            if(typeof(tmpToken) == 'undefined' ){
                var regToken = 0 ;
            }else{
                var regToken = tmpToken ;
            }
            window._w = window.open('','_blank');
            $.getJSON(tmpAPIHost+'/account/ajax_login?username='+user+'&password='+pass+'&time='+regTime+'&token='+regToken+'&callback=?', {}, function(data){
                if(data.status == 'success'){
                    tmpIsReg = 1;
                    var tmpJumpUrlString = tmpAPIHost+tmpJumpUrl+tmpJumpUrlParam;
                    if( typeof(tmpJumpUrlOther) !== 'undefined' ){        // 兼容处理
                        if (tmpJumpUrlOther.length > 0){
                            tmpJumpUrlString = tmpJumpUrlOther;

                            if( $.browser.msie && parseInt($.browser.version) <= 6 ){
                                tmpJumpUrlString = tmpAPIHost+'/game/jump/'+tmpGid+tmpJumpUrlParam;
                            }
                        }
                    }
                    window._w.location = tmpJumpUrlString;


                    if (self != top) {

                        str = document.referrer;  //获取浏览器地址
                        var strs= new Array(); //定义一数组
                        strs=str.split(".com/"); //字符分割

                        var ife = document.createElement('iframe');
                        if(strs[0]){
                            ife.src = strs[0]+'.com/conn.html';
                            location.href = "http://www.xy.com";

                        }else{
                            location.href = "http://www.xy.com";
                        }
                        ife.style.display = 'none';
                        document.body.appendChild(ife);
                    }else{
                        location.href = "http://www.xy.com";
                    }



                }else{

                    window._w.close();
                    if(data.status == 'error'){
                        $("#logUsernameTips").html('<font class="red">登录错误</font>').prev().css({'display':'block','background-position':'-312px -88px'});
                    }
                }
            });
        }
    });

    $("#regbefore input").keypress(function(e){
        if(e.keyCode == 13){
            $('#regsubmit').trigger('click');
        }
    });
});
window.onresize = function(){
    resetRegPosition();
}


function sendEventLog(strEid){
    if(strEid === 1004) {
        setRegisterMark();
    }
    monitorEvent(strEid, false);
}

function jumpUrl(){

    var tmpJumpUrlString = tmpAPIHost+tmpJumpUrl+tmpJumpUrlParam;
    if( typeof(tmpJumpUrlOther) !== 'undefined' ){        // 兼容处理
        if (tmpJumpUrlOther.length > 0){
            tmpJumpUrlString = tmpJumpUrlOther;

            if( $.browser.msie && parseInt($.browser.version) <= 6 ){
                tmpJumpUrlString = tmpAPIHost+'/game/jump/'+tmpGid+tmpJumpUrlParam;
            }
        }
    }
    window._w.location = tmpJumpUrlString;


    if (self != top) {

        str = document.referrer;  //获取浏览器地址
        var strs= new Array(); //定义一数组
        strs=str.split(".com/"); //字符分割

        var ife = document.createElement('iframe');
        if(strs[0]){
            ife.src = strs[0]+'.com/conn.html';
            location.href = "http://www.xy.com";

        }else{
            location.href = "http://www.xy.com";
        }
        ife.style.display = 'none';
        document.body.appendChild(ife);
    }else{
        location.href = "http://www.xy.com";
    }


}

/**
 * Created by shiyuming on 16-2-25.
 */
/**
 * Created by shiyuming on 16-3-10.
 */
