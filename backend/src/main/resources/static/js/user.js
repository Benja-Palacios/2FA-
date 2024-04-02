function createUser() {
            var userData = {"username" : "", "password" : ""};
            userData.username = $('#username').val();
            userData.password = $('#password').val();

            $.ajax({
                type : "POST",
                url : "/2fa/users",
                data : JSON.stringify(userData),
                contentType: 'application/json',
                success : function(msg) {
                    alert("success");
                },
                error : function() {
                    alert("failure");
                }
            });
        }