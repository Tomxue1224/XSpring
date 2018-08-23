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
    <link rel="stylesheet" href="../../include/plugins/datepicker/datepicker3.css">
    <link rel="stylesheet" href="../../include/plugins/daterangepicker/daterangepicker-bs3.css">
    <link rel="stylesheet" href="../../include/css/loading.css">
    <link rel="stylesheet" href="../../include/css/order.css">
    <link rel="stylesheet" href="../../include/css/queryOrder.css">
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
                <li class="treeview active">
                    <a href="#"><i class="fa fa-files-o"></i> <span>订单管理</span> <i
                            class="fa fa-angle-left pull-right"></i></a>
                    <ul class="treeview-menu">
                        <li><a href="/BusinessMG/user/index"><i class="fa fa-circle-o"></i>今日订单</a></li>
                        <li class="active"><a href="/BusinessMG/menu/order/query"><i class="fa fa-circle-o"></i>查询订单</a>
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
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1><span>查询订单</span>
                <small>用户可以查看今天以前的所有订单，并且可指定查询某一发型师的历史订单。</small>
            </h1>
            <ol class="breadcrumb">
                <li><a href="/BusinessMG/user/index"><i class="fa fa-dashboard"></i>订单管理</a></li>
                <li class="active">查询订单</li>
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

            <div><label for="barber_input">发型师</label></div>
            <div class="barber-group">
                <input class="form-control" style="width:300px;display:inline-block" size="16" id="barber_input"
                       data-id="-1" type="text" value="" placeholder="填写发型师名字">
                <div class="previewResult">
                    <ul class="result-group">
                    </ul>
                </div>
                <button type="button" class="btn searchBut searchAll selectSearch" id="0">今日订单</button>
                <button type="button" class="btn searchBut searchBook " id="1">未完成</button>
                <button type="button" class="btn searchBut searchFinsh " id="2">已完成</button>
                <button type="button" class="btn searchBut searchCancle " id="3">已取消</button>
                <button type="submit" class="btn search">Search</button>
            </div>
            <div class="historyOrder">
                <div class="box">
                    <div class="box-header">
                        <h3 class="box-title">查询历史订单表</h3>&nbsp;&nbsp;&nbsp;每页显示<input type="text" value=10
                                                                                       id="pageMaxNumber" maxlength="2">条(大于4小于31)
                        <br/>
                        <h3 class="box-title order-count-fee" style="display:none"></h3>
                    </div><!-- /.box-header -->
                    <div class="box-body">
                        <div id="dataTables_wrapper"
                             class="dataTables_wrapper form-inline dt-bootstrap">
                            <div class="row">
                                <div class="col-sm-6"></div>
                                <div class="col-sm-6"></div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <table id="order_table"
                                           class="table table-bordered table-hover dataTable"
                                           role="grid" aria-describedby="order_table_info">
                                        <thead>
                                        <tr role="row">
                                            <th class="sorting_asc" tabindex="0"
                                                aria-controls="order_table" rowspan="1" colspan="1"
                                                aria-sort="ascending"
                                                aria-label="服务时间：激活排序列降">服务时间
                                            </th>
                                            <th class="sorting" tabindex="0" aria-controls="order_table"
                                                rowspan="1" colspan="1"
                                                aria-label="发型师：启动排序列提升">发型师
                                            </th>
                                            <th class="sorting" tabindex="0" aria-controls="order_table"
                                                rowspan="1" colspan="1"
                                                aria-label="发型师电话：启动对列的排序">发型师电话
                                            </th>
                                            <th class="sorting" tabindex="0" aria-controls="order_table"
                                                rowspan="1" colspan="1"
                                                aria-label="服务内容：激活排序列提升">服务内容
                                            </th>
                                            <th class="sorting" tabindex="0" aria-controls="order_table"
                                                rowspan="1" colspan="1"
                                                aria-label="消费者：激活排序列升序">消费者
                                            </th>
                                            <th class="sorting" tabindex="0" aria-controls="order_table"
                                                rowspan="1" colspan="1"
                                                aria-label="订单状态">订单状态
                                            </th>
                                            <th class="sorting" tabindex="0" aria-controls="order_table"
                                                rowspan="1" colspan="1"
                                                aria-label="订单状态"></th>
                                        </tr>
                                        </thead>
                                        <tbody class="order_table_list">
                                        <tr role="row" class="odd">
                                            <td class="sorting_1">暂无数据</td>
                                            <td>暂无数据</td>
                                            <td>暂无数据</td>
                                            <td>暂无数据</td>
                                            <td>暂无数据</td>
                                            <td>暂无数据</td>
                                        </tr>
                                        </tbody>
                                        <tfoot>
                                        <tr>
                                            <th rowspan="1" colspan="1">服务时间</th>
                                            <th rowspan="1" colspan="1">发型师</th>
                                            <th rowspan="1" colspan="1">发型师电话</th>
                                            <th rowspan="1" colspan="1">服务内容</th>
                                            <th rowspan="1" colspan="1">消费者</th>
                                            <th rowspan="1" colspan="1">订单状态</th>
                                            <th rowspan="1" colspan="1"></th>
                                        </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-4">
                                    <div class="dataTables_info" id="dataTables_info"></div>
                                </div>
                                <div class="col-sm-8">
                                    <div class="dataTables_paginate paging_simple_numbers"
                                         id="example2_paginate">
                                        <ul class="pagination">
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div><!-- /.box-body -->
                </div>
            </div>

            <div class="alertContent">
                <div class="myalert">
                    <p style="padding: 0 0 15px;color: rgb(216, 216, 216);">是否发送短信给消费者?</p>
                    <button value="yes">Yes</button>
                    <button value="no">No</button>
                </div>
            </div>

        </section><!-- /.content -->
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
        <section class="moreOderInfo">
            <div id="orderInfoContainer">
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
<!-- AdminLTE App -->
<script src="../../include/plugins/dist/js/app.min.js"></script>
<script src="../../include/plugins/daterangepicker/moment.min.js"></script>
<!-- order.js -->
<script src="../../include/plugins/datepicker/bootstrap-datepicker.js"></script>
<script src="../../include/plugins/datepicker/locales/bootstrap-datepicker.zh-CN.js"></script>
<script src="../../include/javascript/common.js"></script>
<script src="../../include/javascript/queryOrder.js"></script>
</body>
</html>
