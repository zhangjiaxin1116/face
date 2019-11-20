var teacherInfo ;//存储后台返回的教师信息
var labInfo; ////存储后台返回的实验室信息
var searchInfo //存储后台返回的搜索框搜索信息

//判断字符串是否为空的工具函数
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

//只允许输入少于六位数字字符
function idRegular(obj,str){
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
		obj.parent().next().show();
		return false;

	}

}
//只允许输入数字字符
function numberRegular(obj,str){
        if (!isEmptyOrBlank(str)) {
                var teacherIdRegular =/^[0-9]+$/;  //只允许输入数字字符
		if (!teacherIdRegular.test(str)) {
			obj.parent().next().show();
			return false;
		} else {
			return true;
		}
	} else {
		obj.parent().next().show();
		return false;

	}

}
//中文判断
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
		obj.parent().next().show();
		return false;
	}
}
//添加实验室判断是否为空
function emptyDecide(obj){

	if(!numberRegular(obj.labId,obj.labId.val())){
		return false;
	}
	if(!emptyRegular(obj.name,obj.name.val())){
		return false;
	}
	if(!emptyRegular(obj.address,obj.address.val())){
		return false;
	}
	if(!chaneseRegular(obj.department,obj.department.val())){
		return false;
	}
	if(!numberRegular(obj.current,obj.current.val())){
		return false;
	}
	if(!numberRegular(obj.max,obj.max.val())){
		return false;
	}
	return true;
}
//正则判断函数
function funRegular(obj){
        //实验室ID框获取焦点时
        obj.labId.focus(function(event) {
                obj.labId.parent().next().hide();
        });
        //实验室ID输入框获取焦点时框失去焦点时
        obj.labId.blur(function () {
                numberRegular(obj.labId,obj.labId.val());
        });

        //实验室可容纳人数框获取焦点时
        obj.max.focus(function(event) {
                obj.max.parent().next().hide();
        });
        //实验室可容纳人数失去焦点时
        obj.max.blur(function () {
                numberRegular(obj.max,obj.max.val());
        });

        //实验室现有人数框获取焦点时
        obj.current.focus(function(event) {
                obj.current.parent().next().hide();
        });
        //实验室现有人数框失去焦点时
        obj.current.blur(function () {
                numberRegular(obj.current,obj.current.val());
        });

        //实验室姓名输入框获取焦点时
        obj.name.focus(function(event) {
                obj.name.parent().next().hide();
        });
        //实验室姓名输入框获取焦点时
        obj.name.blur(function () {
                chaneseRegular(obj.name,obj.name.val());
        });

        //实验室部门输入框获取焦点时
        obj.department.focus(function(event) {
                obj.department.parent().next().hide();
        });
        //实验室部门输入框获取焦点时
        obj.department.blur(function () {
                chaneseRegular(obj.department,obj.department.val());
        });
}//正则判断函数--结束
//初始化文本框
function clearInput(obj){
        console.log("我执行了");
        obj.labForm.find("input[type=text]").val(' ');
        obj.labId.parent().next().hide();
        obj.name.parent().next().hide();
        obj.department.parent().next().hide();
        obj.max.parent().next().hide();
        obj.current.parent().next().hide();
}
//创建表格
function createTable(index,value){
        var $item = $(
                    "<tr class='teacherList'>" +
                    "<td><input name='ids' type='checkbox' class='checkBox'></td>" +
                    "<td class='del'>" + value.labId + "</td>" +
                    "<td>" + value.name+ "</td>" +
                    "<td>" + value.address+ "</td>" +
                    "<td>" + value.director + "</td>" +
                    "<td>" + value.department + "</td>" +
                    "<td>" + value.state + "</td>" +
                    "<td>" + value.max + "</td>" +
                    "<td>" + value.current + "</td>" +
                    " <td class='text-center'>" +
                    " <button type='button' class='btn bg-olive btn-xs' data-toggle='modal'  data-target='#myModalAlter'  id = 'addFace'>添加</button>" +
                    " <button type='button' class='btn bg-olive btn-xs'  id ='alterLabBtn' data-toggle='modal'  >编辑</button>" +
                    "</td>" +
                    "</tr>");

        $item.get(0).obj = value;
        return $item;
}
//监听教师列表
function teacherListListener(obj){
        obj.change(function(event) {  //监听教师列表
                var text = obj.find('option:selected').html();
                var tbody = $('#tbody');
                tbody.empty();
                $.each(labInfo,function(index, el) {
                        if(el.director == text){
                                var $item = createTable(index,el);
                                tbody.append($item);
                        }else if( text == "全部"){
                                var $item = createTable(index,el);
                                tbody.append($item);
                        }
                });  //监听实验室列表--结束
        });
}//监听实验室列表---结束
$(function(){
        //获取所有的教师信息
        function getAllTeacherInfo(){
		var select =  $("#select");
                $.ajax({
                        url: '../js/labs.json',
                        // type: 'default GET (Other values: POST)',
                        dataType: 'json',
                        success:function(data){

                                var addDirector = $('#addLabDirector');
                                var alterDirector = $('#alterLabDirector');
				var addLogLab = $('#addLogLab');
                                select.empty();
                                teacherInfo =data.teacherName;
                                select.prepend($(" <option class='selectItem'  value='" +"全部"+ "' >"  +"全部"+ '</option>'));
                                $.each(teacherInfo,function(index, el) {
                                        addDirector.append($(" <option class='selectItem' value='" +el+ "' >"  + el+ '</option>'));
                                        select.append($(" <option class='selectItem' value='" +el+ "' >"  + el+ '</option>'));
                                        alterDirector.append($(" <option class='selectItem' value='" +el+ "' >"  + el+ '</option>'));
                                })
                                teacherListListener(select);//监听教师列表
                        },
                        error:function(data){
                                alert("请求失败")
                        }
                });
        }//获取所有的教师信息
        //获取所有的实验室信息
        function getAllLabInfo(){
                $.ajax({
                        url: '../js/labs.json',
                        dataType: 'json',
                        success:function(data){
                                if(data.message === "success"){
                                        var tbody =  $("#tbody");
                                        tbody.empty();
                                        labInfo =data.data;

                                        $.each(labInfo,function(index, el) {
                                                var $item = createTable(index ,el);
                                                tbody.append($item);
                                        });
                                }else{

                                }
                        },
                        error:function(){
                                alert("请求失败")
                        }
                });
        }  //获取所有的实验室信息

        //搜索教师信息
        function searchTeacherInfo(){
                var searchTeacher = $('#searchLab');
                var searchTeacherBtn = $('#searchLabBtn');

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

        function checkBoxListener(){
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
        } //监听复选框操作
        //删除教师信息
        function delLab(){
                var arrData=[];
                json = null;
                 //监听删除教师按钮
                $('#delBtn').click(function(event) {
                        var  check =  $("#tbody input[type='checkbox']");
                        $.each(check,function(index, el) {
                                if($(el).attr('check') == 'checked'){
                                        var line = $(el).parent().parent();
                                        var value = line.find('.del').html();
                                        line.remove();
                                        for(var i = 0; i < labInfo.length; i++){
                                                if(labInfo[i].labId == value){
                                                        var arr = labInfo.splice($.inArray(labInfo[i],labInfo),1);
                                                        arrData.push(arr[0].labId);
                                                }
                                        }
                                        $("#selall").iCheck('uncheck');
                                }
                        });//each  --结束
                         json = {studentId:arrData};
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
        //添加实验室信息
        function addLab(){
                //获取模态框中输入框对象
                var labId = $('#addLabId');
                var name = $('#addLabName');
                var address = $('#addLabAddress');
                var director = $('#addLabDirector');
                var department = $('#addLabDepartment');
                var state = $('#addLabState');
                var max = $('#addLabMax');
                var current = $('#addLabCurrent');
                var labForm = $('#addLabForm');
                var json = null;
                var  addObj = {
                        "labForm":labForm,
                        "labId":labId,
                        "name":name,
                        "address":address,
                        "director":director,
                        "department":department,
                        "state":state,
                        "max":max,
                        "current":current,
                };  // 传入正则的对象
		funRegular(addObj);//正则判断函数
                $('#addSubBtn').click(function(event) { //监听添加模态框提交按钮
			if(!emptyDecide(addObj)){
                                return false;
                        }
                        json = {
                                "labId":labId.val(),
                                "name":name.val(),
                                "address":address.val(),
                                "director":director.val(),
                                "department":department.val(),
                                "state":state.val(),
                                "max":max.val(),
                                "current":current.val(),
                        };
                        console.log(json);
                        $('#addLabModal').on('hidden.bs.modal', function () {
                                  clearInput(addObj);
                        });
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
        }//---添加实验室信息 --结束
        //修改实验室信息
        function alterLab(){
                var labId = $('#alterLabId');
                var name = $('#alterLabName');
                var address = $('#alterLabAddress');
                var director = $('#alterLabDirector');
                var department = $('#alterLabDepartment');
                var state = $('#alterLabState');
                var max = $('#alterLabMax');
                var current = $('#alterLabCurrent');
                var labForm = $('#alterLabForm');
                var json = null;
		// $('#tbody').unbind('click');
		$('#alterLabModal').on('hidden.bs.modal', function () {
			// console.log('我关了');
			director.empty();
			state.empty();
			$.each(teacherInfo,function(index, el) {
				director.append($(" <option class='selectItem' value='" +el+ "' >"  + el+ '</option>'));
			})
			state.append($(" <option class='selectItem'>开放</option>"));
			state.append($(" <option class='selectItem'>关闭</option>"));

		});
                $('#tbody').delegate('#alterLabBtn', 'click', function(event) {
                        event.stopPropagation();  //清除冒泡行为
                        var data= $(this).parent().parent().get(0).obj;
                        labId.val(data.labId);
                        name.val(data.name);
                        state.find("option:contains('"+data.state+"')").attr('selected', true);
                        department.val(data.department);
                        address.val(data.address);
                        max.val(data.max);
                        current.val(data.current);
                        director.find("option:contains('"+data.director+"')").attr('selected', true);

                        var  addObj = {
                                "labForm":labForm,
                                "labId":labId,
                                "name":name,
                                "address":address,
                                "director":director,
                                "department":department,
                                "state":state,
                                "max":max,
                                "current":current,
                        };  // 传入正则的对象
                        $('#alterLabModal').modal();  //弹出模态框
			funRegular(addObj);//正则判断函数
			$('#alterSubBtn').unbind('click');
                        $('#alterSubBtn').click(function(event) {  //编辑教师信息模态框的提交按钮
				if(!emptyDecide(addObj)){
					console.log("我执行了");
	                                return false;
	                        }
                                json = {
                                        "labId":labId.val(),
                                        "name":name.val(),
                                        "address":address.val(),
                                        "director":director.val(),
                                        "department":department.val(),
                                        "state":state.val(),
                                        "max":max.val(),
                                        "current":current.val()
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
                                //                     $('#alterLabModal').modal('hide');
                                //                     $('#alterLabModal').on('hidden.bs.modal', function () {
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
        checkBoxListener();//监听复选框操作

        delLab()//删除实验室信息

        getAllLabInfo();//获取所有的实验室信息

        getAllTeacherInfo();//获取所有的教师信息

        searchTeacherInfo()//搜索实验室信息

        addLab()//添加实验室信息

        alterLab()//修改教师信息














});
