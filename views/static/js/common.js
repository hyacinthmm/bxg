
	// NProgress.start();

	// NProgress.done();

	// $('.navs ul').prev('a').on('click', function () {
	// 	$(this).next().slideToggle();
	// });

define(["jquery","template","cookie"],function($,template){
	
	$(function(){
		//如果不是在登录页面才需要从cookie中获取用户数据展示到页面
		if(location.pathname != "/dashboard/login"){
			//从cookie中取userinfo的信息，使用模板引擎将获取到的信息展示到侧边栏
			var userinfo=$.cookie("userinfo");
			// console.log(userinfo);
			userinfo=JSON.parse(userinfo);
			var html=template("profile-tpl",userinfo);
			$("#user-info").html(html);
		}

		//给退出登录按钮注册点击事件
		$("#btn-logout").click=function(){
			$.ajax({
				url:"/api/logout",
				type:"post",
				success:function(data){
					if(data.code==200){
						location.href="/dashboard/login";
					}
				}
			})
			
		}
		
	})
})