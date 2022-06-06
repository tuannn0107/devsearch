var categoryIdPrefix = 'category-wrapper-'
var categorys = $('[id^=' + categoryIdPrefix + ']');
var categorysLoaded = [];
categorys.each(category => {
    categorysLoaded.push(false);
});
categorysLoaded[0] = true;

var latestViewPostListBlockContent = $('#top-view-post-list-block-content');

var isLoadLastedPost = false;

$(document).ready(function () {
    renderTopViewPostBlockRightSide(this);
});

$(window).scroll(function() {
    renderCategoriesSection(this);
    renderLastestPostListBlock(this);
    renderTopViewPostBlockRightSide(this);
});

function loadMorePostList() {
    var startIndex = $('#top-view-post-list-block-content>li').length + 5;
    renderLastestPostListBlockContent(startIndex, 4);
}


function renderCategoriesSection(_this) {
    for (var i = 0; i< categorys.length; i++) {
        var element = categorys.get(i);

        if (categorysLoaded[i]
            || !isVisible(element, _this)
            || !isEmptyContent($(element).find("[id*='blockPostContent']"))) {
            continue;
        }

        categorysLoaded[i] = true;
        renderCategorySection(element, i, this);
    }
}


function renderLastestPostListBlock(_this) {
    if (isLoadLastedPost
        || !isVisible(latestViewPostListBlockContent, _this)
        || !isEmptyContent($(latestViewPostListBlockContent)))
    {
        return;
    }
    isLoadLastedPost = true;
    renderLastestPostListBlockContent(5, 4);
}

function renderLastestPostListBlockContent(startFetchIndex, fetchSize) {
    var parameterObj = {startIndex: startFetchIndex, fetchSize: fetchSize};
    $.post({
        url: ApiClient.POST_FETCH_LATEST_POST,
        data: JSON.stringify(parameterObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(response) {
            if (response.status === 200) {
                $(latestViewPostListBlockContent).append(renderLastestPostList(response.data))
            }
            else {
                console.log('Error occur' + response.status)
            }
        }
    });
}

function renderLastestPostList(postList) {
    var html = '';
    postList.forEach(post => {
       html += renderLastestPost(post);
    })
    return html;
}


function renderLastestPost(post) {
    var html = '<li class="list-post magazine-layout magazine-1">\n' +
        '<article id="post-908" class="item hentry">\n' +
        '    <div class="thumbnail">\n' +
        '        <a class="penci-image-holder penci-lazy"\n' +
        '           href="'+ environment.rootUrl +'/post/'+ post.denotation +'"\n' +
        '           title="' + post.title +'"\n' +
        '           style="display: inline-block; background-image: url(&quot;' + post.image +'&quot;);"> </a>\n' +
        '    </div>\n' +
        '    <div class="content-list-right">\n' +
        '        <div class="header-list-style">\n' +
        '            <h2 class="entry-title grid-title">\n' +
        '                <a href="'+ environment.rootUrl + '/post/' + post.denotation +'">'+ post.title +'</a>\n' +
        '            </h2>\n' +
        '            <div class="grid-post-box-meta">\n' +
        '                <span class="author-italic author vcard">\n' +
        '                      by <a class="url fn n" href="'+ environment.rootUrl +'/user/'+ post.createdByNickname +'">' + post.createdByNickname +'</a>\n' +
        '                </span>\n' +
        '                <span><time class="entry-date published">'+ post.createdTime +'</time></span>\n' +
        '            </div>\n' +
        '            <span class="cat" style="margin-top: 10px">\n' +
        '                <a class="penci-cat-name"\n' +
        '                   href="'+ environment.rootUrl + '/category/' + post.categoryId +'"\n' +
        '                   rel="category tag">'+ post.categoryDenotation +'</a>\n' +
        '            </span>\n' +
        '        </div>\n' +
        '        <div class="item-content entry-content">\n' +
        '            <p>'+ post.description +'</p>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</article>\n' +
        '</li>';
    return html;
}

function renderCategorySection(element, elementIndex, _this) {
    var categoryId = element.getAttribute('id').substring(categoryIdPrefix.length);
    var fetcheSize = 4;
    if (elementIndex == 0 ) {
        fetcheSize = 5;
    } else if (elementIndex == 1) {
        fetcheSize = 6;
    } else if (elementIndex == 2 || elementIndex == 3) {
        fetcheSize = 3;
    }

    $.post({
        url: ApiClient.POST_FETCH_CATEGORY_POST,
        data: JSON.stringify({category: categoryId, startCurVal: 5, startIndex: 0, fetchSize: 4}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(response) {
            if (response.status === 200) {
                $(element).find("[id*='blockPostContent']").html(renderCategoryBlockContent(response.data, elementIndex));
            }
            else {
                console.log('Error occur' + response.status)
            }
        }
    });
}

function renderCategoryBlockContent(data, elementIndex) {
    var html = '';
    for (var i = 0; i < data.length; i++) {
        if (i == 0) {
            html += generateFirstPostContent(data[i]);
        } else if (i == 1 && elementIndex == 1) {
            html += generateFirstPostContent(data[i]);
        }
        else {
            html += generateHenryPostContent(data[i]);
        }
    }
    return html;
}

function generateFirstPostContent(post) {
    var resHtml = '<div class="mag-post-box hentry first-post">\n' +
        '<div class="magcat-thumb">\n' +
        '    <a class="penci-image-holder penci-lazy"\n' +
        '       href="'+ environment.rootUrl +'/post/'+ post.denotation +'"\n' +
        '       title="' + post.title +'"\n' +
        '       style="display: inline-block; background-image: url(&quot;' + post.image +'&quot;);"> </a>\n' +
        '</div>\n' +
        '<div class="magcat-detail">\n' +
        '    <div class="mag-header">\n' +
        '        <h3 class="magcat-titlte entry-title">\n' +
        '            <a title="' + post.title +'" href="'+ environment.rootUrl +'/post/'+ post.denotation +'">'+ post.title +'</a>\n' +
        '        </h3>\n' +
        '        <div class="grid-post-box-meta mag-meta">\n' +
        '            <span class="author-italic author vcard">by\n' +
        '                <a class="url fn n" href="'+ environment.rootUrl +'/user/'+ post.createdByNickname +'">' + post.createdByNickname +'</a>\n' +
        '             </span>\n' +
        '            <time class="entry-date published">' + post.createdTime +'</time>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="mag-excerpt entry-content"><p>' + post.description +'</p></div>\n' +
        '</div>\n' +
        '</div>';
    return resHtml;
}

function generateHenryPostContent(post) {
    var resHtml = '<div class="mag-post-box hentry">\n' +
        '    <div class="magcat-thumb">\n' +
        '        <a class="penci-image-holder penci-lazy small-fix-size"\n' +
        '           href="'+ environment.rootUrl +'/post/'+ post.denotation +'"\n' +
        '           title="' + post.title +'"\n' +
        '           style="display: inline-block; background-image: url(&quot;' + post.image +'&quot;);"> </a>\n' +
        '    </div>\n' +
        '    <div class="magcat-detail">\n' +
        '        <h3 class="magcat-titlte entry-title">\n' +
        ' <a title="' + post.title +'" href="'+ environment.rootUrl +'/post/'+ post.denotation +'">'+ post.title +'</a>\n' +
        '        </h3>\n' +
        '    </div>\n' +
        '</div>';
    return resHtml;
}