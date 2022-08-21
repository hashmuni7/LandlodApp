/*
Name: 			pupils.js
Written by: 	KABUYE HASHIM MUNIIRU
ORMS Version: 	1.0
Description:    Handle all the requests and behaviors of teachers.blade.php
*/
var activeTable;
$(document).ready(function () {
    // Initialise the ajax headers to have the CSRF laravel token
    $.ajaxSetup({
        headers: { 'X-CSRF-TOKEN':  $("meta[name='csrf-token']").attr('content')}
    }); 

    // Initialise datatable
    dtInit();
    
    // Function to handle the creation of a new Teacher
    $('#addPupilBtn').click(function (e) { 
        if(e.detail !== 2)
        {       
                         
            addPupil();
        }
        
    });// end click event

    $('#pupilsTable').on('click', '.edit-btn', function (e) {
        e.preventDefault();
        fetchPupil($(this).attr('data-id'));
    });

    $('#classes').change(function (e) { 
        e.preventDefault();
       
        getStreams($('#classes').val());
    });

    // Click event for the update pupil details function
    $('#updatePupilBtn').click(function (e) { 
        if(e.detail !== 2)
        {       
                         
            updatePupil();
        }        
        
    });// end click event

    $('#pupilsTable').on('click', '.del-btn', function (e) {
        e.preventDefault();
        var name = $(this).closest('tr').find('td:eq(1)').text();
        
        askDeletePupil($(this).attr('data-id'), name);
    });

    $('#oldPupilsTable').on('click', '.view-btn', function (e) {
        e.preventDefault();
        fetchPupil($(this).attr('data-id'));

        
        $('.p-p').prop('disabled', true);
        $('#updatePupilBtn').addClass('hidden');
       
    });

    $('#oldPupilsTable').on('click', '.act-btn', function (e) {
        e.preventDefault();
        var name = $(this).closest('tr').find('td:eq(1)').text();
        
        askActivatePupil($(this).attr('data-id'), name);
    });

    $('#oldPupilsTable').on('click', '.del-btn', function (e) {
        e.preventDefault();
        var name = $(this).closest('tr').find('td:eq(1)').text();
        
        askDeletePupil($(this).attr('data-id'), name);
    });

    /*
	Modal Dismiss
	*/
	$(document).on('click', '.modal-dismiss', function (e) {
		e.preventDefault();
        resetPupilsModal();
        $.magnificPopup.close();
    });

    getOldPupils();
    //getOldPupilsForPerformance();

    $('#printPupils').click(function (e) {
        
        if(e.detail !== 2)
        {       
                         
            printPupils();
        }         
        
    });// end click event

    $('#printOldPupils').click(function (e) {
        
        if(e.detail !== 2)
        {       
                         
            printOldPupils();
        }         
        
    });// end click event

    $('#printPupil').click(function (e) {
        
        if(e.detail !== 2)
        {       
                         
            printAPupil();
        }         
        
    });// end click event
    
});



function printPupils()
{
    // var tableData = [];
    // $.ajax({
    //     type: "post",
    //     url: "/adminhome/pupils",
    //     data: {},            
    //     dataType: "json",
    //     success: function (response, status, code) {
    //         console.log(response);
            
    //         var  counter = 0;
    //         $.each(JSON.parse(response.data), function(key, val){
                
    //             tableData.push([
    //                 ++counter, 
    //                 (val.firstname + ' ' + val.lastname + ' ' + (val.othernames ? val.othernames : " ")),                    
    //                 (val.gender ? 'M': 'F'),
    //                 (val.initials + ' ' + val.classstream),
    //                 val.house,
    //                 val.age
    //             ]);
                
                
    //         });

            
    //         var doc = new jsPDF();
    //         // It can parse html:
            
        
    //         doc.setTextColor(headColor[0], headColor[1], headColor[2]);
    //         doc.setFontSize(headFontSize);
    //         doc.text(schoolName, schoolNameX, schoolNameY);
    //         doc.setTextColor(255, 0, 0);
    //         doc.text('PUPILS', 86, 32);
    //         doc.setLineWidth(1);
    //         doc.line(15, 36, 195, 36);
    //         doc.setFontSize(11);
    //         doc.setTextColor(100);

    //         doc.autoTable({        
    //             startY: 40,
    //             head: [
    //                 ['#', 'Name', 'Gender', 'Class', 'House', 'Age'],
    //             ],
    //             body: tableData,
                
    //         });

            
            
    //         doc.save('pupils_'+ displayDate(new Date())  +'.pdf');

           
            
            
    //     },
    //     error: function (error) {
    //         alert("No Response From Server");
    //     }
    // }); // end ajax call

    var tbl = $('#pupilsTable').clone();
    tbl.find('tr th:nth-child(7), tr td:nth-child(7)').remove();
    var doc = new jsPDF();  

    var pageSize = doc.internal.pageSize;
            var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
            var center = pageWidth / 2;
   
    doc.setTextColor(headColor[0], headColor[1], headColor[2]);
    doc.setFontSize(headFontSize);
    doc.text(schoolName, center, schoolNameY, 'center');    
    doc.text('PUPILS', center, 32, 'center');
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

    
    
    doc.save('pupils_'+ displayDate(new Date())  +'.pdf');
    
}

function printOldPupils()
{

    // var tableData = [];
    // $.ajax({
    //     type: "post",
    //     url: "/adminhome/pupils/old",
    //     data: {},            
    //     dataType: "json",
    //     success: function (response, status, code) {
    //         console.log(response);
    //         var jsonData = JSON.stringify(response.data.data)
    //         var  counter = 0;
    //         $.each(JSON.parse(jsonData), function(key, val){
                
    //             tableData.push([
    //                 ++counter, 
    //                 (val.firstname + ' ' + val.lastname + ' ' + (val.othernames ? val.othernames : " ")),                    
    //                 (val.gender ? 'M': 'F'),
    //                 (val.initials + ' ' + val.classstream),
    //                 val.house,
    //                 val.age
    //             ]);
                
                
    //         });

    var tbl = $('#oldPupilsTable').clone();
    tbl.find('tr th:nth-child(7), tr td:nth-child(7)').remove();
    var doc = new jsPDF();  

    var pageSize = doc.internal.pageSize;
            var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
            var center = pageWidth / 2;
            
            
            // It can parse html:
            
        
            doc.setTextColor(headColor[0], headColor[1], headColor[2]);
            doc.setFontSize(headFontSize);
            doc.text(schoolName, center, schoolNameY, 'center');           
            doc.text('OLD PUPILS', center, 32, 'center');
            doc.setDrawColor(headColor[0], headColor[1], headColor[2]);
            doc.setLineWidth(1);
            doc.line(15, 36, 195, 36);
            doc.setFontSize(11);
            doc.setTextColor(100);

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

            
            
            doc.save('old_pupils_'+ displayDate(new Date())  +'.pdf');

           
            
            
    //     },
    //     error: function (error) {
    //         alert("No Response From Server");
    //     }
    // }); // end ajax call

    
    
}

function displayDate(data)
{
    if(data)
    {
        return $.datepicker.formatDate('D, dd M yy', new Date(data));
    }
    else{
        return null;
    }
}

function dtInit()
{
    var t = $('#pupilsTable').DataTable({
        lengthMenu: [[10, 25, 50, 100, 200, -1], [10, 25, 50, 100, 200, 'All']]
    });
    activeTable = t;
    t.on( 'order.dt search.dt', function () {
        t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();

    var t1 = $('#oldPupilsTable').DataTable({
        lengthMenu: [[10, 25, 50, 100, 200, -1], [10, 25, 50, 100, 200, 'All']]
    });
    t1.on( 'order.dt search.dt', function () {
        t1.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();
    // if($.fn.dataTable.isDataTable('#pupilsTable'))
    // {
    //     $('#pupilsTable').DataTable().destroy();
    // }
	// 	var $table = $('#pupilsTable');

	// 	var table = $table.dataTable({
	// 		sDom: '<"text-right mb-md"T><"row"<"col-lg-6"l><"col-lg-6"f>><"table-responsive"t>p',
	// 		buttons: [ 'print', 'excel', 'pdf' ]
	// 	});

	// 	$('<div />').addClass('dt-buttons mb-2 pb-1 text-right').prependTo('#pupilsTable_wrapper');

	// 	$table.DataTable().buttons().container().prependTo( '#pupilsTable_wrapper .dt-buttons' );

	// 	$('#pupilsTable_wrapper').find('.btn-secondary').removeClass('btn-secondary').addClass('btn-default');
    
}

function printAPupil()
{

    //Get the element to print
            var element = document.getElementById('printablePupil');

            // Define optional configuration
            var options = {
            filename: 'teacher.pdf',
            
            };

            // Create instance of html2pdf class
            // html2pdf().from().toPdf().get('pdf').then(function(pdf){

            // })
            var exporter = new html2pdf(element, {
                margin: [40, 37],
                filename: 'teacher.pdf'
            });
            exporter.getPdf(false).then((pdf) => {
                //console.log('doing something before downloading pdf file');
                pdf.setTextColor(headColor[0], headColor[1], headColor[2]);
                pdf.setFontSize(headFontSize);
                pdf.text(schoolName, schoolNameX, schoolNameY);                
                pdf.text('PUPIL', 87, 32);
                pdf.setDrawColor(headColor[0], headColor[1], headColor[2]);
                pdf.setLineWidth(1);
                pdf.line(15, 36, 195, 36);
                pdf.setFontSize(11);
                pdf.setTextColor(100);
                pdf.save('pupil_'+ displayDate(new Date())  +'.pdf');
              });
    
}

function addPupil()
{
     

    //console.log(subjects);
    if($('#addPupilsForm').valid()) // Test if all Form Fields are validated
        {
            
            // ajax request to add a new section to the database
            $.ajax({
                type: "post",
                url: "/adminhome/pupils/addpupil", 
                data: { 
                    first_name: $('#firstname').val(),
                    last_name: $('#lastname').val(),
                    other_names: $('#othernames').val(),
                    year_of_entry: $('#yearOfEntry').val(),                   
                    class_and_stream_id: $('#streams').val(),
                    house_id: $('#houses').val(),
                    fees_id: $('#fees').val(),
                    gender: parseInt($('#pupilSex input:checked').val()),
                    date_of_birth: $('#dob').val(),                    
                },
                dataType: "json",
                success: function (response, status, code) {
                     
                                        
                    $.magnificPopup.close();
                    resetPupilsModal();
                    notifySuccess(response.data.msg);
                    getPupils();
                    console.log(response);
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
                        $('#res').append(error.responseText);
                        var json = JSON.parse(error.responseText);
                        console.log(json.data.msg);
                        notifyFail(json.data.msg);
                    }
                      
                }
            }); // end ajax call
        }// end if
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
            return true;
        },
        error: function (error) {
            alert('Error '+ error);
              
        }
    });
}

// Reset the input fields of the Form on the Modal
// Unhide the Register btn
// Hide the update button
// Set all fields to null
function resetPupilsModal()
{
    $('#addPupilBtn').show();
    $('#printAPupilPanel').addClass('hidden');
    $('#updatePupilBtn').addClass('hidden');
    $('#heading').html('Register a New Pupil');
    $('#pupilid').val(null);
    $('#firstname').val(null);
    $('#lastname').val(null);

    $('#othernames').val(null);
    $('#yearOfEntry').val(null);
   
    $('#streams').val(null);
    $('#houses').val(null);
    $('#fees').val(null);
    //$('#pupilSex input:checked').val();
    $('#dob').val(null);

    
    $('#pupilStatus').addClass('hidden');
    $('.p-p').prop('disabled', false);
       
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


// Fetch pupil details by the pupilid
function fetchPupil(pupilid)
{
    $('#pupilsForm').trigger('loading-overlay:show');
    $('#addPupilBtn').hide();// Hide the register Button and show Update Btn
    $('#updatePupilBtn').removeClass('hidden');
    $('#pupilStatus').removeClass('hidden');
    $('#heading').html('Update Pupil Details');
    $('#printAPupilPanel').removeClass('hidden');
    

    pupilid = parseInt(pupilid);

    // Pop up the Modal
    $.magnificPopup.open({
        items: {
            src: '#modalAnim'
        },
        type: 'inline',
        callbacks: {
            close: function(){                
                resetPupilsModal();               
            }
          }
    });

    
    $.ajax({
        type: "post",
        url: "/adminhome/pupils/getpupilbyid",
        data: { pupil_id: pupilid},
        dataType: "json",
        success: function (response, status, code) {
            console.log(response);
            
            $('#classes').val(response.data.data.classid);
            getClassAndSetStream(response.data.data.classid, response.data.data.classandstreamid)
             
            
            $('#pupilid').val(response.data.data.pupilid);
            $('#firstname').val(response.data.data.firstname);
            $('#lastname').val(response.data.data.lastname);

            $('#othernames').val(response.data.data.othernames);
            
            response.data.data.gender ? $('#male').prop('checked', true) : $('#female').prop('checked', true);
            
            $('#yearOfEntry').val(getDate(response.data.data.yearjoined));
            
            
            //getStreams(response.data.data.classid);
            
            $('#houses').val(response.data.data.houseid);
            $('#fees').val(response.data.data.feesid);
            response.data.data.status ? $('#statusActive').prop('checked', true) : $('#statusInactive').prop('checked', true);
            
            $('#dob').val(getDate(response.data.data.dob)); 
            $('#dateleft').val(getDate(response.data.data.dateleft));                      
            
             
            $('#pupilsForm').trigger('loading-overlay:hide');
            //openModal();
        },
        error: function (error) {
            //alert('Error!  '+ error.responseJSON.data.msg);
            $('#res').append(error.responseText);
            console.log(error);  
        }
    });

    
    
}

// This function will enable the datepickers to set the correct date
// if data is null, the date field will not be changed, it will be emptied
function getDate(data)
{

    if(data)
    {
        return String($.datepicker.formatDate('yy-mm-dd', new Date(data)));
    }
    else{
        return null;
    }
}

function displayDate(data)
{
    if(data)
    {
        return $.datepicker.formatDate('D, dd M yy', new Date(data));
    }
    else{
        return null;
    }
}

function getClassAndSetStream(classid, classandstreamid)
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
            $('#streams').val(classandstreamid);
        },
        error: function (error) {
            alert('Error '+ error);
              
        }
    });
}

function updatePupil()
{
     

    //console.log(subjects);
    if($('#addPupilsForm').valid()) // Test if all Form Fields are validated
        {
            
            // ajax request to add a new section to the database
            $.ajax({
                type: "post",
                url: "/adminhome/pupils/updatepupil", 
                data: {
                    pupil_id: $('#pupilid').val(), 
                    first_name: $('#firstname').val(),
                    last_name: $('#lastname').val(),
                    other_names: $('#othernames').val(),
                    year_of_entry: $('#yearOfEntry').val(),                   
                    class_and_stream_id: $('#streams').val(),
                    house_id: $('#houses').val(),
                    fees_id: $('#fees').val(),
                    gender: parseInt($('#pupilSex input:checked').val()),
                    date_of_birth: $('#dob').val(),
                    status: parseInt($('#pupilStatus input:checked').val()),
                    date_left: $('#dateLeft').val(),
                },
                dataType: "json",
                success: function (response, status, code) {
                     console.log(response);
                                        
                    $.magnificPopup.close();
                    resetPupilsModal();
                    notifySuccess(response.data.msg);
                    getPupils();
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


function getPupils()
{
    $.ajax({
        type: "post",
        url: "/adminhome/pupils",
        data: {},            
        dataType: "json",
        success: function (response, status, code) {
            console.log(response);
            // First destroy the DataTable Before creating a new one
            $('#pupilsTable').DataTable().destroy();
            
             // Create a new dataTable and assign it to a variable t
             var t = $("#pupilsTable").DataTable({
                data: JSON.parse(response.data),
                columns: [
                    { data: null },
                    { data: 'firstname', render: function (d, type, all) { return all.firstname + ' ' + all.lastname + ' ' + (all.othernames  ? all.othernames : " ");} },
                    { data: 'gender', render: function (d) { return d ? 'M' : 'F';}},
                    { data: 'initials', render: function (d, type, all) { return all.initials + ' ' + all.classstream;} },
                    { data: 'house'},
                    { data: 'age'},
                    { data: 'pupilid'}                       
                ],
                columnDefs: [ {
                    targets: 0,
                    order: [[ 1, 'asc' ]]
                  } ],
                columnDefs: [ {
                    targets: 6,
                    data: 'pupilid',
                    className: 'actions-hover actions-fade',
                    render: function ( data) {
                                    return '<a class="modal-with-zoom-anim ws-normal context-menu pointer edit-btn" href="#modalAnim" data-id="'+ data + '">'+ 
                                    '<i class="fas fa-pencil-alt"></i>Edit</a>' + 
                                    ' <a class="ws-normal context-menu pointer del-btn" data-id="'+ data + '"><i class="fas fa-trash"></i>Delete</a>';
                                }
                  } ],
                  lengthMenu: [[10, 25, 50, 100, 200, -1], [10, 25, 50, 100, 200, 'All']]  
            });

            activeTable = t;
            // Use var t to assign a counter column onto the table
            t.on( 'order.dt search.dt', function () {
                t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                    cell.innerHTML = i+1;
                } );
            } ).draw(); 

            //dtInit();
            
            
        },
        error: function (error) {
            alert("No Response From Server");
        }
    }); // end ajax call
}

function getOldPupils()
{
    $.ajax({
        type: "post",
        url: "/adminhome/pupils/old",
        data: {},            
        dataType: "json",
        success: function (response, status, code) {
            // First destroy the DataTable Before creating a new one
            $('#oldPupilsTable').DataTable().destroy();
            var tableData = JSON.stringify(response.data.data);
             // Create a new dataTable and assign it to a variable t
             var t = $("#oldPupilsTable").DataTable({
                data: JSON.parse(tableData),
                columns: [
                    { data: null },
                    { data: 'firstname', render: function (d, type, all) { return all.firstname + ' ' + all.lastname + ' ' + (all.othernames ? all.othernames : " ");} },
                    { data: 'gender', render: function (d) { return d ? 'M' : 'F';}},
                    { data: 'initials', render: function (d, type, all) { return all.initials + ' ' + all.classstream;} },
                    { data: 'house'},
                    { data: 'age'},
                    { data: 'pupilid'}                       
                ],
                columnDefs: [ {
                    targets: 0,
                    order: [[ 1, 'asc' ]]
                  } ],
                columnDefs: [ {
                    targets: 6,
                    data: 'pupilid',
                    className: 'actions-hover actions-fade',
                    render: function ( data) {
                                    return '<a class="modal-with-zoom-anim ws-normal context-menu pointer view-btn" href="#modalAnim" data-id="'+ data + '">'+ 
                                    '<i class="fas fa-pencil-alt"></i>View</a>' + 
                                    ' <a class="ws-normal context-menu pointer act-btn" data-id="'+ data + '"><i class="fas fa-trash"></i>Activate</a>' +
                                    ' <a class="ws-normal context-menu pointer del-btn" data-id="'+ data + '"><i class="fas fa-trash"></i>Delete</a>';
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

            //dtInit();
            
            
        },
        error: function (error) {
            alert("No Response From Server");
        }
    }); // end ajax call
}

function getOldPupilsForPerformance()
{
    $.ajax({
        type: "post",
        url: "/adminhome/pupils/old",
        data: {},            
        dataType: "json",
        success: function (response, status, code) {
            // First destroy the DataTable Before creating a new one
            $('#oldPupilsTableForPerformance').DataTable().destroy();
            var tableData = JSON.stringify(response.data.data);
             // Create a new dataTable and assign it to a variable t
             var t = $("#oldPupilsTableForPerformance").DataTable({
                data: JSON.parse(tableData),
                columns: [
                    { data: null },
                    { data: 'firstname', render: function (d, type, all) { return all.firstname + ' ' + all.lastname + ' ' + (all.othernames ? all.othernames : " ");} },
                    { data: 'gender', render: function (d) { return d ? 'M' : 'F';}},
                    { data: 'initials', render: function (d, type, all) { return all.initials + ' ' + all.classstream;} },
                    { data: 'house'},
                    { data: 'age'},
                    { data: 'pupilid'}                       
                ],
                columnDefs: [ {
                    targets: 0,
                    order: [[ 1, 'asc' ]]
                  } ],
                columnDefs: [ {
                    targets: 6,
                    data: 'pupilid',
                    className: 'actions-hover actions-fade',
                    render: function ( data) {
                                    return '<a class="modal-with-zoom-anim ws-normal context-menu pointer view-performance-btn" href="#modalAnim" data-id="'+ data + '">'+ 
                                    '<i class="fas fa-eye"></i>View</a>';
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

            //dtInit();
            
            
        },
        error: function (error) {
            alert("No Response From Server");
        }
    }); // end ajax call
}

// Pop up a confirm dialog to delete a pupil
function askDeletePupil(pupilid, name)
{
    
    pupilid = parseInt(pupilid);
    $.alert({
        title: 'Are You Sure You Want to Delete',
        content:  name,
        buttons: {
            confirm: function (){
                deletePupil(pupilid)
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

// Delete pupil by the pupilid
function deletePupil(pupilid)
{
    $.ajax({
        type: "post",
        url: "/adminhome/pupils/deletepupil",
        data: { pupil_id: pupilid},
        dataType: "json",
        success: function (response, status, code) {
           getPupils();
            notifySuccess(response.data.msg);
        },
        error: function (error) {
            alert('Error '+ error);
              
        }
    });
    
}

// Pop up a confirm dialog to activate a pupil
function askActivatePupil(pupilid, name)
{
    
    pupilid = parseInt(pupilid);
    $.alert({
        title: 'Are You Sure You Want to Activate',
        content:  name,
        buttons: {
            confirm: function (){
                activatePupil(pupilid)
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

// Delete pupil by the pupilid
function activatePupil(pupilid)
{
    $.ajax({
        type: "post",
        url: "/adminhome/pupils/activatepupil",
        data: { pupil_id: pupilid},
        dataType: "json",
        success: function (response, status, code) {
           getPupils();
           getOldPupils();
            notifySuccess(response.data.msg);
        },
        error: function (error) {
           // alert('Error '+ error);
           notifyFail(error.responseJSON.data.msg);   
        }
    });
    
}