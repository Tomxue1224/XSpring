<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Cache-Control" content="no-cache, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache"/>
    <meta http-equiv="Expires" content="0"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <title>型云管理端</title>
    <link rel="stylesheet" href="include/plugins/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="include/css/font-awesome.min.css">
    <link rel="stylesheet" href="include/css/login.css">
    <script src="include/plugins/jQuery/jQuery-2.1.4.min.js" type="text/javascript"></script>
    <script src="include/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
</head>
<body style="overflow:hidden">
<div class="pagebg">
    <div class="shadow"></div>
</div>
<div class="pageContent">
    <div class="loginDiv">
        <div class="loginTitle" style="text-align:center"><span>Login</span></div>
        <div class="formDiv">
            <div class="input-group">
                <span class="input-group-addon"><span class="icon-user"></span></span>
                <input type="text" value="xinyun" class="form-control" id="username" placeholder="username"
                       required="required">
            </div>

            <div class="input-group">
                <span class="input-group-addon"><span class="icon-key"></span></span>
                <input type="password" class="form-control" id="password" placeholder="password">
            </div>
            <div id="myAlert" class="alert alert-warning">
                <a href="#" class="close" id="closeAlert" aria-hidden="true">&times;</a> <strong
                    id="alertTitle"></strong><span id="alertContent"></span>
            </div>
            <div class="butDiv">
                <button type="button" class="btn login">Login</button>
            </div>
        </div>
    </div>
</div>

<!-- 模态框（Modal） -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close"
                        data-dismiss="modal" aria-hidden="true">
                    &times;
                </button>
                <h4 class="modal-title" id="myModalLabel">
                    ip地址发生变化，请输入验证码
                </h4>
            </div>
            <div class="modal-body">
                <div class="text-center">
                    <div class="inputCaptDiv">
                        <input type="text" class="form-control input-lg" maxlength="4" required="required"
                               placeholder="验证码">
                    </div>
                    <div class="captchaDiv">
                        <img id="captcha_img" src="../captcha/next" alt="验证码"
                             onclick="$('#captcha_img').attr('src', '../captcha/next?_=' + new Date().getTime())">
                    </div>
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default"
                        data-dismiss="modal">关闭
                </button>
                <button type="button" class="btn btn-primary captchaLogin">
                    登录
                </button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div><!-- /.modalend -->

</body>
<script src="include/javascript/login.js"></script>
</html>