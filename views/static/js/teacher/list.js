define(["jquery","template","bootstrap"], function($,template) {

    //用过滤器来实现年龄的获取
    template.defaults.imports.getage=function(value){
        return new Date().getFullYear()-new Date(value).getFullYear();
    }
   //发送ajax请求获取数据，并创建模板引擎把数据渲染到页面上
   $.ajax({
       url:"/api/teacher",
       success:function(data){
           if(data.code == 200){
            //    console.log(data);
            //在这给v一个年龄属性,可以给模板使用
            // data.result.forEach(function(v,i) {
            //     v.age=new Date().getFullYear()-new Date(v.tc_birthday).getFullYear();
            // });
            var html=template("teacher-list-tpl",data);
            $("#teacher-list").html(html);
         }
       }
   })
    
   //给所有的查看注册点击事件（委托）
   $("#teacher-list").on("click",".btn-checkinfo",function(){
    
    //    $("#teacherModal").modal("show");
     //获取id
     //console.log(this);//<a href="#" class="btn btn-info btn-xs btn-checkinfo">查 看</a>
            var id=$(this).parent().data("id");
            // console.log(id);
            //发送ajax请求，得到数据，创建模板引擎，渲染到页面
            $.ajax({
                url:"/api/teacher/view",
                data:{tc_id:id},
                success:function(data){
                    if(data.code == 200){
                        // console.log(data);
                        var html=template("teacher-info-tpl",data.result);
                        $("#teacher-info").html(html);
                        //打开模态框
                        $("#teacherModal").modal("show");
                    }
                }
            })
   })

   //讲师的注销与启用状态
   //已启用： tc_status==0 按钮：注销
$("#teacher-list").on("click",".btn-status",function(){
    //向后台发送请求
    var id=$(this).parent().data("id");
    var status=$(this).data("status");
    var that=this;
    $.ajax({
        url:"/api/teacher/handle",
        type:"post",
        data:{
            tc_id:id,
            tc_status:status
        },
        success:function(data){
            if(data.code == 200){
                // console.log(data);
                // location.reload();
                $(that).text(data.result.tc_status==0?"注 销":"启 用");
                $(that).removeClass(data.result.tc_status==0?"btn-success": "btn-warning");
                $(that).addClass(data.result.tc_status==0?"btn-warning": "btn-success");
                $(that).data("status",data.result.tc_status);
            }
        }
    })
})
   //已注销： tc_status==1 按钮：启用
   
});