
//Index navigation arrays [name,filename]

//Fade text
var duration = 800;

//$('#slide_container h1').eq(0).delay((duration - 100) * 1).animate({opacity:1}, duration);
//$('#slide_container h2').eq(0).delay((duration - 100) * 2).animate({opacity:1}, duration);
$('#slide_container h2').eq(1).delay((duration - 100) * 2).animate({opacity:1}, duration);
$('#slide_container img').delay((duration - 100) * 3).animate({opacity:1}, duration);
$('.side_note').delay((duration - 100) * 4).animate({opacity:1}, duration);

var chartData = {
	chartType : 'bar',
	barColor : 'rgba(86, 118, 247,1)',
    yValues : [0,50,100,150,200,250,300,350],
    xValues : [['TEVA UK',300],['ACTAVIS',200],['WOCKMAROT',150],['GLAXOSMYTHKLINE',100],['SANDOZ',50]]
}

$(document).ready(function() {
	$('#chart').simpleChart(chartData);
})