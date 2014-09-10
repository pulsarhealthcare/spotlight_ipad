$(document).ready(function() {
    window.scrollTo(0, 1);
    headerButtons();
    setPageTitle();
    pdfViewer();
    stopnativeScrolling();


});

function stopnativeScrolling() {

$('#slide_container').on(input.move, function(event) {
    event.preventDefault();
})

}
function setPageTitle() {
    if ($('#presentation_name').length) {
        var presentationFolder = $('#presentation_name').html();
    } else {
        var s = window.location.href.split('/');
        var presentationFolder = s[4];
    }
    console.log(presentationFolder)

    for (var x = 0; x < navigation.length; x++) {
        if (navigation[x].presentation === presentationFolder) {
            $('header h4').html(navigation[x].presentationName);

            if (navigation[x].smpc) {
                $('#smpc_dropdown .pdf').css('display', 'none');
                if (navigation[x].smpc.length === 1) {
                    $('#header_button_smpc').addClass('oneLink');
                }
                for (var y = 0; y < navigation[x].smpc.length; y++) {

                    $('#smpc_dropdown .pdf').eq(navigation[x].smpc[y]).css('display', 'block').addClass('active_link')
                }
            }
            console.log(navigation[x])
            if (navigation[x].api) {

                $('#api_dropdown .pdf').css('display', 'none');

                if (navigation[x].api.length === 1) {
                    $('#header_button_api').addClass('oneLink')
                }

                for (var y = 0; y < navigation[x].api.length; y++) {
                    $('#api_dropdown .pdf').eq(navigation[x].api[y]).css('display', 'block').addClass('active_link')
                }
            }
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
        $('.dropdown li').css('background', '#FFF');
    });

    $('.dropdown li').on(input.down, function() {
        if (!$(this).hasClass('ref')) {
            $(this).css({
                'background': '#CCC',
                'color': '#FFF'
            });
        }

    });

    $('header button').on(input.tap, function() {
        if ($(this).data('link')) {
            var link = $(this).data('link').split('/');
            irep.navigateTo(link[1], link[0]);
        } else {
            if ($(this).hasClass('active_dd')) {
                $(this).removeClass('active_dd');
                $('.dropdown').hide();
                $('.back_button').css('opacity', '1');
                $('.dropdown_menu').eq(0).animate({
                    marginLeft: '0%',
                    opacity: 1
                }, 200);
            } else {

                $('.active_dd').removeClass('active_dd');
                if ($(this).hasClass('oneLink')) {
                    $('#pdf_header h1').html($('.dropdown').eq($(this).data('dropdown')).find('.active_link').find('h2').html())
                    loadPDF($('.dropdown').eq($(this).data('dropdown')).find('.active_link').data('pdf'), $('.dropdown').eq($(this).data('dropdown')).find('.active_link').data('num'))
                } else {
                    $(this).addClass('active_dd');
                    $('.dropdown').hide();

                    $('.dropdown').eq($(this).data('dropdown')).show();
                    $('.dropdown').eq($(this).data('dropdown')).find()
                }

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
                if(thisNav[i][0].length > 28) {
                    $('.dropdown_menu ul').eq(1).append('<li class="sub_menu" data-presentation="' + navigation[$(this).index()].presentation + '" data-link="' + thisNav[i][1] + '"><h2>' +  thisNav[i][0].substring(0,28) + '...</h2><img src="' + $('.top_level img').attr('src') + '"/></li>');
                } else {
                    $('.dropdown_menu ul').eq(1).append('<li class="sub_menu" data-presentation="' + navigation[$(this).index()].presentation + '" data-link="' + thisNav[i][1] + '"><h2>' + thisNav[i][0] + '</h2><img src="' + $('.top_level img').attr('src') + '"/></li>');
                }
                
                var title = $(this).find('h2').html().split('. ');
                $('.dropdown_menu h1').eq(1).html(title[1]);
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
        $(this).css('opacity', '1');
        $('.dropdown_menu').eq(0).animate({
            marginLeft: '0%',
            opacity: 1
        }, 200);
    });

    $('#header_button_calculator').on(input.tap, function() {
        irep.navigateTo('00_slide_calculator', '16_presentation_calculator');
    });

    $('#header_button_summary').on(input.tap, function() {
        irep.navigateTo('00_slide_summary', '15_presentation_summary');
    });

    $(document).on(input.tap, '.sub_menu', function() {
        irep.navigateTo($(this).data('link'), $(this).data('presentation'));
    });
}

function pdfViewer() {

    $('.pdf').on(input.tap, function() {
        $('#pdf_header h1').html($(this).find('h2').html())
        loadPDF($(this).data('pdf'), $(this).data('num'))

    });

    $('#pdf_header button').on(input.tap, function() {
        $('#pdf_layer').css('top', '768')
    });


}

function loadPDF(url, num) {

    $('#pdf_container').empty();
    for (var x = 1; x < num + 1; x++) {
        $('#pdf_container').append('<img src="' + url + '/pdf_Page_' + x + '.png"/>');
    }

    $('#pdf_layer').css('top', '0px')
}
var isFullscreen = false;

$('.fullscreen').on(input.tap, function() {

    $('#img_container').empty();

    switch ($(this).prop("tagName")) {
        case 'TABLE':
            $('#img_container').append($('table').clone());
            var x = ((1024 - ($('table').width() + 24)) / ($('table').width() + 24)) * 100;
            x = Math.round(x);

            $('#img_container table').css({
                '-webkit-transform': 'scale(1.' + x + ')',
                'left': '0px'
            });
            var l = $('#img_container table')[0].getBoundingClientRect().left;
            l = -l;
            var rW = $('#img_container table')[0].getBoundingClientRect().width;
            var sP = (1024 - rW) / 2;
            l = l + sP;
            var t = ((738 - $('#img_container table')[0].getBoundingClientRect().height) / 2);
            $('#img_container table').css({
                'left': (l) + 'px',
                'top': (t + 50) + 'px'
            });
            break;
        case 'IMG':
            if (!isFullscreen) {
                isFullscreen = true;
                $('#img_container').append($(this).clone());
                $('#img_container img').css({
                    'width': '1024px',
                    'left': '0px'
                });
                var newSrc = $('#img_container img').attr('src').replace(/\?.*$/, "") + "?x=" + Math.random();
                $('#img_container img').attr('src', newSrc);
            }
            break;

        case 'DIV':

            var newDiv = $(this).clone().appendTo('#img_container');

            var x = ((854 - (newDiv.width())) / (newDiv.width())) * 100;

            x = Math.round(x);

            newDiv.css({
                '-webkit-transform': 'scale(1.' + x + ')',
                'position': 'absolute',
                'top': '-177px',
                'left': '100px'
            });

            break;
    }
    $('#img_container img').css({
        'top': '90px'
    });
    $('#img_layer').css('top', '0px');
});

$('#img_header button').on(input.tap, function() {
    $('#img_layer').css('top', '768');
    isFullscreen = false;
});

//Workout scale 

// References drop down code

function getReference(references) {

    if (!references) {
        $('#ref_dropdown ul').append('<li class="ref"><h3>No references for this slide</h3></li>');
    } else {

        $(references).each(function(intValue, currentElement) {
            $('#ref_dropdown ul').append('<li class="ref"><h3>' + currentElement + '</h3></li>');
        });

    }

}