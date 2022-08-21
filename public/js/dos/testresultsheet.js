/*
Name: 			testresultsheet.js
Written by: 	KABUYE HASHIM MUNIIRU
ORMS Version: 	1.0
Description:    Handle all the requests and behaviors of testresultsheet.blade.php
*/

$(document).ready(function () {
    // Initialise the ajax headers to have the CSRF laravel token
    $.ajaxSetup({
        headers: { 'X-CSRF-TOKEN':  $("meta[name='csrf-token']").attr('content')}
    }); // end ajax header initialisation

     dtInit(); // Initialise the dataTable

    // $('#testsTable').on('click', '.del-test-btn', function (e) {
    //     e.preventDefault();
    //     var testName = $(this).closest('tr').find('td:eq(1)').text();
    //     var testid = $(this).closest('tr').attr('data-testid');
        
    //     askDeleteTest(testid, testName);
    // });

    $('#printResultSheet').click(function (e) {
        
        if(e.detail !== 2)
        {       
                         
            printResultSheet();
        }         
        
    });// end click event

    $('#printTestAnalysis').click(function (e) {
        
        if(e.detail !== 2)
        {       
                         
            printTestAnalysis();
        }         
        
    });// end click event

});

function dtInit()
{
    
   

    var t = $('#testScores').DataTable({
        lengthMenu: [[ -1], [ 'All']]
    });
    t.on( 'order.dt search.dt', function () {
        t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();

    $('#testAnalysisTable').DataTable(
        {
            "paging": false,
			"autoWidth": true,
			"footerCallback": function ( row, data, start, end, display ) {
				var api = this.api();
				nb_cols = api.columns().nodes().length;
				var j = 1;
				while(j < nb_cols){
					var pageTotal = api
                .column( j, { page: 'current'} )
                .data()
                .reduce( function (a, b) {
                    return Number(a) + Number(b);
                }, 0 );
                // Update footer
                $( api.column( j ).footer() ).html(pageTotal);
                    j++;
                }
            }
        }

        );
    
    
}

function printResultSheet()
{

    var tbl = $('#testScores').clone();    
    var doc = new jsPDF();  
    var pageSize = doc.internal.pageSize;
    var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
    var center = pageWidth / 2;
   
    doc.setTextColor(headColor[0], headColor[1], headColor[2]);
    doc.setFontSize(headFontSize);
    doc.text(schoolName, center, schoolNameY, 'center');  
    doc.text($('#testHead').html(), center, 32, 'center');
    doc.text($('#testSubHead').html(), center, 40, 'center');
    doc.text($('#testSubHead2').html(), center, 47, 'center');
    doc.setDrawColor(headColor[0], headColor[1], headColor[2]);
    doc.setLineWidth(1);
    doc.line(15, 53, 195, 53);
    doc.setFontSize(11);
    doc.setTextColor(100);

    
    // It can parse html:
    doc.autoTable({
        html: tbl.get(0),
        startY: 56,
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

    
    
    doc.save($('#testHead').html()+ '_Results_' + displayDate(new Date())  +'.pdf');
    
}

function printTestAnalysis()
{

    var tbl = $('#testAnalysisTable').clone();    
    var doc = new jsPDF();  

    var pageSize = doc.internal.pageSize;
    var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
    var center = pageWidth / 2;
   
    doc.setTextColor(headColor[0], headColor[1], headColor[2]);
    doc.setFontSize(headFontSize);
    doc.text(schoolName, center, schoolNameY, 'center');    
    doc.text($('#testHead').html(), center, 32, 'center');
    doc.text($('#testSubHead').html() + " (Test Analysis)", center, 40, 'center');
    doc.text($('#testSubHead2').html(), center, 49, 'center');
    doc.setDrawColor(headColor[0], headColor[1], headColor[2]);
    doc.setLineWidth(1);
    doc.line(15, 53, 195, 53);
    doc.setFontSize(11);
    doc.setTextColor(100);

    
    // It can parse html:
    doc.autoTable({
        html: tbl.get(0),
        startY: 56,
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
        
    });

    
    
    doc.save($('#testHead').html()+ '_Analysis_' + displayDate(new Date())  +'.pdf');
    
}

