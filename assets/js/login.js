$(function () {
    // 点击 "去注册账号" 链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    });

    // 点击 "去登陆" 链接
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    });

    // layui中的对象不能直接使用,需要layui.XX才可以使用
    // 从layui中获取form对象
    var form = layui.form;
    // 从layui中获取layer(提示信息)对象
    var layer = layui.layer;

    // 通过 form.verify()函数自定义校验规则
    form.verify({
        // 自定义了一个叫做 pwd 的校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 若判断失败则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致!';
            }
        },
    });

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        // 1.阻止默认提交行为
        e.preventDefault();
        // 2.发起Ajax的POST请求
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val(),
        };
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功,请登录!');
            // 注册成功后自动跳转到登录界面(模拟手动点击 "去登陆" 链接)
            $('#link_login').click();
        });
    });

    // 监听登录表单的提交事件
    $('#form_login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            //  快速获取表单中的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败!');
                }
                layer.msg('登录成功!');
                // 将登录成功得到的token字符串,保存到localStorage中
                localStorage.setItem('token', res.token);
                // 跳到后台主页
                location.href = '/index.html';
            },
        });
    });
});
