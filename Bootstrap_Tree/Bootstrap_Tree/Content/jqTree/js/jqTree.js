
var testnodes = [{
    id: '1',
    text: '系统设置',
    nodes: [{
        id: '11',
        text: '编码管理',
        nodes: [{
            id: '111',
            text: '自动管理',
            nodes: [{
                id: '1111',
                text: '手动管理',
                nodes: [{
                    id: '11111',
                    text: '底层管理',
                }]
            }]
        }]
    }]
}, {
    id: '2',
    text: '基础数据',
    nodes: [{
        id: '21',
        text: '基础特征'
    }, {
        id: '22',
        text: '特征管理'
    }]
}];

$(function () {
    $("#ul_tree").jqtree({
        //data: testnodes,
        url: "/Home/GetTreeData",
        param: { },
        onBeforeLoad: function (param) {
            
        },
        onLoadSuccess: function (data) {
            
        },
        onClickNode: function (selector) {
            
        }
    });
});




//tree
(function ($) {
    //使用js的严格模式
    'use strict';

    $.fn.jqtree = function (options) {
        //合并默认参数和用户传过来的参数
        options = $.extend({}, $.fn.jqtree.defaults, options || {});

        var that = $(this);
        var strHtml = "";
        //如果用户传了data的值，则直接使用data，否则发送ajax请求去取data
        if (options.data) {
            strHtml = initTree(options.data);
            that.html(strHtml);
            initClickNode();
        }
        else {
            //在发送请求之前执行事件
            options.onBeforeLoad.call(that, options.param);
            if (!options.url)
                return;
            //发送远程请求获得data
            $.getJSON(options.url, options.param, function (data) {
                strHtml = initTree(data);
                that.html(strHtml);
                initClickNode();

                //请求完成之后执行事件
                options.onLoadSuccess.call(that, data);
            });
        }

       


        function initClickNode() {
            $('.tree li').addClass('parent_li').find(' > span').attr('title', '收起');
            $('.tree li.parent_li > span').on('click', function (e) {
                var children = $(this).parent('li.parent_li').find(' > ul > li');
                if (children.is(":visible")) {
                    children.hide('fast');
                    $(this).attr('title', '展开').find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');
                } else {
                    children.show('fast');
                    $(this).attr('title', '收起').find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');
                }

                $('.tree li[class="parent_li"]').find("span").css("background-color", "transparent");
                $(this).css("background-color", "#428bca");

                options.onClickNode.call($(this), $(this));
            });
        };

        function initTree(data) {
            var strHtml = "";
            for (var i = 0; i < data.length; i++) {
                var arrChild = data[i].nodes;
                var strHtmlUL = "";
                var strIconStyle = "icon-leaf";
                if (arrChild && arrChild.length > 0) {
                    strHtmlUL = "<ul>";
                    strHtmlUL += initTree(arrChild) + "</ul>";
                    strIconStyle = "icon-minus-sign";
                }
                
                strHtml += "<li id=\"li_" + data[i].id + "\"><span id=\"span_" + data[i].id + "\"><i class=\"" + strIconStyle + "\"></i>" + data[i].text + "</span>" + strHtmlUL + "</li>";

            }
            return strHtml;
        };

        
    };

    $.fn.jqtree.defaults = {
        url: null,
        param: null,
        data: null,
        onBeforeLoad: function (param) { },
        onLoadSuccess: function (data) { },
        onClickNode: function (selector) { }
    };

})(jQuery);