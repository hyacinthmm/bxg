define(["jquery","utils","template","form","datepicker","datepickerCN"],function($,utils,template){



     //一个页面中，要实现两个功能： 添加  编辑

    //问题1： 如何判断是哪个功能
        //根据当前页面的url地址中是否有id参数被传入，就可以判断究竟是添加还是编辑
        //有就编辑
        //没有就是添加
    var id = utils.getQuery("id");
    var data={};
    // console.log(id);
    if(id){
        // alert("编辑功能");
        data.title="讲师编辑";
        data.buttonText="保 存";
        data.url="/api/teacher/update";
        $.ajax({
            url:"/api/teacher/edit",
            data:{tc_id:id},
            success:function(msg){
                if(msg.code == 200){
                    // console.log(msg);
                    data.teacher = msg.result;
                    renderData();
                }
               
            }

        })
    }else{
        // alert("添加功能");
        data.title="添加讲师";
        data.buttonText="添 加";
        data.url="/api/teacher/add";
        data.teacher={
            tc_gender : "0",
        }
        renderData();

    }

    function renderData(){
        var html=template("manage-tpl",data);
        $(".body.teacher").html(html);

        //使用日期插件
        $("input[name='tc_join_date']").datepicker({
            format:"yyyy-mm-dd",
            autoclose:true,
            language:"zh-CN",
        })
    }

    $(".body.teacher").on("submit","form",function(){
        // console.log(this);
        $(this).ajaxSubmit({
            success:function(data){
                if(data.code == 200){
                    // console.log(data);
                    location.href="/teacher/list";
                }
            }
        })
        return false;
    })

})