
//Index navigation arrays [name,filename]

//Fade text
var duration = 800;

$('#slide_container h2').eq(0).delay((duration - 100) * 1).animate({opacity:1}, duration);
$('#slide_container h3').eq(0).delay((duration - 100) * 2).animate({opacity:1}, duration);
$('#slide_container h4').eq(0).delay((duration - 100) * 3).animate({opacity:1}, duration);
$('#slide_container h4').eq(1).delay((duration - 100) * 3).animate({opacity:1}, duration);
$('.side_note').delay((duration - 100) * 5).animate({opacity:1}, duration);

// References


var references = [

"Data on file, Teva UK Limited.",
"Revisions to the GMS contract 2006\/7\/07. http:\/\/www.pcc.nhs.uk\/uploads\/ngms\/revisions¡gms¡contract270306.pdf"

]

getReference(references);