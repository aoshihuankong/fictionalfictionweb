$(document).ready(function () {
    if (!!$.cookie('username') && $.cookie('username') != "null") {
        $(".navbar-nav").append("<li><a href=\"http://localhost:63340/fictionalfictionweb/index.html\">首页</a></li>\n" +
            "                        <li><a>你好，"+ $.cookie('username') +"</a></li>\n" +
            "                        <li><a href=\"http://localhost:63340/fictionalfictionweb/bookshelf.html\">我的书架</a></li>\n" +
            "                        <li><a id=\"btnLogout\" href=\"#logout\">注销</a></li>");

        if (window.location.href.split("#")[1] != undefined && window.location.href.split("#")[2] != undefined) {
            content(window.location.href.split("#")[1], window.location.href.split("#")[2]);
        }

        $("#btnSearch").click(function () {
            window.location.href = "http://localhost:63340/fictionalfictionweb/search.html#" + $("input").val();
        });
        $(document).keyup(function(event){
            if(event.keyCode ===13){
                if ($("input").val() === "") {
                    alert("请输入需要搜索的小说名称！")
                } else {
                    $("#btnSearch").trigger("click");
                }
            }
        });

        $("#chapterNext").click(function () {
            if ($("#chapterNext")[0].href == "javascript:;")  {
                alert("该章节不存在下一章");
            } else {
                window.location.href = $("#chapterNext")[0].href;
                if (window.location.href.split("#")[1] != undefined && window.location.href.split("#")[2] != undefined) {
                    content(window.location.href.split("#")[1], window.location.href.split("#")[2]);
                }
                window.scrollTo(0,0);
            }
        });

        $("#chapterPrev").click(function () {
            if ($("#chapterPrev")[0].href == "javascript:;") {
                alert("该章节不存在上一章");
            } else {
                window.location.href = $("#chapterPrev")[0].href;
                if (window.location.href.split("#")[1] != undefined && window.location.href.split("#")[2] != undefined) {
                    content(window.location.href.split("#")[1], window.location.href.split("#")[2]);
                }
                window.scrollTo(0,0);
            }
        });

        $("#btnLogout").click(function () {
            $.cookie('username', null);
            alert("注销成功！");
            window.location.href="http://localhost:63340/fictionalfictionweb/login.html";
        });
    } else {
        alert("请先登录！");
        window.location.href="http://localhost:63340/fictionalfictionweb/login.html";
    }
});

function content(name, url) {
    // 获取详情信息
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/fictionalfiction/bookcontent",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            username: $.cookie('username'),
            name: decodeURIComponent(name),
            url: url
        }),
        success: function (data) {
            $(".chapterName").empty();
            $(".chapterName").append(data.data.cname);

            var contentstr = data.data.content.replace(/\s+/g,"　　\r\n").split("\r\n");

            $(".read-content").empty();
            for (var i = 0; i < contentstr.length; i++) {
                $(".read-content").append("<p>　　" + contentstr[i] + "</p>");
            }

            $("#chapter")[0].href = "http://localhost:63340/fictionalfictionweb/details-chapter.html#" + data.data.id;
            if (data.data.pid == "") {
                $("#chapterPrev")[0].href = "javascript:;";
            } else {
                $("#chapterPrev")[0].href = "http://localhost:63340/fictionalfictionweb/content.html#" + data.data.name + "#" + data.data.pid;
            }
            if (data.data.nid == "") {
                $("#chapterNext")[0].href = "javascript:;";
            } else {
                $("#chapterNext")[0].href = "http://localhost:63340/fictionalfictionweb/content.html#" + data.data.name + "#" + data.data.nid;
            }
        }
    });
}