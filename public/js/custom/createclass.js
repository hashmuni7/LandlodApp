/*
Name: 			createclass.js
Written by: 	KABUYE HASHIM MUNIIRU
ORMS Version: 	1.0
Description:    Handle all the requests and behaviors of createclasses.blade.php
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
        if(ev.detail !== 2)
        {                                   
            var validated = $('#w1 form').valid();
            if ( validated ) {
                $('html, a').addClass('ajax-load');                             
                    createClass();                                               
            }
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
    // $('#classSection').on('change', function () {
    //     var sectionid = parseInt($('#classSection').val());

    // $.ajax({
    //     type: "post",
    //     url: "/adminhome/classes/getclassestorank",
    //     data: {},
    //     dataType: "json",
    //     success: function (response, status, code) {                        
    //         console.log(response.data.data);
    //         $('.dd-list').empty();
    //         $.each(response.data.data, function(key, val){
                
    //             var item = '\
    //                 <li class="dd-item" data-id="'+ val.classid +'">\
    //                     <div class="dd-handle">'+ val.class +'</div>\
    //                 </li>\
    //             ';
    //             $('.dd-list').append(item);
    //         });
    //         var newClass = '\
    //                 <li class="dd-item" data-id="0">\
    //                     <div class="dd-handle" id="newClass">'+ $('#class').val() +'</div>\
    //                 </li>\
    //             ';
    //             $('.dd-list').append(newClass);
                
    //     },
    //     error: function (error) {
    //         //alert('Error!  '+ error.responseJSON.data.msg);
            
    //         console.log(error);  
    //     }
    // });
        
    // });

    $('#class, #classSection').blur(function (e) { 
        e.preventDefault();
        $('#newItem').remove();
        var newClass = '\
                    <li class="dd-item" data-id="0" id="newItem">\
                        <div class="dd-handle" id="newClass">\
                            <label id="newClassName">'+ $('#class').val() +'</label>\
                            <label class="float-right" id="newClassSection"></label>\
                        </div>\
                    </li>\
                ';
        $('.dd-list').append(newClass);
        
        $('#newClassName').html($('#class').val());
        var section = $('#classSection').find(':selected').text();
        
        $('#newClassSection').html(section);
        $('#nestable').trigger('change');
        
    });

    
});

function createClass()
{
     // ajax request to create a new class to the database
     $.ajax({
        type: "post",
        url: "/adminhome/classes/createnewclass", 
        data: { 
            class: $('#class').val(),
            initials: $('#classinitials').val().toUpperCase(),
            section_id: $('#classSection').val(),
            ranks: $('#nestable-output').val()
        },
        dataType: "json",
        success: function (response, status, code) {
            
            var classid = response.data.data.classid;
            goToClassProfile(classid);
            
        },
        error: function (error) {
              
        }
    }); // end ajax call
}

// Go to class profile page after class creation
function goToClassProfile(classid)
{
    var url = '/orms/public/adminhome/classes/classprofile/';
    
    var link = $(location).attr('origin') + url + classid;
    window.location.replace(link);
}