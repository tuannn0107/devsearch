var $ = jQuery;
// Write Javascript code!
var isInitialized = false;
var cropper = '';
var file = '';
var _URL = window.URL || window.webkitURL;
var $ = jQuery;
// Initialize Slider

$(document).ready(function () {
    $("#post-thumbnail")
        .change(function (e) {
            if (file = this.files[0]) {
                var oFReader = new FileReader();
                oFReader.readAsDataURL(file);
                oFReader.onload = function () {
                    // Destroy the old cropper instance
                    $("#cropper-img").attr('src', this.result);
                    $('#cropper-img').addClass('ready');
                    if (isInitialized == true) {
                        $('#zoom-slider').val(0);
                        cropper.destroy();
                    }
                    initCropper();
                }
            }

            $('#canvas-image').removeClass('diplay-none');
        });
});

function initCropper() {
    var vEl = document.getElementById('cropper-img');
    cropper = new Cropper(vEl, {
        viewMode: 1,
        dragMode: 'move',
        aspectRatio: 16/9,
        checkOrientation: false,
        cropBoxMovable: false,
        cropBoxResizable: false,
        zoomOnTouch: true,
        zoomOnWheel: true,
        guides: false,
        highlight: false,
        maxHeight: 100,
        ready: function (e) {
            var cropper = this.cropper;
            cropper.zoomTo(0);

            var imageData = cropper.getImageData();
            //console.log("imageData ", imageData);
            var minSliderZoom = imageData.width / imageData.naturalWidth;

            /!*$('#min-zoom-val').html(minSliderZoom.toFixed(4));*!/

            $(".cr-slider-wrap").show();
        }
    });
    isInitialized = true;
}

$('#btnCrop').click(function() {
    // Get a string base 64 data url
    var result = document.getElementById('result');
    document.getElementById('imageCropeInfor').value = JSON.stringify(cropper.getData());
    result.innerHTML = '<img src="' + cropper.getCroppedCanvas().toDataURL() + '" id="cropper-img-result">';
});


function postCreate() {
    $('#post-content').val($('#summernote').summernote('code'));
    if ($("#canvas-image").is(":visible")) {
        $('#imageCropInfor').val(JSON.stringify(cropper.getData()));
    }
    $('#postForm').submit();
}
