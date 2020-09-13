$(function() {
    var form = layui.form
        // 对基本资料进行验证
    form.verify({
        nickname: function(value) {
            // console.log(value);
            if (value.length > 6) {
                return '用户昵称不能超过6位'
            }
        }
    })

    //获取用户基本信息
    ininUserInfo()

    function ininUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            data: {},
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取用户基本信息失败')
                }
                form.val('formUserInfo', res.data)

            }
        })
    }


    $("#resetBtn").on('click', function(e) {
        e.preventDefault()
        ininUserInfo()
    })

    // 更新基本资料

    $('.layui-form').submit(function(e) {
        e.preventDefault()

        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                window.parent.getUserInfo()
                    // top.window.parent.getUserInfo()
            }
        })
    })
})