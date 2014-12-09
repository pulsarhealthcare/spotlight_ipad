<?php $root = $_SERVER["DOCUMENT_ROOT"];?>
<?php require $root.'/global/html/header.html';?>
<?php require $root.'/global/html/menu.html';?>

<section style="background:url(img/background.png);background-size:100% 100%;" id="slide_container">
            <h1>Getting started</h1>

            <h2>The Spotlight Cost Calculator is a simple tool<br>
            for illustrating the potential for cost savings<br>
            if you choose to prescribe Spotlight products<br>by brand</h2>

            <h3>It is a populations savings calculator for Primary Care<br>
            Organisations (PCO)* that provides an illustration of
            the<br>potential savings based on an average saving per
            person in the<br>UK and the population of the PCO</h3>

            <h4 class="cost">Start for cost saving calculator</h4>
            <div id="calculator_trigger"></div>
            <div id="notes">
                 <p>Note: where generic preparations are not listed in Drug
                Tariff, prescriptions should be endorsed by pharmacists
                and reimbursement will be based on the list price of
                the product dispensed</p>
                            
                 <p>*An average PCO represents a population of
                approximately 272,000 people. Please note: the term
                Primary Care Organisation refers to Clinical
                Commissioning Groups (England),<br>
                NHS Boards (Scotland), Local Health Boards (Wales)
                and Health and Social Care Trusts (Northern
                Ireland)</p>

              </div>
            
            <p class="side_note">Date of preparation: December 2014 UK/SPL/14/0017p</p>
</section>

<div id="calculator">

<h1>Calculator</h1>
<h2 id="calculator_close">Done</h2>
<div id="calculator_back">
  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
     viewBox="0 0 8.4 13.2" enable-background="new 0 0 8.4 13.2" xml:space="preserve">
<g>
    <polygon fill="#CACACE" points="1.8,13.2 0,11.4 4.8,6.6 0,1.8 1.8,0 8.4,6.6     "/>
</g>
</svg>

  <h2>Calculator</h2>
</div>

<div id="container">
    <div id="form" class="inner">
        <table> 
             <tr>
                <td><h3>Country:</h3></td>
                <td><select id="country">
                <option value="">Choose</option>
                <option value="england">England</option>
                <option value="nIreland">Northern Ireland</option>
                <option value="scotland">Scotland</option>
                <option value="wales">Wales</option>
                </select></td>
            </tr>
            <tr>
                <td><h3>Organisation:</h3></td>
                <td><select id="county"><option value="">Choose</option></select></td>
            </tr>
            <tr>
                <td><h3>Patient population:</h3></td><td><h5 id="population">N/A</h5></td>
            </tr>
        </table>
        <h4>OR</h4>
        <table>
            <tr>
                <td><h3 >Input patient population:</h3></td>
                <td><input id="user_population" type="number"/></td>
            </tr>
        </table>
        <input type="button" id="submit" value="Calculate" />
    </div>

    <div id="results"  class="inner">
          <table >
          <tbody>
                <tr>
                   <td>Spotlight brand</td></td><td>Potential saving</b></td>
                </tr>
        
                <tr>
                   <td><b>Evacal-D3</b><sup>®</sup> (calcium carbonate)</td><td class="result"></td>
                </tr>
<tr style="display: none;">
                   <td><b>Filnarine</b><sup>®</sup> SR (morphine sulphate)</td><td class="result"></td>
                </tr>
                <tr style="display: none;">
                   <td><b>Macilax</b><sup>®</sup> (macrogol compound)</td><td class="result"></td>
                </tr>
                <tr>
                   <td><b>Marol</b><sup>®</sup> PR (tramadol)</td><td class="result"></td>
                </tr>
                <tr>
                   <td><b>Matrifen</b><sup>®</sup> (fentanyl transdermal patch)</td><td class="result"></td>
                </tr>
                <tr>
                   <td><b>Monomil</b><sup>®</sup> XL (isosorbide momonitrate)</td><td class="result"></td>
                </tr>
                <tr>
                   <td><b>Nasofan</b><sup>®</sup> (fluticasone aqueous nasal spray)</td><td class="result"></td>
                </tr>
                <tr>   
                   <td><b>Peptac</b><sup>®</sup> (compound alginate oral suspension liquid)</td><td class="result"></td>
                </tr>
                <tr style="display: none;">
                   <td><b>Prestylon</b><sup>®</sup> (eicosapentaenoic acid/docosahexaenoic acid)</td><td class="result"></td>
                </tr>
                <tr>
                   <td><b>Total</b></td><td class="result"></td>
               </tr>
            </tbody>
          </table>
    </div>
</div>
</div>
<?php require $root.'/global/html/footer.html';?>
