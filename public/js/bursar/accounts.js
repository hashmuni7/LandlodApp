/*
Name: 			accounts.js
Written by: 	KABUYE HASHIM MUNIIRU
ORMS Version: 	1.0
Description:    Handle all the requests and behaviors of accounts.blade.php
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
    $('#addAccountBtn').click(function (e) { 
        if(e.detail !== 2)
        {
            addAccount();
        }
        
    });// end click event

    $('#accountsTable').on('click', '.edit-btn', function (e) {
        e.preventDefault();
        aRow = $(this).closest('tr');
        fetchAccount($(this).attr('data-id'));
    });

    // Click event for the update
    $('#updateAccountBtn').click(function (e) { 
        if(e.detail !== 2)
        {
            updateAccount(aRow);
        }        
        
    });// end click event

    $('#accountsTable').on('click', '.del-btn', function (e) {
        e.preventDefault();
        aRow = $(this).closest('tr');
        account = theTable.row(aRow).data()[1];
        askDeleteAccount($(this).attr('data-id'), account, aRow);
    });

    /*
	Modal Dismiss
	*/
	$(document).on('click', '.modal-dismiss', function (e) {
		e.preventDefault();
        resetAccountsModal();
        $.magnificPopup.close();
    });
    
    // Click event to put focus on the input field
    // This needs the setTimeOut function to allow the Modal to load
    // on to the DOM
    $('#addToTable').click(function (e) { 
        setTimeout(function () { 
            $('#account').focus();
         }, 150);        
    });// end click event

    $('#printAccounts').click(function (e) {
        
        if(e.detail !== 2)
        {                       
            printAccounts();
        }         
        
    });// end click event
});

function printAccounts()
{
    var tbl = $('#accountsTable').clone();
    tbl.find('tr th:nth-child(4), tr td:nth-child(4)').remove();

    
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
    doc.text('LOCAL ACCOUNTS', center, 32, 'center');
    doc.setLineWidth(1);
    doc.line(15, 36, 195, 36);
    doc.setFontSize(11);   

    
    
    doc.save('accounts.pdf');
}

function dtInit()
{
        

    var t = $('#accountsTable').DataTable({lengthMenu: [[ -1], [ 'All']]});
    theTable = t;
    t.on( 'order.dt search.dt', function () {
        t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();
    
}

function addAccount()
{
    if($('#addAccountsForm').valid()) // Test if all Form Fields are validated
        {
            
            // ajax request to add a new account to the database
            $.ajax({
                type: "post",
                url: "/bursarhome/finance/accounts/addaccount", 
                data: { 
                    account: $('#account').val()
                },
                dataType: "json",
                success: function (response, status, code) {
                    var html = getFunctions(response.data.data.accountid);
                    var account = response.data.data.account;                    
                    theTable.row.add(['', account, 'Active', html]).draw(false);

                    $.magnificPopup.close();
                    resetAccountsModal();
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
function resetAccountsModal()
{
    $('#addAccountBtn').show();
    $('#updateAccountBtn').addClass('hidden');
    $('#heading').html('Register a New Account');
    $('#accountid').val(null);
    $('#account').val(null);   
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

// Fetch account details by accountid
function fetchAccount(accountid)
{
    $('#accountForm').trigger('loading-overlay:show');
    $('#addAccountBtn').hide();// Hide the register Button and show Update Btn
    $('#updateAccountBtn').removeClass('hidden');
    $('#statusField').removeClass('hidden');
    $('#heading').html('Update Account Details');
    

    accountid = parseInt(accountid);

    // Pop up the Modal
    $.magnificPopup.open({
        items: {
            src: '#modalAnim'
        },
        type: 'inline',
        callbacks: {
            close: function(){                
                resetAccountsModal();               
            }
          }
    });

    
    $.ajax({
        type: "post",
        url: "/bursarhome/finance/accounts/getaccountbyid",
        data: { account_id: accountid},
        dataType: "json",
        success: function (response, status, code) {                        
            $('#accountid').val(response.data.data.accountid);
            $('#account').val(response.data.data.account);           
            response.data.data.status ? $('#statusActive').prop('checked', true) : $('#statusInactive').prop('checked', true);
            $('#accountForm').trigger('loading-overlay:hide');
            
        },
        error: function (error) {
            //alert('Error!  '+ error.responseJSON.data.msg);
            $('#res').append(error.responseText);
            console.log(error);  
        }
    });

    
    
}


// Update the Method Details By its id
// Get the field to update from the input field
function updateAccount(aRow)
{   
    
     
        if($('#addAccountsForm').valid()) // Test if all Form Fields are validated
        {
            
            $.ajax({
                type: "post",
                url: "/bursarhome/finance/accounts/updateaccount",
                data: { account_id: $('#accountid').val(),
                        account: $('#account').val(),                         
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
                    temp[1] = $('#account').val();                    
                    temp[2] = status;                  
                    $('#accountsTable').dataTable().fnUpdate(temp, aRow, undefined, false);                   
                    $('#accountsTable').trigger('order');
                    
                    
                    $.magnificPopup.close();
                    resetAccountsModal();
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

// Pop up a confirm dialog to delete
function askDeleteAccount(accountid, account, aRow)
{
    $.alert({
        title: 'Are You Sure You Want to Delete Account',
        content:  account,
        buttons: {
            confirm: function (){
                deleteAccount(accountid, aRow);
               
               
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

// Delete Method 
function deleteAccount(accountid, aRow)
{
    
    $.ajax({
        type: "post",
        url: "/bursarhome/finance/accounts/deleteaccount",
        data: { account_id: accountid},
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

