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
            
            fetchInvoices();

        }
        else{
            
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
        url: "/bursarhome/classes/class/getstreamsbyclass",
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
    InvoiceOfTerm = $('#terms :selected').text();
    className = $('#classes:selected').text() + ' ' + $('#stream:selected').text();
    var clasz = parseInt($('#classes').val()); 
    var stream = parseInt($('#streams').val());
    var term = parseInt($('#terms').val());
    $.ajax({
        type: "post",
        url: "/bursarhome/finance/invoices/getclassinvoices",
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

