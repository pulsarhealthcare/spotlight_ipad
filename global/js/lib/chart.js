//Chart plugin
$.fn.simpleChart = function(chartData,callback) {
    //Globals
    var chart = $(this);
    var stepLength = 6;
    var w = chart.width();
    var h = chart.height();
    var data = chartData;
    var yPoint;
    var delay = 2000;

    console.log(w / data.xValues.length)
    var lastCo = [];
    var duration = 2000;
    var lineDuration = duration / data.xValues.length;
    var stepDuration = lineDuration / stepLength;

    init();
    generateYAxis();
    if(callback) {
        callback_1(callback);
    }
    if (data.chartType === 'bar') {
        generateBarChart();
    } else {
        generateXAxis();
        generateLineCharts();
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
            var percentage = (chartData.yValues[x] - yPoint) / data.yValues[data.yValues.length - 1];
            var y = h * percentage;
            y_axis.append('<span style="top:' + (y + 2) + 'px;opacity:0;" class="y-axis-seperator"/>');
            y_axis.append('<p class="y-axis-lable" style="top:' + y + 'px">' + chartData.yValues[(chartData.yValues.length - 1) - x] + '</p>')
        }


        for (var x = 0; x < data.yValues.length; x++) {
          var oldW = $('.y-axis-seperator').width();
          setTimeout(function() {
            $('.y-axis-seperator').css('width','0px')
          })
          
          $('.y-axis-seperator').css('opacity',1).eq(chartData.yValues.length - (x + 1)).delay(120 * x).animate({
                width: oldW 
            }, 1200)
            chart.find('p').eq(chartData.yValues.length - (x)).delay(120 * x).animate({
                transform: 'scale(1)'
            }, 400) 
        }
    }

    function generateXAxis() {
        chart.append('<div class="x-axis"></div>');
        
        $('.x-axis').append('<span style="width:' + w + 'px;top:' + h + 'px" class="x-axis-line"/>');
        
        $('.x-axis-line').css('width', '0px')
        $('.x-axis-line').animate({width:w},1200)

        for (var x = 0; x < data.xValues.length; x++) {
            var left = (w) / data.xValues.length;
            $('.x-axis').append('<span style="left:' + left * x + 'px;top:' + h + 'px" class="x-axis-seperator"/>');
            $('.x-axis').append('<p class="x-axis-lable"  style="left:' + ((left * x) + 2) + 'px;width:' + left + 'px;top:' + (h + 9) + 'px"> ' + data.xValues[x] + '</p>')
           $('.x-axis-lable').delay(100 * x).animate({opacity:1},200)
            $('.x-axis-seperator').delay(50 * x).animate({opacity:1},200)
        }
    }

    function generateLineCharts() {
        chart.append('<div class="line_container"></div>');
        var left = w / data.xValues.length;

        for (var x = 0; x < data.lines.length; x++) {

            $('.line_container').append('<canvas width="' + w + '" height="' + h + '" id="line_' + x + '"></canvas>');

            var points = data.lines[x].points;

            var canvas = $('#line_' + x)[0];

            var ctx = canvas.getContext('2d');

            lastCo.push(false);
            generateLine(x, ctx);

        }

    }


    function generateLine(lineIndex, ctx) {

        var points = data.lines[lineIndex].points;

        var lineArray = [];
        var lastX = 0;
        var isPoint = false;

        for (x = 0; x < points.length; x++) {
            if (x === points.length - 1) {

                var X = lastX++;
                var xPercentage = (X + (stepLength / 2)) / (data.xValues.length * stepLength);
                var xC = w * xPercentage;
                lineArray.push([
                    [xC, (h - points[x]) - (stepLength / 2)], true
                ]);

            } else {
                var array = interpolatePoints(points[x], points[x + 1], stepLength);
                isPoint = true;

                for (var y = 0; y < array.length; y++) {

                    var yPercentage = array[y] / data.yValues[data.yValues.length - 1];
                    var yC = h * yPercentage;
                    yC = h - yC;

                    var X = lastX++;

                    var xPercentage = (X + (stepLength / 2) + 1) / (data.xValues.length * stepLength);

                    var xC = w * xPercentage;


                    if (isPoint) {
                        lineArray.push([
                            [xC, yC - (stepLength / 2)], true
                        ]);
                        isPoint = false;
                    } else {
                        lineArray.push([
                            [xC, yC - (stepLength / 2)], false
                        ]);
                    }

                }

            }

        }
        drawLine(lineArray, data.lines[lineIndex].color, ctx, lineIndex);
    }

    function drawLine(array, color, ctx, lineIndex) {
        for (var x = 0; x < array.length; x++) {
            drawStep(ctx, array[x], color, x, lineIndex)
        }
    }

    function drawStep(ctx, step, color, index, lineIndex) {

        var totalLength = (data.xValues.length * stepLength) * stepDuration;

        setTimeout(function(ctx, step, color) {
            ctx.beginPath();
            ctx.strokeStyle = color;
            if (!lastCo[lineIndex]) {
                lastCo[lineIndex] = [step[0][0], step[0][1]];
            } else {
                ctx.moveTo(lastCo[lineIndex][0], lastCo[lineIndex][1])
                ctx.lineTo(step[0][0], step[0][1]);
                ctx.lineWidth = 2;
                ctx.stroke();
                lastCo[lineIndex] = [step[0][0], step[0][1]];
            }


            if (step[1]) {
                ctx.rect(step[0][0] - (stepLength / 2), step[0][1] - (stepLength / 2), stepLength, stepLength)
                ctx.fillStyle = color;
                ctx.fill();
            }

        }, delay + ((totalLength * lineIndex) + (index * stepDuration)), ctx, step, color);
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
                $('.bars').append('<div class="bar bar_colum" style="height:0px;margin-top:' + h + 'px;background:'+data.xValues[x][2]+'"></div>');
                var tB = $('.bar').eq(x);
                var barDuration = duration / chartData.xValues.length;
                tB.delay(barDuration * x).animate({
                    height: height,
                    marginTop: h - height
                }, barDuration);

                $('.bar_titles').append('<h5 class="bar_title bar_colum" style="">' + data.xValues[x][0] + '</h5>');
                chart.find('.bar_title').eq(x).delay((280 + x) * x).animate({
                    transform: 'scale(1)'
                }, 740 + (10 * x));

            }
        }, 800)
    }

    function callback_1(callback) {
        setTimeout(function() {
        callback();
        },duration,callback);
    }
}