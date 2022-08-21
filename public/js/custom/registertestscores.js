/*
Name: 			registertestscores.js
Written by: 	KABUYE HASHIM MUNIIRU
ORMS Version: 	1.0
Description:    Handle all the requests and behaviors of registertestscores.blade.php
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

    $('#printMarkSheet').click(function (e) {
        
        if(e.detail !== 2)
        {       
                         
            printEmptyMarkSheet();
        }         
        
    });// end click event
});

function dtInit()
{
    
    $('#testScores').SetEditable({
        columnsEd: '3',        //Jquery object of "Add" button
        onBeforeEdit: function($row){
                 
                 putNormal($row);
                 
                 return checkRow($row);
               
        },
        onEdit: function($row) {
            // alert(parseInt($row.attr('data-gradeid')));
            gradeScore($row);
        },
        onCancel: function($row) {
            //alert(parseInt($row.attr('data-gradeid')));
            putNormal($row);
        }
    });

    var t = $('#testScores').DataTable({
        lengthMenu: [[ -1], [ 'All']]
    });
    t.on( 'order.dt search.dt', function () {
        t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();
    
}

function popWarning(el, msg)
{
    el.popover('hide');
    el.popover({
        container: 'body',
        placement: 'top',
        content: msg,
        trigger : 'manual'
      }).popover('show');
    el.find('input').addClass('error');
}

function putNormal($row)
{
    
   let index = 3; 

        $row.find('td:eq('+ index +')').popover('hide');
        $row.find('td:eq('+ index +')').find('input').removeClass('error');
    
}

function checkRow($row)
{
        let index = 3;        
                var conMark = $row.find('td:eq('+ index +')');                              
                if($.isNumeric(conMark.find('input').val()))
                {
                    
                    //alert('Yes');
                }
                else{
                    popWarning(conMark, 'Please Insert a Number');
                    return false;
                    //alert('No');
                }        

    return true;
    
}

function gradeScore($row)
{
    
    var resultid, mark;
    resultid =  parseInt($row.attr('data-test-resultid'));
    sectionid =  parseInt($row.closest('table').attr('data-sectionid'));
    mark =  parseInt($row.find('td:eq(3)').text());

    $.ajax({
        type: "post",
        url: "/adminhome/gradesandacademics/tests/test/gradescore",
        data: { 
            section_id: sectionid,
            result_id: resultid,
            mark: mark            
            },
        dataType: "json",
        success: function (response, status, code) {                                                                      
            
               //console.log(response.data.data);
             notifySuccess(response.data.msg);

             $row.find('td:eq(4)').html(response.data.data);
            // verifyTheGrades(sectionid);

        },
        error: function (error) {
            if(error.status == 400) // if there is a client error
            {        
                
                notifyFail(error.responseJSON.data.msg);
                //alert(error.responseJSON.data.msg);
                //console.log(error);
            }
            if(error.status == 500) // if there is a server error
            {
                notifyFail(error.responseJSON.data.msg);
                //alert(error.responseJSON.data.msg);
                //console.log(error);
            }
              
        }
    }); // end ajax call
    
    
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

function printEmptyMarkSheet()
{

    var tbl = $('#testScores').clone();
    tbl.find('tr td:nth-child(4)').empty();
    tbl.find('tr th:nth-child(5), tr td:nth-child(5), tr th:nth-child(6), tr td:nth-child(6)').remove();
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

    
    
    doc.save($('#testHead').html()+ '_' + displayDate(new Date())  +'.pdf');
    
}

