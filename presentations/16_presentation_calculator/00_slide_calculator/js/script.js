//Fade text
var duration = 800;
$('#slide_container h1').eq(0).delay((duration - 100) * 1).animate({opacity: 1}, duration);
$('#slide_container h2').eq(0).delay((duration - 100) * 2).animate({opacity: 1}, duration);
$('#slide_container h3').eq(0).delay((duration - 100) * 3).animate({opacity: 1}, duration);
$('#slide_container h4').eq(0).delay((duration - 100) * 4).animate({opacity: 1}, duration);
$('#slide_container #notes p').eq(0).delay((duration - 100) * 5).animate({opacity: 1}, duration);
$('#slide_container #notes p').eq(1).delay((duration - 100) * 6).animate({opacity: 1}, duration);
$('.side_note').delay((duration - 100) * 7).animate({opacity: 1}, duration);



//Calculator
var population = 0;
var totalPopulation = 64488804;


/* declare add commas function for changing 150494 into 150,494 etc */
function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}



$('#submit').on('click', function() {
    if (population === 0) {
//        if (population === 0) {
        alert('Please select an organisation or enter a population.')
    } else {
        $('#container').css('margin-left', '-100%');
        $('#calculator_back').animate({
            opacity: 1
        }, 100)
        calculatePopulation(population);
    }
});

$('#calculator_trigger').on('click', function() {
    $('#calculator').css('top', '60px');
    $('#container').css('margin-left', '0%');
    $('#country').val($('#country option:first').val());
    $('#county').append('<option value="">Choose</option>');
    $('#county').empty().append('<option value="">Choose</option>');
    $('#population').empty();
    $('#user_population').val('');


});
$('#calculator h2').eq(0).on('click', function() {
    $('#calculator').css('top', '768px')
});
$('#calculator_back').on('click', function() {
    $('#container').css('margin-left', '0%');
 //   population = 0;
    $('#user_population').val()
    $('h1').html('Calculator').removeClass('adjust');
 //   $('#country').val($('#country option:first').val());
 //   $('#county').append('<option value="">Choose</option>');
 //   $('#population').html('N/A')

    $(this).animate({
            opacity: 0
        }, 100)
});
$('#country').on('change', function() {
    $('#county').empty().append('<option value="">Choose</option>');
    $.each(organisation[$(this).val()], function(key, inner) {
        $('#county').append('<option value="' + inner + '">' + key + '</option>');
    });
});
$('#county').on('change', function() {
 
    var myvalue = $(this).val();
    myvalue = addCommas(myvalue);
   $('#population').html(myvalue);
    population = $(this).val();



});


$('#user_population').on('change', function() {
   

    userpop = $('#user_population').val();

    if(userpop === '') {

        var pop = $('#population').html();

        console.log(pop)
        population = pop;

        alert('hello garry');

    } else {

        population = $(this).val();    
    
    }

});

function calculatePopulation(innerPopulation) {
    json = {
        
        "Evacal-D3": 6936054,
        "Filnarine": 5978435,
        "Macilax": 10838202,
        "Marol": 14945365,
        "Matrifen": 15688338,
        "Monomil": 11135236,
        "Nasofan": 3444152,
        "Peptac": 3329276,
        "Prestylon": 3554077,
        "Total": 79063728,
    };
    var itts = 0;
    $.each(json, function(key, savings) {
        var savingPerPerson = savings / totalPopulation;
        var savingsForPopulation = innerPopulation * savingPerPerson;
        savingsForPopulation = savingsForPopulation.toFixed(2);
        savingsForPopulation = addCommas(savingsForPopulation);
        $('#results table .result').eq(itts).html('£' + savingsForPopulation);
        itts++;
    });
}


var references = [

"1 Data on file, Teva UK Limited. Prices sourced from C&D, DM+D and NHS Drug Tariffs"

]

getReference(references);