
//Index navigation arrays [name,filename]

//Fade text
var duration = 800;

$('#slide_container h1').eq(0).delay((duration - 100) * 1).animate({opacity:1}, duration);
$('#slide_container h2').eq(0).delay((duration - 100) * 2).animate({opacity:1}, duration);
$('#slide_container h2').eq(1).delay((duration - 100) * 2).animate({opacity:1}, duration);
$('#slide_container img').delay((duration - 100) * 3).animate({opacity:1}, duration);
$('.side_note').delay((duration - 100) * 4).animate({opacity:1}, duration);


//Chart plugin
$.fn.simpleChart = function(chartData) {
	var chart = $(this);
	var w = chart.width();
	var h = chart.height();

	var ySpacing = chart.height() / chartData.yValues.length;
    for(var x=0;x < chartData.yValues.length; x++) {
	var percentage = chartData.yValues[x] / 350;
	var y = h * percentage;
	chart.append('<p style="top:'+y+'px">'+chartData.yValues[chartData.yValues.length-x]+'</p>')
	}

	for (var x=0; x < chartData.xValues.length; x++){
		var percentage = chartData.xValues[x][1]/350;
		var height = h * percentage;
		chart.append('<div class="bar" style="height:'+height+'px;top:'+((h-height)+42)+'px;width:20px;left:'+(100+(24*x))+';background:rgba(0,0,0,'+percentage+'"></div>');
	}
}

var chartData = {
    yValues : [0,50,100,150,200,250,300,350],
    xValues : [['TEVA UK',250],['ACTAVIS',200],['WOCKMAROT',150],['GLAXOSMYTHKLINE',100],['SANDOZ',50]]
}
