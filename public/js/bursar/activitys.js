/*
Name: 			activitys.js
Written by: 	KABUYE HASHIM MUNIIRU
ORMS Version: 	1.0
Description:    Handle all the requests and behaviors of activitys.blade.php
*/
var theTable, aRow;
$(document).ready(function () {
    // Initialise the ajax headers to have the CSRF laravel token
    $.ajaxSetup({
        headers: { 'X-CSRF-TOKEN':  $("meta[name='csrf-token']").attr('content')}
    }); // end ajax header initialisation

    // Create a dataTable
    dtInit();    

    // Function to handle the creation of a new 
    $('#addActivityBtn').click(function (e) { 
        if(e.detail !== 2)
        {
            addActivity();
        }
        
    });// end click event

    $('#activitysTable').on('click', '.edit-btn', function (e) {
        e.preventDefault();
        aRow = $(this).closest('tr');        
        fetchActivity($(this).attr('data-id'));
    });

    // Click event for the update method
    $('#updateActivityBtn').click(function (e) {
        if(e.detail !== 2)
        {
            updateActivity();
        }         
        
    });// end click event

    $('#activitysTable').on('click', '.del-btn', function (e) {
        e.preventDefault();
        aRow = $(this).closest('tr');
        activity = $(this).closest('tr').find('td:eq(1)').text();
        askDeleteActivity($(this).attr('data-id'), activity);
    });

    /*
	Modal Dismiss
	*/
	$(document).on('click', '.modal-dismiss', function (e) {
		e.preventDefault();
        resetActivitysModal();
        $.magnificPopup.close();
    });
    
    // Click event to put focus on the input field
    // This needs the setTimeOut function to allow the Modal to load
    // on to the DOM
    $('#addToTable').click(function (e) { 
        setTimeout(function () { 
            $('#activity').focus();
         }, 150);        
    });// end click event

    $('#printActivities').click(function (e) {
        
        if(e.detail !== 2)
        {
            
           
            printActivities();
        }         
        
    });// end click event
});

function printActivities()
{
    var tbl = $('#activitysTable').clone();
    tbl.find('tr th:nth-child(7), tr td:nth-child(7)').remove();

    
    var doc = new jsPDF();
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

    var pageSize = doc.internal.pageSize;
            var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
            var center = pageWidth / 2;
   
    doc.setTextColor(headColor[0], headColor[1], headColor[2]);
    doc.setFontSize(headFontSize);
    doc.text(schoolName, center, schoolNameY, 'center');
    doc.setDrawColor(headColor[0], headColor[1], headColor[2]);
    doc.text('ACTIVITIES', center, 32, 'center');
    doc.setLineWidth(1);
    doc.line(15, 36, 195, 36);
    doc.setFontSize(11);
    doc.setTextColor(100);

    
    
    doc.save('activites.pdf');
}

function dtInit()
{
        

    var t = $('#activitysTable').DataTable({lengthMenu: [[ -1], [ 'All']]});
    theTable = t;
    t.on( 'order.dt search.dt', function () {
        t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();
    
}

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

function addActivity()
{
    
    if($('#addActivitysForm').valid()) // Test if all Form Fields are validated
        {
            
            // ajax request to add  to the database
            $.ajax({
                type: "post",
                url: "/bursarhome/finance/activities/addactivity", 
                data: { 
                    activity: $('#activity').val(),
                    amount: $('#amount').val(),
                    term: $('#terms').val(),
                    date: $('#date').val()                   
                },
                dataType: "json",
                success: function (response, status, code) {
                    // var html = getFunctions(response.data.data.activityid);
                    // var activity = response.data.data.activity;
                    // var amount = response.data.data.amount;
                    // var term = $('#terms :selected').text();
                    // var date = displayDate($('#date').val());                   
                    // theTable.row.add(['1', activity, amount, date, term, 'Pending', html]).draw(false);

                    $.magnificPopup.close();
                    resetActivitysModal();
                    notifySuccess(response.data.msg);
                    getActivitys();
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


function getFunctions(id)
{
    var html = "<a class=\"modal-with-zoom-anim ws-normal  pointer edit-btn\" href=\"#modalAnim\" \
                    data-id=\""+ id +"\"><i class=\"fas fa-pencil-alt\"></i> Edit</a>\n<a class=\"ws-normal pointer del-btn\" \
                    data-id=\""+ id +"\"><i class=\"fas fa-trash\"></i> Delete</a>";
    return html;
}

// Reset the input fields of the Form on the Modal
// Unhide the Register btn
// Hide the update button
// Set all fields to null
function resetActivitysModal()
{
    $('#addActivityBtn').show();
    $('#updateActivityBtn').addClass('hidden');
    $('#heading').html('Register a New Activity');
    $('#activityid').val(null);
    $('#activity').val(null);
    $('#amount').val(null);
    $('#date').val(null); 
    $('#statusField').addClass('hidden');   
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

// Fetch method details by the id
function fetchActivity(activityid)
{
    $('#activityForm').trigger('loading-overlay:show');
    $('#addActivityBtn').hide();// Hide the register Button and show Update Btn
    $('#updateActivityBtn').removeClass('hidden');
    $('#statusField').removeClass('hidden');
    $('#heading').html('Update Activity Details');
    

    activityid = parseInt(activityid);

    // Pop up the Modal
    $.magnificPopup.open({
        items: {
            src: '#modalAnim'
        },
        type: 'inline',
        callbacks: {
            close: function(){                
                resetActivitysModal();               
            }
          }
    });

    
    $.ajax({
        type: "post",
        url: "/bursarhome/finance/activities/getactivitybyid",
        data: { activity_id: activityid},
        dataType: "json",
        success: function (response, status, code) { 
            console.log(response);                       
            $('#activityid').val(response.data.data.activityid);
            $('#activity').val(response.data.data.activity);
            $('#amount').val(response.data.data.amount);
            $('#terms').val(response.data.data.termid);
            $('#date').val(getDate(response.data.data.deadline));
            response.data.data.status ? $('#statusActive').prop('checked', true) : $('#statusInactive').prop('checked', true);
            $('#activityForm').trigger('loading-overlay:hide');
            
        },
        error: function (error) {
            //alert('Error!  '+ error.responseJSON.data.msg);
            $('#res').append(error.responseText);
            console.log(error);  
        }
    });

    
    
}

function updateTable(method, evidence)
{
    var temp = theTable.row(aRow).data();
    temp[1] = method;//$('#method').val(); 
    temp[2] = evidence;//$('#evidence :selected').text();                  
    $('#methodsTable').dataTable().fnUpdate(temp, aRow, undefined, false);
    $('#methodsTable').trigger('order');
}

// Update the  Details By its id
// Get the field to update from the input field
function updateActivity()
{   
    
     
        if($('#addActivitysForm').valid()) // Test if all Form Fields are validated
        {
            
            $.ajax({
                type: "post",
                url: "/bursarhome/finance/activities/updateactivity",
                data: { 
                    activity_id: $('#activityid').val(),
                    activity: $('#activity').val(),
                    amount: $('#amount').val(),
                    term: $('#terms').val(),
                    date: $('#date').val(),
                    status: parseInt($('#statusField input:checked').val())                  
                },
                dataType: "json",
                success: function (response, status, code) {
                                                                                                                  
                    getActivitys();
                    console.log(response.data.msg);
                    notifySuccess(response.data.msg);
                    
                  
                   
                    
                    
                    $.magnificPopup.close();
                    resetActivitysModal();
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
                        //alert(error.responseJSON.data.msg);
                        console.log(error);
                    }
                      
                }
            }); // end ajax call
        }// end if

        
        
    
}

// Pop up a confirm dialog to delete
function askDeleteActivity(activityid, activity)
{
    $.alert({
        title: 'Are You Sure You Want to Delete',
        content:  activity,
        buttons: {
            confirm: function (){
                deleteActivity(activityid);
               
               
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

// Delete  by its id
function deleteActivity(activityid)
{
    
    $.ajax({
        type: "post",
        url: "/bursarhome/finance/activities/deleteactivity",
        data: { activity_id: activityid},
        dataType: "json",
        success: function (response, status, code) {
            getActivitys();
            notifySuccess(response.data.msg);            
        },
        error: function (error) {
            notifyFail(error.responseJSON.data.msg);
            //alert('Error '+ error);
              
        }
    });
    
}

function getActivitys()
{
    $.ajax({
        type: "post",
        url: "/bursarhome/finance/activities",
        data: {},            
        dataType: "json",
        success: function (response, status, code) {
            // First destroy the DataTable Before creating a new one
            $('#activitysTable').DataTable().destroy();
            
             // Create a new dataTable and assign it to a variable t
             var t = $("#activitysTable").DataTable({
                data: JSON.parse(response.data),
                columns: [
                    { data: null },
                    { data: 'activity' },
                    { data: 'amount', render: function (d) { return getCurrency(d);} },
                    { data: 'deadline', render: function (d) { return displayDate(d);}  },
                    { data: 'term' },
                    { data: 'status', render: function (d) { return d ? 'Pending' : 'Complete';}  },
                    { data: 'activityid'}                         
                ],
                columnDefs: [ {
                    targets: 0,
                    order: [[ 1, 'asc' ]]
                  } ],
                columnDefs: [ {
                    targets: 6,
                    data: 'activityid',
                    className: 'actions-hover actions-fade',
                    render: function ( data) {
                                    return '<a class="modal-with-zoom-anim ws-normal context-menu pointer edit-btn" href="#modalAnim" data-id="'+ data + '">'+ 
                                    '<i class="fas fa-pencil-alt"></i>Edit</a>' + 
                                    ' <a class="ws-normal context-menu pointer del-btn" data-id="'+ data + '"><i class="fas fa-trash"></i>Delete</a>';
                                }
                  } ], 
                  lengthMenu: [[ -1], [ 'All']] 
            });

            // Use var t to assign a counter column onto the table
            t.on( 'order.dt search.dt', function () {
                t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                    cell.innerHTML = i+1;
                } );
            } ).draw();                                
        },
        error: function (error) {
            alert("No Response From Server");
        }
    }); // end ajax call
}

