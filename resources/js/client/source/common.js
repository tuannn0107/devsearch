var isRenderTopViewPostBlock = false;
var isRenderLastestPostListBlock = false;


$('#sidebar-nav .caret').click(function() {
    $(this).parent().next().toggleClass('element-visible');
});


function renderTopViewPostBlockRightSide(_this) {
    var element = $('#topViewPostListContentRightSide');
    if (isRenderTopViewPostBlock || !isVisible(element, _this) || !isEmptyContent(element))
    {
        return;
    }

    isRenderTopViewPostBlock = true;

    $.post({
        url: ApiClient.POST_FETCH_TOP_VIEW_POST,
        data: JSON.stringify({startDate: (new Date() - 30 * 24 * 3600 * 1000), startIndex: 0, fetchSize: 4}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.status === 200) {
                $(element).html(renderTopViewPostBlockContent(response.data));
            }
            else {
                console.log('Error occur' + response.status)
            }
        }
    });
}

function renderTopViewPostBlockContent(postList) {
    var html = '';
    for (var i = 0; i < postList.length; i++) {
        if (i == 0) {
            html += generateTopViewPostListTopPost(postList[i]);
            continue;
        }
        html += generateTopViewPostList(postList[i]);
    }

    return html;
}

function generateTopViewPostListTopPost(post) {
    var html = '<li class="penci-feed featured-news">\n' +
        '<div class="side-item">\n' +
        '    <div class="side-image">\n' +
        '        <a class="penci-image-holder penci-lazy"\n' +
        '           rel="bookmark"\n' +
        '           href="'+ environment.rootUrl +'/post/'+ post.denotation +'"\n' +
        '           title="' + post.title +'"\n' +
        '           style="display: inline-block; background-image: url(&quot;' + post.image +'&quot;);"> </a>\n' +
        '    </div>\n' +
        '    <div class="side-item-text">\n' +
        '        <h4 class="side-title-post">\n' +
        '            <a href="'+ environment.rootUrl + '/post/' + post.denotation +'"\n' +
        '               rel="bookmark"\n' +
        '               title="'+ post.title +'"> ' + post.title + ' </a>\n' +
        '        </h4>\n' +
        '    </div>\n' +
        '</div>\n' +
        '</li>\n\n';
    return html;
}

function generateTopViewPostList(post) {
    var html = '<li class="penci-feed">\n' +
        '<div class="side-item">\n' +
        '    <div class="side-image">\n' +
        '        <a class="penci-image-holder penci-lazy small-fix-size" \n' +
        '           rel="bookmark" \n' +
        '           href="'+ environment.rootUrl +'/post/'+ post.denotation +'"\n' +
        '           title="' + post.title +'"\n' +
        '           style="display: inline-block; background-image: url(&quot;' + post.image +'&quot;);"> </a>\n' +
        '    </div>\n' +
        '    <div class="side-item-text">\n' +
        '        <h4 class="side-title-post">\n' +
        '            <a href="'+ environment.rootUrl + '/post/' + post.denotation +'"\n' +
        '               rel="bookmark"\n' +
        '               title="'+ post.title +'"> ' + post.title + ' </a>\n' +
        '        </h4>\n' +
        '    </div>\n' +
        '</div>\n' +
        '</li>\n\n';
    return html;
}


function renderLastestPostListBlockRightSide(_this) {
    var element = $('#latestPostListContentRightSide');
    if (isRenderLastestPostListBlock || !isVisible(element, _this) || !isEmptyContent(element))
    {
        return;
    }

    isRenderLastestPostListBlock = true;

    $.post({
        url: ApiClient.POST_FETCH_LATEST_POST,
        data: JSON.stringify({startIndex: 0, fetchSize: 4}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.status === 200) {
                $(element).html(renderLatestPostBlockContent(response.data));
            }
            else {
                console.log('Error occur' + response.status)
            }
        }
    });
}

function renderLatestPostBlockContent(postList) {
    var html = '';
    for (var i = 0; i < postList.length; i++) {
        html += generateLatestPost(postList[i]);
    }
    return html;
}

function generateLatestPost(post) {
    var html = '<li class="penci-feed">\n' +
        '<div class="side-item">\n' +
        '    <div class="side-image">\n' +
        '        <a class="penci-image-holder penci-lazy small-fix-size"\n' +
        '           rel="bookmark"\n' +
        '           href="'+ environment.rootUrl +'/post/'+ post.denotation +'"\n' +
        '           title="' + post.title +'"\n' +
        '           style="display: inline-block; background-image: url(&quot;' + post.image +'&quot;);"> </a>\n' +
        '    </div>\n' +
        '    <div class="side-item-text">\n' +
        '        <h4 class="side-title-post">\n' +
        '            <a href="'+ environment.rootUrl + '/post/' + post.denotation +'"\n' +
        '               rel="bookmark"\n' +
        '               title="'+ post.title +'"> ' + post.title + ' </a>\n' +
        '    </div>\n' +
        '</div>\n' +
        '</li>';
    return html;
}


function generatePostElementPostListLeftSide(post) {
    var html = '<li class="list-post">\n' +
        '<article id="post-910" class="item hentry">\n' +
        '    <div class="thumbnail">\n' +
        '        <a class="penci-image-holder penci-lazy"\n' +
        '           href="'+ environment.rootUrl +'/post/'+ post.denotation +'"\n' +
        '           title="' + post.title +'"\n' +
        '           style="display: inline-block; background-image: url(&quot;' + post.image +'&quot;);"> </a>\n' +
        '    </div>\n' +
        '    <div class="content-list-right content-list-center">\n' +
        '        <div class="header-list-style">\n' +
        '            <h2 class="entry-title grid-title">\n' +
        '                <a href="'+ environment.rootUrl + '/post/' + post.denotation +'">'+ post.title +'</a>\n' +
        '            </h2>\n' +
        '            <div class="grid-post-box-meta">\n' +
        '                 <span class="author-italic author vcard">\n' +
        '                       by <a class="url fn n" href="'+ environment.rootUrl +'/user/'+ post.createdByNickname +'">' + post.createdByNickname +'</a>\n' +
        '                 </span>\n' +
        '                <span><time class="entry-date published">'+ post.createdTime +'</time></span>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="item-content entry-content">\n' +
        '            <p>'+ post.description +'</p>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</article>\n' +
        '</li>\n';
    return html;
}