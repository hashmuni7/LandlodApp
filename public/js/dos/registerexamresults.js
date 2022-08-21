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
     getSectionGrading();
     

    $('#examResults').on('click', '.edit-btn', function (e) {
        e.preventDefault();
        // Pop up the Modal
        $.magnificPopup.open({
            items: {
                src: '#modalAnim'
            },
            type: 'inline',
            callbacks: {
                close: function(){                
                   // resetExamsModal();               
                }
            }
        });
        pupilid =  parseInt($(this).closest('tr').attr('data-pupilid'));
        name = $(this).closest('tr').find('td:eq(1)').text();

        $('#heading').html(name);
        $('#pupilid').val(pupilid);
        //var testName = $(this).closest('tr').find('td:eq(1)').text();
        //var testid = $(this).closest('tr').attr('data-testid');

        //var examid = $(this).attr('data-examid');
        aRow = $(this).closest('tr');
        //alert('The Columns are ' + theTable.row(aRow).data().length);
        // var Message;
        $('#otherFields').empty();
        var temp = theTable.row(aRow).data();
        for (let index = 3; index < theTable.row(aRow).data().length; index = index + 2) {
            check = theTable.column(index).header();
            if($(check).hasClass('action')) break;
            

            title = theTable.column(index).header();
            title = $(title).html();

            mark = temp[index];
            resultid = parseInt(aRow.find('td:eq('+ index +')').attr('data-resultid'));

            grade = temp[index+1];
            var aPaper = '\
                    <div class="form-row">\
                        <div class="form-group col-md-8">\
                            <label for="Eng">'+ title +'</label>\
                            <input type="number" min="0" max="100" class="form-control mark" data-index="'+ index +'" data-resultid="'+ resultid +'" id="'+ title +'" name="mark" value="'+ mark +'" maxlength="3">\
                        </div>\
                        <div class="form-group col-md-4 mb-3 mb-lg-0">\
                            <label for="Grade">Grade</label>\
                            <input type="name" class="form-control grade" id="rngGrade" data-resultid="'+ resultid +'" data-index="'+ (index+1) +'" name="" value="'+ grade +'" placeholder="" disabled>\
                        </div>\
                    </div>\
                ';

            $('#otherFields').append(aPaper);
            // var temp = theTable.row(aRow).data();
            // var figure = temp[index];
            // Message = Message + ' ' + figure;
            
        }
        

        
        
        
                                                    
                                                    
                                                 
    });

    $('#saveBtn').click(function (e) { 
        e.preventDefault();
        figure = true;
        if(e.detail !== 2)
        {       
            if($("#editMarksForm").valid())
            {
                var newResults = [];
            
    
                $('.mark:input[data-resultid]').each(function(){
                    // Check if any of the inputs has a value greater than 100
                    // This will prepare a warning message
                    if($.isNumeric($(this).val()))
                    {
                        var check = parseInt($(this).val());
                        if(check > 100)
                        {
                            figure = false;
                            
                            //alert('Found');
                        }
                    }
    
    
                    // Make some validation and set null for values that
                    // dont match the criteria
                    var resultid = parseInt($(this).attr('data-resultid'));
                    if($.isNumeric($(this).val()))
                    {
                        if(parseInt($(this).val()) < 101 && parseInt($(this).val()) > -1)
                        {
                            var mark = parseInt($(this).val());
                            
                        }
                        else{
                            var mark = null;
                            $(this).val(null);
                        }
                         
                    }
                    else{
                        var mark = null;
                        $(this).val(null);
                    }
                
                    
    
    
                    newResults.push([resultid, mark]);
                    
                });
    
                
    
                
    
                
               
                
                
                if(figure)
                {
                    $.magnificPopup.close();
                    $('#otherFields input').each(function(){
                   
                        var temp = theTable.row(aRow).data();
                        index = parseInt($(this).attr('data-index'));
                        temp[index] = $(this).val();                  
                        $('#examResults').dataTable().fnUpdate(temp, aRow, undefined, false);
                        $('#examResults').trigger('order');
                       
                        
                    });
                    updateExamResults(newResults);
                }
                else{
                    $.alert({
                        title: "Error",
                        content:  'Paper Cannot not have Mark Beyond 100%',
                        buttons: {
                            ok: function (){
                                //deleteTest(testid, $row)
                            }
                        },
                        icon: 'fa fa-spinner fa-spin',
                        type: 'blue',
                        theme: 'modern',
                        animation: 'bottom',
                        closeAnimation: 'rotateY',
                        animationBounce: 2.5
                    });
                }
                
                console.log(newResults);
            }
        }
        
        
    });

    

    $('#otherFields').on('change keyup mouseup', 'input.mark', function(e) {
        this.value = this.value.replace(/[^0-9\.]/g, null);
        
        resultid = $(this).attr('data-resultid');
        mark = parseInt($(this).val());

        for (let index = 0; index < grades.length; index++) {
            if(mark == '')
            {
                $('.grade:input[data-resultid="'+ resultid +'"]').val(null);
            }
            if($.isNumeric(mark) && (mark > -1) && (mark < 101))
            {
                if(mark >= grades[index].frommark && mark <= grades[index].tomark)
                {
                    $('.grade:input[data-resultid="'+ resultid +'"]').val(grades[index].grade);
                    break;
                }
            }
            else{
                $('.grade:input[data-resultid="'+ resultid +'"]').val(null);
            }
            
        }

        
        
       
    });


    $('#printExamMarkSheet').click(function (e) {
        
        if(e.detail !== 2)
        {       
                         
            printEmptyExamMarkSheet();
        }         
        
    });// end click event
    

});



function dtInit()
{
    
    // $('#testScores').SetEditable({
    //     columnsEd: '3',        //Jquery object of "Add" button
    //     onBeforeEdit: function($row){
                 
    //              putNormal($row);
                 
    //              return checkRow($row);
               
    //     },
    //     onEdit: function($row) {
    //         // alert(parseInt($row.attr('data-gradeid')));
    //         gradeScore($row);
    //     },
    //     onCancel: function($row) {
    //         //alert(parseInt($row.attr('data-gradeid')));
    //         putNormal($row);
    //     }
    // });

    var t = $('#examResults').DataTable({
        lengthMenu: [[ -1], [ 'All']]
    });
    theTable = t;
    t.on( 'order.dt search.dt page.dt', function () {
        t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();
    
}

function getSectionGrading()
{
    $.ajax({
        type: "post",
        url: "/doshome/gradesandacademics/exams/getgradingofsection",
        data: { 
            section_id: parseInt($('#sid').val()) },
        dataType: "json",
        success: function (response, status, code) {                                                                      
                grades = response.data.data;
               console.log(response);

        },
        error: function (error) {
           
              
        }
    }); // end ajax call
}


function updateExamResults(results)
{
    if($("#editMarksForm").valid())
    {
        $.ajax({
            type: "post",
            url: "/doshome/gradesandacademics/exams/updateexamresults",
            data: { 
                section_id: parseInt($('#sid').val()),
                results : results,
                exam_id: parseInt($('#eid').val())
            },
            dataType: "json",
            success: function (response, status, code) {                                                                      
                   // grades = response.data.data;
                   notifySuccess(response.data.msg);
                   console.log(response);
    
            },
            error: function (error) {
               console.log(error);
               $('#res').append(error.responseText);
                  
            }
        }); // end ajax call
    }
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

function printEmptyExamMarkSheet()
{

    var tbl = $('#examResults').clone();
    // tbl.find('tr td:nth-child(4)').empty();
    
    var lastIndex =  theTable.row().data().length;
    tbl.find('tr th:nth-child('+ lastIndex +'), tr td:nth-child('+ lastIndex +')').remove();
    
        for (let index = 4; index < theTable.row().data().length; index = index + 1) {            
            
            tbl.find('tr td:nth-child('+ index +')').empty();
            tbl.find('tr td:nth-child('+ (index + 1) +'), tr th:nth-child('+ (index + 1) +')').remove();            
                      
            
        }
       
    
    var doc = new jsPDF();  

    var pageSize = doc.internal.pageSize;
    var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
    var center = pageWidth / 2;
   
    doc.setTextColor(headColor[0], headColor[1], headColor[2]);
    doc.setFontSize(headFontSize);
    doc.text(schoolName, center, schoolNameY, 'center');   
    doc.text($('#examHead').html(), center, 32, 'center');
    doc.text($('#examSubHead').html(), center, 40, 'center');
    var theDates = String( + $('#examSubHead22').html());
    doc.text($('#examSubHead2').html(), center - 36, 47, 'center');
    doc.text($('#examSubHead22').html(), center + 36, 47, 'center');
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

    
    
    doc.save($('#examHead').html()+ '_' + displayDate(new Date())  +'.pdf');
    
}



