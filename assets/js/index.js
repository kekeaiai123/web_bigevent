$(function(){
    getUserInfo()
    
    var layer = layui.layer
    //退出功能
    $('#btnLogout').on('click',function(){
        layer.confirm('确认退出?', {icon: 3, title:'提示'}, function(index){
            //do something
            // 退出时清空浏览器token
            localStorage.removeItem('token')
            // 跳出页面
            location.href ='/login.html'
            // 关闭 询问框
            layer.close(index);
          });
    })




})

// 获取用户基本信息
function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        // 请求头
       /*  headers:{
            Authorization:localStorage.getItem('token')||''
        }, */
        success:function(res){
            if(res.status !==0){
                return layui.layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data)
        },
    
    })
}
// 渲染用户头像
function renderAvatar(user){
    var name = user.nickname||user.username
    $('#welcome').html(`欢迎&nbsp&nbsp`+name)
    // 按需渲染用户头像
    if(user.user_pic !==null){
        // 渲染图片头像
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    }else{
        $('.layui-nav-img').hide()
        var first =name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}
