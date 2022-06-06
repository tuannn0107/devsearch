/*var contextPath = '/' + $('base').attr('href').replace(/\//g, '');*/

function getContextPath() {
    return '';
}

const environment = {
    rootUrl: getContextPath(),
    apiUrl: `${getContextPath()}/api/admin`,
}

const ApiAdmin = {
    POST_FETCH_LATEST_POST: environment.apiUrl + '/post/readLatestPostList',
    POST_FETCH_TOP_VIEW_POST: environment.apiUrl + '/post/readTopviewPostList/',
    POST_FETCH_CATEGORY_POST: environment.apiUrl + '/post/readPostByCategoryList',
    POST_FETCH_USER_POST: environment.apiUrl + '/post/readPostByUserList',
    FEEDBACK_SUBMIT: environment.apiUrl + '/feedback/sendFeedback',
}


function isVisible(element, _this) {
    var hT = $(element).offset().top,
        wH = $(window).height(),
        wS = $(_this).scrollTop();
    return wS > (hT-wH);
}

function isEmptyContent(element) {
    return $(element).html().trim() == '';
}
