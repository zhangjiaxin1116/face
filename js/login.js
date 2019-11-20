

function searchFocus(obj1,obj2){



                obj1.onfocus =function(){
                        this.placeholder ="";

                };
                obj1.onblur =function(){
                        this.placeholder ="用户名";

                };

                obj2.onfocus =function(){
                        this.placeholder ="";

                };
                obj2.onblur =function(){
                        this.placeholder ="密码";

                };

                document.onkeydown = function(ev){
                        oEvent = ev || event;
                        var sub = document.getElementById('submit');
                        if(event.keyCode == 13){
                                sub.click();
                        }

                };
        }

        function   checkForm(){

                var form= document.getElementById('form');
                var span1 = document.getElementById('span1');
                var timer = null;
                var reg = /\s/;
                if(form.username.value == '' || form.username.value.length == 0 ){

                        span1.style.visibility = 'visible';
                        span1.innerHTML = "用户名不能为空!";
                        // alert("错误：用户名不能为空");
                        clearInterval(timer);
                        timer = setTimeout(function(){
                                span1.style.visibility = 'hidden';
                        },3000);
                        form.username.focus();
                        return false;
                }

                // 判断用户名不能包含空格
                if(reg.test(form.username.value)){
                        span1.style.visibility = 'visible';
                        span1.innerHTML = "用户名不能包含空格!";
                        // alert("错误：用户名不能为空");
                        clearInterval(timer);
                        timer =setTimeout(function(){
                                span1.style.visibility = 'hidden';
                        },3000);
                        form.username.focus();
                        return false;
                }

                //判断用户名长度不能低于6位，高于15位

                if(form.username.value.length < 6 || form.username.value.length >15){
                        span1.style.visibility = 'visible';
                        span1.innerHTML = "用户名长度不能低于6位，高于15位!";
                        clearInterval(timer);
                        timer =setTimeout(function(){
                                span1.style.visibility = 'hidden';
                        },3000);
                        form.username.focus();
                        return false;
                }

                // 判断密码不能为空
                if(form.password.value == '' ){

                        span1.style.visibility = 'visible';
                        span1.innerHTML = "密码不能为空!";
                        // alert("错误：用户名不能为空");
                        clearInterval(timer);
                        timer =setTimeout(function(){
                                span1.style.visibility = 'hidden';
                        },3000);
                        form.username.focus();
                        return false;
                }

                // 判断密码不能包含空格

                if(reg.test(form.password.value)){

                        span1.style.visibility = 'visible';
                        span1.innerHTML = "密码不能包含空格!";
                        // alert("错误：用户名不能为空");
                        clearInterval(timer);
                        timer =setTimeout(function(){
                                span1.style.visibility = 'hidden';
                        },3000);
                        form.username.focus();
                        return false;
                }

                //判断密码长度不能低于6位，高于15位
                if(form.password.value.length < 6 || form.password.value.length >15){
                        span1.style.visibility = 'visible';
                        span1.innerHTML = "密码长度不能低于6位，高于15位!";
                        clearInterval(timer);
                        timer =setTimeout(function(){
                                span1.style.visibility = 'hidden';
                        },3000);
                        form.username.focus();
                        return false;
                }



                var url = "login";
                var name = $("#username").val();
                var password = $("#password").val();
                var json = {"accountId": name, "password": password};
                $.ajax({
                        url: url,
                        type: "POST",
                        data: JSON.stringify(json),
                        dataType: "json",
                        async: false,
                        contentType: 'application/json;charset=utf-8',
                        success: function (result) {

                                if(result.message == "success"){
                                        window.location.href= 'index.html';
                                        return false;
                                 }else{
                                        alert("账号或密码错误！");
                                 }


                        },
                        error: function () {
                                   alert("提交请求失败！");
                        }
                 });
        }

window.onload = function(){

        var username = document.getElementById('username');
        var password = document.getElementById('password');

        searchFocus(username,password);

};
