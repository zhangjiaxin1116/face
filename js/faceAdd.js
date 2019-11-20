$(function(){
        var video = document.getElementById('video');
        var img = document.getElementById('img');
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');
        var tracker = new tracking.ObjectTracker('face');
        tracker.setInitialScale(4);
        tracker.setStepSize(2);
        tracker.setEdgesDensity(0.1);
        tracking.track('#video', tracker, { camera: true});
        var width;
        var height;

        $('#subFace').click(function(event) {

                takePhoto();
        });
        function takePhoto() {

            context.drawImage(video,0 , 0, canvas.width, canvas.height);
            let base64File = canvas.toDataURL();
            let formData = new FormData();
            formData.append("file", base64File);
            formData.append("studentId", studentFaceId);
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
                    $.ajax({
                         // url:"../js/students.json",
                         // dataType: 'json',
                        type: "post",
                        url: "/faceAdd",
                        data: formData,
                        contentType: false,
                        processData: false,
                        async: true,
                        success: function (text) {
                                    if (text.message === "success" ) {
                                                   $('#addFaceModal').modal('hide');
                                                   $('#addFaceModal').on('hidden.bs.modal', function () {
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
                                                                       setTimeout( function(){
                                                                               $( '#tipsClass' ).fadeOut();
                                                                              $( '#tipsClass' ).remove();
                                                                     }, 1000  );


                                                     });
                                    } else {
                                        console.log("失败 flag = false");

                                    }

                        },
                        error:function (error) {
                                console.log("请求失败");
                        }
                    });
       }  //photo



});
