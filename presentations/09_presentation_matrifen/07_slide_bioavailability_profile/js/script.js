var duration = 800;

$('#slide_container img').delay((duration - 100) * 1).animate({opacity:1}, duration);
$('#slide_container h2').delay((duration - 100) * 2).animate({opacity:1}, duration);
$('.side_note').delay((duration - 100) * 3).animate({opacity:1}, duration);



var references = [

"1 Kress HG, Boss H, Delvin T, et al. Transdermal fentanyl matrix patches Matrifen and Durogesic DTrans are bioequivalent. Eur J Pharm Biopharm 2010; 75:225-231."
             
]

getReference(references);