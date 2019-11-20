//判断字符串是否为空
function isEmptyOrBlank(str) {
	if (str == null || str.length == 0) {
		return true;
	} else {
		return false;
	}
}
//判断是否为空
function emptyRegular(obj,str){
        if (isEmptyOrBlank(str)) {
                obj.parent().next().show();
                return false;
        }else{
                return true;
        }
}

//只允许输入数字字符
function teacherIdRegular(obj,str){
        if (!isEmptyOrBlank(str)) {
                var teacherIdRegular =/^[0-9]+$/;  //只允许输入数字字符
                if(str.length <=6){  //最低六位
                        obj.parent().next().show();
                        return false;
                }
		if (!teacherIdRegular.test(str)) {
			obj.parent().next().show();
			return false;
		} else {
			return true;
		}
	} else {
		return false;
		obj.parent().next().show();
	}

}
//教师姓名中文判断
function chaneseRegular(obj,str){
        if (!isEmptyOrBlank(str)) {
                //只允许输入中文
		var teacherNameRegular = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
		if (!teacherNameRegular.test(str)) {
			obj.parent().next().show();
			return false;
		} else {
			return true;
		}
	} else {
		return false;
		obj.parent().next().show();
	}
}
//初始化文本框
function clearInput(obj){

        obj.teacherForm.find("input[type=text]").val('');
        obj.teacherId.parent().next().hide();
        obj.name.parent().next().hide();
        obj.department.parent().next().hide();
}

function emptyDecide(obj){
	if(!emptyRegular(obj.teacherId,obj.teacherId.val())){
		return false;
	}
	if(!chaneseRegular(obj.name,obj.name.val())){
		return false;
	}
	if(!emptyRegular(obj.sex,obj.sex.val())){
		return false;
	}
	if(!chaneseRegular(obj.department,obj.department.val())){
		return false;
	}
	if(!emptyRegular(obj.identity,obj.identity.val())){
		return false;
	}

	return true;
}
//入口函数
$(function(){
        var teacherInfo ;//存储后台返回的教师信息
        var labInfo; ////存储后台返回的实验室信息
        var searchInfo //存储后台返回的搜索框搜索信息
        //创建教师表格信息
        function createTable(index,value){
                var $item = $(
                            "<tr class='teacherList'>" +
                            "<td><input name='ids' type='checkbox' class='checkBox'></td>" +
                            "<td class='del'>" + value.teacherId + "</td>" +
                            "<td>" + value.name + "</td>" +
                            "<td>" + value.sex + "</td>" +
                            "<td>" + value.department + "</td>" +
                            // "<td>" + value.labName + "</td>" +
                            "<td>" + value.identity + "</td>" +
                            " <td class='text-center'>" +
                            " <button type='button' class='btn bg-olive btn-xs' data-toggle='modal'  data-target='#myModalAlter'  id = 'addFace'>添加</button>" +
                            " <button type='button' class='btn bg-olive btn-xs'  id ='alterTeacherBtn' data-toggle='modal'  >编辑</button>" +
                            "</td>" +
                            "</tr>");

                $item.get(0).obj = value;
                return $item;
        }
        //获取所有的教师信息
        function getAllTeacherInfo(){
		var page;
		if(window.location.search ==''){
			page = "?page=1";
		}else{
			page = window.location.search;
		}
                $.ajax({
                        url: '../js/teachers.json',
                        // type: 'default GET (Other values: POST)',
                        dataType: 'json',
                        success:function(data){
                                //返回success
				// setPages()
                                if(data.message === "success"){
                                        var tbody =  $("#tbody");
                                        tbody.empty();
                                        teacherInfo =data.data;
                                        $.each(teacherInfo,function(index, el) {
                                                var $item = createTable(index ,el);
                                                tbody.append($item);
                                        });
                                }else{

                                }

                        },
                        error:function(data){
                                alert("请求失败")
                        }
                });
        }//获取所有的教师信息--结束
         //获取所有的实验室信息
        function getAllLabInfo(){

                $.ajax({
                        url: '../js/laboratory.json',
                        // type: 'default GET (Other values: POST)',
                        dataType: 'json',
                        success:function(data){
                                var select =  $("#select");
                                select.empty();
                                labInfo =data.labName;
                                select.prepend($(" <option class='selectItem'  value='" +"全部"+ "' >"  +"全部"+ '</option>'));
                                $.each(labInfo,function(index, el) {
                                        select.append($(" <option class='selectItem' value='" +el+ "' >"  + el+ '</option>'));
                                })
                                labListListener();//监听实验室列表
                        },
                        error:function(data){
                                alert("请求失败")
                        }
                });
        }   //获取所有的实验室信息--结束
        //删除教师信息
        function delTeacher(){
                var arrData=[];
                json = null;
                 //监听删除教师按钮
                $('#delTeacher').click(function(event) {
                        var  check =  $("#tbody input[type='checkbox']");
                        $.each(check,function(index, el) {
                                if($(el).attr('check') == 'checked'){
                                        var line = $(el).parent().parent();
                                        var value = line.find('.del').html();
                                        line.remove();
                                        for(var i = 0; i < teacherInfo.length; i++){
                                                if(teacherInfo[i].teacherId == value){
                                                        var arr = teacherInfo.splice($.inArray(teacherInfo[i],teacherInfo),1);
                                                        arrData.push(arr[0].teacherId);
                                                }
                                        }
                                        $("#selall").iCheck('uncheck');
                                }
                        });//each  --结束
                         json = {studentId:arrDate};
                        // $.ajax({
                        //         type:"delete",
                        //         url:"/students",
                        //         contentType:"application/json;charset=utf-8",
                        //         dataType:"json",
                        //         data:JSON.stringify(json),
                        //         processData:false,
                        //         success:function(data){
                        //                 var timer = null;
                        //                 if(timer){
                        //                     clearInterval(timer);
                        //                 }
                        //                 var tipsDiv = '<div id="tipsClass">' + '删除成功!' + '</div>';
                        //                 $( 'body' ).append( tipsDiv );
                        //                 $( '#tipsClass' ).css({
                        //                     'position': 'absolute',
                        //                     'float':'left',
                        //                     'left':'50%',
                        //                     'margin-top':'-200px',
                        //                     'top':'50%',
                        //                     'background':'#eee',
                        //                     'width'  : '150px',
                        //                     'height'  : '30px',
                        //                     'z-index':5,
                        //                     'text-align':'center',
                        //                     'line-height':'30px',
                        //                     'border-radius':'20px'
                        //                 });
                        //                 timer = setTimeout( function(){
                        //                     $( '#tipsClass' ).fadeOut();
                        //                     $( '#tipsClass' ).remove();
                        //                 }, 2000  );
                        //         },
                        //         error:function(data){
                        //                 alert("请求失败")
                        //         }
                        // });  //ajax请求
                });  //监听删除教师按钮----结束
        } //删除教师信息-----结束
        //监听实验室列表
        function labListListener(){
                $('#select').change(function(event) {  //监听实验室列表
                        var text = $('#select').find('option:selected').html();
                        var tbody = $('#tbody');
                        tbody.empty();
                        $.each(teacherInfo,function(index, el) {
                                if(el.labName == text){
                                        var $item = createTable(index,el);
                                        tbody.append($item);
                                }else if( text == "全部"){
                                        var $item = createTable(index,el);
                                        tbody.append($item);
                                }
                        });  //监听实验室列表--结束
                });
        }//监听实验室列表---结束



        //监听全选按钮
        $("#selall").click(function(event) {
                var clicks = $(this).is(":checked");
                if(!clicks){
                        $("#teacherTable tr td input[type='checkbox']").iCheck("uncheck");
                        $("#teacherTable tr td input[type='checkbox']").attr("check","unchecked");
                }else{
                        $("#teacherTable tr td input[type='checkbox']").iCheck("check");
                        $("#teacherTable tr td input[type='checkbox']").attr("check","checked");
                }
                $(this).data("clicks", !clicks);
        });//监听全选按钮--结束

        //监听复选按钮
        var checkBoxListener = function checkBoxListener(){
                var obj = $(this);
                var clicks =obj.is(':checked');
                if(!clicks){
                        obj.iCheck("check");
                        obj.attr("check","checked");
                }else{
                        obj.iCheck("uncheck");
                        obj.attr("check","unchecked");
                }
                var count = 0; //监听复选框选中的数量
                var  all = $('#tbody input');
                $.each(all,function(index, el) {
                        if($(el).attr('check') == 'checked'){
                                count = count + 1;
                                if(count == all.length){
                                        $('#selall').iCheck('check');
                                        count = 0;
                                }else{
                                        $('#selall').iCheck('uncheck');
                                }
                        }
                });
        }//监听复选按钮-结束
        //监听复选按钮
        $("#tbody").delegate('.checkBox','click', checkBoxListener);
        //监听表格行的复选行为
        var tableRowListener = function tableRowListener(){
                var obj = $(this).find('.checkBox');
                var clicks = obj.is(':checked');
                if(!clicks){
                         obj.iCheck("check");
                        obj.attr("check","checked");
                }else{
                        obj.iCheck("uncheck");
                        obj.attr("check","unchecked");
                }
                var count = 0; //监听复选框选中的数量
                var  all = $('#tbody input');
                $.each(all,function(index, el) {
                        if($(el).attr('check') == 'checked'){
                                count = count + 1;
                                if(count == all.length){
                                        $('#selall').iCheck('check');
                                        count = 0;
                                }else{
                                        $('#selall').iCheck('uncheck');
                                }
                        }
                });
        }//监听表格行的复选行为--结束
        $("#tbody").delegate('.teacherList','click', tableRowListener); //监听表格行的复选行为
        //正则判断函数
        function funRegular(obj){
                //教职工号输入框获取焦点时

                obj.teacherId.focus(function(event) {
                        obj.teacherId.parent().next().hide();
                });
                //教职工号输入框失去焦点时
                obj.teacherId.blur(function () {
                        teacherIdRegular(obj.teacherId,obj.teacherId.val());
                });

                //教师姓名输入框获取焦点时
                obj.name.focus(function(event) {
                        obj.name.parent().next().hide();
                });
                //教师姓名输入框获取焦点时
                obj.name.blur(function () {
                        chaneseRegular(obj.name,obj.name.val());
                });

                //教师部门输入框获取焦点时
                obj.department.focus(function(event) {
                        obj.department.parent().next().hide();
                });
                //教师部门输入框获取焦点时
                obj.department.blur(function () {
                        chaneseRegular(obj.department,obj.department.val());
                });
        }//正则判断函数--结束
        //添加教师信息---模态框
        function addTeacher(){
                //获取模态框中输入框对象
                var teacherId = $('#addTeacherId');
                var name = $('#addName');
                var sex = $('#addSex');
                var department = $('#addDepartment');
                var identity = $('#addIdentity');
                var teacherForm = $('#addTeacherForm');
                var json = null;
                var  addObj = {
                        "teacherForm":teacherForm,
                        "teacherId":teacherId,
                        "name":name,
                        "sex":sex,
                        "department":department,
                        "identity":identity,
                };

                funRegular(addObj);//正则判断函数
                $('#addTeacherBtn').click(function(event) { //监听提交按钮
			if(!emptyDecide(addObj)){
				console.log(1);
                                return false;
                        }
                        json = {
                                "teacherId":teacherId.val(),
                                "name":name.val(),
                                "sex":sex.find("option:selected").html(),
                                "department":department.val(),
                                "identity":identity.val(),
                        };
			console.log(json);
                          // $('#myModalAdd').on('hidden.bs.modal', function () {
                          //         clearInput(addObj);
                          // }

                        //ajax请求
                        // $.ajax({
                        //         type: "post",
                        //         url: "/students",
                        //         contentType: "application/json; charset=utf-8",
                        //         data:JSON.stringify(json),
                        //         dataType: 'json',
                        //         processData: false,
                        //         async: true,
                        //         success: function (data) {
                        //                 if(data.message == "success"){
                        //
                        //                     $('#addTeacherModal').modal('hide');
                        //                         getAllStudents();
                        //                     $('#addTeacherModal').on('hidden.bs.modal', function () {
                        //                         // document.getElementById("studentForm").reset();
                        //                        clearInput(addObj);
                        //                         var timer = null;
                        //                         if(timer){
                        //                             clearInterval(timer);
                        //                         }
                        //                         var tipsDiv = '<div id="tipsClass">' + '添加成功!' + '</div>';
                        //                         $( 'body' ).append( tipsDiv );
                        //                         $( '#tipsClass' ).css({
                        //                             'position': 'absolute',
                        //                             'float':'left',
                        //                             'left':'50%',
                        //                             'margin-top':'-200px',
                        //                             'top':'50%',
                        //                             'background':'#eee',
                        //                             'width'  : '150px',
                        //                             'height'  : '30px',
                        //                             'z-index':5,
                        //                             'text-align':'center',
                        //                             'line-height':'30px',
                        //                             'border-radius':'20px'
                        //                         });
                        //                         timer = setTimeout( function(){
                        //                             $( '#tipsClass' ).fadeOut();
                        //                             $( '#tipsClass' ).remove();
                        //                         }, 2000  );
                        //
                        //
                        //                 });  //ajax结束
                });//监听提交按钮--结束
        }//---添加教师信息 --结束

        //修改教师信息
        function alterTeacher(){
                var teacherId = $('#alterTeacherId');
                var name = $('#alterName');
                var sex = $('#alterSex');
                var department = $('#alterDepartment');
                var identity = $('#alterIdentity');
                var teacherForm = $('#alterTeacherForm');
                var json = null;
		  $('#alterTeacherModal').on('hidden.bs.modal', function () {
			  sex.empty();
			  identity.empty();
			  identity.append($("<option class='selectItem' value='教师' >教师</option>"));
			  identity.append($("<option class='selectItem' value='讲师' >讲师</option>"));
			  identity.append($("<option class='selectItem' value='辅导员' >辅导员</option>"));
			  sex.append($("<option class='selectItem' value='男' >男</option>"));
			  sex.append($("<option class='selectItem' value='女' >女</option>"));
		  });
                $('#tbody').delegate('#alterTeacherBtn', 'click', function(event) {
                        event.stopPropagation();  //清除冒泡行为
                        var data= $(this).parent().parent().get(0).obj;
			console.log(data);
                        teacherId.val(data.teacherId);
                        name.val(data.name);
                        sex.find("option:contains('"+data.sex+"')").attr('selected', true);
                        department.val(data.department);
                        identity.find("option:contains('"+data.identity+"')").attr('selected', true);

			var  addObj = {
				"teacherForm":teacherForm,
				"teacherId":teacherId,
				"name":name,
				"sex":sex,
				"department":department,
				"identity":identity,
			};

			funRegular(addObj);//正则判断函数
                        $('#alterTeacherModal').modal();  //弹出模态框
			$('#alterTeacherSubBtn').unbind('click');
                        $('#alterTeacherSubBtn').click(function(event) {  //编辑教师信息模态框的提交按钮
				event.stopPropagation();  //清除冒泡行为
				if(!emptyDecide(addObj)){
					return false;
				}
				json = {
                                        "teacherId":teacherId.val(),
                                        "name":name.val(),
                                        "sex":sex.find("option:selected").html(),
                                        "department":department.val(),
                                        "identity":identity.val(),
                                };
				console.log(json);
                                //ajax请求
                                // $.ajax({
                                //         type: "put",
                                //         url: "/students",
                                //         contentType: "application/json; charset=utf-8",
                                //         data:JSON.stringify(json),
                                //         dataType: 'json',
                                //         processData: false,
                                //         async: true,
                                //         success: function (data) {
                                //                 if(data.message == "success"){
                                //                     $('#myModalAlter').modal('hide');
                                //                     $('#myModalAlter').on('hidden.bs.modal', function () {
                                //                         getAllStudents();
                                //                         var timer = null;
                                //                         if(timer){
                                //                             clearInterval(timer);
                                //                         }
                                //                         var tipsDiv = '<div id="tipsClass">' + '修改成功!' + '</div>';
                                //                         $( 'body' ).append( tipsDiv );
                                //                         $( '#tipsClass' ).css({
                                //                             'position': 'absolute',
                                //                             'float':'left',
                                //                             'left':'50%',
                                //                             'margin-top':'-200px',
                                //                             'top':'50%',
                                //                             'background':'#eee',
                                //                             'width'  : '150px',
                                //                             'height'  : '30px',
                                //                             'z-index':5,
                                //                             'text-align':'center',
                                //                             'line-height':'30px',
                                //                             'border-radius':'20px'
                                //                         });
                                //                         timer = setTimeout( function(){
                                //                             $( '#tipsClass' ).fadeOut();
                                //                             $( '#tipsClass' ).remove();
                                //                         }, 2000  );
                                //                     });
                                //
                                //                 }else{
                                //                         alert("修改失败!")
                                //                 }
                                //         },
                                //         error: function (error) {
                                //                 alert("请求失败！");
                                //         }
                                // });//ajax请求
                        }); //编辑教师信息模态框的提交按钮

                });

        }//修改教师信息---结束
        //添加教师人脸信息
        function addFaceTeacher(){
                $("#tbody").delegate('#addFace', 'click', function(event) {
                        var data= $(this).parent().parent().get(0).obj;
                        var teacherFaceId = data.teacherId;
                        $('#addFaceModal').modal();  //弹出模态框
                        event.stopPropagation();  //清除冒泡行为
                });
        }//添加教师人脸信息
        //搜索教师信息
        function searchTeacherInfo(){
                var searchTeacher = $('#searchTeacher');
                var searchTeacherBtn = $('#searchTeacherBtn');

                searchTeacherBtn.click(function(event) {

                        var json = {
                                "inputValue":searchTeacher.val()
                        }
                        $.ajax({
                                type: "post",
                                url: "/students",
                                contentType: "application/json; charset=utf-8",
                                dataType:'json',
                                data:JSON.stringify(json),
                                processData: false,
                                success: function (data) {
                                        var tbody =  $("#tbody");
                                        tbody.empty();
                                        searchInfo =data.data;
                                        $.each(searchInfo,function(index, el) {
                                                var $item = createTable(index ,el);
                                                tbody.append($item);
                                        });
                                },
                                error: function (error) {
                                        alert("请求失败！");
                                }
                        });//ajax
                });//单击按钮
                $("body").keydown(function() {
                             if (event.keyCode == "13") {//keyCode=13是回车键
                                        if(searchTeacher.is(":focus")){
                                                   searchTeacherBtn.click();
                                                   searchTeacher.blur();
                                                   searchTeacher.val('');
                                         }else{
                                                  searchTeacher.focus();
                                         }
                             }
                 });
        } //搜索教师信息

        searchTeacherInfo()//搜索教师信息

        addFaceTeacher();//添加教师人脸信息

        getAllTeacherInfo();     //获取所有的教师信息   ++++  分页

        getAllLabInfo();     //获取所有的实验室信息

        delTeacher()   //删除教师信息

        addTeacher()//添加教师信息

        alterTeacher()//修改教师信息













});//入口函数---结束
