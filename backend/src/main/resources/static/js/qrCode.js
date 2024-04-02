function createQRCode() {
    $.ajax({
        type : "GET",
        url : "/2fa/qrcode/get/"+$('#username').val(),
        contentType: 'application/json',
        success : function(msg) {
            alert("success");

            $('#qr').attr('src', 'data:image/png;base64,'+msg);
        },
        error : function() {
            alert("failure");
        }
    });
}