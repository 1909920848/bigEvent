$(function() {
    var form = layui.form
    var layer = layui.layer
    getCateList()

    function getCateList() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            data: {},
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //使用模板引擎渲染页面
                var tableHtml = template('tpl-table', res)
                $('tbody').html(tableHtml)
            }

        })
    }

    var addCateIndex = null;
    // layui规定 每弹出一个层，都会返回一个index
    $("#btnAddCate").on('click', function() {
        addCateIndex = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: '添加文章分类',
            content: $('#dialog-add').html(),
            move: '.mine-move'
        })
    })


    //添加类别
    $('body').on('submit', '#addCateForm', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('添加失败')
                }
                //使用模板引擎渲染页面
                layer.msg('添加成功')
                getCateList()
                layer.close(addCateIndex)
            }

        })
    })

    //编辑弹出框的样式 及内容渲染
    var editCateIndex = null;
    $('body').on('click', '.btn-edit', function() {
        // 弹出一个修改文章分类信息的层
        editCateIndex = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })

        var id = $(this).attr('data-id')
            // 发起请求获取对应分类的数据
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                form.val('edit-form', res.data)
            }
        })


    })

    //编辑之后 渲染
    $('body').on('submit', '#form-edit', function(e) {

        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //使用模板引擎渲染页面
                layer.msg('编辑分类成功')
                getCateList()
                layer.close(editCateIndex)
            }

        })
    })

    //删除
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //使用模板引擎渲染页面
                layer.msg('编辑分类成功')
                getCateList()
                layer.close(editCateIndex)
            }

        })
    })


    $('body').on('click', '.btn-delete', function() {

        var cateid = $(this).attr('data-id')
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'get',
                url: `/my/article/deletecate/${cateid}`,
                data: $(this).serialize(),
                success: function(res) {
                    // console.log(res);
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    //使用模板引擎渲染页面
                    layer.msg('删除成功')
                    getCateList()
                    layer.close(index)
                }

            })
        })
    })
})