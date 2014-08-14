//Fade text
$("#teva_load").delay(3500).fadeOut(1000, 'linear');

$('#main').delay(600).animate({
    opacity: 1
}, 600);
$("#play").on(input.down, function() {
    $(this).css('opacity', 0.4);
})
$(document).on(input.up, function() {
    $('#play').css('opacity', 1);
})
$("#play").on(input.tap, function() {
    if ($("#teva_vid")[0].paused) {
        $('#main').addClass('greyscale').fadeOut(1000, 'linear');

        $('#teva_load').delay(1000).fadeIn(1000, 'linear');

        $("#teva_vid")[0].play();
        $("#teva_vid")[0].onended = function() {
            $('#main').show();
        }
        $("#teva_load").delay(3500).fadeOut(1000, 'linear', function() {
            $('#main').removeClass('greyscale').animate({
                opacity: 1
            }, 600);
        });
    }
});

$('#main').on(input.tap, function() {
    $(this).addClass('greyscale');
    setTimeout(function() {
        irep.navigateTo('00_slide_what_is_spotlight', '01_presentation_what_is_spotlight');
    }, 500)
});