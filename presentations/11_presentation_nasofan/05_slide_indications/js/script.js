var duration = 800;

$('#slide_container h2').eq(0).delay((duration - 100) * 1).animate({opacity:1}, duration);
$('#slide_container h2').eq(1).delay((duration - 100) * 1).animate({opacity:1}, duration);
$('#slide_container h2').eq(2).delay((duration - 100) * 2).animate({opacity:1}, duration);
$('#slide_container h2').eq(3).delay((duration - 100) * 3).animate({opacity:1}, duration);
$('#slide_container h2').eq(4).delay((duration - 100) * 3).animate({opacity:1}, duration);
$('#slide_container h2').eq(5).delay((duration - 100) * 3).animate({opacity:1}, duration);
$('.side_note').delay((duration - 100) * 4).animate({opacity:1}, duration);

var references = [

"1 Nasofan aqueous nasal spray Summary of Product Characteristics",
"2 Flixonase aqueous nasal spray Summary of Product Characteristics."

]                                    

getReference(references);