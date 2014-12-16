var duration = 800;

$('#slide_container img').delay((duration - 100) * 1).animate({opacity:1}, duration);
$('#slide_container h2').delay((duration - 100) * 2).animate({opacity:1}, duration);
$('.side_note').delay((duration - 100) * 3).animate({opacity:1}, duration);

var references = [

"1 Data presented shows mean plasma levels (ng\/ml) of isosorbide-5-mononitrate after oral administration of ISM\/R (at a dosage corresponding to 60 mg of active principle) in a randomised two-period cross over study performed on 24 healthy volunteers. Data on file, Teva UK Limited",
"2 BNF 67, March - September 2014",
"3 Generic prescribing in primary care. MeReC Bulletin 2011; Volumer 21(3):1-6"

]

getReference(references);