$(function() {

    $('#link-reg').on(
        'click',
        function() {
            $('.login-box').hide();
            $('.reg-box').show();
        }
    )
    $('#link-login').on(
        'click',
        function() {
            $('.reg-box').hide();
            $('.login-box').show();
        }
    )

    // 表单验证
    var form = layui.form;
    var layer = layui.layer;

    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val()
            if (value != pwd) {
                return '两次密码不一致';
            }
        }
    });

    // 监听注册表单的事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        var data = {
            username: $('.reg-box [name=username]').val(),
            password: $('.reg-box [name=password]').val(),
        };
        $.ajax({
            method: "post",
            url: "/api/reguser",
            data: data,
            dataType: "json",
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message, { icon: 5 });
                }
                // 注册成功
                layer.msg(res.message, { icon: 6 });
                $('#link-login').click();

            }
        });


    });

    // 监听登录表单的事件
    $('#form_login').submit(function(e) {
        e.preventDefault();
        $.ajax({
            method: "post",
            url: "/api/login",
            data: $(this).serialize(),
            dataType: "json",
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message, { icon: 5 });
                }
                // 登录成功
                layer.msg(res.message, { icon: 6 });
                console.log(res.token);
                localStorage.setItem('token', res.token);


                window.location.href = "/index.html";

            }
        });
    });













})