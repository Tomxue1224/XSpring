var templet = '<div  class="bookOrder {orderStatus}" id="{bookid}">'
    + '<div class="orderItem">'
    + '<span class="cancleOrder">取消订单</span>'
    + '<span>时间：{time}&nbsp;&nbsp;&nbsp;{date}</span><br>'
    + '<span class="simpleOrderInfo">服务内容：&nbsp;&nbsp;{serviceName}</span>'
    + '</div>'
    + '<div class=" order_msg">'
    + '<div>发起人：<span class="ok_creater">{creater}</span></div>'
    + '<div>顾客：<span class="ok_shopName">{customername} [ {customerType} ]</span></div>'
    + '<div>发型师：<span class="ok_barber">{barberName}</span></div>'
    + '<div><span id="infoTitle">服务内容：</span><span class="ok_content">{serviceContent}</span></div>'
    + '<div>价格：<span class="ok_fee" >{fee}</span>元</div>'
    + '<div>耗时：<span class="ok_time">{serviceTime}小时</span></div>'
    + '<div>座位号：<span class="ok_address">{seat}号</span>'
    + '</div><div>发型师电话：<span class="ok_phone barberPhone">{barberPhone}</span></div>'
    + '<div>顾客电话：<span class="ok_phone customerPhone">{customPhone}</span></div><div>支付方式：<span class="ok_payWay">{payway}</span></div></div>'
    + '<div class="ok_pay {isShow}" id="{orderID}" itemid="booking0"><span>{content}</span></div>'
    + '</div>';

var book = new Array(); // 未完成的订单数据
var finsh = new Array(); // 已完成的订单数据
var cancle = new Array();// 已取消的订单数据
var _tempBook = new Array(); // 已完成订单的订单数量
var _tempFinsh = new Array(); // 已完成订单的订单数量
var _tempCancle = new Array();// 已取消订单的订单数量
var isInitData = true; // 是否初始化数据
var getPayStatus;// 获取某一个订单微信支付的支付状态
var customerType = ["平台客", "熟客"];

// 不能自动更新数据的获取订单数据-----begin
function getStaticOrderData() {
    $.get("../manager/order/web/select/today/order", {global_shopId: global_shopId}, function (data) {
        data = eval(data);
        if (data["code"] != 1000) {
            return;
        }
        if (data["msg"].length != 0) {
            $(data["msg"]).each(function (index, ele) {
                switch (ele["status"]) {
                    case 1:
                        book.push(ele);
                        break;
                    case 2:
                    case 4:
                    case 5:
                        finsh.push(ele);
                        break;
                    case 3:
                    case 6:
                        cancle.push(ele);
                        break;
                }
            });
        } else {
            $(".content h1").remove();
            $(".content").append("<h1>暂无数据</h1>");
            $(".spinner").css("display", "none");
        }
        showData(false);
    }, "json");
}

// 不能自动更新数据的获取订单数据-----end

// 模板替代工具方法--用来不能自动更新数据获取订单信息---end
function playAudio() {
    $("#tipAudio")[0].play();
};

// 模板替代工具方法--用来不能自动更新数据获取订单信息---begin
function commonReplace(ele, _html, isShow, showContent, color) {
    var date = new Date(parseInt(ele["beginTime"]) * 1000);
    var _hour = date.getHours();
    var _Minutes = date.getMinutes();
    var _year = date.getFullYear();
    var _month = date.getMonth() + 1;
    var _day = date.getDate();
    _hour = (_hour < 10 ? "0" + _hour : _hour);
    _Minutes = (_Minutes < 10 ? (_Minutes == 0 ? "00" : "0" + _Minutes)
        : _Minutes);
    var _time = _hour + ":" + _Minutes;
    var _fullTime = _year + "-" + _month + "-" + _day;
    var payway = "";
    switch (ele["paywap"]) {
        case 1:
            payway = "现金支付";
            break;
        case 2:
            payway = "微信支付";
            break;
        case 3:
            payway = "支付宝支付"
            break;
        case 4:
            payway = "美团团购";
            break;
        case 5:
            payway = "大众团购";
            break;
    }
    var create = ['消费者', '美发师', '管理员'];
    _html = _html.replace("{bookid}", ele["order_id"]).replace("{creater}",
        create[ele["appeople"] - 1]).replace("{time}", _time).replace(
        "{date}", _fullTime)
        .replace("{serviceName}", ele["serviceContent"]).replace(
            "{customername}", ele["customername"]).replace(
            "{customerType}", customerType[ele["customertype"] - 1])
        .replace("{barberName}", ele["barberName"]).replace(
            "{serviceContent}", ele["serviceContent"]).replace("{fee}",
            ele["orderFee"]).replace("{serviceTime}",
            ele["servicetime"]).replace("{seat}", ele["seat"]).replace(
            "{barberPhone}", ele["barerPhone"]).replace(
            "{customPhone}", ele["customerPhone"]).replace("{orderID}",
            ele["order_id"]).replace("{orderStatus}", color).replace(
            "{isShow}", isShow).replace("{content}", showContent)
        .replace("{payway}", payway);
    return _html;
}

// 桌面消息通知
function showNotify(title, content) {
    var icon_url = '../include/image/xinyunbeauty.jpg';
    if (window.Notification) {
        if (Notification.permission === 'granted') {
            var notification = new Notification(title, {
                "icon": icon_url,
                "body": content
            });
        } else {
            Notification.requestPermission();
        }
        ;
    }
}

// 复制数组
function copyArray(from, to) {
    to = new Array();
    to = to.concat(from);
    return to;
}

// 消息提醒
function tipNotify() {
    if (isInitData) {
        _tempBook = book;
        _tempFinsh = finsh;
        _tempCancle = cancle;
        isInitData = false;
    } else {
        $(book)
            .each(
                function (index, element) {
                    isEqual = true;
                    $(_tempBook).each(function (index, tempElement) {
                        if (tempElement[0] == element[0]) {
                            isEqual = false;
                        }
                    });
                    if (isEqual) {
                        playAudio();
                        showNotify("新订单", element[2] + "("
                            + element[10] + ")预约：" + element[3]
                            + "  " + element[6] + "");
                    }
                });
        _tempBook = copyArray(book, _tempBook);
    }
}

function handle(e) {
    orderList = e.data.split("data:")[1].split(";");
    var orderGroup = new Array();
    if (orderList.length > 1) {
        $(".content h1").remove();
        for (i = 0; i < orderList.length - 1; i++) {
            _order = getArray(orderList[i]);
            switch (_order[5]) {
                case "1":
                    book.push(_order);
                    break;
                case "2":
                case "4":
                case "5":
                    finsh.push(_order);
                    break;
                case "3":
                case "6":
                    cancle.push(_order);
                    break;
            }
        }
    } else {
        $(".content h1").remove();
        $(".content").append("<h1>暂无数据</h1>");
    }
    showData(true);
}

var source;

function index_init() {
//	if (source) {
//		source.removeEventListener('message', handle, false);
//	}
//	// 服务器推送消息--SSE
//	if (!!window.EventSource) {
//		source = new EventSource(
//				'../manager/order/web/select/today/sse/order?shopId='
//						+ global_shopId);
//		source.addEventListener('message', handle, false);
//		/*source.removeEventListener('message', handle, false);*/
//	} else {
    getStaticOrderData();
//	}
}

// flog为false表示不能使用sse,true代表可以使用sse
function showData(flog) {
    $(".bookContent").empty();
    $(".finshContent").empty();
    $(".cancleContent").empty();
    // 消息提醒
    tipNotify();

    $(".gayNum").text(cancle.length + "单");
    var redAllMoney = 0.0;
    // 界面显示未完成订单数据
    $(book).each(function (index, ele) {
        var _html = templet;
        var isShow = "show";
        var showContent = "付款";
        var payResult, payWay;
        if (flog) {
            payResult = ele[12];
            payWay = ele[1];
            redAllMoney = redAllMoney + parseFloat(ele[8]);
        } else {
            payResult = ele["payResult"];
            payWay = ele["paywap"];
            redAllMoney = redAllMoney + parseFloat(ele["orderFee"]);
        }
        if (payResult == 1) {
            isShow = "disable";
            if (ele[1] == 4) {
                showContent = "已付款(团购)"
            } else {
                showContent = "已付款(微信)"
            }
        }
        if (flog) {
            _html = commonSSEReplace(ele, _html, isShow, showContent, "red");
        } else {
            _html = commonReplace(ele, _html, isShow, showContent, "red");
        }
        $(".bookContent").append(_html);
    });
    $(".redNum").text(book.length + "单" + "/" + redAllMoney + "元");

    $(".cancleOrder").on("click", function (e) {
        var isCancle = confirm("你确定要取消订单吗");
        var element = this;
        if (isCancle) {
            $(".alertContent").css("display", "block");
            $(".myalert").animate({
                top: "5px"
            }, 500);
            $(".myalert button").click(function () {
                var isSendMSG = false;
                if ($(this).val() == "no")
                    isSendMSG = false;
                else if ($(this).val() == "yes") {
                    isSendMSG = true;
                }
                $(".myalert").animate({
                    top: "-100px"
                }, 500, function () {
                    $(".alertContent").css("display", "none");
                    var _flog = isSendMSG ? 1 : 0;
                    var _id = $(element).parent().parent().attr("id");
                    $.post("../manager/order/web/order/cancle", {
                        "orderid": _id,
                        "issendmessage": _flog
                    }, function (data) {
                        data = eval(data);
                        if (data["code"] == 1000) {
                            alert("订单取消成功!");
                        } else {
                            alert(data["msg"]);
                        }
                    }, "json");
                });
            });
        }
    });
    book = new Array();

    var finshNum = 0.0;
    // 界面显示已完成订单数据
    $(finsh).each(function (index, ele) {
        var _html = templet;
        if (flog) {
            finshNum = finshNum + parseFloat(ele[8]);
            _html = commonSSEReplace(ele, _html, "disable", "已完成", "blue");
        } else {
            finshNum = finshNum + parseFloat(ele["orderFee"]);
            _html = commonReplace(ele, _html, "disable", "已完成", "blue");
        }
        $(".finshContent").append(_html);
        $(".finshContent .cancleOrder").css("display", "none");
    });
    $(".blueNum").text(finsh.length + "单" + "/" + finshNum + "元");
    finsh = new Array();

    var cancleNum = 0.0;
    // 界面显示已取消订单数据
    $(cancle).each(function (index, ele) {
        var _html = templet;
        if (flog) {
            cancleNum = cancleNum + parseFloat(ele[8]);
            _html = commonSSEReplace(ele, _html, "disable", "已失效", "gay");
        } else {
            cancleNum = cancleNum + parseFloat(ele["orderFee"]);
            _html = commonReplace(ele, _html, "disable", "已失效", "gay");
        }
        $(".cancleContent").append(_html);
        $(".cancleContent .cancleOrder").css("display", "none");
    });
    $(".gayNum").text(cancle.length + "单" + "/" + cancleNum + "元");
    cancle = new Array();
    $(".spinner").css("display", "none");

    // 生成支付二维码
    $(".ok_pay").on(
        "click",
        function () {
            if ($(this).hasClass("disable")) {
                return;
            }
            $(".spinner").css("display", "block");
            var parent = $(this).parent();
            id = $(this).attr("id");
            time = (new Date()).getTime();
            var qrcodeImg = new Image();
            var successImg = new Image();
            successImg.src = "../include/image/paySuccess.png"
            qrcodeImg.src = "../qrcode/icon?order_id=" + id + "&&version="
                + time;
            // 二维码图片加载成功
            qrcodeImg.onload = function () {
                _orderInfo = $(parent).find(".order_msg");
                $("#cashier-customer-name").text(
                    $(_orderInfo).find(".ok_shopName").text());
                $("#cashier-customer-phone").text(
                    $(_orderInfo).find(".customerPhone").text());
                $("#carshier-barber-name").text(
                    $(_orderInfo).find(".ok_barber").text());
                $("#cashier-serivce-content").text(
                    $(_orderInfo).find(".ok_content").text());
                $("#cashier-service-time").text(
                    $(_orderInfo).find(".ok_time").text());
                $("#cashier-service-seat").text(
                    $(_orderInfo).find(".ok_address").text());
                $("#cashier-fee")
                    .text($(_orderInfo).find(".ok_fee").text());
                $("#payQrcode").attr("src", qrcodeImg.src);
                $(".spinner").css("display", "none");
                $(".CashierContent").css("display", "block");

                // 循环判断订单状态是否改变----start
                getPayStatus = setInterval(function () {
                    $.get("../pay/result/notify", {
                        "orderid": id
                    }, function (data) {
                        if (!data) {
                            $("#payQrcode").attr("src", successImg.src);
                            clearInterval(getPayStatus);
                        }
                    }, "json")
                }, 1000);
                // 循环判断订单状态是否改变----end

            }
            // 二维码图片加载失败
            qrcodeImg.onerror = function () {
                alert("生成支付二维码失败！");
                $(".spinner").css("display", "none");
            }
            //
        });
}

// 通过sse获取的数据格式化为数组--begin
function getArray(stringArray) {
    newString = stringArray.substring(1, stringArray.length - 1);
    var array = newString.split(",");
    return array;
}

// 通过sse获取的数据格式化为数组--end

// 模板替代工具方法--用来自动更新数据获取订单信息---begin
function commonSSEReplace(ele, _html, isShow, showContent, color) {
    console.info(ele);
    date = new Date(parseInt(ele[4]) * 1000);
    var _hour = date.getHours();
    var _Minutes = date.getMinutes();
    var _year = date.getFullYear();
    var _month = date.getMonth() + 1;
    var _day = date.getDate();
    _hour = (_hour < 10 ? "0" + _hour : _hour);
    _Minutes = (_Minutes < 10 ? "0" + _Minutes : _Minutes);
    _time = _hour + ":" + _Minutes;
    _fullTime = _year + "-" + _month + "-" + _day;
    var payway = "已付款(微信)";
    var create = ["消费者", "美发师", "管理员"];
    var payway = "";
    switch (parseInt(ele[1])) {
        case 1:
            payway = "现金支付";
            break;
        case 2:
            payway = "微信支付";
            break;
        case 3:
            payway = "支付宝支付"
            break;
        case 4:
            payway = "美团团购";
            break;
        case 5:
            payway = "大众团购";
            break;
    }
    _html = _html.replace("{bookid}", ele[0]).replace("{time}", _time).replace(
        "{date}", _fullTime).replace("{creater}", create[ele[13] - 1])
        .replace("{serviceName}", ele[6]).replace("{customername}", ele[2])
        .replace("{barberName}", ele[3]).replace("{customerType}",
            customerType[ele[14] - 1]).replace("{serviceContent}",
            ele[6]).replace("{fee}", ele[8]).replace("{serviceTime}",
            ele[9]).replace("{seat}", ele[7]).replace("{barberPhone}",
            ele[11]).replace("{customPhone}", ele[10]).replace(
            "{orderID}", ele[0]).replace("{orderStatus}", color)
        .replace("{isShow}", isShow).replace("{content}", showContent)
        .replace("{payway}", payway);
    return _html;
}

// 模板替代工具方法--用来自动更新数据获取订单信息---end

// 收银台页面，点击查看详情
function getOrderMoreInfo(direction) {
    if (direction == "up")
        $(".Cashier-order-moreInfo").animate({
            "height": 60,
            "padding-top": 10
        }, 500);
    else if (direction = "down")
        $(".Cashier-order-moreInfo").animate({
            "height": 0,
            "padding-top": 0
        }, 500);
}

$(".backOrderList").click(function () {
    clearInterval(getPayStatus);
    $(".CashierContent").css("display", "none");
});
$(".order-moreInfo").click(function () {
    if ($(this).find("span").hasClass("down-tip")) {
        $(this).find(".down-tip").addClass("up-tip");
        $(this).find(".down-tip").removeClass("down-tip");
        getOrderMoreInfo("up");
    } else if ($(this).find("span").hasClass("up-tip")) {
        $(this).find(".up-tip").addClass("down-tip");
        $(this).find(".up-tip").removeClass("up-tip");
        getOrderMoreInfo("down");
    }
});
