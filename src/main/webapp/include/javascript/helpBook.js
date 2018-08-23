$(document).ready(function () {
    var templete = '<div class="barberItem" id="{barberId}">' +
        '<img class="barberImg" src="http://51styling.com/{url}">' +
        '<div class="barberName"><span >{name}</span></div>' +
        '<div class="selectContent ">' +
        '<span class="glyphicon glyphicon-ok " id="selectContent"></span></div></div>';

    var timeController;
    var barberList = new Array();
    //-------获取美发师列表   begin
    $.get("/BusinessMG/barber/service/address/web/barber/list ", null, function (data) {
        data = eval(data);
        if (data['code'] == 1000) {
            if (data["msg"].length != 0) {
                barberList = data["msg"];
                $(data['msg']).each(function (index, element) {
                    barber = element['barber'];
                    _html = templete.replace("{barberId}", barber["barber_id"]).replace("{name}", barber['nickname'])
                        .replace("{url}", barber['headImg']);
                    $(".barberList").append(_html);
                });
            } else {
                $(".barberList").append("<h1>暂无数据!</h1>");
            }
        } else {
            $(".barberList").append("<h1>暂无数据!</h1>");
        }
        $(".barberItem").on("click", function () {
            var element = this;
            $(element).find(".selectContent").slideDown("fast", function () {
                barberId = $(element).attr("id");
                $(".secondDay").click();
                //获取所有服务项目
                getServiceList(barberId);
                //获取排期
                timeController = setInterval(checkAbleTime, '5000');
                $(".selected_barber").text("发型师：" + $(element).find(".barberName span").text());
                $(".barberSwiper ").toggle();
                $(".bookInfoSwiper ").toggle();
                $(element).find(".selectContent").addClass("selectActive");
            });
        });
    }, "json");
    //-------获取美发师列表   end

    //-------- 回退按钮  start
    $("#goBack").click(function () {
        $(".customName").val("");
        $(".customTelPhone").val("");
        $('input:radio[name="bookstyle"]:checked').removeAttr("checked");
        clear_selected(checkAbleTime(barberId));
//		clearInterval(timeController);
        $(".book_tip").text("请选择预约时间");
        $(".book_tip").css("color", "rgb(255, 107, 0)");
        $(".serviceTime").attr("data-select", "false");
        $(".serviceTime span").eq(0).text("未选择");
        $(".serviceTip").attr("data", "false");
        $(".selectService").removeClass("selectService");
        $(".selectServiceName").text("");
        $(".selectServiceName").attr("name", "");
        $(".selectServiceName").attr("serviceid", "");
        $(".serviceTime_fee").text("");
        $(".serviceTime_fee").attr({"time": "", "waitTime": ""});
        $(".serviceTime_fee").attr("fee", "");
        $(".serviceList").attr("data-select", "false");
        $(".serviceList span").eq(0).text("未选择");
//		mySwiper.slidePrev();
        $(".barberSwiper ").toggle();
        $(".bookInfoSwiper ").toggle();
        $(".selectContent").removeClass("selectActive");
        $(".selectContent").css("display", "none");
    })
    //-------- 回退按钮  end

    //初始化日期
    var d = new Date();//现在的时间
    d.setDate(d.getDate() - 1);//设定日期从昨天开始
    var vYear = d.getFullYear();
    var vMon = d.getMonth() + 1;
    var vDay = d.getDate();
    var month = vMon < 10 ? "0" + vMon : vMon;
    var day = vDay < 10 ? "0" + vDay : vDay;
    s = month + '.' + day;
    $(".today").text(vYear + '年' + month + '月' + day + '日');
    //填入数据
    fillData(vYear, vMon, vDay);

    function fillData(vYear, vMon, vDay) {
        var days = $(".timeTable>thead>tr:first>th");
        //昨天的日期
        var newData = getTrueDate(vYear, vMon, vDay);
        days.eq(1).find("span").text(formatDate(newData));
        $(".firstDayswitch").attr({"year": newData[0], "month": newData[1], "day": newData[2]});

        var newData = getTrueDate(newData[0], newData[1], newData[2] + 1);
        days.eq(2).find("span").text(formatDate(newData));
        $(".secondDay").attr({"year": newData[0], "month": newData[1], "day": newData[2]});

        newData = getTrueDate(newData[0], newData[1], newData[2] + 1);
        days.eq(3).find("span").text(formatDate(newData));
        $(".thrithDay").attr({"year": newData[0], "month": newData[1], "day": newData[2]});
    }

    //获取正确的日期格式
    function getTrueDate(TYear, TMon, TDay) {
        var data = [];
        switch (TMon) {
            case 1:
                data = bigMon(TYear, TMon, TDay);
                break;
            case 2:
                if (TYear % 400 == 0 || (TYear % 100 != 0 && TYear % 4 == 0)) {
                    if (TDay > 29) {
                        TMon = TMon + 1;
                        TDay = 1;
                    }
                } else {
                    if (TDay > 28) {
                        TMon = TMon + 1;
                        TDay = 1;
                    }
                }
                if (TDay == 0) {
                    TMon = TMon - 1;
                    TDay = 31;
                }
                data = [TYear, TMon, TDay];

                break;
            case 3:
                data = bigMon(TYear, TMon, TDay);
                break;
            case 4:
                data = smallMon(TYear, TMon, TDay);
                break;
            case 5:
                data = bigMon(TYear, TMon, TDay);
                break;
            case 6:
                data = smallMon(TYear, TMon, TDay);
                break;
            case 7:
                data = bigMon(TYear, TMon, TDay);
                break;
            case 8:
                data = bigMon(TYear, TMon, TDay);
                break;
            case 9:
                data = smallMon(TYear, TMon, TDay);
                break;
            case 10:
                data = bigMon(TYear, TMon, TDay);
                break;
            case 11:
                data = smallMon(TYear, TMon, TDay);
                break;
            case 12:
                data = bigMon(TYear, TMon, TDay);
                break;
        }
        return data;
    }

    //格式化日期
    function formatDate(data) {
        var month = data[1] < 10 ? "0" + data[1] : data[1];
        var day = data[2] < 10 ? "0" + data[2] : data[2];
        s = month + '.' + day;
        return s;
    }

    //操作大月份
    function bigMon(vYear, vMon, vDay) {
        if (vMon == 3 && vDay == 0) {
            if (vYear % 400 == 0 || (vYear % 100 != 0 && vYear % 4 == 0)) {
                vMon = 2;
                vDay = 29;
            } else {
                vMon = 2;
                vDay = 28;
            }
        } else {
            if (vDay > 31) {
                vMon = vMon + 1;
                vDay = 1;
                if (vMon > 12) {
                    vYear = vYear + 1;
                    vMon = 1;
                }
            } else {
                if (vDay == 0) {
                    vMon = vMon - 1;
                    vDay = 30;
                    if (vMon == 0) {
                        vYear = vYear - 1;
                        vMon = 12;
                        vDay = 31;
                    }
                }
            }
        }
        return [vYear, vMon, vDay]
    }

    //操作小月份
    function smallMon(vDay, vMon, vDay) {
        if (vDay > 30) {
            vMon = vMon + 1;
            vDay = 1;
        } else {
            if (vDay == 0) {
                vMon = vMon - 1;
                vDay = 31;
            }
        }
        return [vYear, vMon, vDay]
    }

    //绑定移动日期监听
    // 向前移动日期
    $(".next").click(function () {
        clear_selected();
        $(".prev span").css("color", "rgba(95, 95, 95, 1)");
        Year = parseInt($(".firstDayswitch").attr("year"));
        Mon = parseInt($(".firstDayswitch").attr("month"));
        Day = parseInt($(".firstDayswitch").attr("day"));
        for (i = 0; i < 3; i++) {
            Day = Day + 1;
            var event_data = getTrueDate(Year, Mon, Day);
            Year = event_data[0];
            Mon = event_data[1];
            Day = event_data[2];
        }
        fillData(Year, Mon, Day);
        $(".firstDayswitch").attr({"year": Year, "month": Mon, "day": Day});
        $(".firstDayswitch").click();
    });

    //向后移动日期
    $(".prev").click(function () {
        clear_selected();

        Year = parseInt($(".firstDayswitch").attr("year"));
        Mon = parseInt($(".firstDayswitch").attr("month"));
        Day = parseInt($(".firstDayswitch").attr("day"));
        if (Year != vYear || Mon != vMon || Day != vDay) {
            for (i = 0; i < 3; i++) {
                Day = Day - 1;
                var event_data = getTrueDate(Year, Mon, Day);
                Year = event_data[0];
                Mon = event_data[1];
                Day = event_data[2];
            }
            fillData(Year, Mon, Day);
            $(".firstDayswitch").attr({"year": Year, "month": Mon, "day": Day});
            Year = parseInt($(".firstDayswitch").attr("year"));
            Mon = parseInt($(".firstDayswitch").attr("month"));
            Day = parseInt($(".firstDayswitch").attr("day"));
            if (Year == vYear && Mon == vMon && Day == vDay) {
                $(".prev span").css("color", "rgba(95, 95, 95, 0)");
            }
            $(".firstDayswitch").click();
        }
    });

    //监听选择服务时间事件
    $(".timeTable tbody td").click(function () {
        //未选择服务
        clear_selected();
        if ($(".serviceTip").attr("data") == "false") {
            alert("请选择服务项目");
            return;
        }
        //点击已预约时间
        if ($(this).hasClass("unable")) {
            $(".book_tip").text("所选时间不能给您提供服务");
            $(".book_tip").css("color", "rgb(255, 107, 0)");
            $(".serviceTime").attr("data-select", "false");
            $(".serviceTime span").eq(0).text("未选择");
            return;
        }
        //使用等待时间作为选择时间排期跨度
        var serviceTime = $(".serviceTime_fee").attr("waittime");
        serviceTime = parseFloat(serviceTime);
//使用服务时间作为选择时间排期跨度
//   	 var serviceTime = $(".serviceTime_fee").attr("time");
//	    	 serviceTime = parseFloat(serviceTime.substr(0,serviceTime.length));
        var times = parseInt(serviceTime * 10) / 5;
        var selectedIndex = parseInt($(this).attr("class"));

        //所选时间内是否存在预约日期
        for (i = 0; i < times; i++) {
            if ((selectedIndex + i) > 48 || $("." + (selectedIndex + i)).attr("class").indexOf("unable") > 0) {
                $(".book_tip").text("所选时间不能给您提供服务");
                $(".book_tip").css("color", "rgb(255, 107, 0)");
                $(".serviceTime").attr("data-select", "false");
                $(".serviceTime span").eq(0).text("未选择");
                return;
            }
        }

        clear_selected();
        for (i = 0; i < times; i++) {
            $("." + (selectedIndex + i)).addClass("select_unable");
        }

        startTime = $(this).text();
        startYear = $(".selected").attr("year");
        startMonth_Day = $(".selected").text();
        book_date = startYear + '.' + startMonth_Day + ' ' + startTime;

        $(".book_tip").text(book_date);
        $(".book_tip").attr("data", "true");
        $(".book_tip").css("color", "rgb(123, 123, 123)");
        $(".ready_serviceTime").text(book_date);
    });

    $(".firstDayswitch").click(function () {
        choiceDate_Click(this);
    });
    $(".secondDay").click(function () {
        choiceDate_Click(this)
    });
    $(".thrithDay").click(function () {
        choiceDate_Click(this)
    });

    //设置定时器，每隔一分钟检测一次日期是否可选
    function checkAbleTime() {
        barberId = $(".selectActive").parent().attr("id");
        var year = $(".selected").attr("year");
        var month = $(".selected").attr("month");
        var day = $(".selected").attr("day");

        //这里的判断操作是为了管理端补录今天之前的订单 -----start
        if (parseInt(year) == vYear && parseInt(month) == vMon && parseInt(day) == vDay) {
            return false;
        }
        //这里的判断操作是为了管理端补录今天之前的订单 ----end

        month = month < 10 ? "0" + month : month;
        day = day < 10 ? "0" + day : day;
        $.get('../scheduling/web/service/query', {barberid: barberId, serday: year + month + day}, function (data) {
            data = eval(data);
            if (data['code'] == 1000) {
                _timeMap = data['timemap']
                for (i = 19; i <= 48; i++) {
                    if (_timeMap[i] == 0) {
                        $('.' + i).addClass("unable");
                    } else {
                        $('.' + i).removeClass("unable");
                    }
                }
            }
        }, "json")
    }

    //清除已选时间
    function clear_selected() {
        if ($(".timeTable tbody .select_unable").length) {
            $(".select_unable").removeClass("select_unable");
        }
    }

    //展示可选择的日期时间
    function choiceDate_Click(element) {
        $(".book_tip").text("请选择预约时间");
        $(".book_tip").attr("data", "false");
        $(".book_tip").css("color", "rgb(255, 107, 0)");
        $(".selected").removeClass("selected");
        $(element).addClass("selected");
        var year = $(element).attr("year");
        var month = $(element).attr("month");
        var day = $(element).attr("day");
        _shopId = $(".serviceAddress").attr("data-id");
        if (_shopId == 0) {
            return;
        }
        //这里的判断操作是为了管理端补录今天之前的订单 -----start
        if (parseInt(year) == vYear && parseInt(month) == vMon && parseInt(day) == vDay) {
            for (i = 19; i <= 48; i++) {
                $('.' + i).removeClass("unable");
            }
            return false;
        }
        //这里的判断操作是为了管理端补录今天之前的订单 -----end
        clear_selected();
        month = month < 10 ? "0" + month : month;
        day = day < 10 ? "0" + day : day;
        $.get('../scheduling/web/service/query', {
            barberid: barberId,
            shopid: _shopId,
            serday: year + month + day
        }, function (data) {
            data = eval(data);
            if (data['code'] == 1000) {
                _timeMap = data['timemap'];
                for (i = 19; i <= 48; i++) {
                    if (_timeMap[i] == 0) {
                        $('.' + i).addClass("unable");
                    } else {
                        $('.' + i).removeClass("unable");
                    }
                }
            }
        }, "json");
    }

    //填充服务项目html代码
    function fillServiceItem(template, el) {
        var _html = template.replace("{{serviceid}}", el['service_id'])
            .replace(/{{serviceName}}/, el['name'])
            .replace(/{{stime}}/, el['time'])
            .replace("{{mtime}}", el['time'])
            .replace("{{ltime}}", el['time'])
            .replace(/{{sprice}}/, el['ddisfee'])
            .replace("{{mprice}}", el['mdisfee'])
            .replace("{{lprice}}", el['ldisfee'])
            .replace("{{swaitTime}}", el['waitTime'])
            .replace("{{mwaitTime}}", el['waitTime'])
            .replace("{{lwaitTime}}", el['waitTime'])
            .replace("{{time}}", "耗时:" + el['time'] + "小时")
            .replace("{{price}}", "折后:" + el['ddisfee'] + "元");
        return _html;
    }

    //获取所有服务类型   begin
    function getServiceList(barberId) {
        $("#servicePage .services").empty();
        //服务项目html模板
        var template = '<div class="serviceItem" serviceid="{{serviceid}}">' +
            '<span class="glyphicon glyphicon-scissors" id="serviceName">{{serviceName}}</span>' +
            '<div id="time_fee">' +
            '<span class="time" data-STime="{{stime}}" data-MTime="{{mtime}}" data-LTime="{{ltime}}" data-SWaitTime="{{swaitTime}}" data-MWaitTime="{{mwaitTime}}" data-LWaitTime="{{lwaitTime}}"">{{time}}</span>' +
            '<span class="price"data-SPrice="{{sprice}}" data-MPrice="{{mprice}}" data-LPrice="{{lprice}}">{{price}}</span>' +
            '</div>' +
            '</div>';
        //获取服务项目url
        sendUrl2 = "/BusinessMG/service/web/infolist";
        $.get(sendUrl2, {barberid: barberId}, function (data, status) {
            //活动项目类型数组
            var activityGroup = new Array();
            data = eval(data);
            if (data["code"] != 1000) {
                alert("服务器异常");
                return;
            }
            //服务项目数据
            data = data["msg"]
//    		//得到从美发师页面，通过选择服务项目过来预约的服务ID。如果服务id存在则被选择的服务项目会显示出来
//    		var serviceId = $(".selectServiceName").attr("serviceid");
            //服务项目类型：剪发，套餐，染发等
            var items = [data["1"], data["2"], data["3"], data["4"], data["5"], data["6"], data["7"]];
            //项目类型索引
            var typeIndex = -1;
            //服务索引
            var serviceIndex = -1;
            var html = [];
            var activityHtml = [];
            $(items).each(function (ix, ele) {
                if (!ele) {
                    return;
                } else {
                    $(ele).each(function (i, el) {
                        if (el["name"].indexOf("活动") > -1) {
                            activityGroup.push(el);
                            return;
                        }
//						if(serviceId&&serviceId==el['service_id']){
//							typeIndex = ix;
//							serviceIndex = i;
//							return;
//						}
                        html.push(fillServiceItem(template, el));
                    });
                }
            });

            //如果有被选项目，添加活动项目到最前面
            $(activityGroup).each(function (index, el) {
                _tag = fillServiceItem(template, el);
                activityHtml.push(_tag);
            });

            $("#servicePage .services").append(activityHtml.join('') + html.join(''));
//    		if(typeIndex!=-1&&serviceIndex!=-1){
//    			var element = items[typeIndex][serviceIndex];
//    			console.info("element");
//    			tag = '<div class="serviceItem selectService" serviceId="'+element['service_id']+'">'+
//    			'<span  class="glyphicon glyphicon-scissors" id="serviceName">'+element['name']+'</span>'+
//    			'<div id="time_fee">'+
//    				'<span class="time" >耗时:'+element['time']+'小时</span>'+
//    				'<span class="price">折后:'+element['fee']+'元</span>'+
//    			'</div>'+
//    			'</div>'+'<div class="deliever_line"></div>';
//    			$("#servicePage .services").prepend(tag);
//    			$("#servicePage .nextPage").removeClass("disabled");
//    			$("#servicePage .nextPage").addClass("active");
//    		}

            $(".services .serviceItem").on("click", function () {
                $(".selectService").removeClass("selectService");
                $(this).addClass("selectService");
                _hariType = $(".styleItemActive").attr("data-style");
                var _time = "";
                switch (_hariType) {
                    case "1":
                        _time = $(this).find(".time").attr("data-swaittime");
                        break;
                    case "2":
                        _time = $(this).find(".time").attr("data-lwaittime");
                        break;
                    case "3":
                        _time = $(this).find(".time").attr("data-mwaittime");
                        break;
                    default:
                        _time = $(this).find(".time").text().split(":")[1];
                        break;
                }

                var waitTime = parseFloat(_time);
                var serviceTime = $(this).find(".time").text().split(":")[1];
                var price = $(this).find(".price").text().split(":")[1];
                var name = $(this).find("#serviceName").text();
                $(".selectServiceName").attr("name", name);
                $(".selectServiceName").text(name);
                $(".ready_content").text(name);
                $(".serviceTip").attr("data", "true");
                $(".selectServiceName").attr("serviceId", $(this).attr("serviceId"));
                $(".serviceTime_fee").attr({"time": serviceTime, "fee": price}).html(serviceTime + " " + price);
                $(".serviceTime_fee").attr("waittime", waitTime);
                $(".ready_fee").text(price);
                $(".ready_time").text(serviceTime);
                $("#coupon").removeAttr("disabled");
                var listSelect = $(".timeTable .select_unable");
                if (listSelect && listSelect.length) {
                    $(listSelect).each(function (index, ele) {
                        $(ele).removeClass("select_unable");
                    });
                }
                $("#servicePage .serviceComfirm").removeClass("disabled");
                $("#servicePage .serviceComfirm").addClass("active");
            })
        }, "json");
        //获取所有服务类型   end
    };

//	
    //长中短发类别选择
    $(".styleItem span").click(function () {
        if (!$(this).hasClass("styleItemActive")) {
            $(".styleItemActive").removeClass("styleItemActive");
            $(this).addClass("styleItemActive");
        }
        clear_selected();
        $(".book_tip").text("请选择预约时间");
        $(".book_tip").css("color", "rgb(255, 107, 0)");
        $(".serviceTime").attr("data-select", "false");
        $(".serviceTime span").eq(0).text("未选择");
        $(".serviceTip").attr("data", "false");
        $(".selectService").removeClass("selectService");
        $(".selectServiceName").text("");
        $(".selectServiceName").attr("name", "");
        $(".selectServiceName").attr("serviceid", "");
        $(".serviceTime_fee").text("");
        $(".serviceTime_fee").attr({"time": "", "waittime": ""});
        $(".serviceTime_fee").attr("fee", "");
        $(".serviceList").attr("data-select", "false");
        $(".serviceList span").eq(0).text("未选择");
        var index = $(this).index();
        var moveLeft = parseInt(index) * 35 + "%";
        $(".shadow").animate({left: moveLeft}, "fast");
        dataTime = ["data-STime", "data-MTime", "data-LTime"];
        dataPrice = ["data-SPrice", "data-MPrice", "data-LPrice"];
        $($(".time")).each(function (id, ele) {
            $(ele).text(" 耗时:" + $(ele).attr(dataTime[index]) + "小时");
        });
        $($(".price").each(function (id, ele) {
            $(ele).text("折后:" + $(ele).attr(dataPrice[index]) + "元");
        }));
    });
    //监听选择服务时间事件END

    //提交预约
    $("#submitBook").click(function () {
        var customName = $(".customName").val();
        var customTel = $(".customTelPhone").val();
        if (customName.length == 0) {
            alert("客户名称不能为空");
            return;
        }
        if (customTel.length == 0) {
            alert("客户手机号不能为空");
            return;
        } else {
            var checkTel = /^1[3-9]\d{9}$/;  //手机号码正则表达式
            var flog = checkTel.test(customTel);
            if (!flog) {
                alert("手机号码格式错误");
                return;
            }
        }
        var bookStyle = 1;
//    	//验证支付方式是否选择
//    	if($('input:radio[name="bookstyle"]:checked').val()){
//    		bookStyle = parseInt($('input:radio[name="bookstyle"]:checked').val());
//    	}else{
//    		alert("请选择支付方式!");
//    		return;
//    	}
        //验证是否选择了服务
        if ($(".serviceTip").attr("data") == "false") {
            alert("请选择服务项目");
            return;
        }
        //验证是否选择了时间
        if ($(".timeTip").attr("data") == "false") {
            alert("请选择服务时间");
            return;
        }

        var date = $(".timeTip").text();
        year_mon_day = date.substr(0, 10).split(".");
        hour_min = date.substr(11, date.length - 1).split(":");
        hour = hour_min[0];
        minute = hour_min[1];

        var beginTime = year_mon_day[0] + year_mon_day[1] + year_mon_day[2] + hour + minute;
        //使用等待时间作为选择排期跨度
        var Time = $(".serviceTime_fee").attr("waittime");
        var serviceTime = parseFloat(Time);

        //使用服务时间时间作为选择排期跨度
//		var Time = $(".serviceTime_fee").attr("time");
//		var serviceTime = parseFloat(Time.substr(0,Time.length));

        var trueTime = (((serviceTime * 10) / 5) - 1) * 0.5;

        serviceHour = parseInt(trueTime);
        serviceMinute = trueTime - serviceHour;
        endhour = (parseInt(hour) + serviceHour);
        endhour = endhour < 10 ? '0' + endhour : endhour;
        var endTime = '';
        if (minute == '00' && parseInt(endhour) <= 23) {
            if (serviceMinute != 0) {
                endTime = year_mon_day[0] + year_mon_day[1] + year_mon_day[2] + endhour + '30';
            } else {
                endTime = year_mon_day[0] + year_mon_day[1] + year_mon_day[2] + endhour + '00';
            }
        } else {
            if (minute == '30' && parseInt(endhour) <= 23) {
                if (serviceMinute != 0 && parseInt(endhour) <= 22) {
                    endhour = (parseInt(endhour) + 1);
                    endhour = endhour < 10 ? '0' + endhour : endhour;
                    endTime = year_mon_day[0] + year_mon_day[1] + year_mon_day[2] + endhour + '00';
                } else {
                    endTime = year_mon_day[0] + year_mon_day[1] + year_mon_day[2] + endhour + '30';
                }
            }
        }
        var _beginTime = beginTime;
        var _endTime = endTime;
        var _serviceid = $(".selectService").attr("serviceid");
        var _nickname = customName;
        var _telphone = customTel;
        var _servicclass = parseInt($(".styleItemActive").attr("data-style"));
        var _payway = parseInt(bookStyle);
        var _mark = "管理端帮约";
        var _barberid = $(".selectActive").parent().attr("id");
        var data = {
            beginTime: _beginTime, endTime: _endTime,
            nickname: _nickname, telephone: _telphone,
            servicclass: _servicclass, payway: _payway,
            mark: _mark, barberid: _barberid, serviceid: _serviceid
        }
        $(".helpLoading").css("display", "block");
        $.post("../manager/order/manager/web/add/appointment", data, function (data) {
            $(".helpLoading").css("display", "none");
            data = eval(data);
            if (data["code"] == 1000) {
                //帮约成功提示窗口
                var flog = confirm("帮约成功！");
                if (flog) {
                    $("#goBack").click();
                }
            } else {
                alert(data["msg"]);
            }
        }, "json");
    });

    //切换导航改变滑动栏目的值
    $(".changeNav").click(function () {
        if ($("body").hasClass("sidebar-collapse")) {
            $(".swiper-slide").animate({width: ('+=230px')});
        } else {
            $(".swiper-slide").animate({width: ('-=230px')});
        }
    });


    //搜索美发师列表
    $("#barber_input").keyup(function (event) {
        //监听键盘回车按键。
        if (13 == event.which) {
            console.info(event.which);
            $("#serachBarber").click();
            return;
        }

        $(".result-group").empty();
        $("#barber_input").attr("data-id", "-1");
        _name = $(this).val();
        if (_name.length == 0) {
            return;
        }
        $.post("../barber/info/web/select/list", {"barbername": _name}, function (data) {
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
    $(".userInfoContent").blur(function () {
        $(".userInfoContent").hide();
    });
    //输入客户手机号码显示客户信息和相关服务记录
    $(".customTelPhone").keydown(function () {
    });
    var service_customer = new Array();
    //输入客户手机号码失去焦点
    $(".customTelPhone").blur(function () {
        var telphone = $(this).val();
        var patrn = /^(13[0-9]|15[0|3|6|7|8|9]|18[8|9])\d{8}$/;
        if (!patrn.exec(telphone)) {
            return;
        }
        var _template = '<li class="userInfolist"> <span class="userInfo_Name">{nickname}</span>' +
            '<span class="userInfo_tel">{telphone}</span>' +
            '<span class="userInfo_service">服务记录</span></li>';
        var data = {tel: telphone};
        $.get("../manager/order/web/select/name/bytel ", data, function (data) {
            var index = 0;
            if (data["code"] == 1000) {
                _html = _template.replace("{nickname}", data['nickname'])
                    .replace("{telphone}", telphone);
                if (data['orders'].length != 0) {
                    service_customer.push(data['orders']);
                    $(".userInfoUl").html(_html);
                    $(".userInfoContent").show();
                    $(".userInfoContent").focus();
                }
            }

            $(".userInfo_service").on("mouseenter", function () {
                if (service_customer.length == 0) {
                    return;
                }
                var _template = '<li class="userService_item">' +
                    '<span class="userService_time">{time}</span>' +
                    '<span class="userService_barber">{barbername}</span><br>' +
                    '<span class="userService_title">服务价格:{service_price}元</span>' +
                    '</li>';
                $(".userService_Container").show();
                $(".userService_list").empty();
                $(service_customer).each(function (index, element) {
                    $(element).each(function (index, data) {
                        _html = _template.replace("{time}", formatUnixTime(data['beginTime'])).replace("{barbername}", data['barberName'])
                            .replace("{service_price}", data['orderFee']);
                        $(".userService_list").append(_html);
                    });
                });
            });

            $(".userInfolist").on("click", function () {
                var name = $(this).find(".userInfo_Name").text();
                $(".customName").val(name);
            });

        }, "json");


    });

    //通过unix时间戳来获取时间，并格式化输出
    function formatUnixTime(unix_time) {
        var time = parseInt(unix_time) * 1000;
        var date = new Date(time);
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    }

    $(".userService_Container").mouseover(function () {
        $(".userInfoContent").hide();
        $(".userService_Container").show();
        $(".userInfoContent").focus();
    });

    $(".userService_Container").mouseout(function () {
        $(".userInfoContent").show();
        $(".userService_Container").hide();
        $(".userInfoContent").focus();
    });

    //点击搜索按钮
    $("#serachBarber").click(function () {
        _barberID = $("#barber_input").attr("data-id");
        if (_barberID != -1) {
            _top = $(".barberList")[0].offsetTop + 30;
            _offetTop = $("#" + _barberID)[0].offsetTop;
            $(".barberList").animate({scrollTop: _offetTop - _top}, 500);
        }
    });

});