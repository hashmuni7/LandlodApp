/*
Name: 			pupils.js
Written by: 	KABUYE HASHIM MUNIIRU
ORMS Version: 	1.0
Description:    Handle all the requests and behaviors of teachers.blade.php
*/
var auth;
$(document).ready(function () {
    // Initialise the ajax headers to have the CSRF laravel token
    $.ajaxSetup({
        headers: { 'X-CSRF-TOKEN':  $("meta[name='csrf-token']").attr('content')}
    }); 

    // Initialise datatable
    dtInit();

    $.ajax({
        type: "post",
        url: "/adminhome/getauth",       
        dataType: "json",
        data: {data:''},
        success: function (response, status, code) {
          console.log(response.data.data);
           auth = response.data.data;
            
        },
        error: function (error) {
            $('#res').append(error.responseText);
              
        }
    });
    
    // Function to handle the creation of a new Teacher
    $('#addUserBtn').click(function (e) { 
        if(e.detail !== 2)
        {                       
            addUser();
        }
       
    });// end click event

    $('#usersTable').on('click', '.edit-btn', function (e) {
        e.preventDefault();
        fetchUser($(this).attr('data-id'));
    });

    $('#usersTable').on('click', '.view-btn', function (e) {
        e.preventDefault();
        fetchUser($(this).attr('data-id'));

        
        $('.user').prop('disabled', true);
        $('#updateUserBtn').addClass('hidden');
    });

    
    

    // Click event for the update pupil details function
    $('#updateUserBtn').click(function (e) {
        if(e.detail !== 2)
        {                       
            updateUser();
        }         
        
    });// end click event

    /*
	Modal Dismiss
	*/
	$(document).on('click', '.modal-dismiss', function (e) {
		e.preventDefault();
        resetUsersModal();

        $.magnificPopup.close();
    });

    $('#usersTable').on('click', '.del-btn', function (e) {
        e.preventDefault();
        var name = $(this).closest('tr').find('td:eq(1)').text();
        
        askDeleteUser($(this).attr('data-id'), name);
    });

    $('#printUsers').click(function (e) {
        
        if(e.detail !== 2)
        {                       
            printUsers();
        }         
        
    });// end click event
    
});

function printUsers()
{
    var tbl = $('#usersTable').clone();
    tbl.find('tr th:nth-child(6), tr td:nth-child(6)').remove();

    
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
    doc.text('USERS', center, 32, 'center');
    doc.setLineWidth(1);
    doc.line(15, 36, 195, 36);
    doc.setFontSize(11);
    doc.setTextColor(100);

    
    
    doc.save('users.pdf');
}

function dtInit()
{
    var t = $('#usersTable').DataTable({
        lengthMenu: [[  -1], [  'All']]
    });
    t.on( 'order.dt search.dt', function () {
        t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();    
    
}

function addUser()
{
     

    //console.log(subjects);
    if($('#addUsersForm').valid()) // Test if all Form Fields are validated
        {
            
            // ajax request to add a new section to the database
            $.ajax({
                type: "post",
                url: "/adminhome/users/adduser", 
                data: { 
                    first_name: $('#firstname').val(),
                    last_name: $('#lastname').val(),
                    user_name: $('#username').val(),
                    pass_word: $('#password').val(),
                    role: $('#roles').val(),                                        
                },
                dataType: "json",
                success: function (response, status, code) {
                     
                                        
                    $.magnificPopup.close();
                    resetUsersModal();
                    notifySuccess(response.data.msg);
                    getUsers();
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



// Reset the input fields of the Form on the Modal
// Unhide the Register btn
// Hide the update button
// Set all fields to null
function resetUsersModal()
{
    $('#addUserBtn').removeClass('hidden');
    $('#updateUserBtn').addClass('hidden');
    $('#heading').html('Register a New User');
    document.getElementById('addUsersForm').reset();
    // $('#pupilid').val(null);
    // $('#firstname').val(null);
    // $('#lastname').val(null);

    // $('#othernames').val(null);
    // $('#yearOfEntry').val(null);
    // $('#schoolPayCode').val(null);
    // $('#streams').val(null);
    // $('#houses').val(null);
    // $('#fees').val(null);
    // //$('#pupilSex input:checked').val();
    // $('#dob').val(null);

    
    $('#userStatus').addClass('hidden');
    $('.user').prop('disabled', false);
       
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
function fetchUser(userid)
{
    $('#usersForm').trigger('loading-overlay:show');
    $('#addUserBtn').addClass('hidden');// Hide the register Button and show Update Btn
    $('#updateUserBtn').removeClass('hidden');
    $('#userStatus').removeClass('hidden');
    $('#heading').html('Update User Details');
    

    userid = parseInt(userid);

    // Pop up the Modal
    $.magnificPopup.open({
        items: {
            src: '#modalAnim'
        },
        type: 'inline',
        callbacks: {
            close: function(){                
                resetUsersModal();               
            }
          }
    });

    
    $.ajax({
        type: "post",
        url: "/adminhome/users/getuserbyid",
        data: { id: userid},
        dataType: "json",
        success: function (response, status, code) {
            console.log(response);
                                                
            
            $('#userid').val(response.data.data.id);
            $('#firstname').val(response.data.data.firstname);
            $('#lastname').val(response.data.data.lastname);

            $('#username').val(response.data.data.username);                       
            $('#password').val(response.data.data.question);
            $('#roles').val(response.data.data.role);
                        
            response.data.data.status ? $('#statusActive').prop('checked', true) : $('#statusInactive').prop('checked', true);                                          
            
             
            $('#usersForm').trigger('loading-overlay:hide');
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



function updateUser()
{
     

    //console.log(subjects);
    if($('#addUsersForm').valid()) // Test if all Form Fields are validated
        {
            
            // ajax request to add a new section to the database
            $.ajax({
                type: "post",
                url: "/adminhome/users/updateuser", 
                data: {
                    user_id: $('#userid').val(), 
                    first_name: $('#firstname').val(),
                    last_name: $('#lastname').val(),
                    user_name: $('#username').val(),
                    pass_word: $('#password').val(),
                    role: $('#roles').val(),
                    status: parseInt($('#userStatus input:checked').val())                   
                },
                dataType: "json",
                success: function (response, status, code) {
                     console.log(response);
                                        
                    $.magnificPopup.close();
                    resetUsersModal();
                    notifySuccess(response.data.msg);
                    getUsers();
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


function getUsers()
{
    $.ajax({
        type: "post",
        url: "/adminhome/users/getusers",
        data: {},            
        dataType: "json",
        success: function (response, status, code) {
            // First destroy the DataTable Before creating a new one
            $('#usersTable').DataTable().destroy();
            
             // Create a new dataTable and assign it to a variable t
             var t = $("#usersTable").DataTable({
                data: JSON.parse(response.data),
                columns: [
                    { data: null },
                    { data: 'firstname', render: function (d, type, all) { return all.firstname + ' ' + all.lastname;} },
                    { data: 'username'},
                    { data: 'role', render: function (d, type, all) { 
                        if(d == 1) return "Administrator";
                        if(d == 2) return "DOS";
                        if(d == 3) return "Bursar";                        
                        } 
                    },
                    { data: 'status', render: function (d) { return d ? 'Active' : 'Inactive';}},
                    { data: 'id'}                                       
                ],
                columnDefs: [ {
                    targets: 0,
                    order: [[ 1, 'asc' ]]
                  } ],
                columnDefs: [ {
                    targets: 5,
                    data: 'id',
                    className: 'actions-hover actions-fade',
                    render: function ( data) {

                        if(data == 1 || data == auth.id)
                        {
                            return '<a class="modal-with-zoom-anim ws-normal context-menu pointer view-btn" href="#modalAnim" data-id="'+ data + '">'+ 
                                    '<i class="fas fa-pencil-alt"></i>View</a>';
                        }
                        else{
                            return '<a class="modal-with-zoom-anim ws-normal context-menu pointer edit-btn" href="#modalAnim" data-id="'+ data + '">'+ 
                                    '<i class="fas fa-pencil-alt"></i>Edit</a>' + 
                                    ' <a class="ws-normal context-menu pointer del-btn" data-id="'+ data + '"><i class="fas fa-trash"></i>Delete</a>';
                        }
                                    
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

            //dtInit();
            
            
        },
        error: function (error) {
            alert("No Response From Server");
        }
    }); // end ajax call
}

// Pop up a confirm dialog to delete
function askDeleteUser(userid, name)
{
    
    userid = parseInt(userid);
    $.alert({
        title: 'Are You Sure You Want to Delete',
        content:  name,
        buttons: {
            confirm: function (){
                deleteUser(userid);
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

// Delete pupil by the id
function deleteUser(userid)
{
    $.ajax({
        type: "post",
        url: "/adminhome/users/deleteuser",
        data: { user_id: userid},
        dataType: "json",
        success: function (response, status, code) {
           getUsers();
            notifySuccess(response.data.msg);
        },
        error: function (error) {
            getUsers();
            console.log(error);
            //alert('Error '+ error);
            $.alert({
                title: 'Sorry!',
                content:  error.responseJSON.data.msg,
                buttons: {
                    ok: function (){
                        
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
    });
    
}