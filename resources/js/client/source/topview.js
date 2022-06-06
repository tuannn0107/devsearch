$(document).ready(function () {
    renderLastestPostListBlockRightSide(this);
});

$(window).scroll(function() {
    renderLastestPostListBlockRightSide(this);
});

function loadMorePost() {
    var startIndex = $('.list-post').length;
    $.post({
        url: ApiClient.POST_FETCH_TOP_VIEW_POST,
        data: JSON.stringify({startDate: (new Date() - 30 * 24 * 3600 * 1000), startIndex: startIndex, fetchSize: 4}),
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