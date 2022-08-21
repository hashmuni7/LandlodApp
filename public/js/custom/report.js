/*
Name: 			report.js
Written by: 	KABUYE HASHIM MUNIIRU
ORMS Version: 	1.0
Description:    Handle all the requests and behaviors of report.blade.php
*/

var reportData;
$(document).ready(function () {
    // Initialise the ajax headers to have the CSRF laravel token
    $.ajaxSetup({
        headers: { 'X-CSRF-TOKEN':  $("meta[name='csrf-token']").attr('content')}
    }); 

    

    $('#printReport').click(function (e) {
        
        if(e.detail !== 2)
        {       
             makeATry();            
            //printOldPupils();
        }         
        
    });// end click event

    getReportData();
    
});

function getReportData()
{
    $.ajax({
        type: "post",
        url: "/adminhome/gradesandacademics/reports/getreportdata",
        data: {report_id: $('#reportid').val()},
        dataType: "json",
        success: function (response, status, code) {
            reportData = JSON.parse(response.data);
            console.log(JSON.parse(response.data));
           
           
        },
        error: function (error) {
            console.log(error);
            alert('Error '+ error);
              
        }
    });
}



function printReports()
{
                

    var tbl = $('#pupilsTable').clone();
    tbl.find('tr th:nth-child(7), tr td:nth-child(7)').remove();
    var doc = new jsPDF();  

    var pageSize = doc.internal.pageSize;
            var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
            var center = pageWidth / 2;
   
    doc.setTextColor(headColor[0], headColor[1], headColor[2]);
    doc.setFontSize(headFontSize);
    doc.text(schoolName, center, schoolNameY, 'center');
    doc.setTextColor(255, 0, 0);
    doc.text('PUPILS', center, 32, 'center');
    doc.setLineWidth(1);
    doc.line(15, 36, 195, 36);
    doc.setFontSize(11);
    doc.setTextColor(100);

    
    // It can parse html:
    doc.autoTable({
        html: tbl.get(0),
        startY: 40
        
    });

    
    
    doc.save('pupils_'+ displayDate(new Date())  +'.pdf');
    
}


function makeATry()
{
    
    
    
    var doc = new jsPDF();  

    var pageSize = doc.internal.pageSize;
            var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
            var center = pageWidth / 2;

            

    $.each(reportData.examResults, function(key, val){
        doc.setTextColor(headColor[0], headColor[1], headColor[2]);
        doc.setFontSize(30);
       // doc.text(schoolName, center, schoolNameY, 'center');
       // doc.setTextColor(255, 0, 0);
        doc.text(reportData.reportDetails.report, center, reportY, 'center');
        doc.setDrawColor(headColor[0], headColor[1], headColor[2]);
        doc.setLineWidth(0.5);
        doc.line(15, reportY + 4, 195, reportY + 4);
        doc.setFontSize(18);       
    
        // Dashes for the values
        doc.setLineWidth(0.2);
        doc.line(15, reportY + 4, 195, reportY + 4);
    
        doc.text('Name:', 15 , reportY + 12);
        doc.line(34, reportY + 12, 195, reportY + 12);
        doc.text(val.name, 105, reportY + 11, 'center');

        doc.text('Class:', 15, reportY + 19);
        doc.text('Term:', 80, reportY + 19);
        doc.text('House:', 140, reportY + 19);
        doc.line(34, reportY + 19, 78, reportY + 19);
        doc.line(97, reportY + 19, 139, reportY + 19);
        doc.line(161, reportY + 19, 195, reportY + 19);

        doc.text(val.stream, 55, reportY + 18, 'center');
        doc.text(reportData.reportDetails.term, 116, reportY + 18, 'center');
        doc.text(val.house, 176, reportY + 18, 'center');


    
        doc.text('Pos(s):', 15, reportY + 27);
        doc.text('Out of:', 65, reportY + 27);
        doc.text('Pos(c):', 108, reportY + 27);
        doc.text('Out of:', 150, reportY + 27);
        doc.line(36, reportY + 27, 64, reportY + 27);
        doc.line(84, reportY + 27, 106, reportY + 27);
        doc.line(128, reportY + 27, 149, reportY + 27);
        doc.line(171, reportY + 27, 195, reportY + 27);

        doc.text(String(val.poss), 50, reportY + 26, 'center');
        doc.text(String(val.os), 95, reportY + 26, 'center');
        doc.text(String(val.posc), 138, reportY + 26, 'center');
        doc.text(String(val.oc), 182, reportY + 26, 'center');

        var subjectBody = [];
        $.each(val.subjects, function(key, val){
            var subject = [];
            subject.push(val.subject);
            subject.push(val.mark);
            subject.push(val.grade);
            subject.push(val.comment);
            subject.push(val.teacher);

            subjectBody.push(subject);
            
            
        });
        subjectBody.push(["Total", val.total, val.AGG, "", ""]);
    
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
        //doc.line(109, finalY + 14, 160, finalY + 14);
        doc.line(167, finalY + 14, 195, finalY + 14);

        doc.text(String(val.average), 30, finalY + 13, 'center');
        doc.text(String(val.AGG), 107, finalY + 13, 'center');
        doc.text(String(val.DIV), 180, finalY + 13, 'center');

        // var space = 110;
        // $.each(reportData.examConfig, function(key, val){
            
        //     doc.setFontSize(14);
        //     if(val.considered)
        //     {
        //         doc.text(val.initials, space, finalY + 13);
        //     }
            
        //     space = space + 14;
        // });

        
        doc.addPage();   
    });
   
    

    
    // It can parse html:
    // doc.autoTable({
    //     html: tbl.get(0),
    //     startY: 40,
        
    // });

    
    
    doc.save(reportData.reportDetails.report + '_report_'+ displayDate(new Date())  +'.pdf');
    
}
