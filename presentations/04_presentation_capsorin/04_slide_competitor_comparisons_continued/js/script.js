var duration = 800;

$('#slide_container table').delay((duration - 100) * 1).animate({opacity:1}, duration);
$('.side_note').delay((duration - 100) * 2).animate({opacity:1}, duration);

var references = [

"Data on file, Teva UK Limited. Prices sourced from C&D, DM+D and NHS Drug Tariffs"

]

getReference(references);