/*
Name: 			paymentmethods.js
Written by: 	KABUYE HASHIM MUNIIRU
ORMS Version: 	1.0
Description:    Handle all the requests and behaviors of paymentmethods.blade.php
*/
var theTable, aRow;
$(document).ready(function () {
    // Initialise the ajax headers to have the CSRF laravel token
    $.ajaxSetup({
        headers: { 'X-CSRF-TOKEN':  $("meta[name='csrf-token']").attr('content')}
    }); // end ajax header initialisation

    // Create a dataTable
    dtInit();

    // Function to handle the creation of a new Method
    $('#addMethodBtn').click(function (e) { 
        if(e.detail !== 2)
        {       
                         
            addMethod();
        }
        
    });// end click event

    $('#methodsTable').on('click', '.edit-btn', function (e) {
        e.preventDefault();
        aRow = $(this).closest('tr');
        fetchMethod($(this).attr('data-id'));
    });

    // Click event for the update method
    $('#updateMethodBtn').click(function (e) {
        if(e.detail !== 2)
        {       
                         
            updateMethod(aRow);
        }         
       
    });// end click event

    $('#methodsTable').on('click', '.del-btn', function (e) {
        e.preventDefault();
        aRow = $(this).closest('tr');
        method = theTable.row(aRow).data()[1];
        askDeleteMethod($(this).attr('data-id'), method, aRow);
    });

    /*
	Modal Dismiss
	*/
	$(document).on('click', '.modal-dismiss', function (e) {
		e.preventDefault();
        resetMethodsModal();
        $.magnificPopup.close();
    });
    
    // Click event to put focus on the input field
    // This needs the setTimeOut function to allow the Modal to load
    // on to the DOM
    $('#addToTable').click(function (e) { 
        setTimeout(function () { 
            $('#method').focus();
         }, 150);        
    });// end click event

    // Click event for the print 
    $('#printPaymentMethods').click(function (e) {
        if(e.detail !== 2)
        {       
                         
            printPaymentMethods();
        }         
       
    });// end click event
});


function printPaymentMethods()
{
    

    var tbl = $('#methodsTable').clone();
    tbl.find('tr th:nth-child(5), tr td:nth-child(5)').remove();
    var doc = new jsPDF();  

    var pageSize = doc.internal.pageSize;
            var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
            var center = pageWidth / 2;
   
    doc.setTextColor(headColor[0], headColor[1], headColor[2]);
    doc.setFontSize(headFontSize);
    doc.text(schoolName, center, schoolNameY, 'center');
   
    doc.text('ALL PAYMENT METHODS', center, 32, 'center');
    doc.setDrawColor(headColor[0], headColor[1], headColor[2]);
    doc.setLineWidth(1);
    doc.line(15, 36, 195, 36);
    doc.setFontSize(11);
    doc.setTextColor(100);

    
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

    
    
    doc.save('payment_methods_'+ displayDate(new Date())  +'.pdf');
    
}

function dtInit()
{
        

    var t = $('#methodsTable').DataTable({
        lengthMenu: [[ 50, 100, 200, -1], [ 50, 100, 200, 'All']]
    });
    theTable = t;
    t.on( 'order.dt search.dt', function () {
        t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();
    
    
}

function addMethod()
{
    if($('#addMethodsForm').valid()) // Test if all Form Fields are validated
        {
            
            // ajax request to add a new method to the database
            $.ajax({
                type: "post",
                url: "/bursarhome/finance/paymentmethods/addmethod", 
                data: { 
                    method: $('#method').val(),
                    evidence: parseInt($('#evidence').val())
                },
                dataType: "json",
                success: function (response, status, code) {
                    var html = getFunctions(response.data.data.paymentmethodid);
                    var method = response.data.data.paymentmethod
                    var evidence = $('#evidence :selected').text();
                    theTable.row.add(['', method, evidence, 'Active', html]).draw(false);

                    $.magnificPopup.close();
                    resetMethodsModal();
                    notifySuccess(response.data.msg);
                    //getMethods();
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


function getFunctions(id)
{
    var html = "<a class=\"modal-with-zoom-anim ws-normal  pointer edit-btn\" href=\"#modalAnim\" \
                    data-id=\""+ id +"\"><i class=\"fas fa-pencil-alt\"></i> Edit</a>\n<a class=\"ws-normal pointer del-btn\" \
                    data-id=\""+ id +"\"><i class=\"fas fa-trash\"></i> Delete</a>";
    return html;
}

// Reset the input fields of the Form on the Modal
// Unhide the Register btn
// Hide the update button
// Set all fields to null
function resetMethodsModal()
{
    $('#addMethodBtn').show();
    $('#updateMethodBtn').addClass('hidden');
    $('#heading').html('Register a New Method');
    $('#paymentmethodid').val(null);
    $('#method').val(null);
    $('#evidence').val(null); 
    $('#statusField').addClass('hidden');   
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

// Fetch method details by the paymentmethodid
function fetchMethod(paymentmethodid)
{
    $('#methodForm').trigger('loading-overlay:show');
    $('#addMethodBtn').hide();// Hide the register Button and show Update Btn
    $('#updateMethodBtn').removeClass('hidden');
    $('#statusField').removeClass('hidden');
    $('#heading').html('Update Method Details');
    

    paymentmethodid = parseInt(paymentmethodid);

    // Pop up the Modal
    $.magnificPopup.open({
        items: {
            src: '#modalAnim'
        },
        type: 'inline',
        callbacks: {
            close: function(){                
                resetMethodsModal();               
            }
          }
    });

    
    $.ajax({
        type: "post",
        url: "/bursarhome/finance/paymentmethods/getmethodbyid",
        data: { payment_method_id: paymentmethodid},
        dataType: "json",
        success: function (response, status, code) {                        
            $('#paymentmethodid').val(response.data.data.paymentmethodid);
            $('#method').val(response.data.data.paymentmethod);
            $('#evidence').val(response.data.data.evidenceid);
            response.data.data.status ? $('#statusActive').prop('checked', true) : $('#statusInactive').prop('checked', true);
            $('#methodForm').trigger('loading-overlay:hide');
            
        },
        error: function (error) {
            //alert('Error!  '+ error.responseJSON.data.msg);
            $('#res').append(error.responseText);
            console.log(error);  
        }
    });

    
    
}

function updateTable(method, evidence)
{
    var temp = theTable.row(aRow).data();
    temp[1] = method;//$('#method').val(); 
    temp[2] = evidence;//$('#evidence :selected').text();                  
    $('#methodsTable').dataTable().fnUpdate(temp, aRow, undefined, false);
    $('#methodsTable').trigger('order');
}

// Update the Method Details By its id
// Get the field to update from the input field
function updateMethod(aRow)
{   
    
     
        if($('#addMethodsForm').valid()) // Test if all Form Fields are validated
        {
            
            $.ajax({
                type: "post",
                url: "/bursarhome/finance/paymentmethods/updatemethod",
                data: { payment_method_id: $('#paymentmethodid').val(),
                        method: $('#method').val(), 
                        evidence: $('#evidence').val(),
                        status: parseInt($('#statusField input:checked').val())
                    },
                dataType: "json",
                success: function (response, status, code) {
                                                                                                                  
                    //getSubjects();
                    //console.log(response.data.msg);
                    notifySuccess(response.data.msg);
                    var status = 'Inactive';
                     if(parseInt($('#statusField input:checked').val()) == 1)
                    {
                        status = 'Active';
                    }
                  
                   var temp = theTable.row(aRow).data();
                    temp[1] = $('#method').val(); 
                    temp[2] = $('#evidence :selected').text();
                    temp[3] = status;                  
                    $('#methodsTable').dataTable().fnUpdate(temp, aRow, undefined, false);                   
                    $('#methodsTable').trigger('order');
                    
                    
                    
                    resetMethodsModal();
                    $.magnificPopup.close();
                },
                error: function (error) {
                    if(error.status == 400) // if there is a client error
                    {
                        $.each(error.responseJSON.errors, function(key, val){
                            warnByName($("input[name='" + key + "']"), val);
                        });
                        
                        notifyFail(error.responseJSON.data.msg);
                        alert(error.responseJSON.data.msg);
                        console.log(error);
                    }
                    if(error.status == 500) // if there is a server error
                    {
                        notifyFail(error.responseJSON.data.msg);
                        //alert(error.responseJSON.data.msg);
                        console.log(error);
                    }
                      
                }
            }); // end ajax call
        }// end if

        
        
    
}

// Pop up a confirm dialog to delete a method
function askDeleteMethod(paymentmethodid, method, aRow)
{
    $.alert({
        title: 'Are You Sure You Want to Delete Method ',
        content:  method,
        buttons: {
            confirm: function (){
                deleteMethod(paymentmethodid, aRow);
               
               
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

// Delete Method by its paymentmethodid
function deleteMethod(paymentmethodid, aRow)
{
    
    $.ajax({
        type: "post",
        url: "/bursarhome/finance/paymentmethods/deletemethod",
        data: { payment_method_id: paymentmethodid},
        dataType: "json",
        success: function (response, status, code) {
            //getSubjects();
            notifySuccess(response.data.msg);
            theTable.row(aRow).remove().draw();
        },
        error: function (error) {
            notifyFail(error.responseJSON.data.msg);
           // alert('Error '+ error);
              
        }
    });
    
}

