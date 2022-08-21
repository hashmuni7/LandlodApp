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
    
   

    
    getOldPupils();
    
    $('#oldPupilsTable').on('click', '.view-performance-btn', function (e) {
        e.preventDefault();
        var pupilid = $(this).attr('data-pupilid');
        
        goToPupilPerformance(pupilid, null);
    });
    
});



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
                                    return '<a class="btn btn-xs  pointer view-performance-btn " data-pupilid="'+ data + '">'+ 
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

function goToPupilPerformance(pupilid, termid)
{    
     var url = '/adminhome/gradesandacademics/statistics/pupils/';
     var link = baseUrl + url  + pupilid + '/' + termid;
     window.location.href = link;
}





