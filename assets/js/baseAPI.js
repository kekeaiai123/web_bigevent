// 每次调用$.ajax()、$.get()、$.post()时，会调用这个函数
$.ajaxPrefilter(function(options){
    options.url="http://www.liulongbin.top:3007" +options.url
} )