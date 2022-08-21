/*
Name: 			classperformance.js
Written by: 	KABUYE HASHIM MUNIIRU
ORMS Version: 	1.0
Description:    Handle all the requests and behaviors of classperformance.blade.php
*/
var dashboardData;
$(document).ready(function () {
    
    // Initialise the ajax headers to have the CSRF laravel token
    $.ajaxSetup({
        headers: { 'X-CSRF-TOKEN':  $("meta[name='csrf-token']").attr('content')}
    }); // end ajax header initialisation
    

    getDashboardData();

    dtInit(); // Initialise the dataTable


    if( $('#meter').get(0) ) {
		$('#meter').liquidMeter({
			shape: 'circle',
			color: '#0088CC',
			background: '#F9F9F9',
			fontSize: '24px',
			fontWeight: '600',
			stroke: '#F2F2F2',
			textColor: '#333',
			liquidOpacity: 0.9,
			liquidPalette: ['#333'],
			speed: 3000,
			animate: !$.browser.mobile
		});
    }
    
    // Click event for the print 
    $('#printClassBalances').click(function (e) {
        if(e.detail !== 2)
        {       
                         
            printSchoolFeesBalances();
        }         
       
    });// end click event

    // Click event for the print 
    $('#printLocalAccountsBalances').click(function (e) {
        if(e.detail !== 2)
        {       
                         
            printLocalAccountsBalances();
        }         
       
    });// end click event

    // Click event for the print 
    $('#printActivitiesBalances').click(function (e) {
        if(e.detail !== 2)
        {       
                         
            printActivitiesBalances();
        }         
       
    });// end click event
    
});

function printSchoolFeesBalances()
{
    
    
    var tbl = $('#schoolFeesBalancesTable').clone();
    //tbl.find('tr th:nth-child(4), tr td:nth-child(4), tr th:nth-child(5), tr td:nth-child(5)').remove();
    var doc = new jsPDF();  

    var pageSize = doc.internal.pageSize;
            var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
            var center = pageWidth / 2;
   
    doc.setTextColor(headColor[0], headColor[1], headColor[2]);
    doc.setFontSize(headFontSize);
    doc.text(schoolName, center, schoolNameY, 'center');
    doc.setDrawColor(headColor[0], headColor[1], headColor[2]);
    doc.text("CLASS BALANCES", center, 32, 'center');
    doc.text(dashboardData.term.term, center, 43, 'center');
    //doc.text($('#testSubHead2').html(), center, 47, 'center');
    doc.setLineWidth(1);
    doc.line(15, 53, 195, 53);
    doc.setFontSize(11);    

    
    // It can parse html:
    doc.autoTable({
        html: tbl.get(0),
        startY: 56,
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
        willDrawCell: function(data) {
            if (data.row.section === 'body') {
                console.log(data.row.raw);
                var obj = data.row.raw;
                if (obj.classList.contains('has-unpaid-balance')) {
                   // doc.setTextColor(231, 76, 60); // Red
                    doc.setFontStyle('bold');
                }
            }
        },
        
    });

    
    
    doc.save('Class_Balances_' +  displayDate(new Date())  +'.pdf');
    
}

function printLocalAccountsBalances()
{
    
    
    var tbl = $('#localAccountsBalancesTable').clone();
    //tbl.find('tr th:nth-child(4), tr td:nth-child(4), tr th:nth-child(5), tr td:nth-child(5)').remove();
    var doc = new jsPDF();  

    var pageSize = doc.internal.pageSize;
            var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
            var center = pageWidth / 2;
   
    doc.setTextColor(headColor[0], headColor[1], headColor[2]);
    doc.setFontSize(headFontSize);
    doc.text(schoolName, center, schoolNameY, 'center');
    doc.setDrawColor(headColor[0], headColor[1], headColor[2]);
    doc.text("LOCAL ACCOUNTS BALANCES", center, 32, 'center');
    doc.text(dashboardData.term.term, center, 43, 'center');
    //doc.text($('#testSubHead2').html(), center, 47, 'center');
    doc.setLineWidth(1);
    doc.line(15, 53, 195, 53);
    doc.setFontSize(11);    

    
    // It can parse html:
    doc.autoTable({
        html: tbl.get(0),
        startY: 56,
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
        willDrawCell: function(data) {
            if (data.row.section === 'body') {
                console.log(data.row.raw);
                var obj = data.row.raw;
                if (obj.classList.contains('has-unpaid-balance')) {
                   // doc.setTextColor(231, 76, 60); // Red
                    doc.setFontStyle('bold');
                }
            }
        },
        
    });

    
    
    doc.save('Local_Accounts_Balances_' +  displayDate(new Date())  +'.pdf');
    
}

function printActivitiesBalances()
{
    
    
    var tbl = $('#activityBalancesTable').clone();
    //tbl.find('tr th:nth-child(4), tr td:nth-child(4), tr th:nth-child(5), tr td:nth-child(5)').remove();
    var doc = new jsPDF();  

    var pageSize = doc.internal.pageSize;
            var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
            var center = pageWidth / 2;
   
    doc.setTextColor(headColor[0], headColor[1], headColor[2]);
    doc.setFontSize(headFontSize);
    doc.text(schoolName, center, schoolNameY, 'center');
    doc.setDrawColor(headColor[0], headColor[1], headColor[2]);
    doc.text("ACTIVITIES BALANCES", center, 32, 'center');
    doc.text(dashboardData.term.term, center, 43, 'center');
    //doc.text($('#testSubHead2').html(), center, 47, 'center');
    doc.setLineWidth(1);
    doc.line(15, 53, 195, 53);
    doc.setFontSize(11);    

    
    // It can parse html:
    doc.autoTable({
        html: tbl.get(0),
        startY: 56,
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
        willDrawCell: function(data) {
            if (data.row.section === 'body') {
                console.log(data.row.raw);
                var obj = data.row.raw;
                if (obj.classList.contains('has-unpaid-balance')) {
                   // doc.setTextColor(231, 76, 60); // Red
                    doc.setFontStyle('bold');
                }
            }
        },
        
    });

    
    
    doc.save('Activities_Balances_' +  displayDate(new Date())  +'.pdf');
    
}

function dtInit()
{
    var t = $('#schoolFeesBalancesTable').DataTable({
        lengthMenu: [[ -1], [ 'All']]
    }); 
    
    
    t.on( 'order.dt search.dt', function () {
        t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();

    var t1 = $('#localAccountsBalancesTable').DataTable({
        lengthMenu: [[ -1], [ 'All']]
    });
    
    
    t1.on( 'order.dt search.dt', function () {
        t1.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();


    var t3 = $('#activityBalancesTable').DataTable({
        lengthMenu: [[ -1], [ 'All']]
    });
    
    
    t3.on( 'order.dt search.dt', function () {
        t3.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();

    
    
}


function getDashboardData()
{
    $.ajax({
        type: "post",
        url: "/doshome/getdashboarddata",
        data: {},
        dataType: "json",
        success: function (response, status, code) {
            dashboardData = JSON.parse(response.data);
            console.log(JSON.parse(response.data));
           
            fillSchoolFeesCollectionChart();
            loadSchoolFeesTypes();
            loadClassVolumes();
            loadGender();
            loadTests();
            loadExams();
            loadHouses();
            return true;
        },
        error: function (error) {
            console.log(error);
            alert('Error '+ error);
              
        }
    });
}

function fillSchoolFeesCollectionChart()
{
    var classLabels = [];
    var paid = [];
    var required = [];
    $.each(dashboardData.balances, function(key, val){
        classLabels.push(val.initials);
        required.push(val.amount); 
        paid.push(val.paid);  
        
    });
    
    if( $('#ChartistCSSAnimation').get(0) ) {
        var data = {
            labels: classLabels,
            series: [{
                        name: 'Required',
                        data: required
                    }, {
                        name: 'Paid',
                        data: paid
                    }            					
            ]
        };
    
        var responsiveOptions = [
            [
                'only screen', {
                    axisX: {
                        labelInterpolationFnc: function(value, index) {
                            // Interpolation function causes only every 2nd label to be displayed
                            if (index % 2 !== 0) {
                                return value;
                            } else {
                                return value;
                            }
                        }
                    },
                    axisY: {
                        offset: 120,
                        labelInterpolationFnc: function(value) {
                            return getCurrency(value);
                        },
                        scaleMinSpace: 15
                    }
                }
            ]
        ];
    
        new Chartist.Line('#ChartistCSSAnimation', data, null, responsiveOptions);
    
        var $chart = $('#ChartistCSSAnimation');
    
                var $toolTip = $chart
                    .append('<div class="tooltip"></div>')
                    .find('.tooltip')
                    .hide();
    
                $chart.on('mouseenter', '.ct-point', function() {
                    var $point = $(this),
                        value = $point.attr('ct:value'),
                        seriesName = $point.parent().attr('ct:series-name');
                    $toolTip.html(seriesName + '<br>' + getCurrency(value)).show();
                });
    
                $chart.on('mouseleave', '.ct-point', function() {
                    $toolTip.hide();
                });
    
                $chart.on('mousemove', function(event) {
                    $toolTip.css({
                        left: (event.offsetX || event.originalEvent.layerX) - $toolTip.width() / 2 - 10,
                        top: (event.offsetY || event.originalEvent.layerY) - $toolTip.height() - 40
                    });
                });

               
    }
   
}

function loadSchoolFeesTypes()
{
    var sparklineBarDashData = [];
    $.each(dashboardData.feesTypes, function(key, val){
        sparklineBarDashData.push(val.amount);
          
        
    });
    
    if( $('#sparklineBarDash').get(0) ) {
		var sparklineBarDashOptions = {
			type: 'bar',
			width: '80',
			height: '55',
			barColor: '#CCCCCC',
			negBarColor: '#B20000'
		};

		$("#sparklineBarDash").sparkline(sparklineBarDashData, sparklineBarDashOptions);

		
		$(this).on("styleSwitcher.modifyVars", function(ev) {
			$("#sparklineBarDash").sparkline(sparklineBarDashData, $.extend({}, sparklineBarDashOptions, {
				barColor: ev.options.colorPrimary
			}));
		});

		if (typeof($.browser) != 'undefined') {
			if($.browser.mobile) {
				$("#sparklineBarDash").sparkline(sparklineBarDashData, $.extend({}, sparklineBarDashOptions, {
					barColor: '#0088cc'
				}));
			}
		}

		
	}
}

function loadClassVolumes()
{
    var flotBarsData = [
        // ["C5", 26],
        // ["C2", 42],
        // ["C1", 25],
        // ["P1", 23],
        // ["P2", 37],
        // ["P3", 33],
        // ["P4", 18],
        // ["P5", 14],
        // ["P6", 18],
        // ["P7", 15]
    ];
    $.each(dashboardData.classCounts, function(key, val){
        flotBarsData.push([val.initials, val.total]);
          
        
    });
    


    if( $('#flotBars').get(0) ) {
        var plot = $.plot('#flotBars', [flotBarsData], {
            colors: ['#8CC9E8'],
            series: {
                bars: {
                    show: true,
                    barWidth: 0.8,
                    align: 'center'
                }
            },
            xaxis: {
                mode: 'categories',
                tickLength: 0
            },
            grid: {
                hoverable: true,
                clickable: true,
                borderColor: 'rgba(0,0,0,0.1)',
                borderWidth: 1,
                labelMargin: 15,
                backgroundColor: 'transparent'
            },
            tooltip: true,
            tooltipOpts: {
                content: '%y',
                shifts: {
                    x: -10,
                    y: 20
                },
                defaultTheme: false
            }
        });
    }
}

function loadGender()
{
    var morrisStackedData = [];

    $.each(dashboardData.classCounts, function(key, val){
        morrisStackedData.push({y: val.initials, a: val.male, b: val.female});
          
        
    });

    if( $('#morrisStacked').get(0) ) {
		Morris.Bar({
			resize: true,
			element: 'morrisStacked',
			data: morrisStackedData,
			xkey: 'y',
			ykeys: ['a', 'b'],
			labels: ['Boys', 'Girls'],
			barColors: ['#0088cc', '#2baab1'],
			fillOpacity: 0.7,
			smooth: false,
			stacked: true,
            hideHover: true,
            xLabelMargin: 10
		});
	}
}

function loadTests()
{
    var flotBarsTwoData = [
     
    ];

    $.each(dashboardData.testCounts, function(key, val){
        flotBarsTwoData.push([val.initials, val.tests]);
          
        
    });

    if( $('#flotBarsTwo').get(0) ) {
        $.plot('#flotBarsTwo', [flotBarsTwoData], {
            colors: ['#8CC9E8'],
            series: {
                bars: {
                    show: true,
                    barWidth: 0.8,
                    align: 'bottom'
                }
            },
            yaxis: {
                min: 0,                
                tickDecimals: 0
            },
            xaxis: {
                mode: 'categories',
                tickLength: 0
            },
            grid: {
                hoverable: true,
                clickable: true,
                borderColor: 'rgba(0,0,0,0.1)',
                borderWidth: 1,
                labelMargin: 15,
                backgroundColor: 'transparent'
            },
            tooltip: true,
            tooltipOpts: {
                content: '%y',
                shifts: {
                    x: -10,
                    y: 20
                },
                defaultTheme: false
            }
        });
    }
}

function loadExams()
{
    var flotBarsThreeData = [
     
    ];

    $.each(dashboardData.examCounts, function(key, val){
        flotBarsThreeData.push([val.initials, val.exams]);
          
        
    });

    if( $('#flotBarsThree').get(0) ) {
        $.plot('#flotBarsThree', [flotBarsThreeData], {
            colors: ['#8CC9E8'],
            series: {
                bars: {
                    show: true,
                    barWidth: 0.8,
                    align: 'bottom'
                }
            },
            yaxis: {
                min: 0,                
                tickDecimals: 0
            },
            xaxis: {
                mode: 'categories',
                tickLength: 0
            },
            grid: {
                hoverable: true,
                clickable: true,
                borderColor: 'rgba(0,0,0,0.1)',
                borderWidth: 1,
                labelMargin: 15,
                backgroundColor: 'transparent'
            },
            tooltip: true,
            tooltipOpts: {
                content: '%y',
                shifts: {
                    x: -10,
                    y: 20
                },
                defaultTheme: false
            }
        });
    }
}

function loadHouses()
{
    var flotBarsFourData = [
     
    ];

    $.each(dashboardData.houses, function(key, val){
        flotBarsFourData.push([val.house, val.num]);
          
        
    });

    if( $('#flotBarsFour').get(0) ) {
        $.plot('#flotBarsFour', [flotBarsFourData], {
            colors: ['#8CC9E8'],
            series: {
                bars: {
                    show: true,
                    barWidth: 0.8,
                    align: 'bottom'
                }
            },
            yaxis: {
                min: 0,                
                tickDecimals: 0
            },
            xaxis: {
                mode: 'categories',
                tickLength: 0
            },
            grid: {
                hoverable: true,
                clickable: true,
                borderColor: 'rgba(0,0,0,0.1)',
                borderWidth: 1,
                labelMargin: 15,
                backgroundColor: 'transparent'
            },
            tooltip: true,
            tooltipOpts: {
                content: '%y',
                shifts: {
                    x: -10,
                    y: 20
                },
                defaultTheme: false
            }
        });
    }
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
             $('#streams').append('<option value="'+ 0 +'">All Streams</option>');                         
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

// Go to the selected term to fetch the Stream Balances
function getStreamTermFeesBalance()
{   
    var clasz = parseInt($('#classes').val()); 
    var stream = parseInt($('#streams').val());
    var term = parseInt($('#terms').val());
    $.ajax({
        type: "post",
        url: "/adminhome/finance/schoolfees/classbalances/getbalanceofstream",
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
            $('#schoolFeesBalancesTable').DataTable().destroy();
            var stream;
            if($('#streams').val() == 0)
            {
                stream = '';
            }
            else{
                stream = $('#streams :selected').text();
            }
            $('#balanceSubHead').html($('#classes :selected').text() + ' ' + stream + ' ' + $('#terms :selected').text())
            
             // Create a new dataTable and assign it to a variable t
             var t = $("#schoolFeesBalancesTable").DataTable({
                data: JSON.parse(stringed),
                columns: [
                    { data: null },
                    { data: 'name'},
                    { data: 'class'},
                    { data: 'fees', render: function(d){return  getCurrency(d);}},
                    { data: 'paid', render: function(d){return  getCurrency(d);}},
                    { data: 'balance', render: function(d, type, all){
                        return  getCurrency(d);                            
                        }
                    },
                    { data: null , render: function(d, type, all){
                        percentagePaid = parseInt((all.paid / all.fees) * 100);
                        percentageBalance = parseInt(100 - percentagePaid)
                        return  'Paid: ' + percentagePaid + '%. Balance ' + percentageBalance + '%';
                        }
                    }                                       
                ],
                columnDefs: [ {
                    targets: 0,
                    order: [[ 1, 'asc' ]]
                  } ],                
                createdRow: function(row, data, dataIndex){
                    if(data.balance == null || data.balance > 0 )
                    {
                        $(row).addClass('has-unpaid-balance');
                    }
                },
                footerCallback: function ( row, data, start, end, display ) {
                    var api = this.api();
                    nb_cols = api.columns().nodes().length;
                    var j = 3;
                    var fees;
                    var paid;
                    var balance;
                    while(j < nb_cols-1){
                        var pageTotal = api
                    .column( j, { page: 'allPages'} )
                    .data()
                    .reduce( function (a, b) {
                        return Number(a) + Number(b);
                    }, 0 );
                    // Update footer
                    $( api.column( j ).footer() ).html(getCurrency(pageTotal));
                    switch (j) {
                        case 3:
                            fees = pageTotal;
                            break;
                        case 4:
                            paid = pageTotal;
                            break;
                        case 5:
                            balance = pageTotal;
                            break;                    
                    }
                    
                    
                        j++;
                    }

                    var percentage = function(){
                        percentagePaid = parseInt((paid / fees) * 100);
                        percentageBalance = parseInt(100 - percentagePaid)
                        return  'Paid: ' + percentagePaid + '%. Balance ' + percentageBalance + '%';
                        }
                        $( api.column( 6 ).footer() ).html(percentage);
                } 
                 
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


function getSectionTermFeesBalance()
{   
    var section = parseInt($('#sections').val());    
    var term = parseInt($('#termsforsections').val());
    $.ajax({
        type: "post",
        url: "/adminhome/finance/schoolfees/classbalances/getbalanceofsection",
        data: {
            section_id: section,
            term_id: term
        },            
        dataType: "json",
        success: function (response, status, code) {
            console.log(response);
            var stringed = JSON.stringify(response.data.data)
            // First destroy the DataTable Before creating a new one
            $('#schoolFeesBalancesTable').DataTable().destroy();
            
            $('#balanceSubHead').html($('#sections :selected').text() + ' ' + $('#termsforsections :selected').text());
            
             // Create a new dataTable and assign it to a variable t
             var t = $("#schoolFeesBalancesTable").DataTable({
                data: JSON.parse(stringed),
                columns: [
                    { data: null },
                    { data: 'name'},
                    { data: 'class'},
                    { data: 'fees', render: function(d){return  getCurrency(d);}},
                    { data: 'paid', render: function(d){return  getCurrency(d);}},
                    { data: 'balance', render: function(d, type, all){
                        return  getCurrency(d);                            
                        }
                    },
                    { data: null , render: function(d, type, all){
                        percentagePaid = parseInt((all.paid / all.fees) * 100);
                        percentageBalance = parseInt(100 - percentagePaid)
                        return  'Paid: ' + percentagePaid + '%. Balance ' + percentageBalance + '%';
                        }
                    }                                       
                ],
                columnDefs: [ {
                    targets: 0,
                    order: [[ 1, 'asc' ]]
                  } ],                
                createdRow: function(row, data, dataIndex){
                    if(data.balance == null || data.balance > 0 )
                    {
                        $(row).addClass('has-unpaid-balance');
                    }
                },
                footerCallback: function ( row, data, start, end, display ) {
                    var api = this.api();
                    nb_cols = api.columns().nodes().length;
                    var j = 3;
                    var fees;
                    var paid;
                    var balance;
                    while(j < nb_cols-1){
                        var pageTotal = api
                    .column( j, { page: 'allPages'} )
                    .data()
                    .reduce( function (a, b) {
                        return Number(a) + Number(b);
                    }, 0 );
                    // Update footer
                    $( api.column( j ).footer() ).html(getCurrency(pageTotal));
                    switch (j) {
                        case 3:
                            fees = pageTotal;
                            break;
                        case 4:
                            paid = pageTotal;
                            break;
                        case 5:
                            balance = pageTotal;
                            break;                    
                    }
                    
                    
                        j++;
                    }

                    var percentage = function(){
                        percentagePaid = parseInt((paid / fees) * 100);
                        percentageBalance = parseInt(100 - percentagePaid)
                        return  'Paid: ' + percentagePaid + '%. Balance ' + percentageBalance + '%';
                        }
                        $( api.column( 6 ).footer() ).html(percentage);
                } 
                 
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