var duration = 800;

$('#slide_container img').delay((duration - 100) * 1).animate({opacity:1}, duration);
$('#slide_container h2').delay((duration - 100) * 2).animate({opacity:1}, duration);
$('#slide_container ul li').eq(0).delay((duration - 100) * 3).animate({opacity:1}, duration);
$('#slide_container ul li').eq(1).delay((duration - 100) * 4).animate({opacity:1}, duration);
$('#slide_container ul li').eq(2).delay((duration - 100) * 5).animate({opacity:1}, duration);
$('.side_note').delay((duration - 100) * 6).animate({opacity:1}, duration);

var chartData = {
	chartType : 'line',
	barColor : 'rgba(86, 118, 247,1)',
    yValues : [0,200,400,600,800,1000,1200],
    xValues : [0,0.33,0.66,1,1.25,1.75,2,2.5,3,3.5,4,5,6,12,16,24,38,48],
    xSegments: []
    lines : [
            { 
	         color:'red',
	         points: [[0,0],[0.67],[]]
    	    },
    	    { 
	         color:'red',
	         points: [[0,0],[0.67],[]]
    	    },

    	    ]
    }
}

$(document).ready(function() {
	$('#chart').simpleChart(chartData);
})