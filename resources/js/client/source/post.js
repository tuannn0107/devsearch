$(document).ready(function () {
    renderTopViewPostBlockRightSide(this);
});


$(window).scroll(function() {
    renderTopViewPostBlockRightSide(this)
    renderLastestPostListBlockRightSide(this);
});