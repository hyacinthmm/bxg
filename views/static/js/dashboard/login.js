define(["jquery","cookie"],function($){
    $(function(){
        //获取登录按钮，并注册点击事件
        //可以给按钮添加一个id来获取按钮，但是我们给form表单注册提交事件来实现
        $("form").submit(function(){
            //校验用户输入是否合法
            if($("input[name=tc_name]").val().trim()==""){
                alert("请输入用户名");
                return false;
            };
            if($("input[name=tc_pass]").val().trim()==""){
                alert("请输入密码");
                return false;
            }
            //获取用户输入,表单序列化
            var data=$(this).serialize() ;
            //将用户输入的内容发送给接口api进行登录
            $.ajax({
                url:"/api/login",
                type:"post",
                data:data,
                success:function(data){
                    // console.log(data);
                   
                    if(data.code==200){
                        //先将后台返回的数据存到cookie中
                        $.cookie("userinfo",JSON.stringify(data.result),{path:"/",expires:365});
                         //如果用户登录成功，跳转页面
                        location.href="/";

                    }
                }
            })
            //阻止默认事件，不让表单自己提交，因为我们要发送ajax请求
            return false;
        })
    })
})