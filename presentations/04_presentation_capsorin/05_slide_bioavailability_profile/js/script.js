var duration = 800;

$('#slide_container img').delay((duration - 100) * 1).animate({opacity:1}, duration);
$('#slide_container h2').delay((duration - 100) * 2).animate({opacity:1}, duration);
$('#slide_container ul li').eq(0).delay((duration - 100) * 3).animate({opacity:1}, duration);
$('#slide_container ul li').eq(1).delay((duration - 100) * 4).animate({opacity:1}, duration);
$('#slide_container ul li').eq(2).delay((duration - 100) * 5).animate({opacity:1}, duration);
$('.side_note').delay((duration - 100) * 6).animate({opacity:1}, duration);

var chartData = {
	chartType : 'line',
    yValues : [0,200,400,600,800,1000,1200],
    xValues : [0,0.33,0.66,1,1.25,1.5,1.75,2,2.5,3,3.5,4,6,8,12,16,24,36,48],
  
    lines : [
            { 
	         color:'#8f0f1f',
	         points: [0,3,390,790,840,860,870,850,800,540,400,390,200,190,100,80,60,20,0]
    	    },
    	    { 
	         color:'red',
	         points: [0,3,390,790,540,160,170,850,800,540,400,390,200,190,100,80,60,20,0]
    	    },
	]
}

$(document).ready(function() {
	$('#chart').simpleChart(chartData);
})