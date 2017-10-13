
	// NProgress.start();

	// NProgress.done();

	// $('.navs ul').prev('a').on('click', function () {
	// 	$(this).next().slideToggle();
	// });

define(["jquery","template","cookie"],function($,template){
	
	$(function(){
		//如果不是在登录页面才需要从cookie中获取用户数据展示到页面
		if(location.pathname != "/dashboard/login"){
			//判断用户是否已经登录，如果没有登录，就让其跳回登录页面
			if(!$.cookie("PHPSESSID")){
				location.href="/dashboard/login";
			}


			//从cookie中取userinfo的信息，使用模板引擎将获取到的信息展示到侧边栏
			var userinfo=$.cookie("userinfo");
			// console.log(userinfo);
			userinfo=JSON.parse(userinfo);
			var html=template("profile-tpl",userinfo);
			$("#user-info").html(html);
		}

		//给退出登录按钮注册点击事件
		$("#btn-logout").click(function(){
			$.ajax({
				url:"/api/logout",
				type:"post",
				success:function(data){
					if(data.code == 200){
						location.href="/dashboard/login";
					}
				}
			})
			
		})

		//给导航栏菜单注册事件，实现点击父菜单展示子菜单
		$(".navs>ul>li>ul").parent().click(function(){
			$(this).children("ul").slideToggle("fast");
		})

		//点击对应的菜单让其加上公共类
		var activeA=$(".navs a[href='" + location.pathname + "']" );
		activeA.addClass("active");

		//因为只有是子菜单的ul才会有一个兄弟元素a
		//就判断当前a标签所在的菜单是否有兄弟元素a
		//如果有，就证明当前a标签是在一个子菜单中
		//那么直接让子菜单显示即可
		if(activeA.parent().parent().siblings("a").length>0){
			activeA.parent().parent().show();
		}


		
	})
})