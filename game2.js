$(document).ready(function () {
    var nowDeg = 0;
    var mybullet = new Array();
    var shootbullet = new Array();
    var occupyDeg = new Array();
    var touchheight = $("#gamebase2").width() * 0.99;
    var num = 0;

    var rotation = function () {
        $(".circle").rotate({
            angle: 0,
            animateTo: 360,
            callback: rotation,
            duration: 5000,
            center: ["50%", "50%"],
            easing: function (x, t, b, c, d) {        // t: current time, b: begInnIng value, c: change In value, d: duration
                return c * (t / d) + b;
            }
        });
        $(".originbullet").rotate({
            angle: 0,
            animateTo: 360,
            callback: rotation,
            duration: 5000,
            center: ["50%", "-19vw"],
            easing: function (x, t, b, c, d) {
                return c * (t / d) + b;
            }
        });
    }
    function bulletrotate(num,bulletclass) {
        shootbullet[num] = function () {
            //console.log(typeof bulletclass);
            $(bulletclass).rotate({
                angle: 0,
                animateTo: 360,
                callback: shootbullet[num],
                duration: 5000,
                center: ["50%", "-19vw"],
                easing: function (x, t, b, c, d) {
                    return c * (t / d) + b;
                }
            });
            //$(".newbullet").removeClass("newbullet");
            
        };
        shootbullet[num]();
    }
    function getmatrix(a,b,c,d,e,f){
        var aa=Math.round(180*Math.asin(a)/ Math.PI);
        var bb=Math.round(180*Math.acos(b)/ Math.PI);
        var cc=Math.round(180*Math.asin(c)/ Math.PI);
        var dd=Math.round(180*Math.acos(d)/ Math.PI);
        var deg=0;
        if(aa==bb||-aa==bb){
            deg=dd;
        }else if(-aa+bb==180){
            deg=180+cc;
        }else if(aa+bb==180){
            deg=360-cc||360-dd;
        }
        return deg>=360?0:deg;
    }
    function shoot(a) {
        occupyDeg.push(nowDeg[0]);
        $(".nowbullet").addClass("newbullet" + a);
        $(".nowbullet").addClass("bulletoncir");
        $(".nowbullet").removeClass("nowbullet");
        //clearInterval(touchcheck);
        var newclass = ".newbullet"+a;
        var newobject = $(newclass);
        bulletrotate(a, newobject);
        $("#gamebase2").append("<div class=\"bullet nowbullet\">\
            <img src=\"bullet.png\" class=\"bullet_img\"/>\
        </div>");
        console.log(occupyDeg);
    }

    (function () {
        nowDeg = 0;
    })();
    (function () {
        $("#gamebase2").append("<div class=\"bullet nowbullet\">\
                <img src=\"bullet.png\" class=\"bullet_img\"/>\
            </div>");
    })();
    rotation();
    (function () {
        occupyDeg.push(0);
        setInterval(function () {
            //nowDeg = eval('get' + $(".circle").css('transform'));
            nowDeg = $(".circle").getRotateAngle();
            //console.log(nowDeg);
        }, 0);
    })();
    $("#gamebase2").on('click', '.nowbullet', function () {
        $(".nowbullet").stop().animate({ top: "69vw" }, 100, 'linear', function () {
            //console.log(num);
            shoot(num);
            num++;
        });
        var touchcheck = setInterval(function () {
            if (parseInt($(".nowbullet").css("top")) < touchheight) {
                //console.log($(".nowbullet").css("top"));
                for (var i = 0; i < occupyDeg.length; i++) {
                    if ((nowDeg[0] < occupyDeg[i] + 2) && (nowDeg[0] > occupyDeg[i] - 2)) {
                        $(".nowbullet").stop(true, false);
                        clearInterval(touchcheck);
                        //console.log(occupyDeg[0]);
                        console.log(nowDeg[0]);
                    }
                }
            }
        }, 0);
    });
});