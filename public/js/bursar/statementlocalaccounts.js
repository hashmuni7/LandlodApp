/*
Name: 			statementlocalaccounts.js
Written by: 	KABUYE HASHIM MUNIIRU
ORMS Version: 	1.0
Description:    Handle all the requests and behaviors of statementlocalaccounts.blade.php
*/

$(document).ready(function () {
    // Initialise the ajax headers to have the CSRF laravel token
    $.ajaxSetup({
        headers: { 'X-CSRF-TOKEN':  $("meta[name='csrf-token']").attr('content')}
    }); // end ajax header initialisation

    dtInit(); // Initialise the dataTable

    

    $('#fetchStatementBtn').on('click', function (e) {
        e.preventDefault();                              
        if(e.detail !== 2)
        {                               
            $('#printLocalAccountsStatement').addClass('hidden');                       
            if($('#fetchStatementForm').valid())
            {
                getLocalAccountsStatement();
                
            }
        }
        
    });

    $.validator.addMethod('chkDates', function(){

        var fromDate = moment($('#fromDate').val(), 'YYYY-M-D'); 
            var toDate = moment($('#toDate').val(), 'YYYY-M-D');
            var diffMonths = toDate.diff(fromDate, 'months');
            return  diffMonths < 2;
    });

    $("#fetchStatementForm").validate({
        rules : {date_to : {chkDates : true}},
        messages: {date_to: 'date difference should be less than 2 months'}
    });

    // Click event for the print 
    $('#printLocalAccountsStatement').click(function (e) {

        if(e.detail !== 2)
        {       
                         
            printLocalAccountsStatement();
        }         
       
    });// end click event
    
	    
});

function printLocalAccountsStatement()
{

    var tbl = $('#statementTable').clone(); 
    
    // Put footer at the end
    var foot = tbl.find('tfoot');
    var last = foot.find('tr');
    tbl.find('tfoot').remove();
    tbl.append(last);
    
    var doc = new jsPDF('l', 'pt', 'a4');  
    var pageSize = doc.internal.pageSize;
    var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
    var center = pageWidth / 2;
   
    doc.setTextColor(headColor[0], headColor[1], headColor[2]);
    doc.setFontSize(headFontSize);
    doc.text(schoolName, center, schoolNameY + 30, 'center');
    doc.setDrawColor(headColor[0], headColor[1], headColor[2]);
    doc.text($('#balanceHead').html(), center, 70, 'center');
    doc.text($('#balanceSubHead').html(), center, 90, 'center');
    
    doc.text($('#balance2SubHead').html(), center , 110, 'center');
    //doc.text($('#examSubHead22').html(), center + 105, 110, 'center');
    doc.setLineWidth(2);
    doc.line(41, 124, 800, 124);
    doc.setFontSize(11);   

    
    // It can parse html:
    doc.autoTable({
        html: tbl.get(0),
        startY: 130,
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

    
    
    doc.save($('#balanceHead').html()+ '_' + displayDate(new Date())  +'.pdf');
    
}

function dtInit()
{
    var t = $('#statementTable').DataTable({
        lengthMenu: [[  -1], [  'All']]
    });
    
    
    t.on( 'order.dt search.dt', function () {
        t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();

    
    
}

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


// Go to the selected term to fetch the Stream Balances
function getLocalAccountsStatement()
{   
    var account = parseInt($('#accounts').val());
    var fromDate = $('#fromDate').val(); 
    var toDate = $('#toDate').val();
    var paymentMethod = parseInt($('#paymentMethod').val());
    $.ajax({
        type: "post",
        url: "/bursarhome/finance/localaccounts/statement/getstatement",
        data: {
            account_id: account,
            date_from: fromDate,
            date_to: toDate,
            payment_method_id: paymentMethod
        },            
        dataType: "json",
        success: function (response, status, code) {
            $('#printLocalAccountsStatement').removeClass('hidden');
            console.log(response);
            var stringed = JSON.stringify(response.data.data);
            // First destroy the DataTable Before creating a new one
            $('#statementTable').DataTable().destroy();
            
            $('#balanceHead').html($('#accounts :selected').text() + ' Statement');
            $('#balanceSubHead').html("From: " + displayDate(fromDate)  + '. To:' + displayDate(toDate));
            $('#balance2SubHead').html('Using ' + $('#paymentMethod :selected').text());
            
             // Create a new dataTable and assign it to a variable t
             var t = $("#statementTable").DataTable({
                data: JSON.parse(stringed),
                columns: [
                    { data: null },
                    { data: 'firstname', render: function(d, type, all){
                        return all.firstname + " " +  all.lastname + " " + (all.othernames ? all.othernames : '');
                        }
                    },
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
                    { data: 'user'},                                        
                ],
                columnDefs: [ {
                    targets: 0,
                    order: [[ 1, 'asc' ]]
                  } ],
                  lengthMenu: [[  -1], [  'All']],
                  footerCallback: function ( row, data, start, end, display ) {
                    var api = this.api();
                    nb_cols = api.columns().nodes().length;
                    var j = 5;
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

                    pageTotal = api
                    .column( 9, { page: 'allPages'} )
                    .data()
                    .reduce( function (a, b) {
                        return Number(a) + Number(b);
                    }, 0 );
                    // Update footer
                    $( api.column( 9 ).footer() ).html(getCurrency(pageTotal));
                    
                    pageTotal = api
                    .column( 10, { page: 'allPages'} )
                    .data()
                    .reduce( function (a, b) {
                        return Number(a) + Number(b);
                    }, 0 );
                    // Update footer
                    $( api.column( 10 ).footer() ).html(getCurrency(pageTotal));
                    
                        
                    

                    
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
            if(error.status == 400) // if there is a client error
                    {
                        $.each(error.responseJSON.errors, function(key, val){
                            warnByName($("input[name='" + key + "']"), val);
                        });
                        
                        notifyFail(error.responseJSON.data.msg);
                        //alert(error.responseJSON.data.msg);
                        //console.log(error);
            }
            console.log(error);
            $('#res').append(error.responseText);
            alert("No Response From Server");
        }
        
    });
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