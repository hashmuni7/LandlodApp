/*
Name: 			subjects.js
Written by: 	KABUYE HASHIM MUNIIRU
ORMS Version: 	1.0
Description:    Handle all the requests and behaviors of subjects.blade.php
*/

$(document).ready(function () {
    // Initialise the ajax headers to have the CSRF laravel token
    $.ajaxSetup({
        headers: { 'X-CSRF-TOKEN':  $("meta[name='csrf-token']").attr('content')}
    }); // end ajax header initialisation

    // Create a dataTable
    $('#subjectsTable').DataTable({
        lengthMenu: [[  -1], [  'All']]
    });

    // Function to handle the creation of a new Amount
    $('#addSubjectBtn').click(function (e) { 
        if(e.detail !== 2)
        {                    
            addSubject();
        }
        
    });// end click event

    $('#subjectsTable').on('click', '.edit-btn', function (e) {
        e.preventDefault();
        fetchSubject($(this).attr('data-id'));
    });

    // Click event for the update amount function
    $('#updateSubjectBtn').click(function (e) { 
        if(e.detail !== 2)
        {                    
            updateSubject();
        }        
        
    });// end click event

    $('#subjectsTable').on('click', '.del-btn', function (e) {
        e.preventDefault();
        askDeleteAmount($(this).attr('data-id'));
    });

    /*
	Modal Dismiss
	*/
	$(document).on('click', '.modal-dismiss', function (e) {
		e.preventDefault();
        resetSubjectsModal();
        $.magnificPopup.close();
    });
    
    // Click event to put focus on the input field
    // This needs the setTimeOut function to allow the Modal to load
    // on to the DOM
    $('#addToTable').click(function (e) { 
        setTimeout(function () { 
            $('#subject').focus();
         }, 150);        
    });// end click event

    $('#printSubjects').click(function (e) {
        
        if(e.detail !== 2)
        {                    
            printSubjects();
        }         
        
    });// end click event
});

function printSubjects()
{
    var tbl = $('#subjectsTable').clone();
    tbl.find('tr th:nth-child(4), tr td:nth-child(4)').remove();

    
    var doc = new jsPDF();
    // It can parse html:
    doc.autoTable({
        html: tbl.get(0),
        startY: 40,
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
    doc.text('SUBJECTS', center, 32, 'center');
    doc.setDrawColor(headColor[0], headColor[1], headColor[2]);
    doc.setLineWidth(1);
    doc.line(15, 36, 195, 36);
    doc.setFontSize(11);
    doc.setTextColor(100);

    
    
    doc.save('subjects.pdf');
}

function addSubject()
{
    if($('#addSubjectsForm').valid()) // Test if all Form Fields are validated
        {
            
            // ajax request to add a new section to the database
            $.ajax({
                type: "post",
                url: "/adminhome/subjects/addnewsubject", 
                data: { 
                    subject: $('#subject').val(),
                    initials: $('#initials').val()
                },
                dataType: "json",
                success: function (response, status, code) {
                     $('#subject').val(null);
                     $('#initials').val(null);                     
                    $.magnificPopup.close();
                    resetSubjectsModal();
                    notifySuccess(response.data.msg);
                    getSubjects();
                },
                error: function (error) {
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

// Reset the input fields of the Form on the Modal
// Unhide the Register btn
// Hide the update button
// Set all fields to null
function resetSubjectsModal()
{
    $('#addSubjectBtn').show();
    $('#updateSubjectBtn').addClass('hidden');
    $('#heading').html('Register a New Subject');
    $('#subjectid').val(null);
    $('#subject').val(null);
    $('#initials').val(null);    
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

function getSubjects()
{
    $.ajax({
        type: "post",
        url: "/adminhome/subjects",
        data: {},            
        dataType: "json",
        success: function (response, status, code) {
            // First destroy the DataTable Before creating a new one
            $('#subjectsTable').DataTable().destroy();
            
             // Create a new dataTable and assign it to a variable t
             var t = $("#subjectsTable").DataTable({
                data: JSON.parse(response.data),
                columns: [
                    { data: null },
                    { data: 'subject' },
                    { data: 'initials'},
                    { data: 'subjectid' }                       
                ],
                columnDefs: [ {
                    targets: 0,
                    order: [[ 1, 'asc' ]]
                  } ],
                columnDefs: [ {
                    targets: 3,
                    data: 'subjectid',
                    className: 'actions-hover actions-fade',
                    render: function ( data) {
                                    return '<a class="modal-with-zoom-anim ws-normal context-menu pointer edit-btn" href="#modalAnim" data-id="'+ data + '">'+ 
                                    '<i class="fas fa-pencil-alt"></i>Edit</a>' + 
                                    ' <a class="ws-normal context-menu pointer del-btn" data-id="'+ data + '"><i class="fas fa-trash"></i>Delete</a>';
                                }
                  } ],                  
                    lengthMenu: [[  -1], [  'All']]                  
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

// Fetch subject details by the subjectid
function fetchSubject(subjectid)
{
    $('#subjectForm').trigger('loading-overlay:show');
    $('#addSubjectBtn').hide();// Hide the register Button and show Update Btn
    $('#updateSubjectBtn').removeClass('hidden');
    $('#heading').html('Update Subject Details');
    

    subjectid = parseInt(subjectid);

    // Pop up the Modal
    $.magnificPopup.open({
        items: {
            src: '#modalAnim'
        },
        type: 'inline',
        callbacks: {
            close: function(){                
                resetSubjectsModal();               
            }
          }
    });

    
    $.ajax({
        type: "post",
        url: "/adminhome/subjects/getsubjectbyid",
        data: { subject_id: subjectid},
        dataType: "json",
        success: function (response, status, code) {                        
            $('#subjectid').val(response.data.data.subjectid);
            $('#subject').val(response.data.data.subject);
            //console.log(num);
            $('#initials').val(response.data.data.initials);
            $('#subjectForm').trigger('loading-overlay:hide');
            //openModal();
        },
        error: function (error) {
            //alert('Error!  '+ error.responseJSON.data.msg);
            $('#res').append(error.responseText);
            console.log(error);  
        }
    });

    
    
}

// Update the Subject Details By its id
// Get the field to update from the input field
function updateSubject()
{
     
        if($('#addSubjectsForm').valid()) // Test if all Form Fields are validated
        {
            $.ajax({
                type: "post",
                url: "/adminhome/subjects/updatesubject",
                data: { subject_id: $('#subjectid').val(),
                        subject: $('#subject').val(), 
                        initials: $('#initials').val()
                    },
                dataType: "json",
                success: function (response, status, code) {
                    $.magnificPopup.close();
                    $('#subjectid').val(null);
                    $('#subject').val(null);
                    $('#initials').val(null);                  
                    
                    resetSubjectsModal();
                    
                    getSubjects();
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

// Pop up a confirm dialog to delete a subject
function askDeleteAmount(subjectid)
{
    subjectid = parseInt(subjectid);
    $.ajax({
        type: "post",
        url: "/adminhome/subjects/getsubjectbyid",
        data: { subject_id: subjectid},
        dataType: "json",
        success: function (response, status, code) {
             $.alert({
                title: 'Are You Sure You Want to Delete Subject',
                content:  response.data.data.subject,
                buttons: {
                    confirm: function (){
                        deleteSubject(subjectid)
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

// Delete subjct by its subjectid
function deleteSubject(subjectid)
{
    $.ajax({
        type: "post",
        url: "/adminhome/subjects/deletesubject",
        data: { subject_id: subjectid},
        dataType: "json",
        success: function (response, status, code) {
            getSubjects();
            notifySuccess(response.data.msg);
        },
        error: function (error) {
            //alert('Error '+ error);
            notifyFail(error.responseJSON.data.msg);  
        }
    });
    
}