
//Index navigation arrays [name,filename]

//Fade text
var duration = 800;

$('#slide_container h1').eq(0).delay((duration - 100) * 1).animate({opacity:1}, duration);
$('#slide_container h2').eq(0).delay((duration - 100) * 2).animate({opacity:1}, duration);
$('#slide_container img').eq(1).delay((duration - 100) * 3).animate({opacity:1}, duration);
$('.side_note').delay((duration - 100) * 4).animate({opacity:1}, duration);

var references = [

"IMS Health UK Limited, retail market (BPI) & hospital market (HPAI), volume (packs), September 2012 – August 2013 (MAT August 2013)",
"IMS Health UK Limited, ex-factory (BGMA), volume (packs), MAT August 2013"
      
]

getReference(references);