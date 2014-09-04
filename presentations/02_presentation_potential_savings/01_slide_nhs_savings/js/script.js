
//Index navigation arrays [name,filename]

//Fade text
var duration = 800;

$('#slide_container h2').eq(0).delay((duration - 100) * 1).animate({opacity:1}, duration);

$('table').delay((duration - 100) * 2).animate({opacity:1}, duration);
$('#notes p').eq(0).delay((duration - 100) * 3).animate({opacity:1}, duration);
$('#notes p').eq(1).delay((duration - 100) * 4).animate({opacity:1}, duration);
$('#notes p').eq(2).delay((duration - 100) * 5).animate({opacity:1}, duration);
$('.side_note').delay((duration - 100) * 6).animate({opacity:1}, duration);

var references = [

"1 Data on file, Teva UK Limited. Prices sourced from C&D, DM+D and NHS Drug Tariffs"

]

getReference(references);