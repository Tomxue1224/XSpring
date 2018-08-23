var username = document.cookie.split(";")[0].split("=")[1];

if (username && username.length == 11) {
    $("#username").val(username);
}
$("document").ready(function () {
    var windowHieght = $(window).height();
    var windowWidth = $(window).width();
    $(".pagebg").css({height: windowHieght, width: windowWidth});
    $(".pageContent").css({height: windowHieght, width: windowWidth});

    $("#closeAlert").click(function () {
        $("#alertTitle").text("");
        $("#alertContent").text("");
        $("#myAlert").fadeOut();
    });
    var alertTitle = ["警告！", "错误！"];
    var alertContent = ["请填写用户名！", "请填写密码！", "用户名或密码错误！"];
    $(".login").click(function () {
        var loginID = $("#username").val();
        var password = $("#password").val();
        if (!loginID) {
            $("#alertTitle").text(alertTitle[0]);
            $("#alertContent").text(alertContent[0]);
            $("#myAlert").fadeIn();
            return;
        }
        if (!password) {
            $("#alertTitle").text(alertTitle[0]);
            $("#alertContent").text(alertContent[1]);
            $("#myAlert").fadeIn();
            return;
        }

        var data = {"loginID": loginID, "password": password};
        $.post("../user/checkLogin", data, function (data) {
            data = eval(data);
            if (data["code"]) {
                switch (data["code"]) {
                    case 3011:
                    case 3012:
                        $("#alertTitle").text(alertTitle[1]);
                        $("#alertContent").text(alertContent[2]);
                        $("#myAlert").fadeIn();
                        break;
                    case 3067:
                        $("#myAlert").fadeOut();
                        $("#myModal").modal({
                            "backdrop": false,
                            "keyboard": false
                        });
                        break;
                    case 600:
                        location.href = "../user/index";
                        break;
                }
            }
        }, "json");
    });

    //通过模态窗口登录操作
    $(".captchaLogin").click(function () {
        $("#captchaAlert").remove();
        var url = "../captcha/check";
        var data = {"captcha": $(".inputCaptDiv input").val()};
        $.post(url, data, function (data) {
            data = eval(data);
            if (data["code"]) {
                switch (data["code"]) {
                    case 3032:
                        var tag = '<div id="captchaAlert" class="alert alert-warning">' +
                            '<a href="#" class="close" id="captchaCloseAlert" data-dismiss="alert">&times;</a>' +
                            '<span>验证码输入错误！</span>' +
                            '</div>';
                        $(".modal-footer").prepend(tag);
                        break;
                    case 600:
                        location.href = "../user/index";
                        break;
                }
            }
        }, "json");
    });

    //监听警告窗口被关闭时
    $('#captchaAlert').bind('closed.bs.alert', function (event) {
        $(".inputCaptDiv input").val("");
    })

    //当页面焦点子啊输入密码框的时候，监听回车键
    $("#password").keydown(function (event) {
        if (event.which == 13) {
            $(".login").click();
        }
    });

    $(".inputCaptDiv input").keydown(function (event) {
        if (event.which == 13) {
            $(".captchaLogin").click();
        }
    });

    //浏览器窗口大小改变
    $(window).resize(function () {
        var windowHieght = $(window).height();
        var windowWidth = $(window).width();
        $(".pagebg").css({height: windowHieght, width: windowWidth});
        $(".pageContent").css({height: windowHieght, width: windowWidth});
    });
});