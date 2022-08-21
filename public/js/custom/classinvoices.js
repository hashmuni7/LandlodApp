/*
Name: 			classinvoices.js
Written by: 	KABUYE HASHIM MUNIIRU
ORMS Version: 	1.0
Description:    Handle all the requests and behaviors of classinvoices.blade.php
*/
var deadlineDate = null;
var className = '';
var InvoiceOfTerm = '';
$(document).ready(function () {
    // Initialise the ajax headers to have the CSRF laravel token
    $.ajaxSetup({
        headers: { 'X-CSRF-TOKEN':  $("meta[name='csrf-token']").attr('content')}
    }); // end ajax header initialisation

    dtInit(); // Initialise the dataTable

    

    $('#fetchBalancesBtn').on('click', function (e) {
        e.preventDefault();                       
        
        if($('#fetchBalanceForm').valid())
        {
            // $('#printLocalAccountsBalances').addClass('hidden');
            // $('#printLocalAccountsBalancesB').addClass('hidden');
            fetchInvoices();

        }
        else{
            // $('#printLocalAccountsBalances').addClass('hidden');
            // $('#printLocalAccountsBalancesB').addClass('hidden');
        }
        
    });

    $('#fetchSectionBalancesBtn').on('click', function (e) {
        e.preventDefault();                       
        if($('#fetchBalanceFormBySection').valid())
        {
            //getSectionTermFeesBalance();
        }
       
            
      
        
    });

    

    $('#classes').change(function (e) { 
        e.preventDefault();

        if($('#classes').val() != '')
        {
            getStreams($('#classes').val());
            
        }
        else{
            
        }
       
        
    });

    // Click event for the print 
    $('#printInvoicesBtn').click(function (e) {
        if(e.detail !== 2)
        {       
                         
            printInvoices();
        }         
       
    });// end click event

    // Click event for the print 
    $('#printLocalAccountsBalancesB').click(function (e) {
        if(e.detail !== 2)
        {       
                         
            printLocalAccountsBalancesB();
        }         
       
    });// end click event

    

});

function printInvoices()
{
    var doc = new jsPDF();  

        var pageSize = doc.internal.pageSize;
                var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
                var center = pageWidth / 2;
        var counter = 1;
        var origY = schoolNameY;
    $(".pupil-invoice").each(function () {

        if(counter % 2 != 0)
        {
            schoolNameY = origY;
        }
        else{
            schoolNameY = 155;
        }

        var tblA = $(this).find(".invoice-tbl").clone();
        var tblB = $(this).find(".invoice-tbl2").clone();
        
    
        doc.setTextColor(headColor[0], headColor[1], headColor[2]);
        doc.setFontSize(headFontSize);
        doc.text(schoolName, center, schoolNameY, 'center');
        doc.setDrawColor(headColor[0], headColor[1], headColor[2]);
        doc.text('INVOICE', center, schoolNameY + 14, 'center');
        doc.text(InvoiceOfTerm, center, schoolNameY + 22, 'center');        
        doc.setLineWidth(1);
        doc.line(15, schoolNameY + 25, 195, schoolNameY + 25);
        doc.setFontSize(15);

        doc.setLineWidth(0.3);
        doc.text('Name:', 15 , schoolNameY + 34);
        doc.line(34, schoolNameY + 34, 139, schoolNameY + 34);
        doc.text($(this).find(".pupil-name").html(), 86, schoolNameY + 33, 'center');

        doc.text('Class:', 140, schoolNameY + 34);        
        doc.line(155, schoolNameY + 34, 195, schoolNameY + 34);

        doc.text($(this).find(".pupil-class").html(), 173, schoolNameY + 33, 'center');
        
        doc.autoTable({
            html: tblA.get(0),        
            startY: schoolNameY + 36,        
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
                        doc.setFontStyle('bold');
                    }
                }
            },
            
        });

        doc.autoTable({
            html: tblB.get(0),        
            startY: doc.autoTable.previous.finalY + 2,        
            styles: {
                lineColor: [0, 0, 0],
                lineWidth: 0.2,
                
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
                        doc.setFontStyle('bold');
                    }
                }
            },
            
        });
        doc.text('You are kindly advised to clear all balances before: ' + deadlineDate, center, doc.autoTable.previous.finalY + 5, 'center');
        if(counter % 2 == 0)
        {
            doc.addPage();
        }        
        counter++;
        
    });

    doc.save('Invoices_'+ className +  displayDate(new Date())  +'.pdf');
    
}


function printLocalAccountsBalancesB()
{
    

    var tbl = $('#accountsBalancesTable').clone();
    tbl.find('tr th:nth-child(4), tr td:nth-child(4), tr th:nth-child(5), tr td:nth-child(5), tr th:nth-child(6), tr td:nth-child(6)').remove();

    // Put footer at the end
    var foot = tbl.find('tfoot');
    var last = foot.find('tr');
    tbl.find('tfoot').remove();
    tbl.append(last);
    
    //tbl.find('tr th:nth-child(5), tr td:nth-child(5)').remove();
    var doc = new jsPDF();  

    var pageSize = doc.internal.pageSize;
            var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
            var center = pageWidth / 2;
   
    doc.setTextColor(headColor[0], headColor[1], headColor[2]);
    doc.setFontSize(headFontSize);
    doc.text(schoolName, center, schoolNameY, 'center');
    doc.setDrawColor(headColor[0], headColor[1], headColor[2]);
    doc.text($('#balanceHead').html(), center, 32, 'center');
    doc.text($('#balanceSubHead').html(), center, 40, 'center');
    doc.text($('#balanceSubHead2').html(), center, 47, 'center');
    doc.setLineWidth(1);
    doc.line(15, 53, 195, 53);
    doc.setFontSize(11);    

    
    // It can parse html:
    doc.autoTable({
        html: tbl.get(0),
        startY: 56,
        styles: {
            lineColor: [0, 0, 0],
            lineWidth: 0.2,
            fontSize: 9
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
                    doc.setFontStyle('bold');
                }
            }
        },
        
    });

    
    
    doc.save('LocalAccountsBalance_'+ $('#balanceSubHead').html() +  displayDate(new Date())  +'.pdf');
    
}

function dtInit()
{
    var t = $('#accountsBalancesTable').DataTable({
        lengthMenu: [[  -1], [  'All']]
    });
    
    
    t.on( 'order.dt search.dt', function () {
        t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();

    
    
}


function getStreams(classid)
{
    classid = parseInt(classid);
    $.ajax({
        type: "post",
        url: "/adminhome/classes/class/getstreamsbyclass",
        data: { class_id: classid},
        dataType: "json",
        success: function (response, status, code) {
             streamList = JSON.parse(response.data);
            console.log(streamList);
             $('#streams').empty();
             $('#streams').append('<option value="'+ 0 +'">All Streams</option>');                         
            $.each(streamList, function(key, val){
                
                var stream = '<option value="'+ val.classandstreamid +'">'+ val.classstream +'</option>';
                $('#streams').append(stream);
            });
            
            return true;
        },
        error: function (error) {
            alert('Error '+ error);
              
        }
    });
}

function fetchInvoices()
{
    $('#InvoiceForm').trigger('loading-overlay:show');
    $('#loaderMsg').removeClass('hidden');
    $('#printInvoicesBtn').addClass('hidden');
    $('#noRecordsToShow').addClass('hidden');

    var deadline = $('#deadline').val();
    deadlineDate = displayDate($('#deadline').val());
    className = $('#classes:selected').text() + ' ' + $('#stream:selected').text();
    InvoiceOfTerm = $('#terms :selected').text();
    var clasz = parseInt($('#classes').val()); 
    var stream = parseInt($('#streams').val());
    var term = parseInt($('#terms').val());
    $.ajax({
        type: "post",
        url: "/adminhome/finance/invoices/getclassinvoices",
        data: {
            dead_line: deadline,
            class_id: clasz,
            class_and_stream_id: stream,
            term_id: term,            
        },
        dataType: "json",
        success: function (response, status, code) {
            var invoices = JSON.stringify(response);
            invoices = JSON.parse(invoices);
            console.log(invoices);
            
            $('#fetchedInvoices').empty(); 
            if(invoices.data.length == 0)
            {
                $('#noRecordsToShow').removeClass('hidden');
            }
            $.each(invoices.data, function(key, val){
                var totalAmount = 0, totalPaid = 0, totalBalance = 0;
                
                totalAmount = totalAmount + getDigit(val.schoolFees.fees);
                totalPaid = totalPaid + getDigit(val.schoolFees.paid);
                totalBalance = totalBalance + getDigit(val.schoolFees.balance);

                var schoolFeesRow = '';
                if((val.schoolFees.fees - val.schoolFees.paid) > 0)
                   {
                        var schoolFeesRow = 
                        '<tr class="has-unpaid-balance">\
                            <td>School Fees</td>\
                            <td>'+ getCurrency(val.schoolFees.fees) + '</td>\
                            <td>'+ getCurrency(val.schoolFees.paid) + '</td>\
                            <td>'+ getCurrency(val.schoolFees.balance) + '</td>\
                            <td>'+ getPercentage(val.schoolFees.fees, val.schoolFees.paid) + '</td>\
                        </tr>';
                        
                   }
                   else{
                    var schoolFeesRow = 
                        '<tr>\
                            <td>School Fees</td>\
                            <td>'+ getCurrency(val.schoolFees.fees) + '</td>\
                            <td>'+ getCurrency(val.schoolFees.paid) + '</td>\
                            <td>'+ getCurrency(val.schoolFees.balance) + '</td>\
                            <td>'+ getPercentage(val.schoolFees.fees, val.schoolFees.paid) + '</td>\
                        </tr>';
                        
                   }

               // '<option value="'+ val.classandstreamid +'">'+ val.classstream +'</option>'
               var localAccountRows = '';
               $.each(val.localAccounts, function(key, value){
                   totalAmount = totalAmount + getDigit(value.fee);
                   totalPaid = totalPaid + getDigit(value.paid);
                   totalBalance = totalBalance + getDigit(value.balance);

                   
                                      
                   if((value.fee - value.paid) > 0)
                   {
                        var row = 
                        '<tr class="has-unpaid-balance">\
                            <td>'+ value.account +'</td>\
                            <td>'+ getCurrency(value.fee) +'</td>\
                            <td>'+ getCurrency(value.paid) +'</td>\
                            <td>'+ getCurrency(value.fee - value.paid) +'</td>\
                            <td>'+ getPercentage(value.fee, value.paid) +'</td>\
                        </tr>';
                        localAccountRows = localAccountRows + row;
                   }
                   else{
                        var row = 
                        '<tr>\
                            <td>'+ value.account +'</td>\
                            <td>'+ getCurrency(value.fee) +'</td>\
                            <td>'+ getCurrency(value.paid) +'</td>\
                            <td>'+ getCurrency(value.fee - value.paid) +'</td>\
                            <td>'+ getPercentage(value.fee, value.paid) +'</td>\
                        </tr>';
                        localAccountRows = localAccountRows + row;
                   }
                    
               });
                var invoicePaper = 
                '<div class="col-lg-6 mb-3 pupil-invoice">\
                    <section class="card">' +  
                    '<header class="card-header">' +                     
                        '<h2 class="card-title center"><label class="pupil-name">'+ val.details.name + '</label> <label class="pupil-class">' + val.details.class +'</label></h2>\
                    </header>\
                    <div class="card-body">\
                        <table class="table table-hover table-responsive mb-0 invoice-tbl" style="white-space: nowrap;">\
                            <thead>\
                                <tr>\
                                    <th>Item</th>\
                                    <th>Amount</th>\
                                    <th>Paid</th>\
                                    <th>Balance</th>\
                                    <th>Percentage</th>\
                                </tr>\
                            </thead>\
                            <tbody>'
                            + schoolFeesRow + localAccountRows +
                            '</tbody>\
                            <tfoot>\
                                <tr>\
                                    <th>Totals</td>\
                                    <th>'+ getCurrency(totalAmount) + '</th>\
                                    <th>'+ getCurrency(totalPaid) + '</th>\
                                    <th>'+ getCurrency(totalAmount - totalPaid) + '</th>\
                                    <th>'+ getPercentage(totalAmount, totalPaid) + '</th>\
                                </tr>\
                            </tfoot>\
                        </table>\
                        <table class="table table-hover mb-0 invoice-tbl2" style="white-space: nowrap;">\
                            <thead>\
                                <tr>\
                                    <th>Term</th>\
                                    <th>Balance</th>\
                                </tr>\
                            </thead>\
                            <tbody>\
                                <tr>\
                                    <td>'+ InvoiceOfTerm + '</td>\
                                    <td>'+ getCurrency(totalAmount - totalPaid) + '</td>\
                                </tr>\
                                <tr>\
                                    <td>'+ 'Old Terms' + '</td>\
                                    <td>'+ getCurrency(val.Outstanding) + '</td>\
                                </tr>\
                            </tbody>\
                            <tfoot>\
                                <tr>\
                                    <th>Totals</td>\
                                    <th>'+ getCurrency((totalAmount - totalPaid) + val.Outstanding) + '</th>\
                                </tr>\
                            </tfoot>\
                        </table>\
                    </div>\
                 </section>\
                </div>';
                $('#fetchedInvoices').append(invoicePaper);
            });          
            
            $('.invoice-tbl').DataTable({
                language:{emptyTable: 'Class has no streams yet'},
                 ordering: false,              
                 searching: false,
                 paging: false,
                 info: false
           });
           $('#InvoiceForm').trigger('loading-overlay:hide');
           $('#loaderMsg').addClass('hidden');
           $('#printInvoicesBtn').removeClass('hidden');
            return true;
        },
        error: function (error) {
            //alert('Error '+ error);
            //console.log(error);
            $('#noRecordsToShow').removeClass('hidden');
              
        }
    });
}

function getPercentage(fee, paid)
{
    percentagePaid = parseInt(paid ? ((paid / fee) * 100) : (0 * 100));
    percentageBalance = parseInt(100 - percentagePaid)
    return  'Paid: ' + percentagePaid + '%. Balance ' + percentageBalance + '%';
}

function getDigit(value)
{
    return value ? parseInt(value) : 0;
}

// Go to the selected term to fetch theBalances
function getLocalAccountsBalancesForTerm()
{   
    var account = parseInt($('#accounts').val());
    var clasz = parseInt($('#classes').val()); 
    var stream = parseInt($('#streams').val());
    var term = parseInt($('#terms').val());
    $.ajax({
        type: "post",
        url: "/adminhome/finance/localaccounts/balances/getbalances",
        data: {
            account_id: account,
            class_id: clasz,
            class_and_stream_id: stream,
            term_id: term,            
        },            
        dataType: "json",
        success: function (response, status, code) {
            $('#printLocalAccountsBalances').removeClass('hidden');
            $('#printLocalAccountsBalancesB').removeClass('hidden');
            console.log(response);
            var stringed = JSON.stringify(response.data.data)
            // First destroy the DataTable Before creating a new one
            $('#accountsBalancesTable').DataTable().destroy();
            var stream;
            if($('#streams').val() == 0)
            {
                stream = '';
            }
            else{
                stream = $('#streams :selected').text();
            }
            $('#balanceSubHead2').html($('#classes :selected').text() + ' ' + stream + ' ' + $('#terms :selected').text());
            $('#balanceSubHead').html($('#accounts :selected').text());
            
             // Create a new dataTable and assign it to a variable t
             var t = $("#accountsBalancesTable").DataTable({
                data: JSON.parse(stringed),
                columns: [
                    { data: null },
                    { data: 'name'},
                    { data: 'class'},
                    { data: 'term'},                    
                    { data: 'fee', render: function(d){return  getCurrency(d);}},
                    { data: 'paid', render: function(d){return  getCurrency(d);}},
                    { data: 'balance', render: function(d, type, all){
                        return  getCurrency(d);                            
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
                  lengthMenu: [[  -1], [  'All']],               
                createdRow: function(row, data, dataIndex){
                    if(data.balance == null || data.balance > 0 )
                    {
                        $(row).addClass('has-unpaid-balance');
                    }
                },
                footerCallback: function ( row, data, start, end, display ) {
                    var api = this.api();
                    nb_cols = api.columns().nodes().length;
                    var j = 4;
                    var fees;
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
                        case 4:
                            fees = pageTotal;
                            break;
                        case 5:
                            paid = pageTotal;
                            break;
                        case 6:
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
                        $( api.column( 7 ).footer() ).html(percentage);
                } 
                 
            });

            // Use var t to assign a counter column onto the table
            t.on( 'order.dt search.dt', function () {
                t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                    cell.innerHTML = i+1;
                } );
            } ).draw();
        },
        error: function (error) {
            console.log(error);
            $('#res').append(error.responseText);
            alert("No Response From Server");
        }
        
    });
}


function getSectionTermFeesBalance()
{   
    var section = parseInt($('#sections').val());    
    var term = parseInt($('#termsforsections').val());
    $.ajax({
        type: "post",
        url: "/adminhome/finance/schoolfees/classbalances/getbalanceofsection",
        data: {
            section_id: section,
            term_id: term
        },            
        dataType: "json",
        success: function (response, status, code) {
            console.log(response);
            var stringed = JSON.stringify(response.data.data)
            // First destroy the DataTable Before creating a new one
            $('#schoolFeesBalancesTable').DataTable().destroy();
            
            $('#balanceSubHead').html($('#sections :selected').text() + ' ' + $('#termsforsections :selected').text());
            
             // Create a new dataTable and assign it to a variable t
             var t = $("#schoolFeesBalancesTable").DataTable({
                data: JSON.parse(stringed),
                columns: [
                    { data: null },
                    { data: 'name'},
                    { data: 'class'},
                    { data: 'fees', render: function(d){return  getCurrency(d);}},
                    { data: 'paid', render: function(d){return  getCurrency(d);}},
                    { data: 'balance', render: function(d, type, all){
                        return  getCurrency(d);                            
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
            t.on( 'order.dt search.dt', function () {
                t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                    cell.innerHTML = i+1;
                } );
            } ).draw();
        },
        error: function (error) {
            console.log(error);
            $('#res').append(error.responseText);
            alert("No Response From Server");
        }
        
    });
}