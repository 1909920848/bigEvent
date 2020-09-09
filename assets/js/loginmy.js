$(function() {
    $('#link_reg').on('click', function() {
        $(".login").hide()
        $(".register").show()
    })
    $('#link-login').on('click', function() {
        $(".login").show()
        $(".register").hide()
    })

})