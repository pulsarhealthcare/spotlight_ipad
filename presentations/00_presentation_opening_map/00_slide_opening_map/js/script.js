//Fade text


$( "#teva_load" ).delay(3500).fadeOut( 1000, 'linear' );

$('#main').delay(600).animate({opacity:1},600);

$("#play").on(input.tap, function() {

// need to show greyscale class momentarily

$('#main').addClass('greyscale');

$('#main').fadeOut(1000, 'linear');

$('#teva_load').delay(1000).fadeIn(1000, 'linear');


// play video again

$("#teva_vid")[0].play();

// show video div and text

$( "#teva_load" ).delay(3500).fadeOut( 1000, 'linear', function() {
	$('#main').removeClass('greyscale').animate({opacity:1},600);
});

// make sure it isn't still greyscale

$('#main').fadeIn()

});

$('#main').on(input.tap,function() {

	$(this).addClass('greyscale');
	setTimeout(function() {
		irep.navigateTo('00_slide_what_is_spotlight','01_presentation_what_is_spotlight');
	},500)
    
});