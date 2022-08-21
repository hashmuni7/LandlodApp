/*
Name: 			teachers.js
Written by: 	KABUYE HASHIM MUNIIRU
ORMS Version: 	1.0
Description:    Handle all the requests and behaviors of teachers.blade.php
*/

$(document).ready(function () {
    // Initialise the ajax headers to have the CSRF laravel token
    $.ajaxSetup({
        headers: { 'X-CSRF-TOKEN':  $("meta[name='csrf-token']").attr('content')}
    }); // end ajax header initialisation

    // Create a dataTable
    $('#teachersTable').DataTable({
        lengthMenu: [[  -1], [  'All']]
    });

    // Function to handle the creation of a new Teacher
    $('#addTeacherBtn').click(function (e) {
        if(e.detail !== 2)
        {                    
            addTeacher();
        }     
    });// end click event

    $('#teachersTable').on('click', '.edit-btn', function (e) {
        e.preventDefault();
        fetchTeacher($(this).attr('data-id'));
    });

    // Click event for the update amount function
    $('#updateTeacherBtn').click(function (e) { 
        if(e.detail !== 2)
        {                    
            updateTeacher();
        }        
        
    });// end click event

    $('#teachersTable').on('click', '.del-btn', function (e) {
        e.preventDefault();
        var name = $(this).closest('tr').find('td:eq(1)').text();
        
        askDeleteTeacher($(this).attr('data-id'), name);
    });

    /*
	Modal Dismiss
	*/
	$(document).on('click', '.modal-dismiss', function (e) {
		e.preventDefault();
        resetTeachersModal();
        $.magnificPopup.close();
    });
    
    // Click event to put focus on the input field
    // This needs the setTimeOut function to allow the Modal to load
    // on to the DOM
    $('#addToTable').click(function (e) { 
        setTimeout(function () { 
            $('#firstname').focus();
         }, 150);        
    });// end click event 

    $('#printTeachers').click(function (e) {
        
        if(e.detail !== 2)
        {                    
            printTeachers();
        }         
        
    });// end click event

    $('#printTeacher').click(function (e) {
        
        if(e.detail !== 2)
        {                    
            printATeacher();
        }         
        
    });// end click event


});

function printTeachers()
{
    var tbl = $('#teachersTable').clone();
    tbl.find('tr th:nth-child(5), tr td:nth-child(5)').remove();

    
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
    doc.text('TEACHERS', 84, 32);
    doc.setDrawColor(headColor[0], headColor[1], headColor[2]);
    doc.setLineWidth(1);
    doc.line(15, 36, 195, 36);
    doc.setFontSize(11);
    doc.setTextColor(100);

    
    
    doc.save('teachers_'+ displayDate(new Date())  +'.pdf');
}

function printATeacher()
{

    //Get the element to print
            var element = document.getElementById('printableTeacher');

            // Define optional configuration
            var options = {
            filename: 'teacher.pdf',
            
            };

            // Create instance of html2pdf class
            // html2pdf().from().toPdf().get('pdf').then(function(pdf){

            // })
            var exporter = new html2pdf(element, {
                margin: [40, 37],
                filename: 'teacher.pdf'
            });
            exporter.getPdf(false).then((pdf) => {
                var pageSize = pdf.internal.pageSize;
                var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
                 var center = pageWidth / 2;
                //console.log('doing something before downloading pdf file');
                pdf.setTextColor(headColor[0], headColor[1], headColor[2]);
                pdf.setFontSize(headFontSize);
                pdf.text(schoolName, center, schoolNameY, 'center');               
                pdf.text('TEACHER', center, 32, 'center');
                pdf.setDrawColor(headColor[0], headColor[1], headColor[2]);
                pdf.setLineWidth(1);
                pdf.line(15, 36, 195, 36);
                pdf.setFontSize(11);
                pdf.setTextColor(100);
                pdf.save('teacher_'+ displayDate(new Date())  +'.pdf');
              });
    
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

function addTeacher()
{
    var subjects = [];
    $('.subjects input:checked').each(
        function(){
            subjects.push(parseInt($(this).val()));
        }
    ); 

    //console.log(subjects);
    if($('#addTeachersForm').valid()) // Test if all Form Fields are validated
        {
            
            // ajax request to add a new section to the database
            $.ajax({
                type: "post",
                url: "/adminhome/teachers/addnewteacher", 
                data: { 
                    first_name: $('#firstname').val(),
                    last_name: $('#lastname').val(),
                    subjects: subjects
                },
                dataType: "json",
                success: function (response, status, code) {
                     $('#firstname').val(null);
                     $('#lastname').val(null);
                     $('.subjects input').prop('checked', false);                    
                    $.magnificPopup.close();
                    resetTeachersModal();
                    notifySuccess(response.data.msg);
                    getTeachers();
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

function getTeachers()
{
    $.ajax({
        type: "post",
        url: "/adminhome/teachers",
        data: {},            
        dataType: "json",
        success: function (response, status, code) {
            // First destroy the DataTable Before creating a new one
            $('#teachersTable').DataTable().destroy();
            
             // Create a new dataTable and assign it to a variable t
             var t = $("#teachersTable").DataTable({
                data: JSON.parse(response.data),
                columns: [
                    { data: null },
                    { data: 'firstname', render: function (d, type, all) { return all.firstname + ' ' + all.lastname;} },
                    { data: 'num'},
                    { data: 'status', render: function (d) { return d ? 'Active' : 'Inactive';} },
                    { data: 'teacherid'}                       
                ],
                columnDefs: [ {
                    targets: 0,
                    order: [[ 1, 'asc' ]]
                  } ],
                columnDefs: [ {
                    targets: 4,
                    data: 'teacherid',
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

// Reset the input fields of the Form on the Modal
// Unhide the Register btn
// Hide the update button
// Set all fields to null
function resetTeachersModal()
{
    $('#addTeacherBtn').show();
    $('#updateTeacherBtn').addClass('hidden');
    $('#printATeacherPanel').addClass('hidden');
    $('#heading').html('Register a New Teacher');
    $('#teacherid').val(null);
    $('#firstname').val(null);
    $('#lastname').val(null);

    $('.status input').prop('checked', false);
    $('#teacher-status').addClass('hidden');
    $('.subjects input').prop('checked', false);     
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

// Fetch teacher details by the teacherid
function fetchTeacher(teacherid)
{
    $('#teachersForm').trigger('loading-overlay:show');
    $('#addTeacherBtn').hide();// Hide the register Button and show Update Btn
    $('#updateTeacherBtn').removeClass('hidden');
    $('#teacher-status').removeClass('hidden');
    $('#heading').html('Update Teacher Details');
    $('#printATeacherPanel').removeClass('hidden');
    

    teacherid = parseInt(teacherid);

    // Pop up the Modal
    $.magnificPopup.open({
        items: {
            src: '#modalAnim'
        },
        type: 'inline',
        callbacks: {
            close: function(){                
                resetTeachersModal();               
            }
          }
    });

    
    $.ajax({
        type: "post",
        url: "/adminhome/teachers/getteacherbyid",
        data: { teacher_id: teacherid},
        dataType: "json",
        success: function (response, status, code) {                        
            $('#teacherid').val(response.data.data[0].aTeacher.teacherid);
            $('#firstname').val(response.data.data[0].aTeacher.firstname);
            $('#lastname').val(response.data.data[0].aTeacher.lastname);
            if((response.data.data[0].aTeacher.status) == 1)
            {
                $('#statusActive').prop('checked', true);
            }
            else
            {
                $('#statusInactive').prop('checked', true);
            }
                        
            $.each(response.data.data[0].subjects, function(key, val){
                $('.subjects input[value='+ val.subjectid +']').prop('checked', true);
               
            });

            
            $('#teachersForm').trigger('loading-overlay:hide');
            //openModal();
        },
        error: function (error) {
            //alert('Error!  '+ error.responseJSON.data.msg);
            $('#res').append(error.responseText);
            console.log(error);  
        }
    });

    
    
}

// Update the Teacher Details By its id
// Get the field to update from the input field
function updateTeacher()
{
    // An array to hold the subjects taught by the teacher
    var subjects = [];
    $('.subjects input:checked').each(
        function(){
            subjects.push(parseInt($(this).val()));
        }
    );
    
    // get the selected status of the teacher
    var status = parseInt($('#teacher-status input:checked').val());
        if($('#addTeachersForm').valid()) // Test if all Form Fields are validated
        {
            $.ajax({
                type: "post",
                url: "/adminhome/teachers/updateteacher",
                data: { teacher_id: $('#teacherid').val(),
                        first_name: $('#firstname').val(), 
                        last_name: $('#lastname').val(),
                        status: status,
                        subjects: subjects
                    },
                dataType: "json",
                success: function (response, status, code) {
                    $.magnificPopup.close();
                                      
                    
                    resetTeachersModal();
                    
                    getTeachers();
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


// Pop up a confirm dialog to delete a teacher
function askDeleteTeacher(teacherid, name)
{
    
    teacherid = parseInt(teacherid);
    $.alert({
        title: 'Are You Sure You Want to Delete',
        content:  name,
        buttons: {
            confirm: function (){
                deleteTeacher(teacherid)
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

// Delete subject by its subjectid
function deleteTeacher(teacherid)
{
    $.ajax({
        type: "post",
        url: "/adminhome/teachers/deleteteacher",
        data: { teacher_id: teacherid},
        dataType: "json",
        success: function (response, status, code) {
            getTeachers();
            notifySuccess(response.data.msg);
        },
        error: function (error) {
            alert('Error '+ error);
              
        }
    });
    
}