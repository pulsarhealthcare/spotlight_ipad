<?php $root = $_SERVER["DOCUMENT_ROOT"];?>
<?php require $root.'/global/html/header.html';?>
<?php require $root.'/global/html/menu.html';?>
<section id="slide_container">

<div id="teva_load">

<!--<div id="image_holder">-->
<div class="vid_cover"></div>
<div class="vid_overlay_cover"></div>
<video id="teva_vid" autoplay  width="1024" height="567">
	<source src="img/new_video_1.mp4" type="video/mp4"></video>
</video>
<div class="vid_overlay_cover"></div>
<p class="version">Version 2.1</p>

<p class="address">
	Teva UK Limited<br />
	Ridings Point<br />
	Whistler Drive<br />
	Castleford<br />
	West Yorkshire<br />
	WF10 5HX
</p>

</div>

<img id="main" width="653" src="img/map.png"/>
</section>
<?php require $root.'/global/html/footer.html';?>