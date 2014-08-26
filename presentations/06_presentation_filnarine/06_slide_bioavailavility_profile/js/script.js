var duration = 800;

$('#main').delay((duration - 100) * 1).animate({opacity:1}, duration);
$('.side_note').delay((duration - 100) * 2).animate({opacity:1}, duration);


var chartData = {
	chartType : 'line',
    yValues : [10,100,1000],
    xValues : [0,4,8,12,16,20,24,28],
  
    lines : [
            { 
	        color:'#beaf6e',
	        points: [0,10,380,830,980,970,820,780,580,440,380,350,200,140,80,40,20,0,0]
    	    },
            { 
	        color:'#8f0f1f',
	        points: [0,10,380,780,900,910,840,810,630,500,420,380,200,140,80,40,20,0,0]
    	    },
            { 
	        color:'#ccc',
	        points: [0,10,380,780,900,910,840,810,630,500,420,380,200,140,80,40,20,0,0]
    	    }    	    
    	
	]
}

$(document).ready(function() {
	$('#chart').simpleChart(chartData);
})



var references = [

"Data presented shows mean plasma levels (ng\/ml) of morphine and its metabolites morphine-3-glucuronide (M3G) and morphine-6-glucuronide (M6G) after oral intake of 3 tablets of either Filnarine SR 10 mg or MS Contin after a high-fat breakfast in a randomised two-way single dose cross over study performed on 24 healthy volunteers."

]

getReference(references);