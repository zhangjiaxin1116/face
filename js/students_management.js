var studentInfo ;
var studentFaceId;
$(function(){
        //获取学生
        getAllStudents();
        //获取实验室
        getAllLabName();
        //提交数据
        subStudentInfo();
      //修改信息
       alterStudentInfo();
       //添加人脸
       addFaceStudent();
       //添加人脸
      function addFaceStudent(){
              $("#tbody").delegate( '#addFace','click',function(event) {
                        var data= $(this).parent().parent().get(0).obj;
                        studentFaceId = data.studentId;
                        $("#addFaceModal").modal();
                        event.stopPropagation();
              });
      }
       //修改学生信息
        function alterStudentInfo(){
                var studentId = $('#studentId_alter');
                var name = $('#name_alter');
                var sex = $('#sex_alter');
                var grade = $('#grade_alter');
                var department = $('#department_alter');
                var major = $('#major_alter');
                var classes =$('#classes_alter');
                var labName = $('#labName_alter');

                var json=null;
                //编辑按钮
                $("#tbody").delegate( '#alterStudentInfo','click',function(event) {
                        event.stopPropagation();
                        var data= $(this).parent().parent().get(0).obj;
                        studentId.val(data.studentId);
                        name.val(data.name);
                        sex.find("option:contains('"+data.sex+"')").attr("selected", true);
                        grade.find("option:contains('"+data.grade+"')").attr("selected", true);
                        department.val(data.department);
                        major.val(data.major);
                        classes.find("option:contains('"+data.classes+"')").attr("selected", true);
                        labName.find("option:contains('"+data.labName+"')").attr("selected", true);
                        $("#myModalAlter").modal();
                });
                //修改学生信息的提交按钮
                $("#submit_alter").click(function(event) {
                        json = {
                            "studentId":studentId.val(),
                            "name":name.val(),
                            "sex":sex.find("option:selected").text(),
                            "grade":grade.find("option:selected").text(),
                            "department":department.val(),
                            "major":major.val(),
                            "classes":classes.find("option:selected").text(),
                            "labName":labName.find("option:selected").text()
                        }
                        $.ajax({
                                type: "put",
                                url: "/students",
                                contentType: "application/json; charset=utf-8",
                                data:JSON.stringify(json),
                                dataType: 'json',
                                processData: false,
                                async: true,
                                success: function (data) {
                                        if(data.message == "success"){
                                            $('#myModalAlter').modal('hide');
                                            $('#myModalAlter').on('hidden.bs.modal', function () {
                                                getAllStudents();
                                                var timer = null;
                                                if(timer){
                                                    clearInterval(timer);
                                                }
                                                var tipsDiv = '<div id="tipsClass">' + '修改成功!' + '</div>';
                                                $( 'body' ).append( tipsDiv );
                                                $( '#tipsClass' ).css({
                                                    'position': 'absolute',
                                                    'float':'left',
                                                    'left':'50%',
                                                    'margin-top':'-200px',
                                                    'top':'50%',
                                                    'background':'#eee',
                                                    'width'  : '150px',
                                                    'height'  : '30px',
                                                    'z-index':5,
                                                    'text-align':'center',
                                                    'line-height':'30px',
                                                    'border-radius':'20px'
                                                });
                                                timer = setTimeout( function(){
                                                    $( '#tipsClass' ).fadeOut();
                                                    $( '#tipsClass' ).remove();
                                                }, 2000  );
                                            });

                                        }else{
                                                alert("修改失败!")
                                        }
                                },
                                error: function (error) {
                                        alert("请求失败！");
                                }
                        });
                        event.stopPropagation();

                });
        }
        //添加学生的数据
        function subStudentInfo(){
                $('#submit').click(function(event) {
                         if($('#studentId').val().length <=6){
                             $('#studentId').parent().next().css('display', 'block');
                             return false;
                         }else{
                             $('#studentId').parent().next().css('display', 'none');
                         }
                         if($('#studentId').val() =='' ){
                                $('#studentId').parent().next().css('display', 'block');
                                return false;
                         }else{
                                $('#studentId').parent().next().css('display', 'none');
                         }
                         if($('#name').val() ==''){
                                 $('#name').parent().next().css('display', 'block');
                                return false;
                         }else{
                                $('#name').parent().next().css('display', 'none');
                         }
                         if($('#department').val() ==''){
                                $('#department').parent().next().css('display', 'block');
                                return false;
                         }else{
                                $('#department').parent().next().css('display', 'none');
                         }
                         if($('#major').val() ==''){
                                $('#major').parent().next().css('display', 'block');
                                return false;
                         }else{
                                $('#major').parent().next().css('display', 'none');
                         }
                        var studentId = $('#studentId').val();
                        var name = $('#name').val();
                        var sex = $('#sex').val();
                        var grade = $('#grade').val();
                        var department = $('#department').val();
                        var major = $('#major').val();
                        var classes =$('#classes').val();
                        var labName = $('#labName').val();

                        var json = {
                                "studentId":studentId,
                                "name":name,
                                "sex":sex,
                                "grade":grade,
                                "department":department,
                                "major":major,
                                "classes":classes,
                                "labName":labName
                        }
                        $.ajax({
                                type: "post",
                                url: "/students",
                                contentType: "application/json; charset=utf-8",
                                data:JSON.stringify(json),
                                dataType: 'json',
                                processData: false,
                                async: true,
                                success: function (data) {
                                        if(data.message == "success"){

                                            $('#myModalAdd').modal('hide');
                                                getAllStudents();
                                            $('#myModalAdd').on('hidden.bs.modal', function () {
                                                // document.getElementById("studentForm").reset();
                                                $("#studentForm input:text").val('');
                                                var timer = null;
                                                if(timer){
                                                    clearInterval(timer);
                                                }
                                                var tipsDiv = '<div id="tipsClass">' + '添加成功!' + '</div>';
                                                $( 'body' ).append( tipsDiv );
                                                $( '#tipsClass' ).css({
                                                    'position': 'absolute',
                                                    'float':'left',
                                                    'left':'50%',
                                                    'margin-top':'-200px',
                                                    'top':'50%',
                                                    'background':'#eee',
                                                    'width'  : '150px',
                                                    'height'  : '30px',
                                                    'z-index':5,
                                                    'text-align':'center',
                                                    'line-height':'30px',
                                                    'border-radius':'20px'
                                                });
                                                timer = setTimeout( function(){
                                                    $( '#tipsClass' ).fadeOut();
                                                    $( '#tipsClass' ).remove();
                                                }, 2000  );


                                            });



                                        }else{
                                                alert("添加失败!")
                                         }

                                },
                                error: function (error) {
                                        alert("请求失败！");
                                }
                         });
                });


        }

        //创建学生信息表格
        function createTableItem(index,value){
                var $item = $("<tr class='studentList'>" +
                            "<td><input name='ids' type='checkbox' class='checkBox'></td>" +
                            "<td class='del'>" + value.studentId + "</td>" +
                            "<td>" + value.name + "</td>" +
                            "<td>" + value.sex + "</td>" +
                            "<td>" + value.grade + "</td>" +
                            "<td>" + value.major + "</td>" +
                            "<td>" + value.labName + "</td>" +
                            " <td class='text-center'>" +
                            " <button type='button' class='btn bg-olive btn-xs' data-toggle='modal'  data-target='#myModalAlter'  id = 'addFace'>添加</button>" +
                            " <button type='button' class='btn bg-olive btn-xs'  id ='alterStudentInfo' data-toggle='modal'  data-target='#myModalAlter'>编辑</button>" +
                            "</td>" +
                            "</tr>");
                $item.get(0).obj = value;
                return $item;
        }

        //获取学生的信息
        function getAllStudents() {
                $.ajax({
                        type: "get",
                        url: "/getAllStudents",
                        contentType: "application/json; charset=utf-8",
                        // url:"../js/students.json",
                        // dataType: 'json',
                        processData: false,
                        async: true,
                        success: function (data) {
                                var tbody =  $("#tbody");
                                tbody.empty();
                                studentInfo =data.data;
                                $.each(studentInfo,function(index, el) {
                                        var $item = createTableItem(index,el);
                                        tbody.append($item);
                                });
                        },
                        error: function (error) {
                           alert(2);
                        }
                 });

        }
         //实验室下拉列表时改变表格的信息
        function labListInit(){
                var text = $(".selectItem").val();
                var tbody= $("#tbody");
                tbody.empty();

                $.each(studentInfo,function(index, el) {
                        if(studentInfo[index].labName == text){
                                // alert(1);
                                var $item = createTableItem(index,el);
                                tbody.append($item);
                        }else if(text =="全部"){
                                var $item = createTableItem(index,el);
                                tbody.append($item);
                        }
                });
        }
        //初始化下拉列表信息
         labListInit();
        //获取全部实验室信息
        function getAllLabName(){
                $.ajax({
                        type: "get",
                        url: "/lab",
                        contentType: "application/json; charset=utf-8",
                        dataType: 'json',
                        processData: false,
                        async: true,
                        // url:"../js/laboratory.json",
                        // dataType: 'json',
                        processData: false,
                        async: true,
                        success: function (data) {
                                 var select =  $("#select");
                                 var labName = $('#labName');
                                  var labName_alter = $('#labName_alter');
                                  data = data.data;
                                 for (var i = 0; i <data.length; i++) {
                                         // console.log(data.labName[i]);
                                     select.append($(" <option class='selectItem' value='" +data[i]+ "' >"  + data[i] + '</option>'));
                                     labName.append($(" <option class='selectItem' value='" +data[i]+ "' >"  + data[i] + '</option>'));
                                     labName_alter.append($(" <option class='selectItem' value='" +data[i]+ "' >"  + data[i] + '</option>'));

                                 }
                                   select.append($(" <option class='selectItem' value='全部' >全部</option>'"));

                        },
                        error: function (error) {
                                alert(2);
                        }
                 });
        }

        //监听下拉列表
        $('#select').change(function(event) {
                var text = $(this).val();
                var tbody= $("#tbody");
                tbody.empty();
                $.each(studentInfo,function(index, el) {
                        if(studentInfo[index].labName == text){
                                var $item = createTableItem(index,el);
                                tbody.append($item);
                        }else if(text =="全部"){
                                var $item = createTableItem(index,el);
                                tbody.append($item);
                        }
                });
        });

        // 监听全选操作
        $("#selall").click(function() {
            var clicks = $(this).is(':checked');
            if (!clicks) {
                    $("#dataList td input[type='checkbox']").iCheck("uncheck");
                    $("#dataList td input[type='checkbox']").attr('check', 'unchecked');
            } else {
                    $("#dataList td input[type='checkbox']").iCheck("check");
                    $("#dataList td input[type='checkbox']").attr('check', 'checked');
            }
            $(this).data("clicks", !clicks);
        });

        //单选按钮的监听
        var checkBoxListener = function checkBoxListener(){
                var clicks = $(this).find('.checkBox').is(':checked');
                if(!clicks){
                        $(this).find('.checkBox').iCheck('check');
                        $(this).find('.checkBox').attr('check', 'checked');
                }else{
                        $(this).find('.checkBox').iCheck('uncheck');
                        $(this).find('.checkBox').attr('check', 'unchecked');
                }


                var  check = $('#tbody input');
                var i = 0; //选中的数量
                $.each(check,function(index, el) {
                        if($(el).attr('check') == "checked"){
                                i++;
                                if(i==$('#tbody input').length){
                                        $('#selall').iCheck('check');
                                        i=0;
                                }else{
                                        $('#selall').iCheck('uncheck');
                                }
                        }else{
                                i--;
                                if(i<=0){
                                        i=0;
                                }
                        }
                });

        }
        //监听单选操作  单击行
        $("#tbody").delegate(".studentList", "click", checkBoxListener);
        //监听单选操作  单击按钮
        $("#tbody").delegate(".checkBox", "click", function(){
                var clicks = $(this).is(':checked');
                if(!clicks){
                        $(this).iCheck('check');
                        $(this).attr('check', 'checked');
                }else{
                        $(this).iCheck('uncheck');
                        $(this).attr('check', 'unchecked');

                }
                var  check = $('#tbody input');
                var i = 0; //选中的数量
                $.each(check,function(index, el) {
                        if($(el).attr('check') == "checked"){
                                i++;
                                if(i==$('#tbody input').length){
                                        $('#selall').iCheck('check');
                                        i=0;
                                }else{
                                        $('#selall').iCheck('uncheck');
                                }
                        }else{
                                i--;
                                if(i<=0){
                                        i=0;
                                }
                        }
                });

        });

//删除 学生信息
        $('#delStudent').click(function(event) {
                var tbody= $("#tbody");
                var checkBox = $('.checkBox');
                var data ;
                var arrDate=[];
                var json = null;
                $.each(checkBox,function(index, el) {
                                if($(el).attr('check') == "checked"){
                                        var value = $('.del').html();
                                        $(el).parents('.studentList').remove();
                                        for(var i = 0; i < studentInfo.length ;i++){
                                                if(studentInfo[i].studentId == value){
                                                        studentInfo.splice($.inArray(value,studentInfo),1);
                                                        data  = $(this).parent().parent().get(0).obj.studentId;
                                                        arrDate.push(data);
                                                }
                                        }
                                }


                 });
                 json = {studentId:arrDate};
                 $.ajax({
                         type: "delete",
                         url: "/students",
                         contentType: "application/json; charset=utf-8",
                         dataType:'json',
                         data:JSON.stringify(json),
                         processData: false,
                         async: true,
                         // url:"../js/laboratory.json",
                         // dataType: 'json',
                         success: function (data) {
                             var timer = null;
                             if(timer){
                                 clearInterval(timer);
                             }
                             var tipsDiv = '<div id="tipsClass">' + '删除成功!' + '</div>';
                             $( 'body' ).append( tipsDiv );
                             $( '#tipsClass' ).css({
                                 'position': 'absolute',
                                 'float':'left',
                                 'left':'50%',
                                 'margin-top':'-200px',
                                 'top':'50%',
                                 'background':'#eee',
                                 'width'  : '150px',
                                 'height'  : '30px',
                                 'z-index':5,
                                 'text-align':'center',
                                 'line-height':'30px',
                                 'border-radius':'20px'
                             });
                             timer = setTimeout( function(){
                                 $( '#tipsClass' ).fadeOut();
                                 $( '#tipsClass' ).remove();
                             }, 2000  );

                         },
                         error: function (error) {
                                 alert("请求失败！");
                         }
                 });
         });



})
