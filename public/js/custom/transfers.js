/*
Name: 			transfers.js
Written by: 	KABUYE HASHIM MUNIIRU
ORMS Version: 	1.0
Description:    Handle all the requests and behaviors of transfers.blade.php
*/

var theTable, aRow, grades;
$(document).ready(function () {
    // Initialise the ajax headers to have the CSRF laravel token
    $.ajaxSetup({
        headers: { 'X-CSRF-TOKEN':  $("meta[name='csrf-token']").attr('content')}
    }); // end ajax header initialisation

    $('#pupilsTable').DataTable({lengthMenu: [[10, 25, 50, 100, 200, -1], [10, 25, 50, 100, 200, 'All']]});

    $('#classes').change(function (e) { 
        e.preventDefault();

        if($('#classes').val() != '')
        {
            getStreams($('#classes').val());
            $("#transferPupilsBtn").addClass('hidden');
            $('#pupilsTable').DataTable().clear().draw();
        }
        else{
            hideFunctions();
        }
       
        
    });

    $('#classes').focus(function (e) { 
        e.preventDefault();
        
       
        
    });

    

    $('#streams').change(function (e) { 
        e.preventDefault();
       
        
    });

    $('#fetchPupilsBtn').click(function (e) { 
        e.preventDefault();
        if(e.detail !== 2)
        {
            getPupilsForTransfer();
        } 
        
    });

    $('#transferPupilsBtn').click(function (e) { 
        e.preventDefault();
        if(e.detail !== 2)
        {
            var pupils = [];
            $('#pupilsTable input:checked').each(
                function(){
                    pupils.push(parseInt($(this).val()));
                }
            );

            if(pupils.length > 0)
            {
                var theClass = $('#classes :selected').text();
                var stream = $('#streams :selected').text();

                $.alert({
                    title: 'Confirm Action',
                    content:  pupils.length + ' Pupils will be transfered to ' + theClass + ' ' + stream,
                    buttons: {
                        confirm: function (){
                            transferPupils();
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

            $('#streamPanel').removeClass('hidden');
            $('#termPanel').removeClass('hidden');
            $('#fetchPupilsBtn').removeClass('hidden');
            return true;
        },
        error: function (error) {
            alert('Error '+ error);
              
        }
    });
}

function getPupilsForTransfer()
{
    
    $.ajax({
        type: "post",
        url: "/adminhome/gradesandacademics/transfers/getpupilsfortransfer",
        data: { stream: parseInt($('#streams').val())},
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
                  lengthMenu: [[10, 25, 50, 100, 200, -1], [10, 25, 50, 100, 200, 'All']]
                  
            });

            // Use var t to assign a counter column onto the table
            t.on( 'order.dt search.dt', function () {
                t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                    cell.innerHTML = i+1;
                } );
            } ).draw(); 
            
            $("#transferPupilsBtn").removeClass('hidden');
             
        },
        error: function (error) {
            alert('Error '+ error);
            $('#res').append(error.responseText);
            console.log(error);
              
        }
    });
}

function transferPupils()
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
        url: "/adminhome/gradesandacademics/transfers/transferpupils",
        data: { 
            stream: parseInt($('#streams').val()),
            pupils: pupils    
    },
        dataType: "json",
        success: function (response, status, code) {
            notifySuccess(response.data.msg);
            console.log(response);
            getPupilsForTransfer();
            
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