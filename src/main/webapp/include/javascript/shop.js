var _tempHtml = '<p class=".shopStatus">商户状态：<span>{shopStatus}</span></p>' +
    '<p class=".shopName">商户名称：<span>{shopName}</span><span class="icon-edit"></span></p>' +
    '<p class=".shopContact">联系方式：<span>{shopContact} </span><span class=" icon-edit"></span></p>' +
    '<p class=".shopType">商户类型：<span>{shopType}</span></p><p class=".shopAddress">商户地址：<span>{shopAddress}</span> <span class=" icon-edit"></span>' +
    '</p><p class=".shopInfo">商户简介：<span>{shopInfo}</span> <span class=" icon-edit"></span></p>' +
    '<p class=".servicePercent">服务指数：<spam>{servicePercent}</span></p><p class=".popularPercent">人气指数：<span>{popularPercent}</span></p><p class=".environmentPercent">环境指数：<span>{environmentPercent}<span></p>' +
    '<p class=".suginTime">入驻时间：<span>{suginTime}</span></p><p class=".isSale">是否打折：<span>{isSale}</span><span class=" icon-edit"></span></p>' +
    '<p class=".isFree">是否免费：<span>{isFree}</span> <span class=" icon-edit"></span>' +
    '</p><p class=".seatCount">理发座位：<span>{seatCount}</span> 个 <span class=" icon-edit"></span></p>' +
    '<p class=".emploeeCount">中工人数：<span>{emploeeCount}</span> 人 <span class=" icon-edit"></span></p>' +
    '<p class=".helperCount">助理数目：<span>{helperCount}</span> 人 <span class=" icon-edit"></span>' +
    '</p><p class=".barberPercent">分成比例(发型师)：<span>{barberPercent}</span></p>' +
    '<p class=".onlinePercent">分成比例(平台)：<span>{onlinePercent}</span></p>';

function getshopInfo() {
    $.get("../shopinfo/web/getinfo/byid", {global_shopId: global_shopId}, function (data) {
        data = eval(data);

        var status = data["msg"]["status"];
        var type = data["msg"]["type"];
        var date = new Date(data["msg"]["createtime"] * 1000);
        var suginTime = date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日"
        if (data["code"] == 1000) {
            _html = _tempHtml
                .replace("{shopStatus}", status == 1 ? "正常" : (status == 2 ? "休假" : "其他"))
                .replace("{shopName}", data["msg"]["name"])
                .replace("{shopContact}", data["msg"]["callphone"])
                .replace("{shopType}", type == 0 ? "型云" : (type == 1 ? "自营店" : (type == 2 ? "合作店" : "非合作店")))
                .replace("{shopAddress}", data["msg"]["address"])
                .replace("{shopInfo}", data["msg"]["introduction"])
                .replace("{servicePercent}", data["msg"]["serIndex"])
                .replace("{popularPercent}", data["msg"]["populIndex"])
                .replace("{environmentPercent}", data["msg"]["envirIndex"])
                .replace("{suginTime}", suginTime)
                .replace("{isSale}", data["msg"]["zhe"] == 1 ? "打折" : "不打折")
                .replace("{isFree}", data["msg"]["mian"] == 1 ? "免费" : "不免费")
                .replace("{seatCount}", data["msg"]["seats"])
                .replace("{emploeeCount}", data["msg"]["midworker"])
                .replace("{helperCount}", data["msg"]["assistant"])
                .replace("{barberPercent}", (parseFloat(data["msg"]["splittobarber"]) * 100) + "%")
                .replace("{onlinePercent}", (parseFloat(data["msg"]["splittosystem"]) * 100) + "%");
            $(".shopInfoContent").html(_html);
            $(".icon-edit").on("click", function () {
                console.info($(this).parent().text());
            });
        }
    }, "json");
}

function modify() {

    status = $(".shopStatus").find("span").first().text();
    name = $(".shopName").find("span").first().text();
    $(".shopContact").find("span").first().text();
    $(".shopType").find("span").first().text();
    address = $(".shopAddress").find("span").first().text();
    introduction = -$(".shopInfo").find("span").first().text();
    $(".servicePercent").find("span").first().text();
    $(".popularPercent").find("span").first().text();
    $(".environmentPercent").find("span").first().text();
    $(".suginTime").find("span").first().text();
    $(".isSale").find("span").first().text();
    $(".isFree").find("span").first().text();
    $(".seatCount").find("span").first().text();
    $(".emploeeCount").find("span").first().text();
    assistant = $(".helperCount").find("span").first().text();
    splittobarber = $(".barberPercent").find("span").first().text();
    splittosystem = $(".onlinePercent").find("span").first().text();
    var postData = {shopid: global_shopId}
    $.post("/BusinessMG/newshopmodule/modify", {
        shopid: '021475838ecd45f0a204eb53447b6e3a',
        name: '大爷'
    }, function (data) {

    }, "json");
}

$(document).ready(function () {
    getshopInfo();
    modify();
});