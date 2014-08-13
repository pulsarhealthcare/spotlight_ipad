//Fade text


$( "#teva_load" ).delay(3500).fadeOut( 1000, 'linear' );

$('#main').delay(600).animate({opacity:1},600);

$("#play").on(input.tap, function() {

// need to show greyscale class momentarily

$('#main').addClass('greyscale');

$('#main').fadeOut(1000, 'linear');

$('#teva_load').delay(1000);

$('#teva_load').fadeIn(1000, 'linear');

// play video again

$("#teva_vid")[0].play();

// show video div and text

$( "#teva_load" ).delay(3500).fadeOut( 1000, 'linear' );

// make sure it isn't still greyscale

$('#main').fadeIn().removeClass('greyscale').animate({opacity:1},600);


});




$('#main').on('tap',function() {
    //configure when presentation is built
    //irep.navigateTo($(this).data('link'),$(this).data('presentation'));
});