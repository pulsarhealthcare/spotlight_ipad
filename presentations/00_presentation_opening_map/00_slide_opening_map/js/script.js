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

$('#main').on(input.tap, function() {
    $(this).addClass('greyscale');
    setTimeout(function() {
        irep.navigateTo('00_slide_what_is_spotlight', '01_presentation_what_is_spotlight');
    }, 500);
});
