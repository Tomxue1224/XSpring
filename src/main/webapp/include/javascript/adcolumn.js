$("document").ready(function () {

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

    //获取所有信息
    $.get("/BusinessMG/indexbannermodule/getall", null, function (data) {
        _template = $(".adImageList").html();
        _html = "";
        if (data["code"] == 1000) {
            _imglist = new Array();
            $(data["msg"]).each(function (index, element) {
                _create_date = parseInt(element["createtime"]) * 1000;
                _update_date = parseInt(element["alerttime"]) * 1000;
                _img_url = "http://51styling.com/" + element["imgurl"];
                _html += _template.replace("{imgId}", element["indexbannerid"])
                    .replace("{url_img}", _img_url)
                    .replace("{url_img}", _img_url)
                    .replace("{create_date}", new Date(_create_date).format("yyyy-MM-dd hh:mm"))
                    .replace("{updateDate}", new Date(_update_date).format("yyyy-MM-dd hh:mm"))
                    .replace("{isOpen}", element["isdelete"]).replace("{ordinal}", element["sort"]);
                if (element['isdelete'] == 1) {
                    _option_html = '<option value="' + element["sort"] + '></option>';
                    console.info($("#sort_input").append(_option_html));
                }
            });
            $(".adImageList").html(_html);
            //删除素材
            $("#delete").on("click", function () {
                edit(this, 2);
            });
            $("#update").on("click", function () {
                edit(this, 1);
            });
        }
    }, "json");

    var updateData = [{"imgTextId": null, "type": null}];

    function edit(element, flog) {
        var imgtextId = $(element).parent().parent().parent().attr("data-id");
        var tag = ".imgTextItem[data-id=" + imgtextId + "]";
        if (flog == 2) {
            $.get("../resOpt/delete", {"id": imgtextId}, function (data) {
                data = eval(data);
                if (data["code"] == 600) {
                    $(tag).remove();
                } else {
                    alert("服务器异常,删除失败！");
                }
            }, "json");
        } else if (flog == 1) {
            updateData["imgTextId"] = imgtextId;
            updateData["type"] = $(tag).attr("data-type");
            $("#title").val($(tag).find(".title p:first").text());
            $("#upIntro").val($(tag).find(".intro p").text());
            $("#imgTexturl").val($(tag).find(".imgDiv a").attr("href"));
            $("#newImg").val($(tag).find(".imgDiv img").attr("src"));
            $(".upResouce").toggle();
        }
    }


    //取消添加
    $(".cancleBut").click(function () {
        $("#title").val("");
        $("#upIntro").val("");
        $("#imgTexturl").val("");
        $("#newImg").val("");
        $(".upResouce").toggle();
    });


    //保存素材
    $(".saveBut").click(function () {
        var title = $("#title").val();
        if (title.length == 0) {
            alert("标题不能为空！");
            return false;
        }
        var imgUrl = $("#newImg").val();
        if (imgUrl.length == 0) {
            alert("原文封面不能为空！");
            return false;
        }
        var intro = $("#upIntro").val();
        if (intro.length == 0) {
            alert("摘要不能为空！");
            return false;
        }
        var imgTextUrl = $("#imgTexturl").val();
        if (imgTextUrl.length == 0) {
            alert("原文链接不能为空！");
            return false;
        }
    });
});