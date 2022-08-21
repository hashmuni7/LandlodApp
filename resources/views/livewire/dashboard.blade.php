<div>
    <x-slot name="title">
        Dashboard
    </x-slot>

    <x-slot name="header">
        <header class="page-header">
            <h2>Dashboard</h2>
        
            <div class="right-wrapper text-right">
                <ol class="breadcrumbs">
                    <li>
                        <a href="{{-- url('/adminhome') --}}">
                            <i class="fas fa-home"></i>
                        </a>
                    </li>                    
                </ol>
        
                <a class="sidebar-right-toggle" ><i class="fas fa-chevron-left"></i></a>
            </div>
        </header>
    </x-slot>

    @section('pagecs')
        <link rel="stylesheet" href="{{ URL::asset('vendor/morris/morris.css') }}" />
        <link rel="stylesheet" href="{{ URL::asset('vendor/chartist/chartist.min.css') }}" />
    @endsection
    <!-- The Dashboard component can load here-->
    <div class="row hidden">
        <div class="container-fluid mb-3">
            <section class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-xl-7" >
                            <div class="chart-data-selector" id="salesSelectorWrapper" >
                                <h2 class="center">                                    
                                    <strong>
                                        Weekly Income
                                    </strong>
                                </h2>
    
                                <div id="ChartistCSSAnimation" class="ct-chart ct-perfect-fourth ct-golden-section w-100" ></div>
                               
                            </div>
                        </div>
                        <div class="col-xl-5 text-center">
                                <h2 class="card-title mt-3"><strong>Occupancy</strong></h2>
                                <div class="liquid-meter-wrapper liquid-meter-lg mt-3">
                                    <div class="liquid-meter">
                                        <meter min="0" max="100" value="30" id="meter"></meter>
                                    </div>
                                </div>
                            </div>
                        
                        
                    </div>
                </div>
            </section>
        </div>
    </div> 
    <div class="row pt-4 mt-2">
        <div class="col-lg-6">
            <div class="row mb-3">
                <div class="col-xl-6">
                    <section class="card card-featured-left card-featured-primary mb-3">
                        <div class="card-body">
                            <div class="widget-summary">
                                <div class="widget-summary-col widget-summary-col-icon">
                                    <div class="summary-icon bg-primary">
                                        <i class="fas fa-child"></i>
                                    </div>
                                </div>
                                <div class="widget-summary-col">
                                    <div class="summary">
                                        <h4 class="title">Landlords</h4>
                                        <div class="info">
                                            <strong class="amount">{{$landlords}}</strong>
                                            
                                        </div>
                                    </div>
                                    <div class="summary-footer">
                                        <span class="text-primary"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div class="col-xl-6">
                    <section class="card card-featured-left card-featured-secondary">
                        <div class="card-body">
                            <div class="widget-summary">
                                <div class="widget-summary-col widget-summary-col-icon">
                                    <div class="summary-icon bg-secondary">
                                        <i class="fas fa-building"></i>
                                    </div>
                                </div>
                                <div class="widget-summary-col">
                                    <div class="summary">
                                        <h4 class="title">Properties</h4>
                                        <div class="info">
                                            <strong class="amount">{{$propertys}}</strong>
                                        </div>
                                    </div>                                       
                                    <div class="summary-footer">
                                        <a class="text-muted text-uppercase" href="#"></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <div class="row">
                <div class="col-xl-6">
                    <section class="card card-featured-left card-featured-tertiary mb-3">
                        <div class="card-body">
                            <div class="widget-summary">
                                <div class="widget-summary-col widget-summary-col-icon">
                                    <div class="summary-icon bg-primary">
                                        <i class="fas fa-clipboard"></i>
                                    </div>
                                </div>
                                <div class="widget-summary-col">
                                    <div class="summary">
                                        <h4 class="title">Occupancy</h4>
                                        <div class="info">
                                            <strong class="amount">25%</strong>
                                        </div>
                                    </div>
                                    <div class="summary-footer">
                                        <a class="text-muted text-uppercase" href="#">Occupancy</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div class="col-xl-6">
                    <section class="card card-featured-left card-featured-quaternary">
                        <div class="card-body">
                            <div class="widget-summary">
                                <div class="widget-summary-col widget-summary-col-icon">
                                    <div class="summary-icon bg-primary">
                                        <i class="fas fa-child"></i>
                                    </div>
                                </div>
                                <div class="widget-summary-col">
                                    <div class="summary">
                                        <h4 class="title">Tenants</h4>
                                        <div class="info">
                                            <strong class="amount">{{$spaces}}</strong>
                                        </div>
                                    </div>                                       
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
        <div class="col-lg-6">
            <div class="row mb-3">
                <div class="col-xl-6">
                    <section class="card card-featured-left card-featured-primary mb-3">
                        <div class="card-body">
                            <div class="widget-summary">
                                <div class="widget-summary-col widget-summary-col-icon">
                                    <div class="summary-icon bg-primary">
                                        <i class="fas fa-building"></i>
                                    </div>
                                </div>
                                <div class="widget-summary-col">
                                    <div class="summary">
                                        <h4 class="title">Spaces</h4>
                                        <div class="info">
                                            <strong class="amount">{{$spaces}}</strong>
                                            
                                        </div>
                                    </div>
                                    <div class="summary-footer">
                                        <span class="text-primary"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div class="col-xl-6">
                    <section class="card card-featured-left card-featured-secondary">
                        <div class="card-body">
                            <div class="widget-summary">
                                
                                <div class="widget-summary-col">
                                    <div class="summary">
                                        <h4 class="title">Income This Month</h4>
                                        <div class="info">
                                            <strong class="amount"> UGX 2,345,045,300</strong>
                                        </div>
                                    </div>                                       
                                    <div class="summary-footer">
                                        <a class="text-muted text-uppercase" href="#"></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <div class="row">
                <div class="col-xl-6">
                    <section class="card card-featured-left card-featured-tertiary mb-3">
                        <div class="card-body">
                            <div class="widget-summary">
                                <div class="widget-summary-col widget-summary-col-icon">
                                    <div class="summary-icon bg-primary">
                                        <i class="fas fa-clipboard"></i>
                                    </div>
                                </div>
                                <div class="widget-summary-col">
                                    <div class="summary">
                                        <h4 class="title">Complaints</h4>
                                        <div class="info">
                                            <strong class="amount">1,432</strong>
                                        </div>
                                    </div>
                                    <div class="summary-footer">
                                        <a class="text-muted text-uppercase" href="#">All Sections</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div class="col-xl-6">
                    <section class="card card-featured-left card-featured-quaternary">
                        <div class="card-body">
                            <div class="widget-summary">
                                <div class="widget-summary-col widget-summary-col-icon">
                                    <div class="summary-icon bg-secondary">
                                        <i class="fas fa-sitemap"></i>
                                    </div>
                                </div>
                                <div class="widget-summary-col">
                                    <div class="summary">
                                        <h6 class="">Monthly Transactions</h6>
                                        <div class="info">
                                            <strong class="amount">2,300,000</strong>
                                        </div>
                                    </div>                                       
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>   

    <div class="row">
        <div class="col-md-12">
            <section class="card">
                <header class="card-header card-header-transparent">
                    <div class="card-actions">
                        <a href="#" class="card-action card-action-toggle" data-card-toggle></a>
                        <a href="#" class="card-action card-action-dismiss" data-card-dismiss></a>
                    </div>
    
                    <h2 class="card-title">Recent Payments</h2>
                </header>
                <div class="card-body">
                    @php
                        $fetchFor;
                        if(Auth::user()->usercategory->usercategoryid == 1)
                        {
                            $fetchFor = 0;
                        }elseif (Auth::user()->usercategory->usercategoryid == 200)
                        {
                            $fetchFor = 1;
                        }
                    @endphp
                @livewire('tables.landlord-properties-payments', ['landlord' => $user, 'fetchFor' => $fetchFor])
                </div>
            </section>
        </div>
    </div>

    @section('pagejs')
    <!-- Code to handle Admin Requests -->
    <style>
            #ChartistCSSAnimation .ct-series.ct-series-a .ct-line {
                fill: none;
                stroke-width: 4px;
                stroke-dasharray: 5px;
                -webkit-animation: dashoffset 1s linear infinite;
                -moz-animation: dashoffset 1s linear infinite;
                animation: dashoffset 1s linear infinite;
            }

            #ChartistCSSAnimation .ct-series.ct-series-b .ct-point {
                -webkit-animation: bouncing-stroke 0.5s ease infinite;
                -moz-animation: bouncing-stroke 0.5s ease infinite;
                animation: bouncing-stroke 0.5s ease infinite;
            }

            #ChartistCSSAnimation .ct-series.ct-series-b .ct-line {
                fill: none;
                stroke-width: 3px;
            }

            #ChartistCSSAnimation .ct-series.ct-series-c .ct-point {
                -webkit-animation: exploding-stroke 1s ease-out infinite;
                -moz-animation: exploding-stroke 1s ease-out infinite;
                animation: exploding-stroke 1s ease-out infinite;
            }

            #ChartistCSSAnimation .ct-series.ct-series-c .ct-line {
                fill: none;
                stroke-width: 2px;
                stroke-dasharray: 40px 3px;
            }

            @-webkit-keyframes dashoffset {
                0% {
                    stroke-dashoffset: 0px;
                }

                100% {
                    stroke-dashoffset: -20px;
                };
            }

            @-moz-keyframes dashoffset {
                0% {
                    stroke-dashoffset: 0px;
                }

                100% {
                    stroke-dashoffset: -20px;
                };
            }

            @keyframes dashoffset {
                0% {
                    stroke-dashoffset: 0px;
                }

                100% {
                    stroke-dashoffset: -20px;
                };
            }

            @-webkit-keyframes bouncing-stroke {
                0% {
                    stroke-width: 5px;
                }

                50% {
                    stroke-width: 10px;
                }

                100% {
                    stroke-width: 5px;
                };
            }

            @-moz-keyframes bouncing-stroke {
                0% {
                    stroke-width: 5px;
                }

                50% {
                    stroke-width: 10px;
                }

                100% {
                    stroke-width: 5px;
                };
            }

            @keyframes bouncing-stroke {
                0% {
                    stroke-width: 5px;
                }

                50% {
                    stroke-width: 10px;
                }

                100% {
                    stroke-width: 5px;
                };
            }

            @-webkit-keyframes exploding-stroke {
                0% {
                    stroke-width: 2px;
                    opacity: 1;
                }

                100% {
                    stroke-width: 20px;
                    opacity: 0;
                };
            }

            @-moz-keyframes exploding-stroke {
                0% {
                    stroke-width: 2px;
                    opacity: 1;
                }

                100% {
                    stroke-width: 20px;
                    opacity: 0;
                };
            }

            @keyframes exploding-stroke {
                0% {
                    stroke-width: 2px;
                    opacity: 1;
                }

                100% {
                    stroke-width: 20px;
                    opacity: 0;
                };
            }
        </style>


    
    
    <script>
        $(document).ready(function () {

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



        //prepareChart();
        });
    </script>

@endsection
    
</div>