//Chart plugin
$.fn.simpleChart = function(chartData) {
    //Globals
    var chart = $(this);
    var w = chart.width();
    var h = chart.height() - 20;
    var d = chartData;
    var ySpacing = chart.height() / chartData.yValues.length;
    var yPoint;
    init();
    generateYAxis();
    console.log(d);
    if (d.chartType === 'bar') {
        generateBarChart();

    } else {
        generateXAxis()
        generateLineCharts()
    }

    function init() {
        chart.append('<p style="opacity:0;" class="sample">100</p>');
        chart.append('<span style="height:' + h + 'px" class="y-axis-line"/>');
        yPoint = $('.sample').height();
    }

    function generateYAxis() {
        console.log()
        for (var x = 0; x < chartData.yValues.length; x++) {
            var percentage = (chartData.yValues[x] - yPoint) / d.yValues[d.yValues.length-1];
            var y = h * percentage;
            chart.append('<span style="top:' + (y + 7) + 'px" class="y-axis-seperator"/>');
            chart.append('<p class="y-axis-lable" style="top:' + y + 'px">' + chartData.yValues[(chartData.yValues.length - 1) - x] + '</p>')
        }

        var oldW = $('.y-axis-seperator').width();

       // $('.x-axis-seperator').width(0)
        for (var x = 0; x < chartData.yValues.length; x++) {
            $('.y-axis-seperator').eq(chartData.yValues.length - (x + 1)).delay(120 * x).animate({
                width: oldW
            }, 700)
            chart.find('p').eq(chartData.yValues.length - (x)).delay(120 * x).animate({
                transform: 'scale(1)'
            }, 400)
        } 
    }

    function generateXAxis() {
         chart.append('<div class="x-axis-seperators"></div>');
         $('.x-axis-seperators').append('<span style="width:' + w + 'px;top:' + h + 'px" class="x-axis-line"/>');
        
        for (var x = 0; x < d.xValues.length; x++) {
            var left = w / d.xValues.length;
            $('.x-axis-seperators').append('<span style="left:'+left*x+';top:'+h+'px" class="x-axis-seperator"/>');
            $('.x-axis-seperators').append('<p class="x-axis-lable"  style="left:' + ((left*x)+2) + 'px;width:'+left+'px;top:'+(h+9)+'px"> '+ chartData.xValues[x] + '</p>')
        }

        for (var x = 0; x < chartData.xValues.length; x++) {
            /*var percentage = (chartData.xValues[x]) / d.xValues[d.xValues.length-1];
            var y = w * percentage;
            */
        }
    }

    function generateLineCharts() {
        chart.append('<div class="line_container"></div>');
        var left = w / d.xValues.length;
        for(var x=0; x < d.lines.length; x++) {
           
            $('.line_container').append('<canvas width="'+w+'" height="'+h+'" id="line_'+x+'"></canvas>');
            
            var points = d.lines[x].points;
            var array = [];
            for(var y=0; y < points.length-1; y++) {
                array.push(interpolatePoints(points[y],points[y+1],10));
            }

            //Draw line 
           
            var canvas = $('#line_'+x)[0];
            var ctx = canvas.getContext('2d');

            var lastCo = [0,0];
            ctx.beginPath()
                        ctx.moveTo(lastCo[0],lastCo[1])
            for(var y=0; y < array.length; y ++) {
              
                for(var z=0; z < array[y].length; z ++ ) {
                   
                   var yPercentage = array[y][z] / 1200;
                   
                   var yC = h * yPercentage;
                   yC = h - Math.round(yC); 


                   var xPercentage = (y*10+z) / (d.xValues.length*10);
                   var xC = w * xPercentage;
                   
               
                   
                   
                  
                        
                        ctx.lineTo(xC,yC);
                        ctx.strokeStyle = 'red';
                        ctx.lineWidth = 2;
                        ctx.stroke(); 
                       
             
                   
                   if(z===0){
                    ctx.beginPath()
                    ctx.rect(xC-2,yC-4,4,4);
                    ctx.fill();
                   }
                   
                }


               
            }


        }
    }

    function interpolatePoints(y,y1,time) {
        var array = [];
        console.log(y+' '+y1);

        var step = (y1 - y) /time;

        for(var x=0; x < time;x ++) {
            array.push(y+(step*x));
        }
        return array;
        
    }

    function generateBarChart() {
        chart.append('<div class="bars"></div>');
        chart.append('<div class="bar_titles" style="top:' + (h + 6) + '"></div>');
        setTimeout(function() {
            $('#chart_container h4').animate({
                opacity: 1
            }, 200)
            for (var x = 0; x < chartData.xValues.length; x++) {
                var percentage = chartData.xValues[x][1] / 350;
                var height = h * percentage;
                var color = chartData.barColor.split(',1');
                $('.bars').append('<div class="bar bar_colum" style="height:0px;margin-top:' + h + 'px;background:' + color[0] + ',' + percentage + color[1] + '"></div>');
                var tB = $('.bar').eq(x);
                tB.delay(360 * x).animate({
                    height: height,
                    marginTop: h - height
                }, 400)
                $('.bar_titles').append('<h5 class="bar_title bar_colum" style="">' + d.xValues[x][0] + '</h5>');
                chart.find('.bar_title').eq(x).delay((280 + x) * x).animate({
                    transform: 'scale(1)'
                }, 740 + (10 * x))
            }
        }, 800)
    }

    
}