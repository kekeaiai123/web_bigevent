// 每次调用$.ajax()、$.get()、$.post()时，会调用这个函数
$.ajaxPrefilter(function(options){
    options.url="http://www.liulongbin.top:3007" +options.url
    // 判断表头有没有字符
    if(options.url.indexOf('/my/')!== -1){
        // 统一为有权限的接口设置headers请求头
      options.headers ={
          Authorization:localStorage.getItem('token')||''
        }
    }

    // 全局统一挂载complete回调函数
    options.complete =function(res){
            // 无论请求成功还是失败，都会调用这个回调函数
            
                // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据，再进行判断
                // 假token也不能登录
                if(res.responseJSON.status === 1&& res.responseJSON.message ==='身份认证失败！'){
                    // 强制清空token 强制跳转到登录页面
                 // 一般有人不登录直接进去或者token过期了
                 localStorage.removeItem('token')
                 location.href = '/login.html'
            } 
    }
    
} )
