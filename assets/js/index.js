$(function() {
    //调用 getUserInfo 获取用户的基本信息
    getUserInfo()

    function getUserInfo() {
        $.ajax({
            method: 'get',
            url: "/my/userinfo",
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取信息失败')
                }
                //渲染用户的头像
                xuanran(res.data)
            }
        })
    }
    window.getUserInfo = getUserInfo

    function xuanran(user) {
        //获取用户的昵称
        var name = user.nickname || user.username
        $(".welcome").html('欢迎&nbsp;&nbsp;' + name)
            //按需渲染用户的头像
            //渲染图片的头像
        if (user.user_pic !== null) {
            //对于自定义属性 用attr
            $('.layui-nav-img').attr('src', user.user_pic).show()
            $('.user-text').hide()
        }
        //渲染文本的头像
        else {
            $('.user-text').html(name[0].toUpperCase()).show()
            $('.layui-nav-img').hide()

        }
    }
    $('#logout').click(function() {
        layer.confirm('确认退出?', { icon: 3, title: '提示' }, function(index) {
            //do something
            localStorage.removeItem('token')
            location.href = "/login.html"
            layer.close(index);
        })
    })


})