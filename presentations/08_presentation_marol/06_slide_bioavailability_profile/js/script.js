var duration = 800;

$('#slide_container img').delay((duration - 100) * 1).animate({opacity:1}, duration);
$('#slide_container h2').eq(0).delay((duration - 100) * 2).animate({opacity:1}, duration);
$('#slide_container h2').eq(1).delay((duration - 100) * 3).animate({opacity:1}, duration);
$('#notes p').delay((duration - 100) * 4).animate({opacity:1}, duration);
$('.side_note').delay((duration - 100) * 5).animate({opacity:1}, duration);



var chartData = {
	chartType : 'line',	
    yValues : [0,50,100,150,200],
    xValues : [0,4,8,12,16,20,24,28,32,36,40,44,48],
  
    lines : [
            { 
	        color:'#beaf6e',
	        points: [7,177,187,107,77,55,37,32,18,15,12,9,7]
    	    },
            
    	    
    	
	]
}

$(document).ready(function() {
	$('#chart').simpleChart(chartData);
})





var references = [

"Data on file, Teva UK Limited.",
"BNF 67, March - September 2014",
"Modified-release preparations. MeReC Bulletin 2000; Volume 11(4): 13-16"

]

getReference(references);