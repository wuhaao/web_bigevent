$(function () {
    // 调用getUserInfo()函数获取用户基本信息
    getUserInfo();

    var layer = layui.layer;

    // 点击退出按钮实现退出功能
    $('#btnLogout').on('click', function () {
        // 提示用户是否确认退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something

            // 1.清空本地存储中的token
            localStorage.removeItem('token');
            // 2.重新跳转到登录页
            location.href = '/login.html';

            // 关闭confirm询问框
            layer.close(index);
        });
    });
});

// 定义获取用户的基本信息的函数
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // herders是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || '',
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败!');
            }
            // 调用renderAvatar渲染用户头像
            renderAvatar(res.data);
        },
    });
}

// 定义渲染用户头像的函数
function renderAvatar(user) {
    // 1.获取用户名称
    var name = user.nickname || user.username;
    // 2.设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp' + name);
    // 3.按需渲染用户头像
    if (user.user_pic !== null) {
        // 3.1渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        // 3.2渲染文本头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}
