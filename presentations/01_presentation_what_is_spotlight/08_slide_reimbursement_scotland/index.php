<?php $root = $_SERVER["DOCUMENT_ROOT"];?>
<?php require $root.'/global/html/header.html';?>
<?php require $root.'/global/html/menu.html';?>

<section style="background:url(img/background.png);background-size:100% 100%;" id="slide_container">
      <h1>Reimbursement - an example - Scotland</h1>



<div id="main" style="background: url('img/main_0.png') top left no-repeat; background-size: 510px 68px;">

<p>A patient is dispensed a pack of Filnarine<sup>R</sup> SR 200 mg tablets (morphine sulphate SR 200 mg) 60s pack</p>
<p><span>(how the prescription is written can have a big effect on costs)</span></p>

</div>


<div id="main_1" style="background: url('img/main_1.png') top left no-repeat; background-size: 252px 313px;">

	<div class="header">

		<h2>Option A</h2>
		<h3>Generic prescription</h3>

	</div>

	<div class="inner">

		<p>Rx <span class="dark inline">generic</span> prescription for <span class="blue">Morphine sulphate SR 200 mg tablets 60 pack</span></p>

		<p>Pharmacist chooses to dispense MST <span class="lineup">Continus<sup>®</sup> 200 mg (morphine</span> <span class="double lineup">sulphate SR 200 mg) at a cost
		to</span> <span class="triple lineup">them of £73.21<sup>*</sup></span></p>

		<p>The pharmacist endorses the prescription and is reimbursed and the practice is attributed the cost against the list price of <span class="dark">MST Continus 200 mg: £81.34</span></p>

	</div>

	<div class="cost">
		<p>Cost to NHS = £81.34</p>
	</div>

</div>


<div id="main_2" style="background: url('img/main_2.png') top left no-repeat; background-size: 252px 357px;">

	<div class="header">
		<h2>Option B</h2>
		<h3>Prescription Spotlight brands</h3>
	</div>

	<div class="inner">

		<p>Rx <span>branded<span> prescription for <span class="blue">Filnarine<sup>®</sup> SR 200 mg tablets 60 pack</span></p>

		<p>Pharmacist must dispense 
Filnarine SR 200 mg
at a cost to <span class="lineup">them of £25.75<sup>*</sup></span></p>

		<p>The pharmacist is reimbursed and the practice is attributed the cost against the <span class="dark">list price of Filnarine 
		SR 200 mg: £43.59</span></p>

	</div>

	<div class="cost">
		<p>Cost to NHS = £43.59</p>
		<p>PCO cost saving per pack (£37.75)</p>
	</div>

</div>

  <div id="notes">
          <p>*Assumed pharmacy purchase price is NHS list price minus 10%<sup>1</sup></p>
          <p>**Published pharmacy purchase prices, additional discounts may be offered to pharmacists by Teva(correct as of June 2014)</p>
      </div>
      
</section>

<p class="side_note">Date of preparation: July 2014  UK/SPL/14/0017</p>

<?php require $root.'/global/html/footer.html';?>