/*
Name: 			grades.js
Written by: 	KABUYE HASHIM MUNIIRU
ORMS Version: 	1.0
Description:    Handle all the requests and behaviors of grades.blade.php
*/

$(document).ready(function () {
    // Initialise the ajax headers to have the CSRF laravel token
    $.ajaxSetup({
        headers: { 'X-CSRF-TOKEN':  $("meta[name='csrf-token']").attr('content')}
    }); // end ajax header initialisation

    $('.mark-input').popover({
        trigger: 'manual'
    });
    $('table').SetEditable({
        columnsEd: '1,2,3',        //Jquery object of "Add" button
        onBeforeEdit: function($row){
            
                putNormal($row); 
                return checkRow($row);
                // var from = $row.find('td:eq(1) input').val();
                // $row.find('td:eq(1)').popover('hide');
                // $row.find('td:eq(1) input').removeClass('error');
                // from = parseInt(from);
                // alert(from);
                // if(from > 20)
                // {
                //     return true;
                // }
                // else{
                //     $row.find('td:eq(1)').popover('show');
                //     $row.find('td:eq(1) input').addClass('error');
                //     return false;
                // }
            
        },
        onEdit: function($row) {
            //alert(parseInt($row.attr('data-gradeid')));
            updateGrade($row);
        },
        onCancel: function($row) {
            //alert(parseInt($row.attr('data-gradeid')));
            putNormal($row);
        }
    });

    // Function to handle the creation of a new Teacher
    $('.verify-all-marks-btn').click(function (e) { 
       
       verifyTheGrades($(this).attr('data-sectionid'));
    });// end click event

    $('.print-grade-btn').click(function (e) {
        
        if(e.detail !== 2)
        {       
            tableID = $(this).attr('data-grade-table');           
            var tbl = $('#' + tableID).clone();
            tbl.find('tr th:nth-child(4), tr td:nth-child(4), tr th:nth-child(5), tr td:nth-child(5)').remove();            
            var doc = new jsPDF(); 
            
            var pageSize = doc.internal.pageSize;
            var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
            var center = pageWidth / 2;
        
            doc.setTextColor(headColor[0], headColor[1], headColor[2]);
            doc.setFontSize(headFontSize);
            doc.text(schoolName, center, schoolNameY, 'center');           
            doc.text($(this).attr('data-section') + ' Grading ', center, 32, 'center');
            doc.setDrawColor(headColor[0], headColor[1], headColor[2]);
            doc.setLineWidth(1);
            doc.line(15, 36, 195, 36);
            doc.setFontSize(11);
            doc.setTextColor(100);

            
            // It can parse html:
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

            
            
            doc.save($(this).attr('data-section')+ ' Grading ' + displayDate(new Date())  +'.pdf');
            
        }         
        
    });// end click event


    
});

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
    
    for (let index = 1; index < 4; index++) {

        $row.find('td:eq('+ index +')').popover('hide');
        $row.find('td:eq('+ index +')').find('input').removeClass('error');
    }
}

function checkRow($row)
{
    for (let index = 1; index < 3; index++) {        
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
    }
    var conComment = $row.find('td:eq(3)');

    

    if( (/\d/.test( conComment.find('input').val() ) ) ||  !conComment.find('input').val() )
    {        
            popWarning(conComment, 'Required: Insert Valid Comment! No Digits');
            return false; 
    }

    return true;
    
}

function updateGrade($row)
{
    
    var gradeid, from, to, comment, sectionid;
    gradeid =  parseInt($row.attr('data-gradeid'));
    sectionid =  parseInt($row.attr('data-sectionid'));
    from = parseInt($row.find('td:eq(1)').text());
    to = parseInt($row.find('td:eq(2)').text());
    comment = $row.find('td:eq(3)').text();

    $.ajax({
        type: "post",
        url: "/adminhome/gradesandacademics/grades/updategrade",
        data: { grade_id: gradeid,
                from_mark: from, 
                to_mark: to,
                comment: comment
            },
        dataType: "json",
        success: function (response, status, code) {                                                                      
            
               console.log(response.data.msg);
             notifySuccess(response.data.msg);
             verifyTheGrades(sectionid);

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

function verifyTheGrades(sectionid) 
{
    sectionid = parseInt(sectionid);
    $.ajax({
        type: "post",
        url: "/adminhome/gradesandacademics/grades/verifygradesofsection",
        data: { section_id: sectionid
            },
        dataType: "json",
        success: function (response, status, code) {                                                                      
            
               console.log(response.data);
             notifySuccess(response.data);
             $('#verifyMsgForSection' + sectionid).html(response.data);
            

        },
        error: function (error) {
            if(error.status == 400) // if there is a client error
            {        
                
                //notifyFail(error.responseJSON.data);
                //alert(error.responseJSON.data.msg);
                //console.log(error);
            }
            if(error.status == 500) // if there is a server error
            {
                //notifyFail(error.responseJSON.data);
                //alert(error.responseJSON.data.msg);
                //console.log(error);
            }
            console.log(error); 
            $('#res').append(error.responseText); 
        }
    }); // end ajax call
}

function updateGrade($row)
{
    
    var gradeid, from, to, comment, sectionid;
    gradeid =  parseInt($row.attr('data-gradeid'));
    sectionid =  parseInt($row.attr('data-sectionid'));
    from = parseInt($row.find('td:eq(1)').text());
    to = parseInt($row.find('td:eq(2)').text());
    comment = $row.find('td:eq(3)').text();

    $.ajax({
        type: "post",
        url: "/adminhome/gradesandacademics/grades/updategrade",
        data: { grade_id: gradeid,
                from_mark: from, 
                to_mark: to,
                comment: comment
            },
        dataType: "json",
        success: function (response, status, code) {                                                                      
            
               console.log(response.data.msg);
             notifySuccess(response.data.msg);
             verifyTheGrades(sectionid);

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