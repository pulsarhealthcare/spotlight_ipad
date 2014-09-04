var duration = 800;
 
$('#slide_container h2').delay((duration - 100) * 1).animate({opacity:1}, duration);
$('p').delay((duration - 100) * 2).animate({opacity:1}, duration);

var references = [

"1 Data on file, Teva UK Limited. Prices sourced from C&D, DM+D and NHS Drug Tariffs"

]

getReference(references);