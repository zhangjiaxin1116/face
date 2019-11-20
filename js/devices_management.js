var teacherInfo ;//存储后台返回的教师信息
var labInfo; ////存储后台返回的实验室信息
var searchInfo //存储后台返回的搜索框搜索信息
var deviceInfo //存储后台返回的设备信息
var deviceLogInfo////存储后台返回的设备日志信息
//创建表格
function createTable(index,value){
        var $item = $(
                    "<tr class='teacherList'>" +
                    "<td><input name='ids' type='checkbox' class='checkBox'></td>" +
                    "<td class='del'>" + value.deviceId + "</td>" +
                    "<td>" + value.name+ "</td>" +
                    "<td>" + value.max+ "</td>" +
                    "<td>" + value.loan + "</td>" +
                    "<td>" + value.demage + "</td>" +
                    "<td>" + value.remain + "</td>" +
                    "<td>" + value.labId + "</td>" +
                    " <td class='text-center'>" +
                    // " <button type='button' class='btn bg-olive btn-xs' data-toggle='modal'  data-target='#myModalAlter'>添加</button>" +
                    " <button type='button' class='btn bg-olive btn-xs'  id ='alterDeviceBtn' data-toggle='modal' value='"+index+"'  >编辑</button>" +
                    "</td>" +
                    "</tr>");
        $item.get(0).obj = value;
        return $item;
}
//创建设备日志
function createLogInfo(index,value){
        var $item = $(`
                <div class="accordion" id="accordion${index}">
                        <div class="accordion-group">
                                <div class="accordion-heading">
                                        <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion${index}" href="#collapse${index}">
                                                <label for="" class="select">${value.labName}   ${value.date} </label>
                                        </a>
                                        <button type='button' class='btn bg-yellow btn-xs pull-right '  id ='alterLog' data-toggle='modal' style="margin-left:5px;">编辑</button>
                                        <button type='button' class='btn bg-blue btn-xs pull-right '  id ='alterLog' data-toggle='modal'   >删除</button>
                                </div>
                                <div id="collapse${index}" class="accordion-body collapse" style="height: 0px; ">
                                        <div class="accordion-inner">
                                                ${value.content}
                                        </div>
                                </div>
                        </div>
                </div>`);
                // console.log($item.get(0));
                $item.get(0).obj = value;
                return $item;
}//创建设备日志
//判断字符串是否为空
function isEmptyOrBlank(str) {
	if (str == null || str.length == 0) {
		return true;
	} else {
		return false;
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
		return false;
		obj.parent().next().show();
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
                obj.parent().next().show();
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
function emptyDecide(obj){
        if( !numberRegular(obj.deviceId,obj.deviceId.val())){
                return false;
        }
        if( !emptyRegular(obj.name,obj.name.val())){
                return false;
        }
        if( !numberRegular(obj.max,obj.max.val())){
                return false;
        }
        if( !numberRegular(obj.loan,obj.loan.val())){
                return false;
        }
        if( !numberRegular(obj.demage,obj.demage.val())){
                return false;
        }
        if( !numberRegular(obj.remain,obj.remain.val())){
                return false;
        }

        return true;
}
//正则判断函数
function funRegular(obj){

        //设备ID框获取焦点时
        obj.deviceId.focus(function(event) {
                obj.deviceId.parent().next().hide();
        });
        //设备ID框获取焦点时D输入框获取焦点时框失去焦点时
        obj.deviceId.blur(function () {
                numberRegular(obj.deviceId,obj.deviceId.val());
        });

        //设备name不能为空
        obj.name.focus(function(event) {
                obj.name.parent().next().hide();
        });
        //设备name不能为空失去焦点
        obj.name.blur(function () {
                 emptyRegular(obj.name,obj.name.val());

        });

        //设备总数量框获取焦点时
        obj.max.focus(function(event) {
                obj.max.parent().next().hide();
        });
        //设备总数量框获取焦点时失去焦点时
        obj.max.blur(function () {

                 numberRegular(obj.max,obj.max.val());
        });


        //设备借出数框获取焦点时
        obj.loan.focus(function(event) {
                obj.loan.parent().next().hide();
        });
        //设备借出数框失去焦点时
        obj.loan.blur(function () {

                  numberRegular(obj.loan,obj.loan.val());
        });


        //设备损坏输入框获取焦点时
        obj.demage.focus(function(event) {
                obj.demage.parent().next().hide();
        });

        //设备损坏输入框失去焦点时
        obj.demage.blur(function () {

                  numberRegular(obj.demage,obj.demage.val());
        });

        //设备现有数量输入框获取焦点时
        obj.remain.focus(function(event) {
                obj.remain.parent().next().hide();
        });
        //设备现有数量输入框获取焦点时
        obj.remain.blur(function () {

                  numberRegular(obj.remain,obj.remain.val());
        });


}//正则判断函数--结束

//初始化文本框
function clearInput(obj){

        obj.deviceForm.find("input[type=text]").val('');
        obj.deviceId.parent().next().hide();
        obj.name.parent().next().hide();
        obj.loan.parent().next().hide();
        obj.demage.parent().next().hide();
        obj.max.parent().next().hide();
        obj.remain.parent().next().hide();
        obj.deviceLab.parent().next().hide();
}
function checkBoxListener(){
        //监听全选按钮
        $("#selall").click(function(event) {
                var clicks = $(this).is(":checked");
                if(!clicks){
                        $("#infoTable tr td input[type='checkbox']").iCheck("uncheck");
                        $("#infoTable tr td input[type='checkbox']").attr("check","unchecked");
                }else{
                        $("#infoTable tr td input[type='checkbox']").iCheck("check");
                        $("#infoTable tr td input[type='checkbox']").attr("check","checked");
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



$(function(){
        function getAllDeviceInfo(){
                $.ajax({
                        url: '../js/device.json',
                        dataType: 'json',
                        success:function(data){
                                if(data.message === "success"){
                                        var tbody =  $("#tbody");
                                        tbody.empty();
                                        deviceInfo =data.data;
                                        $.each(deviceInfo,function(index, el) {
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
        }
        //搜索教师信息
        function searchDeviceInfo(){
                var searchTeacher = $('#searchInput');
                var searchTeacherBtn = $('#searchBtn');

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

        //获取实验室下拉列表信息
        function labList(){
                var selectLab =  $("#selectLab");
                var selectLogLab =  $("#selectLogLab");
                var addDeviceLab = $("#addDeviceLab");
                var alterDeviceLab =$('#alterDeviceLab');
                $.ajax({
                        url: '../js/device.json',
                        // type: 'default GET (Other values: POST)',
                        dataType: 'json',
                        success:function(data){
                                alterDeviceLab.empty();
                                selectLab.empty();
                                selectLogLab.empty();
                                addDeviceLab.empty();
                                labInfo =data.labName;
                                selectLab.prepend($(" <option class='selectItem'  value='" +"全部"+ "' >"  +"全部"+ '</option>'));
                                $.each(labInfo,function(index, el) {
                                        selectLab.append($(" <option class='selectItem' value='" +el+ "' >"  + el+ '</option>'));
                                        selectLogLab.append($(" <option class='selectItem' value='" +el+ "' >"  + el+ '</option>'));
                                        addDeviceLab.append($(" <option class='selectItem' value='" +el+ "' >"  + el+ '</option>'));
                                        alterDeviceLab.append($(" <option class='selectItem' value='" +el+ "' >"  + el+ '</option>'));
                                })
                                selectLab.change(function(event) {  //监听实验室列表
                                        var text = selectLab.find('option:selected').html();
                                        var tbody = $('#tbody');
                                        tbody.empty();
                                        $.each(deviceInfo,function(index, el) {
                                                if(el.labId == text){
                                                        var $item = createTable(index,el);
                                                        tbody.append($item);
                                                }else if( text == "全部"){
                                                        var $item = createTable(index,el);
                                                        tbody.append($item);
                                                }
                                        });  //监听实验室列表--结束
                                });
                        },
                        error:function(data){
                                alert("请求失败")
                        }
                });
        }//获取实验室下拉列表信息
        //获取设备下拉列表信息
        function deviceList(){
                var selectDevice =  $("#selectDevice");
                $.ajax({
                        url: '../js/device.json',
                        // type: 'default GET (Other values: POST)',
                        dataType: 'json',
                        success:function(data){
                                selectDevice.empty();
                                deviceInfo =data.deviceName;
                                selectDevice.prepend($(" <option class='selectItem'  value='" +"全部"+ "' >"  +"全部"+ '</option>'));
                                $.each(deviceInfo,function(index, el) {
                                        selectDevice.append($(" <option class='selectItem' value='" +el+ "' >"  + el+ '</option>'));
                                })
                                selectDevice.change(function(event) {  //监听设备列表
                                        var text = selectDevice.find('option:selected').html();
                                        var tbody = $('#tbody');
                                        tbody.empty();
                                        $.each(deviceInfo,function(index, el) {
                                                if(el.name == text){
                                                        var $item = createTable(index,el);
                                                        tbody.append($item);
                                                }else if( text == "全部"){
                                                        var $item = createTable(index,el);
                                                        tbody.append($item);
                                                }
                                        });
                                });//监听设备列表--结束
                        },
                        error:function(data){
                                alert("请求失败")
                        }
                });
        }//        //获取设备下拉列表信息
        //删除设备信息
        function delDevice(){
                var arrData=[];
                json = null;
                 //监听删除设备按钮
                $('#delBtn').click(function(event) {
                        var  check =  $("#tbody input[type='checkbox']");
                        $.each(check,function(index, el) {
                                if($(el).attr('check') == 'checked'){
                                        var line = $(el).parent().parent();
                                        var value = line.find('.del').html();
                                        line.remove();
                                        for(var i = 0; i < deviceInfo.length; i++){
                                                if(deviceInfo[i].deviceId == value){
                                                        var arr = deviceInfo.splice($.inArray(deviceInfo[i],deviceInfo),1);
                                                        arrData.push(arr[0].deviceId);
                                                }
                                        }
                                        $("#selall").iCheck('uncheck');
                                }
                        });//each  --结束
                         json = {studentId:arrData};
                         // console.log(json);
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
                        //                 alert("删除请求失败")
                        //         }
                        // });  //ajax请求
                });  //监听删除设备按钮----结束
        } //删除删除设备信息-----结束
        function addDeviceInfo(){  //添加设备
                var deviceForm = $('#addDeviceForm');
                var deviceId = $('#addDeviceId');
                var name = $('#addDeviceName');
                var max = $('#addDeviceMax');
                var loan = $('#addDeviceLoan');
                var demage = $('#addDeviceDemage');
                var remain = $('#addDeviceRemain');
                var deviceLab = $('#addDeviceLab');
                var json = null;
                var  obj = {
                        "deviceForm":deviceForm,
                        "deviceId":deviceId,
                        "name":name,
                        "max":max,
                        "loan":loan,
                        "demage":demage,
                        "remain":remain,
                        "deviceLab":deviceLab.find('option:selected')
                }// 传入正则的对象
                        funRegular(obj)

                $('#addDeviceModal').on('hidden.bs.modal', function () {
                          clearInput(obj);
                });

                $('#addDeviceSubBtn').click(function(event) {//监听添加模态框提交按钮
                        if(!emptyDecide(obj)){
                                return false;
                        }
                        var json = {
                                "deviceId":deviceId.val(),
                                "name":name.val(),
                                "max":max.val(),
                                "loan":loan.val(),
                                "demage":demage.val(),
                                "remain":remain.val(),
                                "deviceLab":deviceLab.find('option:selected').val()
                        }
                        console.log(json);

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

        }//添加设备


        //获取设备日志的信息
        function getAllDeviceLog(){
                $.ajax({
                        url: '../js/device.json',
                        dataType: 'json',
                        success:function(data){
                                if(data.message === "success"){
                                        var containerLog = $('#containerLog');
                                        containerLog.empty();
                                        deviceLogInfo =data.deviceLog;
                                        $.each(deviceLogInfo,function(index, el) {
                                                var $item =  createLogInfo(index ,el);
                                                containerLog.append($item.get(0));
                                        });
                                }else{

                                }
                        },
                        error:function(){
                                alert("请求失败")
                        }
                });
        }//获取设备日志的信息--结束

        function alterDeviceInfo(){//修改设备信息
                var deviceForm = $('#alterDeviceForm');
                var deviceId = $('#alterDeviceId');
                var name = $('#alterDeviceName');
                var max = $('#alterDeviceMax');
                var loan = $('#alterDeviceLoan');
                var demage = $('#alterDeviceDemage');
                var remain = $('#alterDeviceRemain');
                var deviceLab = $('#alterDeviceLab');
                var json = null;
                var  obj = {
                        "deviceForm":deviceForm,
                        "deviceId":deviceId,
                        "name":name,
                        "max":max,
                        "loan":loan,
                        "demage":demage,
                        "remain":remain,
                        "deviceLab":deviceLab
                };  // 传入正则的对象
                $('#alterDeviceModal').on('hidden.bs.modal', function () {
                        deviceLab.empty();
                        $.each(labInfo,function(index, el) {
                                deviceLab.append($(" <option class='selectItem' value='" +el+ "' >"  + el+ '</option>'));
                        })

                });
                $('#tbody').delegate('#alterDeviceBtn','click',function(event) {
                          event.stopPropagation();  //清除冒泡行为
                          var deviceItem = $(this).parent().parent().get(0).obj;
                          deviceId.val(deviceItem.deviceId);
                          name.val(deviceItem.name);
                          max.val(deviceItem.max);
                          loan.val(deviceItem.loan);
                          demage.val(deviceItem.demage);
                          remain.val(deviceItem.remain);
                          deviceLab.find("option:contains('"+deviceItem.labId+"')").attr("selected", true);

                          $('#alterDeviceModal').modal();
                          funRegular(obj);
                          $('#alterDeviceSubBtn').unbind('click');
                          $('#alterDeviceSubBtn').click(function(event) {
                                  if(!emptyDecide(obj)){
                                          return false;
                                  }
                                  json ={
                                         "deviceId":deviceId.val(),
                                         "name":name.val(),
                                         "max":max.val(),
                                         "loan":loan.val(),
                                         "demage":demage.val(),
                                         "remain":remain.val(),
                                         "deviceLab":deviceLab.find("option:selected").text()
                                  }
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
                          });
                        //
                });
        }//修改设备信息
        addDeviceInfo()//添加设备
        checkBoxListener();//监听复选框操作
        getAllDeviceInfo();//获取所有的设备信息
        alterDeviceInfo();//修改设备信息
        searchDeviceInfo()//搜索设备信息
        labList()         //获取实验室列表信息
        deviceList()  //获取设备列表信息
        delDevice()//删除设备信息

       //设备日志
        getAllDeviceLog();//获取设备日志的信息






















































});
