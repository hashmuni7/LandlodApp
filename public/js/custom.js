/* Add here all your JS customizations */
function getCurrency(money)
{
    
    return  'UGX ' + numeral(money).format(0,0);
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

function centerText(pageWidth, text)
{
    pageCenter = parseInt(pageWidth / 2);
    textLength = text.length;
    textCenter = parseInt(textLength / 2);
    return pageCenter;
}

let schoolName = "THE MODERN SCHOOLS";
let schoolNameX = 54;
let schoolNameY = 18;
let headFontSize = 25;
let headColor = [0, 0, 0];
let startTextY = 32;
let reportY = 60;
let baseUrl = 'http://127.0.0.1/orms/public';

function backUpDatabase()
{
    $.ajaxSetup({
        headers: { 'X-CSRF-TOKEN':  $("meta[name='csrf-token']").attr('content')}
    }); // end ajax header initialisation

    $('html, a').addClass('ajax-load');

    $.ajax({
        type: "post",
        url: "/adminhome/backupdatabase",
        data: {},
        dataType: "json",
        success: function (response, status, code) {
            $('html, a').removeClass('ajax-load');
           var  backup = JSON.parse(response.data);
            //console.log(JSON.parse(response.data));
            $.alert({
                title: 'Back Up Successful',
                content:  backup,
                buttons: {
                    ok: function (){                                 
                    },                   
                },
                icon: 'fa fa-spinner fa-spin',
                type: 'blue',
                theme: 'modern',
                animation: 'bottom',
                closeAnimation: 'rotateY',
                animationBounce: 2.5
            });          
            return true;
        },
        error: function (error) {
            $('html, a').removeClass('ajax-load');
            console.log(error);
            $.alert({
                title: 'Sorry!',
                content:  'Back Up Failed',
                buttons: {
                    ok: function (){                                 
                    },                   
                },
                icon: 'fa fa-spinner fa-spin',
                type: 'blue',
                theme: 'modern',
                animation: 'bottom',
                closeAnimation: 'rotateY',
                animationBounce: 2.5
            });
              
        }
    });
}

// jQuery.fn.ready = (fn)->
//     $(this).on 'turbolinks:load', fn
$(document).ready(function () {
    
    $.ajaxSetup({
        beforeSend: function(xhr, options){
            options.url = baseUrl + options.url;
        }
    });
    $('.sortable-icon').hide()
    $('.sortable').hover(
        function (){$(this).find('.sortable-icon').removeClass('.invisible')},
        function (){$(this).find('.sortable-icon').addClass('invisible')}
    );

    $('#landlordsTable').DataTable();
    
    

    
});










