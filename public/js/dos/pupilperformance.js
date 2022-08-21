/*
Name: 			classperformance.js
Written by: 	KABUYE HASHIM MUNIIRU
ORMS Version: 	1.0
Description:    Handle all the requests and behaviors of classperformance.blade.php
*/
var performanceData;
$(document).ready(function () {
    // Initialise the ajax headers to have the CSRF laravel token
    $.ajaxSetup({
        headers: { 'X-CSRF-TOKEN':  $("meta[name='csrf-token']").attr('content')}
    }); // end ajax header initialisation

    dtInit(); // Initialise the dataTable

    

    $('#fetchPupilTermPerformance').on('click', function (e) {
        e.preventDefault();
       
        
        
        if($('#term').valid())
        {
            var pupilid = parseInt($(this).attr('data-pupilid'));
            var termid = parseInt($('#term').val());
           
            fetchTermPerformance(pupilid, termid);
        }
        
    });

    $('#printPupilPerformance').on('click', function (e) {
        e.preventDefault();
        if(e.detail !== 2)
        {       
            printPupilPerformance();           
            //printOldPupils();
        }                         
        
    });

    getPerformanceData();

    

});

function dtInit()
{
    var t = $('#testsTable').DataTable();
    theTable = t;
    
    t.on( 'order.dt search.dt', function () {
        t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();


    var t2 = $('#examsTable').DataTable();
    theTable = t;
    
    t2.on( 'order.dt search.dt', function () {
        t2.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();


    var t3 = $('#reportsTable').DataTable();
    theTable = t;
    
    t3.on( 'order.dt search.dt', function () {
        t3.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();
    
}

// Go to the selected term to fetch the performance
function fetchTermPerformance(pupilid, termid)
{    
     var url = '/orms/public/doshome/gradesandacademics/statistics/pupils/';
     var link = $(location).attr('origin') + url  + pupilid + '/' + termid;
     window.location.replace(link);
}

function getPerformanceData()
{
    $.ajax({
        type: "post",
        url: "/doshome/gradesandacademics/statistics/pupils/getperformancedata",
        data: {
            pupil_id: $('#pupilid').val(),
            term_id: $('#termid').val()
        },
        dataType: "json",
        success: function (response, status, code) {
            var stringed = JSON.stringify(response.data);
            performanceData = JSON.parse(stringed);
            console.log(JSON.parse(stringed));
           
           
        },
        error: function (error) {
            console.log(error);
            alert('Error '+ error);
              
        }
    });
}

function printPupilPerformance()
{
     
   

     var doc = new jsPDF();  
     var pageSize = doc.internal.pageSize;
     var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
     var center = pageWidth / 2;
   
     doc.setTextColor(headColor[0], headColor[1], headColor[2]);
     doc.setFontSize(headFontSize);
     doc.text(schoolName, center, schoolNameY, 'center');     
    doc.text($('#pupilHead').html(), center, 32, 'center');
    doc.text(performanceData.selectedTerm.term, center, 42, 'center');
    doc.setDrawColor(headColor[0], headColor[1], headColor[2]);    
    doc.setLineWidth(1);
    doc.line(15, 44, 195, 44);
    //doc.setFontSize(11);
    //doc.setTextColor(100);
     
        

    
     doc.autoTable({        
        startY: 46,
        head: [
            ['Class', 'Tests', 'Exams', 'Reports', 'House'],
        ],
        body: [
            [ performanceData.pupilInTerm.initials + ' ' + performanceData.pupilInTerm.classstream, 
            performanceData.tests.length, 
            performanceData.exams.length,  
            performanceData.reports.length,  
            performanceData.pupil.house],           
        ],
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
    doc.setDrawColor(headColor[0], headColor[1], headColor[2]);
    doc.setLineWidth(1);
    doc.line(15, finalY + 15 + 2, 195, finalY + 15 + 2);
    var tbl = $('#testsTable').clone();
    tbl.find('tr th:nth-child(12), tr td:nth-child(12)').remove();
    
    doc.autoTable({
        html: tbl.get(0),        
        startY: doc.autoTable.previous.finalY + 15 + 4,
        styles: {
            lineColor: [0, 0, 0],
            lineWidth: 0.2,
            fontSize: 8
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
      doc.setDrawColor(headColor[0], headColor[1], headColor[2]);
      doc.setLineWidth(1);
      doc.line(15, finalY + 15 + 2, 195, finalY + 15 + 2);

      $(".an-exam").each(function () {
        
          var tblA = $(this).find(".exam-tbl").clone();
          tblA.find('tr th:last-child, tr td:last-child').remove();
           
          doc.text($(this).find(".exam-name").html(), center, finalY + 15 + 10, 'center');
          
          doc.text($(this).find('.start-date').html(), center , finalY + 15 + 10 + 7, 'center');
         // doc.text(endDate, center + 32, finalY + 15 + 10 + 5, 'center');

          doc.autoTable({
            html: tblA.get(0),        
            startY: finalY + 15 + 10 + 7 + 5,        
            styles: {
                lineColor: [0, 0, 0],
                lineWidth: 0.2,
                fontSize: 8
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
        finalY = doc.autoTable.previous.finalY - 8;
      });

      $.each(performanceData.reports, function(key, val){
           
            
                 doc.addPage();
                 doc.setTextColor(headColor[0], headColor[1], headColor[2]);
                 doc.setFontSize(30);
                 doc.text(schoolName, center, schoolNameY, 'center');                 
                 doc.text(val.reportDetails.report, center, reportY, 'center');
                 doc.setDrawColor(headColor[0], headColor[1], headColor[2]);
                 doc.setLineWidth(0.5);
                 doc.line(15, reportY + 4, 195, reportY + 4);
                 doc.setFontSize(18);        
            
                 // Dashes for the values
                 doc.setLineWidth(0.2);
                 doc.line(15, reportY + 4, 195, reportY + 4);
            
                 doc.text('Name:', 15, reportY + 12);
                 doc.line(34, reportY + 12, 195, reportY + 12);
                 doc.text(val.examResult.name, 105, reportY + 11, 'center');
        
                 doc.text('Class:', 15, reportY + 19);
                 doc.text('Term:', 80, reportY + 19);
                 doc.text('House:', 140, reportY + 19);
                 doc.line(34, reportY + 19, 78, reportY + 19);
                 doc.line(97, reportY + 19, 139, reportY + 19);
                 doc.line(161, reportY + 19, 195, reportY + 19);
        
                 doc.text(val.examResult.stream, 55, reportY + 18, 'center');
                 doc.text(val.reportDetails.term, 116, reportY + 18, 'center');
                 doc.text(val.examResult.house, 176, reportY + 18, 'center');
        
        
            
                 doc.text('Pos(s):', 15, reportY + 27);
                 doc.text('Out of:', 65, reportY + 27);
                 doc.text('Pos(c):', 108, reportY + 27);
                 doc.text('Out of:', 150, reportY + 27);
                 doc.line(36, reportY + 27, 64, reportY + 27);
                 doc.line(84, reportY + 27, 106, reportY + 27);
                 doc.line(128, reportY + 27, 149, reportY + 27);
                 doc.line(171, reportY + 27, 195, reportY + 27);
        
                 doc.text(String(val.examResult.poss), 50, reportY + 26, 'center');
                 doc.text(String(val.examResult.os), 95, reportY + 26, 'center');
                 doc.text(String(val.examResult.posc), 138, reportY + 26, 'center');
                 doc.text(String(val.examResult.oc), 182, reportY + 26, 'center');
        
                 var subjectBody = [];
                 $.each(val.examResult.subjects, function(key, val){
                     var subject = [];
                     subject.push(val.subject);
                     subject.push(val.mark);
                     subject.push(val.grade);
                     subject.push(val.comment);
                     subject.push(val.teacher);
        
                     subjectBody.push(subject);
                    
                    
                 });
                 subjectBody.push(["Total", val.examResult.total, val.examResult.AGG, "", ""]);
            
                 doc.autoTable({
                     startY: reportY + 27 + 3,
                     head: [
                         ['Subjects', 'Mark / 100', 'Grade', 'Remarks', 'Teacher'],
                     ],
                     body: subjectBody,
                     theme: 'grid',
                     styles: {
                        lineColor: [0, 0, 0],
                        lineWidth: 0.2,
                        fontSize: 14
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
                    columnStyles: {
                        4: {fontSize: 9},              
                    },
                 });
                 finalY = doc.previousAutoTable.finalY;
                 doc.setTextColor(headColor[0], headColor[1], headColor[2]);                
                 doc.setFontSize(15);
            
                 doc.text('Average:', 15, finalY + 7);
                 doc.text('Aggregates:', 92, finalY + 7);
                 //doc.text('Aggregates From', 109, finalY + 7);
                 doc.text('Division', 167, finalY + 7);
            
                 doc.line(15, finalY + 14, 46, finalY + 14);
                 doc.line(92, finalY + 14, 123, finalY + 14);
                // doc.line(109, finalY + 14, 160, finalY + 14);
                 doc.line(167, finalY + 14, 195, finalY + 14);
        
                 doc.text(String(val.examResult.average), 30, finalY + 13, 'center');
                 doc.text(String(val.examResult.AGG), 107, finalY + 13, 'center');
                 doc.text(String(val.examResult.DIV), 180, finalY + 13, 'center');
        
                //  var space = 110;
                //  $.each(val.examConfig, function(key, val){
                    
                //      doc.setFontSize(14);
                //      if(val.considered)
                //      {
                //          doc.text(val.initials, space, finalY + 13);
                //      }
                    
                //      space = space + 14;
                //  });
        
                
                   
             
      });
      
         

    
    
    doc.save($('#pupilHead').html()+ '_Performance_' + displayDate(new Date())  +'.pdf');
}