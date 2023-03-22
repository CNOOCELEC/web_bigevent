$(function() {
    var layer = layui.layer
    var form = layui.form

    initartCatelist()

    function initartCatelist() {
        $.ajax({
            type: "get",
            url: "/my/article/cates",
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("获取文章列表失败！")
                }
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        });
    }
    var indexadd = null
    $('#btnaddCate').on('click', function() {
        indexadd = layer.open({
            title: '添加文章分类',
            type: 1,
            area: ['500px', '250px'],
            content: $('#dialog-add').html()
        })
    });
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault()
        $.ajax({
            type: "post",
            url: "/my/article/addcates",
            data: $(this).serialize(),

            success: function(res) {
                // if (res.status !== 0) {
                //     return layer.msg('新增文章分类失败')
                // }
                initartCatelist()
                layer.msg('新增文章分类成功')
                layer.close(indexadd)
            }
        });
    })
    var indexedit = null
    $('tbody').on('click', '#btn-edit', function() {
        indexedit = layer.open({
            title: '修改文章分类',
            type: 1,
            area: ['500px', '250px'],
            content: $('#dialog-edit').html()
        })
        var id = $(this).attr('data-id')
        $.ajax({
            type: "get",
            url: "/my/article/cates/" + id,
            success: function(res) {
                form.val('form-edit', res.data)
            }
        });
    })

    $('body').on('submit', '#dialog-edit', function(e) {
        e.preventDefault()
        $.ajax({
            type: "post",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败！')
                }
                layer.msg('更新分类数据成功··')
                layer.close(indexedit)
                initartCatelist()
            }
        });
    })

    $('tbody').on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id')
            // 询问用户是否要删除数据
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章失败！')
                    }
                    layer.msg('删除文章成功！')
                    initartCatelist()
                }
            })
        })
    })










})