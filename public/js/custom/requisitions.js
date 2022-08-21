/*
Name: 			requisitions.js
Written by: 	KABUYE HASHIM MUNIIRU
ORMS Version: 	1.0
Description:    Handle all the requests and behaviors of requisitions.blade.php
*/

$(document).ready(function () {
    // Initialise the ajax headers to have the CSRF laravel token
    $.ajaxSetup({
        headers: { 'X-CSRF-TOKEN':  $("meta[name='csrf-token']").attr('content')}
    }); 

    // Initialise datatable
    dtInit();
    
    // Function to handle the creation
    $('#addRequisitionBtn').click(function (e) { 
        if(e.detail !== 2)
        {
            
           
            addRequisition();
        }
        
    });// end click event

    $('#requisitionsTable').on('click', '.edit-btn', function (e) {
        e.preventDefault();
        fetchRequisition($(this).attr('data-id'));
    });

    $('#classes').change(function (e) { 
        e.preventDefault();
       
        getStreams($('#classes').val());
    });

    // Click event for the update pupil details function
    $('#updateRequisitionBtn').click(function (e) {
        if(e.detail !== 2)
        {                       
            updateRequisition();
        }         
        
    });// end click event

    $('#requisitionsTable').on('click', '.del-btn', function (e) {
        e.preventDefault();
       // var name = $(this).closest('tr').find('td:eq(1)').text();
        
        askDeleteRequisition($(this).attr('data-id'));
        
    });

    /*
	Modal Dismiss
	*/
	$(document).on('click', '.modal-dismiss', function (e) {
		e.preventDefault();
        resetRequisitionsModal();
        $.magnificPopup.close();
    });
    
});

function dtInit()
{
    var t = $('#requisitionsTable').DataTable({
        lengthMenu: [[10, 25, 50, 100, 200, -1], [10, 25, 50, 100, 200, 'All']]
    });
    t.on( 'order.dt search.dt', function () {
        t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();   
    
}

function addRequisition()
{
     

    //console.log(subjects);
    if($('#addRequisitionsForm').valid()) // Test if all Form Fields are validated
        {
            
            // ajax request to add a new section to the database
            $.ajax({
                type: "post",
                url: "/adminhome/finance/requisitions/addrequisition", 
                data: { 
                    requisition_number: $('#requisitionNumber').val(),
                    requested_by: $('#requestedBy').val(),
                    date_submitted: $('#dateSubmitted').val(),
                    term: $('#terms').val(),                
                    reason: $('#reason').val(),
                    amount_requested: $('#amountRequested').val(),                
                    amount_released: $('#amountReleased').val(),
                    received_by: $('#receivedBy').val(),
                    signed_by: $('#signedBy').val(),
                    date_released: $('#dateReleased').val(),
                    recorded_by: $('#recordedBy').attr('data-userid')                    
                },
                dataType: "json",
                success: function (response, status, code) {
                     
                                        
                    $.magnificPopup.close();
                    resetRequisitionsModal();
                    notifySuccess(response.data.msg);
                    getRequistions();
                    console.log(response);
                },
                error: function (error) {
                    console.log(error);
                    if(error.status == 400) // if there is a client error
                    {
                        $.each(error.responseJSON.errors, function(key, val){
                            console.log("Key: " + key + "| value: " + val);
                            warnByName($("input[name='" + key + "']"), val);
                        });
                        console.log(error.responseJSON.errors);
                        //var json = JSON.parse(error.responseText);
                        notifyFail('Failed');
                    }
                    if(error.status == 500) // if there is a server error
                    {
                        $('#res').append(error.responseText);
                        var json = JSON.parse(error.responseText);
                        console.log(json.data.msg);
                        notifyFail(json.data.msg);
                    }
                      
                }
            }); // end ajax call
        }// end if
}


function getStreams(classid)
{
    classid = parseInt(classid);
    $.ajax({
        type: "post",
        url: "/adminhome/classes/class/getstreamsbyclass",
        data: { class_id: classid},
        dataType: "json",
        success: function (response, status, code) {
             streamList = JSON.parse(response.data);
            console.log(streamList);
             $('#streams').empty();
            $.each(streamList, function(key, val){
                
                var stream = '<option value="'+ val.classandstreamid +'">'+ val.classstream +'</option>';
                $('#streams').append(stream);
            });
            return true;
        },
        error: function (error) {
            alert('Error '+ error);
              
        }
    });
}

// Reset the input fields of the Form on the Modal
// Unhide the Register btn
// Hide the update button
// Set all fields to null
function resetRequisitionsModal()
{
    $('#addRequisitionBtn').show();
    $('#updateRequisitionBtn').addClass('hidden');
    $('#heading').html('Register a Requisition');
    $('#user').addClass('hidden');
    $('#auth').removeClass('hidden');
    
    $('#recordedByUser').val(null);
    $('#requisitionid').val(null);
    $('#requisitionNumber').val(null);
    $('#requestedBy').val(null);
    $('#dateSubmitted').val(null);
    $('#terms').val(null);                
    $('#reason').val(null);
    $('#amountRequested').val(null);                
    $('#amountReleased').val(null);
    $('#receivedBy').val(null);
    $('#signedBy').val(null);
    $('#dateReleased').val(null);  
       
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


// Fetch pupil details by the id
function fetchRequisition(requisitionid)
{
    $('#requisitionsForm').trigger('loading-overlay:show');
    $('#addRequisitionBtn').hide();// Hide the register Button and show Update Btn
    $('#updateRequisitionBtn, #user').removeClass('hidden');
    $('#auth').addClass('hidden');
    $('#heading').html('Update Requisition Details');
    

    requisitionid = parseInt(requisitionid);

    // Pop up the Modal
    $.magnificPopup.open({
        items: {
            src: '#modalAnim'
        },
        type: 'inline',
        callbacks: {
            close: function(){                
                resetRequisitionsModal();               
            }
          }
    });

    
    $.ajax({
        type: "post",
        url: "/adminhome/finance/requisitions/getrequisitionbyid",
        data: { requisition_id: requisitionid},
        dataType: "json",
        success: function (response, status, code) {
            console.log(response);
            $('#requisitionid').val(response.data.data.requisitionid);
            $('#requisitionNumber').val(response.data.data.requisitionnumber);
            $('#requestedBy').val(response.data.data.requestedby);
            $('#dateSubmitted').val(getDate(response.data.data.daterequested));
            $('#terms').val(response.data.data.termid);                
            $('#reason').val(response.data.data.reason);
            $('#amountRequested').val(response.data.data.amountrequested);                
            $('#amountReleased').val(response.data.data.amountreleased);
            $('#receivedBy').val(response.data.data.receivedby);
            $('#signedBy').val(response.data.data.signedby);
            $('#dateReleased').val(getDate(response.data.data.datereleased));
            $('#recordedByUser').val(response.data.data.firstname + ' ' + response.data.data.lastname + 'l')

                                 
            
             
            $('#requisitionsForm').trigger('loading-overlay:hide');
            //openModal();
        },
        error: function (error) {
            //alert('Error!  '+ error.responseJSON.data.msg);
            $('#res').append(error.responseText);
            console.log(error);  
        }
    });

    
    
}

// This function will enable the datepickers to set the correct date
// if data is null, the date field will not be changed, it will be emptied
function getDate(data)
{

    if(data)
    {
        return String($.datepicker.formatDate('yy-mm-dd', new Date(data)));
    }
    else{
        return null;
    }
}

function displayDate(data)
{
    if(data)
    {
        return $.datepicker.formatDate('D, dd M yy', new Date(data));
    }
    else{
        return null;
    }
}

function getClassAndSetStream(classid, classandstreamid)
{
    classid = parseInt(classid);
    $.ajax({
        type: "post",
        url: "/adminhome/classes/class/getstreamsbyclass",
        data: { class_id: classid},
        dataType: "json",
        success: function (response, status, code) {
             streamList = JSON.parse(response.data);
            console.log(streamList);
             $('#streams').empty();
            $.each(streamList, function(key, val){
                
                var stream = '<option value="'+ val.classandstreamid +'">'+ val.classstream +'</option>';
                $('#streams').append(stream);
            });
            $('#streams').val(classandstreamid);
        },
        error: function (error) {
            alert('Error '+ error);
              
        }
    });
}

function updateRequisition()
{
     

    //console.log(subjects);
    if($('#addRequisitionsForm').valid()) // Test if all Form Fields are validated
        {
            
            // ajax request to add a new section to the database
            $.ajax({
                type: "post",
                url: "/adminhome/finance/requisitions/updaterequisition", 
                data: { 
                    requisition_id: $('#requisitionid').val(),
                    requisition_number: $('#requisitionNumber').val(),
                    requested_by: $('#requestedBy').val(),
                    date_submitted: $('#dateSubmitted').val(),
                    term: $('#terms').val(),                
                    reason: $('#reason').val(),
                    amount_requested: $('#amountRequested').val(),                
                    amount_released: $('#amountReleased').val(),
                    received_by: $('#receivedBy').val(),
                    signed_by: $('#signedBy').val(),
                    date_released: $('#dateReleased').val(),
                    recorded_by: $('#recordedBy').attr('data-userid')                    
                },
                dataType: "json",
                success: function (response, status, code) {
                     console.log(response);
                                        
                    $.magnificPopup.close();
                    resetRequisitionsModal();
                    notifySuccess(response.data.msg);
                    getRequistions();
                },
                error: function (error) {
                    console.log(error);
                    if(error.status == 400) // if there is a client error
                    {
                        $.each(error.responseJSON.errors, function(key, val){
                            console.log("Key: " + key + "| value: " + val);
                            warnByName($("input[name='" + key + "']"), val);
                        });
                        console.log(error.responseJSON.errors);
                        //var json = JSON.parse(error.responseText);
                        notifyFail('Failed');
                    }
                    if(error.status == 500) // if there is a server error
                    {
                        //$('#res').append(JSON.parse(error.responseText));
                        var json = JSON.parse(error.responseText);
                        console.log(json.data.msg);
                        notifyFail(json.data.msg);
                    }
                      
                }
            }); // end ajax call
        }// end if
}


function getRequistions()
{
    $.ajax({
        type: "post",
        url: "/adminhome/finance/requisitions",
        data: {},            
        dataType: "json",
        success: function (response, status, code) {
            // First destroy the DataTable Before creating a new one
            $('#requisitionsTable').DataTable().destroy();
            
             // Create a new dataTable and assign it to a variable t
             var t = $("#requisitionsTable").DataTable({
                data: JSON.parse(response.data),
                columns: [
                    { data: null },
                    { data: 'requisitionnumber'},
                    { data: 'requestedby'},
                    { data: 'datereleased', render: function (d) { return displayDate(d);}  },
                    { data: 'amountreleased', render: function (d) { return getCurrency(d);}},
                    { data: 'receivedby'},
                    { data: 'term'},
                    { data: 'firstname', render: function (d, type, all) { return all.firstname + ' ' + all.lastname;}},
                    { data: 'requisitionid'},                       
                ],
                columnDefs: [ {
                    targets: 0,
                    order: [[ 1, 'asc' ]]
                  } ],
                columnDefs: [ {
                    targets: 8,
                    data: 'requisitionid',
                    className: 'actions-hover actions-fade',
                    render: function ( data) {
                                    return '<a class="modal-with-zoom-anim ws-normal context-menu pointer edit-btn" href="#modalAnim" data-id="'+ data + '">'+ 
                                    '<i class="fas fa-pencil-alt"></i>Edit</a>' + 
                                    ' <a class="ws-normal context-menu pointer del-btn" data-id="'+ data + '"><i class="fas fa-trash"></i>Delete</a>';
                                }
                  } ],                          
                    lengthMenu: [[10, 25, 50, 100, 200, -1], [10, 25, 50, 100, 200, 'All']]                     
            });

            // Use var t to assign a counter column onto the table
            t.on( 'order.dt search.dt', function () {
                t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                    cell.innerHTML = i+1;
                } );
            } ).draw(); 

            //dtInit();
            
            
        },
        error: function (error) {
            alert("No Response From Server");
        }
    }); // end ajax call
}

// Pop up a confirm dialog to delete a pupil
function askDeleteRequisition(reqid)
{
    
    reqid = parseInt(reqid);
    $.alert({
        title: 'Confirm To Delete Selected Requisition',     
        buttons: {
            confirm: function (){
                deleteRequisition(reqid);
                
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

// Delete pupil by the pupilid
function deleteRequisition(reqid)
{
    $.ajax({
        type: "post",
        url: "/adminhome/finance/requisitions/deleterequisition",
        data: { requisition_id: reqid},
        dataType: "json",
        success: function (response, status, code) {
           getRequistions();
            notifySuccess(response.data.msg);
        },
        error: function (error) {
            //notifyFail(error.responseJSON.data.msg);
            $('#res').append(error.responseText);
              
        }
    });
    
}