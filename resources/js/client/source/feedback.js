/*$(document).ready(function () {
    renderTopViewPostBlockRightSide(this);
});


$(window).scroll(function() {
    renderTopViewPostBlockRightSide(this)
    renderLastestPostListBlockRightSide(this);
});*/

function sendFeedback() {
    if ($('#feedbackSubject').val() ==='' || $('#customerEmail').val() === '' || $('#feedbackMessage').val() === '') {
        $('#alert').css('display', 'block');
        $('#alert').removeClass('success');
        $('#alertMessage').html('Vui lòng điền đầy đủ thông tin mục yêu cầu Tiêu đề, Email, Nội dung.');
        return false;
    }
    var data = {
        name: $('#customerName').val(),
        title: $('#feedbackSubject').val(),
        email: $('#customerEmail').val(),
        content: $('#feedbackMessage').val()
    };

    var jsonData = JSON.stringify(data);

    $.post({
        url: ApiClient.FEEDBACK_SUBMIT,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        complete: function(response) {
            if (response.status === 200) {
                $('#alert').css('display', 'block');
                $('#alert').addClass('success');
                $('#alertMessage').html('Cảm ơn bạn đã góp ý. Chúng tôi sẽ xem xet và xử lý sớm nhất có thể để mang tới sự hài lòng đến bạn.')
            } else {
                $('#alert').css('display', 'block');
                $('#alert').removeClass('success');
                $('#alertMessage').html('Đã xảy ra lỗi trong quá trình xử lý. Bạn có thể gửi phản hồi qua email hỗ trợ bên trên.')
            }
        }
    });
}
