var duration = 800;

$('#slide_container img').delay((duration - 100) * 1).animate({opacity:1}, duration);
$('#slide_container h2').delay((duration - 100) * 2).animate({opacity:1}, duration);
$('.side_note').delay((duration - 100) * 3).animate({opacity:1}, duration);

var references = [

"1 Data on file, Teva UK Limited.",
"2 Nasofan aqueous nasal spray Summary of Product Characteristics.",
"3 Flixonase aqueous nasal spray Summary of Product Characteristics."

]

getReference(references);