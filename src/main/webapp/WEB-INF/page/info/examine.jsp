<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>型云管理端</title>
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <link rel="stylesheet" href="/BusinessMG/include/plugins/bootstrap/css/bootstrap.min.css">
    <link href="/BusinessMG/include/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/BusinessMG/include/css/ionicons.min.css">
    <link rel="stylesheet" href="/BusinessMG/include/plugins/dist/css/AdminLTE.min.css">
    <link rel="stylesheet" href="/BusinessMG/include/plugins/dist/css/skins/skin-blue.min.css">
    <link rel="stylesheet" href="/BusinessMG/include/plugins/swiper/swiper.css">
    <link rel="stylesheet" href="/BusinessMG/include/css/examine.css">
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
                            <span class="hidden-xs  menu_shopname"></span>
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
                                    <a href="#" class="btn btn-default btn-flat">简介</a>
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
                <li class="active">
                    <a href="#" id="superManager-root"><i class="fa fa-circle-o"></i> <span>超级管理</span></a>
                    <ul class="treeview-menu superManager-treeview" style="display:none">
                        <li class="active"><a id="examine_service" href="#"><i class="fa fa-link"></i>服务项目</a>
                            <ul class="treeview-menu examine-treeview">
                                <li class="active"><a id="examine_deal" href="/BusinessMG/menu/examine#service"><i
                                        class="fa fa-link"></i>待审核</a></li>
                                <li><a id="examine_history" href="/BusinessMG/menu/examine#history"><i
                                        class="fa fa-link"></i>审核记录</a></li>
                            </ul>
                        </li>
                        <li><a id="adcolumn_set" href="/BusinessMG/menu/adcolumn"><i class="fa fa-link"></i>广告栏</a></li>
                    </ul>
                </li>
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
    <div class="content-wrapper">

        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1><span>服务审核</span>
                <small>查看相关发型师的服务审核情况</small>
            </h1>
            <ol class="breadcrumb">
                <li class="active"><a href="/BusinessMG/menu/examine"><i class="fa fa-dashboard"></i>服务审核</a></li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content">
            <div class="loginContent">
                <div class="loginForm">
                    <lable>用户名：</lable>
                    <input id="examine_user" type="text" maxlength="11" placeholder="请输入用户名"/>
                    <lable>密码</lable>
                    <input id="examine_password" type="password" placeholder="请输入密码"/>
                    <button id="examine_submitBut">登录</button>
                </div>
            </div>
            <div class="ServiceContent" data-pageNumber="1" data-pageSize="1" data-pageCount="1" data-recondCount="1">

            </div>
            <div class="examine_foot">
                <ul class="pagination examine_pageination">
                    <!--  <li><span >&laquo;</span></li>
                     <li><span>&raquo;</span></li> -->
                </ul>
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
        <strong>Copyright &copy;2015 <a href="http://51styling.com">深圳市韵升科技有限公司</a>.</strong> 保留所有权利。 粤ICP备15008114号-1
    </footer>
</div><!-- ./wrapper -->
<script src="../include/plugins/jQuery/jQuery-2.1.4.min.js"></script>
<script type="text/javascript">
    var user = '<%=session.getAttribute("managerid")%>';
    var mshopid = '<%=session.getAttribute("mshopid")%>';
    if (user == '1798226415da44be8050fb8f34a85050') {
        $(".superManager").hide();
    }
</script>
<!-- jQuery 2.1.4 -->
<script src="/BusinessMG/include/plugins/jQuery/jQuery-2.1.4.min.js"></script>
<!-- Bootstrap 3.3.5 -->
<script src="/BusinessMG/include/plugins/bootstrap/js/bootstrap.min.js"></script>
<!-- AdminLTE App -->
<script src="/BusinessMG/include/plugins/dist/js/app.min.js"></script>
<script src="/BusinessMG/include/plugins/daterangepicker/moment.min.js"></script>
<!-- order.js -->
<script src="/BusinessMG/include/plugins/datepicker/bootstrap-datepicker.js"></script>
<script src="/BusinessMG/include/plugins/datepicker/locales/bootstrap-datepicker.zh-CN.js"></script>
<script src="/BusinessMG/include/plugins/swiper/swiper.jquery.min.js"></script>
<script src="/BusinessMG/include/javascript/examine.js?v=123"></script>
<script src="/BusinessMG/include/javascript/common.js"></script>
</body>
</html>
