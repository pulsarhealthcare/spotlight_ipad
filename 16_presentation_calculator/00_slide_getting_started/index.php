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
            <div id="caculator_trigger"></div>
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
            <p class="side_note">Date of preparation: July 2014 UK/SPL/14/0017</p>




</section>

<div id="calculator">
    <h1>Calculator</h1>
    <h2>Done</h2>
    <table> 
         <tr>
            <td>Country</td><td><div class="select" id="country"></div></td>
        </tr>
        <tr>
            <td>Organisation</td><td><div class="select" id="organ"></div></td>
        </tr>
        <tr>
            <td>Patient population</td><td id="population"></td>
        </tr>
        <tr>
            <td>OR</td>
        </tr>
        <tr>
            <td>Input patient population:</td>
        </tr>
        <tr></tr>
        <tr><input type="button" value="Calculate" /></tr>
       
    </table>
</div>

      
<?php require $root.'/global/html/footer.html';?>