/*
Name: 			feeattachment.js
Written by: 	KABUYE HASHIM MUNIIRU
ORMS Version: 	1.0
Description:    Handle all the requests and behaviors of feeattachment.blade.php
*/

var theTable, aRow, grades;
$(document).ready(function () {
    // Initialise the ajax headers to have the CSRF laravel token
    $.ajaxSetup({
        headers: { 'X-CSRF-TOKEN':  $("meta[name='csrf-token']").attr('content')}
    }); // end ajax header initialisation

    $('#pupilsTable').DataTable({lengthMenu: [[ -1], [ 'All']]});

    $('#accounts').change(function (e) {
        e.preventDefault();
        $('#attachFeeBtn').addClass('hidden');
        $('#pupilsTable').DataTable().clear().draw();
    });

    $('#amount').keydown(function (e) {
        
        $('#attachFeeBtn').addClass('hidden');
        $('#pupilsTable').DataTable().clear().draw();
    });
    

    

    $('#fetchPupilsBtn').click(function (e) { 
        e.preventDefault();
       
                    
            getPupilsForAFeeAttachment();
            
        
    });

    $('#attachFeeBtn').click(function (e) { 
        e.preventDefault();

        var pupils = [];
        $('#pupilsTable input:checked').each(
            function(){
                pupils.push(parseInt($(this).val()));
            }
        );

        if(pupils.length > 0)
        {
            var theAccount = $('#accounts :selected').text();
            var fee = $('#amount').val();

            $.alert({
                title: 'Confirm Action',
                content:  'A Fee of UGX ' + fee + ' will be attached to ' + pupils.length + ' Pupils to be paid to the ' + theAccount + ' Account for this Term.',
                buttons: {
                    confirm: function (){
                        attachAFeeToPupils();
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
            $.alert({
                title: 'Oops..',
                content: 'Please select pupils first!',
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

    
     

    
});

function hideFunctions()
{
    $('#streamPanel').addClass('hidden');
        $('#termPanel').addClass('hidden');
        $('#fetchPupilsBtn').addClass('hidden');
        $("#transferPupilsBtn").addClass('hidden');
        $('#pupilsTable').DataTable().clear().draw();
}



function getPupilsForAFeeAttachment()
{
    if($('#attachFeeForm').valid())
    {
        $.ajax({
            type: "post",
            url: "/adminhome/finance/localaccounts/getpupilsforafeeattachement",
            data: { account: parseInt($('#accounts').val())},
            dataType: "json",
            success: function (response, status, code) {
                 //streamList = JSON.parse(response.data);
                 var tableData = JSON.stringify(response.data.data);
                 tableData = JSON.parse(tableData);
                console.log(response);
    
                // First destroy the DataTable Before creating a new one
                $('#pupilsTable').DataTable().destroy();
                
                 // Create a new dataTable and assign it to a variable t
                 var t = $("#pupilsTable").DataTable({
                    data: tableData,
                    columns: [
                        { data: null },
                        { data: 'firstname', render: function (d, type, all) {
                            var othernames = all.othernames ? all.othernames : ''; 
                            return all.firstname + ' ' + all.lastname + ' ' + othernames;
                        } 
                    },
                        { data: 'initials', render: function (d, type, all) { return all.initials + ' ' + all.classstream} },
                        { data: 'pupilid'}                       
                    ],
                    columnDefs: [ {
                        targets: 0,
                        order: [[ 1, 'asc' ]]
                      } ],
                      columnDefs: [ {
                        targets: 3,
                        data: 'pupilid',
                        className: '',                    
                        render: function ( data) {
                                        return '\
                                                <div class="checkbox-custom chekbox-primary">\
                                                    <input class="pupils" value="'+ data +'" type="checkbox" name="pupils" />\
                                                    <label></label>\
                                                </div>\
                                        ';
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
                
                $("#attachFeeBtn").removeClass('hidden');
                 
            },
            error: function (error) {
                alert('Error '+ error);
                $('#res').append(error.responseText);
                console.log(error);
                  
            }
        }); 
    }
    
}

function attachAFeeToPupils()
{
    // An array to hold the subjects taught by the teacher
    var pupils = [];
    $('#pupilsTable input:checked').each(
        function(){
            pupils.push(parseInt($(this).val()));
        }
    );

    
    $.ajax({
        type: "post",
        url: "/adminhome/finance/localaccounts/attachfeetopupils",
        data: { 
            account_id: parseInt($('#accounts').val()),
            pupils: pupils,
            amount: $('#amount').val()    
    },
        dataType: "json",
        success: function (response, status, code) {
            notifySuccess(response.data.msg);
            console.log(response);
            getPupilsForAFeeAttachment();
            
        },
        error: function (error) {
            notifyFail(error.responseJSON.data.msg);
            console.log(error);
            alert('Error '+ error);
              
        }
    });
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