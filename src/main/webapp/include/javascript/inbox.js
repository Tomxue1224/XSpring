//查看信息---begin
function lookMsg(_parentElement) {
    _messageId = $(_parentElement).attr("id");
    _title = $(_parentElement).find(".mailbox-name").text();
    _content = $(_parentElement).find(".mailbox-subject").text();
    _date = $(_parentElement).find(".mailbox-date").text();
    $(".modal-title #title").text(_title);
    $(".modal-title #date").text(_date);
    $(".modal-body").text(_content);
    $("#myModal").attr("data-msgid", _messageId);
    $('#myModal').modal({keyboard: false});
}

//查看信息---end

//添加消息项目到表格中---begin
function addMsgItemelement(element) {
    _html = _msgTelempt;
    _idRead = "fa-star";
    _text_color = "text-yellow";
    _text_content = "未读";
    if (element["statu"] == 2) {
        _idRead = "fa-star-o";
        _text_color = "text-blue";
        _text_content = '已读';
    }
    if (element["statu"] == 3) {
        _idRead = "fa-close (alias)";
        _text_color = "text-gay";
        _text_content = '已删除';
    }

    _html = _html.replace("{Msgtitle}", element['title'])
        .replace("{Msgcontent}", element['content'])
        .replace("{Msgtime}", element['createtime']).replace("{statu}", element['statu'])
        .replace("{MsgId}", element['message_id']).replace("{_text_content}", _text_content)
        .replace("{isRead}", _idRead).replace("{text-color}", _text_color);
    $(".MsgList tbody").append(_html);
}

//添加消息项目到表格中---end
//监听查看按钮与信息条目勾选按钮----begin
function listenEyeClick() {
    $(".fa-eye").on("click", function () {
        _parentElement = $(this).parent().parent();
        lookMsg(_parentElement);
        _statu = $(_parentElement).find(".mailbox-star").attr("id");
        if (_statu == 1) {
            $(_parentElement).find(".mailbox-star").attr("id", 2);
            $(_parentElement).find(".fa-star").text("已读");
            $(_parentElement).find(".fa-star").addClass("fa-star-o");
            $(_parentElement).find(".fa-star").removeClass("fa-star");
            $(_parentElement).find(".text-yellow").addClass("text-blue");
            $(_parentElement).find(".text-blue").removeClass("text-yellow");
        } else {
            return;
        }
        _nextElement = null;
        $($(".MsgList tbody").children()).each(function (index, element) {
            if ($(element).find(".mailbox-star").attr("id") == "1") {
                _nextElement = element;
                return false;
            }
        });
        _nextID = null;
        _nextTitle = null;
        _nextContent = null;
        _nextTime = null;
        if (_nextElement) {
            _nextID = $(_nextElement).attr("id");
            _nextTitle = $(_nextElement).find(".mailbox-name").text();
            _nextContent = $(_nextElement).find(".mailbox-subject").text();
            _nextTime = $(_nextElement).find(".mailbox-date").text();
        } else {
            $(".infohead").text("没有信息！");
            $(".infohead").next().find(".menu").empty();
            $(".infofooter").css("display", "none");
        }
        $.post("/BusinessMG/barber/message/web/manager/click/ready", {messageid: _messageId}, function (data) {
            data = eval(data);
            if (data['code'] == 1000) {
                _count = parseInt($(".infoCount").eq(0).text()) - 1;
                $(".infoCount").text(_count);
                $(".infohead").text("你有" + _count + "信息！");
                $(".menu-msg").attr("id", _nextID);
                $(".menu-title").text(_nextTitle);
                $(".menu-time").text(_nextTime);
                $(".menu-content").text(_nextContent);

                //改变信息数据容器中的信息状态
                _index = $("#" + _messageId).index();
                _msgList = messageMap["messageList"];
                _msgList[_index + ((messageMap["pageIndex"] - 1) * messageMap["pageStep"])]["statu"] = 2;
                messageMap["messageList"] = _msgList;

            } else {
                alert("服务器异常！");
            }
        }, "json")
    });
}

function checkBoxListen() {
    $(".icheckbox_flat-blue").on("click", function () {
        if ($(this).hasClass("checked")) {
            $(this).removeClass("checked");
            return;
        }
        $(this).addClass("checked");
    });
}

//监听查看按钮与信息条目勾选按钮----end


/*--获取所有消息数据 Start*/
function getAllMessage() {
    $(".MsgList tbody").empty();
    $.get("/BusinessMG/barber/message/web/query/manager/uorlist", {global_shopId: global_shopId}, function (data) {
        data = eval(data);
        if (data['code'] == 1000) {
            if (data['messagelist'] == 0) {
                $(".MsgList tbody").append('<tr><td style="text-align:center"><h3>无信息</h3></td></tr>');
            } else {
                //添加到Map容器
                messageMap["messageList"] = data['messagelist'];
                messageMap["pageNumber"] = Math.ceil(data['messagelist'].length / messageMap["pageStep"]);
                $(".mailBox-number").text(messageMap["pageIndex"] + "/" + messageMap["pageNumber"]);
                //-----end
                $(data['messagelist']).each(function (index, element) {
                    if (index > 9) {
                        return;
                    }
                    addMsgItemelement(element);
                });
                listenEyeClick();
                checkBoxListen();
                $(".spinner").css("display", "none");
            }
        } else {
            $(".infohead").text("没有信息！");
            $(".infohead").next().find(".menu").empty();
            $(".infofooter").css("display", "none");
        }
    }, "json");
}

/*--获取所有消息数据 End*/

/*	--获取已读消息  Start*/
function getReadMsg() {
    $.get("/BusinessMG/barber/message/web/query/manager", {flag: 4}, function (data) {
        data = eval(data);
        if (data['code'] == 1000) {
            if (data['ready'].length == 0) {
                $(".MsgList tbody").append('<tr><td style="text-align:center"><h3>无信息</h3></td></tr>');
            } else {
                //添加到Map容器
                messageMap["messageList"] = data['ready'];
                messageMap["pageNumber"] = Math.ceil(data['ready'].length / messageMap["pageStep"]);
                $(".mailBox-number").text(messageMap["pageIndex"] + "/" + messageMap["pageNumber"]);
                //-----end
                $(data['ready']).each(function (index, element) {
                    if (index > 9) {
                        return;
                    }
                    addMsgItemelement(element);
                });
                listenEyeClick();
                checkBoxListen();
                $(".spinner").css("display", "none");
            }
        } else {
            $(".infohead").text("没有信息！");
            $(".infohead").next().find(".menu").empty();
            $(".infofooter").css("display", "none");
        }
    }, "json");
}

/*  --获取已读消息 End*/

/*	--获取未读消息  Start*/
function getUnreadMsg() {
    $.get("/BusinessMG/barber/message/web/query/manager", {flag: 3}, function (data) {
        data = eval(data);
        if (data['code'] == 1000) {
            if (data['unready'].length == 0) {
                $(".MsgList tbody").append('<tr><td style="text-align:center"><h3>无信息</h3></td></tr>');
            } else {
                //添加到Map容器
                messageMap["messageList"] = data['unready'];
                messageMap["pageNumber"] = Math.ceil(data['unready'].length / messageMap["pageStep"]);
                $(".mailBox-number").text(messageMap["pageIndex"] + "/" + messageMap["pageNumber"]);
                //-----end
                $(data['unready']).each(function (index, element) {
                    if (index > 9) {
                        return;
                    }
                    addMsgItemelement(element);
                });
                $(".fa-eye").on("click", function () {
                    _parentElement = $(this).parent().parent();
                    lookMsg(_parentElement);
                    $(_parentElement).remove();
                    _nextElement = $(".MsgList tbody").children().eq(0);
                    _nextID = null;
                    _nextTitle = null;
                    _nextContent = null;
                    _nextTime = null;
                    if (_nextElement.length != 0) {
                        _nextID = $(_nextElement).attr("id");
                        _nextTitle = $(_nextElement).find(".mailbox-name").text();
                        _nextContent = $(_nextElement).find(".mailbox-subject").text();
                        _nextTime = $(_nextElement).find(".mailbox-date").text();
                    } else {
                        $(".infohead").text("没有信息！");
                        $(".infohead").next().find(".menu").empty();
                        $(".infofooter").css("display", "none");
                        $(".MsgList tbody").append('<tr><td style="text-align:center"><h3>无信息</h3></td></tr>');
                    }
                    $.post("/BusinessMG/barber/message/web/manager/click/ready", {messageid: _messageId}, function (data) {
                        data = eval(data);
                        if (data['code'] == 1000) {
                            _count = parseInt($(".infoCount").eq(0).text()) - 1;
                            $(".infoCount").text(_count);
                            $(".infohead").text("你有" + _count + "信息！");
                            $(".menu-msg").attr("id", _nextID);
                            $(".menu-title").text(_nextTitle);
                            $(".menu-time").text(_nextTime);
                            $(".menu-content").text(_nextContent);
                        } else {
                            alert("服务器异常！");
                        }
                    }, "json")
                });
                checkBoxListen();
                $(".spinner").css("display", "none");
            }
        } else {
            $(".infohead").text("没有信息！");
            $(".infohead").next().find(".menu").empty();
            $(".infofooter").css("display", "none");
        }
    }, "json");
}

/*  --获取未读消息 End*/

/*--获取删除信息    Start*/
function getTranshMsg() {
    $.get("/BusinessMG/barber/message/web/query/manager", {flag: 5}, function (data) {
        data = eval(data);
        if (data['code'] == 1000) {
            if (data['delete'].length == 0) {
                $(".MsgList tbody").append('<tr><td style="text-align:center"><h3>无信息</h3></td></tr>');
            } else {
                //添加到Map容器
                messageMap["messageList"] = data['delete'];
                messageMap["pageNumber"] = Math.ceil(data['delete'].length / messageMap["pageStep"]);
                $(".mailBox-number").text(messageMap["pageIndex"] + "/" + messageMap["pageNumber"]);
                //-----end
                $(data['delete']).each(function (index, element) {
                    if (index > 9) {
                        return;
                    }
                    addMsgItemelement(element);
                    $(".icheckbox_flat-blue").css("display", "none");
                });
                $(".fa-eye").on("click", function () {
                    _parentElement = $(this).parent().parent();
                    lookMsg(_parentElement);
                });
                checkBoxListen();
                $(".spinner").css("display", "none");
            }
        } else {
            $(".infohead").text("没有信息！");
            $(".infohead").next().find(".menu").empty();
            $(".infofooter").css("display", "none");
        }
    }, "json");
}

/*--设置点击状态   Start*/
function getActive(element) {
    if ($(element).attr("id") == "transhMsg") {
        $(".check-all").css("display", "none");
        $(".goTransh").css("display", "none");
        $(".deleteMsg").css("display", "none");
    } else {
        $(".check-all").css("display", "inline-block");
        $(".goTransh").css("display", "inline-block");
        $(".deleteMsg").css("display", "inline-block");
    }
    if ($(element).hasClass("active")) {
        return true;
    } else {
        _findEle = $(element).parent().find(".active");
        $(_findEle).removeClass("active");
        $(element).addClass("active");
        return false;
    }
}

/*--设置激活状态   End*/

//存放所有消息数据容器
var messageMap = {"pageIndex": 1, "pageNumber": 1, "pageStep": 10};
$(document).ready(function () {
    _msgTelempt = '<tr class="msgItem" id={MsgId}>' +
        '<td><div class="icheckbox_flat-blue" aria-checked="false" aria-disabled="false"style="position: relative;">' +
        '<input type="checkbox" style="position: absolute; opacity: 0;">' +
        '<ins class="iCheck-helper"' +
        'style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; border: 0px; opacity: 0; background: rgb(255, 255, 255);"></ins>' +
        '</div></td>' +
        '<td class="mailbox-star" id="{statu}"><i class="fa  {isRead} {text-color}">{_text_content}</i></td>' +
        '<td class="mailbox-name">{Msgtitle}</td>' +
        '<td class="mailbox-subject">{Msgcontent}' +
        '</td>' +
        '<td class="mailbox-attachment"><i class="fa fa-eye"></i></td>' +
        '<td class="mailbox-date">{Msgtime}</td>' +
        '</tr>';


    //分页信息右移---begin
    $(".moveRight").click(function () {
        _pageIndex = messageMap["pageIndex"];
        _pageNumber = messageMap["pageNumber"];
        _pageStep = messageMap["pageStep"];
        _msgList = messageMap["messageList"];
        if (_pageIndex == _pageNumber) {
            return;
        }
        $(".MsgList tbody").empty();
        for (i = 0; i < _pageStep; i++) {
            _index = (_pageIndex) * _pageStep + i;
            if (_index > _msgList.length - 1) {
                messageMap["pageIndex"] = _pageIndex + 1;
                $(".mailBox-number").text(messageMap["pageIndex"] + "/" + messageMap["pageNumber"]);
                listenEyeClick();
                checkBoxListen();
                return;
            }
            addMsgItemelement(_msgList[_index]);
        }
        listenEyeClick();
        checkBoxListen();
        messageMap["pageIndex"] = _pageIndex + 1;
        $(".mailBox-number").text(messageMap["pageIndex"] + "/" + messageMap["pageNumber"]);
    });
    //分页信息右移---end

    //分页信息左移---begin
    $(".moveLeft").click(function () {
        _pageIndex = messageMap["pageIndex"];
        _pageNumber = messageMap["pageNumber"];
        _pageStep = messageMap["pageStep"];
        _msgList = messageMap["messageList"];
        if (_pageIndex <= 1) {
            return;
        }
        $(".MsgList tbody").empty();
        for (i = 0; i < _pageStep; i++) {
            _index = (_pageIndex - 2) * _pageStep + i;
            if (_index > _msgList.length - 1) {
                messageMap["pageIndex"] = _pageIndex - 1;
                $(".mailBox-number").text(messageMap["pageIndex"] + "/" + messageMap["pageNumber"]);
                listenEyeClick();
                checkBoxListen();
                return;
            }
            addMsgItemelement(_msgList[_index]);
        }
        listenEyeClick();
        checkBoxListen();
        messageMap["pageIndex"] = _pageIndex - 1;
        $(".mailBox-number").text(messageMap["pageIndex"] + "/" + messageMap["pageNumber"]);
    });
    //分页信息左移---end


    /*--获取删除信息    End*/
    $("#allMsg").click(function () {
        messageMap = {"pageIndex": 1, "pageNumber": 1, "pageStep": 10};
        if (getActive(this)) {
            return;
        }
        ;
        $(".MsgList tbody").empty();
        getAllMessage();
    });
    $("#readMsg").click(function () {
        messageMap = {"pageIndex": 1, "pageNumber": 1, "pageStep": 10};
        if (getActive(this)) {
            return;
        }
        ;
        $(".MsgList tbody").empty();
        getReadMsg();
    });
    $("#unreadMsg").click(function () {
        messageMap = {"pageIndex": 1, "pageNumber": 1, "pageStep": 10};
        if (getActive(this)) {
            return;
        }
        ;
        $(".MsgList tbody").empty();
        getUnreadMsg();
    });
    $("#transhMsg").click(function () {
        messageMap = {"pageIndex": 1, "pageNumber": 1, "pageStep": 10};
        if (getActive(this)) {
            return;
        }
        ;
        $(".MsgList tbody").empty();
        getTranshMsg();
    });
    $("#allMsg").click();

    /*--删除信息  Start*/
    $(".deleteMsg").click(function () {
        _id = $("#myModal").attr("data-msgid");
        $.post("/BusinessMG/barber/message/web/manager/click/delete", {messageid: _id}, function (data) {
            data = eval(data);
            if (data['code'] == 1000) {
                _index = $("#" + _id).index();
                $(".MsgList tbody tr").eq(_index).remove();
                _msgList = messageMap["messageList"];
                _msgList.splice(_index + ((messageMap["pageIndex"] - 1) * messageMap["pageStep"]), 0);
                messageMap["messageList"] = _msgList;
                $('#myModal').modal('hide');
                $(".bt-refresh").click();
            } else {
                alert("删除信息失败");
            }
        }, "json");
    });
    /*--删除信息  End*/

    /*--选择所有信息   Start*/
    $(".check-all").click(function () {
        findElement1 = $(".check-all").find(".fa").eq(0);
        findElement2 = $(".check-all").find(".fa").eq(1);
        if (findElement1.hasClass("fa-square-o")) {
            findElement1.removeClass("fa-square-o")
            findElement1.addClass("fa-check-square-o");
            findElement2.removeClass("fa-square-o")
            findElement2.addClass("fa-check-square-o");
            _childList = $(".MsgList tbody").children();
            $(_childList).each(function (index, ele) {
                $(ele).find(".icheckbox_flat-blue").addClass("checked");
            });
        } else {
            findElement1.removeClass("fa-check-square-o")
            findElement1.addClass("fa-square-o");
            findElement2.removeClass("fa-check-square-o")
            findElement2.addClass("fa-square-o");
            _childList = $(".MsgList tbody").children();
            $(_childList).each(function (index, ele) {
                $(ele).find(".icheckbox_flat-blue").removeClass("checked");
            });
        }

    });
    /*--选择所有信息   End*/


    /*--删除信息进入垃圾桶     Start*/
    $(".goTransh").click(function () {
        _childList = $(".MsgList tbody").children();
        $(_childList).each(function (index, ele) {
            if ($(ele).find(".icheckbox_flat-blue").hasClass("checked")) {
                _id = $(ele).attr("id");
                $.post("/BusinessMG/barber/message/web/manager/click/delete", {messageid: _id}, function (data) {
                    data = eval(data);
                    if (data['code'] == 1000) {
                        _index = $("#" + _id).index();
                        $(".MsgList tbody tr").eq(_index).remove();
                        _msgList = messageMap["messageList"];
                        _msgList.splice(_index + ((messageMap["pageIndex"] - 1) * messageMap["pageStep"]), 0);
                        messageMap["messageList"] = _msgList;
                        $('#myModal').modal('hide');
                        $(".bt-refresh").click();
                    } else {
                        alert("删除信息失败");
                    }
                }, "json");
            }
        });
    });
    /*--删除信息进入垃圾桶     End*/

    /*--刷新数据 Start*/
    $(".bt-refresh").click(function () {
        location.reload(true);
    });
    /*--刷新数据 Start*/
});