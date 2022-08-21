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

    $('#reportsTable').on('click', '.del-report-btn', function (e) {
        e.preventDefault();
        var reportName = $(this).closest('tr').find('td:eq(1)').text();
        var reportid = $(this).closest('tr').attr('data-reportid');
        var row = $(this).closest('tr');
        askDeleteReport(reportid, reportName, row);

        //theTable.row($(this).parents('tr')).remove().draw();
    });

    $('#reportsTable').on('click', '.edit-report-btn', function (e) {
        e.preventDefault();
       
        var reportid = $(this).attr('data-reportid');
        var reportName = $(this).closest('tr').find('td:eq(1)').text();
        aRow = $(this).closest('tr');
        
        fetchReport(reportid, reportName);

        //theTable.row($(this).parents('tr')).remove().draw();
    });

    $('#updateReportBtn').on('click', function (e) {
        e.preventDefault();
       
        
            if(e.detail !== 2)
            {       
                             
                updateTheReport(aRow);
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
    var t = $('#reportsTable').DataTable({
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

// Pop up a confirm dialog to delete a report
function askDeleteReport(reportid, reportName, $row)
{
    
    reportid = parseInt(reportid);
    $.alert({
        title: 'Are You Sure You Want to Delete',
        content:  reportName,
        buttons: {
            confirm: function (){
                deleteReport(reportid, $row);
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

// Delete a report by its reportid
function deleteReport(reportid, $row)
{
    //table = $row.closest('table');
    $.ajax({
        type: "post",
        url: "/adminhome/gradesandacademics/reports/deletereport",
        data: { report_id: reportid},
        dataType: "json",
        success: function (response, status, code) {
           
            notifySuccess(response.data.msg);
            if(response.data.data) theTable.row($row).remove().draw();
            
        },
        error: function (error) {
            alert('Error '+ error);
              
        }
    });
    
}

// Fetch report Name 
function fetchReport(reportid, reportName)
{
    $('#reportsForm').trigger('loading-overlay:show');             
    

    reportid = parseInt(reportid);

    // Pop up the Modal
    $.magnificPopup.open({
        items: {
            src: '#modalAnim'
        },
        type: 'inline',
        callbacks: {
            close: function(){                
                resetReportsModal();               
            }
          }
    });

    
    $('#reportid').val(reportid);            
    $('#report').val(reportName);
    $('#reportsForm').trigger('loading-overlay:hide');

    
    
}

function resetReportsModal()
{
   
    $('#reportid').val(null);
    $('#report').val(null);
    
     
         
}

// Update the Report By its id
// Get the fields to update from the input field
function updateTheReport(aRow)
{        
    
        if($('#editReportsForm').valid()) // Test if all Form Fields are validated
        {
            $.ajax({
                type: "post",
                url: "/adminhome/gradesandacademics/reports/updatereport",
                data: { report_id: parseInt($('#reportid').val()),
                        report: $('#report').val()
                    },
                dataType: "json",
                success: function (response, status, code) {
                   
                                      
                    
                    
                    
                    //getTeachers();
                    console.log(response.data.msg);
                    notifySuccess(response.data.msg);
                    // Update the table without redrawing it
                    var temp = theTable.row(aRow).data();
                    temp[1] = $('#report').val();                   
                    $('#reportsTable').dataTable().fnUpdate(temp, aRow, undefined, false);
                    $('#reportsTable').trigger('order'); // To re number the updated row
                    resetReportsModal();
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
                        //console.log(error);
                    }
                    if(error.status == 500) // if there is a server error
                    {
                        notifyFail(error.responseJSON.data.msg);
                        alert(error.responseJSON.data.msg);
                        //console.log(error);
                    }
                      
                }
            }); // end ajax call
        }// end if
        
    
}