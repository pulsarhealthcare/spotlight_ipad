//Fade text
var duration = 800;
$('#slide_container h1').eq(0).delay((duration - 100) * 1).animate({opacity: 1}, duration);
$('#slide_container h2').eq(0).delay((duration - 100) * 2).animate({opacity: 1}, duration);

//Calculator
var population = 0;
var totalPopulation = 64488804;

$('#submit').on('click', function() {
    if (population === 0) {
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
    $('#calculator').css('top', '60px')
});
$('#calculator h2').eq(0).on('click', function() {
    $('#calculator').css('top', '768px')
});
$('#calculator_back').on('click', function() {
    $('#container').css('margin-left', '0%');
    population = 0;
    $('#user_population').val(0)
    $('#country').val($('#country option:first').val());
    $('#county').empty().append('<option value="">Choose</option>');
    $('#population').html('N/A')
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
    $('#population').html($(this).val());
    population = $(this).val();
});
$('#user_population').on('change', function() {
    population = $(this).val();
});

function calculatePopulation(innerPopulation) {
    json = {
        "Capsorin": 3214593,
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
        savingsForPopulation = savingsForPopulation.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        $('#results table .result').eq(itts).html('£' + savingsForPopulation);
        itts++;
    });
}


var references = [

"Data on file, Teva UK Limited. Prices sourced from C&D, DM+D and NHS Drug Tariffs"

]

getReference(references);