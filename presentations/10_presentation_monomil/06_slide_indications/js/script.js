var duration = 800;

$('#slide_container h2').eq(0).delay((duration - 100) * 1).animate({opacity:1}, duration);
$('#slide_container h2').eq(1).delay((duration - 100) * 2).animate({opacity:1}, duration);
$('#slide_container h2').eq(2).delay((duration - 100) * 3).animate({opacity:1}, duration);
$('.side_note').delay((duration - 100) * 4).animate({opacity:1}, duration);

  "Data presented shows mean plasma levels (ng\/ml) of isosorbide-5-mononitrate after oral administration of ISM\/R (at a dosage corresponding to 60 mg of active principle) in a randomised two-period cross over study performed on 24 healthy volunteers. Data on file, Teva UK Limited",
                                    "BNF 67, March - September 2014",
                                    "Modified-release preparations. MeReC Bulletin 2000; Volume 11(4): 13-16."

var references = [

"Monomil Summary of Product Characteristics.",
"Imdur Summary of Product Characteristics."                                    

]

getReference(references);