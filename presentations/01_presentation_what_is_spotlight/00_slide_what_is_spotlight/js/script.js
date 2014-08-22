
//Index navigation arrays [name,filename]

//Fade text
var duration = 800;

var chartData = {
	chartType : 'bar',
    yValues : [0,50,100,150,200,250,300,350],
    xValues : [['TEVA UK',300,'#006ea1'],['ACTAVIS',200,'#4c86b1'],['WOCKMAROT',150,'#6d9ec1'],['GLAXOSMYTHKLINE',100,'#9eb6d0'],['SANDOZ',50,'#becfe0']]
}

$('#slide_container h1').eq(0).delay((duration - 100) * 1).animate({opacity:1}, duration);
$('#slide_container h2').eq(0).delay((duration - 100) * 2).animate({opacity:1}, duration);
$('#slide_container h2').eq(1).delay((duration - 100) * 2).animate({opacity:1}, duration);
$('#slide_container .chart_container').delay((duration - 100) * 3).animate({opacity:1}, duration);

setTimeout(function() {
	$('.chart').simpleChart(chartData);
},(duration - 100) * 3)

$('.side_note').delay((duration - 100) * 4).animate({opacity:1}, duration);




		
