function validateTotp() {
	var userData = {"totpKey" : ""};
	userData.totpKey = $('#totpKey').val();

	$.ajax({
		type : "POST",
		url : "/2fa/qrcode/validate/"+$('#username').val(),
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