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
    
    $('#oldPupilsTable').on('click', '.view-payments-btn', function (e) {
        e.preventDefault();
        var pupilid = $(this).attr('data-pupilid');
        
        goToPupilPayments(pupilid);
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




function getOldPupils()
{
    $.ajax({
        type: "post",
        url: "/bursarhome/pupils/old",
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
                                    return '<a class="btn btn-xs  pointer view-payments-btn " data-pupilid="'+ data + '">'+ 
                                    '<i class="fas fa-dollar-sign"></i> View</a>';
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

function goToPupilPayments(pupilid)
{    
     var url = '/bursarhome/finance/payments/';
     var link = baseUrl + url  + pupilid;
     window.location.href = link;
}





