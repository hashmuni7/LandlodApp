/*
Name: 			schoolfeesamounts.js
Written by: 	KABUYE HASHIM MUNIIRU
ORMS Version: 	1.0
Description:    Handle all the requests and behaviors of schoolfeesamounts.blade.php
*/

$(document).ready(function () {
    // Initialise the ajax headers to have the CSRF laravel token
    $.ajaxSetup({
        headers: { 'X-CSRF-TOKEN':  $("meta[name='csrf-token']").attr('content')}
    }); // end ajax header initialisation

    // Create a dataTable
    $('#feesTable').DataTable({lengthMenu: [[ -1], [ 'All']]});

    // Function to handle the creation of a new Amount
    $('#addAmountBtn').click(function (e) {
        if(e.detail !== 2)
        {
            addAmount();
        } 
       
    });// end click event

    

    $('#feesTable').on('click', '.edit-btn', function (e) {
        e.preventDefault();
        fetchAmount($(this).attr('data-id'));
    });

    $('#feesTable').on('click', '.del-btn', function (e) {
        e.preventDefault();
        askDeleteAmount($(this).attr('data-id'));
    });

    // Click event for the update amount function
    $('#updateAmountBtn').click(function (e) { 
        if(e.detail !== 2)
        {
            updateAmount();
        }        
        
    });// end click event

    /*
	Modal Dismiss
	*/
	$(document).on('click', '.modal-dismiss', function (e) {
		e.preventDefault();
        resetFeesModal();
        $.magnificPopup.close();
    });
    
    // Click event to put focus on the input field
    // This needs the setTimeOut function to allow the Modal to load
    // on to the DOM
    $('#addToTable').click(function (e) { 
        setTimeout(function () { 
            $('#amount').focus();
         }, 150);        
    });// end click event

    $('#printAmounts').click(function (e) {
        
        if(e.detail !== 2)
        {
            
           
            printAmounts();
        }         
        
    });// end click event

    


}); // end document ready function

function printAmounts()
{
    var tbl = $('#feesTable').clone();
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
   
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(headFontSize);
    doc.text(schoolName, center, schoolNameY, 'center');  
    doc.text('SCHOOL FEES AMOUNTS', center, 32, 'center');
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(1);
    doc.line(15, 36, 195, 36);
    doc.setFontSize(11);
    doc.setTextColor(100);

    
    
    doc.save('amounts.pdf');
}

function addAmount()
{
    if($('#addFeesForm').valid()) // Test if all Form Fields are validated
        {
            
            // ajax request to add a new section to the database
            $.ajax({
                type: "post",
                url: "/adminhome/schoolfeesamounts/addamount", 
                data: { 
                    amount: $('#amount').val(),
                    description: $('#description').val()
                },
                dataType: "json",
                success: function (response, status, code) {
                     $('#amount').val(null);
                     $('#description').val(null);                     
                    $.magnificPopup.close();
                    resetFeesModal();
                    notifySuccess(response.data.msg);
                    getFeesAmounts();
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


// Reset the input fields of the Form on the Modal
// Unhide the Register btn
// Hide the update button
// Set all fields to null
function resetFeesModal()
{
    $('#heading').html('Register a New Amount Paid as School Fees Per Term');
    $('#addAmountBtn').show();
    $('#updateAmountBtn').addClass('hidden');
    $('#feesid').val(null);
    $('#amount').val(null);
    $('#description').val(null);    
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
function fetchAmount(feesid)
{
    $('#feesForm').trigger('loading-overlay:show');
    $('#heading').html('Update School Fees Amount');
    $('#addAmountBtn').hide();// Hide the register Button and show Update Btn
    $('#updateAmountBtn').removeClass('hidden');
    feesid = parseInt(feesid);

    // Pop up the Modal
    $.magnificPopup.open({
        items: {
            src: '#modalAnim'
        },
        type: 'inline',
        callbacks: {
            close: function(){                
                resetFeesModal();               
            }
          }
    });

    
    $.ajax({
        type: "post",
        url: "/adminhome/schoolfeesamounts/getfeesamountbyid",
        data: { fees_id: feesid},
        dataType: "json",
        success: function (response, status, code) {
            //console.log($.datepicker.formatDate('yy-mm-dd', new Date(response.data.data.startdate)));
            
            $('#feesid').val(response.data.data.feesid);
            $('#amount').val(response.data.data.amount);
            //console.log(num);
            $('#description').val(response.data.data.description);
            $('#feesForm').trigger('loading-overlay:hide');
            //openModal();
        },
        error: function (error) {
            //alert('Error!  '+ error.responseJSON.data.msg);
            $('#res').append(error.responseText);
            console.log(error);  
        }
    });

    
    
}

function openModal()
{
    $.magnificPopup.open({
        items: {
            src: '#modalAnim'
        },
        type: 'inline',

		fixedContentPos: false,
		fixedBgPos: true,

		overflowY: 'auto',

		closeBtnInside: true,
		preloader: false,
		
		midClick: true,
		removalDelay: 300,
		mainClass: 'zoom-anim-dialog',
		modal: true,
        
        callbacks: {
            close: function(){                
                resetFeesModal();               
            }
          }
    });
}

// Update the Fees Amount By its id
// Get the field to update from the input field
function updateAmount()
{
     
        if($('#addFeesForm').valid()) // Test if all Form Fields are validated
        {
            $.ajax({
                type: "post",
                url: "/adminhome/schoolfeesamounts/updatefeesamount",
                data: { fees_id: $('#feesid').val(),
                        amount: $('#amount').val(), 
                        description: $('#description').val()
                    },
                dataType: "json",
                success: function (response, status, code) {
                    $.magnificPopup.close();
                    $('#feesid').val(null);
                    $('#amount').val(null);
                    $('#description').val(null);                  
                    
                    resetFeesModal();
                    
                    getFeesAmounts();
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

function getFeesAmounts()
{
    $.ajax({
        type: "post",
        url: "/adminhome/feesamounts",
        data: {},            
        dataType: "json",
        success: function (response, status, code) {
            // First destroy the DataTable Before creating a new one
            $('#feesTable').DataTable().destroy();
            
             // Create a new dataTable and assign it to a variable t
             var t = $("#feesTable").DataTable({
                data: JSON.parse(response.data),
                columns: [
                    { data: null },
                    { data: 'amount', render: function(d){return getCurrency(d);} },
                    { data: 'description'},
                    { data: 'feesid' }                       
                ],
                columnDefs: [ {
                    targets: 0,
                    order: [[ 1, 'asc' ]]
                  } ],
                columnDefs: [ {
                    targets: 3,
                    data: 'feesid',
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

// Pop up a confirm dialog to delete a year
function askDeleteAmount(feesid)
{
    feesid = parseInt(feesid);
    $.ajax({
        type: "post",
        url: "/adminhome/schoolfeesamounts/getfeesamountbyid",
        data: { fees_id: feesid},
        dataType: "json",
        success: function (response, status, code) {
             $.alert({
                title: 'Are You Sure You Want to Delete Amount',
                content:  getCurrency(response.data.data.amount),
                buttons: {
                    confirm: function (){
                        deleteAmount(feesid)
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


// Delete an amount by its feesid
function deleteAmount(feesid)
{
    $.ajax({
        type: "post",
        url: "/adminhome/schoolfeesamounts/deleteamount",
        data: { fees_id: feesid},
        dataType: "json",
        success: function (response, status, code) {
            getFeesAmounts();
            notifySuccess(response.data.msg);
        },
        error: function (error) {
            //alert('Error '+ error);
            notifyFail(error.responseJSON.data.msg);  
        }
    });
    
}