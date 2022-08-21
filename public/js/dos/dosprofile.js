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

    

    $.ajax({
        type: "post",
        url: "/doshome/getauth",       
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
    
    // Function to handle the edit
    $('#edit').click(function (e) { 
        
        $('#updateUserBtn').removeClass('hidden');
        $('#cancelAction').removeClass('hidden');
        $('.user').prop('disabled', false);
        $('#edit').addClass('hidden');
    });// end click event

    $('#cancelAction').click(function (e) { 
        resetUsersForm();
        
    });// end click event

   

    

    $('.user').prop('disabled', true);
    //$('#updateUserBtn').addClass('hidden');
    

    // Click event for the update pupil details function
    $('#updateUserBtn').click(function (e) {         
        updateUser();
    });// end click event
    

    
    
});







// Reset the input fields of the Form on the Modal
// Unhide the Register btn
// Hide the update button
// Set all fields to null
function resetUsersForm()
{
    
    
    $('#edit').removeClass('hidden');
    $('#updateUserBtn').addClass('hidden');
    $('#cancelAction').addClass('hidden');
    //document.getElementById('addUsersForm').reset();          
    $('.user').prop('disabled', true);
       
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








function updateUser()
{
    

    //console.log(subjects);
    if($('#addUsersForm').valid()) // Test if all Form Fields are validated
        {
            
            // ajax request to add a new section to the database
            $.ajax({
                type: "post",
                url: "/doshome/adminprofile/updateprofile", 
                data: {                    
                    first_name: $('#firstname').val(),
                    last_name: $('#lastname').val(),
                    user_name: $('#username').val(),
                    pass_word: $('#password').val()                   
                },
                dataType: "json",
                success: function (response, status, code) {
                     console.log(response);
                                        
                    $.magnificPopup.close();
                    resetUsersForm();
                    notifySuccess(response.data.msg);
                   
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


