package x.constant;

public enum FailEnumType {

    /**
     * {"code":2000,"msg":"服务端异常"}
     */
    bug(2000),

    /**
     * {"code":3001,"msg":"用户没登录"}
     */
    unline(3001),

    /**
     * {"code":3002,"msg":"图片应该在2M以下"}
     */
    filesize(3002),

    /**
     * {"code":3003,"msg":"文件空"}
     */
    filenull(3003),

    /**
     * {"code":3004,"msg":"参数错误"}
     */
    paramerr(3004),

    /**
     * {"code":3005,"msg":"订单id错误"}
     */
    errorderid(3005),

    /**
     * {"code":3006,"msg":"订单不存在"}
     */
    ordernoexit(3006),

    /**
     * {"code":3007,"msg":"未到完成服务时间不能确定"}
     */
    ordertime(3007),

    /**
     * {"code":3008,"msg":"取消订单失败"}
     */
    cancleordererr(3008),

    /**
     * {"code":3009,"msg":"手机或密码空"}
     */
    uOpNull(3009),

    /**
     * {"code":3010,"msg":"手机格式错误"}
     */
    telFormerr(3010),

    /**
     * {"code":3011,"msg":"用户不存在"}
     */
    usernull(3011),

    /**
     * {"code":3012,"msg":"用户名或密码错误"}
     */
    uOpErr(3012),

    /**
     * {"code":3013,"msg":"手机号码空"}
     */
    telphoneNull(3013),

    /**
     * {"code":3014,"msg":"发送短信失败"}
     */
    sendMsgFail(3014),

    /**
     * {"code":3015,"msg":"修改密码失败"}
     */
    updatepassErr(3015),

    /**
     * {"code":3016,"msg":"服务不存在"}
     */
    serviceNoExists(3016),

    /**
     * {"code":3017,"msg":"工作时间设置错误"}
     */
    serviceTimeErr(3017),

    /**
     * {"code":3018,"msg":"更新工作时间失败"}
     */
    serviceTimeUpErr(3018),

    /**
     * {"code":3019,"msg":"美发师id错误"}
     */
    barberidErr(3019),

    /**
     * {"code":3020,"msg":"图片类型错误"}
     */
    imgTypeErr(3020),

    /**
     * {"code":3021,"msg":"更新作品失败"}
     */
    updateWorkeErr(3021),

    /**
     * {"code":3022,"msg":"删除作品失败"}
     */
    deleteWorkeErr(3022),

    /**
     * {"code":3023,"msg":"添加作品失败"}
     */
    addWorkErr(3023),

    /**
     * {"code":3024,"msg":"原始密码错误"}
     */
    orgpasswordErr(3024),

    /**
     * {"code":3025,"msg":"修改密码失败"}
     */
    modifypasswordErr(3025),

    /**
     * {"code":3026,"msg":"手机号未注册"}
     */
    NoRegister(3026),

    /**
     * {"code":3027,"msg":"作品不存在"}
     */
    workNoExists(3027),

    /**
     * {"code":3028,"msg":"时间格式不对"}
     */
    timeFormErr(3028),

    /**
     * {"code":3029,"msg":"没有设置上下班时间或者查找的是过时的时间"}
     */
    UoDTimeNoSetOrPass(3029),

    /**
     * {"code":3030,"msg":"时间已经被占用"}
     */
    schedulingExit(3030),

    /**
     * {"code":3031,"msg":"手机号码已注册过"}
     */
    telephoneExit(3031),

    /**
     * {"code":3032,"msg":"验证码错误"}
     */
    authErr(3032),

    /**
     * {"code":3033,"msg":"注册失败"}
     */
    RegisterErr(3033),

    /**
     * {"code":3034,"msg":"商家不存在"}
     */
    ShopNoExit(3034),

    /**
     * {"code":3035,"msg":"没绑定商家"}
     */
    NoBindShop(3035),

    /**
     * {"code":3036,"msg":"订单已经点击完成提交"}
     */
    OrderAlreadySubmit(3036),

    /**
     * {"code":3037,"msg":"订单备注过长"}
     */
    marksTooLong(3037),

    /**
     * {"code":3038,"msg":"您处于休假或是没绑定商家状态"}
     */
    nowork(3038),

    /**
     * {"code":3039,"msg":"传入的服务时间和对应的服务时间不一致"}
     */
    servierTimeSetErr(3039),

    /**
     * {"code":3040,"msg":"参数过长"}
     */
    Paramtoolong(3040),

    /**
     * {"code":3041,"msg":"密码长度不正确"}
     */
    PasswordLengthErr(3041),

    /**
     * {"code":3042,"msg":"作品图片没上传"}
     */
    ImgNoUpload(3042),

    /**
     * {"code":3043,"msg":"订单关联作品失败"}
     */
    OrderconWorkerr(3043),

    /**
     * {"code":3044,"msg":"订单未完成，不能绑定"}
     */
    Cannobind(3044),

    /**
     * {"code":3045,"msg":"已经绑定作品，不能再绑定"}
     */
    alreadybindwork(3045),

    /**
     * {"code":3046,"msg":"错误"}
     */
    err(3046),

    /**
     * {"code":3047,"msg":"未设置服务地址"}
     */
    noServiceAddress(3047),

    /**
     * {"code":3048,"msg":"没有可添加的服务地址"}
     */
    noAddressAdd(3048),

    /**
     * {"code":3049,"msg":"服务地址不能为空"}
     */
    serviceNUll(3049),

    /**
     * {"code":3050,"msg":"服务地址不存在"}
     */
    serviceAddressNoExists(3050),

    /**
     * {"code":3051,"msg":"服务地址已添加过"}
     */
    serviceAddressAlreadyAdd(3051),

    /**
     * {"code":3052,"msg":"服务地址不能少于一条"}
     */
    cannotlessone(3052),

    /**
     * {"code":3053,"msg":"默认地址不能删除"}
     */
    cannotdeletedefaule(3053),

    /**
     * {"code":3054,"msg":"请使用验证码手机"}
     */
    telNoAputh(3054),

    /**
     * {"code":3055,"msg":"美发师类别设置错误"}
     */
    barberTypeErr(3055),

    /**
     * {"code":3056,"msg":"场地没位置"}
     */
    noseat(3056),

    /**
     * {"code":3057,"msg":"未支付"}
     */
    nopay(3057),

    /**
     * {"code":3058,"msg":"订单不可取消"}
     */
    cannotcalorder(3058),

    /**
     * {"code":3059,"msg":"数据系统审核中"}
     */
    DataAudit(3059),

    /**
     * {"code":3060,"msg":"一天内仅能修改一次"}
     */
    alertONE(3060),

    /**
     * {"code":3061,"msg":"平台价不能大于原价"}
     */
    feeErr(3061),

    /**
     * {"code":3062,"msg":"价格设置不合理"}
     */
    feeSetErr(3062),

    /**
     * {"code":3063,"msg":"服务类型设置错误"}
     */
    serviceTypeErr(3063),

    /**
     * {"code":3064,"msg":"长中断发分类错误"}
     */
    czdypeErr(3064),

    /**
     * {"code":3065,"msg":"登录失败"}
     */
    loginerr(3065),

    /**
     * {"code":3066,"msg":"token失效或错误"}
     */
    tokenerr(3066),

    /**
     * {"code":3067,"msg":"ip地址异常"}
     */
    iperr(3067),

    /**
     * {"code":3068,"msg":"订单价格不可修改"}
     */
    feeNoalert(3068),

    /**
     * {"code":3069,"msg":"号码已存在系统中"}
     */
    telEXITS(3069),

    /**
     * {"code":3070,"msg":"称呼不能为空"}
     */

    namenullerr(3070),

    /**
     * {"code":3071,"msg":"未输入美团或大众验证码"}
     */
    thressflagnull(3071),

    /**
     * {"code":3072,"msg":"审核申请失败"}
     */
    aexamineerr(3072),

    /**
     * {"code":3073,"msg":"审核已经申请"}
     */
    aexamineaply(3073),

    /**
     * {"code":3074,"msg":"服务时长或等待时长设置错误"}
     */
    servicetimeorwaittimeerr(3074),

    /**
     * {"code":3075,"msg":"休息时间格式错误"}
     */
    resttimeformaterr(3075),

    /**
     * {"code":3076,"msg":"时间设置不正确"}
     */
    timeseeterr(3076),

    /**
     * {"code":3077,"msg":"请不要设置重复的休息时间"}
     */
    resttimerepeat(3077),

    /**
     * {"code":3078,"msg":"休息时间已过期，无法修改"}
     */
    resttimecannomodify(3078),

    /**
     * {"code":3079,"msg":"优惠券修改失败"}
     */
    keywordexit(3079),

    /**
     * {"code":3080,"msg":"关键字已存在"}
     */
    modifycouponerr(3080);

    private int errorValue;

    FailEnumType(int errorValue) {
        this.errorValue = errorValue;
    }

    public int getErrorValue() {
        return errorValue;
    }
}