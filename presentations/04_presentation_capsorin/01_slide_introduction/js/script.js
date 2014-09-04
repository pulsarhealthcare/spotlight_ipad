var duration = 800;

$('#slide_container h2').delay((duration - 100) * 1).animate({opacity:1}, duration);
$('#slide_container h3').eq(0).delay((duration - 100) * 2).animate({opacity:1}, duration);
$('#slide_container h3').eq(1).delay((duration - 100) * 3).animate({opacity:1}, duration);
$('#slide_container h3').eq(2).delay((duration - 100) * 4).animate({opacity:1}, duration);
$('#notes p').delay((duration - 100) * 5).animate({opacity:1}, duration);
$('.side_note').delay((duration - 100) * 6).animate({opacity:1}, duration);

var references = [

"1 Data on file, Teva UK Limited. Prices sourced from C&D, DM+D and NHS Drug Tariffs",
"2 Drug Safety Update December 2009, Vol 3, issue 5:2"

]

getReference(references);