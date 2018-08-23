var global_shopId = "";
$(document).ready(function () {
    _infoTelempt = '<li id="{message_id}" class="menu-msg" style="white-space: normal;"><a href="#" style="white-space: normal;">' +
        '<div class="pull-left">' +
        '<img src="/BusinessMG/include/plugins/dist/img/user2-160x160.jpg" class="img-circle" alt="User Image">' +
        '</div>' +
        '<h4>' +
        '<span class="menu-title">{title}</span>' +
        '<small><i class="fa fa-clock-o"></i><span class="menu-time">{createtime}</span></small>' +
        '</h4>' +
        '<p class="menu-content">{content}</p>' +
        '</a>' +
        '</li>';

    _localUrl = window.location.href;
    _remoteUnreadUrl = "/BusinessMG/barber/message/web/manager/count/unread";
    _remoteReadUrl = "/BusinessMG/barber/message/web/query/manager";

    function getMessageCount() {
        $.get(_remoteUnreadUrl, {global_shopId: global_shopId}, function (data) {
            data = eval(data);
            if (data['code'] == 1000) {
                $(".infoCount").text(data['msg']);
                if (data['msg'] == 0) {
                    $(".infohead").text("没有信息！");
                    $(".infohead").next().find(".menu").empty();
                    $(".infofooter").css("display", "none");
                } else {
                    $(".infohead").text("你有" + data["msg"] + "信息！");
                    $.get(_remoteReadUrl, {flag: 3, global_shopId: global_shopId}, function (data) {
                        data = eval(data);
                        if (data["code"] == 1000) {
                            unreadyList = data['unready'];
                            if (unreadyList.length != 0) {
                                element = unreadyList[0];
                                _html = _infoTelempt;
                                _html = _html.replace("{message_id}", element['message_id'])
                                    .replace("{title}", element['title'])
                                    .replace("{createtime}", element['createtime'])
                                    .replace("{content}", element['content']);
                                $(".infohead").next().find(".menu").append(_html);
                            }
                        }
                    }, "json");
                }
            } else {
                $(".infohead").text("没有信息！");
                $(".infohead").next().find(".menu").empty();
                $(".infofooter").css("display", "none");
            }
        }, "json");
    }

    getMessageCount();

    //填写商户信息
    $.get("/BusinessMG/user/shopInfo", null, function (data) {
        if (data["code"] == 1000) {
            var _tel = data["msg"]["tel"];
            var _createTime = data["msg"]["creattime"];
            $(".menu_shopname").text(_tel);
            $(".menu_shopname_create").text("入驻时间:" + _createTime);
        }
    }, "json");

    $.get("/BusinessMG/shoplistmodule/quertall", null, function (data) {
        code = data['code'];
        _html = '<div class="listContainer"><select class="shopList" size=1></select></div>';
        if (code == 1000) {
            $(".navbar-custom-menu").after(_html);
            var _html_option = '<option value="{id}">{context}</option>';
            var _temp = "";
            $(data["msg"]).each(function (index, element) {
                _temp += _html_option.replace("{id}", element['barberShop_id']).replace("{context}", element["name"]);
            });
            $(".shopList").append(_temp);
            $(".shopList").find("option[value=" + mshopid + "]").attr("selected", true);
            $(".shopList").on("change", function () {
                global_shopId = $(this).val();
                if (_localUrl.indexOf("/index") > 0) {
                    index_init();
                    return;
                }
                if (_localUrl.indexOf("/menu/message") > 0) {
                    getMessageCount();
                    getAllMessage();
                    return;
                }
                if (_localUrl.indexOf("/menu/shop") > 0) {
                    getshopInfo();
                    return;
                }
                if (_localUrl.indexOf("/order/analysis?year") > 0) {
                    initSelectedYear(nowYear, $("#year"));
                    loadMonthOrderNumber(nowYear);
                    loadMonthOrderMoney(nowYear);
                    yearBarbersMoney(nowYear);
                    return;
                }
                if (_localUrl.indexOf("/order/analysis?month") > 0) {
                    var startTime = $("#startTime_input").val().split("-").join("") + "0000";
                    var endTime = $("#endTime_input").val().split("-").join("") + "2359";
                    loadChartData(startTime, endTime);
                    return;
                }
            });
        } else {
            $(".shopList").remove();
        }
        if (_localUrl.indexOf("index") > 0) {
            index_init();
            return;
        }

    }, "json");

});