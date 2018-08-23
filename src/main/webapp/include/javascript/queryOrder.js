$(".spinner").css("display", "none");
//日期格式化
Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
//设置开始时间选择控件
$("#startTime_input").datepicker({
    format: 'yyyy-mm-dd',
    weekStart: 0,  //一周从哪一天开始。0（星期日）到6（星期六）
    startDate: "2015.03.02",
    todayBtn: 0,
    todayHighlight: true,
    keyboardNavigation: true,
    language: 'zh-CN',
});
//设置结束时间选择控件
$("#endTime_input").datepicker({
    format: 'yyyy-mm-dd',
    weekStart: 0,  //一周从哪一天开始。0（星期日）到6（星期六）
    startDate: "2015.03.02",
    todayBtn: 0,
    todayHighlight: true,
    keyboardNavigation: true,
    language: 'zh-CN',
});
//重置开始时间的结束时间
$("#startTime_input").click(function () {
    var endTime = $("#endTime_input").val();
    if (endTime.length != 0) {
        $('#startTime_input').datepicker('setEndDate', endTime);
    }
});
//重置结束时间的开始时间
$("#endTime_input").click(function () {
    var startTime = $("#startTime_input").val();
    if (startTime.length != 0) {
        $('#endTime_input').datepicker('setStartDate', startTime);
    }
});
$("#startTime_input").val(new Date().format("yyyy-MM-dd"));
$("#endTime_input").val(new Date().format("yyyy-MM-dd"));
//搜索美发师列表
$("#barber_input").keyup(function () {
    $(".result-group").empty();
    $("#barber_input").attr("data-id", "-1");
    _name = $(this).val();
    if (_name.length == 0) {
        return;
    }
    $.post("../../barber/info/web/select/list", {"barbername": _name}, function (data) {
        data = eval(data);
        if (data["code"] != 1000) {
            return;
        }
        if (data["msg"].length != 0) {
            $(data["msg"]).each(function (index, ele) {
                _li = '<li id="{id}">{name}</li>';
                _li = _li.replace("{id}", ele["barber_id"]).replace("{name}", ele["nickname"]);
                $(".result-group").append(_li);
                $("#" + ele["barber_id"]).on("click", function () {
                    $("#barber_input").val($(this).text());
                    $("#barber_input").attr("data-id", $(this).attr("id"));
                    $(".previewResult").css("display", "none");
                    $(".result-group").empty();
                });
            });
            $(".previewResult").css("display", "block");
        } else {
            $(".previewResult").css("display", "none");
        }
    }, "json");
});
//美发师输入框失去焦点
$("#barber_input").blur(function () {
    data_id = $(this).attr("data-id");
    if (data_id == "-1") {
        $("#barber_input").val("");
    }
});
//选择查询订单状态
$(".searchBut").click(function () {
    if ($(this).hasClass("selectSearch")) {
        return;
    }
    $(".selectSearch").removeClass("selectSearch");
    $(this).addClass("selectSearch");
});

//客户类型
var customerType = ["平台客", "熟客"];

//订单表格行级显示html模板
_orderTable = '<tr role="row" class="orderItem_table">' +
    '<td class="serviceTime_table">{serviceTime}</td>' +
    '<td>{barbername}</td>' +
    '<td>{barberPhone}</td>' +
    '<td>{serviceContent}</td>' +
    '<td>{coustom} [ {customertype} ]</td><td>{serviceStatus}</td><td style="text-align:center"><span class="lookMoreInfo" id="{order_id}">查看详情</span></td>' +
    '</tr>';


//订单详情html模板
var templet = '<div  class="bookOrder {orderStatus}" >'
    + '<div class="orderItem">'
    + '<span class="cancleOrder">取消订单</span>'
    + '<span>时间：{time}&nbsp;&nbsp;&nbsp;{date}</span><br>'
    + '<span class="simpleOrderInfo">服务内容：&nbsp;&nbsp;{serviceName}</span>'
    + '</div>'
    + '<div class=" order_msg">'
    + '<div>发起人：<span class="ok_creater">{creater}</span></div>'
    + '<div>顾客：<span class="ok_shopName">{customername}[ {customertype} ]</span></div>'
    + '<div>发型师：<span class="ok_barber">{barberName}</span></div>'
    + '<div><span id="infoTitle">服务内容：</span><span class="ok_content">{serviceContent}</span></div>'
    + '<div>价格：<span class="ok_fee" >{fee}元</span></div>'
    + '<div>耗时：<span class="ok_time">{serviceTime}小时</span></div>'
    + '<div>座位号：<span class="ok_address">{seat}号</span>'
    + '</div><div>发型师电话：<span class="ok_phone">{barberPhone}</span></div>'
    + '<div>顾客电话：<span class="ok_phone">{customPhone}</span></div><div>支付方式：<span class="ok_payWay">{payway}</span></div></div>' +
    '<div class="ok_pay" itemid="booking0"><span>确定</span></div>'
    + '</div>';

//订单数据
var orderData = {"data": [], "index": 1, "pageNumber": 1, "allNumber": 1, "EPageOrderNumber": 10};
var pageMaxCount = 5; //当前显示分页标签的最大值
//促发搜索
$(".search").click(function () {
    $(".order_table_list").empty();
    $(".spinner").css("display", "block");
    _startDate = ($("#startTime_input").val()).replace("-", "").replace("-", "");  //开始时间
    _endDate = ($("#endTime_input").val()).replace("-", "").replace("-", "");     //结束事假
    _type = $(".selectSearch").attr("id");		//所要查询的订单状态  0 今日订单，2已完成订单
    if (_type == 0) {
        getTodayAllOrder();
        return;
    }
    if (_type == 2 || _type == 3 || _type == 1) {
        $(".order-count-fee").css("display", "inline");
    }
    _barberid = $("#barber_input").attr("data-id");
    data = {
        "bdate": _startDate,
        "edate": _endDate,
        "barberid": _barberid,
        "type": _type,
        "global_shopId": global_shopId
    }
    $.get("../../manager/order/web/select/beorder/order", data, function (data) {
        data = eval(data);
        if (data["code"] == 1000) {
            showIndexTag(data["msg"]);
            var returnValue = showData(data["msg"]);
            $(".order-count-fee").text("总单数:" + returnValue["count"] + "单    总金额:" + returnValue["allfee"] + "元");
        } else {
            $(".order-count-fee").text("总单数:" + 0 + "单    总金额:" + 0 + "元");
        }
    }, "json");
});

//替换填充html字符串
function commonReplace(ele, _html, color) {
    date = new Date(parseInt(ele["beginTime"]) * 1000);
    _hour = date.getHours();
    _Minutes = date.getMinutes();
    _year = date.getFullYear();
    _month = date.getMonth() + 1;
    _day = date.getDate();
    _time = _hour + ":" + _Minutes;
    _fullTime = _year + "-" + _month + "-" + _day;
    payway = "到店支付";
    if (ele["paywap"] == 2) {
        payway = "微信支付";
    }
    if (ele["paywap"] == 4) {
        payway = "团购支付";
    }
    payway = ele["payResult"] != 0 ? (payway + "(已支付)") : (payway + "(未支付)");
    var create = ['消费者', '美发师', '管理员'];
    _html = _html.replace("{time}", _time).replace("{date}", _fullTime)
        .replace("{creater}", create[ele["appeople"] - 1])
        .replace("{serviceName}", ele["serviceContent"])
        .replace("{customername}", ele["customername"])
        .replace("{barberName}", ele["barberName"])
        .replace("{customertype}", customerType[ele["customertype"] - 1])
        .replace("{serviceContent}", ele["serviceContent"])
        .replace("{fee}", ele["orderFee"])
        .replace("{serviceTime}", ele["servicetime"])
        .replace("{seat}", ele["seat"])
        .replace("{barberPhone}", ele["barerPhone"])
        .replace("{customPhone}", ele["customerPhone"])
        .replace("{orderID}", ele["order_id"]).replace("{orderStatus}", color)
        .replace("{payway}", payway);
    return _html;
}

_PrevTemplate = '<li class="paginate_button previous {isdisabled}" id="query_previous"><span tabindex="0">Previous</span></li>';
_IndexTemplate = '<li class="paginate_button {isActive}"><span  tabindex="{tabindex}">{index}</span></li>';
_NextTemplate = '<li class="paginate_button next {isdisabled}" id="query_next"><span   tabindex="{tabindex}">Next</a></li>';

function replaceIndexTemplate(startIndex, endIndex) {
    var _html = "";
    for (i = startIndex; i < endIndex; i++) {
        if (i != startIndex) {
            _html += _IndexTemplate.replace("{isActive}", "").replace("{tabindex}", i).replace("{index}", i + 1);
        } else {
            _html += _IndexTemplate.replace("{isActive}", "active").replace("{tabindex}", i).replace("{index}", i + 1);
        }
    }
    return _html;
}

//显示分页标签
function showIndexTag(data) {
    $(".pagination ").empty();
    orderData.data = data;
    orderData.allNumber = data.length;
    orderData.pageNumber = Math.ceil((data.length) / orderData.EPageOrderNumber);
    var _html = "";
    _html += replaceIndexTemplate(0, orderData.pageNumber > pageMaxCount ? pageMaxCount : orderData.pageNumber);
    $("#dataTables_info").text('一共' + data.length + '条数据');
    $(".pagination ").append(_html);
    if (orderData.pageNumber > pageMaxCount) {
        $(".pagination ").append(_IndexTemplate.replace("{isActive}", "moreNextTag").replace("{tabindex}", pageMaxCount).replace("{index}", "..."));
    }
    if (orderData.pageNumber == 0) {
        $(".pagination").prepend(_PrevTemplate.replace("{isdisabled}", "disabled"));
        $(".pagination ").append(_NextTemplate.replace("{isdisabled}", "disabled").replace("{tabindex}", 0));
    } else {
        $(".pagination").prepend(_PrevTemplate.replace("{isdisabled}", "disabled").replace("{tabindex}", 0));
        if (orderData.pageNumber > pageMaxCount) {
            $(".pagination ").append(_NextTemplate.replace("{isdisabled}", "").replace("{tabindex}", orderData.pageNumber));
        } else {
            $(".pagination ").append(_NextTemplate.replace("{isdisabled}", "disabled").replace("{tabindex}", orderData.pageNumber));
        }
    }

    //获取该页的订单数据
    function getIndexOrderList(element) {
        //屏蔽"前进"，"后退"，"更多"按钮.
        if ($(element).hasClass("next") || $(element).hasClass("previous") || $(element).hasClass("moreNextTag") || $(element).hasClass("morePrevTag")) {
            return;
        }
        _index = parseInt($(element).find("span").attr("tabindex"));
        $(".active").removeClass("active");
        $(element).addClass("active");
        if (_index == orderData.pageNumber) {
            _nowData = orderData.data.slice(_index * orderData.EPageOrderNumber, orderData.pageNumber);
        } else {
            _nowData = orderData.data.slice(_index * orderData.EPageOrderNumber, (_index + 1) * orderData.EPageOrderNumber);
        }
        //重置订单列表
        $(".order_table_list").empty();
        showData(_nowData);
    }

    //分页器页签按钮
    $(".paginate_button").on("click", function () {
        getIndexOrderList(this);
    });

    function prev() {
        if ($(".morePrevTag").length == 0) {
            return;
        }
        //当前页数
        var _currentPageCount = parseInt($(".morePrevTag span").attr("tabindex"));
        var _html = "";
        //重置分页器
        $(".pagination ").empty();
        if (_currentPageCount != pageMaxCount) {
            _html += _IndexTemplate.replace("{isActive}", "morePrevTag").replace("{tabindex}", _currentPageCount - pageMaxCount).replace("{index}", "...");
            _html += replaceIndexTemplate(_currentPageCount - pageMaxCount, (_currentPageCount));
            _html += _IndexTemplate.replace("{isActive}", "moreNextTag").replace("{tabindex}", _currentPageCount).replace("{index}", "...");

            $(".pagination ").append(_html);
            $(".pagination").prepend(_PrevTemplate.replace("{isdisabled}", "").replace("{tabindex}", _currentPageCount - pageMaxCount));
            $(".pagination ").append(_NextTemplate.replace("{isdisabled}", "").replace("{tabindex}", _currentPageCount));
        } else {
            _html += replaceIndexTemplate(_currentPageCount - pageMaxCount, (_currentPageCount));
            _html += _IndexTemplate.replace("{isActive}", "moreNextTag").replace("{tabindex}", _currentPageCount).replace("{index}", "...");
            $(".pagination ").append(_html);
            $(".pagination").prepend(_PrevTemplate.replace("{isdisabled}", "disabled").replace("{tabindex}", _currentPageCount - pageMaxCount));
            $(".pagination").append(_NextTemplate.replace("{isdisabled}", "").replace("{tabindex}", _currentPageCount));
        }
        getIndexOrderList($(".pagination .active"));

        $(".previous").on("click", function () {
            prev();
        });
        $(".next").on("click", function () {
            next();
        });
        $(".paginate_button").on("click", function () {
            getIndexOrderList(this);
        });
    }

    //向前翻页
    $(".previous").on("click", function () {
        prev()
    });


    function next() {
        if ($(".moreNextTag").length == 0) {
            return;
        }

        //当前页数
        var _currentPageCount = parseInt($(".moreNextTag span").attr("tabindex"));
        //还剩多少页
        var _remainderPage = orderData.pageNumber - _currentPageCount;
        var _html = "";
        //重置分页器
        $(".pagination ").empty();

        if (_remainderPage >= pageMaxCount) {
            _html += _IndexTemplate.replace("{isActive}", "morePrevTag").replace("{tabindex}", _currentPageCount).replace("{index}", "...");
            _html += replaceIndexTemplate(_currentPageCount, (_currentPageCount + pageMaxCount));

            if (_remainderPage != pageMaxCount) {
                _html += _IndexTemplate.replace("{isActive}", "moreNextTag").replace("{tabindex}", pageMaxCount + _currentPageCount).replace("{index}", "...");
            }
            $(".pagination ").append(_html);
            $(".pagination").prepend(_PrevTemplate.replace("{isdisabled}", ""));

            if (_remainderPage != pageMaxCount) {
                $(".pagination ").append(_NextTemplate.replace("{isdisabled}", "").replace("{tabindex}", pageMaxCount + _currentPageCount));
            } else {
                $(".pagination ").append(_NextTemplate.replace("{isdisabled}", "disabled").replace("{tabindex}", pageMaxCount + _currentPageCount));
            }
        } else {
            _html += _IndexTemplate.replace("{isActive}", "morePrevTag").replace("{tabindex}", _currentPageCount).replace("{index}", "...");
            _html += replaceIndexTemplate(_currentPageCount, (_currentPageCount + _remainderPage));

            $(".pagination ").append(_html);
            $(".pagination").prepend(_PrevTemplate.replace("{isdisabled}", ""));
            $(".pagination ").append(_NextTemplate.replace("{isdisabled}", "disabled").replace("{tabindex}", _remainderPage + _currentPageCount));
        }
        getIndexOrderList($(".pagination .active"));
        $(".previous").on("click", function () {
            prev()
        });
        $(".next").on("click", function () {
            next();
        });
        $(".paginate_button").on("click", function () {
            getIndexOrderList(this);
        });
    }

    $(".next").on("click", function () {
        next();
    });
}

//在原始数据操作对象上面添加删除某个元素的方法。
Array.prototype.remove = function (dx) {
    var _array1 = this.slice(0, dx);
    var _array2 = this.slice(dx + 1, this.length)
    return _array1.concat(_array2);
}


function showData(data) {
    //1客户下单，2服务完成，3订单取消，4美发师完成评论，5客户完成评价，6订单超时失效
    var status = ['未完成', '已完成', '订单取消', '已评价', '已评价', '订单失效'];
    var count = 0; //订单的总单数
    var allfee = 0; //所有订单累加金额
    //显示分页标签
    if (data.length != 0) {
        $(data).each(function (index, ele, color) {
            if (index < orderData.EPageOrderNumber) {
                _html = _orderTable;
                _time = new Date(parseInt(ele['beginTime']) * 1000).format("yyyy-MM-dd hh:mm");
                _html = _html.replace("{serviceTime}", _time)
                    .replace("{barbername}", ele['barberName'])
                    .replace("{barberPhone}", ele['barerPhone'])
                    .replace("{serviceContent}", ele['serviceContent'])
                    .replace("{customertype}", customerType[ele["customertype"] - 1])
                    .replace("{coustom}", ele['customername'])
                    .replace("{order_id}", ele['order_id'])
                    .replace("{serviceStatus}", status[ele['status'] - 1]);
                $(".order_table_list").append(_html);
            }
            count = index + 1;
            allfee = allfee + parseFloat(ele["orderFee"]);
        });

        //查询订单详情
        $(".lookMoreInfo").on("click", function () {
            _id = $(this).attr("id");
            _prevTD = $(this).parent().prev();
            $.get("../../manager/order/web/select/order/byid", {
                orderid: _id,
                global_shopId: global_shopId
            }, function (data) {
                data = eval(data);
                if (data['code'] == 1000) {
                    _html = templet;
                    _msg = data["msg"];
                    _status = _msg['status'];
                    _isShow = false;
                    switch (_status) {
                        case 1:
                            _html = commonReplace(_msg, _html, "red");
                            $(_prevTD).text(status[_status - 1]);
                            break;
                        case 2:
                        case 4:
                        case 5:
                            _isShow = true;
                            $(_prevTD).text(status[_status - 1]);
                            _html = commonReplace(_msg, _html, "blue");
                            break;
                        case 3:
                        case 6:
                            _isShow = true;
                            $(_prevTD).text(status[_status - 1]);
                            _html = commonReplace(_msg, _html, "gay");
                            break;
                    }
                    $("#orderInfoContainer").empty();
                    $("#orderInfoContainer").append(_html);
                    $(".moreOderInfo").css("display", "block");
                    if (_isShow) {
                        $(".cancleOrder").css("display", "none");
                    }
                    //订单详情 确定按钮
                    $(".ok_pay").on("click", function () {
                        $("#orderInfoContainer").empty();
                        $(".moreOderInfo").css("display", "none");
                    });
                    $(".cancleOrder").on("click", function () {
                        var isCancle = confirm("你确定要取消订单吗");
                        if (isCancle) {
                            $(".alertContent").css("display", "block");
                            $(".myalert").animate({top: "5px"}, 500);
                            $(".myalert button").click(function () {
                                var isSendMSG = false;
                                if ($(this).val() == "no")
                                    isSendMSG = false;
                                else if ($(this).val() == "yes") {
                                    isSendMSG = true;
                                }
                                $(".myalert").animate({top: "-100px"}, 500, function () {
                                    $(".alertContent").css("display", "none");
                                    var flog = isSendMSG ? 1 : 0;
                                    $.post("../../manager/order/web/order/cancle", {
                                        "orderid": _id,
                                        "issendmessage": flog
                                    }, function (data) {
                                        data = eval(data);
                                        if (data["code"] == 1000) {
                                            alert("订单取消成功!");
                                            _type = $(".selectSearch").attr("id");
                                            _index = parseInt($(".pagination .active").find("span").attr("tabindex")) * orderData.EPageOrderNumber;
                                            _index = _index + $(_prevTD).parent().index();
                                            orderData.data = orderData.data.remove(_index);
                                            switch (_type) {
                                                case "0":
                                                    $(_prevTD).text(status[2]);
                                                    break;
                                                case "1":
                                                    if ($(_prevTD).parent().next().length == 0 && $(_prevTD).parent().prev().length == 0) {
                                                        _html = _orderTable;
                                                        _html = _html.replace("{serviceTime}", "暂无数据")
                                                            .replace("{barbername}", "暂无数据")
                                                            .replace("[ {customertype} ]", "")
                                                            .replace("{barberPhone}", "暂无数据")
                                                            .replace("{serviceContent}", "暂无数据")
                                                            .replace("{coustom}", "暂无数据")
                                                            .replace("{serviceStatus}", "暂无数据");
                                                        $(".order_table_list").append(_html);
                                                    }
                                                    $(_prevTD).parent().remove();
                                                    break;
                                            }
                                        } else {
                                            alert(data["msg"]);
                                        }
                                        $("#orderInfoContainer").empty();
                                        $(".moreOderInfo").css("display", "none");
                                    }, "json");
                                });
                            });
                        }

                    });
                }
            }, "json")
        });
    } else {
        _html = _orderTable;
        _html = _html.replace("{serviceTime}", "暂无数据")
            .replace("{barbername}", "暂无数据")
            .replace("{barberPhone}", "暂无数据")
            .replace("[ {customertype} ]", "")
            .replace("{serviceContent}", "暂无数据")
            .replace("{coustom}", "暂无数据")
            .replace("{serviceStatus}", "暂无数据");
        $(".order_table_list").append(_html);
    }
    $(".spinner").css("display", "none");
    return {"allfee": allfee, "count": count};
}

//点击查询按钮
$(".search").click();

//不同状态切换，更新数据
$(".searchBut").click(function () {
    $(".search").click();
});

//查询今日订单
function getTodayAllOrder() {
    $.get("../../manager/order/web/select/today/order", {global_shopId: global_shopId}, function (data) {
        data = eval(data);
        $(".spinner").css("display", "none");
        if (data['code'] == 1000) {
            showIndexTag(data["msg"]);
            showData(data["msg"]);
        } else {
            alert(data["msg"]);
        }
    }, "json");
}

//设置每页显示的最大数据条数
$("#pageMaxNumber").keydown(function (e) {
    var keyCode = e.which;
    if ((keyCode > 47 && keyCode < 59) || keyCode == 8) {
        if ($("#pageMaxNumber").val().length == 0 && keyCode == 48) {
            return false;
        }
    } else {
        return false;
    }
});

//失去焦点
$("#pageMaxNumber").blur(function () {
    var value = $("#pageMaxNumber").val();
    if (value > 4 && value < 31) {
        if (orderData.EPageOrderNumber == value) {
            return false;
        }
        orderData.EPageOrderNumber = value;
        $(".search").click();
    } else {
        $("#pageMaxNumber").val(10);
    }
});