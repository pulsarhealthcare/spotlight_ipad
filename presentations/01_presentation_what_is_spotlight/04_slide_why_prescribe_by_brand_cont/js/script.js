
//Index navigation arrays [name,filename]

//Fade text

var duration = 800;

$('#slide_container h2').delay((duration - 100) * 0).animate({opacity:1}, duration);
$('#slide_container li').eq(0).delay((duration - 100) * 1).animate({opacity:1}, duration);
$('#slide_container li').eq(1).delay((duration - 100) * 2).animate({opacity:1}, duration);
$('#slide_container li').eq(2).delay((duration - 100) * 3).animate({opacity:1}, duration);
$('#slide_container li').eq(3).delay((duration - 100) * 4).animate({opacity:1}, duration);
$('#slide_container li').eq(4).delay((duration - 100) * 5).animate({opacity:1}, duration);
$('#slide_container li').eq(5).delay((duration - 100) * 6).animate({opacity:1}, duration);
$('.side_note').delay((duration - 100) * 7).animate({opacity:1}, duration);


var references = [

"1 BNF 68, September 2014 - March 2015",
"2 Modified-release preparations. MeReC Bulletin 2000; Volume 11(4): 13-16.",
"3 Items unsuitable for generic prescribing. Available at http:\/\/www.hscboard.hscni.net\/medicinesmanagement\/prescribing%20guidance\/035%20Items_Unsuitable_for_Generic_Prescribing-April_2013.pdf Accessed on 08 Dec 2014.",
"4 Generic prescribing in primary care. MeReC Bull 2011;21(3): 1-6.",
"5 Dunne S et al. BMC Pharmacol Toxicol 2013, 14: 1-19."
]

getReference(references);