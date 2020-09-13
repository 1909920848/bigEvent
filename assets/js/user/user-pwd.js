$(function() {
    // 从 layui 中获取 form 对象
    var form = layui.form
    var layer = layui.layer
        // 通过 form.verify() 函数自定义校验规则
    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samepwd: function(value) {
            if ($('.layui-form [name=newpwd]').val() === $('.layui-form [name=oldpwd]').val()) {
                return '新密码不能与原密码相同'
            }
        },
        // 校验两次密码是否一致的规则
        repwd: function(value) {
            // 进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            if ($('.layui-form [name=newpwd]').val() !== $('.layui-form [name=renewpwd]').val()) {
                return '两次密码输入不一致'
            }
        }
    })

    $('.layui-form').submit(function(e) {
        e.preventDefault()

        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                $('.layui-form')[0].reset()

                localStorage.removeItem('token')
                    // 跳转到后台主页
                top.window.location.href = '/index.html'
            }
        })
    })
})