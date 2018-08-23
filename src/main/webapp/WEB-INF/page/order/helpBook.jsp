<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>型云管理端</title>
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <link rel="stylesheet" href="../include/plugins/bootstrap/css/bootstrap.min.css">
    <link href="../include/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../include/plugins/dist/css/AdminLTE.min.css">
    <link rel="stylesheet" href="../include/plugins/dist/css/skins/skin-blue.min.css">
    <link rel="stylesheet" href="../include/css/loading.css">
    <link rel="stylesheet" href="../include/css/helpBook.css">
    <link rel="stylesheet" href="../include/plugins/iCheck/flat/blue.css">
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
                            <li class="footer infofooter"><a href="/BusinessMG/menu/message">查看信息</a></li>
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
                <li class="active"><a href="/BusinessMG/menu/helpBook"><i class="fa fa-link"></i> <span>帮约</span></a>
                </li>
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
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1 style="display: inline-block; width: 200px;"><span>帮约</span>
                <small>管理员增加订单</small>
            </h1>
            <!-- 搜索框   start -->
            <input class="form-control" style="width:200px;display:inline-block;border-radius: 20px;" size="16"
                   id="barber_input" data-id="-1" type="text" value="" maxlength="11" placeholder="发型师名字">
            <span class=" glyphicon glyphicon-search" id="serachBarber"
                  style="margin-left: -30px;cursor: pointer;"></span>
            <div class="previewResult">
                <ul class="result-group">
                </ul>
            </div>
            <!-- 搜索框   end -->
            <ol class="breadcrumb">
                <li class="active"><a href="/BusinessMG/menu/helpBook"><i class="fa fa-dashboard"></i>帮约</a></li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="  barberSwiper ">
            <div class="barberList">

            </div>
        </section>
        <section class=" bookInfoSwiper">
            <div class="goBack" style=" padding: 0px 0px 15px 0px;"><span id="goBack">返回</span></div>

            <div class="formContent">
                <label>联系方式</label>
                <input type="text" class="form-control customTelPhone" maxlength="11" placeholder="客户手机号码"><br>
                <!-- <input type="radio"  name="bookstyle"  id="offline" value="1"><span class="bookstyle">到店支付</span>-->
                <div class="userInfoContent" tabindex=-1>
                    <ul class="userInfoUl">

                    </ul>
                </div>
                <div class="userService_Container">
                    <ul class="userService_list">

                    </ul>
                </div>
            </div>
            <div class="formContent">
                <label>客户名称</label>
                <input type="text" class="form-control customName" maxlength="10" placeholder="帮约的客户名称"><br>
                <!-- <input type="radio" name="bookstyle"  id="online" value="4"><span class="bookstyle">团购支付</span> -->
            </div>
            <div class="formContent submitBtn">
                <button class="form-control" id="submitBook">帮约</button>
                <br>
            </div>
            <p class="selected_barber"></p>
            <!-- serviceContent begin -->
            <div class="serviceContainer">

                <!-- servicePage Begin -->
                <div id="servicePage">
                    <div class="serviceContent">
                        <div class="serviceTitle" style="height:60px">
                            <div class="serviceStyle">
                                <div class="styleItem">
                                    <span class="styleItemActive" data-style="1">短发</span>
                                    <span data-style="2">中发</span>
                                    <span data-style="3">长发</span>
                                </div>
                                <div class="deliever_line" style="margin-bottom:0px!important"></div>
                                <div class="shadow">
                                    <div class="selectServiceStyle"></div>
                                </div>
                            </div>
                            <span class="readyTitle" style=" display: inline-block;">服务项目</span>
                            <span class="tip serviceTip" data="false">
												<span class="selectServiceName" name="" serviceid=""></span>
												<span class="serviceTime_fee" waitTime="" time="" fee=""></span>
											</span>
                            <div class="deliever_line"
                                 style="margin: 0px 0px!important;height: 1px;position: relative;top: -5px;"></div>
                        </div>

                        <div class="services">

                        </div>
                    </div>
                </div>
                <!-- servicePage end -->
            </div>

            <!-- timeContainer begin -->
            <div class="timeContainer">
                <div id="timePage">
                    <div class="timeContent">
                        <div class="timeTitle">
                            <span class="readyTitle" style="font-size:15px">时间选择></span>
                            <span class="tip book_tip timeTip" data="false">请选择预约时间</span>
                        </div>
                        <div style="display: block;">
                            <table class="timeTable">
                                <thead>
                                <tr style="height: 28px">
                                    <th class="prev text-center" style="visibility: visible;">
                                        <span class="glyphicon glyphicon-arrow-left"></span>
                                    </th>
                                    <th class="firstDayswitch selected" year='' month='' day=''><span></span></th>
                                    <th class="secondDay " year='' month='' day=''><span></span></th>
                                    <th class="thrithDay" year='' month='' day=''><span></span></th>
                                    <th class="next  text-center" style="visibility: visible;">
                                        <span class="glyphicon glyphicon-arrow-right"></span>
                                    </th>
                                    <th class="calendar text-center">
															 <span class="date form_date" id="datetimepicker"
                                                                   data-date=""
                                                                   data-date-format="dd MM yyyy"
                                                                   data-link-field="dtp_input2"
                                                                   data-link-format="yyyy-mm-dd">
													     	</span>

                                        <span class="glyphicon glyphicon-calendar"></span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td class="19" colspan="2">09:00</td>
                                    <td class="20" colspan="2">09:30</td>
                                    <td class="21" colspan="2">10:00</td>
                                </tr>
                                <tr>
                                    <td class="22" colspan="2">10:30</td>
                                    <td class="23" colspan="2">11:00</td>
                                    <td class="24" colspan="2">11:30</td>
                                </tr>
                                <tr>
                                    <td class="25" colspan="2">12:00</td>
                                    <td class="26" colspan="2">12:30</td>
                                    <td class="27" colspan="2">13:00</td>
                                </tr>
                                <tr>
                                    <td class="28" colspan="2">13:30</td>
                                    <td class="29" colspan="2">14:00</td>
                                    <td class="30" colspan="2">14:30</td>
                                </tr>
                                <tr>
                                    <td class="31" colspan="2">15:00</td>
                                    <td class="32" colspan="2">15:30</td>
                                    <td class="33" colspan="2">16:00</td>
                                </tr>
                                <tr>
                                    <td class="34" colspan="2">16:30</td>
                                    <td class="35" colspan="2">17:00</td>
                                    <td class="36" colspan="2">17:30</td>
                                </tr>
                                <tr>
                                    <td class="37" colspan="2">18:00</td>
                                    <td class="38" colspan="2">18:30</td>
                                    <td class="39" colspan="2">19:00</td>
                                </tr>
                                <tr>
                                    <td class="40" colspan="2">19:30</td>
                                    <td class="41" colspan="2">20:00</td>
                                    <td class="42" colspan="2">20:30</td>
                                </tr>
                                <tr>
                                    <td class="43" colspan="2">21:00</td>
                                    <td class="44" colspan="2">21:30</td>
                                    <td class="45" colspan="2">22:00</td>
                                </tr>
                                <tr>
                                    <td class="46" colspan="2">22:30</td>
                                    <td class="47" colspan="2">23:00</td>
                                    <td class="48" colspan="2">23:30</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <!-- timeContainer end -->
        </section>

        <section class="helpLoading">
            <div class="loadingTip"><span>正在预约中...</span></div>
            <div class="spinner">
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
<script src="/BusinessMG/include/plugins/daterangepicker/moment.min.js"></script>
<!-- order.js -->
<script src="/BusinessMG/include/plugins/datepicker/bootstrap-datepicker.js"></script>
<script src="/BusinessMG/include/plugins/datepicker/locales/bootstrap-datepicker.zh-CN.js"></script>
<script src="/BusinessMG/include/javascript/helpBook.js?v=123"></script>
<script src="/BusinessMG/include/javascript/common.js"></script>
</body>
</html>
