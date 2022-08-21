/*
Name: 			sections.js
Written by: 	KABUYE HASHIM MUNIIRU
ORMS Version: 	1.0
*/

$(document).ready(function () {
    $.ajaxSetup({
        headers: { 'X-CSRF-TOKEN':  $("meta[name='csrf-token']").attr('content')}
    });

    // Initialise the DataTable
    $("#sectionsTbl").DataTable({
        lengthMenu: [[  -1], [  'All']]
    });

    
    
    
    // Function to handle the creation of a new section
    $('#registerSectionBtn').click(function (e) {
        if(e.detail !== 2)
        {
            if($('#addSectionForm').valid()) // Test if all Form Fields are validated
        {
            // ajax request to add a new section to the database
            $.ajax({
                type: "post",
                url: "/adminhome/sections/addsection", 
                data: { Section_Name: $('#sectionName').val()},
                dataType: "json",
                success: function (response, status, code) {
                    $('#sectionName').val(null);
                    $.magnificPopup.close();
                    resetSectionsModal();
                    notifySuccess('Section Added Successfully');
                    getSections();
                },
                error: function (error) {
                    if(error.status == 400) // if there is a client error
                    {
                        $.each(error.responseJSON.errors, function(key, val){
                            console.log("Key: " + key + "| value: " + val);
                            warnByName($("input[name='" + key + "']"), val);
                        });
                        notifyFail('Section Not Added');
                    }
                    if(error.status == 500) // if there is a server error
                    {
                        notifyFail(error.responseJSON.error);
                    }
                      
                }
            }); // end ajax call
        }// end if
        } 
        
        
    });// end click event
    

    // Click event for the update section function
    $('#updateSectionBtn').click(function (e) {
        if(e.detail !== 2)
        {
            updateSection($('#sectionid').val());
        }         
        
    });// end click event

    // Click event to put focus on the input field
    // This needs the setTimeOut function to allow the Modal to load
    // on to the DOM
    $('#addToTable').click(function (e) { 
        setTimeout(function () { 
            $('#sectionName').focus();
         }, 150);        
    });// end click event

    $('#sectionsTbl').on('click', '.edit-btn', function (e) {
        e.preventDefault();
       
       
            fetchSection($(this).attr('data-id'));
      
               
    });

    $('#sectionsTbl').on('click', '.del-btn', function (e) {
        e.preventDefault();
        askDeleteSection($(this).attr('data-id'));       
    });


    // var doc = new jsPDF();
    // doc.addHTML($('#content')[0], 15, 15,{
    //     'background': '#fff',
    // }, function(){
    //     doc.save('sections.pdf');
    // });


    

    // Click event for the update section function
    $('#printSections').click(function (e) {
        
        
        if(e.detail !== 2)
        {
            var tbl = $('#sectionsTbl').clone();
            tbl.find('tr th:nth-child(3), tr td:nth-child(3)').remove();

            
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

            
            
            // jsPDF 1.4+ uses getWidth, <1.4 uses .width
            var pageSize = doc.internal.pageSize;
            var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
            var center = pageWidth / 2;

            // Get the element to print
            // var element = document.getElementById('tester');

            // // Define optional configuration
            // var options = {
            // filename: 'my-file.pdf'
            // };

            // // Create instance of html2pdf class
            // var exporter = new html2pdf(element, options);
            // exporter.getPdf(false).then((pdf) => {
            //     //console.log('doing something before downloading pdf file');
            //     pdf.save();
            //   });
            
            //var text = doc.splitTextToSize("These are the sections in Sechool", pageWidth - 35, {});
            //doc.text("These are the sections in Sechool", 14, 30);
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(25);
            doc.text(schoolName, center, schoolNameY, 'center');
            doc.setTextColor(0, 0, 0);
            doc.text('SECTIONS', center, 32, 'center');
            doc.setDrawColor(0, 0, 0);
            doc.setLineWidth(1);
            doc.line(15, 36, 195, 36);
            doc.setFontSize(11);
            doc.setTextColor(100);

            // doc.autoTable({
            //     head: headRows(),
            //     body: bodyRows(40),
            //     startY: 50, 
            //     showHead: 'firstPage'
            // });

            //doc.text(text, 14, doc.autoTable.previous.finalY + 10);
            
            // Or use javascript directly:
            // doc.autoTable({
            //     head: [['Name', 'Email', 'Country']],
            //     body: [
            //         ['David', 'david@example.com', 'Sweden'],
            //         ['Castille', 'castille@example.com', 'Norway'],
            //         // ...
            //     ]
            // });
            
            doc.save('sections.pdf');
        }         
        
    });// end click event
    
      
    
}); // end document ready function


// function to get all the sections from the database 
// and create a DataTable from the JSON response
function getSections()
{
    
        $.ajax({
            type: "post",
            url: "/adminhome/sections",
            data: {},            
            dataType: "json",
            success: function (response, status, code) {
                // First destroy the DataTable Before creating a new one
                $('#sectionsTbl').DataTable().destroy();
                
                 // Create a new dataTable and assign it to a variable t
                 var t = $("#sectionsTbl").DataTable({
                    data: JSON.parse(response.data),
                    columns: [
                        { data: null },
                        { data: 'section' },
                        { data: 'sectionid' }                        
                    ],
                    columnDefs: [ {
                        targets: 0,
                        order: [[ 1, 'asc' ]]
                      } ],
                    columnDefs: [ {
                        targets: 2,
                        data: 'sectionid',
                        className: 'actions-hover actions-fade',
                        render: function ( data) {
                                        return '<a class="modal-with-zoom-anim ws-normal context-menu pointer edit-btn" href="#modalAnim" data-id="'+ data + '">'+ 
                                        '<i class="fas fa-pencil-alt"></i>Edit</a>' + 
                                        ' <a class="ws-normal context-menu pointer  del-btn" data-id="'+ data + '"><i class="fas fa-trash"></i>Delete</a>';
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

// Fetch section details by the sectionid
function fetchSection(sectionid)
{
    $('#sectionForm').trigger('loading-overlay:show');
    $('#registerSectionBtn').hide();// Hide the register Button and show Update Btn
    $('#updateSectionBtn').removeClass('hidden');
    $('#heading').html('Update Section Details');
    // Pop up the Modal
    $.magnificPopup.open({
        items: {
            src: '#modalAnim'
        },
        type: 'inline',
        callbacks: {
            close: function(){
               resetSectionsModal();
            }
          }
    });
    
    
    $.ajaxSetup({
        headers: { 'X-CSRF-TOKEN':  $("meta[name='csrf-token']").attr('content')}
    });
    $.ajax({
        type: "post",
        url: "/adminhome/sections/getsectionbyid",
        data: { Section_id: sectionid},
        dataType: "json",
        success: function (response, status, code) {
             $('#sectionName').val(response.data.section);
             $('#sectionid').val(response.data.sectionid);
             $('#sectionForm').trigger('loading-overlay:hide');
        },
        error: function (error) {
            alert('Error '+ error.responseText);  
        }
    });
    
}

// Reset the input fields of the Form on the Modal
// Unhide the Register btn
// Hide the update button
// Set all fields to null
function resetSectionsModal()
{
    $('#registerSectionBtn').show();
    $('#updateSectionBtn').addClass('hidden');
    $('#sectionName').val(null);
    $('#sectionid').val(null);
    $('#heading').html('Register New Section In School');
}

// Update the section By its id
// Get the field to update from the input field
function updateSection(sectionid)
{
     
        if($('#addSectionForm').valid()) // Test if all Form Fields are validated
        {
            $.ajax({
                type: "post",
                url: "/adminhome/sections/updatesection",
                data: { Section_Name: $('#sectionName').val(), section_id: $('#sectionid').val()},
                dataType: "json",
                success: function (response, status, code) {
                    $('#sectionName').val(null);
                    $('#sectionid').val(null);
                    $.magnificPopup.close();
                    resetSectionsModal();
                    
                    getSections();
                    notifySuccess('Section Updated Successfully');
                    

                },
                error: function (error) {
                    if(error.status == 400) // if there is a client error
                    {
                        $.each(error.responseJSON.errors, function(key, val){
                            console.log("Key: " + key + "| value: " + val);
                            warnByName($("input[name='" + key + "']"), val);
                        });
                        notifyFail('Section Not Updated');
                    }
                    if(error.status == 500) // if there is a server error
                    {
                        notifyFail(error.responseJSON.error);
                    }
                      
                }
            }); // end ajax call
        }// end if
        
    
}

// Pop up a confirm dialog to delete a section
function askDeleteSection(sectionid)
{
    $.ajax({
        type: "post",
        url: "/adminhome/sections/getsectionbyid",
        data: { Section_id: sectionid},
        dataType: "json",
        success: function (response, status, code) {
             $.alert({
                title: 'Are You Sure You Want to Delete ',
                content:  response.data.section,
                buttons: {
                    confirm: function (){
                        deleteSection(sectionid)
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


// Delete a section by its sectionid
function deleteSection(sectionid)
{
    $.ajax({
        type: "post",
        url: "/adminhome/sections/deletesection",
        data: { section_id: sectionid},
        dataType: "json",
        success: function (response, status, code) {
            getSections();
            notifySuccess(response.data.msg);
        },
        error: function (error) {
            //alert('Error'+error);
            notifySuccess(error.responseJSON.data.msg);
              
        }
    });
    
}

