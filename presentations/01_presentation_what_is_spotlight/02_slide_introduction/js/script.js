
//Index navigation arrays [name,filename]

//Fade text

var duration = 800;

$('#slide_container h2').eq(0).delay((duration - 100) * 1).animate({opacity:1}, duration);
$('#slide_container h2').eq(1).delay((duration - 100) * 2).animate({opacity:1}, duration);
$('table').eq(0).delay((duration - 100) * 3).animate({opacity:1}, duration);
$('.side_note').delay((duration - 100) * 4).animate({opacity:1}, duration);

// References


var references = [

]


getReference(null);