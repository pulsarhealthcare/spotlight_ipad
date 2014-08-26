
//Index navigation arrays [name,filename]

//Fade text
var duration = 800;

$('#slide_container h2').eq(0).delay((duration - 100) * 1).animate({opacity:1}, duration);
$('#slide_container .right').eq(0).delay((duration - 100) * 2).animate({opacity:1}, duration);

$('#slide_container h2').eq(1).delay((duration - 100) * 3).animate({opacity:1}, duration);
$('#slide_container .right').eq(1).delay((duration - 100) * 4).animate({opacity:1}, duration);

$('#slide_container h2').eq(2).delay((duration - 100) * 5).animate({opacity:1}, duration);
$('#slide_container .right').eq(2).delay((duration - 100) * 6).animate({opacity:1}, duration);

$('#notes p').delay((duration - 100) * 7).animate({opacity:1}, duration);

var references = [

"IMS Health National Prescribing Audit MAT August 2012.",
"Cost calculated using current reimbursement prices taken from dm+d on-line http:\/\/dmd.nhs.uk\/ C&D Data\/ Drug Tariff Jan 13 where they exist.",
"Population data taken from Binleys."

]

getReference(references);