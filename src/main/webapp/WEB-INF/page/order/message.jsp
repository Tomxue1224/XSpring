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
    <link rel="stylesheet" href="../include/plugins/iCheck/flat/blue.css">
    <link rel="stylesheet" href="/BusinessMG/include/css/common.css">
    <style>
        body {
            font: 12px/150% Arial, Verdana, "\5b8b\4f53"
        }

        .mailbox-subject {
            white-space: nowrap;
            word-wrap: normal;
            word-break: break-word;
            max-width: 501px;
            text-overflow: ellipsis;
            overflow: hidden;
            display: inline-block;
        }

        .moreMsgInfo {
            position: fixed;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.49);
            z-index: 100;
            display: block;
        }

        #MsgInfoContainer {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 200px;
            height: 300px;
            z-index: 100;
            margin: -150px -230px;
        }
    </style>
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
                            <li class="footer infofooter"><a href="#">查看所有信息</a></li>
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
                    <a href="#"><i class="fa fa-files-o"></i> <span>订单管理</span> <i
                            class="fa fa-angle-left pull-right"></i></a>
                    <ul class="treeview-menu">
                        <li><a href="/BusinessMG/user/index"><i class="fa fa-circle-o"></i>今日订单</a></li>
                        <li><a href="/BusinessMG/menu/order/query"><i class="fa fa-circle-o"></i>查询订单</a></li>
                    </ul>
                </li>
                <li class="active"><a href="/BusinessMG/menu/message"><i class="fa fa-envelope-o"></i> <span>信息管理</span></a>
                </li>
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
            <h1><span>信息管理</span>
                <small>查看系统推送的信息。</small>
            </h1>
            <ol class="breadcrumb">
                <li class="active"><a href="/BusinessMG/menu/message"><i class="fa fa-dashboard"></i>信息管理</a></li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content" style="min-height:min-height: 400px;">
            <div class="row">
                <div class="col-md-3">
                    <div class="box box-solid">
                        <div class="box-header with-border">
                            <h3 class="box-title">信息箱</h3>
                            <div class="box-tools">
                                <button class="btn btn-box-tool" data-widget="collapse">
                                    <i class="fa fa-minus"></i>
                                </button>
                            </div>
                        </div>
                        <div class="box-body no-padding">
                            <ul class="nav nav-pills nav-stacked">
                                <li id="allMsg"><a href="#"><i class="fa fa-inbox"></i>
                                    收件箱 </a></li>
                                <li id="readMsg"><a href="#"><i class="fa fa-file-text-o"></i> 已读信息</a></li>
                                <li id="unreadMsg"><a href="#"><i class="fa fa-envelope-o"></i>
                                    未读信息<span class="label label-success pull-right infoCount">0</span></a></li>
                                <li id="transhMsg"><a href="#"><i class="fa fa-trash-o"></i> 垃圾箱</a></li>
                            </ul>
                        </div>
                        <!-- /.box-body -->
                    </div>
                    <!-- /. box -->
                </div>
                <!-- /.col -->
                <div class="col-md-9">
                    <div class="box box-primary">
                        <div class="box-header with-border">
                            <h3 class="box-title">收件箱</h3>
                            <div class="box-tools pull-right">
                                <div class="has-feedback">
                                    <input type="text" class="form-control input-sm"
                                           placeholder="Search Message"> <span
                                        class="glyphicon glyphicon-search form-control-feedback"></span>
                                </div>
                            </div>
                            <!-- /.box-tools -->
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body no-padding">
                            <div class="mailbox-controls">
                                <!-- Check all button -->
                                <button class="btn btn-default btn-sm checkbox-toggle check-all">
                                    <i class="fa fa-square-o check-all-icon"></i>
                                </button>
                                <div class="btn-group">
                                    <button class="btn btn-default btn-sm goTransh">
                                        <i class="fa fa-trash-o"></i>
                                    </button>
                                    <button class="btn btn-default btn-sm moveLeft">
                                        <i class="fa fa-reply left"></i>
                                    </button>
                                    <button class="btn btn-default btn-sm moveRight">
                                        <i class="fa fa-share "></i>
                                    </button>
                                </div>
                                <!-- /.btn-group -->
                                <button class="btn btn-default btn-sm bt-refresh">
                                    <i class="fa fa-refresh"></i>
                                </button>
                                <div class="pull-right">
                                    <div class="btn-group">
                                        <button class="btn btn-default btn-sm">
                                            <i class="fa fa-chevron-left"></i>
                                        </button>
                                        <button class="btn btn-default btn-sm">
                                            <i class="fa fa-chevron-right"></i>
                                        </button>
                                    </div>
                                    <!-- /.btn-group -->
                                </div>
                                <!-- /.pull-right -->
                            </div>
                            <div class="table-responsive mailbox-messages" style="overflow-x: scroll;overflow-y:hidden">
                                <table class="table table-hover table-striped MsgList">
                                    <tbody>
                                    </tbody>
                                </table>
                                <!-- /.table -->
                            </div>
                            <!-- /.mail-box-messages -->
                        </div>
                        <!-- /.box-body -->
                        <div class="box-footer no-padding">
                            <div class="mailbox-controls">
                                <!-- Check all button -->
                                <button class="btn btn-default btn-sm checkbox-toggle check-all">
                                    <i class="fa fa-square-o check-all-icon"></i>
                                </button>
                                <div class="btn-group">
                                    <button class="btn btn-default btn-sm goTransh">
                                        <i class="fa fa-trash-o"></i>
                                    </button>
                                    <button class="btn btn-default btn-sm moveLeft">
                                        <i class="fa fa-reply"></i>
                                    </button>
                                    <button class="btn btn-default btn-sm moveRight">
                                        <i class="fa fa-share"></i>
                                    </button>
                                </div>
                                <!-- /.btn-group -->
                                <button class="btn btn-default btn-sm bt-refresh">
                                    <i class="fa fa-refresh"></i>
                                </button>
                                <div class="pull-right">
                                    <span class="mailBox-number">1/10</span>
                                    <div class="btn-group">
                                        <button class="btn btn-default btn-sm">
                                            <i class="fa fa-chevron-left"></i>
                                        </button>
                                        <button class="btn btn-default btn-sm">
                                            <i class="fa fa-chevron-right"></i>
                                        </button>
                                    </div>
                                    <!-- /.btn-group -->
                                </div>
                                <!-- /.pull-right -->
                            </div>
                        </div>
                    </div>
                    <!-- /. box -->
                </div>
                <!-- /.col -->
            </div>
            <!-- /.row -->
        </section>
        <!-- 模态框（Modal） -->
        <div class="modal fade" id="myModal" data-msgid="0" tabindex="-1" role="dialog"
             aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close"
                                data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" id="myModalLabel">
                            <span id="title"> </span>&nbsp;&nbsp;&nbsp;时间:<span id="date"> </span>
                        </h4>

                    </div>
                    <div class="modal-body">
                        在这里添加一些文本
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default"
                                data-dismiss="modal">关闭
                        </button>
                        <button type="button" class="btn btn-danger deleteMsg">
                            删除
                        </button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->

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
<script src="/BusinessMG/include/plugins/daterangepicker/moment.min.js"></script>
<!-- order.js -->
<script src="/BusinessMG/include/plugins/datepicker/bootstrap-datepicker.js"></script>
<script src="/BusinessMG/include/plugins/datepicker/locales/bootstrap-datepicker.zh-CN.js"></script>
<script src="/BusinessMG/include/javascript/common.js"></script>
<script src="/BusinessMG/include/javascript/inbox.js"></script>
</body>
</html>
