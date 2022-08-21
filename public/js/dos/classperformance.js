/*
Name: 			classperformance.js
Written by: 	KABUYE HASHIM MUNIIRU
ORMS Version: 	1.0
Description:    Handle all the requests and behaviors of classperformance.blade.php
*/

$(document).ready(function () {
    // Initialise the ajax headers to have the CSRF laravel token
    $.ajaxSetup({
        headers: { 'X-CSRF-TOKEN':  $("meta[name='csrf-token']").attr('content')}
    }); // end ajax header initialisation

    dtInit(); // Initialise the dataTable

    

    $('#fetchClassTermPerformance').on('click', function (e) {
        e.preventDefault();
       
        
        
        if($('#term').valid())
        {
            var classid = parseInt($(this).attr('data-classid'));
            var termid = parseInt($('#term').val());
           
            fetchTermPerformance(classid, termid);
        }
        
    });

    $('#printClassPerformance').click(function (e) {
        
        if(e.detail !== 2)
        {       
                         
            printClassPerformance();
        }         
        
    });// end click event

    

});

function dtInit()
{
    var t = $('#testsTable').DataTable({lengthMenu: [[ -1], [ 'All']]});
    theTable = t;
    
    t.on( 'order.dt search.dt', function () {
        t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();


    var t2 = $('#examsTable').DataTable({lengthMenu: [[ -1], [ 'All']]});
    theTable = t;
    
    t2.on( 'order.dt search.dt', function () {
        t2.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();


    var t3 = $('#reportsTable').DataTable({lengthMenu: [[ -1], [ 'All']]});
    theTable = t;
    
    t3.on( 'order.dt search.dt', function () {
        t3.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();
    
}

// Go to the selected term to fetch the performance
function fetchTermPerformance(classid, termid)
{    
     var url = '/orms/public/doshome/gradesandacademics/statistics/classes/';
     var link = $(location).attr('origin') + url  + classid + '/' + termid;
     window.location.replace(link);
}

function printClassPerformance()
{
    var tbl = $('#termSummaryTable').clone();

    var tbl2 = $('#testsTable').clone();
    tbl2.find('tr th:nth-child(7), tr td:nth-child(7)').remove();

    var tbl3 = $('#examsTable').clone();
    tbl3.find('tr th:nth-child(6), tr td:nth-child(6)').remove();


    var tbl4 = $('#reportsTable').clone();
    tbl4.find('tr th:nth-child(5), tr td:nth-child(5)').remove(); 
   

     var doc = new jsPDF();  
     var pageSize = doc.internal.pageSize;
     var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
     var center = pageWidth / 2;
   
     doc.setTextColor(headColor[0], headColor[1], headColor[2]);
     doc.setFontSize(headFontSize);
     doc.text(schoolName, center, schoolNameY, 'center');     
     doc.text($('#classHead').html() , center, 32, 'center');
     doc.setDrawColor(headColor[0], headColor[1], headColor[2]);
     doc.setLineWidth(1);
     doc.line(15, 36, 195, 36);
     //doc.setFontSize(11);
    
        

    
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

    finalY = doc.autoTable.previous.finalY;

     doc.text('TESTS', center, doc.autoTable.previous.finalY + 15, 'center');
    
    doc.autoTable({
        html: tbl2.get(0),
        startY: doc.autoTable.previous.finalY + 15 + 3,
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

    finalY = doc.autoTable.previous.finalY;

     doc.text('EXAMS', center, doc.autoTable.previous.finalY + 15, 'center');
    
    doc.autoTable({
        html: tbl3.get(0),
        startY: doc.autoTable.previous.finalY + 15 + 3,
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

    finalY = doc.autoTable.previous.finalY;

     doc.text('REPORTS', center, doc.autoTable.previous.finalY + 15, 'center');
    
    doc.autoTable({
        html: tbl4.get(0),
        startY: doc.autoTable.previous.finalY + 15 + 3,
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

    
    
    doc.save($('#classHead').html()+ '_Performance_' + displayDate(new Date())  +'.pdf');
}