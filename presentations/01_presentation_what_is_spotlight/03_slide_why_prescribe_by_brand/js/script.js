
//Index navigation arrays [name,filename]

//Fade text

var duration = 800;

$('#slide_container h1').delay((duration - 100) * 1).animate({opacity:1}, duration);
$('#slide_container h2').delay((duration - 100) * 2).animate({opacity:1}, duration);
$('#slide_container h3').delay((duration - 100) * 3).animate({opacity:1}, duration);
$('#slide_container h4').eq(0).delay((duration - 100) * 4).animate({opacity:1}, duration);
$('#slide_container h4').eq(1).delay((duration - 100) * 5).animate({opacity:1}, duration);
$('.side_note').delay((duration - 100) * 6).animate({opacity:1}, duration);


var references = [

"1 BNF 68, September 2014 - March 2015",
"2 Modified-release preparations. MeReC Bulletin 2000; Volume 11(4): 13-16."

]

getReference(references);