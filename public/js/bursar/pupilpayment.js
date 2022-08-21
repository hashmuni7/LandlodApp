/*
Name: 			paymentmethods.js
Written by: 	KABUYE HASHIM MUNIIRU
ORMS Version: 	1.0
Description:    Handle all the requests and behaviors of paymentmethods.blade.php
*/
var theTable, aRow, termSelected;
$(document).ready(function () {
    // Initialise the ajax headers to have the CSRF laravel token
    $.ajaxSetup({
        headers: { 'X-CSRF-TOKEN':  $("meta[name='csrf-token']").attr('content')}
    }); // end ajax header initialisation

    // Create a dataTable
    dtInit();

    // Function to handle the creation of a new Payment
    $('#addSchoolFeesPaymentBtn').click(function (e) {
        if(e.detail !== 2)
        {                                
            addSchoolFeesPayment();
        } 
        
    });// end click event 
    
    $('#amountPaid, #methodCharges').on('input', function(e){
        var amountPaid = parseInt($('#amountPaid').val());
        var methodCharges = parseInt($('#methodCharges').val());
        var netAmount = 0;
        if($.isNumeric(amountPaid) && ($.isNumeric(methodCharges) || $('#methodCharges').val() == null))
        {
            netAmount = amountPaid - methodCharges;
            $('#netAmount').val(netAmount);
        }
        else{
            $('#netAmount').val(netAmount);
        }
        
    });
    

    $('#addLocalAccountPaymentBtn').click(function (e) { 
        if(e.detail !== 2)
        {                                
            addLocalAccountsPayment();
        }
        
    });// end click event

    $('#localAccountsAmountPaid, #localAccountsMethodCharges').on('input', function(e){
        var amountPaid = parseInt($('#localAccountsAmountPaid').val());
        var methodCharges = parseInt($('#localAccountsMethodCharges').val());
        var netAmount = 0;
        if($.isNumeric(amountPaid) && ($.isNumeric(methodCharges) || $('#localAccountsMethodCharges').val() == null))
        {
            netAmount = amountPaid - methodCharges;
            $('#localAccountsNetAmount').val(netAmount);
        }
        else{
            $('#localAccountsNetAmount').val(netAmount);
        }
        
    });

    $('#addActivityPaymentBtn').click(function (e) {
        if(e.detail !== 2)
        {                                
            addActivitysPayment();
        } 
        
    });// end click event 

    $('#activitiesAmountPaid, #activitiesMethodCharges').on('input', function(e){
        var amountPaid = parseInt($('#activitiesAmountPaid').val());
        var methodCharges = parseInt($('#activitiesMethodCharges').val());
        var netAmount = 0;
        if($.isNumeric(amountPaid) && ($.isNumeric(methodCharges) || $('#activitiesMethodCharges').val() == null))
        {
            netAmount = amountPaid - methodCharges;
            $('#activitiesNetAmount').val(netAmount);
        }
        else{
            $('#activitiesNetAmount').val(netAmount);
        }
        
    });
    

    

    $('#schoolFeesTable').on('click', '.edit-school-fees-btn', function (e) {
        e.preventDefault();
        aRow = $(this).closest('tr');
        //fetchMethod($(this).attr('data-id'));
        fetchSchoolFeesPayment($(this).attr('data-id'));
    });
    $('#accountPaymentsTable').on('click', '.edit-receipt-btn', function (e) {
        e.preventDefault();
        
        fetchLocalAccountPayment($(this).attr('data-id'));
    });
    $('#activitiesPaymentsTable').on('click', '.edit-activity-payment-btn', function (e) {
        e.preventDefault();
        
        
        fetchActivityPayment($(this).attr('data-id'));
    });

    // Click event for the update method
    $('#updateSchoolFeesPaymentBtn').click(function (e) { 
        if(e.detail !== 2)
        {                                
            updateSchoolFeesPayment();
        }         
        
    });// end click event
    $('#updateLocalAccountPaymentBtn').click(function (e) { 
        if(e.detail !== 2)
        {                                
            updateLocalAccountsPayment();
        }         
        
    });// end click event
    $('#updateActivityPaymentBtn').click(function (e) { 
        if(e.detail !== 2)
        {                                
            updateActivityPayment();
        }         
        
    });// end click event

    $('#schoolFeesTable').on('click', '.del-school-fees-btn', function (e) {
        e.preventDefault();        
        askDeleteSchoolFeesPayment($(this).attr('data-id'));
    });
    $('#accountPaymentsTable').on('click', '.del-receipt-btn', function (e) {
        e.preventDefault();        
        askDeleteLocalAccountsPayment($(this).attr('data-id'));
    });
    $('#activitiesPaymentsTable').on('click', '.del-activity-payment-btn', function (e) {
        e.preventDefault();        
        askDeleteActivityPayment($(this).attr('data-id'));
    }); 
    $('#feesAttached').on('click', '.detach-btn', function (e) {
        e.preventDefault(); 
        demandid =  parseInt($(this).attr('data-demandid'));
        account =  $(this).attr('data-account'); 
        fee = $(this).attr('data-fee');
        aRow = $(this).closest('tr');   
        askDetachFeePayment(demandid, account, fee);
    }); 



    /*
	Modal Dismiss
	*/
	$(document).on('click', '.modal-dismiss-schoolfees', function (e) {
		e.preventDefault();
        resetSchoolFeesPaymentsModal();
        $.magnificPopup.close();
    });

    /*
	Modal Dismiss
	*/
	$(document).on('click', '.modal-dismiss-local-accounts', function (e) {
		e.preventDefault();
        resetLocalAccountsPaymentsModal();
        $.magnificPopup.close();
    });
    
    // Click event to put focus on the input field
    // This needs the setTimeOut function to allow the Modal to load
    // on to the DOM
    $('#addToSchoolFees').click(function (e) { 
        setTimeout(function () { 
            $('#terms').focus();
         }, 150);        
    });// end click event


    $('#viewSchoolFeesBalances').click(function (e) { 
        getPupilAllTermsFeesBalance(); 
    });// end click event
    $('#viewAccountsBalances').click(function (e) { 
        getPupilAllTermsLocalAccountsBalance(); 
    });// end click event
    $('#viewActivitiesBalances').click(function (e) { 
        getPupilAllTermsActivitiesBalance(); 
    });// end click event

    $('#summaryBtn').click(function (e) {// to clear the displayed information
        
            // $('#schoolFeesAmountRequiredValue').html('');
            // $('#schoolFeesAmountPaidValue').html('');
            // $('#schoolFeesBalanceValue').html('');
            // $('#schoolFeesPercentagePaidValue').html('');
    });

    

    // $('#summaryTerms').change(function(){
    //     if($('#summaryTerms').val() != '')
    //     {
    //         alert('Term Changed');
    //     }
    // });

    $('#fetchPupilTermPaymentSummaryBtn').click(function (e) {
        
        if(e.detail !== 2)
        {       
            if($('#summaryTerms').val() != '')
            {
                $('#printPupilTermSummary').addClass('hidden');
                $('#termSummaryHead').html($('#summaryTerms :selected').text());
                $('#termSummaryHead').trigger('loading-overlay:show');
                getPupilSchoolFeesPaymentsForTerm();
                getPupilLocalAccountsPaymentsForTerm();
                getPupilActivityPaymentsForTerm();
                termSelected = $('#summaryTerms :selected').text();
            }
            else{
                $.alert({
                    title: 'Please Select A Term',
                    content:  name,
                    buttons: {
                        ok: function (){                        
                        },                    
                    },
                    icon: 'fa fa-spinner fa-spin',
                    type: 'blue',
                    theme: 'modern',
                    animation: 'bottom',
                    closeAnimation: 'rotateY',
                    animationBounce: 2.5
                });
               
                $('#printPupilTermSummary').addClass('hidden');
            }
        }
        
    });// end click event

    $('#printSchoolFeesBalances').click(function (e) { 
        if(e.detail !== 2)
        {       
                         
            printSchoolFeesBalances();
        }
    });// end click event

    $('#printLocalAccountsBalances').click(function (e) { 
        if(e.detail !== 2)
        {       
                         
            printLocalAccountsBalances();
        }
    });// end click event

    $('#printLocalAccountsFeeAttachment').click(function (e) { 
        if(e.detail !== 2)
        {       
                         
            printLocalAccountsFeeAttachment();
        }
    });// end click event

    $('#printActivitiesBalances').click(function (e) { 
        if(e.detail !== 2)
        {       
                         
            printActivitiesBalances();
        }
    });// end click event

    $('#printPupilTermSummary').click(function (e) { 
        if(e.detail !== 2)
        {       
                         
            printPupilTermSummary();
        }
    });// end click event
});

function printSchoolFeesBalances()
{
    var tbl = $('#schoolFeesBalancesTable').clone();
    //tbl.find('tr th:nth-child(7), tr td:nth-child(7)').remove();
    var doc = new jsPDF();  

    var pageSize = doc.internal.pageSize;
            var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
            var center = pageWidth / 2;
   
    doc.setTextColor(headColor[0], headColor[1], headColor[2]);
    doc.setFontSize(headFontSize);
    doc.text(schoolName, center, schoolNameY, 'center');   
    doc.setFontSize(16);
    doc.text($('#schoolFeesBalanceHead').html(), center, 32, 'center');
    doc.setDrawColor(headColor[0], headColor[1], headColor[2]);
    doc.setLineWidth(1);
    doc.line(15, 36, 195, 36);
    doc.setFontSize(11);   

    
    // It can parse html:
    doc.autoTable({
        html: tbl.get(0),
        startY: 40,
        useCss: true,
        styles: {
            lineColor: [0, 0, 0],
            lineWidth: 0.2
        },
        headStyles: {
            fillColor: [0, 0, 0],              
        },
        footStyles: {
            fillColor: [0, 0, 0],              
        },
        bodyStyles: {                  
            textColor: [0, 0, 0],
        },
        willDrawCell: function(data) {
            if (data.row.section === 'body') {
                console.log(data.row.raw);
                var obj = data.row.raw;
                if (obj.classList.contains('has-unpaid-balance')) {
                    //doc.setTextColor(231, 76, 60); // Red
                    doc.setFontStyle('bold');
                }
            }
        },
        
    });
    
    
    
    doc.save($('#schoolFeesBalanceHead').html() + '_'+ displayDate(new Date())  +'.pdf');
}

function printLocalAccountsBalances()
{
    var tbl = $('#accountsBalancesTable').clone();
    //tbl.find('tr th:nth-child(7), tr td:nth-child(7)').remove();
    var doc = new jsPDF();  

    var pageSize = doc.internal.pageSize;
            var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
            var center = pageWidth / 2;
   
    doc.setTextColor(headColor[0], headColor[1], headColor[2]);
    doc.setFontSize(headFontSize);
    doc.text(schoolName, center, schoolNameY, 'center');    
    doc.setFontSize(16);
    doc.text($('#localAccountsBalanceHead').html(), center, 32, 'center');
    doc.setDrawColor(headColor[0], headColor[1], headColor[2]);
    doc.setLineWidth(1);
    doc.line(15, 36, 195, 36);
    doc.setFontSize(11);    

    
    // It can parse html:
    doc.autoTable({
        html: tbl.get(0),
        startY: 40,
        useCss: true,
        styles: {
            lineColor: [0, 0, 0],
            lineWidth: 0.2
        },
        headStyles: {
            fillColor: [0, 0, 0],              
        },
        footStyles: {
            fillColor: [0, 0, 0],              
        },
        bodyStyles: {                  
            textColor: [0, 0, 0],
        },
        willDrawCell: function(data) {
            if (data.row.section === 'body') {
                console.log(data.row.raw);
                var obj = data.row.raw;
                if (obj.classList.contains('has-unpaid-balance')) {
                   // doc.setTextColor(231, 76, 60); // Red
                    doc.setFontStyle('bold');
                }
            }
        },
        
    });
    
    
    
    doc.save($('#localAccountsBalanceHead').html() + '_'+ displayDate(new Date())  +'.pdf');
}


function printLocalAccountsFeeAttachment()
{
    var tbl = $('#feesAttached').clone();
    tbl.find('tr th:nth-child(5), tr td:nth-child(5)').remove();
    var doc = new jsPDF();  

    var pageSize = doc.internal.pageSize;
            var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
            var center = pageWidth / 2;
   
    doc.setTextColor(headColor[0], headColor[1], headColor[2]);
    doc.setFontSize(headFontSize);
    doc.text(schoolName, center, schoolNameY, 'center');    
    doc.setFontSize(16);
    doc.text($('#feesAttachedHead').html(), center, 32, 'center');
    doc.setDrawColor(headColor[0], headColor[1], headColor[2]);
    doc.setLineWidth(1);
    doc.line(15, 36, 195, 36);
    doc.setFontSize(11);   

    
    // It can parse html:
    doc.autoTable({
        html: tbl.get(0),
        startY: 40,
        styles: {
            lineColor: [0, 0, 0],
            lineWidth: 0.2
        },
        headStyles: {
            fillColor: [0, 0, 0],              
        },
        footStyles: {
            fillColor: [0, 0, 0],              
        },
        bodyStyles: {                  
            textColor: [0, 0, 0],
        },        
        
    });
    
    
    
    doc.save($('#feesAttachedHead').html() + '_'+ displayDate(new Date())  +'.pdf');
}

function printActivitiesBalances()
{
    var tbl = $('#activitiessBalancesTable').clone();
    //tbl.find('tr th:nth-child(7), tr td:nth-child(7)').remove();
    var doc = new jsPDF();  

    var pageSize = doc.internal.pageSize;
            var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
            var center = pageWidth / 2;
   
    doc.setTextColor(headColor[0], headColor[1], headColor[2]);
    doc.setFontSize(headFontSize);
    doc.text(schoolName, center, schoolNameY, 'center');    
    doc.setFontSize(16);
    doc.text($('#activitiesBalanceHead').html(), center, 32, 'center');
    doc.setDrawColor(headColor[0], headColor[1], headColor[2]);
    doc.setLineWidth(1);
    doc.line(15, 36, 195, 36);
    doc.setFontSize(11);
    

    
    // It can parse html:
    doc.autoTable({
        html: tbl.get(0),
        startY: 40,
        useCss: true,
        styles: {
            lineColor: [0, 0, 0],
            lineWidth: 0.2
        },
        headStyles: {
            fillColor: [0, 0, 0],              
        },
        footStyles: {
            fillColor: [0, 0, 0],              
        },
        bodyStyles: {                  
            textColor: [0, 0, 0],
        },
        willDrawCell: function(data) {
            if (data.row.section === 'body') {
                console.log(data.row.raw);
                var obj = data.row.raw;
                if (obj.classList.contains('has-unpaid-balance')) {
                    doc.setTextColor(231, 76, 60); // Red
                    doc.setFontStyle('bold');
                }
            }
        },
        
    });
    
    
    
    doc.save($('#activitiesBalanceHead').html() + '_'+ displayDate(new Date())  +'.pdf');
}

function printPupilTermSummary()
{
    var tbl2 = $('#schoolFeesTermSummaryTable').clone();
    var tbl3 = $('#localAccountsSummaryTable').clone();
      
    var tbl4 = $('#localAccountsBalancesSummaryTable').clone();
    tbl4.find('tr th:nth-child(3), tr td:nth-child(3)').remove(); 
    var tbl5 = $('#activitiesSummaryTable').clone();  
    var tbl6 = $('#activitiesBalancesSummaryTable').clone();

    var tbl7 = $('#allBalancesSummaryTable2').clone();

    var doc = new jsPDF();  
    var pageSize = doc.internal.pageSize;
    var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
    var center = pageWidth / 2;
   
    doc.setTextColor(headColor[0], headColor[1], headColor[2]);
    doc.setFontSize(headFontSize);
    doc.text(schoolName, center, schoolNameY, 'center');    
    doc.text($('#pupilid').val() + ', ' + $('#classstream').val(), center, 32, 'center');
    doc.text(termSelected, center, 40, 'center');
    doc.text('Payment Summary', center, 47, 'center');
    doc.setLineWidth(1);
    doc.line(15, 53, 195, 53);

    doc.text('Invoice', center, 65, 'center');
    doc.autoTable({
        html: tbl4.get(0),
        startY: 67,
        theme: 'grid',
        styles: {
            lineColor: [0, 0, 0],
            lineWidth: 0.2
        },
        headStyles: {
            fillColor: [0, 0, 0],              
        },
        footStyles: {
            fillColor: [0, 0, 0],              
        },
        bodyStyles: {                  
            textColor: [0, 0, 0],
        },
        willDrawCell: function(data) {
            if (data.row.section === 'body') {
                console.log(data.row.raw);
                var obj = data.row.raw;
                if (obj.classList.contains('has-unpaid-balance')) {
                    //doc.setTextColor(231, 76, 60); // Red
                    doc.setFontStyle('bold');
                }
            }
        },
        
    });

    doc.autoTable({
        html: tbl7.get(0),
        startY: doc.autoTable.previous.finalY + 1,
        theme: 'grid',
        styles: {
            lineColor: [0, 0, 0],
            lineWidth: 0.2
        },
        headStyles: {
            fillColor: [0, 0, 0],              
        },
        footStyles: {
            fillColor: [0, 0, 0],              
        },
        bodyStyles: {                  
            textColor: [0, 0, 0],
        },
        willDrawCell: function(data) {
            if (data.row.section === 'body') {
                console.log(data.row.raw);
                var obj = data.row.raw;
                if (obj.classList.contains('has-unpaid-balance')) {
                    //doc.setTextColor(231, 76, 60); // Red
                    doc.setFontStyle('bold');
                }
            }
        },
        
    });

    doc.text('School Fees Payments', center, doc.autoTable.previous.finalY + 13, 'center');
    
    doc.autoTable({
        html: tbl2.get(0),
        startY: doc.autoTable.previous.finalY + 13 + 3,
        theme: 'grid',
        styles: {
            lineColor: [0, 0, 0],
            lineWidth: 0.2,
            fontSize: 7,
            columnWidth: 'auto'
        },
        headStyles: {
            fillColor: [0, 0, 0],              
        },
        footStyles: {
            fillColor: [0, 0, 0],              
        },
        bodyStyles: {                  
            textColor: [0, 0, 0],
        },                   
    });

    doc.text('Local Accounts Payments', center, doc.autoTable.previous.finalY + 13, 'center');
    
    doc.autoTable({
        html: tbl3.get(0),
        startY: doc.autoTable.previous.finalY + 13 + 3,
        theme: 'grid',
        styles: {
            lineColor: [0, 0, 0],
            lineWidth: 0.2,
            fontSize: 7
        },
        headStyles: {
            fillColor: [0, 0, 0],              
        },
        footStyles: {
            fillColor: [0, 0, 0],              
        },
        bodyStyles: {                  
            textColor: [0, 0, 0],
        },
        
    });

    doc.text('Activities', center, doc.autoTable.previous.finalY + 13, 'center');
    
    doc.autoTable({
        html: tbl6.get(0),
        startY: doc.autoTable.previous.finalY + 13 + 3,
        theme: 'grid',
        styles: {
            lineColor: [0, 0, 0],
            lineWidth: 0.2
        },
        headStyles: {
            fillColor: [0, 0, 0],              
        },
        footStyles: {
            fillColor: [0, 0, 0],              
        },
        bodyStyles: {                  
            textColor: [0, 0, 0],
        },
        willDrawCell: function(data) {
            if (data.row.section === 'body') {
                console.log(data.row.raw);
                var obj = data.row.raw;
                if (obj.classList.contains('has-unpaid-balance')) {
                    //doc.setTextColor(231, 76, 60); // Red
                    doc.setFontStyle('bold');
                }
            }
        },
        
    });

    doc.text('Activities Payments', center, doc.autoTable.previous.finalY + 13, 'center');
    
    doc.autoTable({
        html: tbl5.get(0),
        startY: doc.autoTable.previous.finalY + 13 + 3,
        theme: 'grid',
        styles: {
            lineColor: [0, 0, 0],
            lineWidth: 0.2,
            fontSize: 7
        },
        headStyles: {
            fillColor: [0, 0, 0],              
        },
        footStyles: {
            fillColor: [0, 0, 0],              
        },
        bodyStyles: {                  
            textColor: [0, 0, 0],
        },    
        
    });

    doc.save($('#pupilid').val() + '_Payments_' + displayDate(new Date())  +'.pdf');
}


function dtInit()
{
    var t = $('#schoolFeesTable').DataTable({
        lengthMenu: [[10, 25, 50, 100, 200, -1], [10, 25, 50, 100, 200, 'All']]
    });
   // theTable = t;
    t.on( 'order.dt search.dt', function () {
        t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();

    var t1 = $('#accountPaymentsTable').DataTable({
        lengthMenu: [[10, 25, 50, 100, 200, -1], [10, 25, 50, 100, 200, 'All']]
    });
   // theTable = t;
    t1.on( 'order.dt search.dt', function () {
        t1.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();
    var f =$('#feesAttached').DataTable({
        lengthMenu: [[ 50, 100, 200, -1], [ 50, 100, 200, 'All']]
    });
    theTable = f;
    f.on( 'order.dt search.dt', function () {
        f.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();

    var t2 = $('#activitiesPaymentsTable').DataTable({
        lengthMenu: [[10, 25, 50, 100, 200, -1], [10, 25, 50, 100, 200, 'All']]
    });
   // theTable = t;
    t2.on( 'order.dt search.dt', function () {
        t2.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();


    var b = $('#schoolFeesBalancesTable').DataTable({
        lengthMenu: [[ 50, 100, 200, -1], [ 50, 100, 200, 'All']]
    });
   // theTable = t;
    b.on( 'order.dt search.dt', function () {
        b.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();
    var b1 = $('#accountsBalancesTable').DataTable({
        lengthMenu: [[ 50, 100, 200, -1], [ 50, 100, 200, 'All']]
    });
   // theTable = t;
    b1.on( 'order.dt search.dt', function () {
        b1.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();
    var b2 = $('#activitiessBalancesTable').DataTable({
        lengthMenu: [[ 50, 100, 200, -1], [ 50, 100, 200, 'All']]
    });
   // theTable = t;
    b2.on( 'order.dt search.dt', function () {
        b2.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();


    var s = $('#schoolFeesTermSummaryTable').DataTable({
        lengthMenu: [[  -1], [ 'All']]
    });
   // theTable = t;
    s.on( 'order.dt search.dt', function () {
        s.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw(); 
    var s1 = $('#localAccountsSummaryTable').DataTable({
        lengthMenu: [[  -1], [ 'All']]
    });
   // theTable = t;
    s1.on( 'order.dt search.dt', function () {
        s1.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw(); 
    var s1a = $('#localAccountsBalancesSummaryTable').DataTable({
        lengthMenu: [[ 50, 100, 200, -1], [ 50, 100, 200, 'All']],
        paging: false,
        info: false
    });
   // theTable = t;
    s1a.on( 'order.dt search.dt', function () {
        s1a.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();
    var s1a2 = $('#allBalancesSummaryTable2').DataTable({
        lengthMenu: [[ 50, 100, 200, -1], [ 50, 100, 200, 'All']],
        paging: false,
        info: false,
        searching: false
    });
   // theTable = t;
    s1a2.on( 'order.dt search.dt', function () {
        s1a2.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();
    var s2 =$('#activitiesSummaryTable').DataTable({
        lengthMenu: [[  -1], [ 'All']]
    });
   // theTable = t;
    s2.on( 'order.dt search.dt', function () {
        s2.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();
    var s2a =$('#activitiesBalancesSummaryTable').DataTable({
        lengthMenu: [[ 50, 100, 200, -1], [ 50, 100, 200, 'All']]
        
    });
   // theTable = t;
    s2a.on( 'order.dt search.dt', function () {
        s2a.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();
    
}

function addSchoolFeesPayment()
{
    if($('#addPaymentsForm').valid()) // Test if all Form Fields are validated
        {
            
            // ajax request to add a new school fees payment to the database
            $.ajax({
                type: "post",
                url: "/bursarhome/finance/schoolfees/addpayment", 
                data: { 
                    pupil_id: parseInt($('#pupilid').attr('data-pupilid')),
                    term: parseInt($('#terms').val()),
                    date_paid: $('#datePaid').val(),
                    amount_paid: $('#amountPaid').val(),
                    method_charges: $('#methodCharges').val(),
                    net_amount: $('#netAmount').val(),
                    method: $('#methods').val(),
                    evidence_number: $('#evidenceNumber').val(),
                    paid_by: $('#paidBy').val(),
                    received_by: parseInt($('#receivedBy').attr('data-userid'))
                },
                dataType: "json",
                success: function (response, status, code) {
                   
                    notifySuccess(response.data.msg);
                    getPupilSchoolFeesPayments();
                    $.magnificPopup.close();
                    resetSchoolFeesPaymentsModal();
                    
                },
                error: function (error) {
                    console.log(error);
                    if(error.status == 400) // if there is a client error
                    {
                        $.each(error.responseJSON.errors, function(key, val){
                            console.log("Key: " + key + "| value: " + val);
                            warnByName($("input[name='" + key + "']"), val);
                        });
                        console.log(error.responseJSON.errors);
                        //var json = JSON.parse(error.responseText);
                        notifyFail('Failed');
                    }
                    if(error.status == 500) // if there is a server error
                    {
                        //$('#res').append(JSON.parse(error.responseText));
                        var json = JSON.parse(error.responseText);
                        console.log(json.data.msg);
                        notifyFail(json.data.msg);
                    }
                      
                }
            }); // end ajax call
        }// end if
}


function addLocalAccountsPayment()
{
    if($('#addaccountsPaymentsForm').valid()) // Test if all Form Fields are validated
        {
            if($('#localAccounts').val() != '')
            {
                 // ajax request to add a new school fees payment to the database
                $.ajax({
                    type: "post",
                    url: "/bursarhome/finance/localaccounts/addpayment", 
                    data: { 
                        pupil_id: parseInt($('#localAccountsPupilid').attr('data-pupilid')),
                        local_account: parseInt($('#localAccounts').val()),
                        local_accounts_payment_term: parseInt($('#localAccountsTerms').val()),                    
                        local_accounts_payment_date_paid: $('#localAccountsDatePaid').val(),
                        local_accounts_payment_amount_paid: $('#localAccountsAmountPaid').val(),
                        local_accounts_payment_method_charges: $('#localAccountsMethodCharges').val(),
                        local_accounts_payment_net_amount: $('#localAccountsNetAmount').val(),
                        local_accounts_payment_method: $('#localAccountsMethods').val(),
                        local_accounts_payment_evidence_number: $('#localAccountsEvidenceNumber').val(),
                        local_accounts_payment_paid_by: $('#localAccountsPaidBy').val(),
                        local_accounts_payment_received_by: parseInt($('#localAccountsReceivedBy').attr('data-userid'))
                    },
                    dataType: "json",
                    success: function (response, status, code) {                  

                        $.magnificPopup.close();
                        resetLocalAccountsPaymentsModal();
                        notifySuccess(response.data.msg);
                        getPupilLocalAccountsPayments();
                    },
                    error: function (error) {
                        console.log(error);
                        if(error.status == 400) // if there is a client error
                        {
                            $.each(error.responseJSON.errors, function(key, val){
                                console.log("Key: " + key + "| value: " + val);
                                warnByName($("input[name='" + key + "']"), val);
                            });
                            console.log(error.responseJSON.errors);
                            //var json = JSON.parse(error.responseText);
                            notifyFail('Failed');
                        }
                        if(error.status == 500) // if there is a server error
                        {
                            //$('#res').append(JSON.parse(error.responseText));
                            var json = JSON.parse(error.responseText);
                            console.log(json.data.msg);
                            notifyFail(json.data.msg);
                        }
                        
                    }
                }); // end ajax call
            }
            else 
            {
                alert('Please Select an Account');
            }          
        }// end if
}

function addActivitysPayment()
{
    if($('#addactivitiesPaymentsForm').valid()) // Test if all Form Fields are validated
        {
            if($('#activities').val() != '')
            {
                 // ajax request to add a new school fees payment to the database
                $.ajax({
                    type: "post",
                    url: "/bursarhome/finance/activities/addactivitypayment", 
                    data: { 
                        pupil_id: parseInt($('#activitiesPupilid').attr('data-pupilid')),
                        activity: parseInt($('#activities').val()),                                            
                        activities_payment_date_paid: $('#activitiesDatePaid').val(),
                        activities_payment_amount_paid: $('#activitiesAmountPaid').val(),
                        activities_payment_method_charges: $('#activitiesMethodCharges').val(),
                        activities_payment_net_amount: $('#activitiesNetAmount').val(),
                        activities_payment_method: $('#activitiesMethods').val(),
                        activities_payment_evidence_number: $('#activitiesEvidenceNumber').val(),
                        activities_payment_paid_by: $('#activitiesPaidBy').val(),
                        activities_payment_received_by: parseInt($('#activitiesReceivedBy').attr('data-userid'))
                    },
                    dataType: "json",
                    success: function (response, status, code) {                  

                        $.magnificPopup.close();
                        resetActivitiesPaymentsModal();
                        notifySuccess(response.data.msg);
                        getPupilActivityPayments();
                    },
                    error: function (error) {
                        console.log(error);
                        if(error.status == 400) // if there is a client error
                        {
                            $.each(error.responseJSON.errors, function(key, val){
                                console.log("Key: " + key + "| value: " + val);
                                warnByName($("input[name='" + key + "']"), val);
                            });
                            console.log(error.responseJSON.errors);
                            //var json = JSON.parse(error.responseText);
                            notifyFail('Failed');
                        }
                        if(error.status == 500) // if there is a server error
                        {
                            //$('#res').append(JSON.parse(error.responseText));
                            var json = JSON.parse(error.responseText);
                            console.log(json.data.msg);
                            notifyFail(json.data.msg);
                        }
                        
                    }
                }); // end ajax call
            }
            else 
            {
                alert('Please Select an Activity');
            }          
        }// end if
}


// Reset the input fields of the Form on the Modal
// Unhide the Register btn
// Hide the update button
// Set all fields to null
function resetSchoolFeesPaymentsModal()
{
    $('#addSchoolFeesPaymentBtn').show();
    $('#updateSchoolFeesPaymentBtn').addClass('hidden');
    
    
    document.getElementById('addPaymentsForm').reset();
    // $('#terms').val(null);
    // $('#datePaid').val(null);
    // $('#amountPaid').val(null);
    // $('#methodCharges').val(null);
    // $('#netAmount').val(null);
    // $('#methods').val(null);
    // $('#evidenceNumber').val(null);
    // $('#paidBy').val(null);
   //$('#receivedBy').attr('data-userid')
    
    
    $('#userSchoolFees').addClass('hidden');
    $('#authSchoolFees').removeClass('hidden');
}

function resetLocalAccountsPaymentsModal()
{
    $('#addLocalAccountPaymentBtn').show();
    $('#updateLocalAccountPaymentBtn').addClass('hidden');
    
    
    document.getElementById('addaccountsPaymentsForm').reset();   
    
    
    $('#userAccounts').addClass('hidden');
    $('#authAccounts').removeClass('hidden');

    $('#originalAccount').addClass('hidden');
    $('#currentAccount').removeClass('hidden');
}

function resetActivitiesPaymentsModal()
{
    $('#addActivityPaymentBtn').show();
    $('#updateActivityPaymentBtn').addClass('hidden');
    
    
    document.getElementById('addactivitiesPaymentsForm').reset();   
    
    
    $('#userActivities').addClass('hidden');
    $('#authActivities').removeClass('hidden');

    $('#originalActivity').addClass('hidden');
    $('#currentActivity').removeClass('hidden');
}

// Function to append server side validations
function warnByName(element, warning)
{
    element.addClass('error');
    element.after(
        '<label id="sectionName-error" class="error" for="sectionName">' + warning + '</label>');
}

// Function to notify a success message
function notifySuccess(message)
{
    new PNotify({
        title: 'Success!',
        text: message,
        type: 'success'
    });
                    
}

// Function to notify a failure message
function notifyFail(message)
{
    new PNotify({
        title: 'Failed!',
        text: message,
        type: 'failure',
        icons: 'brighttheme'
    });
                    
}

// Fetch school fees payment transaction
function fetchSchoolFeesPayment(paymentid)
{
    $('#schoolFeesForm').trigger('loading-overlay:show');
    $('#addSchoolFeesPaymentBtn').hide();// Hide the register Button and show Update Btn
    $('#updateSchoolFeesPaymentBtn').removeClass('hidden');

    $('#userSchoolFees').removeClass('hidden');
    $('#authSchoolFees').addClass('hidden');
      
    

    paymentid = parseInt(paymentid);

    // Pop up the Modal
    $.magnificPopup.open({
        items: {
            src: '#schoolFeesModal'
        },
        type: 'inline',
        callbacks: {
            close: function(){                
                resetSchoolFeesPaymentsModal();               
            }
          }
    });

    
    $.ajax({
        type: "post",
        url: "/bursarhome/finance/payments/schoolfeespaymentbyid",
        data: { payment_id: paymentid},
        dataType: "json",
        success: function (response, status, code) {
            $('#schoolfeespaymentid').val(response.data.data.paymentid)
            $('#terms').val(response.data.data.paidfor);
            $('#datePaid').val(getDate(response.data.data.datepaid));
            $('#amountPaid').val(response.data.data.amount);
            $('#methodCharges').val(response.data.data.charges);
            $('#netAmount').val(response.data.data.realamount);
            $('#methods').val(response.data.data.paymentmethodid);
            $('#evidenceNumber').val(response.data.data.evidencenumber);
            $('#paidBy').val(response.data.data.paidby);
            $('#recordedByUser').val(response.data.data.user);
            console.log(response);
            $('#schoolFeesForm').trigger('loading-overlay:hide');
            
        },
        error: function (error) {
            //alert('Error!  '+ error.responseJSON.data.msg);
            $('#res').append(error.responseText);
            console.log(error);  
        }
    });  
    
}

// Fetch local account payment transaction
function fetchLocalAccountPayment(receiptid)
{
    $('#localAccountsPaymentForm').trigger('loading-overlay:show');
    $('#addLocalAccountPaymentBtn').hide();// Hide the register Button and show Update Btn
    $('#updateLocalAccountPaymentBtn').removeClass('hidden');

    $('#userAccounts').removeClass('hidden');
    $('#authAccounts').addClass('hidden');

    $('#originalAccount').removeClass('hidden');
    $('#currentAccount').addClass('hidden');
      
    

    receiptid = parseInt(receiptid);

    // Pop up the Modal
    $.magnificPopup.open({
        items: {
            src: '#accountsPaymentModal'
        },
        type: 'inline',
        callbacks: {
            close: function(){                
                resetLocalAccountsPaymentsModal();               
            }
          }
    });

    
    $.ajax({
        type: "post",
        url: "/bursarhome/finance/localaccounts/getreceiptbyid",
        data: { receipt_id: receiptid},
        dataType: "json",
        success: function (response, status, code) {
            $('#receiptid').val(response.data.data.receiptid);
            $('#localAccountsOriginal').val(response.data.data.accountid);
            $('#localAccountsTerms').val(response.data.data.paidfor);
            $('#localAccountsDatePaid').val(getDate(response.data.data.datepaid));
            $('#localAccountsAmountPaid').val(response.data.data.amount);
            $('#localAccountsMethodCharges').val(response.data.data.charges);
            $('#localAccountsNetAmount').val(response.data.data.realamount);
            $('#localAccountsMethods').val(response.data.data.paymentmethodid);
            $('#localAccountsEvidenceNumber').val(response.data.data.evidencenumber);
            $('#localAccountsPaidBy').val(response.data.data.paidby);
            $('#localAccountsRecordedByUser').val(response.data.data.user);
            console.log(response);
            $('#localAccountsPaymentForm').trigger('loading-overlay:hide');
            
        },
        error: function (error) {
            //alert('Error!  '+ error.responseJSON.data.msg);
            $('#res').append(error.responseText);
            console.log(error);  
        }
    });

    
    
}


// Fetch activity payment transaction
function fetchActivityPayment(activityreceiptid)
{
    $('#activitiesPaymentForm').trigger('loading-overlay:show');
    $('#addActivityPaymentBtn').hide();// Hide the register Button and show Update Btn
    $('#updateActivityPaymentBtn').removeClass('hidden');

    $('#userActivities').removeClass('hidden');
    $('#authActivities').addClass('hidden');

    $('#originalActivity').removeClass('hidden');
    $('#currentActivity').addClass('hidden');
      
    

    activityreceiptid = parseInt(activityreceiptid);

    // Pop up the Modal
    $.magnificPopup.open({
        items: {
            src: '#activitiesPaymentModal'
        },
        type: 'inline',
        callbacks: {
            close: function(){                
                resetActivitiesPaymentsModal();               
            }
          }
    });

    
    $.ajax({
        type: "post",
        url: "/bursarhome/finance/activities/getactivitypaymentbyid",
        data: { activity_receipt_id: activityreceiptid},
        dataType: "json",
        success: function (response, status, code) {
            $('#activityreceiptid').val(response.data.data.activityreceiptid);
            $('#activitiesOriginal').val(response.data.data.activityid);           
            $('#activitiesDatePaid').val(getDate(response.data.data.datepaid));
            $('#activitiesAmountPaid').val(response.data.data.amount);
            $('#activitiesMethodCharges').val(response.data.data.charges);
            $('#activitiesNetAmount').val(response.data.data.realamount);
            $('#activitiesMethods').val(response.data.data.paymentmethodid);
            $('#activitiesEvidenceNumber').val(response.data.data.evidencenumber);
            $('#activitiesPaidBy').val(response.data.data.paidby);
            $('#activitiesRecordedByUser').val(response.data.data.user);
            console.log(response);
            $('#activitiesPaymentForm').trigger('loading-overlay:hide');
            
        },
        error: function (error) {
            //alert('Error!  '+ error.responseJSON.data.msg);
            $('#res').append(error.responseText);
            console.log(error);  
        }
    });

    
    
}


// This function will enable the datepickers to set the correct date
// if data is null, the date field will not be changed, it will be emptied
function getDate(data)
{

    if(data)
    {
        return String($.datepicker.formatDate('yy-mm-dd', new Date(data)));
    }
    else{
        return null;
    }
}

function displayDate(data)
{
    if(data)
    {
        return $.datepicker.formatDate('D, dd M yy', new Date(data));
    }
    else{
        return null;
    }
}



// Update the Method Details By its id
// Get the field to update from the input field
function updateSchoolFeesPayment()
{   
    
     
        if($('#addPaymentsForm').valid()) // Test if all Form Fields are validated
        {
            
            $.ajax({
                type: "post",
                url: "/bursarhome/finance/payments/updateschoolfeespayment",
                data: {
                    payment_id: parseInt($('#schoolfeespaymentid').val()), 
                    pupil_id: parseInt($('#pupilid').attr('data-pupilid')),
                    term: parseInt($('#terms').val()),
                    date_paid: $('#datePaid').val(),
                    amount_paid: $('#amountPaid').val(),
                    method_charges: $('#methodCharges').val(),
                    net_amount: $('#netAmount').val(),
                    method: $('#methods').val(),
                    evidence_number: $('#evidenceNumber').val(),
                    paid_by: $('#paidBy').val(),
                    received_by: parseInt($('#receivedBy').attr('data-userid'))
                },
                dataType: "json",
                success: function (response, status, code) {
                                                                                                                  
                    //getSubjects();
                    //console.log(response.data.msg);
                    notifySuccess(response.data.msg);
                    getPupilSchoolFeesPayments();                  
                  
                    
                    
                    
                    resetSchoolFeesPaymentsModal();
                    $.magnificPopup.close();
                },
                error: function (error) {
                    if(error.status == 400) // if there is a client error
                    {
                        $.each(error.responseJSON.errors, function(key, val){
                            warnByName($("input[name='" + key + "']"), val);
                        });
                        
                        notifyFail(error.responseJSON.data.msg);
                        alert(error.responseJSON.data.msg);
                        console.log(error);
                    }
                    if(error.status == 500) // if there is a server error
                    {
                        notifyFail(error.responseJSON.data.msg);
                        //alert(error.responseJSON.data.msg);
                        console.log(error);
                    }
                      
                }
            }); // end ajax call
        }// end if
}

function updateLocalAccountsPayment()
{   
    
     
        if($('#addaccountsPaymentsForm').valid()) // Test if all Form Fields are validated
        {
            if($('#localAccountsOriginal').val() != '')
            {
                    
            $.ajax({
                type: "post",
                url: "/bursarhome/finance/localaccounts/updatereceipt",
                data: {                
                    receipt_id: parseInt($('#receiptid').val()),
                    pupil_id: parseInt($('#localAccountsPupilid').attr('data-pupilid')),
                    paid_account: parseInt($('#localAccountsOriginal').val()),
                    local_accounts_payment_term: parseInt($('#localAccountsTerms').val()),                    
                    local_accounts_payment_date_paid: $('#localAccountsDatePaid').val(),
                    local_accounts_payment_amount_paid: $('#localAccountsAmountPaid').val(),
                    local_accounts_payment_method_charges: $('#localAccountsMethodCharges').val(),
                    local_accounts_payment_net_amount: $('#localAccountsNetAmount').val(),
                    local_accounts_payment_method: $('#localAccountsMethods').val(),
                    local_accounts_payment_evidence_number: $('#localAccountsEvidenceNumber').val(),
                    local_accounts_payment_paid_by: $('#localAccountsPaidBy').val(),
                    local_accounts_payment_received_by: parseInt($('#localAccountsReceivedBy').attr('data-userid'))
                },
                dataType: "json",
                success: function (response, status, code) {
                                                                                                                  
                    //getSubjects();
                    //console.log(response.data.msg);
                    notifySuccess(response.data.msg);
                    getPupilLocalAccountsPayments();                  
                  
                    
                    
                    
                    resetLocalAccountsPaymentsModal();
                    $.magnificPopup.close();
                },
                error: function (error) {
                    if(error.status == 400) // if there is a client error
                    {
                        $.each(error.responseJSON.errors, function(key, val){
                            warnByName($("input[name='" + key + "']"), val);
                        });
                        
                        notifyFail(error.responseJSON.data.msg);
                        alert(error.responseJSON.data.msg);
                        console.log(error);
                    }
                    if(error.status == 500) // if there is a server error
                    {
                        notifyFail(error.responseJSON.data.msg);
                        //alert(error.responseJSON.data.msg);
                        console.log(error);
                    }
                      
                }
            }); // end ajax call
            }
            else{
                alert('Please fill in the account!');
            }
        }// end if

        
        
    
}

function updateActivityPayment()
{   
    
     
        if($('#addactivitiesPaymentsForm').valid()) // Test if all Form Fields are validated
        {
            if($('#activitiesOriginal').val() != '')
            {
                    
            $.ajax({
                type: "post",
                url: "/bursarhome/finance/activities/updateactivitypayment",
                data: {                
                    activity_receipt_id: parseInt($('#activityreceiptid').val()),
                    pupil_id: parseInt($('#activitiesPupilid').attr('data-pupilid')),
                    activity: parseInt($('#activitiesOriginal').val()),                                      
                    activities_payment_date_paid: $('#activitiesDatePaid').val(),
                    activities_payment_amount_paid: $('#activitiesAmountPaid').val(),
                    activities_payment_method_charges: $('#activitiesMethodCharges').val(),
                    activities_payment_net_amount: $('#activitiesNetAmount').val(),
                    activities_payment_method: $('#activitiesMethods').val(),
                    activities_payment_evidence_number: $('#activitiesEvidenceNumber').val(),
                    activities_payment_paid_by: $('#activitiesPaidBy').val(),
                    activities_payment_received_by: parseInt($('#activitiesReceivedBy').attr('data-userid'))
                },
                dataType: "json",
                success: function (response, status, code) {
                                                                                                                  
                    //getSubjects();
                    //console.log(response.data.msg);
                    notifySuccess(response.data.msg);
                    getPupilActivityPayments();                  
                  
                    
                    
                    
                    resetActivitiesPaymentsModal();
                    $.magnificPopup.close();
                },
                error: function (error) {
                    if(error.status == 400) // if there is a client error
                    {
                        $.each(error.responseJSON.errors, function(key, val){
                            warnByName($("input[name='" + key + "']"), val);
                        });
                        
                        notifyFail(error.responseJSON.data.msg);
                        alert(error.responseJSON.data.msg);
                        console.log(error);
                    }
                    if(error.status == 500) // if there is a server error
                    {
                        notifyFail(error.responseJSON.data.msg);
                        //alert(error.responseJSON.data.msg);
                        console.log(error);
                    }
                      
                }
            }); // end ajax call
            }
            else{
                alert('Please fill in the account!');
            }
        }// end if

        
        
    
}



function getPupilSchoolFeesPayments()
{
    var pupilid = parseInt($('#pupilid').attr('data-pupilid'));
    $.ajax({
        type: "post",
        url: "/bursarhome/finance/payments/getpupilschoolfeespayments/" + pupilid,
        data: {},            
        dataType: "json",
        success: function (response, status, code) {
            // First destroy the DataTable Before creating a new one
            $('#schoolFeesTable').DataTable().destroy();
            
             // Create a new dataTable and assign it to a variable t
             var t = $("#schoolFeesTable").DataTable({
                data: JSON.parse(response.data),
                columns: [
                    { data: null },
                    { data: 'term'},
                    { data: 'datepaid', render: function (d) { return displayDate(d);} },
                    { data: 'amount', render: function(d){return  getCurrency(d);}  },
                    { data: 'paymentmethod'},
                    { data: 'evidence'},
                    { data: 'evidencenumber'},
                    { data: 'charges', render: function(d){return  getCurrency(d);} },
                    { data: 'realamount', render: function(d){return  getCurrency(d);} },
                    { data: 'paidby'}, 
                    { data: 'user'}, 
                    { data: 'paymentid'}                    
                ],
                columnDefs: [ {
                    targets: 0,
                    order: [[ 1, 'asc' ]]
                  } ],
                columnDefs: [ {
                    targets: 11,
                    data: 'paymentid',
                    className: 'actions-hover actions-fade',
                    render: function ( data) {
                                    return '<a class="ws-normal context-menu pointer edit-school-fees-btn"  data-id="'+ data + '">'+ 
                                    '<i class="fas fa-pencil-alt"></i>Edit</a>'+ 
                                    ' <a class="ws-normal context-menu pointer del-school-fees-btn" data-id="'+ data + '"><i class="fas fa-trash"></i>Delete</a>'
                                }
                  } ],                
                lengthMenu: [[10, 25, 50, 100, 200, -1], [10, 25, 50, 100, 200, 'All']]
                  
            });

            // Use var t to assign a counter column onto the table
            t.on( 'order.dt search.dt', function () {
                t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                    cell.innerHTML = i+1;
                } );
            } ).draw(); 

            //dtInit();
            
            
        },
        error: function (error) {
            alert("No Response From Server");
        }
    }); // end ajax call
}


function getPupilLocalAccountsPayments()
{
    var pupilid = parseInt($('#localAccountsPupilid').attr('data-pupilid'));
    $.ajax({
        type: "post",
        url: "/bursarhome/finance/localaccounts/getpupilreceiptpayments/" + pupilid,
        data: {},            
        dataType: "json",
        success: function (response, status, code) {
            // First destroy the DataTable Before creating a new one
            $('#accountPaymentsTable').DataTable().destroy();
            
             // Create a new dataTable and assign it to a variable t
             var t = $("#accountPaymentsTable").DataTable({
                data: JSON.parse(response.data),
                columns: [
                    { data: null },
                    { data: 'account' },
                    { data: 'term'},
                    { data: 'datepaid', render: function (d) { return displayDate(d);} },
                    { data: 'amount', render: function(d){return  getCurrency(d);}  },
                    { data: 'paymentmethod'},
                    { data: 'evidence'},
                    { data: 'evidencenumber'},
                    { data: 'charges', render: function(d){return  getCurrency(d);} },
                    { data: 'realamount', render: function(d){return  getCurrency(d);} },
                    { data: 'paidby'}, 
                    { data: 'user'}, 
                    { data: 'receiptid'},                    
                ],
                columnDefs: [ {
                    targets: 0,
                    order: [[ 1, 'asc' ]]
                  } ],
                columnDefs: [ {
                    targets: 12,
                    data: 'receiptid',
                    className: 'actions-hover actions-fade',
                    render: function ( data) {
                                    return '<a class="ws-normal context-menu pointer edit-receipt-btn"  data-id="'+ data + '">'+ 
                                    '<i class="fas fa-pencil-alt"></i>Edit</a>'+ 
                                    ' <a class="ws-normal context-menu pointer del-receipt-btn" data-id="'+ data + '"><i class="fas fa-trash"></i>Delete</a>'
                                }
                  } ],
                  lengthMenu: [[10, 25, 50, 100, 200, -1], [10, 25, 50, 100, 200, 'All']]  
            });

            // Use var t to assign a counter column onto the table
            t.on( 'order.dt search.dt', function () {
                t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                    cell.innerHTML = i+1;
                } );
            } ).draw(); 

            //dtInit();
            
            
        },
        error: function (error) {
            alert("No Response From Server");
        }
    }); // end ajax call
}

function getPupilActivityPayments()
{
    var pupilid = parseInt($('#activitiesPupilid').attr('data-pupilid'));
    $.ajax({
        type: "post",
        url: "/bursarhome/finance/activities/getpupilactivitypayments/" + pupilid,
        data: {},            
        dataType: "json",
        success: function (response, status, code) {
            // First destroy the DataTable Before creating a new one
            $('#activitiesPaymentsTable').DataTable().destroy();
            
             // Create a new dataTable and assign it to a variable t
             var t = $("#activitiesPaymentsTable").DataTable({
                data: JSON.parse(response.data),
                columns: [
                    { data: null },
                    { data: 'activity' },                  
                    { data: 'datepaid', render: function (d) { return displayDate(d);} },
                    { data: 'amount', render: function(d){return  getCurrency(d);}},
                    { data: 'paymentmethod'},
                    { data: 'evidence'},
                    { data: 'evidencenumber'},
                    { data: 'charges', render: function(d){return  getCurrency(d);} },
                    { data: 'realamount', render: function(d){return  getCurrency(d);} },
                    { data: 'paidby'}, 
                    { data: 'user'}, 
                    { data: 'activityreceiptid'},                    
                ],
                columnDefs: [ {
                    targets: 0,
                    order: [[ 1, 'asc' ]]
                  } ],
                columnDefs: [ {
                    targets: 11,
                    data: 'activityreceiptid',
                    className: 'actions-hover actions-fade',
                    render: function ( data) {
                                    return '<a class="ws-normal context-menu pointer edit-activity-payment-btn"  data-id="'+ data + '">'+ 
                                    '<i class="fas fa-pencil-alt"></i>Edit</a>'+ 
                                    ' <a class="ws-normal context-menu pointer del-activity-payment-btn" data-id="'+ data + '"><i class="fas fa-trash"></i>Delete</a>'
                                }
                  } ],
                  lengthMenu: [[10, 25, 50, 100, 200, -1], [10, 25, 50, 100, 200, 'All']]  
            });

            // Use var t to assign a counter column onto the table
            t.on( 'order.dt search.dt', function () {
                t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                    cell.innerHTML = i+1;
                } );
            } ).draw(); 

            //dtInit();
            
            
        },
        error: function (error) {
            alert("No Response From Server");
        }
    }); // end ajax call
}

function getPupilAllTermsFeesBalance()
{
    $('#schoolFeesBalanceBody').trigger('loading-overlay:show');

    var pupilid = parseInt($('#pupilid').attr('data-pupilid'));
    $.ajax({
        type: "post",
        url: "/bursarhome/finance/payments/schoolfees/getpupilbalance",
        data: {
            pupil_id: pupilid
        },            
        dataType: "json",
        success: function (response, status, code) {
            console.log(response);
            var stringed = JSON.stringify(response.data.data)
            // First destroy the DataTable Before creating a new one
            $('#schoolFeesBalancesTable').DataTable().destroy();
            
             // Create a new dataTable and assign it to a variable t
             var t = $("#schoolFeesBalancesTable").DataTable({
                data: JSON.parse(stringed),
                columns: [
                    { data: null },
                    { data: 'term'},
                    { data: 'fees', render: function(d){return  getCurrency(d);}},
                    { data: 'paid', render: function(d){return  getCurrency(d);}},
                    { data: 'balance', render: function(d, type, all){
                            if(d == null){return  getCurrency(all.fees);}
                            else{return  getCurrency(d);}                            
                        }
                    },
                    { data: null , render: function(d, type, all){
                        percentagePaid = parseInt((all.paid / all.fees) * 100);
                        percentageBalance = parseInt(100 - percentagePaid)
                        return  'Paid: ' + percentagePaid + '%. Balance ' + percentageBalance + '%';
                        }
                    }                                       
                ],
                columnDefs: [ {
                    targets: 0,
                    order: [[ 1, 'asc' ]]
                  } ],
                  lengthMenu: [[ 50, 100, 200, -1], [ 50, 100, 200, 'All']],                
                createdRow: function(row, data, dataIndex){
                    if(data.balance == null || data.balance > 0 )
                    {
                        $(row).addClass('has-unpaid-balance');
                    }
                },
                footerCallback: function ( row, data, start, end, display ) {
                    var api = this.api();
                    nb_cols = api.columns().nodes().length;
                    var j = 3;
                    var fees;
                    var paid;
                    var balance;
                    
                        var pageTotal = api
                    .column( 4, { page: 'allPages'} )
                    .data()
                    .reduce( function (a, b) {
                        return Number(a) + Number(b);
                    }, 0 );
                    // Update footer
                    $( api.column( 4 ).footer() ).html(getCurrency(pageTotal));
  
                } 
                 
            });

            // Use var t to assign a counter column onto the table
            t.on( 'order.dt search.dt', function () {
                t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                    cell.innerHTML = i+1;
                } );
            } ).draw(); 

           
            $('#schoolFeesBalanceBody').trigger('loading-overlay:hide');
            //dtInit();
            
            
        },
        error: function (error) {
            console.log(error);
            $('#res').append(error.responseText);
            alert("No Response From Server");
        }
    }); // end ajax call
}

function getPupilAllTermsLocalAccountsBalance()
{
    $('#localAccountsBalancesBody').trigger('loading-overlay:show');
    var pupilid = parseInt($('#localAccountsPupilid').attr('data-pupilid'));
    $.ajax({
        type: "post",
        url: "/bursarhome/finance/payments/localaccounts/getpupilbalance",
        data: {
            pupil_id: pupilid
        },            
        dataType: "json",
        success: function (response, status, code) {
            console.log(response);
            var stringed = JSON.stringify(response.data.data)
            // First destroy the DataTable Before creating a new one
            $('#accountsBalancesTable').DataTable().destroy();
            
             // Create a new dataTable and assign it to a variable t
             var t = $("#accountsBalancesTable").DataTable({
                data: JSON.parse(stringed),
                columns: [
                    { data: null },
                    { data: 'term'},
                    { data: 'account'},
                    { data: 'fee', render: function(d){return  getCurrency(d);}},
                    { data: 'paid', render: function(d){return  getCurrency(d);}},
                    { data: 'balance', render: function(d, type, all){
                            if(d == null){return  getCurrency(all.fee);}
                            else{return  getCurrency(d);}                            
                        }
                    },
                    { data: null , render: function(d, type, all){
                        percentagePaid = parseInt((all.paid / all.fee) * 100);
                        percentageBalance = parseInt(100 - percentagePaid)
                        return  'Paid: ' + percentagePaid + '%. Balance ' + percentageBalance + '%';
                        }
                    }                                       
                ],
                columnDefs: [ {
                    targets: 0,
                    order: [[ 1, 'asc' ]]
                  } ],
                  lengthMenu: [[ 50, 100, 200, -1], [ 50, 100, 200, 'All']],                
                createdRow: function(row, data, dataIndex){
                    if(data.balance == null || data.balance > 0 )
                    {
                        $(row).addClass('has-unpaid-balance');
                    }
                },
                footerCallback: function ( row, data, start, end, display ) {
                    var api = this.api();
                    nb_cols = api.columns().nodes().length;
                    var j = 3;
                    var fees;
                    var paid;
                    var balance;
                    
                        var pageTotal = api
                    .column( 5, { page: 'allPages'} )
                    .data()
                    .reduce( function (a, b) {
                        return Number(a) + Number(b);
                    }, 0 );
                    // Update footer
                    $( api.column( 5 ).footer() ).html(getCurrency(pageTotal));                   
                } 
                 
            });

            // Use var t to assign a counter column onto the table
            t.on( 'order.dt search.dt', function () {
                t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                    cell.innerHTML = i+1;
                } );
            } ).draw(); 

            
            $('#localAccountsBalancesBody').trigger('loading-overlay:hide');
            //dtInit();
            
            
        },
        error: function (error) {
            console.log(error);
            $('#res').append(error.responseText);
            alert("No Response From Server");
        }
    }); // end ajax call
}

function getPupilAllTermsActivitiesBalance()
{
    $('#activitiesBalancesBody').trigger('loading-overlay:show');
    var pupilid = parseInt($('#activitiesPupilid').attr('data-pupilid'));
    $.ajax({
        type: "post",
        url: "/bursarhome/finance/payments/activities/getpupilbalance",
        data: {
            pupil_id: pupilid
        },            
        dataType: "json",
        success: function (response, status, code) {
            console.log(response);
            var stringed = JSON.stringify(response.data.data)
            // First destroy the DataTable Before creating a new one
            $('#activitiessBalancesTable').DataTable().destroy();
            
             // Create a new dataTable and assign it to a variable t
             var t = $("#activitiessBalancesTable").DataTable({
                data: JSON.parse(stringed),
                columns: [
                    { data: null },                    
                    { data: 'activity'},
                    { data: 'term'},
                    { data: 'fee', render: function(d){return  getCurrency(d);}},
                    { data: 'paid', render: function(d){return  getCurrency(d);}},
                    { data: 'balance', render: function(d, type, all){
                            if(d == null){return  getCurrency(all.fee);}
                            else{return  getCurrency(d);}                            
                        }
                    },
                    { data: null , render: function(d, type, all){
                        percentagePaid = parseInt((all.paid / all.fee) * 100);
                        percentageBalance = parseInt(100 - percentagePaid)
                        return  'Paid: ' + percentagePaid + '%. Balance ' + percentageBalance + '%';
                        }
                    }                                       
                ],
                columnDefs: [ {
                    targets: 0,
                    order: [[ 1, 'asc' ]]
                  } ],
                  lengthMenu: [[ 50, 100, 200, -1], [ 50, 100, 200, 'All']],                
                createdRow: function(row, data, dataIndex){
                    if(data.balance == null || data.balance > 0 )
                    {
                        $(row).addClass('has-unpaid-balance');
                    }
                },
                footerCallback: function ( row, data, start, end, display ) {
                    var api = this.api();
                    nb_cols = api.columns().nodes().length;
                    var j = 3;
                    var fees;
                    var paid;
                    var balance;
                    
                        var pageTotal = api
                    .column( 5, { page: 'allPages'} )
                    .data()
                    .reduce( function (a, b) {
                        return Number(a) + Number(b);
                    }, 0 );
                    // Update footer
                    $( api.column( 5 ).footer() ).html(getCurrency(pageTotal));                    
                } 
                 
            });

            // Use var t to assign a counter column onto the table
            t.on( 'order.dt search.dt', function () {
                t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                    cell.innerHTML = i+1;
                } );
            } ).draw(); 

           
            $('#activitiesBalancesBody').trigger('loading-overlay:hide');
            //dtInit();
            
            
        },
        error: function (error) {
            console.log(error);
            $('#res').append(error.responseText);
            alert("No Response From Server");
        }
    }); // end ajax call
}


function getPupilSchoolFeesPaymentsForTerm()
{
    
    var pupilid = parseInt($('#pupilid').attr('data-pupilid'));
    $.ajax({
        type: "post",
        url: "/bursarhome/finance/payments/schoolfees/getpupiltermsummary",
        data: {
            pupil_id: pupilid,
            term_id: parseInt($('#summaryTerms').val())
        },            
        dataType: "json",
        success: function (response, status, code) {
            $('#printPupilTermSummary').removeClass('hidden');
            console.log(response);
            var stringed = JSON.stringify(response.data.balances)
            var requiredValue , paidValue, balanceValue, percentageValue;
            requiredValue = response.data.required.fees;
            paidValue = response.data.required.paid;
            balanceValue = response.data.required.fees - response.data.required.paid;
            
            percentageValue = function(){
                percentagePaid = parseInt((response.data.required.paid / response.data.required.fees) * 100);
                percentageBalance = parseInt(100 - percentagePaid)
                return  'Paid: ' + percentagePaid + '%. Balance ' + percentageBalance + '%';
                }
            $('#schoolFeesAmountRequiredValue').html( getCurrency(requiredValue));
            $('#schoolFeesAmountPaidValue').html(getCurrency(paidValue));
            $('#schoolFeesBalanceValue').html(getCurrency(balanceValue));
            $('#schoolFeesPercentagePaidValue').html(percentageValue);
           
            if(balanceValue > 0){$('#schoolFeesRow').addClass('has-unpaid-balance');}

            // First destroy the DataTable Before creating a new one
            $('#schoolFeesTermSummaryTable').DataTable().destroy();
            
             //Create a new dataTable and assign it to a variable t
             var t = $("#schoolFeesTermSummaryTable").DataTable({
                data: JSON.parse(stringed),
                columns: [
                    { data: null },
                    { data: 'term'},
                    { data: 'datepaid', render: function (d) { return displayDate(d);} },
                    { data: 'amount', render: function(d){return  getCurrency(d);}  },
                    { data: 'paymentmethod'},
                    { data: 'evidence'},
                    { data: 'evidencenumber'},
                    { data: 'charges', render: function(d){return  getCurrency(d);} },
                    { data: 'realamount', render: function(d){return  getCurrency(d);} },
                    { data: 'paidby'}, 
                    { data: 'user'}                                       
                ],
                columnDefs: [ {
                    targets: 0,
                    order: [[ 1, 'asc' ]]
                  } ],
                  lengthMenu: [[  -1], [ 'All']]                                 
                 
            });

            // Use var t to assign a counter column onto the table
            t.on( 'order.dt search.dt', function () {
                t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                    cell.innerHTML = i+1;
                } );
            } ).draw(); 

            
            $('#termSummaryHead').trigger('loading-overlay:hide');
            //dtInit();
            
            
        },
        error: function (error) {
            console.log(error);
            $('#res').append(error.responseText);
            alert("No Response From Server");
        }
    }); // end ajax call
}

function getPupilLocalAccountsPaymentsForTerm()
{
    var pupilid = parseInt($('#localAccountsPupilid').attr('data-pupilid'));
    $.ajax({
        type: "post",
        url: "/bursarhome/finance/payments/localaccounts/getpupiltermsummary",
        data: {
            pupil_id: pupilid,
            term_id: parseInt($('#summaryTerms').val())
        },            
        dataType: "json",
        success: function (response, status, code) {
            console.log(response);
            var stringed = JSON.stringify(response.data.receipts);
           
            // First destroy the DataTable Before creating a new one
            $('#localAccountsSummaryTable').DataTable().destroy();
            
             //Create a new dataTable and assign it to a variable t
             var t = $("#localAccountsSummaryTable").DataTable({
                data: JSON.parse(stringed),
                columns: [
                    { data: null },
                    { data: 'account'},
                    { data: 'term'},
                    { data: 'datepaid', render: function (d) { return displayDate(d);} },
                    { data: 'amount', render: function(d){return  getCurrency(d);}  },
                    { data: 'paymentmethod'},
                    { data: 'evidence'},
                    { data: 'evidencenumber'},
                    { data: 'charges', render: function(d){return  getCurrency(d);} },
                    { data: 'realamount', render: function(d){return  getCurrency(d);} },
                    { data: 'paidby'}, 
                    { data: 'user'}                                       
                ],
                columnDefs: [ {
                    targets: 0,
                    order: [[ 1, 'asc' ]]
                  } ], 
                  lengthMenu: [[  -1], [ 'All']]                                
                 
            });

            // Use var t to assign a counter column onto the table
            t.on( 'order.dt search.dt', function () {
                t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                    cell.innerHTML = i+1;
                } );
            } ).draw(); 

            var stringed2 = JSON.stringify(response.data.balances);
            stringed2 = JSON.parse(stringed2);
            var schoolFees = {
                account: '', 
                accountid: 0, 
                balance: 0,
                demandid: 0,
                fee: 0,
                paid: 0,
                termid: 0,
                term: ''
            };
            
            schoolFees.account = 'School Fees';
            schoolFees.balance = (response.data.required.fees - response.data.required.paid);
            schoolFees.fee = response.data.required.fees;
            schoolFees.paid = response.data.required.paid;
            schoolFees.termid = response.data.required.termid;
            schoolFees.term = response.data.required.term;
            

            console.log(schoolFees);
            stringed2.unshift(schoolFees);
            console.log(stringed2);
            $('#localAccountsBalancesSummaryTable').DataTable().destroy();
            
             // Create a new dataTable and assign it to a variable t
             var ta = $("#localAccountsBalancesSummaryTable").DataTable({
                data: stringed2,
                columns: [
                    { data: null },                    
                    { data: 'account'},
                    { data: 'term'},
                    { data: 'fee', render: function(d){return  getCurrency(d);}},
                    { data: 'paid', render: function(d){return  getCurrency(d);}},
                    { data: 'balance', render: function(d, type, all){
                            if(d == null){return  getCurrency(all.fee);}
                            else{return  getCurrency(d);}                            
                        }
                    },
                    { data: null , render: function(d, type, all){
                        percentagePaid = parseInt((all.paid / all.fee) * 100);
                        percentageBalance = parseInt(100 - percentagePaid)
                        return  'Paid: ' + percentagePaid + '%. Balance ' + percentageBalance + '%';
                        }
                    }                                       
                ],
                paging: false,
                info: false,
                columnDefs: [ {
                    targets: 0,
                    order: [[ 1, 'asc' ]]
                  } ],
                  lengthMenu: [[ 50, 100, 200, -1], [ 50, 100, 200, 'All']],                
                createdRow: function(row, data, dataIndex){
                    if(data.balance == null || data.balance > 0 )
                    {
                        $(row).addClass('has-unpaid-balance');
                    }
                },                     
                  footerCallback: function ( row, data, start, end, display ) {
                    var api = this.api();
                    nb_cols = api.columns().nodes().length;
                    var j = 3;
                    var fee;
                    var paid;
                    var balance;
                    while(j < nb_cols-1){
                        var pageTotal = api
                    .column( j, { page: 'allPages'} )
                    .data()
                    .reduce( function (a, b) {
                        return Number(a) + Number(b);
                    }, 0 );
                    // Update footer
                    $( api.column( j ).footer() ).html(getCurrency(pageTotal));
                    switch (j) {
                        case 3:
                            fees = pageTotal;
                            break;
                        case 4:
                            paid = pageTotal;
                            break;
                        case 5:
                            balance = pageTotal;
                            break;                    
                    }
                    
                    
                        j++;
                    }

                    var percentage = function(){
                        percentagePaid = parseInt((paid / fees) * 100);
                        percentageBalance = parseInt(100 - percentagePaid)
                        return  'Paid: ' + percentagePaid + '%. Balance ' + percentageBalance + '%';
                        }
                        $( api.column( 6 ).footer() ).html(percentage);
                }
                 
            });

            // Use var t to assign a counter column onto the table
            ta.on( 'order.dt search.dt', function () {
                ta.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                    cell.innerHTML = i+1;
                } );
            } ).draw();

            var sumOfAllFees = 0;
            $.each(stringed2, function(key, val){
                sumOfAllFees = sumOfAllFees + val.balance;
            });

            // Start Here to copy
            var AllBalances = [];
            AllBalances.push({               
                term: 'Old Terms',                 
                balance: response.data.outstanding                
            });
            AllBalances.unshift({               
                term: $('#summaryTerms :selected').text(),                 
                balance: sumOfAllFees                
            });
            
             
                            



            console.log(AllBalances);
            $('#allBalancesSummaryTable2').DataTable().destroy();
            
             // Create a new dataTable and assign it to a variable t
             var ta2 = $("#allBalancesSummaryTable2").DataTable({
                data: AllBalances,
                columns: [                                                          
                    { data: 'term'},                    
                    { data: 'balance', render: function(d, type, all){
                            if(d == null){return  getCurrency(all.fee);}
                            else{return  getCurrency(d);}                            
                        }
                    }                                       
                ],
                paging: false,
                info: false,
                searching: false,
                ordering: false,                                                            
                createdRow: function(row, data, dataIndex){
                    if(data.balance == null || data.balance > 0 )
                    {
                        $(row).addClass('has-unpaid-balance');
                    }
                },            
                  footerCallback: function ( row, data, start, end, display ) {
                    var api = this.api();
                    nb_cols = api.columns().nodes().length;
                    var j = 3;
                    var fees;
                    var paid;
                    var balance;
                    
                        var pageTotal = api
                    .column( 1, { page: 'allPages'} )
                    .data()
                    .reduce( function (a, b) {
                        return Number(a) + Number(b);
                    }, 0 );
                    // Update footer
                    $( api.column( 1 ).footer() ).html(getCurrency(pageTotal));                    
                } 
                 
            });

            

            //dtInit();
            
            
        },
        error: function (error) {
            //console.log(error);
            $('#res').append(error.responseText);
            alert("No Response From Server");
        }
    }); // end ajax call
}

function getPupilActivityPaymentsForTerm()
{
    var pupilid = parseInt($('#activitiesPupilid').attr('data-pupilid'));
    $.ajax({
        type: "post",
        url: "/bursarhome/finance/payments/activities/getpupiltermsummary",
        data: {
            pupil_id: pupilid,
            term_id: parseInt($('#summaryTerms').val())
        },            
        dataType: "json",
        success: function (response, status, code) {
           // console.log(response);
            var stringed = JSON.stringify(response.data.receipts);
           
            // First destroy the DataTable Before creating a new one
            $('#activitiesSummaryTable').DataTable().destroy();
            
             //Create a new dataTable and assign it to a variable t
             var t = $("#activitiesSummaryTable").DataTable({
                data: JSON.parse(stringed),
                columns: [
                    { data: null },
                    { data: 'activity' },                  
                    { data: 'datepaid', render: function (d) { return displayDate(d);} },
                    { data: 'amount', render: function(d){return  getCurrency(d);}},
                    { data: 'paymentmethod'},
                    { data: 'evidence'},
                    { data: 'evidencenumber'},
                    { data: 'charges', render: function(d){return  getCurrency(d);} },
                    { data: 'realamount', render: function(d){return  getCurrency(d);} },
                    { data: 'paidby'}, 
                    { data: 'user'},                                       
                ],
                columnDefs: [ {
                    targets: 0,
                    order: [[ 1, 'asc' ]]
                  } ],
                  lengthMenu: [[  -1], [ 'All']]                                 
                 
            });

            // Use var t to assign a counter column onto the table
            t.on( 'order.dt search.dt', function () {
                t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                    cell.innerHTML = i+1;
                } );
            } ).draw(); 

            var stringed2 = JSON.stringify(response.data.balances);
            $('#activitiesBalancesSummaryTable').DataTable().destroy();
            
             // Create a new dataTable and assign it to a variable t
             var ta = $("#activitiesBalancesSummaryTable").DataTable({
                data: JSON.parse(stringed2),
                columns: [
                    { data: null },                    
                    { data: 'activity'},
                    { data: 'term'},
                    { data: 'fee', render: function(d){return  getCurrency(d);}},
                    { data: 'paid', render: function(d){return  getCurrency(d);}},
                    { data: 'balance', render: function(d, type, all){
                            if(d == null){return  getCurrency(all.fee);}
                            else{return  getCurrency(d);}                            
                        }
                    },
                    { data: null , render: function(d, type, all){
                        percentagePaid = parseInt((all.paid / all.fee) * 100);
                        percentageBalance = parseInt(100 - percentagePaid)
                        return  'Paid: ' + percentagePaid + '%. Balance ' + percentageBalance + '%';
                        }
                    }                                       
                ],
                columnDefs: [ {
                    targets: 0,
                    order: [[ 1, 'asc' ]]
                  } ],
                  lengthMenu: [[ 50, 100, 200, -1], [ 50, 100, 200, 'All']],                
                createdRow: function(row, data, dataIndex){
                    if(data.balance == null || data.balance > 0 )
                    {
                        $(row).addClass('has-unpaid-balance');
                    }
                } 
                 
            });

            // Use var t to assign a counter column onto the table
            ta.on( 'order.dt search.dt', function () {
                ta.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                    cell.innerHTML = i+1;
                } );
            } ).draw();

            

            //dtInit();
            
            
        },
        error: function (error) {
            //console.log(error);
            $('#res').append(error.responseText);
            alert("No Response From Server");
        }
    }); // end ajax call
}





// Pop up a confirm dialog to delete a method
function askDeleteSchoolFeesPayment(paymentid)
{
    $.alert({
        title: 'Are You Sure You Want to Delete the Selected Payment',        
        buttons: {
            confirm: function (){
                deleteSchoolFeesPayment(paymentid);
               
               
            },
            cancel: function (){}
        },
        icon: 'fa fa-spinner fa-spin',
        type: 'blue',
        theme: 'modern',
        animation: 'bottom',
        closeAnimation: 'rotateY',
        animationBounce: 2.5
    });

    
}

// Delete Method by its paymentmethodid
function deleteSchoolFeesPayment(paymentid)
{
    
    $.ajax({
        type: "post",
        url: "/bursarhome/finance/payments/deletepupilschoolfeespayments",
        data: { payment_id: paymentid},
        dataType: "json",
        success: function (response, status, code) {
            
            notifySuccess(response.data.msg);
            getPupilSchoolFeesPayments();
        },
        error: function (error) {
            alert('Error '+ error);
              
        }
    });
    
}

function askDeleteLocalAccountsPayment(receiptid)
{
    $.alert({
        title: 'Are You Sure You Want to Delete the Selected Payment',        
        buttons: {
            confirm: function (){
                deleteLocalAccountsPayment(receiptid);
               
               
            },
            cancel: function (){}
        },
        icon: 'fa fa-spinner fa-spin',
        type: 'blue',
        theme: 'modern',
        animation: 'bottom',
        closeAnimation: 'rotateY',
        animationBounce: 2.5
    });

    
}

// Delete Method by its paymentmethodid
function deleteLocalAccountsPayment(receiptid)
{
    
    $.ajax({
        type: "post",
        url: "/bursarhome/finance/localaccounts/deletereceipt",
        data: { receipt_id: receiptid},
        dataType: "json",
        success: function (response, status, code) {
            
            notifySuccess(response.data.msg);
            getPupilLocalAccountsPayments();
        },
        error: function (error) {
            alert('Error '+ error);
              
        }
    });
    
}


function askDeleteActivityPayment(activityreceiptid)
{
    $.alert({
        title: 'Are You Sure You Want to Delete the Selected Payment',        
        buttons: {
            confirm: function (){
                deleteActivityPayment(activityreceiptid);
               
               
            },
            cancel: function (){}
        },
        icon: 'fa fa-spinner fa-spin',
        type: 'blue',
        theme: 'modern',
        animation: 'bottom',
        closeAnimation: 'rotateY',
        animationBounce: 2.5
    });

    
}

// Delete Method by its paymentmethodid
function deleteActivityPayment(activityreceiptid)
{
    
    $.ajax({
        type: "post",
        url: "/bursarhome/finance/activities/deleteactivitypayment",
        data: { activity_receipt_id: activityreceiptid},
        dataType: "json",
        success: function (response, status, code) {
            
            notifySuccess(response.data.msg);
            getPupilActivityPayments();
        },
        error: function (error) {
            alert('Error '+ error);
              
        }
    });
    
}

function askDetachFeePayment(demandid, account, fee)
{
    $.alert({
        title: 'Are You Sure', 
        content: 'You Want to Detach a fee of ' + getCurrency(fee) + ' to the ' + account + ' account from ' + $('#pupilid').val(),       
        buttons: {
            confirm: function (){
                detachFee(demandid);
               
               
            },
            cancel: function (){}
        },
        icon: 'fa fa-spinner fa-spin',
        type: 'blue',
        theme: 'modern',
        animation: 'bottom',
        closeAnimation: 'rotateY',
        animationBounce: 2.5
    });

    
}


function detachFee(demandid)
{
    
    $.ajax({
        type: "post",
        url: "/bursarhome/finance/payments/localaccounts/detachfee",
        data: { demand_id: demandid},
        dataType: "json",
        success: function (response, status, code) {
            //console.log(response);
            notifySuccess(response.data.msg);
            theTable.row(aRow).remove().draw();
            
        },
        error: function (error) {
            
            $.alert({
                title: 'Sorry', 
                content: 'Seems ' + $('#pupilid').val() + " has made some payments to this account already! Make sure you first delete\
                            the pupil's payments to the selected account for that term.",       
                buttons: {
                    ok: function (){
                        notifyFail(error.responseJSON.data.msg); 
                    }
                },
                icon: 'fa fa-spinner fa-spin',
                type: 'blue',
                theme: 'modern',
                animation: 'bottom',
                closeAnimation: 'rotateY',
                animationBounce: 2.5
            });
            
           
           // console.log(error); 
        }
    });
    
}

