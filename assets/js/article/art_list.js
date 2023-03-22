$(function() {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage;


    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function(date) {
        const dt = new Date(date)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    // 定义补零的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }


    var layer = layui.layer
    var q = {
        pagenum: 1,
        pagesize: 1,
        cate_id: '',
        state: ''
    }
    initTable()
    initCate()

    function initTable() {
        $.ajax({
            type: "get",
            url: "/my/article/list",
            data: q,
            success: function(res) {
                if (res.status !== 0) {

                    return layer.msg('获取文章列表失败！')
                }

                // 使用模板引擎获得渲染数据
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                renderPage(res.total)
            }

        });
    }
    // 初始化文章分类的方法
    function initCate() {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取数据失败')
                        // 调用模板引擎
                }

                var htmlStr = template('tpl-cate', res)
                    // console.log(htmlStr);
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        });
    }

    // 分类浏览提交
    $('#form-search').on('submit', function(e) {
        e.preventDefault()
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        q.cate_id = cate_id
        q.state = state
        initTable()
    })

    // 渲染分页方法
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号

            count: total,
            limit: q.pagesize,
            curr: q.pagenum,
            limits: [1, 2, 3, 4, 5],
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            jump: function(obj, first) {

                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) { initTable() }


            }
        });

        // 文章列表操作删除按钮
        $('tbody').on('click', '.btn-delete', function() {
            var len = $('.btn-delete').length
            layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
                var id = $(this).attr('data-id')
                $.ajax({
                    type: "get",
                    url: "/my/article/delete/" + id,
                    success: function(res) {
                        if (res.status !== 0) {
                            return layer.msg('删除文章失败')
                        }
                        if (len === 1) {
                            q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                        }
                        initTable()
                    }
                });

                layer.close(index);
            });
        })

    }















})