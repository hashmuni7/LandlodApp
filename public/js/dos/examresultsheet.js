/*
Name: 			registertestscores.js
Written by: 	KABUYE HASHIM MUNIIRU
ORMS Version: 	1.0
Description:    Handle all the requests and behaviors of registertestscores.blade.php
*/

var theTable, aRow, grades;
$(document).ready(function () {
    // Initialise the ajax headers to have the CSRF laravel token
    $.ajaxSetup({
        headers: { 'X-CSRF-TOKEN':  $("meta[name='csrf-token']").attr('content')}
    }); // end ajax header initialisation

     dtInit(); // Initialise the dataTable  

     $('#printExamResultSheet').click(function (e) {
        
        if(e.detail !== 2)
        {       
                         
            printExamResultSheet();
        }         
        
    });// end click event

    $('#printExamAnalysis').click(function (e) {
        
        if(e.detail !== 2)
        {       
                         
            printExamAnalysis();
        }         
        
    });// end click event

});



function dtInit()
{
    
    

    var t = $('#examResults').DataTable({
        lengthMenu: [[ -1], [ 'All']]
    });
    theTable = t;
    t.on( 'order.dt search.dt page.dt', function () {
        t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();

    $('#examAnalysisTable').DataTable(
        {
            "searching": false,
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

function printExamResultSheet()
{

    var tbl = $('#examResults').clone();    
    var doc = new jsPDF('l', 'pt', 'a4');  
    var pageSize = doc.internal.pageSize;
    var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
    var center = pageWidth / 2;
   
    doc.setTextColor(headColor[0], headColor[1], headColor[2]);
    doc.setFontSize(headFontSize);
    doc.text(schoolName, center, schoolNameY + 30, 'center');    
    doc.text($('#examHead').html(), center, 70, 'center');
    doc.text($('#examSubHead').html(), center, 90, 'center');
    
    doc.text($('#examSubHead2').html(), center - 105 , 110, 'center');
    doc.text($('#examSubHead22').html(), center + 105, 110, 'center');
    doc.setDrawColor(headColor[0], headColor[1], headColor[2]);
    doc.setLineWidth(2);
    doc.line(41, 124, 800, 124);
    doc.setFontSize(11);
    doc.setTextColor(100);

    
    // It can parse html:
    doc.autoTable({
        html: tbl.get(0),
        startY: 130,
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

    
    
    doc.save($('#examHead').html()+ '_Results_' + displayDate(new Date())  +'.pdf');
    
}

function printExamAnalysis()
{

    var tbl = $('#examAnalysisTable').clone();  
    var tbl2 = $('#examDivAnalysisTable').clone();   
    var doc = new jsPDF('l', 'pt', 'a4');  
    var pageSize = doc.internal.pageSize;
    var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
    var center = pageWidth / 2;
   
    doc.setTextColor(headColor[0], headColor[1], headColor[2]);
    doc.setFontSize(headFontSize);
    doc.text(schoolName, center, schoolNameY + 30, 'center');    
    doc.text($('#examHead').html(), center, 70, 'center');
    doc.text($('#examSubHead').html() + ' (Exam Analysis)', center, 90, 'center');
    
    doc.text($('#examSubHead2').html(), center - 105 , 112, 'center');
    doc.text($('#examSubHead22').html(), center + 105, 112, 'center');
    doc.setDrawColor(headColor[0], headColor[1], headColor[2]);
    doc.setLineWidth(2);
    doc.line(41, 124, 800, 124);
        

    
    doc.text($('#analysisHead').html(), center, 160, 'center');
    //doc.setFontSize(11);
    // It can parse html:
    doc.autoTable({
        html: tbl.get(0),
        startY: 170,
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

    doc.text($('#analysisHead2').html(), center, doc.autoTable.previous.finalY + 40, 'center');
    
    doc.autoTable({
        html: tbl2.get(0),
        startY: doc.autoTable.previous.finalY + 40 + 20,
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

    
    
    doc.save($('#examHead').html()+ '_Analysis_' + displayDate(new Date())  +'.pdf');
    
}


