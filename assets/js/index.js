$(function () {
    // 定义获取用户的基本信息的函数
    function getUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            // herders是请求头配置对象
            headers: {
                Authorization: localStorage.getItem('token') || '',
            },
            success: function (res) {
                console.log(res);
            },
        });
    }

    // 调用getUserInfo()函数获取用户基本信息
    getUserInfo();
});
