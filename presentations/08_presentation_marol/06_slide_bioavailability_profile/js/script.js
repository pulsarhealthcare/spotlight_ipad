var duration = 800;

$('#slide_container img').delay((duration - 100) * 1).animate({opacity:1}, duration);
$('#slide_container h2').eq(0).delay((duration - 100) * 2).animate({opacity:1}, duration);
$('#slide_container h2').eq(1).delay((duration - 100) * 3).animate({opacity:1}, duration);
$('#notes p').delay((duration - 100) * 4).animate({opacity:1}, duration);
$('.side_note').delay((duration - 100) * 5).animate({opacity:1}, duration);


var references = [

"1 Data on file, Teva UK Limited.",
"2 BNF 68, September 2014 - March 2015",
"3 Generic prescribing in primary care. MeReC Bulletin 2011; Volumer 21(3):1-6"

]

getReference(references);