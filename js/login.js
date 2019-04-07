$(document).ready(function () {
    login();

    $("#btnLogin").click(function () {
        var username = $("#username").val();
        var password = $("#password").val();


        if ($("input[type='checkbox']").eq(0).is(':checked')) {
            $.cookie('username', username, {expires: 7});
        } else {
            $.cookie('username', username);
        }

        window.location.href = "http://localhost:63340/fictionalfictionweb/index.html";
    });
});

var login = function () {
    $(".navbar-nav").append("<li><a href=\"http://localhost:63340/fictionalfictionweb/index.html\">首页</a></li>\n" +
        "                        <li><a href=\"#name\">你好，游客</a></li>\n" +
        "                        <li><a href=\"http://localhost:63340/fictionalfictionweb/bookshelf.html\">我的书架</a></li>\n" +
        "                        <li class=\"active\"><a href=\#login>登录</a></li>");

    $("#page").append("<form class=\"form-signin\">\n" +
        "                <h2 class=\"form-signin-heading\">Please sign in</h2>\n" +
        "                <p>\n" +
        "                    <label for=\"username\" class=\"sr-only\">Username</label>\n" +
        "                    <input type=\"text\" id=\"username\" name=\"username\" class=\"form-control\" placeholder=\"Username\"\n" +
        "                           required=\"\" autofocus=\"\">\n" +
        "                </p>\n" +
        "                <p>\n" +
        "                    <label for=\"password\" class=\"sr-only\">Password</label>\n" +
        "                    <input type=\"password\" id=\"password\" name=\"password\" class=\"form-control\" placeholder=\"Password\"\n" +
        "                           required=\"\">\n" +
        "                </p>\n" +
        "                <p><input type=\"checkbox\" name=\"remember-me\"> Remember me on this computer.</p>\n" +
        "                <button id=\"btnLogin\" class=\"btn btn-lg btn-primary btn-block\" type=\"button\">Sign in</button>\n" +
        "                <p style=\"padding-top: 12px;\"><a href='http://localhost:63340/fictionalfictionweb/forgetpassword.html'>忘记密码？</a><a href='http://localhost:63340/fictionalfictionweb/register.html' style=\"float: right;position: relative;\">点击注册&gt;&gt;</a></p>\n" +
        "            </form>");
};
