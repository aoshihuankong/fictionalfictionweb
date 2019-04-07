$(document).ready(function () {
    if (!!$.cookie('username') && $.cookie('username') != "null") {
        $(".navbar-nav").append("<li><a href=\"http://localhost:63340/fictionalfictionweb/index.html\">首页</a></li>\n" +
            "                        <li><a href=\"#name\">你好，"+ $.cookie('username') +"</a></li>\n" +
            "                        <li><a href=\"http://localhost:63340/fictionalfictionweb/bookshelf.html\">我的书架</a></li>\n" +
            "                        <li><a id=\"btnLogout\" href=\"#logout\">注销</a></li>");

        if (window.location.href.split("#")[1] != undefined) {
            search(window.location.href.split("#")[1]);
        }
        $("#btnSearch").click(function () {
            window.location.href="http://localhost:63340/fictionalfictionweb/search.html#" + $("input").val();
            search(window.location.href.split("#")[1]);
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

function search(name) {
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/fictionalfiction/booksearch",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            name: name
        }),
        success: function (data) {
            $("ul.list-group").empty();
            for (var i = 0; i < data.tatol; i++) {
                $("ul.list-group").append("<li class=\"list-group-item\" style=\"height: 220px;\">\n" +
                    "                    <div class=\"col-lg-2 col-md-2 col-sm-2\">\n" +
                    "                        <a href=http://localhost:63340/fictionalfictionweb/details-chapter.html#" + data.data[i].id + ">\n" +
                    "                            <img src=" + data.data[i].img + " style=\"width: 150px;height: 200px;\">\n" +
                    "                        </a>\n" +
                    "                    </div>\n" +
                    "                    <div class=\"col-lg-10 col-md-10 col-sm-10\">\n" +
                    "                        <h4><a href=http://localhost:63340/fictionalfictionweb/details-chapter.html#" + data.data[i].id + ">" + data.data[i].name + "</a></h4>\n" +
                    "                        <p class=\"author\">\n" +
                    "                            <span>作者：</span><span>" + data.data[i].author + "</span>\n" +
                    "                            <em>|</em><span>" + data.data[i].cName + "</span>\n" +
                    "                        </p>\n" +
                    "                        <p class=\"intro\" style=\"display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;font-size: 20px;\">\n" +
                    "                            " + data.data[i].desc + "\n" +
                    "                        </p>\n" +
                    "                        <p class=\"update\">\n" +
                    "                            <span>最新更新：</span><a href=" + data.data[i].lastChapterLink + ">\n" +
                    "                                " + data.data[i].lastChapter + "</a><em>·</em><span>" + data.data[i].lastTime.split(" ")[0] + "</span>\n" +
                    "                        </p>\n" +
                    "                        <a id=\""+ i +"\" class=\"blue-btn add-book\" href=\"javascript:;\" onclick=\"addBook("+ i +")\">加入书架</a>\n" +
                    "                    </div>\n" +
                    "                </li>");
                existBook(i);
            }
        },
        error: function (data) {
            console.log(data);
        }
    });
}

var addBook = function (i) {
    var name = $.cookie('username');
    var url = $(".add-book")[i].parentElement.children[0].children[0].attributes["href"].value.split("#")[1];

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/fictionalfiction/addbook",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            name: name,
            url: url
        }),
        success: function (data) {
            $(".add-book")[i].removeAttribute("onclick");
            $(".add-book")[i].innerHTML = "已在书架";
            $(".add-book")[i].setAttribute("style", "color: darkgray;");
            alert("添加成功");
        }
    });
};

var existBook = function (i) {
    var username = $.cookie('username');
    var url = $(".add-book")[i].parentElement.children[0].children[0].attributes["href"].value.split("#")[1];

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/fictionalfiction/existbook",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            name: username,
            url: url
        }),
        success: function (data) {
            if (data.exist) {
                $(".add-book")[i].removeAttribute("onclick");
                $(".add-book")[i].innerHTML = "已在书架";
                $(".add-book")[i].setAttribute("style", "color: darkgray;")
            }
        }
    });
};