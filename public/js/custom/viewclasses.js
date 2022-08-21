/*
Name: 			viewclasses.js
Written by: 	KABUYE HASHIM MUNIIRU
ORMS Version: 	1.0
Description:    Handle all the requests and behaviors of viewclasses.blade.php
*/

$(document).ready(function () {
    // Initialise the ajax headers to have the CSRF laravel token
    $.ajaxSetup({
        headers: { 'X-CSRF-TOKEN':  $("meta[name='csrf-token']").attr('content')}
    });

     $('.a-class').DataTable({
         language:{emptyTable: 'Class has no streams yet'},
          ordering: false,              
          searching: false,
          paging: false,
          info: false
    });
    
});