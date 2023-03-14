$(function(){
    var form = layui.form
    var layer = layui.layer
    // 进行验证
    form.verify({
        
        nickname:function(value){
            if(value.length<6){
                return '昵称长度必须在 1-6个字符之间！'
            }
        }
    })
    initUserInfo()
    // 发起数据请求，进行渲染
    function initUserInfo(){
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function(res){
                if(res.status !==0){return layer.msg('获取用户信息失败')}
                // 调用form.val()快速为表单赋值
                console.log(res)
                // 为表单赋值
                form.val('formUserInfo', res.data);
            }
        })
    }
    $('#btnReset').on('click',function(e){
        // 阻止表单默认重置
        e.preventDefault();
        // 再次渲染页面
        initUserInfo()
    })
    $('.layui-form').on('submit',function(e){
        // 阻止表单默认重置
        e.preventDefault();
        // 发起ajax请求
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            // 进行序列化表单的获取
            data:$(this).serialize(),
            success:function(res){
               if(res.status !== 0) {return layer.msg("用户更新信息失败")}
               layer.msg('用户更新信息成功')
                //调用父级页面方法重新渲染头像
                window.parent.getUserInfo()
            }
        })
        
    })
})