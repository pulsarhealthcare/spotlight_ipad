
//Index navigation arrays [name,filename]

//Fade text
var duration = 800;

$('#slide_container h1').eq(0).delay((duration - 100) * 1).animate({opacity:1}, duration);
$('#slide_container h2').eq(0).delay((duration - 100) * 2).animate({opacity:1}, duration);
$('#slide_container h2').eq(1).delay((duration - 100) * 2).animate({opacity:1}, duration);
$('#slide_container img').delay((duration - 100) * 3).animate({opacity:1}, duration);
$('.side_note').delay((duration - 100) * 4).animate({opacity:1}, duration);

//Chart

var chart = $('#chart')[0];
var ctx = chart.getContext('2d');

chart.width = 340;
chart.height = 250;

w = chart.width;
h = chart.height;

var chartData = {
    yValues : [0,50,100,150,200,250,300,350],
    xValues : [['TEVA UK',300],['ACTAVIS',200],['WOCKMAROT',150],['GLAXOSMYTHKLINE',100],['SANDOZ',50]]
}

ySpacing = h / chartData.yValues.length;

for(var x=0; x < chartData.yValues.length; x++){
    ctx.fillText(chartData.yValues[x],10,(h-10) - (ySpacing * x));
     ctx.strokeStyle = '#CCC';
    ctx.beginPath();

    ctx.moveTo(40,(h-10) - (ySpacing * x));
    ctx.lineTo(w,(h-10) - (ySpacing * x));

    ctx.stroke();

    if(x === chartData.yValues.length-1) {
	    ctx.fillText(chartData.yValues[x],10,(h-10) - (ySpacing * x));
	    ctx.beginPath();
	    ctx.moveTo(44,(h-10) - (ySpacing * x));
	    ctx.lineTo(44,h-6);
	    ctx.stroke();
    }
}

