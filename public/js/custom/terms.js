/*
Name: 			terms.js
Written by: 	KABUYE HASHIM MUNIIRU
ORMS Version: 	1.0
Description: Handle all the requests and behaviors of the page terms.blade.php
*/

$(document).ready(function () {
    // Initialise the ajax headers to have the CSRF laravel token
    $.ajaxSetup({
        headers: { 'X-CSRF-TOKEN':  $("meta[name='csrf-token']").attr('content')}
    }); // end ajax header initialisation

    // Click event for the update term function
    $('#updateTermBtn').click(function (e) { 
        if(e.detail !== 2)
        {
            updateTerm($('#yearid').val());
        }        
        
    });// end click event

    $('.yearTbl').dataTable({
        searching: false,
        paging: false,
        info: false,
        bSort: false
    });

}); // end the document ready function


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

// Fetch term details by the termid
function fetchTerm(termid)
{
    $('#termForm').trigger('loading-overlay:show');

    // Hide the register Button and show Update Btn
    //$('#updateTermBtn').removeClass('hidden');
    // Pop up the Modal
    $.magnificPopup.open({
        items: {
            src: '#modalAnim'
        },
        type: 'inline',
        callbacks: {
            close: function(){                
                resetTermsModal();               
            }
          }
    });

    // First Make the call to fetch the data
    $.ajax({
        type: "post",
        url: "/adminhome/terms/gettermbyid",
        data: { term_id: termid},
        dataType: "json",
        success: function (response, status, code) {
            //console.log($.datepicker.formatDate('yy-mm-dd', new Date(response.data.data.startdate)));
            
            $('#termid').val(response.data.data.termid);
            $('#term').val(response.data.data.term);
            //console.log(num);
            $('#startdate').val(getDate(response.data.data.startdate));//'2018-09-01');
            $('#enddate').val(getDate(response.data.data.enddate));

            $('#yearid').val(response.data.data.yearid);
            $('#termForm').trigger('loading-overlay:hide');
        },
        error: function (error) {
            //alert('Error!  '+ error.responseJSON.data.msg);
            $('#res').append(error.responseText);
            //console.log(error);  
        }
    });
    
}

// Reset the input fields of the Form on the Modal
// Unhide the Register btn
// Hide the update button
// Set all fields to null
function resetTermsModal()
{
    $('#termid').val(null);
    $('#term').val(null);
    $('#startdate').val(null);
    $('#enddate').val(null);
    $('#yearid').val(null);
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

// Update the Year By its id
// Get the field to update from the input field
function updateTerm(yearid)
{
     
        if($('#termsForm').valid()) // Test if all Form Fields are validated
        {
            $.ajax({
                type: "post",
                url: "/adminhome/terms/updateterm",
                data: { term_id: $('#termid').val(),                        
                        term: $('#term').val(), 
                        start_date: $('#startdate').val(),
                        end_date: $('#enddate').val()
                    },
                dataType: "json",
                success: function (response, status, code) {
                    var tableid = $('#term').val();
                    $('#termid').val(null);
                    $('#term').val(null);
                    $('#startdate').val(null);
                    $('#enddate').val(null);
                    $.magnificPopup.close();
                    resetTermsModal();
                    
                    tableid = tableid.substring((tableid.length - 4), tableid.length);
                    tableid = '#'+tableid;
                    console.log(tableid);
                    $('#yearid').val(null);
                    getTerms(yearid, tableid);
                    //console.log(response.data.msg);
                    notifySuccess(response.data.msg);
                    

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

function getTerms(yearid, tableid)
{
    $.ajax({
        type: "post",
        url: "/adminhome/terms/gettermsbyyear",
        data: {year_id: yearid},            
        dataType: "json",
        success: function (response, status, code) {
            // First destroy the DataTable Before creating a new one
            $(tableid+'Table').DataTable().destroy();
            
             // Create a new dataTable and assign it to a variable t
             var t = $(tableid+'Table').DataTable({
                data: JSON.parse(response.data),
                columns: [
                    { data: null },
                    { data: 'term' },
                    { data: 'startdate', render: function (d) { return displayDate(d);} },
                    { data: 'enddate', render: function (d) { return displayDate(d);} },
                    { data: 'termid' }                       
                ],
                columnDefs: [ {
                    targets: 0,
                    order: [[ 1, 'asc' ]]
                  } ],
                
                columnDefs: [ {
                    targets: 4,
                    data: 'termid',
                    className: 'actions-hover actions-fade',
                    render: function ( data) {
                                    return '<a class="modal-with-zoom-anim ws-normal context-menu pointer" href="#modalAnim" onclick="fetchTerm('+ data +');  return false;">'+ 
                                    '<i class="fas fa-pencil-alt"></i>Edit</a>';
                                }
                  } ],                 
                  searching: false,
                  paging: false,
                  info: false
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