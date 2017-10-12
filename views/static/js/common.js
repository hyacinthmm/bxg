
	// NProgress.start();

	// NProgress.done();

	// $('.navs ul').prev('a').on('click', function () {
	// 	$(this).next().slideToggle();
	// });


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
		
	})