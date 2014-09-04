var duration = 800;

$('#slide_container h2').delay((duration - 100) * 1).animate({opacity:1}, duration);
$('#slide_container h3').eq(0).delay((duration - 100) * 2).animate({opacity:1}, duration);
$('#slide_container h4').eq(0).delay((duration - 100) * 3).animate({opacity:1}, duration);
$('#slide_container h3').eq(1).delay((duration - 100) * 4).animate({opacity:1}, duration);
$('#slide_container h4').eq(1).delay((duration - 100) * 5).animate({opacity:1}, duration);
$('.side_note').delay((duration - 100) * 6).animate({opacity:1}, duration);

var references = [

"1 Filnarine SR Summary of Product Characteristics.",
"2 MST Continus  Summary of Product Characteristics."

]

getReference(references);