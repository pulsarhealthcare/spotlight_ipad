
//Index navigation arrays [name,filename]

//Fade text
var duration = 800;

$('#slide_container h2').eq(0).delay((duration - 100) * 1).animate({opacity:1}, duration);
$('#slide_container h3').eq(0).delay((duration - 100) * 2).animate({opacity:1}, duration);
$('#slide_container li').eq(0).delay((duration - 100) * 3).animate({opacity:1}, duration);
$('#slide_container li').eq(1).delay((duration - 100) * 4).animate({opacity:1}, duration);
$('#slide_container li').eq(2).delay((duration - 100) * 5).animate({opacity:1}, duration);
$('#notes p').delay((duration - 100) * 6).animate({opacity:1}, duration);