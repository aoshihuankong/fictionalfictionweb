$(document).ready(function () {
    if (!!$.cookie('username') && $.cookie('username') != "null") {
        $(".navbar-nav").append("<li><a href=\"http://localhost:63340/fictionalfictionweb/index.html\">首页</a></li>\n" +
            "                        <li><a>你好，"+ $.cookie('username') +"</a></li>\n" +
            "                        <li><a href=\"http://localhost:63340/fictionalfictionweb/bookshelf.html\">我的书架</a></li>\n" +
            "                        <li><a id=\"btnLogout\" href=\"#logout\">注销</a></li>");

        if (window.location.href.split("#")[1] != undefined) {
            detailsandchapter(window.location.href.split("#")[1]);
        }

        $("#btnSearch").click(function () {
            window.location.href="http://localhost:63340/fictionalfictionweb/search.html#" + $("input").val();
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

        $("#btnLogout").click(function () {
            $.cookie('username', null);
            alert("注销成功！");
            window.location.href="http://localhost:63340/fictionalfictionweb/login.html";
        });
    } else {
        alert("请先登录！")
        window.location.href="http://localhost:63340/fictionalfictionweb/login.html";
    }
});

function detailsandchapter(url) {
    // 获取详情信息
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/fictionalfiction/bookdetails",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            url: url
        }),
        success: function (data) {
            $("ul.list-group").append("<li class=\"list-group-item\" style=\"height: 220px;\">\n" +
                "                    <div class=\"col-lg-2 col-md-2 col-sm-2\">\n" +
                "                        <img src=" + data.data.img + " style=\"width: 150px;height: 200px;\">\n" +
                "                    </div>\n" +
                "                    <div class=\"col-lg-10 col-md-10 col-sm-10\">\n" +
                "                        <h4 style=\"width: 50%;margin: auto;float: left;\"><span>" + data.data.name + "</span></h4>\n" +
                "                        <p class=\"author\" style=\"width: 50%;margin: auto;float: left;\">\n" +
                "                            <span>作者：</span><span>" + data.data.author + "</span>\n" +
                "                            <em>|</em><span>" + data.data.cName + "</span>\n" +
                "                        </p>\n" +
                "                        <p class=\"update\" style=\"width: 50%;margin: auto;float: left;\">\n" +
                "                            <span>最新更新：</span><a href=\"http://localhost:63340/fictionalfictionweb/content.html#"+ data.data.name +"#" + data.data.lastChapterLink + "\">\n" +
                "                            " + data.data.lastChapter + "</a><em>·</em><span>" + data.data.lastTime + "</span>\n" +
                "                        </p>\n" +
                "                        <p class=\"intro\" style=\"display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 7;overflow: hidden;font-size: 17px;float: left;\">\n" +
                "                            " + data.data.desc.toString().replace(/　　/g, "</br>") + "\n" +
                "                        </p>\n" +
                "                    </div>\n" +
                "                </li>");

            // 获取目录信息
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/fictionalfiction/bookchapter",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                data: JSON.stringify({
                    url: data.data.id
                }),
                success: function (data) {
                    $("#chapter").append("<a href=\"#\" class=\"list-group-item active\">\n" +
                        "                章节目录\n" +
                        "            </a>");
                    for (var i = 0; i < data.data.chapters.length; i++) {
                        $("#chapter").append("<a href=\"http://localhost:63340/fictionalfictionweb/content.html#"+ data.data.name + "#" + data.data.chapters[i].id + "\"" + " class=\"list-group-item\" style=\"width: 33.3%;float: left;\">" + data.data.chapters[i].name + "</a>");
                    }
                }
            });
        }
    });
}