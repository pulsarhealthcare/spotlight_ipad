var duration = 800;

$('#slide_container img').delay((duration - 100) * 1).animate({opacity:1}, duration);
$('#notes p').delay((duration - 100) * 2).animate({opacity:1}, duration);
$('.side_note').delay((duration - 100) * 3).animate({opacity:1}, duration);

var references = [

"1 Peptac Liquid Summary of Product Characteristics.",
"2 Peptac Peppermint Liquid Summary of Product Characteristics.",
"3 Gaviscon Original Aniseed Relief Summary of Product Characteristics.",
"4 Gaviscon Peppermint Liquid Relief Summary of Product Characteristics.",
"5 Gaviscon Advance – Aniseed Flavour Oral Suspension Summary of Product Characteristics.",
"6 Gaviscon Advance – Peppermint Flavour Oral Suspension Summary of Product Characteristics."

]

getReference(references);