/*
Name: 			createexam.js
Written by: 	KABUYE HASHIM MUNIIRU
ORMS Version: 	1.0
Description:    Handle all the requests and behaviors of registerexam.blade.php
*/
let subjectsDoneByClass;
let subjects_arr = [];
$(document).ready(function () {
    // Initialise the ajax headers to have the CSRF laravel token
    $.ajaxSetup({
        headers: { 'X-CSRF-TOKEN':  $("meta[name='csrf-token']").attr('content')}
    }); // end ajax header initialisation


    /*
	Wizard #1
    */
    $.validator.addMethod('chkSubjects', function(){
        return $('.exam-subjects input:checked').length > 3;
    });
    $.validator.addMethod('chkSubjectsForAgg', function(){
        return $('.exam-subjects-agg input:checked').length == 4;
    });
	var $w1finish = $('#w1').find('ul.pager li.finish'),
    $w1validator = $("#w1 form").validate({
    rules: {
        subjects_arr : {chkSubjects: true},
        subjects_agg_arr : {chkSubjectsForAgg: true}
        
    },
    messages: {
        subjects_arr: "Please Select Atleast 4 Subjects",
        subjects_agg_arr: "Please Select Only 4 Subjects"
    },
    highlight: function(element) {
        $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
    },
    success: function(element) {
        $(element).closest('.form-group').removeClass('has-error');
        $(element).remove();
    },
    errorPlacement: function( error, element ) {
        if(element.parent().hasClass('checkbox-custom'))
        {
            element.closest('.chk-group').append(error);
        }
        else{
            element.parent().append( error );
        }
            
    }
    });

    $w1finish.on('click', function( ev ) {
        ev.preventDefault();
        var validated = $('#w1 form').valid();
        if ( validated ) {
            $('html, a').addClass('ajax-load');
            createExam();
            
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
                url: "/adminhome/gradesandacademics/tests/getsubjectsofaclass", 
                data: { 
                    class_id: classid
                },
                dataType: "json",
                success: function (response, status, code) {
                    $('.exam-subjects').empty();
                    subjectsDoneByClass = response.data.data;
                    $.each(response.data.data, function(key, val){
                        var aSubject = '\
                            <div class="checkbox-custom checkbox-default col-lg-4">\
                                <input type="checkbox" id="subjectbyclassID' + val.subjectbyclassid +'"  value="' + val.subjectbyclassid +'" name="subjects_arr" required>\
                                <label for="" class="mt-2">' + val.subject + '</label>\
                            </div>\
                        ';
                        $('.exam-subjects').append(aSubject);
                    });
                    // $('#subjects').empty();
                    // $('#subjects').append('<option></option>');
                    // $.each(response.data.data, function(key, val){
                    //     if(val.status)
                    //     {
                    //         var newItem = '<option value="' + val.subjectbyclassid + '">' + val.subject + '</option>';
                    //         $('#subjects').append(newItem);
                    //     }
                    // });
                   // console.log(response);
                    // var classid = response.data.data.classid;
                    // goToClassProfile(classid);
                    
                },
                error: function (error) {
                    console.log(error);
                }
            }); // end ajax call
    });

    $('.exam-subjects').on('change', 'input[type="checkbox"]', function () {
        //if(this.checked)
        //alert($(this).val());
        displaySubjectOnTab($(this).val(), this.checked);
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

function displaySubjectOnTab(subjectbyclassid, isChecked)
{
    subjectbyclassid = parseInt(subjectbyclassid);
    //$('.exam-subjects').empty();
    $.each(subjectsDoneByClass, function(key, val){
        var aSubject = '\
            <div class="checkbox-custom checkbox-default col-lg-4">\
                <input type="checkbox" id="subjectbyclassIDForAgg' + val.subjectbyclassid +'"  value="' + val.subjectbyclassid +'" name="subjects_agg_arr" required>\
                <label for="" class="mt-2">' + val.subject + '</label>\
            </div>\
        ';
        // $('.exam-subjects').append(aSubject);
        if(val.subjectbyclassid == subjectbyclassid )
        {
            //alert(val.subject);
            if(isChecked)
            {
                $('.exam-subjects-agg').append(aSubject);
                subjects_arr.push(parseInt(subjectbyclassid));
            }
            else{
                $('#subjectbyclassIDForAgg' + val.subjectbyclassid).parent().remove();
                
                var removedSubject = subjects_arr.indexOf(parseInt(subjectbyclassid));
                subjects_arr.splice(removedSubject, 1);

                // for( var i = 0; i < subjects_arr.length; i++){ 
                //     if ( subjects_arr[i] === parseInt(subjectbyclassid)) {
                //         subjects_arr.splice(i, 1); 
                //     }
                //  }
            }
        }
        
    });
}

function createExam()
{        
    
    // $('.exam-subjects input:checked').each(
    //     function(){
            
    //     }
    // );

    let subjects_agg_arr = [];
    $('.exam-subjects-agg input:checked').each(
        function(){
            subjects_agg_arr.push(parseInt($(this).val()));
        }
    );

     // ajax request to create a new class to the database
     $.ajax({
        type: "post",
        url: "/adminhome/gradesandacademics/exams/createexam", 
        data: { 
            name_of_exam: $('#nameOfExam').val(),
            class_id: parseInt($('#classes').val()),
            subjects_arr: subjects_arr,
            subjects_agg_arr: subjects_agg_arr,           
            term_id: parseInt($('#currentTerm').attr('data-termid')),
            start_date: $('#startDate').val(),
            end_date: $('#endDate').val() 
        },
        dataType: "json",
        success: function (response, status, code) {
            
            var examid = response.data.data.examid;
            goToExam(examid);
            
        },
        error: function (error) {
            notifyFail(error.responseJSON.data.msg);
        }
    }); // end ajax call
}

// Go to class profile page after class creation
function goToExam(examid)
{
    //alert('The Exam is ready');
     var url = '/orms/public/adminhome/gradesandacademics/exams/all';
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