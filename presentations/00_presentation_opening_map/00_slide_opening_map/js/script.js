//Fade text
//$("#teva_load").delay(3500).fadeOut(100, 'linear');

$('#main').delay(600).animate({
    opacity: 1
}, 600);
$("#play").on(input.down, function() {
    $(this).css('opacity', 0.4);
})
$(document).on(input.up, function() {
    $('#play').css('opacity', 1);
})

var images = [];
var imagesL = [];
var videoItts = 0;

var canvas = $('#teva_vid')[0];
var ctx = canvas.getContext('2d');

var startTime = Date.now();
var fps = 22;
var lastDrawnIndex = null;
var totalFrames = 92;

function playVideo() {
   var currTime = Date.now();
   var currFrameIndex = Math.round((currTime - startTime) / (1000/fps)) % (totalFrames);

	if (currFrameIndex !== lastDrawnIndex) {

    ctx.drawImage(imagesL[videoItts],0,0,1024,636);
    videoItts ++;
    }
    requestAnimationFrame(playVideo);
}


function loadVideo(callback) {
    
	for(var x=91; x > 0; x--) {
		if(x < 10){
			images.push('img/animation/layer__000'+x+'.png')
		} else {
			images.push('img/animation/layer__00'+x+'.png')
		}
		
	}
	imgpreload(images,callback);
}

loadVideo(function() {

	requestAnimationFrame(playVideo);

});


$('#main').on(input.tap, function() {
    $(this).addClass('greyscale');
    setTimeout(function() {
        irep.navigateTo('00_slide_what_is_spotlight', '01_presentation_what_is_spotlight');
    }, 500);
});


function imgpreload( imgs, callback ) {
  "use strict";
  var loaded = 0;
  var images = [];
  imgs = Object.prototype.toString.apply( imgs ) === '[object Array]' ? imgs : [imgs];
  var inc = function() {
    loaded += 1;
    if ( loaded === imgs.length && callback ) {
      callback( images );
    }
  };
  for ( var i = 0; i < imgs.length; i++ ) {
    images[i] = new Image();
    images[i].onabort = inc;
    images[i].onerror = inc;
    images[i].onload = inc;
    images[i].src = imgs[i];
    imagesL.push(images[i]); 
  }
}