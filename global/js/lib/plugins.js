//jQuery tap library + events
! function(a, b) {
    "use strict";
    var c, d, e, f = "._tap",
        g = "._tapActive",
        h = "tap",
        i = "clientX clientY screenX screenY pageX pageY".split(" "),
        j = {
            count: 0,
            event: 0
        }, k = function(a, c) {
            var d = c.originalEvent,
                e = b.Event(d);
            e.type = a;
            for (var f = 0, g = i.length; g > f; f++) e[i[f]] = c[i[f]];
            return e
        }, l = function(a) {
            if (a.isTrigger) return !1;
            var c = j.event,
                d = Math.abs(a.pageX - c.pageX),
                e = Math.abs(a.pageY - c.pageY),
                f = Math.max(d, e);
            return a.timeStamp - c.timeStamp < b.tap.TIME_DELTA && f < b.tap.POSITION_DELTA && (!c.touches || 1 === j.count) && o.isTracking
        }, m = function(a) {
            if (!e) return !1;
            var c = Math.abs(a.pageX - e.pageX),
                d = Math.abs(a.pageY - e.pageY),
                f = Math.max(c, d);
            return Math.abs(a.timeStamp - e.timeStamp) < 750 && f < b.tap.POSITION_DELTA
        }, n = function(a) {
            if (0 === a.type.indexOf("touch")) {
                a.touches = a.originalEvent.changedTouches;
                for (var b = a.touches[0], c = 0, d = i.length; d > c; c++) a[i[c]] = b[i[c]]
            }
            a.timeStamp = Date.now ? Date.now() : +new Date
        }, o = {
            isEnabled: !1,
            isTracking: !1,
            enable: function() {
                o.isEnabled || (o.isEnabled = !0, c = b(a.body).on("touchstart" + f, o.onStart).on("mousedown" + f, o.onStart).on("click" + f, o.onClick))
            },
            disable: function() {
                o.isEnabled && (o.isEnabled = !1, c.off(f))
            },
            onStart: function(a) {
                a.isTrigger || (n(a), (!b.tap.LEFT_BUTTON_ONLY || a.touches || 1 === a.which) && (a.touches && (j.count = a.touches.length), o.isTracking || (a.touches || !m(a)) && (o.isTracking = !0, j.event = a, a.touches ? (e = a, c.on("touchend" + f + g, o.onEnd).on("touchcancel" + f + g, o.onCancel)) : c.on("mouseup" + f + g, o.onEnd))))
            },
            onEnd: function(a) {
                var c;
                a.isTrigger || (n(a), l(a) && (c = k(h, a), d = c, b(j.event.target).trigger(c)), o.onCancel(a))
            },
            onCancel: function(a) {
                a && "touchcancel" === a.type && a.preventDefault(), o.isTracking = !1, c.off(g)
            },
            onClick: function(a) {
                return !a.isTrigger && d && d.isDefaultPrevented() && d.target === a.target && d.pageX === a.pageX && d.pageY === a.pageY && a.timeStamp - d.timeStamp < 750 ? (d = null, !1) : void 0
            }
        };
    b(a).ready(o.enable), b.tap = {
        POSITION_DELTA: 10,
        TIME_DELTA: 400,
        LEFT_BUTTON_ONLY: !0
    }
}(document, jQuery);

function is_touch_device() {
    return !!('ontouchstart' in window);
}
var touch = is_touch_device();
var input = {};
if (touch) {
    input.tap = 'tap';
    input.down = 'touchstart';
    input.up = 'touchend';
} else {
    input.tap = 'click';
    input.down = 'mousedown';
    input.up = 'mouseup';
}
// Veeva's navigation function
irep = {};
irep.navigateTo = function(slide, presentation) {
    presentation = presentation || '';
    var loc, vloc;
    slide = slide;
    loc = '/presentations/' + presentation + '/' + slide;
    vloc = 'veeva:gotoSlide(' + slide + '.zip' + presentation + ')';
    window.location = (this.veeva()) ? vloc : loc;
}
irep.veeva = function() {
    return (touch && !location.hostname);
}
<<<<<<< HEAD
=======
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
    if (d.chartType = 'bar') {
        generateBarChart();
    } else {}

    function init() {
        chart.append('<p style="opacity:0;" class="sample">100</p>');
        chart.append('<span style="height:' + h + 'px" class="y-axis-line"/>');
        chart.append('<span style="width:' + w + 'px;top:' + h + 'px" class="x-axis-line"/>');
        yPoint = $('.sample').height()
    }

    function generateYAxis() {
        for (var x = 0; x < chartData.yValues.length; x++) {
            var percentage = (chartData.yValues[x] - yPoint) / 350;
            var y = h * percentage;
            chart.append('<span style="top:' + (y + 7) + 'px" class="x-axis-seperator"/>');
            chart.append('<p style="top:' + y + 'px">' + chartData.yValues[(chartData.yValues.length - 1) - x] + '</p>')
        }
        var oldW = $('.x-axis-seperator').width();
        $('.x-axis-seperator').width(0)
        for (var x = 0; x < chartData.yValues.length; x++) {
            $('.x-axis-seperator').eq(chartData.yValues.length - (x + 1)).delay(120 * x).animate({
                width: oldW
            }, 700)
            chart.find('p').eq(chartData.yValues.length - (x)).delay(120 * x).animate({
                transform: 'scale(1)'
            }, 400)
        }
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
                
                $('.bars').append('<div class="bar bar_colum" style="height:0px;margin-top:' + h + 'px;background:' + d.xValues[x][2] + '"></div>');
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
>>>>>>> origin/master
