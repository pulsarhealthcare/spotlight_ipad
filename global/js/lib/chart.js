//Chart plugin
$.fn.simpleChart = function(chartData) {
    //Globals
    var chart = $(this);
    var w = chart.width();
    var h = chart.height() ;
    var d = chartData;

    var ySpacing = h / chartData.yValues.length;
    var xSpacing = w / chartData.xValues.length;
    var yPoint;

    var lastCo = [xSpacing / 2, h];
    var duration = 2000;
    var lineDuration = duration / d.xValues.length;
    var stepDuration = lineDuration / 12;
    init();
    generateYAxis();

    if (d.chartType === 'bar') {
        generateBarChart();
    } else {
        generateXAxis()
        generateLineCharts()
    }

    function init() {
        chart.append('<p style="opacity:0;" class="sample">100</p>');
        yPoint = $('.sample').height();
    }

    function generateYAxis() {
        
        
        chart.append('<div class="y-axis"></div>');
        var y_axis = $('.y-axis');
        y_axis.append('<span style="height:' + h + 'px" class="y-axis-line"/>');
      
        for (var x = 0; x < chartData.yValues.length; x++) {
            var percentage = (chartData.yValues[x] - yPoint) / d.yValues[d.yValues.length - 1];
            var y = h * percentage;
            y_axis.append('<span style="top:' + (y+2) + 'px; width:' + w + 'px" class="y-axis-seperator"/>');
            y_axis.append('<p class="y-axis-lable" style="top:' + y + 'px">' + chartData.yValues[(chartData.yValues.length - 1) - x] + '</p>')
        }


        for (var x = 0; x < chartData.yValues.length; x++) {
            /*  $('.y-axis-seperator').eq(chartData.yValues.length - (x + 1)).delay(120 * x).animate({
                width: oldW
            }, 700)
            chart.find('p').eq(chartData.yValues.length - (x)).delay(120 * x).animate({
                transform: 'scale(1)'
            }, 400) */
        }
    }

    function generateXAxis() {
        chart.append('<div class="x-axis"></div>');
        $('.x-axis').append('<span style="width:' + w + 'px;top:' + h + 'px" class="x-axis-line"/>');
        for (var x = 0; x < d.xValues.length; x++) {
            var left = (w) / d.xValues.length;
            $('.x-axis').append('<span style="left:' + left * x + 'px;top:' + h + 'px" class="x-axis-seperator"/>');
            $('.x-axis').append('<p class="x-axis-lable"  style="left:' + ((left * x) + 2) + 'px;width:' + left + 'px;top:' + (h + 9) + 'px"> ' + chartData.xValues[x] + '</p>')
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

        for (var x = 0; x < d.lines.length; x++) {

            $('.line_container').append('<canvas width="' + w + '" height="' + h + '" id="line_' + x + '"></canvas>');

            var points = d.lines[x].points;

            var canvas = $('#line_' + x)[0];
            var ctx = canvas.getContext('2d');

            for (var y = 0; y < points.length-1; y++) {
              
                
                setTimeout(function(y) {
                   drawLine(ctx, points[y], points[y + 1], y,'what');  
                }, lineDuration * y, y)
            }
         }
    }
    function drawLine(ctx, start, end, index, color) {

        var array = interpolatePoints(start, end, 12);


        for (var x = 0; x < array.length; x++) {
           
            var yPercentage = array[x] / 1200;
            var yC = h * yPercentage;
            yC = h - Math.round(yC);

            var xPercentage = (index * 12 + x) / (d.xValues.length * 12);

            var xC = w * xPercentage;
            xC = xC + (xSpacing / 2);
            drawPartialLine(ctx, lastCo, [xC, yC], x);
            if (x === 0) {
                ctx.beginPath()
                ctx.fillStyle = 'red';
                ctx.rect(xC - 2, yC - 3, 5, 5);
                ctx.fill();
            }
            lastCo = [xC, yC];
        }

    }

    function drawPartialLine(ctx, start, end, index) {
        setTimeout(function() {
            ctx.beginPath();
            ctx.moveTo(start[0], start[1]);
            ctx.quadraticCurveTo(start[0] + 1, start[1], end[0], end[1]);
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 2;
            ctx.stroke();
        }, (stepDuration * index))
    }


    function interpolatePoints(y, y1, time) {
        var array = [];
        var step = (y1 - y) / time;
        for (var x = 0; x < time; x++) {
            array.push(y + (step * x));
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