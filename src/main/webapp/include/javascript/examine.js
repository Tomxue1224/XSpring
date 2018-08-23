var initUrl = "/BusinessMG/service/examinemodule/infolist";
var urlTag = "service";
$(document).ready(function () {
    init(location.href);
    $(".examine-treeview a").click(function () {
        _url = $(this).attr("href");
        init(_url);
    });

    _serviceItemTemplate = '<div class="examine_serviceItem {flog}" id="{id}" >' +
        '<div class="serviceItem_head">' +
        '<span class="fa fa-angle-left examine-direction"></span>' +
        '<img src="http://51styling.com/{img_url}"/>' +
        '<span style="margin:0 5px">{barberName}</span>' +
        '<span>人气：{popular}</span>' +
        '<span>专业：{profession}</span>' +
        '<span>服务：{service}</span>' +
        '<span>电话:{telephone}</span>' +
        '</div>' +
        '<div class="buttonContent"  barberid="{barberid}" serviceid="{serviceid}">' +
        '	<button type="button" class="examineBut agree btn btn-success">批准</button>' +
        '	<button type="button"  class="examineBut disagree btn btn-danger">不批准</button>' +
        '</div>' +
        '<div class="serviceItem_content">' +
        '	<p><span>服务类型：{serviceType}</span><span>服务名称：{serviceName}</span><span>服务时长：{serviceTime}小时</span><span>等待时长：{waitTime}小时</span><span>提交时间：{commitTime}</span></p>' +
        '	<p><span>短发原价：{shortHairPrice}元</span><span>短发折后：{sale_shortHairPrice}元</span><span>中发原价：{middleHairPrice}元</span><span>中发折后：{sale_middleHairPrice}元</span><span>长发原价：{longHairPrice}元</span><span>长发折后：{sale_longHairPrice}元</span></p>' +
        '	<p><span>产品信息：{productInfo}</span></p>' +
        '	<p><span>服务简介：{serviceInfo}</span></p>' +
        '</div>' +
        '</div>';

    //页面初始化数据
    function init(_url) {
        element = "";
        if (_url.split("#").length == 2) {
            urlTag = _url.split("#")[1];
            if (urlTag == "history") {
                element = $("#examine_history");
                initUrl = "/BusinessMG/service/examinemodule/infolist/history";
            } else if (urlTag == "service") {
                initUrl = "/BusinessMG/service/examinemodule/infolist";
                element = $("#examine_deal");
            }
            $(".examine-treeview .active").removeClass("active");
            $(element).parent().addClass("active");
        }
        $.get(initUrl, {"pageNumber": 1}, function (data) {
            if (data["code"] == 1000) {
                $(".loginContent").hide();
                $(".ServiceContent").show();
                $(".examine_foot").show();
                $(".superManager-treeview").show();
                showPageination(data["msg"]);
                showExamineService(data["msg"]);
            } else {
                $(".loginContent").show();
            }
        }, "json");
    }

    //刷新服务项目列表
    function refreshServiceConent(element) {
        $(element).remove();
        _pageNumber = $(".page_active span").text();
        _length = ($(".ServiceContent").children()).length;
        if (_length == 0) {
            $("#page_title").remove();
            if (_pageNumber == 1) {
                _pageNumber = 2;
            }
            _pageNumber = _pageNumber - 1;
            $.get(initUrl, {"pageNumber": _pageNumber}, function (data) {
                showPageination(data["msg"]);
                showExamineService(data["msg"]);
            }, "json");
        }
    }

    //监听alert模态框按钮
    $(".myalert button").click(function () {
        _value = $(this).val();
        if (_value == "yes") {
            _text = $("#disagree_reason").text();
            if (_text.length != 0) {
                _barberid = $(".myalert").data("barberid");
                _servicedid = $(".myalert").data("serviceid");
                data = {"servicedid": _servicedid, "examinestatu": 3, "result": _text, "barberid": _barberid};
                $.post("/BusinessMG/service/examinemodule/examine/result", data, function (data) {
                    data = eval(data);
                    if (data["code"] == 1000) {
                        $("#disagree_reason").text("请输入不批准的原因");
                        $(".alertContent").hide();
                        alert("审核操作成功");
                        refreshServiceConent($($(".myalert").data("operatElement")));
                    } else {
                        alert(data["msg"]);
                    }
                }, "json");
            } else {
                $("#disagree_reason").focus();
                $("#disagree_reason").text("请输入不批准的原因");
            }
        } else if (_value == "no") {
            $("#disagree_reason").text("请输入不批准的原因");
            $(".alertContent").hide();
        }
    });

    //显示分页器
    function showPageination(data) {
        $(".examine_pageination").empty();
        $("#page_title").remove();
        _page = data["pager"];
        if (_page["recordCount"] == 0) {
            return;
        }
        $(".ServiceContent").before('<span id="page_title">每页显示' + _page["pageSize"] + "条数据,一共" + _page["recordCount"] + "条数据</span>");
        $(".ServiceContent").attr({
            "data-pageNumber": _page["pageNumber"], "data-pageSize": _page["pageSize"],
            "data-pageCount": _page["pageCount"], "data-recondCount": _page["recordCount"]
        });
        if (_page["pageCount"] > 0) {
            _html = "";
            for (i = 0; i < _page["pageCount"]; i++) {
                _html += '<li ><span> ' + (i + 1) + "</span></li>"
            }
            $(".examine_pageination").append(_html);
            $(".examine_pageination li").eq(0).addClass("page_active");

            $(".examine_pageination li").on("click", function () {
                $(".page_active").removeClass("page_active");
                $(this).addClass("page_active");
                _index = parseInt($(this).text());
                if (_index > 0) {
                    $.get(initUrl, {"pageNumber": _index}, function (data) {
                        if (data["code"] == 1000) {
                            showExamineService(data["msg"]);
                        }
                    }, "json");
                }
            });

        }
    }

    function formatTime(t) {
        var time = new Date(parseInt(t) * 1000);
        return time.getFullYear() + "/" + (time.getMonth() + 1) + "/" + time.getDate();
    };

    //显示待审核服务项目
    function showExamineService(data) {
        $(".ServiceContent").empty();
        _list = data["list"];
        if (_list.length == 0) {
            $(".ServiceContent").html("<h4>无审核数据</h4>");
            return;
        }
        $(_list).each(function (index, element) {
            _serviceInfo = element["serviceinfo"];
            _barberInfo = element["barberinfo"];
            _recordInfo = element["recordInfo"];
            commitTime = formatTime(element["barberinfo"]["alerttime"]);
            _html = _serviceItemTemplate.replace("{id}", _barberInfo["barber_id"]).replace("{img_url}", _barberInfo["headImg"])
                .replace("{barberName}", _barberInfo["nickname"]).replace("{flog}", (_barberInfo["barber_id"] + index))
                .replace("{popular}", _barberInfo["populIndex"]).replace("{profession}", _barberInfo["proIndex"])
                .replace("{service}", _barberInfo["serIndex"]).replace("{telephone}", _barberInfo["telephone"])
                .replace("{barberid}", _barberInfo["barber_id"]).replace("{serviceType}", _serviceInfo["serviceTypeid"])
                .replace("{serviceName}", _serviceInfo["name"]).replace("{serviceTime}", _serviceInfo["time"])
                .replace("{waitTime}", _serviceInfo["waitTime"]).replace("{shortHairPrice}", _serviceInfo["dorgfee"])
                .replace("{sale_shortHairPrice}", _serviceInfo["ddisfee"]).replace("{middleHairPrice}", _serviceInfo["morgfee"])
                .replace("{sale_middleHairPrice}", _serviceInfo["mdisfee"]).replace("{longHairPrice}", _serviceInfo["lorgfee"])
                .replace("{sale_longHairPrice}", _serviceInfo["ldisfee"]).replace("{productInfo}", _serviceInfo["product"])
                .replace("{serviceInfo}", _serviceInfo["introduct"]).replace("{serviceid}", _serviceInfo["service_id"])
                .replace("{commitTime}", commitTime);
            $(".ServiceContent").append(_html);
            if (urlTag == "history") {
                $("." + (_barberInfo["barber_id"] + index)).find(".buttonContent").hide();
            }

            /*_recordHtml = '<div class="record_history_item"><div class="record_title">审核历史  ———— 审核次数: {number}次&nbsp;&nbsp;&nbsp审核结果: {result}</div><div class="record-items">';
            _resultTag = false;
            $(_recordInfo).each(function(index,element){
                var date = new Date(parseInt(element["time"])*1000);
                var _hour = date.getHours();
                var _Minutes = date.getMinutes();
                var _year = date.getFullYear();
                var _month = date.getMonth()+1;
                var _day = date.getDate();
                _hour = (_hour<10 ? "0"+ _hour : _hour);
                _Minutes = (_Minutes<10 ? "0" + _Minutes : _Minutes);
                var _time = _hour +":"+_Minutes;
                var _fullTime = _year +"-"+_month+"-"+_day+"  "+_time;

                _recordHtml +="<p><span>审核描述:"+element["reason"]+"</span><span>审核结果:"+(element["statu"]==2?"通过":(element["statu"]==1?"正在审核":"未通过"))+"</span><span>审核时间:"+_fullTime+"</span></p>";
                _resultTag = _resultTag || (element["statu"]==2?true:false);
            });
            _recordHtml += '</div></div">';
            _recordHtml =_recordHtml.replace("{number}",_recordInfo.length).replace("{result}",(_resultTag)?"通过":"未通过");
            $("."+(_barberInfo["barber_id"]+index)).append(_recordHtml);*/


        });
        $(".record_title").on("click", function () {
            console.info("click");
            $(this).parent().find(".record-items").toggle();
        });

        //显示审核服务项目的服务内容
        $(".serviceItem_head").on("click", function () {
            $(this).parent().find(".serviceItem_content").toggle();
            return false;
        });

        //提交审核结果
        $(".examineBut").on("click", function () {
            var element = $(this).parent().parent();
            if ($(this).hasClass("disagree")) {
                $(".myalert").data({
                    "barberid": $(this).parent().attr("barberid"),
                    "serviceid": $(this).parent().attr("serviceid"), "operatElement": element
                });
                $(".alertContent").show();
                return false;
            }
            data = {
                "servicedid": $(this).parent().attr("serviceid"),
                "examinestatu": 2,
                "result": null,
                "barberid": $(this).parent().attr("barberid")
            };
            $.post("/BusinessMG/service/examinemodule/examine/result", data, function (data) {
                data = eval(data);
                if (data["code"] == 1000) {
                    $("#disagree_reason").text("请输入不批准的原因");
                    $(".alertContent").hide();
                    alert("审核操作成功！");
                    refreshServiceConent(element);
                } else {
                    alert(data["msg"]);
                }
            }, "json");
        });
    }

    //超级管理员登录
    $("#examine_submitBut").click(function () {
        _username = $("#examine_user").val();
        _password = $("#examine_password").val();
        if (_username.length == 0) {
            $("#examine_user").focus();
            return;
        }
        if (_password.length == 0) {
            $("#examine_password").focus();
            return;
        }
        data = {"telephone": _username, "password": _password};
        $.post("/BusinessMG/systemloginmodule/login", data, function (data) {
            data = eval(data);
            if (data["code"] == 1000) {
                init("/BusinessMG/menu/examine#service");
                ;
            } else {
                alert(data["msg"]);
            }
        }, "json");
    });

    //监听不通过的审核原因，控制字符长度
    $("#disagree_reason").keydown(function () {
        _maxlength = 30;
        if ($(this).text().length > _maxlength) {
            $(this).text($(this).text().substring(0, _maxlength));
        }
    });

});