//Fade text

  $( "#teva_load" ).delay(3500).fadeOut( 1000, 'linear' );


$('#main').delay(600).animate({opacity:1},600);

$('#main').on('tap',function() {
    //configure when presentation is built
    //irep.navigateTo($(this).data('link'),$(this).data('presentation'));
});