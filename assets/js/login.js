$(function () {
    // 点击 "去注册账号"
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    });

    // 点击 "去登陆"
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    });
});
