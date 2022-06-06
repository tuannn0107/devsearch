/*
Template Name: Material Pro Admin
Author: Themedesigner
Email: niravjoshi87@gmail.com
File: js
*/

$(document).ready(function () {
    $.post({
        url: ApiAdmin.POST_FETCH_LATEST_POST,
        data: JSON.stringify({startIndex: 0, fetchSize: 4}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            console.log(response);
            if (response.status === 200) {
                initPostListStatictisChart(response.data);
            }
            else {
                console.log('Error occur' + response.status)
            }
        }
    });
});

function initPostListStatictisChart(postList) {
    var date = new Date();
    var postListSize = postList.length;
    var labelsArr = Array.from(Array(date.getDate()), (_, i) => i + 1);
    var newPostArr = [];
    var postAppr = [];
    var countNewPost = 0;
    var countPostAppr = 0;
    for (var i = 1; i <= date.getDate(); i++)
    {
        for (var j = 0; j < postList.length; j++) {
            var post = postList[j];
            if (parseInt(post.createdTime.substring(8, 10)) === i) {
                countNewPost++;
            }
            if (parseInt(post.updatedTime.substring(8, 10)) === i && 'APPROVED' === post.status) {
                countPostAppr++;
            }
        }
        newPostArr.push(countNewPost);
        postAppr.push(countPostAppr);
    }

    var chart = new Chartist.Line('.campaign', {
        labels: labelsArr,
        series: [
            newPostArr
            , postAppr
        ]}, {
        low: 0,
        high: postListSize,
        showArea: true,
        fullWidth: true,
        plugins: [
            Chartist.plugins.tooltip()
        ],
        axisY: {
            onlyInteger: true
            , scaleMinSpace: 40
            , offset: 20
            , labelInterpolationFnc: function (value) {
                return (value / 1);
            }
        },
    });

    // Offset x1 a tiny amount so that the straight stroke gets a bounding box
    // Straight lines don't get a bounding box
    // Last remark on -> http://www.w3.org/TR/SVG11/coords.html#ObjectBoundingBox
    chart.on('draw', function(ctx) {
        if(ctx.type === 'area') {
            ctx.element.attr({
                x1: ctx.x1 + 0.001
            });
        }
    });

    // Create the gradient definition on created event (always after chart re-render)
    chart.on('created', function(ctx) {
        var defs = ctx.svg.elem('defs');
        defs.elem('linearGradient', {
            id: 'gradient',
            x1: 0,
            y1: 1,
            x2: 0,
            y2: 0
        }).elem('stop', {
            offset: 0,
            'stop-color': 'rgba(255, 255, 255, 1)'
        }).parent().elem('stop', {
            offset: 1,
            'stop-color': 'rgba(38, 198, 218, 1)'
        });
    });


    var chart = [chart];

    // ==============================================================
    // This is for the animation
    // ==============================================================

    for (var i = 0; i < chart.length; i++) {
        chart[i].on('draw', function(data) {
            if (data.type === 'line' || data.type === 'area') {
                data.element.animate({
                    d: {
                        begin: 500 * data.index,
                        dur: 500,
                        from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                        to: data.path.clone().stringify(),
                        easing: Chartist.Svg.Easing.easeInOutElastic
                    }
                });
            }
            if (data.type === 'bar') {
                data.element.animate({
                    y2: {
                        dur: 500,
                        from: data.y1,
                        to: data.y2,
                        easing: Chartist.Svg.Easing.easeInOutElastic
                    },
                    opacity: {
                        dur: 500,
                        from: 0,
                        to: 1,
                        easing: Chartist.Svg.Easing.easeInOutElastic
                    }
                });
            }
        });
    }
}


$(function () {
    "use strict";
    // ==============================================================
    // Our visitor
    // ==============================================================

    var chart = c3.generate({
        bindto: '#visitor',
        data: {
            columns: [
                ['Other', 30],
                ['Desktop', 10],
                ['Tablet', 40],
                ['Mobile', 50],
            ],

            type : 'donut',
            onclick: function (d, i) { console.log("onclick", d, i); },
            onmouseover: function (d, i) { console.log("onmouseover", d, i); },
            onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        },
        donut: {
            label: {
                show: false
              },
            title: "Our visitor",
            width:20,

        },

        legend: {
          hide: true
          //or hide: 'data1'
          //or hide: ['data1', 'data2']
        },
        color: {
              pattern: ['#eceff1', '#745af2', '#26c6da', '#1e88e5']
        }
    });

    // ==============================================================
    // Badnwidth usage
    // ==============================================================
    new Chartist.Line('.usage', {
        labels: ['0', '4', '8', '12', '16', '20', '24', '30']
        , series: [
        [5, 0, 12, 1, 8, 3, 12, 15]

      ]
    }, {
        high:10
        , low: 0
        , showArea: true
        , fullWidth: true
        , plugins: [
        Chartist.plugins.tooltip()
      ], // As this is axis specific we need to tell Chartist to use whole numbers only on the concerned axis
        axisY: {
            onlyInteger: true
            , offset: 20
            , showLabel: false
            , showGrid: false
            , labelInterpolationFnc: function (value) {
                return (value / 1) + 'k';
            }
        }
        , axisX: {
            showLabel: false
            , divisor: 1
            , showGrid: false
            , offset: 0
        }
    });
    // ==============================================================
    // Download count
    // ==============================================================
    var sparklineLogin = function () {
        $('.spark-count').sparkline([4, 5, 0, 10, 9, 12, 4, 9, 4, 5, 3, 10, 9, 12, 10, 9, 12, 4, 9], {
            type: 'bar'
            , width: '100%'
            , height: '70'
            , barWidth: '2'
            , resize: true
            , barSpacing: '6'
            , barColor: 'rgba(255, 255, 255, 0.3)'
        });
    }
    var sparkResize;

    sparklineLogin();
    // ==============================================================
    // This is for the map
    // ==============================================================

    $('#usa').vectorMap({
            map : 'us_aea_en',
            backgroundColor : 'transparent',
            zoomOnScroll: false,
            regionStyle : {
                initial : {
                    fill : '#c9d6de'
                }
            },
            markers: [{
                    latLng : [40.71, -74.00],
                    name : 'Newyork: 250'
                    , style: {fill: '#1e88e5'}
                },{
                    latLng : [39.01, -98.48],
                    name : 'Kansas: 250'
                    , style: {fill: '#fc4b6c'}
                },
              {
                latLng : [37.38, -122.05],
                name : 'Vally : 250'
                , style: {fill: '#26c6da'}
              }]
        });

});
