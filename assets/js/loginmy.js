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
            // if ($('.register .layui-input:eq(2)').val() != value) {
            //     return '两次密码不一致'
            // }
        }
    })


})