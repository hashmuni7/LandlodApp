/*
Name: 			academicyear.js
Written by: 	KABUYE HASHIM MUNIIRU
ORMS Version: 	1.0
*/

$(document).ready(function () {
    // Initialise the ajax headers to have the CSRF laravel token
    $.ajaxSetup({
        headers: { 'X-CSRF-TOKEN':  $("meta[name='csrf-token']").attr('content')}
    }); // end ajax header initialisation

    // Create a dataTable
    $('#academicYearsTable').DataTable();
    
    
    // Function to handle the creation of a new Years
    $('#addYearBtn').click(function (e) { 
        if(e.detail !== 2)
        {
            if($('#addYearForm').valid()) // Test if all Form Fields are validated
            {
                
                // ajax request to add a new section to the database
                $.ajax({
                    type: "post",
                    url: "/adminhome/newacademicyear/addyear", 
                    data: { 
                        year: $('#year').val(),
                        start_date: $('#startdate').val(),
                        end_date: $('#enddate').val()
                    },
                    dataType: "json",
                    success: function (response, status, code) {
                         $('#year').val(null);
                         $('#startdate').val(null);
                         $('#enddate').val(null);
                        $.magnificPopup.close();
                        resetAcademicYearsModal();
                        notifySuccess(response.data.msg);
                        getYears();
                    },
                    error: function (error) {
                        if(error.status == 400) // if there is a client error
                        {
                            $.each(error.responseJSON.errors, function(key, val){
                                console.log("Key: " + key + "| value: " + val);
                                warnByName($("input[name='" + key + "']"), val);
                            });
                            console.log(error.responseJSON.errors);
                            notifyFail('Academic could not be Added');
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
        
        
    });// end click event

    // Click event for the update year function
    $('#updateYearBtn').click(function (e) { 
        if(e.detail !== 2)
        {
            updateYear($('#yearid').val());
        }        
        
    });// end click event

    // Click event to put focus on the input field
    // This needs the setTimeOut function to allow the Modal to load
    // on to the DOM
    $('#addToTable').click(function (e) { 
        setTimeout(function () { 
            $('#year').focus();
         }, 150);        
    });// end click event

    $('#academicYearsTable').on('click', '.edit-btn', function (e) {
        e.preventDefault();
       
       
            fetchYear($(this).attr('data-id'));
      
               
    });

    $('#academicYearsTable').on('click', '.del-btn', function (e) {
        e.preventDefault();
        askDeleteYear($(this).attr('data-id'));       
    });

    

    /*
	Modal Dismiss
	*/
	$(document).on('click', '.modal-dismiss', function (e) {
        e.preventDefault();
        resetAcademicYearsModal();
        
        $.magnificPopup.close();
    });

}); // end the document ready function

function hello()
{
    alert('Hello');
}

function getYears()
{
    $.ajax({
        type: "post",
        url: "/adminhome/years",
        data: {},            
        dataType: "json",
        success: function (response, status, code) {
            // First destroy the DataTable Before creating a new one
            $('#academicYearsTable').DataTable().destroy();
            
             // Create a new dataTable and assign it to a variable t
             var t = $("#academicYearsTable").DataTable({
                data: JSON.parse(response.data),
                columns: [
                    { data: null },
                    { data: 'year' },
                    { data: 'startdate', render: function (d) { return $.datepicker.formatDate('D, dd M yy', new Date(d));} },
                    { data: 'enddate', render: function (d) { return $.datepicker.formatDate('D, dd M yy', new Date(d));} },
                    { data: 'yearid' }                       
                ],
                columnDefs: [ {
                    targets: 0,
                    order: [[ 1, 'asc' ]]
                  } ],
                columnDefs: [ {
                    targets: 4,
                    data: 'yearid',
                    className: 'actions-hover actions-fade',
                    render: function ( data) {
                                    return '<a class="modal-with-zoom-anim ws-normal context-menu pointer edit-btn" href="#modalAnim" data-id="'+ data + '">'+ 
                                    '<i class="fas fa-pencil-alt"></i>Edit</a>' + 
                                    ' <a class="ws-normal context-menu pointer del-btn "   data-id="'+ data + '"><i class="fas fa-trash"></i>Delete</a>';
                                }
                  } ],  
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

// Fetch yaar details by the yearid
function fetchYear(yearid)
{
    $('#academicYearForm').trigger('loading-overlay:show');
   
    $('#heading').html('Update Academic Year Details');

    $('#addYearBtn').hide();// Hide the register Button and show Update Btn
    $('#updateYearBtn').removeClass('hidden');
    // Pop up the Modal
    $.magnificPopup.open({
        items: {
            src: '#modalAnim'
        },
        type: 'inline',
        callbacks: {
            close: function(){                
                resetAcademicYearsModal();               
            }
          }
    });
    
    $.ajax({
        type: "post",
        url: "/adminhome/newacademicyear/getyearbyid",
        data: { year_id: yearid},
        dataType: "json",
        success: function (response, status, code) {
            //console.log($.datepicker.formatDate('yy-mm-dd', new Date(response.data.data.startdate)));
            
            $('#yearid').val(response.data.data.yearid);
            $('#year').val(response.data.data.year);
            //console.log(num);
            $('#startdate').val(String($.datepicker.formatDate('yy-mm-dd', new Date(response.data.data.startdate))));//'2018-09-01');
            $('#enddate').val(String($.datepicker.formatDate('yy-mm-dd', new Date(response.data.data.enddate))));
            $('#academicYearForm').trigger('loading-overlay:hide');
        },
        error: function (error) {
            //alert('Error!  '+ error.responseJSON.data.msg);
            $('#res').append(error.responseText);
            console.log(error);  
        }
    });
    
}




// Reset the input fields of the Form on the Modal
// Unhide the Register btn
// Hide the update button
// Set all fields to null
function resetAcademicYearsModal()
{
    $('#addYearBtn').show();
    $('#updateYearBtn').addClass('hidden');
    $('#yearid').val(null);
    $('#year').val(null);
    $('#startdate').val(null);
    $('#enddate').val(null);
    $('#heading').html('Register A New Academic Year');
}

// Update the Year By its id
// Get the field to update from the input field
function updateYear(yearid)
{
     
        if($('#addYearForm').valid()) // Test if all Form Fields are validated
        {
            $.ajax({
                type: "post",
                url: "/adminhome/newacademicyear/updateyear",
                data: { year_id: $('#yearid').val(),
                        year: $('#year').val(), 
                        start_date: $('#startdate').val(),
                        end_date: $('#enddate').val()
                    },
                dataType: "json",
                success: function (response, status, code) {
                    $('#yearid').val(null);
                    $('#year').val(null);
                    $('#startdate').val(null);
                    $('#enddate').val(null);
                    $.magnificPopup.close();
                    resetAcademicYearsModal();
                    
                    getYears();
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


// Pop up a confirm dialog to delete a year
function askDeleteYear(yearid)
{
    $.ajax({
        type: "post",
        url: "/adminhome/newacademicyear/getyearbyid",
        data: { year_id: yearid},
        dataType: "json",
        success: function (response, status, code) {
             $.alert({
                title: 'Are You Sure You Want to Delete Year',
                content:  response.data.data.year,
                buttons: {
                    confirm: function (){
                        deleteYear(yearid)
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
        },
        error: function (error) { 
        }
    });

    
}


// Delete a year by its yearid
function deleteYear(yearid)
{
    $.ajax({
        type: "post",
        url: "/adminhome/newacademicyear/deleteyear",
        data: { year_id: yearid},
        dataType: "json",
        success: function (response, status, code) {
            getYears();
            notifySuccess(response.data.msg);
        },
        error: function (error) {
            //alert('Error '+ error);
            notifyFail(error.responseJSON.data.msg);  
        }
    });
    
}