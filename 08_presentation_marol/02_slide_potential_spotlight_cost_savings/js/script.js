var duration = 800;
 
$('#slide_container h2').delay((duration - 100) * 1).animate({opacity:1}, duration);
$('#slide_container img').delay((duration - 100) * 2).animate({opacity:1}, duration);
$('p').eq(0).delay((duration - 100) * 3).animate({opacity:1}, duration);
$('p').eq(1).delay((duration - 100) * 4).animate({opacity:1}, duration);