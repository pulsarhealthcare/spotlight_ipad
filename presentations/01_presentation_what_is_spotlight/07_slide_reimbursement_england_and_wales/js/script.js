
//Index navigation arrays [name,filename]

//Fade text
var duration = 800;

$('#slide_container #main').delay((duration - 100) * 1).animate({opacity:1}, duration);
$('#slide_container #main_1').delay((duration - 100) * 2).animate({opacity:1}, duration);
$('#slide_container #main_2').delay((duration - 100) * 3).animate({opacity:1}, duration);
$('#notes p').delay((duration - 100) * 4).animate({opacity:1}, duration);
$('.side_note').delay((duration - 100) * 5).animate({opacity:1}, duration);


var references = [

" g"

]


getReference(references);