$(document).ready(function() {
    headerButtons();
    window.scrollTo(0, 1);
});

function headerButtons() {

    $('header button').on(input.down, function() {
        $(this).css('opacity', 0.4);
    });

    $('header button').on(input.up, function() {
        $(this).css('opacity', 1);
    });

    $('.dropdown li').on(input.down, function() {
        $(this).css({
            'background': '#CCC',
            'color': '#FFF'
        });
    });

    $('.dropdown li').on(input.up, function() {
        $(this).attr('style', '')
    });

    $('header button').on(input.tap, function() {
        if ($(this).data('link')) {
            irep.navigateTo($(this).data('link'));
        } else {
            if ($(this).hasClass('active_dd')) {
                $(this).removeClass('active_dd');
                $('.dropdown').hide();
            } else {
                $('.dropdown').removeClass('active_dd');
                $(this).addClass('active_dd');
                $('.dropdown').hide();
                $('.dropdown').eq($(this).data('dropdown')).show();
            }
        }
    });
    
    $('#index_dropdown .top_level').on(input.tap, function() {
        var thisNav = navigation[$(this).index()].links;
        if(thisNav.length === 1) {
            irep.navigateTo(thisNav[0][1],navigation[$(this).index()].presentation);
        } else {
            $('.dropdown_menu ul').eq(1).empty();
       
            for (var i = 0; i < navigation[$(this).index()].links.length; i++) {
                
                $('.dropdown_menu ul').eq(1).append('<li class="sub_menu" data-presentation="'+ navigation[$(this).index()].presentation +'" data-link="' + thisNav[i][1] + '"><h2>' + thisNav[i][0] + '</h2><img src="/global/img/arrow.svg"/></li>');
                $('.dropdown_menu h1').eq(1).html($(this).find('h2').html().substr(2));
            }

            $('.dropdown_menu').eq(0).animate({
                marginLeft: '-50%',
                opacity: 0
            }, 200); 
        }
        

    });
    
    $('.back_button').on(input.down, function() {
        $(this).css('opacity', '0.6');
    });

    $('.back_button').on(input.up, function() {
        $(this).css('opacity', '1')
        $('.dropdown_menu').eq(0).animate({
            marginLeft: '0%',
            opacity: 1
        }, 200);
    });


    $(document).on(input.tap, '.sub_menu', function() {
        irep.navigateTo($(this).data('link'),$(this).data('presentation'));
    });


    $('.pdf').on('click', function() {
        loadPDF($(this).data('pdf'))
        $('#pdf_layer').css('top', '0px')
    });

    $('#pdf_header button').on(input.tap, function() {
        $('#pdf_layer').css('top', '768')
    });

}

var PDFs = [{
    directory: 'filnarine_sr_10_mg',
    number: 1
}, {
    directory: '',
    number: 1
}]

function loadPDF(index) {
    var pdf = PDFs[index];
    $('#pdf_container').empty();
    for (var x = 0; x < pdf.number; x++) {
        console.log(pdf.number)
        $('#pdf_container').append('<img src="pdf_images/' + pdf.directory + '/' + x + '.jpg"/>');
    }
}