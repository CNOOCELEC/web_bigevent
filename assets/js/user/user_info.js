$(function() {
    var form = layui.form; // 获得 form 模块对象
    var layer = layui.layer
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称1-6个字符'
            }
        }
    });
    initUserinfo()

    function initUserinfo() {
        $.ajax({
            type: "get",
            url: "/my/userinfo",
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                console.log(res);
                form.val('formuserinfo', res.data)
            }
        });
    }

    // 重置表单数据
    $('#btnReset').on('click', function() {
            e.preventDefault()
            initUserinfo()
        })
        //更新用户信息
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            type: "post",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('修改失败')
                }
                window.parent.getUserInfo()
                layer.msg('信息修改成功')

            }
        })
    })



})