$(document).ready(function () {
    register();

    $("#btnRegister").click(function () {
        var username = $("#username").val();
        var password = $("#password").val();
        var email = $("#email").val();

        $.ajax({
            type: "POST",
            url: "http://localhost:8080/fictionalfiction/register",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify({
                username: username,
                password: password,
                email: email
            }),
            success: function (data) {
                if (data.info == "success") {
                    alert("注册成功！！！");
                    window.location.href = "http://localhost:63340/fictionalfictionweb/login.html";
                } else {
                    alert("注册失败！该用户已存在！")
                }
            },
            error: function (data) {
                alert("注册失败！！！")
            }
        });
    });
});

var register = function () {
    $(".navbar-nav").append("<li><a href=\"http://localhost:63340/fictionalfictionweb/index.html\">首页</a></li>\n" +
        "                        <li><a href=\"#name\">你好，游客</a></li>\n" +
        "                        <li><a href=\"http://localhost:63340/fictionalfictionweb/bookshelf.html\">我的书架</a></li>\n" +
        "                        <li class=\"active\"><a href=\"#register\">注册</a></li>");

    $("#page").append("<form class=\"form-signin\">\n" +
        "                <h2 class=\"form-signin-heading\">Please Register</h2>\n" +
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
        "                <p>\n" +
        "                    <label for=\"email\" class=\"sr-only\">Email</label>\n" +
        "                    <input type=\"email\" id=\"email\" name=\"email\" class=\"form-control\" placeholder=\"Email\"\n" +
        "                           required=\"\">\n" +
        "                </p>\n" +
        "                <button id=\"btnRegister\" class=\"btn btn-lg btn-primary btn-block\" type=\"button\">Register</button>\n" +
        "            </form>");

};
