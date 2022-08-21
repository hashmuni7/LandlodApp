/*
Name: 			createtest.js
Written by: 	KABUYE HASHIM MUNIIRU
ORMS Version: 	1.0
Description:    Handle all the requests and behaviors of registertest.blade.php
*/

$(document).ready(function () {
    // Initialise the ajax headers to have the CSRF laravel token
    $.ajaxSetup({
        headers: { 'X-CSRF-TOKEN':  $("meta[name='csrf-token']").attr('content')}
    }); // end ajax header initialisation


    /*
	Wizard #1
	*/
	var $w1finish = $('#w1').find('ul.pager li.finish'),
    $w1validator = $("#w1 form").validate({
    highlight: function(element) {
        $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
    },
    success: function(element) {
        $(element).closest('.form-group').removeClass('has-error');
        $(element).remove();
    },
    errorPlacement: function( error, element ) {
        element.parent().append( error );
    }
    });

    $w1finish.on('click', function( ev ) {
        ev.preventDefault();
        var validated = $('#w1 form').valid();
        if ( validated ) {
            $('html, a').addClass('ajax-load');
            createTest();
            
        }
    });

    $('#w1').bootstrapWizard({
        tabClass: 'wizard-steps',
        nextSelector: 'ul.pager li.next',
        previousSelector: 'ul.pager li.previous',
        firstSelector: null,
        lastSelector: null,
        onNext: function( tab, navigation, index, newindex ) {
            var validated = $('#w1 form').valid();
            if( !validated ) {
                $w1validator.focusInvalid();
                return false;
            }
        },
        onTabClick: function( tab, navigation, index, newindex ) {
            if ( newindex == index + 1 ) {
                return this.onNext( tab, navigation, index, newindex);
            } else if ( newindex > index + 1 ) {
                return false;
            } else {
                return true;
            }
        },
        onTabChange: function( tab, navigation, index, newindex ) {
            var totalTabs = navigation.find('li').length - 1;
            $w1finish[ newindex != totalTabs ? 'addClass' : 'removeClass' ]( 'hidden' );
            $('#w1').find(this.nextSelector)[ newindex == totalTabs ? 'addClass' : 'removeClass' ]( 'hidden' );
            tab.removeClass('active');
        }
    });

    $('#classes').on('change', function () {
       
        var classid = parseInt($('#classes').val());
        // ajax request to create a new class to the database
            $.ajax({
                type: "post",
                url: "/doshome/gradesandacademics/tests/getsubjectsofaclass", 
                data: { 
                    class_id: classid
                },
                dataType: "json",
                success: function (response, status, code) {
                    $('#subjects').empty();
                    $('#subjects').append('<option></option>');
                    $.each(response.data.data, function(key, val){
                        if(val.status)
                        {
                            var newItem = '<option value="' + val.subjectbyclassid + '">' + val.subject + '</option>';
                            $('#subjects').append(newItem);
                        }
                    });
                   // console.log(response);
                    // var classid = response.data.data.classid;
                    // goToClassProfile(classid);
                    
                },
                error: function (error) {
                    console.log(error);
                }
            }); // end ajax call
    });
    // $('#class, #classSection').blur(function (e) { 
    //     e.preventDefault();
    //     $('#newItem').remove();
    //     var newClass = '\
    //                 <li class="dd-item" data-id="0" id="newItem">\
    //                     <div class="dd-handle" id="newClass">\
    //                         <label id="newClassName">'+ $('#class').val() +'</label>\
    //                         <label class="float-right" id="newClassSection"></label>\
    //                     </div>\
    //                 </li>\
    //             ';
    //     $('.dd-list').append(newClass);
        
    //     $('#newClassName').html($('#class').val());
    //     var section = $('#classSection').find(':selected').text();
        
    //     $('#newClassSection').html(section);
    //     $('#nestable').trigger('change');
        
    // });

});

function createTest()
{
     // ajax request to create a new class to the database
     $.ajax({
        type: "post",
        url: "/doshome/gradesandacademics/tests/createtest", 
        data: { 
            name_of_test: $('#nameOfTest').val(),
            class_id: parseInt($('#classes').val()),
            subject: parseInt($('#subjects').val()),
            term_id: parseInt($('#currentTerm').attr('data-termid')),
            date_of_test: $('#dateOfTest').val() 
        },
        dataType: "json",
        success: function (response, status, code) {
            
            var testid = response.data.data.testid;
            goToTest(testid);
            
        },
        error: function (error) {
            notifyFail(error.responseJSON.data.msg);
        }
    }); // end ajax call
}

// Go to class profile page after class creation
function goToTest(testid)
{
    //alert('The Test is ready');
     var url = '/orms/public/doshome/gradesandacademics/tests/all';
     var link = $(location).attr('origin') + url;
     window.location.replace(link);
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