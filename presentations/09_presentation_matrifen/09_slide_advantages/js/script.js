var duration = 1000;

$('#slide_container h2').eq(0).delay((duration - 100) * 1).animate({opacity:1}, duration);
$('#slide_container h2').eq(1).delay((duration - 100) * 2).animate({opacity:1}, duration);
$('#slide_container h2').eq(2).delay((duration - 100) * 3).animate({opacity:1}, duration);
$('#slide_container img').delay((duration - 100) * 4).animate({opacity:1}, duration);
$('.side_note').delay((duration - 100) * 5).animate({opacity:1}, duration);

var references = [

"Marier JF, Lor M, Potvin D, DiMarco M, et al.Pharmokenetics, tolderability and performance of a novel matrix transdermal delivery system of fentanyl relative to the commercially available reservoir formulation in healthy subjects. J Clin Pharmacol 2006; 46;642-53.",
"Matrifen Summary of Product Characteristics.",
"Durogesic DTrans Summary of Product Characteristics."

]

getReference(references);