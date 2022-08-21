/*
Name: 			alltests.js
Written by: 	KABUYE HASHIM MUNIIRU
ORMS Version: 	1.0
Description:    Handle all the requests and behaviors of alltests.blade.php
*/
var theTable, aRow;
$(document).ready(function () {
    // Initialise the ajax headers to have the CSRF laravel token
    $.ajaxSetup({
        headers: { 'X-CSRF-TOKEN':  $("meta[name='csrf-token']").attr('content')}
    }); // end ajax header initialisation

    dtInit(); // Initialise the dataTable

    $('#examsTable').on('click', '.del-exam-btn', function (e) {
        e.preventDefault();
        var examName = $(this).closest('tr').find('td:eq(1)').text();
        var examid = $(this).closest('tr').attr('data-examid');
        var row = $(this).closest('tr');
        askDeleteExam(examid, examName, row);

        //theTable.row($(this).parents('tr')).remove().draw();
    });

    $('#examsTable').on('click', '.edit-exam-btn', function (e) {
        e.preventDefault();
       
        var examid = $(this).attr('data-examid');
        aRow = $(this).closest('tr');
        
        fetchExam(examid);

        //theTable.row($(this).parents('tr')).remove().draw();
    });

    $('#updateExamBtn').on('click', function (e) {
        e.preventDefault();
        if(e.detail !== 2)
        {       
                         
            updateTheExam(aRow);
        }
        
        
        //theTable.row($(this).parents('tr')).remove().draw();
    });


   
    
    setValidationRules();
    

});

function setValidationRules()
{
    $.validator.addMethod('chkSubjectsForAgg', function(){
        return $('.exam-subjects-agg input:checked').length == 4;
    });
    
	
    $examFormValidator = $("#editExamsForm").validate({
    rules: {       
        subjects_agg_arr : {chkSubjectsForAgg: true}
        
    },
    messages: {       
        subjects_agg_arr: "Please Select Only 4 Subjects"
    },
    highlight: function(element) {
        $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
    },
    success: function(element) {
        $(element).closest('.form-group').removeClass('has-error');
        $(element).remove();
    },
    errorPlacement: function( error, element ) {
        if(element.parent().hasClass('checkbox-custom'))
        {
            element.closest('.chk-group-div').append(error);
        }
        else{
            element.parent().append( error );
        }
            
    }
    });
}

function dtInit()
{
    var t = $('#examsTable').DataTable({
        lengthMenu: [[10, 25, 50, 100, 200, -1], [10, 25, 50, 100, 200, 'All']]
    });
    theTable = t;
    
    t.on( 'order.dt search.dt', function () {
        t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();
    
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

function updateTest($row)
{
    
    var testid, name;
    testid =  parseInt($row.attr('data-testid'));
    test =  $row.find('td:eq(1)').text();
    
    

    $.ajax({
        type: "post",
        url: "/adminhome/gradesandacademics/tests/updatetest",
        data: { test_id: testid,
                test: test
            },
        dataType: "json",
        success: function (response, status, code) {                                                                      
            
               console.log(response.data.msg);
             notifySuccess(response.data.msg);
            
            

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

// Pop up a confirm dialog to delete a test
function askDeleteExam(examid, examName, $row)
{
    
    examid = parseInt(examid);
    $.alert({
        title: 'Are You Sure You Want to Delete',
        content:  examName,
        buttons: {
            confirm: function (){
                deleteExam(examid, $row)
            },
            cancel: function (){}
        },
        icon: 'fa fa-spinner fa-spin',
        type: 'blue',
        theme: 'modern',
        animation: 'bottom',
        closeAnimation: 'rotateY',
        animationBounce: 2.5
    });

}

// Delete a test by its testid
function deleteExam(examid, $row)
{
    //table = $row.closest('table');
    $.ajax({
        type: "post",
        url: "/adminhome/gradesandacademics/exams/deleteexam",
        data: { exam_id: examid},
        dataType: "json",
        success: function (response, status, code) {
           
            notifySuccess(response.data.msg);
            if(!response.data.data) theTable.row($row).remove().draw();
            
        },
        error: function (error) {
            alert('Error '+ error);
            notifyFail(error.responseJSON.data.msg); 
        }
    });
    
}

// Fetch teacher details by the teacherid
function fetchExam(examid)
{
    $('#examsForm').trigger('loading-overlay:show');             
    

    examid = parseInt(examid);

    // Pop up the Modal
    $.magnificPopup.open({
        items: {
            src: '#modalAnim'
        },
        type: 'inline',
        callbacks: {
            close: function(){                
                resetExamsModal();               
            }
          }
    });

    
    $.ajax({
        type: "post",
        url: "/adminhome/gradesandacademics/exams/getexamforedit",
        data: { exam_id: examid},
        dataType: "json",
        success: function (response, status, code) {
            //console.log(response.data.data[0].exam.examid);                        
            $('#examid').val(response.data.data[0].exam.examid);            
            $('#exam').val(response.data.data[0].exam.exam)
            $('.exam-subjects-agg').empty();           
            $.each(response.data.data[0].subjects, function(key, val){
               var aSubject = '\
                    <div class="checkbox-custom checkbox-default col-lg-4">\
                        <input type="checkbox" id="subjectbyclassIDForAgg' + val.subjectbyclassid +'"  value="' + val.subjectbyclassid +'" name="subjects_agg_arr" required>\
                        <label for="" class="mt-2">' + val.subject + '</label>\
                    </div>\
                ';
                $('.exam-subjects-agg').append(aSubject);
                val.considered ? $('#subjectbyclassIDForAgg' + val.subjectbyclassid).prop('checked', true) : $('#subjectbyclassIDForAgg' + val.subjectbyclassid).prop('checked', false);               
            });
                       
            $('#examsForm').trigger('loading-overlay:hide');
            //openModal();
        },
        error: function (error) {
            //alert('Error!  '+ error.responseJSON.data.msg);
            $('#res').append(error.responseText);
            console.log(error);  
        }
    });

    
    
}

function resetExamsModal()
{
   
    $('#examid').val(null);
    $('#exam').val(null);
    $('.exam-subjects-agg').empty();
    //$('.error').remove(); 
         
}

// Update the Exam By its id
// Get the field to update from the input field
function updateTheExam(aRow)
{
    
    // An array to hold the subjects ticked for the exam
    // This tells from which subject to collect an aggregate from
    var subjectsForAgg = [];
    $('.exam-subjects-agg input:checked').each(
        function(){
            subjectsForAgg.push(parseInt($(this).val()));
        }
    );
    
        if($('#editExamsForm').valid()) // Test if all Form Fields are validated
        {
            $.ajax({
                type: "post",
                url: "/adminhome/gradesandacademics/exams/editexam",
                data: { exam_id: $('#examid').val(),
                        exam: $('#exam').val(), 
                        subjects_for_agg: subjectsForAgg
                    },
                dataType: "json",
                success: function (response, status, code) {
                    
                                      
                    
                    
                    
                    //getTeachers();
                    console.log(response.data.msg);
                    notifySuccess(response.data.msg);
                    // Update the table without redrawing it
                    var temp = theTable.row(aRow).data();
                    temp[1] = $('#exam').val();                   
                    $('#examsTable').dataTable().fnUpdate(temp, aRow, undefined, false);
                    $('#examsTable').trigger('order');
                    resetExamsModal();
                    $.magnificPopup.close();
                },
                error: function (error) {
                    if(error.status == 400) // if there is a client error
                    {
                        $.each(error.responseJSON.errors, function(key, val){
                            warnByName($("input[name='" + key + "']"), val);
                        });
                        
                        notifyFail(error.responseJSON.data.msg);
                        alert(error.responseJSON.data.msg);
                        console.log(error);
                    }
                    if(error.status == 500) // if there is a server error
                    {
                        notifyFail(error.responseJSON.data.msg);
                        alert(error.responseJSON.data.msg);
                        console.log(error);
                    }
                      
                }
            }); // end ajax call
        }// end if
        
    
}