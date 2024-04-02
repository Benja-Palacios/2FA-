function login() {
	var userData = {"user" : "", "password" : ""};
	userData.user = $('#user').val();
	userData.password = $('#password').val();

	$.ajax({
		type : "POST",
		url : "/2fa/users/auth",
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