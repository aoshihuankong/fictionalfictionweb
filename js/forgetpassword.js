$(document).ready(function () {
    forgetpassword();

    $("#btnForgetPassword").click(function () {
        var username = $("#username").val();
        var email = $("#email").val();

        $.ajax({
            type: "POST",
            url: "http://localhost:8080/fictionalfiction/forgetpassword",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify({
                username: username,
                email: email
            })
        });
        alert("密码已发送到该邮箱中，请查阅！");
        window.location.href = "http://localhost:63340/fictionalfictionweb/login.html";
    });
});

var forgetpassword = function (key) {
    $(".navbar-nav").append("<li><a href=\"http://localhost:63340/fictionalfictionweb/index.html\">首页</a></li>\n" +
        "                        <li><a>你好，游客</a></li>\n" +
        "                        <li><a href=\"http://localhost:63340/fictionalfictionweb/bookshelf.html\">我的书架</a></li>\n" +
        "                        <li class=\"active\"><a href=\"#forgetpassword\">忘记密码？</a></li>");

    $("#page").append("<form class=\"form-signin\">\n" +
        "                <h2 class=\"form-signin-heading\">Forget Password？</h2>\n" +
        "                <p>\n" +
        "                    <label for=\"username\" class=\"sr-only\">Username</label>\n" +
        "                    <input type=\"text\" id=\"username\" name=\"username\" class=\"form-control\" placeholder=\"Username\"\n" +
        "                           required=\"\" autofocus=\"\">\n" +
        "                </p>\n" +
        "                <p>\n" +
        "                    <label for=\"email\" class=\"sr-only\">Email</label>\n" +
        "                    <input type=\"text\" id=\"email\" name=\"email\" class=\"form-control\" placeholder=\"Email\"\n" +
        "                           required=\"\" autofocus=\"\">\n" +
        "                </p>\n" +
        "                <button id=\"btnForgetPassword\" class=\"btn btn-lg btn-primary btn-block\" type=\"button\">Submit</button>\n" +
        "            </form>");
};
