var duration = 800;

$('#slide_container h2').eq(0).delay((duration - 100) * 1).animate({opacity:1}, duration);
$('#slide_container h2').eq(1).delay((duration - 100) * 2).animate({opacity:1}, duration);
$('#slide_container h2').eq(2).delay((duration - 100) * 2).animate({opacity:1}, duration);
$('#notes p').delay((duration - 100) * 3).animate({opacity:1}, duration);
$('.side_note').delay((duration - 100) * 4).animate({opacity:1}, duration);

var references = [

"1 Peptac Liquid Summary of Product Characteristics.",
"2 Peptac Peppermint Liquid Summary of Product Characteristics."

]

getReference(references);