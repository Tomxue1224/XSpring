<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>订单数据统计</title>
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <link rel="stylesheet" href="/BusinessMG/include/plugins/bootstrap/css/bootstrap.min.css">
    <link href="/BusinessMG/include/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/BusinessMG/include/plugins/dist/css/AdminLTE.min.css">
    <link rel="stylesheet" href="/BusinessMG/include/plugins/dist/css/skins/skin-blue.min.css">
    <link type="text/css" rel="stylesheet" href="/BusinessMG/include/css/orderData.css">
    <link rel="stylesheet" href="../../include/plugins/datepicker/datepicker3.css">
    <link rel="stylesheet" href="../../include/plugins/daterangepicker/daterangepicker-bs3.css">
    <link rel="stylesheet" href="/BusinessMG/include/css/common.css">
</head>
<body class="hold-transition skin-blue sidebar-mini">
<div class="wrapper">

    <!-- Main Header -->
    <header class="main-header">

        <!-- Logo -->
        <a href="/BusinessMG/user/index" class="logo">
            <!-- mini logo for sidebar mini 50x50 pixels -->
            <span class="logo-mini"><b>型云</b></span>
            <!-- logo for regular state and mobile devices -->
            <span class="logo-lg"><b>型云管理端</b></span>
        </a>

        <!-- Header Navbar -->
        <nav class="navbar navbar-static-top" role="navigation">
            <!-- Sidebar toggle button-->
            <a href="#" class="sidebar-toggle changeNav" data-toggle="offcanvas" role="button">
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
                            <li class="footer infofooter"><a href="/BusinessMG/menu/message">查看所有信息</a></li>
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
                            <img src="/BusinessMG/include/plugins/dist/img/user2-160x160.jpg" class="user-image"
                                 alt="User Image">
                            <!-- hidden-xs hides the username on small devices so only the image appears. -->
                            <span class="hidden-xs menu_shopname"></span>
                        </a>
                        <ul class="dropdown-menu">
                            <!-- The user image in the menu -->
                            <li class="user-header">
                                <img src="/BusinessMG/include/plugins/dist/img/user2-160x160.jpg" class="img-circle"
                                     alt="User Image">
                                <p>
                                    管理员
                                    <small class="menu_shopname_create">入职时间：2015年9月20号</small>
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
                    <img src="/BusinessMG/include/plugins/dist/img/user2-160x160.jpg" class="img-circle"
                         alt="User Image">
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
                <li class="treeview ">
                    <a href="#"><i class="fa fa-circle-o"></i> <span>订单管理</span> <i
                            class="fa fa-angle-left pull-right"></i></a>
                    <ul class="treeview-menu">
                        <li><a href="/BusinessMG/user/index"><i class="fa fa-circle-o"></i>今日订单</a></li>
                        <li><a href="/BusinessMG/menu/order/query"><i class="fa fa-circle-o"></i>查询订单</a></li>
                    </ul>
                </li>
                <li><a href="/BusinessMG/menu/message"><i class="fa fa-envelope-o"></i> <span>信息管理</span></a></li>
                <li><a href="/BusinessMG/menu/helpBook"><i class="fa fa-link"></i> <span>帮约</span></a></li>
                <li class="superManager"><a href="/BusinessMG/menu/examine"><i class="fa fa-circle-o"></i>
                    <span>超级管理</span></a></li>
                <li><a href="/BusinessMG/menu/shop"><i class="fa fa-files-o"></i> <span>商户信息</span></a></li>
                <li class="treeview active">
                    <a href="#"><i class="fa fa-bar-chart-o">
                    </i> <span>数据分析</span> <i class="fa fa-angle-left pull-right"></i>
                    </a>
                    <ul class="treeview-menu orderData-treeview">
                        <li class="active yearData"><a href="/BusinessMG/menu/order/analysis?year"><i
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
    <div class="content-wrapper" style="position: relative">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1><span>数据分析</span>
                <small>对商家的订单，用户等信息进行分析</small>
            </h1>
            <ol class="breadcrumb">
                <li class="active"><a href="/BusinessMG/menu/order/analysis"><i class="fa fa-dashboard"></i>数据分析</a>
                </li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content">
            <div class="form-group">
                <label for="startTime_input">开始时间</label>
                <div class="input-group ">
                    <input class="form-control" size="16" id="startTime_input" type="text" value="" placeholder="开始时间"
                           readonly>
                </div>
            </div>

            <div class="form-group">
                <label for="endTime_input">结束时间</label>
                <div class="input-group ">
                    <input class="form-control" size="16" id="endTime_input" type="text" value="" placeholder="结束时间"
                           readonly>
                </div>
            </div>

            <div class="form-group">
                <label style="opacity:0">查询</label>
                <div class="input-group ">
                    <button class="btn serach"> 查询</button>
                </div>
            </div>

            <div id="yearChartContent">
                <select id="year"></select>
                <div id="container"></div>
                <div id="container2"></div>
                <div id="container3"></div>
            </div>
            <div id="monthChartContent">
                <div id="container4" style="width: 550px; height: 400px; margin: 0 auto"></div>
                <div class="monthBarberMoney"></div>
            </div>
        </section>

        <div class="BarberMoneyDetails">
            <div class="DetailsContainer">
                <table border="1"
                       style="text-align: center; margin: auto;    position: absolute;left: 50%;margin-left: -500px;">
                    <caption style="padding: 5px;"><span id="detail-title"></span>
                        <p id="allData" style="margin: 5px;"></p>
                    </caption>
                    <thead>
                    <tr>
                        <th>序号</th>
                        <th>订单号</th>
                        <th>服务时间</th>
                        <th>服务内容</th>
                        <th>服务耗时</th>
                        <th>服务价格</th>
                        <th>客户名称</th>
                        <th>客户电话</th>
                        <th>账单状态</th>
                        <th>支付方式</th>
                        <th>团券号</th>
                    </tr>
                    </thead>
                    <tbody class="Detail-Tbody" style="font-size: 0.8em;">

                    </tbody>
                </table>
            </div>
            <div class="MoneyDetails_foot">
                <button type="button" id="download" class="btn btn-success">下载报表</button>
                <button type="button" class="DetailsClose btn btn-danger">关闭</button>
            </div>
        </div>
    </div><!-- /.content-wrapper -->

    <!-- Main Footer -->
    <footer class="main-footer">
        <!-- To the right -->
        <div class="pull-right hidden-xs">
            Anything you want
        </div>
        <!-- Default to the left -->
        <strong>Copyright &copy;2015 <a href="http://51styling.com">深圳市韵升科技有限公司</a>.</strong> 保留所有权利。 粤ICP备15008114号-1
    </footer>

</div><!-- ./wrapper -->
<!-- jQuery 2.1.4 -->
<script src="/BusinessMG/include/plugins/jQuery/jQuery-2.1.4.min.js"></script>
<script type="text/javascript">
    var user = '<%=session.getAttribute("managerid")%>';
    var mshopid = '<%=session.getAttribute("mshopid")%>';
    if (user == '1798226415da44be8050fb8f34a85050') {
        $(".superManager").hide();
    }
</script>
<!-- Bootstrap 3.3.5 -->
<script src="/BusinessMG/include/plugins/bootstrap/js/bootstrap.min.js"></script>
<!-- AdminLTE App -->
<script src="/BusinessMG/include/plugins/dist/js/app.min.js"></script>
<script type="text/javascript" src="/BusinessMG/include/plugins/highChart/highcharts.js"></script>
<script type="text/javascript" src="/BusinessMG/include/javascript/orderData.js"></script>
<script type="text/javascript" src="/BusinessMG/include/plugins/slimScroll/jquery.slimscroll.min.js"></script>
<script src="../../include/plugins/datepicker/bootstrap-datepicker.js"></script>
<script src="../../include/plugins/datepicker/locales/bootstrap-datepicker.zh-CN.js"></script>
<script src="/BusinessMG/include/javascript/common.js"></script>
</body>
</html>