/*
Name: 			alltests.js
Written by: 	KABUYE HASHIM MUNIIRU
ORMS Version: 	1.0
Description:    Handle all the requests and behaviors of alltests.blade.php
*/
var theTable;
$(document).ready(function () {
    // Initialise the ajax headers to have the CSRF laravel token
    $.ajaxSetup({
        headers: { 'X-CSRF-TOKEN':  $("meta[name='csrf-token']").attr('content')}
    }); // end ajax header initialisation

    dtInit(); // Initialise the dataTable

    $('#testsTable').on('click', '.del-test-btn', function (e) {
        e.preventDefault();
        var testName = $(this).closest('tr').find('td:eq(1)').text();
        var testid = $(this).closest('tr').attr('data-testid');
        var row = $(this).closest('tr');
        askDeleteTest(testid, testName, row);

        //theTable.row($(this).parents('tr')).remove().draw();
    });

});

function dtInit()
{
    
    $('table').SetEditable({
        columnsEd: '1',        //Jquery object of "Add" button
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
            // alert(parseInt($row.attr('data-gradeid')));
             updateTest($row);
        },
        onCancel: function($row) {
            //alert(parseInt($row.attr('data-gradeid')));
            putNormal($row);
        }
    });

    var t = $('#testsTable').DataTable({
        lengthMenu: [[10, 25, 50, 100, 200, -1], [10, 25, 50, 100, 200, 'All']]
    });
    theTable = t;
    t.on( 'order.dt search.dt', function () {
        t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();
    
}

function putNormal($row)
{
    
   let index = 1; 

        $row.find('td:eq('+ index +')').popover('hide');
        $row.find('td:eq('+ index +')').find('input').removeClass('error');
   
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

function checkRow($row)
{
   let index = 1;       
     
    var conComment = $row.find('td:eq('+ index +')');

    

    if( !conComment.find('input').val() )
    {        
            popWarning(conComment, 'Please give the Test A Name');
            return false; 
    }

    return true;
    
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
        url: "/doshome/gradesandacademics/tests/updatetest",
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
function askDeleteTest(testid, testName, $row)
{
    
    testid = parseInt(testid);
    $.alert({
        title: 'Are You Sure You Want to Delete',
        content:  testName,
        buttons: {
            confirm: function (){
                deleteTest(testid, $row)
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
function deleteTest(testid, $row)
{
    //table = $row.closest('table');
    $.ajax({
        type: "post",
        url: "/doshome/gradesandacademics/tests/deletetest",
        data: { test_id: testid},
        dataType: "json",
        success: function (response, status, code) {
           
            notifySuccess(response.data.msg);
            if(!response.data.data) theTable.row($row).remove().draw();
            
        },
        error: function (error) {
            notifyFail(error.responseJSON.data.msg);
            //alert('Error '+ error);
              
        }
    });
    
}