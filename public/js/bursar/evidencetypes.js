/*
Name: 			evidencetypes.js
Written by: 	KABUYE HASHIM MUNIIRU
ORMS Version: 	1.0
Description:    Handle all the requests and behaviors of evidencetypes.blade.php
*/
var theTable, aRow;
$(document).ready(function () {
    // Initialise the ajax headers to have the CSRF laravel token
    $.ajaxSetup({
        headers: { 'X-CSRF-TOKEN':  $("meta[name='csrf-token']").attr('content')}
    }); // end ajax header initialisation

    // Create a dataTable
    dtInit();

    // Function to handle the creation of a new Type
    $('#addEvidenceBtn').click(function (e) {
        if(e.detail !== 2)
        {       
                         
            addEvidence();
        } 
        
    });// end click event

    $('#evidencesTable').on('click', '.edit-btn', function (e) {
        e.preventDefault();
        aRow = $(this).closest('tr');
        fetchEvidenceType($(this).attr('data-id'));
    });

    // Click event for the update method
    $('#updateEvidenceBtn').click(function (e) {
        if(e.detail !== 2)
        {       
                         
            updateEvidenceType(aRow);
        }         
        
    });// end click event

    $('#evidencesTable').on('click', '.del-btn', function (e) {
        e.preventDefault();
        aRow = $(this).closest('tr');
        evidence = theTable.row(aRow).data()[1];
        askDeleteEvidenceType($(this).attr('data-id'), evidence, aRow);
    });

    /*
	Modal Dismiss
	*/
	$(document).on('click', '.modal-dismiss', function (e) {
		e.preventDefault();
        resetEvidencesModal();
        $.magnificPopup.close();
    });
    
    // Click event to put focus on the input field
    // This needs the setTimeOut function to allow the Modal to load
    // on to the DOM
    $('#addToTable').click(function (e) { 
        setTimeout(function () { 
            $('#evidence').focus();
         }, 150);        
    });// end click event

    // Click event for the print 
    $('#printEvidenceTypes').click(function (e) {
        if(e.detail !== 2)
        {       
                         
            printEvidenceTypes();
        }         
       
    });// end click event
});

function printEvidenceTypes()
{
    var tbl = $('#evidencesTable').clone();
    tbl.find('tr th:nth-child(3), tr td:nth-child(3)').remove();
    var doc = new jsPDF();  

    var pageSize = doc.internal.pageSize;
            var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
            var center = pageWidth / 2;
   
    doc.setTextColor(headColor[0], headColor[1], headColor[2]);
    doc.setFontSize(headFontSize);
    doc.text(schoolName, center, schoolNameY, 'center');
    doc.setDrawColor(headColor[0], headColor[1], headColor[2]);
    doc.text('EVIDENCE TYPES', center, 32, 'center');
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

    
    
    doc.save('evidence_types_'+ displayDate(new Date())  +'.pdf');
}

function dtInit()
{
        

    var t = $('#evidencesTable').DataTable({
        lengthMenu: [[ 50, 100, 200, -1], [ 50, 100, 200, 'All']]
    });
    theTable = t;
    t.on( 'order.dt search.dt', function () {
        t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();
    
}

function addEvidence()
{
    if($('#addEvidencesForm').valid()) // Test if all Form Fields are validated
        {
            
            // ajax request to add a new method to the database
            $.ajax({
                type: "post",
                url: "/bursarhome/finance/addpaymentevidence", 
                data: { 
                    evidence: $('#evidence').val()
                },
                dataType: "json",
                success: function (response, status, code) {
                    var html = getFunctions(response.data.data.evidenceid);
                    var evidence = response.data.data.evidence                    
                    theTable.row.add(['', evidence, html]).draw(false);

                    $.magnificPopup.close();
                    resetEvidencesModal();
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
function resetEvidencesModal()
{
    $('#addEvidenceBtn').show();
    $('#updateEvidenceBtn').addClass('hidden');
    $('#heading').html('Register a New Evidence Type');
    $('#evidenceid').val(null);
    $('#evidence').val(null);          
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

// Fetch evidence type details by the evidenceid
function fetchEvidenceType(evidenceid)
{
    $('#evidenceForm').trigger('loading-overlay:show');
    $('#addEvidenceBtn').hide();// Hide the register Button and show Update Btn
    $('#updateEvidenceBtn').removeClass('hidden');
   
    $('#heading').html('Update Evidence Type Details');
    

    evidenceid = parseInt(evidenceid);

    // Pop up the Modal
    $.magnificPopup.open({
        items: {
            src: '#modalAnim'
        },
        type: 'inline',
        callbacks: {
            close: function(){                
                resetEvidencesModal();               
            }
          }
    });

    
    $.ajax({
        type: "post",
        url: "/bursarhome/finance/getpaymentevidencebyid",
        data: { evidence_id: evidenceid},
        dataType: "json",
        success: function (response, status, code) {                        
            $('#evidenceid').val(response.data.data.evidenceid);
            $('#evidence').val(response.data.data.evidence);    
            
            $('#evidenceForm').trigger('loading-overlay:hide');
            
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

// Update the Evidence Type Details By its id
// Get the field to update from the input field
function updateEvidenceType(aRow)
{   
    
     
        if($('#addEvidencesForm').valid()) // Test if all Form Fields are validated
        {
            
            $.ajax({
                type: "post",
                url: "/bursarhome/finance/updatepaymentevidence",
                data: { evidence_id: $('#evidenceid').val(),
                        evidence: $('#evidence').val()
                    },
                dataType: "json",
                success: function (response, status, code) {
                                                                                                                  
                    //getSubjects();
                    //console.log(response.data.msg);
                    notifySuccess(response.data.msg);                   
                  
                   var temp = theTable.row(aRow).data();
                    temp[1] = $('#evidence').val();                                       
                    $('#evidencesTable').dataTable().fnUpdate(temp, aRow, undefined, false);                   
                    $('#evidencesTable').trigger('order');
                    
                    
                    $.magnificPopup.close();
                    resetEvidencesModal();
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

// Pop up a confirm dialog to delete an evidence type
function askDeleteEvidenceType(evidenceid, evidence, aRow)
{
    $.alert({
        title: 'Are You Sure You Want to Delete Type',
        content:  evidence,
        buttons: {
            confirm: function (){
                deleteEvidenceType(evidenceid, aRow);
               
               
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

// Delete Method by its evidenceid
function deleteEvidenceType(evidenceid, aRow)
{
    
    $.ajax({
        type: "post",
        url: "/bursarhome/finance/deletepaymentevidence",
        data: { evidence_id: evidenceid},
        dataType: "json",
        success: function (response, status, code) {            
            notifySuccess(response.data.msg);
            theTable.row(aRow).remove().draw();
        },
        error: function (error) {
            //alert('Error '+ error);
            notifyFail(error.responseJSON.data.msg);
              
        }
    });
    
}

