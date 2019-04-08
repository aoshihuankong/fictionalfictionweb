$(document).ready(function () {
    if (!!$.cookie('username') && $.cookie('username') != "null") {
        bookshelf();

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

        $("#btnLogout").click(function () {
            $.cookie('username', null);
            alert("注销成功！");
            window.location.href = "http://localhost:63340/fictionalfictionweb/login.html";
        });

        //初始化Table
        var oTable = new TableInit();
        oTable.Init();

        //初始化Button的点击事件
        var oButtonInit = new ButtonInit();
        oButtonInit.Init();
    } else {
        alert("请先登录！")
        window.location.href = "http://localhost:63340/fictionalfictionweb/login.html";
    }
});

var bookshelf = function () {
    $(".navbar-nav").append("<li><a href=\"http://localhost:63340/fictionalfictionweb/index.html\">首页</a></li>\n" +
        "                        <li><a>你好，" + $.cookie('username') + "</a></li>\n" +
        "                        <li class=\"active\"><a href=\"http://localhost:63340/fictionalfictionweb/bookshelf.html\">我的书架</a></li>\n" +
        "                        <li><a id=\"btnLogout\" href=\"#logout\">注销</a></li>");
};

var TableInit = function () {
    var oTableInit = new Object();
    //初始化Table
    oTableInit.Init = function () {
        $('#tb_bookshelf').bootstrapTable({
            url: 'http://localhost:8080/fictionalfiction/userbooksearch',         //请求后台的URL（*）
            method: 'post',                      //请求方式（*）
            toolbar: '#toolbar',                //工具按钮用哪个容器
            striped: true,                      //是否显示行间隔色
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true,                   //是否显示分页（*）
            sortable: true,                     //是否启用排序
            sortOrder: "asc",                   //排序方式
            queryParams: oTableInit.queryParams,//传递参数（*）
            sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
            pageNumber: 1,                       //初始化加载第一页，默认第一页
            pageSize: 10,                       //每页的记录行数（*）
            pageList: [10, 25, 50],        //可供选择的每页的行数（*）
            search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端
            strictSearch: true,
            showColumns: true,                  //是否显示所有的列
            showRefresh: true,                  //是否显示刷新按钮
            minimumCountColumns: 2,             //最少允许的列数
            clickToSelect: true,                //是否启用点击选中行
            uniqueId: "ID",                     //每一行的唯一标识，一般为主键列
            showToggle: true,                    //是否显示详细视图和列表视图的切换按钮
            cardView: false,                    //是否显示详细视图
            detailView: false,                   //是否显示父子表
            columns: [{
                checkbox: true
            },{
                field: 'name',
                title: '书名'
            }, {
                field: "author",
                title: "作者"
            }, {
                field: "cName",
                title: "类型"
            }, {
                field: "lastChapter",
                title: "最新章节",
                formatter: function (value, row, index) {
                    return "<a href=\"http://localhost:63340/fictionalfictionweb/content.html#" + row.name + "#" + row.lastChapterLink + "\"" + ">" + value +"</a>";
                }
            }, {
                field: "lastTime",
                title: "更新时间",
                sortable: true
            }, {
                field: "progress",
                title: "阅读进度",
                formatter: function (value, row, index) {
                    if (value == null) {
                        return value;
                    } else {
                        return "<a href=\"http://localhost:63340/fictionalfictionweb/content.html#" + row.name + "#" + row.progressLink + "\"" + ">" + value +"</a>";
                    }
                }
            }]
        });
    };

    //得到查询的参数
    oTableInit.queryParams = function (params) {
        var data = {   //键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
            name: $.cookie('username')
        };
        return data;
    };
    return oTableInit;
};

var ButtonInit = function () {
    var oInit = new Object();
    var postdata = {};

    oInit.Init = function () {
        $("#btn_delete").click(function () {
            var name = $.cookie('username');
            var urlstmp = $("#tb_bookshelf").bootstrapTable('getSelections');
            var urls = new Array();
            for (var i = 0; i < urlstmp.length; i++) {
                urls[i] = urlstmp[i].bookid;
            }
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/fictionalfiction/delectbook",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                data: JSON.stringify({
                    name: name,
                    urls: urls
                }),
                success: function (data) {
                    $("#tb_bookshelf").bootstrapTable('refresh');
                    alert("删除成功");
                }
            });
        });
    };

    return oInit;
};