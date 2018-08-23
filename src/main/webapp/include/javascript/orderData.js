function loadMonthOrderNumber(_year) {
    //获取月不同订单数
    $.get("/BusinessMG/analy/data/month/orderNumber", {year: _year, global_shopId: global_shopId}, function (data) {
        data = eval(data);
        //配置图表要展示的数据。每个系列是个数组，每一项在图片中都会生成一条曲线。
        series = data[1];
        //配置要在 X 轴显示的项。
        xAxis = data[0];
        //配置要在 Y 轴显示的项。
        yAxis = {
            title: {
                text: '订单数量 (个)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        };
        //配置提示信息：
        tooltip = {
            valueSuffix: '个'
        };
        //主标题
        title = {
            text: '订单统计(' + _year + '年)'
        };
        //副标题
        subtitle = {
            text: '型云美业'
        };
        var chart = {
            type: 'line',
            borderWidth: 1,
        };
        //对其方式
        var legend = {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 1,
            borderColor: "#109090",
        };

        //创建 json 数据
        json = {};
        json.chart = chart;
        json.title = title;
        json.subtitle = subtitle;
        json.xAxis = xAxis;
        json.yAxis = yAxis;
        json.tooltip = tooltip;
        json.legend = legend;
        json.series = series;

        $('#container').highcharts(json);
    }, "json");

}

function loadMonthOrderMoney(_year) {
    //获取月总金额数
    $.get("/BusinessMG/analy/data/month/money", {year: _year, global_shopId: global_shopId}, function (data) {
        data = eval(data);
        var xAxis = data[0];
        var series = data[1];
        var chart = {
            type: 'column',
            borderWidth: 1,
        };
        var yAxis = {
            title: {
                text: '总金额（元）'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        };
        //配置提示信息：
        var tooltip = {
            valueSuffix: '元'
        }
        //主标题
        var title = {
            text: '订单月总收入(' + _year + '年)'
        };
        //副标题
        var subtitle = {
            text: '型云美业'
        };
        //让树状图上带上数据标签
        var plotOptions = {
            column: {   //因为chart的style用了column，所以这里也要用line。需要匹配对应。
                dataLabels: {
                    enabled: true
                },
                events: {
                    legendItemClick: false
                },
                enableMouseTracking: true, //允许鼠标跟踪
            }
        }

        //对其方式
        var legend = {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 1,
            borderColor: "#109090",
        };

        //创建 json 数据
        var json = {};
        json.chart = chart;
        json.title = title;
        json.legend = legend;
        json.plotOptions = plotOptions;
        json.subtitle = subtitle;
        json.xAxis = xAxis;
        json.yAxis = yAxis;
        json.tooltip = tooltip;
        json.series = series;

        $('#container2').highcharts(json);
    }, "json");
}

//不同年份，当前店面不同发型师的一年的收益比例
function yearBarbersMoney(_year) {
    $.get("/BusinessMG/analy/data/year/barber/money", {year: _year, global_shopId: global_shopId}, function (data) {
        data = eval(data);
        if (data["code"] != 1000) {
            return false;
        }
        _allData = data["msg"][0]
        _charData = data["msg"][1];
        var chart = {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            borderWidth: 1,
        };
        var title = {
            text: _year + '年度本店发型师收入比例',
        };
        var tooltip = {
            enabled: true,
            pointFormat: '{series.name}:<b>{point.fee}元</b>'
        };
        var plotOptions = {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>:{point.percentage:.3f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'block'
                    }
                },
                showInLegend: true,
            }
        };
        var series = [{
            type: 'pie',
            name: _year + '年度本店发型师收入比例',
            data: _charData,
        }];

        //创建 json 数据
        var json = {};
        json.chart = chart;
        json.title = title;
        json.plotOptions = plotOptions;
        json.tooltip = tooltip;
        json.series = series;

        $('#container3').highcharts(json);
        if ($(_allData).length != 0) {
            _template = '<p>{barbername}的总收入:{allfee}元</p>';
            _html = '<div class="barberDetail">'
            _html += '<p>年总收入为：' + _allData["allFee"] + '元</p></div>';
            $("#container3").append(_html);
        }
    }, "json")
};


//每个月本店发型师的订单收入
function loadChartData(_startTime, _endTime) {
    $.get("/BusinessMG/analy/data/calc/barber/money", {
        startTime: _startTime,
        endTime: _endTime,
        global_shopId: global_shopId
    }, function (data) {
        data = eval(data);
        if (data["code"] != 1000) {
            return false;
        }
        _allData = data["msg"][0];
        _chartData = data["msg"][1];

        //展示查看明细导航
        $(".monthBarberMoney").empty();
        $(".monthBarberMoney").append('<span id="allDetail">查看收入明细</span>');
        $(_chartData).each(function (index, ele) {
            _id = ele["barberID"];
            if (_id == 000000000000) {
                return;
            }
            $(".monthBarberMoney").append('<span class="detailItem" id="' + _id + '">' + ele["name"] + '</span>');
        });

        //监听点击，查看发型师明细的按钮
        $(".detailItem").on("click", function () {
            $(".BarberMoneyDetails").css("display", "block");
            var _id = $(this).attr("id");
            $("#detail-title").text(_startTime + "~" + _endTime + "期间账单< " + $(this).text() + " >");
            _name = $(this).text();
            $("#download").data({"barberID": _id, "_startTime": _startTime, "endTime": _endTime, "barberName": _name});
            //获取本月美发师订单详情
            $.get("/BusinessMG/analy/data/calc/barber/orderDetail", {
                "barberID": _id,
                "startTime": _startTime,
                "endTime": _endTime,
            }, function (data) {
                data = eval(data);
                var _template = '<tr>' +
                    '<td><div style="width:40px;">{sequence}</div></td>' +
                    '<td><div >{orderNumber}</div></td>' +
                    '<td><div >{beginTime}</div></td>' +
                    '<td><div >{serviceContent}</div></td>' +
                    '<td><div >{serviceTime}</div></td>' +
                    '<td><div >{serviceFee}</div></td>' +
                    '<td><div >{customName}</div></td>' +
                    '<td><div >{customTelphone}</div></td>' +
                    '<td><div >{orderStatus}</div></td>' +
                    '<td><div >{payWay}</div></td>' +
                    '<td><div>{meituanquan}</div></td>' +
                    '</tr>';
                var payWay = ["现金支付", "微信支付", "支付宝支付", "美团", "大众"];
                if (data.length != 0) {
                    var allFee = 0;
                    var allCount = 0;
                    $(".Detail-Tbody").empty();
                    $(data).each(function (index, element) {
                        allCount = index;
                        var _tempTime = element["order_reservationBeginTime"];
                        var _time = _tempTime.substring(0, 4) + "/" + _tempTime.substring(4, 6) + "/" + _tempTime.substring(6, 8) + "/  "
                            + _tempTime.substring(8, 10) + ":" + _tempTime.substring(10, 12);//"201512041730"
                        allFee = allFee + parseFloat(element["order_fee"]);
                        var _html = _template.replace("{sequence}", index + 1)
                            .replace("{orderNumber}", element["order_Number"])
                            .replace("{serviceTime}", element["service_time"])
                            .replace("{beginTime}", _time)
                            .replace("{serviceFee}", element["order_fee"] + "元")
                            .replace("{serviceContent}", element["order_serviceContent"])
                            .replace("{customName}", element["order_customername"])
                            .replace("{customTelphone}", element["order_customerPhone"])
                            .replace("{orderStatus}", "已完成")
                            .replace("{meituanquan}", element["order_threeflag"])
                            .replace("{payWay}", payWay[element["order_payWay"] - 1]);
                        $(".Detail-Tbody").append(_html);
                    });
                    allCount = allCount + 1;
                    $("#allData").html('<span>总计：订单数量:' + allCount + '单   本月收入:' + allFee + '元</span>');
                } else {
                    $(".Detail-Tbody").empty();
                    var _html = _template.replace("{sequence}", 0)
                        .replace("{orderNumber}", "暂无数据")
                        .replace("{serviceTime}", "暂无数据")
                        .replace("{beginTime}", "暂无数据")
                        .replace("{serviceFee}", "暂无数据")
                        .replace("{serviceContent}", "暂无数据")
                        .replace("{customName}", "暂无数据")
                        .replace("{customTelphone}", "暂无数据")
                        .replace("{orderStatus}", "暂无数据")
                        .replace("{payWay}", "暂无数据");
                    $(".Detail-Tbody").append(_html);
                    $("#allData").html('<span>总计：订单数量:' + 0 + '单   本月收入:' + 0 + '元</span>');
                }
            }, "json");

        });

        var chart = {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            borderWidth: 1,
        };
        var _startTimeText = _startTime.substring(0, 4) + "/" + _startTime.substring(4, 6) + "/" + _startTime.substring(6, 8);
        var _endTimeText = _endTime.substring(0, 4) + "/" + _endTime.substring(4, 6) + "/" + _endTime.substring(6, 8);
        var title = {
            text: _startTimeText + "~" + _endTimeText + '本店发型师收入比例',
        };
        var tooltip = {
            pointFormat: '{series.name}:<b>{point.fee}元</b>'
        };
        var plotOptions = {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>:{point.percentage:.3f}%',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'block'
                    }
                },
                showInLegend: true,
            }
        };
        var series = [{
            type: 'pie',
            name: _startTimeText + "~" + _endTimeText + '收入占比',
            data: _chartData,
        }];

        //创建 json 数据
        var json = {};
        json.chart = chart;
        json.title = title;
        json.plotOptions = plotOptions;
        json.tooltip = tooltip;
        json.series = series;

        $('#container4').highcharts(json);
        if ($(_allData).length != 0) {
            _template = '<p>{barbername}的总收入:{allfee}元</p>';
            _html = '<div class="barberDetail">'
            _html += '<p>月总收入为：' + _allData["allFee"] + '元</p></div>';
            $("#container4").append(_html);
        }
    }, "json");
}

//初始化可选年份
function initSelectedYear(_nowYear, element) {
    $(element).empty();
    _startYear = 2015;
    _yearStep = _nowYear - 2015;
    var index = 0;
    for (; index <= _yearStep; index++) {
        _yearItem = _startYear + index;
        $(element).append('<option value="' + _yearItem + '">' + _yearItem + '</option>');
    }
    $(element).find("option").eq(index - 1).attr("selected", "selected");
}

//初始化可选月份
//	function initSelectedMonth(_nowMonth,element){
//		$(element).empty();
//		for(index=_nowMonth; index>0;index--){
//			$(element).append('<option value="'+index+'">'+index+'</option>');
//		}
//	}
//获取初始化数据
var nowDate = new Date();
var nowYear = parseInt(nowDate.getFullYear());
var nowMonth = nowDate.getMonth() + 1;

$(document).ready(function () {

    var urlParamer = (window.location.href.split("?")[1] == undefined) ? "year" : window.location.href.split("?")[1].split("&");
    urlParamer = urlParamer.length != 1 ? "year" : urlParamer[0];
    //日期格式化 'yyyy-mm-dd'
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
    var _firstDate = new Date();
    _firstDate.setDate(1);
    $("#startTime_input").val(_firstDate.format("yyyy-MM-dd"));
    $("#endTime_input").val(new Date().format("yyyy-MM-dd"));

    if (urlParamer == "year") {
        $("#monthChartContent").remove();
        $(".orderData-treeview .active").removeClass("active");
        $(".orderData-treeview .yearData").addClass("active");
        $(".form-group").hide();
        initSelectedYear(nowYear, $("#year"));
        loadMonthOrderNumber(nowYear);
        loadMonthOrderMoney(nowYear);
        yearBarbersMoney(nowYear);
    } else {
        $(".form-group").show();
        $("#yearChartContent").remove();
        $(".orderData-treeview .active").removeClass("active");
        $(".orderData-treeview .monthData").addClass("active");
        /*initSelectedYear(nowYear,$("#monthChart_year"));
        initSelectedMonth(nowMonth,$("#month"));*/
        var startTime = $("#startTime_input").val().split("-").join("") + "0000";
        var endTime = $("#endTime_input").val().split("-").join("") + "2359";
        loadChartData(startTime, endTime);
    }


    //年份的选择
    $("#year").change(function () {
        _year = $(this).find("option:checked").val();
        loadMonthOrderNumber(_year);
        loadMonthOrderMoney(_year);
        yearBarbersMoney(_year);
    });

//	$("#monthChart_year").change(function(){
//		_year = $(this).val();
//		if(_year!=nowYear){
//			initSelectedMonth(12,$("#month"));
//		}else {
//			initSelectedMonth(nowMonth,$("#month"));
//		}
//		$("#month").change()
//	});

    /*	$("#month").change(function(){
            _year = parseInt($("#monthChart_year").find("option:checked").val());
            _month = parseInt($(this).find("option:checked").val());
            monthBarberMoney(_year,_month);
        });*/

    //下文订单详情excel文件 ,利用动态生成一个form表单的形式,下载
    $("#download").click(function () {
        var form = $('<form id="downloadForm">');//定义一个form表单
        form.attr("style", "display:none");
        form.attr("target", "");
        form.attr("method", "post");
        _barberID = $("#download").data("barberID");
        _startTime = $("#startTime_input").val().split("-").join("") + "0000";
        _endTime = $("#endTime_input").val().split("-").join("") + "2359";
        _barberName = $("#download").data("barberName");
        form.attr("action", "/BusinessMG/analy/data/calc/barber/download?");
        var input_barberID = $("<input>");
        input_barberID.attr("type", "hidden");
        input_barberID.attr("name", "barberID");
        input_barberID.attr("value", _barberID);

        var input_barberName = $("<input>");
        input_barberName.attr("type", "hidden");
        input_barberName.attr("name", "barberName");
        input_barberName.attr("value", _barberName);

        var input_StartTime = $("<input>");
        input_StartTime.attr("type", "hidden");
        input_StartTime.attr("name", "startTime");
        input_StartTime.attr("value", _startTime);

        var input_EndTime = $("<input>");
        input_EndTime.attr("type", "hidden");
        input_EndTime.attr("name", "endTime");
        input_EndTime.attr("value", _endTime);

        $("body").append(form);//将表单放置在web中
        form.append(input_barberID);
        form.append(input_barberName);
        form.append(input_StartTime);
        form.append(input_EndTime);
        form.submit();//表单提交
        $("#downloadForm").remove();
    });

    //关闭查看订单详情操作
    $(".DetailsClose").click(function () {
        $(".BarberMoneyDetails").css("display", "none");
    });
    //防止在浏览订单详情的时候，滚动动作影响到父标签body
    $(".DetailsContainer").scroll(function (e) {
        e.stopPropagation();
    })

    //设置滚动条样式
    $(".DetailsContainer").slimScroll({
        width: "1000px",
        height: '450px',
        alwaysVisible: false,
    });

    $(".serach").click(function () {
        var startTime = $("#startTime_input").val().split("-").join("") + "0000";
        var endTime = $("#endTime_input").val().split("-").join("") + "2359";
        loadChartData(startTime, endTime);
    });


});