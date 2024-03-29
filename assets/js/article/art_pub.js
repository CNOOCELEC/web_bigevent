$(function() {
    var layer = layui.layer
    var form = layui.form
    initCate()
        // 初始化富文本编辑器
    initEditor()
        // 文章分类的方法
    function initCate() {
        $.ajax({
            type: "get",
            url: "/my/article/cates",
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取数据失败')

                }

                var htmlStr = template('tpl-cate', res)

                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        });
    }
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    // 绑定点击事件
    $('#btnChooseImage').on('click', function() {
            $('#coverFile').click()
        })
        // 监听change事件
    $('#coverFile').on('change', function(e) {
        var file = e.target.files[0]
        if (file.length === 0) {
            return
        }
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    // 定义文章状态
    var art_status = '已发布'
    $('#btnSave2').on('click', function() {
        art_status = '草稿'
    })

    $('#form-pub').on('submit', function(e) {
        e.preventDefault()
        var fd = new FormData($(this)[0])
        fd.append('state', art_status)
            // fd.forEach(function(v, k) {
            //     console.log(k, v);
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                $image
                    .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                        width: 400,
                        height: 280
                    })
                    .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                        fd.append('cover_img', blob) // 得到文件对象后，进行后续的操作
                        publistArticle(fd)
                    })
            })
    })

    function publistArticle(fd) {
        $.ajax({
            type: "post",
            url: "/my/article/add",
            data: fd,
            contentType: false,
            processData: false,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('上传失败')
                }
                layer.msg('上传成功')
                location.href = '/article/art_list.html'
            }
        });
    }

})