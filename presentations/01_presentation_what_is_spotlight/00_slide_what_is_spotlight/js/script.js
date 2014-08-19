
//Index navigation arrays [name,filename]

//Fade text
var duration = 800;

//$('#slide_container h1').eq(0).delay((duration - 100) * 1).animate({opacity:1}, duration);
//$('#slide_container h2').eq(0).delay((duration - 100) * 2).animate({opacity:1}, duration);
$('#slide_container h2').eq(1).delay((duration - 100) * 2).animate({opacity:1}, duration);
$('#slide_container img').delay((duration - 100) * 3).animate({opacity:1}, duration);
$('.side_note').delay((duration - 100) * 4).animate({opacity:1}, duration);


//Chart plugin
$.fn.simpleChart = function(chartData) {
	
	var chart = $(this);
	var w = chart.width() ;
	var h = chart.height() -20;

	var d = chartData;
	var ySpacing = chart.height() / chartData.yValues.length;
	chart.append('<p style="opacity:0;" class="sample">100</p>');
	var pHeight = $('.sample').height();

	chart.append('<span style="height:'+h+'px" class="y-axis-line"/>');
    chart.append('<span style="width:'+w+'px;top:'+h+'px" class="x-axis-line"/>');

    //Generate Y Axis
	
	for(var x=0;x < chartData.yValues.length; x++) {
	    var percentage = (chartData.yValues[x]-pHeight) / 350;
		var y = h * percentage;
	    
	    chart.append('<span style="top:'+(y+7)+'px" class="x-axis-seperator"/>');
	    chart.append('<p style="top:'+y+'px">'+chartData.yValues[(chartData.yValues.length-1)-x]+'</p>')
	}
    
    //Animate Y 
var oldW = $('.x-axis-seperator').width();
 $('.x-axis-seperator').width(0)
for(var x=0; x < chartData.yValues.length; x ++) {
	
$('.x-axis-seperator').eq(chartData.yValues.length-(x+1)).delay(120*x).animate({width:oldW},700)
chart.find('p').eq(chartData.yValues.length-(x+1)).delay(120*x).animate({transform:'scale(1)'},400)
}

    
    chart.append('<div class="bars"></div>');
    chart.append('<div class="bar_titles" style="top:'+(h+6)+'"></div>');

    setTimeout(function() {

    	$('#chart_container h4').animate({transform:'scale(1) rotate(-1.5708rad)'},200)
		for (var x=0; x < chartData.xValues.length; x++){
		
		var percentage = chartData.xValues[x][1]/350;
		var height = h * percentage;

		var color = chartData.barColor.split(',1');
		
		$('.bars').append('<div class="bar bar_colum" style="height:0px;margin-top:'+h+'px;background:'+color[0]+','+percentage+color[1]+'"></div>');

	    var tB = $('.bar').eq(x);
		    tB.delay(360*x).animate({height:height,marginTop:h-height},400)
		    $('.bar_titles').append('<h5 class="bar_title bar_colum" style="">'+d.xValues[x][0]+'</h5>');
	        chart.find('.bar_title').eq(x).delay((280+x)*x).animate({transform:'scale(1)'},740+(10 * x))
	    }
    },800)
	

}

var chartData = {
	chartType : 'bar',
	barColor : 'rgba(86, 118, 247,1)',
    yValues : [0,50,100,150,200,250,300,350],
    xValues : [['TEVA UK',300],['ACTAVIS',200],['WOCKMAROT',150],['GLAXOSMYTHKLINE',100],['SANDOZ',50]]
}

$(document).ready(function() {
	$('#chart').simpleChart(chartData);
})