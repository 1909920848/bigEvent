$(function() {
    $('#link_reg').on('click', function() {
        $(".login").hide()
        $(".register").show()
    })
    $('#link-login').on('click', function() {
            $(".login").show()
            $(".register").hide()
        })
        // 自定义表单验证规则
    var form = layui.form

    form.verify({
            pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
            //通过形参拿到密码框里面的值
            //这里的value是指当前表单中的属性值
            repwd: function(value) {
                if ($('.register [name=password]').val() != value) {
                    return '两次密码不一致'
                }
            }
        })
        // 注册ajax
    $("#form_reg").on('submit', function(e) {
            //组织默认跳转
            e.preventDefault()
            $.ajax({
                method: 'post',
                url: '/api/reguser',
                data: {
                    username: $('#form_reg [name=username]').val(),
                    password: $('#form_reg [name=password]').val()
                },
                success: function(res) {
                    console.log(res);
                    if (res.status !== 0) {
                        return
                    }
                    layer.msg('注册成功，请登录')
                    $('#link-login').click()
                }
            })
        })
        //登录
    $("#form_login").on('submit', function(e) {
        //阻止默认跳转
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/api/login',
            data:
            // $(this).serialize()
            {
                username: $('#form_login [name=username]').val(),
                password: $('#form_login [name=password]').val()
            },
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }

                localStorage.setItem('token', res.token)
                location.href = './index.html'
            }
        })
    })

})