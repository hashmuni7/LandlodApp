/*
Name: 			classprofile.js
Written by: 	KABUYE HASHIM MUNIIRU
ORMS Version: 	1.0
Description:    Handle all the requests and behaviors of classprofile.blade.php
*/
var className;
$(document).ready(function () {
    // Initialise the ajax headers to have the CSRF laravel token
    $.ajaxSetup({
        headers: { 'X-CSRF-TOKEN':  $("meta[name='csrf-token']").attr('content')}
    }); // end ajax header initialisation

    className = $('#initialsOfClass').contents().get(0).nodeValue;

    // new PNotify({
    //             title: 'Congratulations',
    //             text: 'A new Class has been Created',
    //             type: 'custom',
    //             addclass: 'notification-success',
    //             icon: 'fas fa-check'
    //         });
    $('.edit-btn').click(function (e) { 
        e.preventDefault();
        // Fetch the values from the page instead of database
        $('#class').val($('#nameOfClass').contents().get(0).nodeValue);
        $('#classinitials').val($('#initialsOfClass').contents().get(0).nodeValue);
        $('#classSection').val(parseInt($('#nameOfSection').attr('data-sectionid')));
        $('#classTeacher').val(parseInt($('#nameOfClassTeacher').attr('data-teacherid')));
    });

    
    // Click event for the update class function
    $('#updateClassBtn').click(function (e) {         
        if(e.detail !== 2)
        {       
                         
            updateClassDetails();
        }
        
    });// end click event

    // Click event for the delete class function
    $('#deleteClassBtn').click(function (e) {         
        
        askDeleteClass();
    });// end click event

    // Click event for the add stream function
    $('#addStreamBtn').click(function (e) { 
        if(e.detail !== 2)
        {       
                         
            addStream();
        }        
        
    });// end click event

    // Click event for the add stream function
    $('#editRankBtn').click(function (e) {         
        $('#classRankPanel').removeClass('hidden');
        $(this).addClass('hidden');
    });// end click event

    // Initialise all the datatables on the page
    dtInit();
    

    $('#editClassRankBtn').click(function (e) { 
        e.preventDefault();

        if(e.detail !== 2)
        {       
                         
             // ajax request to create a new class to the database
                $.ajax({
                    type: "post",
                    url: "/adminhome/classes/rerankclasses", 
                    data: { 
                        ranks: $('#nestable-output').val()
                    },
                    dataType: "json",
                    success: function (response, status, code) {
                        //console.log(response);
                        notifySuccess(response.data.msg);
                        reloadClasses();
                        $('#classRankPanel').addClass('hidden');
                        $('#editRankBtn').removeClass('hidden');
                        
                    },
                    error: function (error) {
                        notifyFail(error.responseJSON.data.msg);
                        //console.log(error);
                        //alert('Failed');
                    }
                }); // end ajax call
        }
        
    });

    $('#editStreamRankBtn').click(function (e) { 
        e.preventDefault();
        if(e.detail !== 2)
        {       
                         
             // ajax request to edit the ranks of a stream to the database
                $.ajax({
                    type: "post",
                    url: "/adminhome/classes/class/rerankstreams", 
                    data: { 
                        ranks: $('#streamNestable-output').val()
                    },
                    dataType: "json",
                    success: function (response, status, code) {
                        //console.log(response);
                        //alert('Sucess');
                        notifySuccess(response.data.msg);
                        getStreams();
                        
                    },
                    error: function (error) {
                        //console.log(error);
                    // alert('Failed');

                    }
                }); // end ajax call
        }
        
    });

    // Events to handle the editing of a stream
    $('#streamsTable').on('click', '.edit-stream-btn', function (e) {
        e.preventDefault();
        fetchStream($(this).attr('data-id'));
    });

    $('#streamsTable').on('click', '.del-stream-btn', function (e) {
        e.preventDefault();
        var streamName = $(this).closest('tr').find('td:eq(1)').text();
        
        askDeleteStream($(this).attr('data-id'), streamName);
    });

    // Click event for the update amount function
    $('#updateStreamBtn').click(function (e) {
        if(e.detail !== 2)
        {       
                         
            updateStream();
        }         
        
    });// end click event
    /*
	Modal Dismiss
	*/
	$(document).on('click', '.modal-dismiss', function (e) {
		e.preventDefault();
        resetStreamsModal();
        $('.subjects input').prop('checked', false); 
        $.magnificPopup.close();
    });

    // Click event for the save subjects done by class
    $('#addSubjectBtn').click(function (e) {
        if(e.detail !== 2)
        {       
                         
           tickSubjectDoneByClass();
        }         
        
    });// end click event

    // Click event for the save subjects done by class
    $('#saveSubjectsBtn').click(function (e) { 
        if(e.detail !== 2)
        {       
                         
            addSubjectsDoneByClass();
        }        
        
    });// end click event

    getSubjectTeachersTables();
    // Events to handle the adding a teacher of a certain subject
    $('#subjectTeachersSection').on('click', '.add-a-teacher', function (e) {
        e.preventDefault();
        //alert($(this).attr('data-subjectid') + " " + $(this).attr('data-subjectbyclassid'));
       getTeachersOfASubject($(this).attr('data-subjectid'), $(this).attr('data-subjectbyclassid'));
        //fetchStream($(this).attr('data-id'));
    });

    $('#subjectTeachersSection').on('click', '.remove-teacher-btn', function (e) {
        e.preventDefault();
        var teacherid = $(this).attr('data-teacherid');
        var subjectbyclassid = $(this).closest('table').attr('data-subjectbyclassid');
        removeTeacherFromSubject(teacherid, subjectbyclassid);
        //alert('teacherid: ' + teacherid +' subjectbyclassid: ' + subjectbyclassid);
    });
    

    // Click event for the save teachers of a subject
    $('#saveTeacherOfSubjectBtn').click(function (e) { 
        if(e.detail !== 2)
        {       
                         
            saveTeachersToTeachSubject();
        }        
        
    });// end click event

    // Click event to put focus on the input field
    // This needs the setTimeOut function to allow the Modal to load
    // on to the DOM
    $('#addToStreamTable').click(function (e) { 
        setTimeout(function () { 
            $('#streamName').focus();
         }, 150);        
    });// end click event 


    getSubjectDoneByClass();

    $('#fetchPupilsBtn').on('click', function (e) {
        e.preventDefault();
        if(e.detail !== 2)
        {       
                         
            if($('#fetchPupilForm').valid())
            {
                $('#printClass').removeClass('hidden');
                getClassOfTerm();
            }
            else{
                $('#printClass').addClass('hidden');
            }
            
        }                       
        
        
    });

    $('#printClass').click(function (e) {
        
        if(e.detail !== 2)
        {       
                         
            printClass();
            
        }         
        
    });// end click event
});

function dtInit()
{
    // Create a dataTable
    var classDT = $('#classRanksTable').DataTable();
    // Use var t to assign a counter column onto the table
    classDT.on( 'order.dt search.dt', function () {
        classDT.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw(); 

    // Create a Streams dataTable
    var streamsDT = $('#streamsTable').DataTable();
    streamsDT.on( 'order.dt search.dt', function () {
        streamsDT.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();

    // Create a Streams dataTable for the ranks
    var streamRankDT = $('#ranksOfStreamsTable').DataTable();
    streamRankDT.on( 'order.dt search.dt', function () {
        streamRankDT.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();

    // Create a Streams dataTable for the ranks
    var subjectsDoneDT = $('#subjectsDoneTable').DataTable();
    subjectsDoneDT.on( 'order.dt search.dt', function () {
        subjectsDoneDT.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();

    // Create a Streams dataTable for the ranks
    var pupilsDT = $('#pupilsOfClassTable').DataTable({
        lengthMenu: [[10, 25, 50, 100, 200, -1], [10, 25, 50, 100, 200, 'All']]
    });
    pupilsDT.on( 'order.dt search.dt', function () {
        pupilsDT.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();
}

// Update the Class Details
// Get the field to update from the input field
function updateClassDetails()
{
    
        if($('#classDetailsForm').valid()) // Test if all Form Fields are validated
        {
            $.ajax({
                type: "post",
                url: "/adminhome/classes/classprofile/updateclassdetails",
                data: { class_id: parseInt($('#cid').val()),
                        class: $('#class').val(), 
                        class_initials: $('#classinitials').val().toUpperCase(),
                        section_id : $('#classSection').val(),
                        teacher_id : $('#classTeacher').val()
                    },
                dataType: "json",
                success: function (response, status, code) {
                    $.magnificPopup.close();                        
                    notifySuccess(response.data.msg);
                    $('#nameOfClass').html(response.data.data.class);
                    $('#pageHead').html(response.data.data.class + ' Class Profile');
                    $('#initialsOfClass').html(response.data.data.initials);
                    className = response.data.data.initials;
                    
                    var section = $('#classSection option[value="'+ response.data.data.sectionid +'"]').text();
                    
                    $('#nameOfSection').html(section);
                    $('#nameOfSection').attr('data-sectionid', String(response.data.data.sectionid));
                                       
                    var teacher = $('#classTeacher option[value="'+ response.data.data.teacherid +'"]').text();
                    
                    $('#nameOfClassTeacher').html(teacher);
                    $('#nameOfClassTeacher').attr('data-teacherid', String(response.data.data.teacherid));
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
                    console.log(error);  
                }
            }); // end ajax call
        }// end if
        
    
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

function reloadClasses()
{
    $.ajax({
        type: "post",
        url: "/adminhome/classes/getclassesfordt",
        data: {},            
        dataType: "json",
        success: function (response, status, code) {
            
            // First destroy the DataTable Before creating a new one
            $('#classRanksTable').DataTable().destroy();
            
             // Create a new dataTable and assign it to a variable t
             var t = $("#classRanksTable").DataTable({
                data: JSON.parse(response.data),
                columns: [
                    { data: null },
                    { data: 'class'},
                    { data: 'section'},
                    { data: 'rank' }                       
                ],
                columnDefs: [ {
                    targets: 0,
                    order: [[ 1, 'asc' ]]
                  } ],
                  
            });

            // Use var t to assign a counter column onto the table
            t.on( 'order.dt search.dt', function () {
                t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                    cell.innerHTML = i+1;
                } );
            } ).draw(); 
            var data = JSON.parse(response.data)
            $('.dd-list').empty();
            $.each(data, function(key, val){
                var newClass = '\
                    <li class="dd-item" data-id="'+ val.classid +'" id="newItem">\
                        <div class="dd-handle" id="newClass">\
                            <label id="newClassName">'+ val.class +'</label>\
                            <label class="float-right" id="newClassSection">'+ val.section +'</label>\
                        </div>\
                    </li>\
                ';
                $('.dd-list').append(newClass);
            });
            
        
        },
        error: function (error) {
            alert("No Response From Server");
        }
    }); // end ajax call
}

function addStream()
{
         
    if($('#addStreamsForm').valid()) // Test if all Form Fields are validated
        {
            
            // ajax request to add a new section to the database
            $.ajax({
                type: "post",
                url: "/adminhome/classes/class/addstream", 
                data: { 
                    class_id: $('#cid').val(),
                    stream_name: $('#streamName').val(),
                    teacher_id : $('#streamHead').val()
                },
                dataType: "json",
                success: function (response, status, code) { 
                    console.log(response);                                                            
                    $.magnificPopup.close();
                    resetStreamsModal();
                    notifySuccess(response.data.msg);
                    getStreams();
                },
                error: function (error) {
                    if(error.status == 400) // if there is a client error
                    {
                        $.each(error.responseJSON.errors, function(key, val){                           
                            warnByName($("input[name='" + key + "']"), val);
                        });                                                
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

// Fetch teacher details by the teacherid
function fetchStream(streamid)
{
    $('#streamsForm').trigger('loading-overlay:show');
    $('#addStreamBtn').hide();// Hide the register Button and show Update Btn
    $('#updateStreamBtn').removeClass('hidden');
    
    $('#headingStreamsForm').html('Update Stream Details');
    

    streamid = parseInt(streamid);
    // Pop up the Modal
    $.magnificPopup.open({
        items: {
            src: '#streamModal'
        },
        type: 'inline',
        callbacks: {
            close: function(){                
                resetStreamsModal();               
            }
          }
    });
    
    $.ajax({
        type: "post",
        url: "/adminhome/classes/class/streamdetailsbyid",
        data: { stream_id: streamid},
        dataType: "json",
        success: function (response, status, code) {                        
            $('#streamid').val(response.data.data.classandstreamid);
            $('#streamName').val(response.data.data.classstream);
            $('#streamHead').val(response.data.data.teacherid);
            

            
            $('#streamsForm').trigger('loading-overlay:hide');
            //openModal();
        },
        error: function (error) {
            //alert('Error!  '+ error.responseJSON.data.msg);
            $('#res').append(error.responseText);
            console.log(error);  
        }
    });
    
}

function updateStream()
{
         
    if($('#addStreamsForm').valid()) // Test if all Form Fields are validated
        {
            
            // ajax request to add a new section to the database
            $.ajax({
                type: "post",
                url: "/adminhome/classes/class/updatestream", 
                data: { 
                    stream_id: $('#streamid').val(),
                    stream_name: $('#streamName').val(),
                    teacher_id : $('#streamHead').val()
                },
                dataType: "json",
                success: function (response, status, code) {                                                           
                    $.magnificPopup.close();
                    resetStreamsModal();
                    notifySuccess(response.data.msg);
                    getStreams();
                },
                error: function (error) {
                    if(error.status == 400) // if there is a client error
                    {
                        $.each(error.responseJSON.errors, function(key, val){                           
                            warnByName($("input[name='" + key + "']"), val);
                        });                                                
                        notifyFail('Failed');
                        console.log(error);
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

function resetStreamsModal()
{
    // Hide the update Button and show register Btn
    $('#updateStreamBtn').addClass('hidden');
    $('#addStreamBtn').show();
    
    $('#headingStreamsForm').html('Register New Stream of Class');
    $('#streamName').val(null);
    $('#streamHead').val(null);
    $('#streamid').val(null); 
}


function getStreams()
{
    $.ajax({
        type: "post",
        url: "/adminhome/classes/class/getstreamsbyclass",
        data: {
            class_id: $('#cid').val()
        },            
        dataType: "json",
        success: function (response, status, code) {
            // First destroy the DataTable Before creating a new one
            $('#streamsTable').DataTable().destroy();
            $('#ranksOfStreamsTable').DataTable().destroy();
            
             // Create a new dataTable and assign it to a variable t
             var t = $("#streamsTable").DataTable({
                data: JSON.parse(response.data),
                columns: [
                    { data: null },
                    { data: 'classstream', render: function(d, type, all){return all.initials + ' ' + all.classstream;} },                   
                    { data: 'num'},
                    { data: 'firstname', render: function (d, type, all) { 
                        if(all.firstname){return 'Tr ' +  all.firstname + ' ' + all.lastname;}
                        else{return  'Tr ';}
                        } 
                    },                   
                    { data: 'classandstreamid'}                       
                ],
                
                columnDefs: [ {
                    targets: 4,
                    data: 'classandstreamid',
                    className: 'actions-hover actions-fade',
                    render: function ( data) {
                                    return '<a class="modal-with-zoom-anim ws-normal  edit-stream-btn" href="#streamModal" data-id="'+ data + '">'+ 
                                    '<i class="fas fa-pencil-alt"></i>Edit</a>' + 
                                    ' <a class="ws-normal  pointer del-stream-btn" data-id="'+ data + '"><i class="fas fa-trash"></i>Delete</a>';
                                }
                  } ],  
            });
            // Use var t to assign a counter column onto the table
            t.on( 'order.dt search.dt', function () {
                t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                    cell.innerHTML = i+1;
                } );
            } ).draw(); 

            // Create a new dataTable and assign it to a variable t
            var streamRanksTbl = $("#ranksOfStreamsTable").DataTable({
                data: JSON.parse(response.data),
                columns: [
                    {data: null },
                    { data: 'initials', render: function (d, type, all) { 
                        if(all.classstream){return  all.initials + ' ' + all.classstream;}
                        else{return  all.classstream;}
                        } 
                    },                                       
                    { data: 'rank'}                       
                ],
                columnDefs: [ {
                    targets: 1,
                    order: [[ 1, 'asc' ]]
                  } ],
                              
            });
            // Use var t to assign a counter column onto the table
            streamRanksTbl.on( 'order.dt search.dt', function () {
                streamRanksTbl.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                    cell.innerHTML = i+1;
                } );
            } ).draw(); 
            streamList = JSON.parse(response.data);
            
            $('#streamList').empty();
            $.each(streamList, function(key, val){
                
                var item = '\
                    <li class="dd-item" data-id="'+ val.classandstreamid +'">\
                        <div class="dd-handle">'+ val.initials + ' ' + val.classstream +'</div>\
                    </li>\
                ';
                $('#streamList').append(item);
            });

            
            
            $('#streams').empty();
            $('#streams').append('<option value="0">All Streams</option>');
            
            $.each(streamList, function(key, val){
                
                var stream = '<option value="'+ val.classandstreamid +'">'+ val.classstream +'</option>';
                $('#streams').append(stream);
            });
            $('#numberOfStreams').html(streamList.length);
                                            
        },
        error: function (error) {
            alert("No Response From Server");
        }
    }); // end ajax call
}

function askDeleteStream(streamid, streamName)
{
    
    streamid = parseInt(streamid);
    $.alert({
        title: 'Are You Sure You Want to Delete',
        content:  streamName,
        buttons: {
            confirm: function (){
               deleteStream(streamid)
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

// Delete subject by its subjectid
function deleteStream(streamid)
{
    $.ajax({
        type: "post",
        url: "/adminhome/classes/class/deletestream",
        data: { stream_id: streamid},
        dataType: "json",
        success: function (response, status, code) {
            getStreams();
            notifySuccess(response.data.msg);
        },
        error: function (error) {
            alert('Error '+ error);
              
        }
    });
    
}

function askDeleteClass()
{

    $.alert({
        title: 'Are You Sure You Want to Delete',
        content:  $('#nameOfClass').html(),
        buttons: {
            confirm: function (){
               deleteClass(parseInt($('#cid').val()))
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

// Delete subject by its subjectid
function deleteClass(classid)
{
    $.ajax({
        type: "post",
        url: "/adminhome/classes/class/deleteclass",
        data: { class_id: classid},
        dataType: "json",
        success: function (response, status, code) {
           
            notifySuccess(response.data.msg);
            goToViewClasses();
        },
        error: function (error) {
           // alert('Error '+ error);
            notifyFail(error.responseJSON.data.msg);
              
        }
    });
    
}

// Go to class profile page after class creation
function goToViewClasses()
{
    var url = '/adminhome/classes/viewclasses';
    var link = $(location).attr('origin') + url;
    window.location.replace(link);
}

function addSubjectsDoneByClass()
{
    var subjects = [null];
    $('.subjects input:checked').each(
        function(){
            subjects.push(parseInt($(this).val()));
        }
    );

    //console.log(subjects);
    if($('#subjectsDoneForm').valid()) // Test if all Form Fields are validated
        {
            
            // ajax request to add a new section to the database
            $.ajax({
                type: "post",
                url: "/adminhome/classes/class/classsubjects", 
                data: { 
                    class_id: $('#cid').val(),                    
                    subjects: subjects
                },
                dataType: "json",
                success: function (response, status, code) {
                     
                     $('.subjects input').prop('checked', false);                    
                    $.magnificPopup.close();
                    
                    notifySuccess(response.data.msg);
                    getSubjectDoneByClass();
                    getSubjectTeachersTables();
                    console.log(response);
                },
                error: function (error) {
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
                        //var json = JSON.parse(error.responseText);
                        console.log(error);
                        //notifyFail(json.data.msg);
                    }
                      
                }
            }); // end ajax call
        }// end if
}

function tickSubjectDoneByClass()
{
    $.ajax({
        type: "post",
        url: "/adminhome/classes/class/doneclasssubjects",
        data: { class_id: parseInt($('#cid').val())},
        dataType: "json",
        success: function (response, status, code) {                        
            
                        
            $.each(response.data.data, function(key, val){
                if(val.status)
                {
                    $('.subjects input[value='+ val.subjectid +']').prop('checked', true);
                }
            });

            
            //$('#teachersForm').trigger('loading-overlay:hide');
            //openModal();
        },
        error: function (error) {
            //alert('Error!  '+ error.responseJSON.data.msg);
            $('#res').append(error.responseText);
            console.log(error);  
        }
    });
}

function getSubjectDoneByClass()
{
   
    $.ajax({
        type: "post",
        url: "/adminhome/classes/class/doneclasssubjects",
        data: { class_id: parseInt($('#cid').val())},
        dataType: "json",
        success: function (response, status, code) {                        
            
            var json = JSON.stringify(response.data.data);
            //console.log(JSON.parse(response.data));        
            //console.log(JSON.parse(json));
            // First destroy the DataTable Before creating a new one
            $('#subjectsDoneTable').DataTable().destroy();
            
            
             // Create a new dataTable and assign it to a variable t
             var t = $('#subjectsDoneTable').DataTable({
                data: JSON.parse(json),
                columns: [
                    { data: null },
                    { data: 'subject' },                   
                    { data: 'status', render: function (d) { return d ? 'Active' : 'Inactive';}}                       
                ],
                              
            });
            // Use var t to assign a counter column onto the table
            t.on( 'order.dt search.dt', function () {
                t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                    cell.innerHTML = i+1;
                } );
            } ).draw();
            
            //$('#teachersForm').trigger('loading-overlay:hide');
            //openModal();
        },
        error: function (error) {
            //alert('Error!  '+ error.responseJSON.data.msg);
            $('#res').append(error.responseText);
            console.log(error);  
        }
    });
}

function getSubjectTeachersTables()
{
    $.ajax({
        type: "post",
        url: "/adminhome/classes/class/subjectteacherstables",
        data: { class_id: parseInt($('#cid').val())},
        dataType: "json",
        success: function (response, status, code) {                        
            console.log(response.data.data);
            //var json = JSON.stringify(response.data.data);
            //console.log(JSON.parse(response.data));        
            //console.log(JSON.parse(json));
            $('#subjectTeachersSection').empty();
            $.each(response.data.data, function(key, val){
                
            var aSection = '\
                <div class="col-md-4 px-3">\
                <h3 class="center">' + val.nameSubject +'</h3>\
                    <div class="container-fluid">\
                         <a class="modal-with-zoom-anim ws-normal btn btn-primary w-100 mb-3 add-a-teacher" data-subjectid="' + val.idSubject +'" data-subjectbyclassid="' + val.idSubjectByClass +'" href="#addTeacher">Add Teacher</a> \
                    </div>\
                    <table class="table" id="' + val.idSubject +'Teachers" data-subjectbyclassid="' + val.idSubjectByClass +'">\
                    <thead>\
                            <th>Name</th>\
                            <th>Action</th>\
                    </thead>\
                    <tbody>\
                            \
                    </tbody>\
                    </table>\
                </div>\
            ';

                $('#subjectTeachersSection').prepend(aSection);
                var json = JSON.stringify(val.teachers);
                var tableSelector = '#'+ val.idSubject + 'Teachers';
                if($.fn.dataTable.isDataTable(tableSelector))
                {
                    $(tableSelector).DataTable().destroy();
                }
                $(tableSelector).DataTable({
                    data: JSON.parse(json),
                    columns: [                        
                        { data: 'firstname', render: function (d, type, all) { return all.firstname + ' ' + all.lastname;} },                      
                        { data: 'teacherid'}                       
                    ],
                    columnDefs: [ {
                        targets: 1,
                        data: 'teacherid',
                        className: 'actions-hover actions-fade',
                        render: function ( data) {
                                        return ' <a class="ws-normal context-menu pointer remove-teacher-btn" data-teacherid="'+ data + '"><i class="fas fa-trash"></i> Remove</a>';
                                    }
                      } ],
                    searching: false,
                    paging: false,
                    info: false,
                    ordering: false
                });
            
            });

            
           
        },
        error: function (error) {
            //alert('Error!  '+ error.responseJSON.data.msg);
            $('#res').append(error.responseText);
            console.log(error);  
        }
    });
}

function getTeachersOfASubject(subjectid, subjectbyclassid)
{
    $('#assignTeacherForm').trigger('loading-overlay:show');
    // Pop up the Modal
    $.magnificPopup.open({
        items: {
            src: '#addSubjectTeacher'
        },
        type: 'inline',
        callbacks: {
            close: function(){                
                //resetStreamsModal();               
            }
          }
    });
    subjectid = parseInt(subjectid);
    subjectbyclassid = parseInt(subjectbyclassid);
    $('#subjectbyclassid').val(subjectbyclassid);
    $.ajax({
        type: "post",
        url: "/adminhome/classes/class/teachersofsubject",
        data: { subject_id: subjectid},
        dataType: "json",
        success: function (response, status, code) {                        
            console.log(response.data.data);
            
            $('.teacher-of-subject').empty();
            $.each(response.data.data, function(key, val){
                var aTeacher = '\
                    <div class="checkbox-custom checkbox-default col-lg-4">\
                        <input type="checkbox" id="trID' + val.teacherid +'"  value="' + val.teacherid +'" name="teachersOfSubjectArr">\
                        <label for="" class="mt-2">Tr ' + val.firstname + ' ' + val.lastname + '</label>\
                    </div>\
                ';
                $('.teacher-of-subject').append(aTeacher);
            });
             tickTeachersThatTeachASubject(subjectid);
             $('#assignTeacherForm').trigger('loading-overlay:hide');
        },
        error: function (error) {
            //alert('Error!  '+ error.responseJSON.data.msg);
            $('#res').append(error.responseText);
            console.log(error);  
        }
    });
    
    // var tableSelector = '#'+ String($(this).attr('data-subjectid')) + 'Teachers';
    //     $(tableSelector).DataTable({
    //         searching: false,
    //         paging: false,
    //         info: false
    //     });
}

function tickTeachersThatTeachASubject(subjectid)
{
    $.ajax({
        type: "post",
        url: "/adminhome/classes/class/teachersteachasubjectinaclass",
        data: { class_id: parseInt($('#cid').val()),
                subject_id: subjectid
            },
        dataType: "json",   
        success: function (response, status, code) {                        
            console.log(response.data.data);
                        
            $.each(response.data.data, function(key, val){
                
                    $('.teacher-of-subject input[value='+ val.teacherid +']').prop('checked', true);
                
            });

            
            //$('#teachersForm').trigger('loading-overlay:hide');
            //openModal();
        },
        error: function (error) {
            //alert('Error!  '+ error.responseJSON.data.msg);
            $('#res').append(error.responseText);
            console.log(error);  
        }
    });
}

function saveTeachersToTeachSubject() 
{
    var teachers = [null];
    $('.teacher-of-subject input:checked').each(
        function(){
            teachers.push(parseInt($(this).val()));
        }
    );

    if(teachers.length < 3)
    {
         // ajax request to add a new section to the database
        $.ajax({
            type: "post",
            url: "/adminhome/classes/class/addteachertoteachsubject", 
            data: { 
                subject_by_class_id: $('#subjectbyclassid').val(),                    
                teachers: teachers
            },
            dataType: "json",
            success: function (response, status, code) {
                
                $('.teacher-of-subject input').prop('checked', false);                    
                $.magnificPopup.close();
                
                notifySuccess(response.data.msg);
                getSubjectTeachersTables();
                //getSubjectDoneByClass();
                console.log(response);
            },
            error: function (error) {
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
                    //var json = JSON.parse(error.responseText);
                    console.log(error);
                    //notifyFail(json.data.msg);
                }
                
            }
        }); // end ajax call
    }
    else{
        $.alert({
            title: 'Only 1 Teacher Can be selected!',
            content:  '',
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

// function to remove a teacher from teaching a subject in class
function removeTeacherFromSubject(teacherid, subjectbyclassid)
{
    teacherid = parseInt(teacherid);
    subjectbyclassid = parseInt(subjectbyclassid);
    $.ajax({
        type: "post",
        url: "/adminhome/classes/class/removeteacherfromclasssubject",
        data: { 
            teacher_id: teacherid,
            subject_by_class_id: subjectbyclassid
        },
        dataType: "json",
        success: function (response, status, code) {
            
            getSubjectTeachersTables();
            notifySuccess(response.data.msg);
        },
        error: function (error) {
            
            notifyFail(error.responseJSON.msg);
            
              
        }
    });
}

function getClassOfTerm()
{   
    var clasz = parseInt($('#cid').val()); 
    var stream = parseInt($('#streams').val());
    var term = parseInt($('#terms').val());
    $.ajax({
        type: "post",
        url: "/adminhome/classes/class/getclassofterm",
        data: {
            class_and_stream_id: stream,
            term_id: term,
            class_id: clasz
        },            
        dataType: "json",
        success: function (response, status, code) {
            console.log(response);
            var stringed = JSON.stringify(response.data.data)
            // First destroy the DataTable Before creating a new one
            $('#pupilsOfClassTable').DataTable().destroy();
            var stream;
            if($('#streams').val() == 0)
            {
                stream = '';
            }
            else{
                stream = $('#streams :selected').text();
            }
            $('#classOfTermSubHead').html(className + ' ' + stream + ', ' + $('#terms :selected').text());
            
             // Create a new dataTable and assign it to a variable t
             var t = $("#pupilsOfClassTable").DataTable({                
                data: JSON.parse(stringed),
                columns: [
                    { data: null },
                    { data: 'name'},
                    { data: 'class'},
                    { data: null, render: function(){return '';}},
                    { data: null, render: function(){return '';}},
                    { data: null, render: function(){return '';}},
                    { data: null, render: function(){return '';}},
                    { data: null, render: function(){return '';}}                                       
                ],
                columnDefs: [ {
                    targets: 0,
                    order: [[ 1, 'asc' ]]
                  } ],
                  lengthMenu: [[ -1], ['All']]                                                
                 
            });

            // Use var t to assign a counter column onto the table
            t.on( 'order.dt search.dt', function () {
                t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                    cell.innerHTML = i+1;
                } );
            } ).draw();
        },
        error: function (error) {
            console.log(error);
            $('#res').append(error.responseText);
            alert("No Response From Server");
        }
        
    });
}

function printClass()
{
    var tbl = $('#pupilsOfClassTable').clone();
    tbl.find('tr th:nth-child(3), tr td:nth-child(3)').remove();
    var doc = new jsPDF();  

    var pageSize = doc.internal.pageSize;
            var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
            var center = pageWidth / 2;
   
    doc.setTextColor(headColor[0], headColor[1], headColor[2]);
    doc.setFontSize(headFontSize);
    doc.text(schoolName, center, schoolNameY, 'center');    
    doc.text($('#classOfTermSubHead').html(), center, 32, 'center');
    doc.setDrawColor(headColor[0], headColor[1], headColor[2]);
    doc.setLineWidth(1);
    doc.line(15, 36, 195, 36);
    doc.setFontSize(11);
    doc.setTextColor(100);

    
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

    
    
    doc.save(className + displayDate(new Date())  +'.pdf');
}

