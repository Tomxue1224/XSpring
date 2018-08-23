<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>型云管理端</title>
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <link rel="stylesheet" href="../../include/plugins/bootstrap/css/bootstrap.min.css">
    <link href="../../include/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../../include/plugins/dist/css/AdminLTE.min.css">
    <link rel="stylesheet" href="../../include/plugins/dist/css/skins/skin-blue.min.css">
    <link rel="stylesheet" href="../../include/css/order.css">
    <link rel="stylesheet" href="../../include/css/loading.css">
    <link rel="stylesheet" href="../../include/css/common.css">
</head>
<body class="hold-transition skin-blue sidebar-mini">
<audio id="tipAudio" controls style="position:absolute;top:0;left:0;z-index:-1">
    <source src="../../include/image/tipAudio.ogg" type="audio/ogg">
    <source src="../../include/image/tipAudio.mp3" type="audio/mpeg">
</audio>
<div class="wrapper">

    <!-- Main Header -->
    <header class="main-header">

        <!-- Logo -->
        <a href="user/index" class="logo">
            <!-- mini logo for sidebar mini 50x50 pixels -->
            <span class="logo-mini"><b>型云</b></span>
            <!-- logo for regular state and mobile devices -->
            <span class="logo-lg"><b>型云管理端</b></span>
        </a>

        <!-- Header Navbar -->
        <nav class="navbar navbar-static-top" role="navigation">
            <!-- Sidebar toggle button-->
            <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
                <span class="sr-only">切换导航</span>
            </a>
            <!-- Navbar Right Menu -->
            <div class="navbar-custom-menu">
                <ul class="nav navbar-nav">
                    <!-- Messages: style can be found in dropdown.less-->
                    <li class="dropdown messages-menu">
                        <!-- Menu toggle button -->
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <i class="fa fa-envelope-o"></i>
                            <span class="label label-success infoCount"></span>
                        </a>
                        <ul class="dropdown-menu">
                            <li class="header infohead"></li>
                            <li>
                                <!-- inner menu: contains the messages -->
                                <ul class="menu">
                                </ul><!-- /.menu -->
                            </li>
                            <li class="footer infofooter"><a href="/menu/message">查看信息</a></li>
                        </ul>
                    </li><!-- /.messages-menu -->

                    <!-- Notifications Menu -->
                    <li class="dropdown notifications-menu">
                        <!-- Menu toggle button -->
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <i class="fa fa-bell-o"></i>
                            <span class="label label-warning"></span>
                        </a>
                    </li>
                    <!-- Tasks Menu -->
                    <li class="dropdown tasks-menu">
                        <!-- Menu Toggle Button -->
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <i class="fa fa-flag-o"></i>
                            <span class="label label-danger"></span>
                        </a>
                    </li>
                    <!-- User Account Menu -->
                    <li class="dropdown user user-menu">
                        <!-- Menu Toggle Button -->
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <!-- The user image in the navbar-->
                            <img src="../../include/plugins/dist/img/user2-160x160.jpg" class="user-image"
                                 alt="User Image">
                            <!-- hidden-xs hides the username on small devices so only the image appears. -->
                            <span class="hidden-xs menu_shopname"></span>
                        </a>
                        <ul class="dropdown-menu">
                            <!-- The user image in the menu -->
                            <li class="user-header">
                                <img src="../../include/plugins/dist/img/user2-160x160.jpg" class="img-circle"
                                     alt="User Image">
                                <p>
                                    管理员
                                    <small class="menu_shopname_create"></small>
                                </p>
                            </li>
                            <!-- Menu Footer-->
                            <li class="user-footer">
                                <div class="pull-left">
                                    <a href="/BusinessMG/menu/shop" class="btn btn-default btn-flat">简介</a>
                                </div>
                                <div class="pull-right">
                                    <a href="/BusinessMG/user/logout" class="btn btn-default btn-flat">注销</a>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
    <!-- Left side column. contains the logo and sidebar -->
    <aside class="main-sidebar">

        <!-- sidebar: style can be found in sidebar.less -->
        <section class="sidebar">

            <!-- Sidebar user panel (optional) -->
            <div class="user-panel">
                <div class="pull-left image">
                    <img src="../../include/plugins/dist/img/user2-160x160.jpg" class="img-circle" alt="User Image">
                </div>
                <div class="pull-left info">
                    <p class="menu_shopname"></p>
                    <!-- Status -->
                    <a href="#"><i class="fa fa-circle text-success"></i> 在线</a>
                </div>
            </div>

            <!-- search form (Optional) -->
            <form action="#" method="get" class="sidebar-form">
                <div class="input-group">
                    <input type="text" name="q" class="form-control" placeholder="Search...">
                    <span class="input-group-btn">
                <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i
                        class="fa fa-search"></i></button>
              </span>
                </div>
            </form>
            <!-- /.search form -->

            <!-- Sidebar Menu -->
            <ul class="sidebar-menu">
                <li class="header">菜单</li>
                <!-- Optionally, you can add icons to the links -->
                <li class="treeview active">
                    <a href="#"><i class="fa fa-circle-o"></i> <span>订单管理</span> <i
                            class="fa fa-angle-left pull-right"></i></a>
                    <ul class="treeview-menu">
                        <li class="active"><a href="/BusinessMG/user/index"><i class="fa fa-circle-o"></i>今日订单</a></li>
                        <li class="queryOrder"><a href="/BusinessMG/menu/order/query"><i class="fa fa-circle-o"></i>查询订单</a>
                        </li>
                    </ul>
                </li>
                <li><a href="/BusinessMG/menu/message"><i class="fa fa-envelope-o"></i> <span>信息管理</span></a></li>
                <li><a href="/BusinessMG/menu/helpBook"><i class="fa fa-link"></i> <span>帮约</span></a></li>
                <li class="superManager"><a href="/BusinessMG/menu/examine"><i class="fa fa-circle-o"></i>
                    <span>超级管理</span></a></li>
                <li><a href="/BusinessMG/menu/shop"><i class="fa fa-files-o"></i> <span>商户信息</span></a></li>
                <li class="treeview ">
                    <a href="#"><i class="fa fa-bar-chart-o">
                    </i> <span>数据分析</span> <i class="fa fa-angle-left pull-right"></i>
                    </a>
                    <ul class="treeview-menu orderData-treeview">
                        <li class="yearData"><a href="/BusinessMG/menu/order/analysis?year"><i
                                class="fa fa fa-line-chart"></i>年度订单</a></li>
                        <li class="monthData"><a href="/BusinessMG/menu/order/analysis?month"><i
                                class="fa fa  fa-pie-chart"></i>订单统计</a></li>
                    </ul>
                </li>
            </ul><!-- /.sidebar-menu -->
        </section>
        <!-- /.sidebar -->
    </aside>

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper" style="position:relative">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1><span>今日订单</span>
                <small>查看今天的订单，根据订单预约时间，做好与顾客，与发型师的沟通工作。</small>
            </h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i>订单管理</a></li>
                <li class="active"> 今日订单</li>
            </ol>
            <div class="tip">
                <span class="redTip red"></span><span>未完成</span><span class="redNum">{redNum} 单</span>
                <span class="blueTip blue"></span><span>已完成</span><span class="blueNum">{blueNum} 单</span>
                <span class="gayTip gay"></span><span>无效</span><span class="gayNum">{gayNum} 单</span>
            </div>
        </section>

        <!-- Main content -->
        <section class="content">
            <div class="bookContent">
            </div>
            <hr>
            <div class="finshContent">
            </div>
            <hr>
            <div class="cancleContent">
            </div>
            <div class="alertContent">
                <div class="myalert">
                    <p style="padding: 0 0 15px;color: rgb(216, 216, 216);">是否发送短信给消费者?</p>
                    <button value="yes">Yes</button>
                    <button value="no">No</button>
                </div>
            </div>
        </section><!-- /.content -->

        <!-- 数据加载状态 -->
        <section class="spinner">
            <div class="spinner-container container1">
                <div class="circle1"></div>
                <div class="circle2"></div>
                <div class="circle3"></div>
                <div class="circle4"></div>
            </div>
            <div class="spinner-container container2">
                <div class="circle1"></div>
                <div class="circle2"></div>
                <div class="circle3"></div>
                <div class="circle4"></div>
            </div>
            <div class="spinner-container container3">
                <div class="circle1"></div>
                <div class="circle2"></div>
                <div class="circle3"></div>
                <div class="circle4"></div>
            </div>
        </section>
        <!-- 收银台页面 -->
        <section class="CashierContent">
            <div class="Cashier-title">
                <span class="backOrderList">&lt;订单列表 </span>
                <img alt="型云美业" src="../../include/image/xinyun.png" style="width:auto;height:100%">
                <span>收银台</span>
            </div>
            <div class="Cashier-order-info">
                <div class="left-order">
                    <p>请及时收款. 发型师：<span id="carshier-barber-name"></span></p>
                    <p>
                        顾客：<span id="cashier-customer-name"></span> &nbsp;联系方式：<span id="cashier-customer-phone"></span>
                    </p>
                </div>
                <div class="right-order">
                    <p>应付金额<span id="cashier-fee"></span>元</p>
                    <p class="order-moreInfo">查看详情<span class="down-tip"></span></p>
                    <img alt="型云美业" src="../../include/image/xinyunbeauty.jpg">
                </div>
            </div>
            <div class="cut-off-rule"></div>
            <div class="Cashier-order-moreInfo">
                服务内容：<span id="cashier-serivce-content"></span><br/>
                耗时：<span id="cashier-service-time"></span>&nbsp;&nbsp;
                座位号：<span id="cashier-service-seat"></span>
            </div>
            <div class="Carshier-order-payMent">
                <div class="order-payMent-title">
                    <p><span style="font-size: 2em;">微信支付</span></p>
                    <div class="left-order-payment">
                        <div class="payQrcodeContainer"><img id="payQrcode" src="../../include/image/xinyunbeauty.jpg">
                        </div>
                        <div class="left-foot-order-payment">
                            <img src="../../include/image/icon-red.png">
                            <p><span>请使用微信扫一扫</span><br><span>扫描二维码支付</span></p>
                        </div>
                    </div>
                    <div class="right-order-payment">
                        <img src="../../include/image/phone-bg.png">
                    </div>
                </div>
            </div>
        </section>

    </div><!-- /.content-wrapper -->

    <!-- Main Footer -->
    <footer class="main-footer">
        <!-- To the right -->
        <div class="pull-right hidden-xs">
            Anything you want
        </div>
        <!-- Default to the left -->
        <strong>Copyright &copy;2015 <a href="http://51styling.com">深圳市韵升科技有限公司</a>.</strong> 保留权利。 粤ICP备15008114号-1
    </footer>
</div>
<!-- ./wrapper -->
<!-- jQuery 2.1.4 -->
<script src="../../include/plugins/jQuery/jQuery-2.1.4.min.js"></script>
<script type="text/javascript">
    var user = '<%=session.getAttribute("managerid")%>';
    var mshopid = '<%=session.getAttribute("mshopid")%>';
    if (user == '1798226415da44be8050fb8f34a85050') {
        $(".superManager").hide();
    }
</script>
<!-- Bootstrap 3.3.5 -->
<script src="../../include/plugins/bootstrap/js/bootstrap.min.js"></script>
<!--     AdminLTE App -->
<script src="../../include/plugins/dist/js/app.min.js"></script>
<!-- order.js -->
<script src="../../include/javascript/orderN.js"></script>
<script type="text/javascript" src="../../include/javascript/common.js"></script>
</body>
</html>
