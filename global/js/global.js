$(document).ready(function() {
    window.scrollTo(0, 1);
    headerButtons();
    setPageTitle();
});

function setPageTitle() {
    var presentationFolder = $('#presentation_name').html();
    
    for(var x=0; x < navigation.length; x++) {
        if(navigation[x].presentation === presentationFolder) {
            $('header h4').html(navigation[x].presentationName);
        }
    }
}

function headerButtons() {

    //Button Effects

    $('header button').on(input.down, function() {
        $(this).css('opacity', 0.4);
    });

    $(document).on(input.up, function() {
        $('header button').css('opacity', 1);
         $('.dropdown li').attr('style', '');
    });

    $('.dropdown li').on(input.down, function() {
        $(this).css({
            'background': '#CCC',
            'color': '#FFF'
        });
    });

    $('header button').on(input.tap, function() {
        if ($(this).data('link')) {
            irep.navigateTo($(this).data('link'));
        } else {
            if ($(this).hasClass('active_dd')) {
                $(this).removeClass('active_dd');
                $('.dropdown').hide();
            } else {
                $('.active_dd').removeClass('active_dd');
                $(this).addClass('active_dd');
                $('.dropdown').hide();
                $('.dropdown').eq($(this).data('dropdown')).show();
            }
        }
    });

    //Main app navigation
    
    $('#index_dropdown .top_level').on(input.tap, function() {
        var thisNav = navigation[$(this).index()].links;
        if (thisNav.length === 1) {
            irep.navigateTo(thisNav[0][1], navigation[$(this).index()].presentation);
        } else {
            $('.dropdown_menu ul').eq(1).empty();
            for (var i = 0; i < navigation[$(this).index()].links.length; i++) {
                $('.dropdown_menu ul').eq(1).append('<li class="sub_menu" data-presentation="' + navigation[$(this).index()].presentation + '" data-link="' + thisNav[i][1] + '"><h2>' + thisNav[i][0] + '</h2><img src="/global/img/arrow.svg"/></li>');
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

    $('#header_button_calculator').on(input.tap, function() {
        irep.navigateTo('00_slide_cauculator', '16_presentation_calculator');
    });

    $('#header_button_summary').on(input.tap, function() {
        irep.navigateTo('00_slide_summary', '15_presentation_summary' );
    });

    $(document).on(input.tap, '.sub_menu', function() {
        irep.navigateTo($(this).data('link'), $(this).data('presentation'));
    });
}

function pdfViewer() {

    $('.pdf').on('input.tap', function() {
        loadPDF($(this).data('pdf'))
        $('#pdf_layer').css('top', '0px')
    });

    $('#pdf_header button').on(input.tap, function() {
        $('#pdf_layer').css('top', '768')
    });

    function loadPDF(index) {
        var pdf = PDFs[index];
        $('#pdf_container').empty();
        for (var x = 0; x < pdf.number; x++) {
            console.log(pdf.number)
            $('#pdf_container').append('<img src="pdf_images/' + pdf.directory + '/' + x + '.jpg"/>');
        }
    }
}
       
$('.fullscreen').on(input.tap, function() {

        $('#img_layer').css('top', '0px');
        var src = $('img.fullscreen').attr('src');
 
        $('#img_container').empty(); // clear existing images from here
        $('#img_container').append('<img class="showing" src="'+ src +'"/>');

        var img = $('.showing');
        var h = img.height();
        
        if(h > 400) {
        // resize img here
        img.addClass('img_large');
        } else {
        img.css('margin-top', + h / -2 + "px");
        }

    });

$('table').on(input.tap, function() {
    
    $('#img_container').append($('table'));
    
    //Workout scale 

    var x = ((1024 - ($('table').width()+5)) / ($('table').width()+5)) * 100;
    x = Math.round(x);

    $('#img_container table').css({'-webkit-transform':'scale(1.'+x+')','left':'0px'});

    var l = $('#img_container table')[0].getBoundingClientRect().left;
    l = -l;

    var t = ((656 - $('#img_container table')[0].getBoundingClientRect().height) / 2 );
    console.log(t) 
    $('#img_container table').css({'left': l+'px','top':t+'px'});

    $('#img_layer').css('top','0px');
});

$('#img_header button').on(input.tap, function() {
    $('#img_layer').css('top', '768')
});

  

