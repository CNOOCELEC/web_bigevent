$(function() {
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'
        ],
        samePwd: function(val) {
            if (val === $('[name=oldPwd]').val()) {
                return '新旧密码不相同';
            }
        },
        repwd: function(val) {
            if (val !== $('[name=newPwd]').val()) {
                return '新输入的密码跟新密码不一致';
            }
        }
    });
    form.on('submit(login)', function(data) {
        var data = data.field;
        $.ajax({
            url: '/user/login',
            type: 'post',
            data: data
        })
    })
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('密码修改失败')
                }
                layui.layer.msg('密码修改成功')
                $('.layui-form').get(0).reset()
            }
        })


    })





})