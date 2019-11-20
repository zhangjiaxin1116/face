$(function(){
        var studentInfo;
        var flag = true;
        var flag2 =true
        let video = document.getElementById('video');
        let img = document.getElementById('img');
        let canvas = document.getElementById('canvas');
        let context = canvas.getContext('2d');
        let tracker = new tracking.ObjectTracker('face');
        let x;
        let y;
        let width;
        let height;
        var timer = null;
        var timer2 = null;
        tracker.setInitialScale(4);
        tracker.setStepSize(2);
        tracker.setEdgesDensity(0.1);
        tracking.track('#video', tracker, { camera: true });
        function face(){
                tracker.on('track', function(event) {
                context.clearRect(0, 0, canvas.width, canvas.height);

                    if (event.data.length === 0) {
                        // console.log("没有人脸")
                    }
                    else
                    {
                        // console.log("正在匹配");
                        event.data.forEach(function(rect) {
                            x = rect.x;
                            y = rect.y;
                            width = rect.width;
                            height = rect.height;
                        });

                        if(flag){
                               flag = false;
                            context.drawImage(video,x , y, width, height , 0 , 0, width, height);
                            let base64File = canvas.toDataURL();
                            let formData = new FormData();
                            formData.append("file", base64File);
                            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
                            $.ajax({
                                // url:"../js/students.json",
                                // dataType: 'json',
                                type: "post",
                                url: "/faceSearch",
                                data: formData,
                                contentType: false,
                                processData: false,
                                async: false,
                                success: function (text) {
                                    studentInfo = text.data;
                                    if (text.message === "success" ) {
                                        var tbody = document.getElementById('tbody');
                                        var td = document.getElementById('td1');
                                        td.innerHTML =text.data.name;
                                        td = document.getElementById('td2');
                                        td.innerHTML =text.data.similarity + "%";
                                        td = document.getElementById('td3');
                                        td.innerHTML =text.data.sex;
                                        td = document.getElementById('td4');
                                        td.innerHTML =text.data.grade;
                                        td = document.getElementById('td5');
                                        td.innerHTML =text.data.department;
                                        td = document.getElementById('td6');
                                        td.innerHTML =text.data.major;
                                        td = document.getElementById('td7');
                                        td.innerHTML =text.data.labName;
                                        $('#myModalAdd').modal();
                                    } else {
                                        console.log("失败 flag = false");

                                    }

                                },
                                error:function (error) {
                                    console.log("请求失败");
                                }
                            });
                                // clearInterval(timer2);
                               timer2 = setTimeout(function(){


                                   flag = true;   },300);
                        }
                    }
                });
        }

        function takePhoto() {



         }
          face();


});
