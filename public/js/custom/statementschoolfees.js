/*
Name: 			statementschoolfees.js
Written by: 	KABUYE HASHIM MUNIIRU
ORMS Version: 	1.0
Description:    Handle all the requests and behaviors of statementschoolfees.blade.php
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
            $('#printSchoolFeesStatement').addClass('hidden');                       
            if($('#fetchStatementForm').valid())
            {
                getSchoolFeesStatement();
            }
        }
        
        
    });

    // Click event for the print 
    $('#printSchoolFeesStatement').click(function (e) {
        if(e.detail !== 2)
        {       
                         
            printSchoolFeesStatement();
        }         
       
    });// end click event

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
            

    

});

function printSchoolFeesStatement()
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
function getSchoolFeesStatement()
{   
    var fromDate = $('#fromDate').val(); 
    var toDate = $('#toDate').val();
    var paymentMethod = parseInt($('#paymentMethod').val());
    $.ajax({
        type: "post",
        url: "/adminhome/finance/schoolfees/statement/getstatement",
        data: {
            date_from: fromDate,
            date_to: toDate,
            payment_method: paymentMethod
        },            
        dataType: "json",
        success: function (response, status, code) {
            $('#printSchoolFeesStatement').removeClass('hidden');
            console.log(response);
            var stringed = JSON.stringify(response.data.data);
            // First destroy the DataTable Before creating a new one
            $('#statementTable').DataTable().destroy();
            
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

                    pageTotal = api
                    .column( 8, { page: 'allPages'} )
                    .data()
                    .reduce( function (a, b) {
                        return Number(a) + Number(b);
                    }, 0 );
                    // Update footer
                    $( api.column( 8 ).footer() ).html(getCurrency(pageTotal));
                    
                    pageTotal = api
                    .column( 9, { page: 'allPages'} )
                    .data()
                    .reduce( function (a, b) {
                        return Number(a) + Number(b);
                    }, 0 );
                    // Update footer
                    $( api.column( 9 ).footer() ).html(getCurrency(pageTotal));
                    
                        
                    

                    
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

