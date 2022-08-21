/*
Name: 			setterm.js
Written by: 	KABUYE HASHIM MUNIIRU
ORMS Version: 	1.0
Description:    Handle all the requests and behaviors of setterm.blade.php
*/

var theTable, aRow, grades;
$(document).ready(function () {
    // Initialise the ajax headers to have the CSRF laravel token
    $.ajaxSetup({
        headers: { 'X-CSRF-TOKEN':  $("meta[name='csrf-token']").attr('content')}
    }); // end ajax header initialisation

    $('#setTermBtn').click(function (e) { 
        e.preventDefault();
        if($('#nextTerm').val() != 'null')
        {
            var currentTerm = $('#currentTerm').val();
            var nextTerm = $('#nextTerm :selected').text();
            $.alert({
                title: 'Confirm Action',
                content:  'Are you sure you want to change current term from ' +  currentTerm + ' to ' + nextTerm,
                buttons: {
                    confirm: function (){
                        setCurrentTerm();
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
        else{
            warn($('#nextTerm'), 'Please select a term');
        }
        
    });

    $('#nextTerm').focus(function (e) { 
        e.preventDefault();
        $('#nextTerm').removeClass('error');
        $('#term-error').remove();
    });
    

    
    
     

    
});

// Function to append server side validations
function warn(element, warning)
{
    element.addClass('error');
    element.parent().after(
        '<label id="term-error" class="error" for="sectionName">' + warning + '</label>');
}

function setCurrentTerm()
{
    $.ajax({
        type: "post",
        url: "/adminhome/terms/setcurrentterm",
        data: { term_id: parseInt($('#nextTerm').val())},
        dataType: "json",
        success: function (response, status, code) {
             console.log(response);
             notifySuccess(response.data.msg);
             $('#setTermFormBody').empty();
             $('#setTermFormBody').append('<p class="display-3">Term Changed Successfully</p>');
             $('#setTermBtn').addClass('hidden');
        },
        error: function (error) {
            alert('Error '+ error);
            console.log(error);
            notifyFail(error.responseJSON.msg);
              
        }
    });
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