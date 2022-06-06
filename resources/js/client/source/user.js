$(document).ready(function () {
    renderTopViewPostBlockRightSide(this);
});

$(window).scroll(function() {
    renderTopViewPostBlockRightSide(this)
    renderLastestPostListBlockRightSide(this);
});

function loadMorePost() {
    var startIndex = $('.list-post').length;
    $.post({
        url: ApiClient.POST_FETCH_USER_POST,
        data: JSON.stringify({userNickName: $('#authorId').val(), startCurVal: 0, startIndex: startIndex, fetchSize: 4}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(response) {
            if (response.status === 200) {
                response.data.forEach(post =>{
                    $('#postListContentListLeftSide').append(generatePostElementPostListLeftSide(post));
                });
            }
            else {
                console.log('Error occur' + response.status)
            }
        }
    });
}