/*
Name: 			houses.js
Written by: 	KABUYE HASHIM MUNIIRU
ORMS Version: 	1.0
*/

$(document).ready(function () {
    // Initialise the ajax headers to have the CSRF laravel token
    $.ajaxSetup({
        headers: { 'X-CSRF-TOKEN':  $("meta[name='csrf-token']").attr('content')}
    });

    $('#housesTable').DataTable({
        lengthMenu: [[  -1], [  'All']]
    });

    // Function to handle the creation of a new House
    $('#addHouseBtn').click(function (e) { 
        if(e.detail !== 2)
        {
            if($('#addHouseForm').valid()) // Test if all Form Fields are validated
            {
                // ajax request to add a new section to the database
                $.ajax({
                    type: "post",
                    url: "/adminhome/houses/addhouse", 
                    data: { 
                        House_Name: $('#houseName').val(),
                        House_Slogan: $('#houseSlogan').val()
                    },
                    dataType: "json",
                    success: function (response, status, code) {
                        $('#houseName').val(null);
                        $('#houseSlogan').val(null);
                        $.magnificPopup.close();
                        resetHousesModal();
                        notifySuccess(response.data.msg);
                        getHouses();
                    },
                    error: function (error) {
                        if(error.status == 400) // if there is a client error
                        {
                            $.each(error.responseJSON.errors, function(key, val){
                                console.log("Key: " + key + "| value: " + val);
                                warnByName($("input[name='" + key + "']"), val);
                            });
                            console.log(error);
                            notifyFail(error);
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
        
        
    });// end click event

    // Click event for the update house function
    $('#updateHouseBtn').click(function (e) {
        if(e.detail !== 2)
        {
            updateHouse($('#houseid').val());
        }
        
    });// end click event

    // Click event to put focus on the input field
    // This needs the setTimeOut function to allow the Modal to load
    // on to the DOM
    $('#addToTable').click(function (e) { 
        setTimeout(function () { 
            $('#houseName').focus();
         }, 150);        
    });// end click event

    $('#housesTable').on('click', '.edit-btn', function (e) {
        e.preventDefault();
       
       
            fetchHouse($(this).attr('data-id'));
      
               
    });

    $('#housesTable').on('click', '.del-btn', function (e) {
        e.preventDefault();
        askDeleteHouse($(this).attr('data-id'));       
    });

    /*
	Modal Dismiss
	*/
	$(document).on('click', '.modal-dismiss', function (e) {
		e.preventDefault();
        resetHousesModal();
        $.magnificPopup.close();
    });

    $('#printHouses').click(function (e) {
        
        if(e.detail !== 2)
        {
            
           
            printHouses();
        }         
        
    });// end click event

});

function printHouses()
{
    var tbl = $('#housesTable').clone();
    tbl.find('tr th:nth-child(5), tr td:nth-child(5)').remove();

    
    var doc = new jsPDF();

    var pageSize = doc.internal.pageSize;
            var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
            var center = pageWidth / 2;
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
   
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(25);
    doc.text(schoolName, center, schoolNameY, 'center');  
    doc.text('HOUSES', center, 32, 'center');
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(1);
    doc.line(15, 36, 195, 36);
    doc.setFontSize(11);
    doc.setTextColor(100);

    
    
    doc.save('houses.pdf');
}


function getHouses()
{
    $.ajax({
        type: "post",
        url: "/adminhome/houses",
        data: {},            
        dataType: "json",
        success: function (response, status, code) {
            // First destroy the DataTable Before creating a new one
            $('#housesTable').DataTable().destroy();
            
             // Create a new dataTable and assign it to a variable t
             var t = $("#housesTable").DataTable({
                data: JSON.parse(response.data),
                columns: [
                    { data: null },
                    { data: 'house' },
                    { data: 'slogan' },
                    { data: 'num' },
                    { data: 'houseid' }                       
                ],
                columnDefs: [ {
                    targets: 0,
                    order: [[ 1, 'asc' ]]
                  } ],
                columnDefs: [ {
                    targets: 4,
                    data: 'houseid',
                    className: 'actions-hover actions-fade',
                    render: function ( data) {
                                    return '<a class="modal-with-zoom-anim ws-normal context-menu pointer edit-btn" href="#modalAnim" data-id="'+ data + '">'+ 
                                    '<i class="fas fa-pencil-alt"></i>Edit</a>' + 
                                    ' <a class="ws-normal context-menu pointer del-btn "   data-id="'+ data + '"><i class="fas fa-trash"></i>Delete</a>';
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
        },
        error: function (error) {
            alert("No Response From Server");
        }
    }); // end ajax call
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

// Fetch house details by the houseid
function fetchHouse(houseid)
{
    $('#houseForm').trigger('loading-overlay:show');
   
    $('#heading').html('Update House Details');

    $('#addHouseBtn').hide();// Hide the register Button and show Update Btn
    $('#updateHouseBtn').removeClass('hidden');
    // Pop up the Modal
    $.magnificPopup.open({
        items: {
            src: '#modalAnim'
        },
        type: 'inline',
        callbacks: {
            close: function(){
                resetHousesModal();               
            }
          }
    });
    
    $.ajax({
        type: "post",
        url: "/adminhome/houses/gethousebyid",
        data: { House_id: houseid},
        dataType: "json",
        success: function (response, status, code) {
            //console.log(response.data.data[0]);
            $('#houseid').val(response.data.data.houseid);
             $('#houseName').val(response.data.data.house);
             $('#houseSlogan').val(response.data.data.slogan);
             $('#houseForm').trigger('loading-overlay:hide');
        },
        error: function (error) {
            alert('Error!  '+ error.responseJSON.data.msg);
            //$('#res').append(error.responseText);
            //console.log(error);  
        }
    });
    
}

// Reset the input fields of the Form on the Modal
// Unhide the Register btn
// Hide the update button
// Set all fields to null
function resetHousesModal()
{
    $('#addHouseBtn').show();
    $('#updateHouseBtn').addClass('hidden');
    $('#houseName').val(null);
    $('#houseSlogan').val(null);
    $('#houseid').val(null);
    $('#heading').html('Register New House In School');
}

// Update the House By its id
// Get the field to update from the input field
function updateHouse(houseid)
{
     
        if($('#addHouseForm').valid()) // Test if all Form Fields are validated
        {
            $.ajax({
                type: "post",
                url: "/adminhome/houses/updatehouse",
                data: { House_Name: $('#houseName').val(), 
                        House_Slogan: $('#houseSlogan').val(),
                        house_id: $('#houseid').val()
                    },
                dataType: "json",
                success: function (response, status, code) {
                    $('#houseid').val(null);
                    $('#houseName').val(null);
                    $('#houseSlogan').val(null);
                    $.magnificPopup.close();
                    resetHousesModal();
                    
                    getHouses();
                    console.log(response.data.msg);
                    notifySuccess(response.data.msg);
                    

                },
                error: function (error) {
                    if(error.status == 400) // if there is a client error
                    {
                        $.each(error.responseJSON.errors, function(key, val){
                            warnByName($("input[name='" + key + "']"), val);
                        });
                        
                        notifyFail('Section Not Updated');
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

// Pop up a confirm dialog to delete a house
function askDeleteHouse(houseid)
{
    $.ajax({
        type: "post",
        url: "/adminhome/houses/gethousebyid",
        data: { House_id: houseid},
        dataType: "json",
        success: function (response, status, code) {
             $.alert({
                title: 'Are You Sure You Want to Delete House',
                content:  response.data.data.house + '\n' + response.data.data.slogan,
                buttons: {
                    confirm: function (){
                        deleteHouse(houseid)
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


// Delete a house by its houseid
function deleteHouse(houseid)
{
    $.ajax({
        type: "post",
        url: "/adminhome/houses/deletehouse",
        data: { house_id: houseid},
        dataType: "json",
        success: function (response, status, code) {
            getHouses();
            notifySuccess(response.data.msg);
        },
        error: function (error) {
            notifyFail(error.responseJSON.data.msg);
           // alert('Error '+error);
              
        }
    });
    
}