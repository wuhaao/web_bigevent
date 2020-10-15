// 注意: 每次调用$.get()/$.post()/$.ajax()的时候
// 会先调用$.ajaxPrefilter()这个函数
// 在这个函数中, 可以拿到Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // 在发起真正的Ajax之前, 统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url;

    // 统一为有权限的接口设置 headers 请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || '',
        };
    }

    // 全局统一挂载complete回调函数
    options.complete = function (res) {
        console.log(res);
        // 在complete回调函数中,可以使用res.responseJSON拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1.清空本地存储中的token
            localStorage.removeItem('token');
            // 2.重新跳转到登录页
            location.href = '/login.html';
        }
    };
});
