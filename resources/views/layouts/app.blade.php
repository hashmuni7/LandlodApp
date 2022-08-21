<!doctype html>
<html class="sidebar-light sidebar-left-collapsed" lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">

        <!-- Mobile Metas -->
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="turbolinks-cache-control" content="no-preview">

        <title>{{$title}}</title>
        <link rel="icon" href="{{ URL::asset('img/small-logo.ico') }}"  type="image/x-icon" />
        
		<!-- Vendor CSS -->
		<link rel="stylesheet" href="{{ URL::asset('vendor/bootstrap/css/bootstrap.css') }}" />
		<link rel="stylesheet" href="{{ URL::asset('vendor/animate/animate.css') }}">
        <link rel="stylesheet" href="{{-- URL::asset(mix('css/app.css')) --}}">
        <link rel="stylesheet" href="{{ URL::asset('vendor/simple-line-icons/css/simple-line-icons.css') }}" />

		<link rel="stylesheet" href="{{ URL::asset('vendor/font-awesome/css/all.min.css') }}" />
		<link rel="stylesheet" href="{{ URL::asset('vendor/magnific-popup/magnific-popup.css') }}" />
		<link rel="stylesheet" href="{{ URL::asset('vendor/bootstrap-datepicker/css/bootstrap-datepicker3.css') }}" />

		<!-- Specific Page Vendor CSS -->
		<link rel="stylesheet" href="{{ URL::asset('vendor/jquery-ui/jquery-ui.css') }}" />
		<link rel="stylesheet" href="{{ URL::asset('vendor/jquery-ui/jquery-ui.theme.css') }}" />
		<link rel="stylesheet" href="{{ URL::asset('vendor/bootstrap-multiselect/css/bootstrap-multiselect.css') }}" />
        <link rel="stylesheet" href="{{ URL::asset('vendor/morris/morris.css') }}" />
        
        <!-- Specific Page Vendor CSS -->
		<link rel="stylesheet" href="{{ URL::asset('vendor/select2/css/select2.css') }}" />
		<link rel="stylesheet" href="{{ URL::asset('vendor/select2-bootstrap-theme/select2-bootstrap.min.css') }}" />
		<link rel="stylesheet" href="{{ URL::asset('vendor/datatables/media/css/dataTables.bootstrap4.css') }}" />
		
				<!-- Specific Page Vendor CSS for Notifications -->
		<link rel="stylesheet" href="{{ URL::asset('vendor/pnotify/pnotify.custom.css') }}" />

        
		<!-- Theme CSS -->
		<link rel="stylesheet" href="{{ URL::asset('css/theme.css') }}" />
        <link rel="stylesheet" href="{{ URL::asset('css/default.css') }}" />

		<!-- Theme Custom CSS -->
        <link rel="stylesheet" href="{{ URL::asset('css/custom.css') }}">        
        <!--link rel="stylesheet" href="{{ URL::asset('css/autocss.css') }}"--> 
		<link rel="stylesheet" href="{{ URL::asset('css/jquery-confirm.min.css') }}">

		<!-- Head Libs  -->
        <script src="{{ URL::asset('vendor/modernizr/modernizr.js') }}"></script>
        
        

        <!-- Specific Page Vendor CSS for Notifications -->
        <link rel="stylesheet" href="{{ URL::asset('vendor/pnotify/pnotify.custom.css') }}" />
        <link href="https://unpkg.com/bootstrap-table@1.18.2/dist/bootstrap-table.min.css" rel="stylesheet">

        <script src="https://unpkg.com/bootstrap-table@1.18.2/dist/bootstrap-table.min.js"></script>
        @yield('pagecs')
        @livewireStyles

        
         
           
    </head>

    <body>
            <!-- The banner contains some code that may be needed for requests and responses -->
            <x-jet-banner />
            <section class="body">
    
                <!-- start: header -->
                <header class="header" style="border-top-width: 0px;">
                    <div class="logo-container">
                        <a href="{{ url('/') }}" class="logo">						
                        <img src="{{ URL::asset('img/landlod.png') }}" width="165" height="45" alt="Landlod Logo" />	</a>					
                        <div class="d-md-none toggle-sidebar-left" data-toggle-class="sidebar-left-opened" data-target="html" data-fire-event="sidebar-left-opened">
                            <i class="fas fa-bars" aria-label="Toggle sidebar"></i>				
                        </div>
                    </div>
                
                    <!-- start: search & user box -->
                    <div class="header-right">
                
                        
                
                        <span class="separator"></span>
                        <ul class="notifications">
                            <li><div><span class="text-primary">Notifications</span></div></li>
                          
                            
                        </ul>
                        
                        <span class="separator"></span>
                
                        <div id="userbox" class="userbox" data-turbolinks-permanent>
                            @php
                                $userid = Auth::user()->id;
                                $userProfilePhoto = Auth::user()->profile_photo_path;
                                
                            @endphp
                                <a href="#" data-toggle="dropdown" class="drop-btn">
                                    @if ($userProfilePhoto)
                                        <figure class="profile-picture">
                                            <img src="{{url("storage/$userProfilePhoto")}}" alt="{{ Auth::user()->firstname }} {{ Auth::user()->lastname }}" class="rounded-circle" data-lock-picture="{{asset("storage/photos/$userProfilePhoto")}}" />
                                        </figure>
                                    @endif
                                    
                                    <div class="profile-info">
                                        <span class="name text-primary">{{ Auth::user()->firstname }} {{ Auth::user()->lastname }}</span>
                                        <span class="role text-success">{{ Auth::user()->usercategory->usercategory }}</span>
                                        
                                    </div>
                    
                                    <i class="fa custom-caret"></i>
                                </a>
                    
                                <div class="dropdown-menu">
                                    <ul class="list-unstyled mb-2">
                                        <li class="divider"></li>
                                        <li> 
                                            <a role="menuitem" tabindex="-1" href="{{ url("/userprofile/$userid") }}"><i class="fas fa-user"></i> My Profile</a>
                                        </li>                                    
                                        <li>
                                            
                                            <a role="menuitem" tabindex="-1" href="{{ route('logout') }}"
                                                onclick="event.preventDefault();
                                                         document.getElementById('logout-form').submit();"><i class="fas fa-power-off"></i>
                                                Logout
                                            </a>
                                            <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                                    {{ csrf_field() }}
                                                </form>
                                        </li>
                                    </ul>
                                </div>
                           
                            
                        </div>
                    </div>
                    <!-- end: search & user box -->
                </header>
                <!-- end: header -->
    
                <div class="inner-wrapper">
                    <!-- start: sidebar -->
                    <aside id="sidebar-left" class="sidebar-left"  >
                    
                        <div class="sidebar-header" id="box" data-turbolinks-permanent>
                            <div class="sidebar-title">
                                Navigation
                            </div>
                            <div class="sidebar-toggle d-none d-md-block" data-toggle-class="sidebar-left-collapsed" data-target="html" data-fire-event="sidebar-left-toggle">
                                <i class="fas fa-bars" aria-label="Toggle sidebar"></i>
                            </div>
                        </div>
                    
                        <div class="nano">
                            <div class="nano-content">
                                @if (Auth::user()->usercategory->usercategoryid == 1)
                                <nav id="menu" class="nav-main" role="navigation">
                                
                                    <ul class="nav nav-main">
                                        <li>
                                            <a class="nav-link" href="{{ url('/dashboard') }}">
                                                <i class="fas fa-home" aria-hidden="true"></i>
                                                <span>Dashboard</span>
                                            </a>                        
                                        </li>
                                        <li class="nav-parent">
                                            <a class="nav-link" href="#">
                                                <i class="fas fa-columns" aria-hidden="true"></i>
                                                <span>Landlords</span>
                                            </a>
                                            <ul class="nav nav-children">
                                                <li>
                                                    <a class="nav-link" href="{{ url('/landlords') }}">
                                                      Landlords
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a class="nav-link" href="{{ url('/properties') }}">
                                                <i class="fas fa-copy" aria-hidden="true"></i>
                                                <span>Properties</span>
                                            </a>
                                        </li>
                                        <li class="nav-parent">
                                            <a class="nav-link">
                                                <i class="fas fa-building" aria-hidden="true"></i>
                                                <span>Spaces</span>
                                            </a>
                                            <ul class="nav nav-children">
                                                <li>
                                                    <a class="nav-link" href="{{ url('/spaces') }}">
                                                        Spaces
                                                    </a>
                                                </li>
                                                
                                            </ul>
                                        </li>  
                                        <li class="nav-parent">
                                            <a class="nav-link">
                                                <i class="fas fa-building" aria-hidden="true"></i>
                                                <span>Payments</span>
                                            </a>
                                            <ul class="nav nav-children">
                                                <li>
                                                    <a class="nav-link" href="{{ url('/payments/test') }}">
                                                        Test The Payments
                                                    </a>
                                                </li>
                                                <li>
                                                    <a class="nav-link" href="{{ url('/payments') }}">
                                                        Payments
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>                                  
                                    </ul>
                                </nav>
                                @endif
                                @if (Auth::user()->usercategory->usercategoryid == 200)
                                <nav id="menu" class="nav-main" role="navigation">
                                
                                    <ul class="nav nav-main">
                                        <li>
                                            <a class="nav-link" href="{{ url('/dashboard') }}">
                                                <i class="fas fa-home" aria-hidden="true"></i>
                                                <span>Dashboard</span>
                                            </a>                        
                                        </li>
                                        <li class="nav-parent">
                                            <a class="nav-link" >
                                                <i class="fas fa-copy" aria-hidden="true"></i>
                                                <span>Properties</span>
                                            </a>
                                            <ul class="nav nav-children">
                                                <li>
                                                    <a class="nav-link" href="{{ url('/properties') }}">
                                                        Properties
                                                    </a>
                                                </li>
                                                <li>
                                                    <a class="nav-link" href="{{ url("/landlords/landlord/addproperty/$userid") }}">
                                                        Add Property
                                                    </a>
                                                </li>
                                                
                                            </ul>
                                        </li>
                                        <li class="nav-parent">
                                            <a class="nav-link">
                                                <i class="fas fa-building" aria-hidden="true"></i>
                                                <span>Spaces</span>
                                            </a>
                                            <ul class="nav nav-children">
                                                <li>
                                                    <a class="nav-link" href="{{ url('/spaces') }}">
                                                        Spaces
                                                    </a>
                                                </li>
                                                <li>
                                                    <a class="nav-link" href="{{ url("/landlords/landlord/addspace/$userid") }}">
                                                        Add Space
                                                    </a>
                                                </li>
                                                
                                            </ul>
                                        </li>                                 
                                    </ul>
                                </nav>
                                @endif
                                
                            </div>
                    
                            <script>
                                // Maintain Scroll Position
                                if (typeof localStorage !== 'undefined') {
                                    if (localStorage.getItem('sidebar-left-position') !== null) {
                                        var initialPosition = localStorage.getItem('sidebar-left-position'),
                                            sidebarLeft = document.querySelector('#sidebar-left .nano-content');
                                        
                                        sidebarLeft.scrollTop = initialPosition;
                                    }
                                }
                            </script>
                            
                    
                        </div>
                    
                    </aside>
                    <!-- end: sidebar -->
    
                    <!-- start of content -->
                    <section role="main" class="content-body">
                        {{ $header }}
                        
                        {{----@section('page-header')
                        @show--}}

                        {{----@yield('content') --}}
                        {{ $slot }}
                    </section>
                    

                    
                    
                </div>
                
                    
              
                
            </section>

            
    
            <!-- Vendor -->
            <script src="{{ URL::asset('vendor/jquery/jquery.js') }}"></script>
            <script src="{{ URL::asset('vendor/jquery-browser-mobile/jquery.browser.mobile.js') }}"></script>
            <script src="{{ URL::asset('vendor/jquery-cookie/jquery.cookie.js') }}"></script>
            <script src="{{ URL::asset('master/style-switcher/style.switcher.js') }}"></script>
            <script src="{{ URL::asset('vendor/popper/umd/popper.min.js') }}"></script>
            <script src="{{ URL::asset('vendor/bootstrap/js/bootstrap.js') }}"></script>
            <script src="{{ URL::asset('vendor/bootstrap-datepicker/js/bootstrap-datepicker.js') }}"></script>
            <script src="{{ URL::asset('vendor/common/common.js') }}"></script>
            <script src="{{ URL::asset('vendor/nanoscroller/nanoscroller.js') }}"></script>
            <script src="{{ URL::asset('vendor/magnific-popup/jquery.magnific-popup.js') }}"></script>
            <script src="{{ URL::asset('vendor/jquery-placeholder/jquery.placeholder.js') }}"></script>
            
            <!-- Specific Page Vendor -->
            <script src="{{ URL::asset('vendor/liquid-meter/liquid.meter.js') }}"></script>
            <script src="{{ URL::asset('vendor/jquery-ui/jquery-ui.js') }}"></script>
            <script src="{{ URL::asset('vendor/jqueryui-touch-punch/jquery.ui.touch-punch.js') }}"></script>
            <script src="{{ URL::asset('vendor/jquery-appear/jquery.appear.js') }}"></script>
            <script src="{{ URL::asset('vendor/bootstrap-multiselect/js/bootstrap-multiselect.js') }}"></script>
            <script src="{{ URL::asset('vendor/jquery.easy-pie-chart/jquery.easypiechart.js') }}"></script>
            <script src="{{ URL::asset('vendor/flot/jquery.flot.js') }}"></script>
            <script src="{{ URL::asset('vendor/flot.tooltip/jquery.flot.tooltip.js') }}"></script>
            <script src="{{ URL::asset('vendor/flot/jquery.flot.pie.js') }}"></script>
            <script src="{{ URL::asset('vendor/flot/jquery.flot.categories.js') }}"></script>
            <script src="{{ URL::asset('vendor/flot/jquery.flot.resize.js') }}"></script>
            <script src="{{ URL::asset('vendor/jquery-sparkline/jquery.sparkline.js') }}"></script>
            <script src="{{ URL::asset('vendor/raphael/raphael.js') }}"></script>
            <script src="{{ URL::asset('vendor/morris/morris.js') }}"></script>
            <script src="{{ URL::asset('vendor/gauge/gauge.js') }}"></script>
            <script src="{{ URL::asset('vendor/snap.svg/snap.svg.js') }}"></script>
            

                <!-- Specific Page Vendor -->
            <script src="{{ URL::asset('vendor/select2/js/select2.js') }}"></script>
            <script src="{{ URL::asset('vendor/datatables/media/js/jquery.dataTables.min.js') }}"></script>
            <script src="{{ URL::asset('vendor/datatables/media/js/dataTables.bootstrap4.min.js') }}"></script>
            <script src="{{ URL::asset('vendor/datatables/extras/TableTools/Buttons-1.4.2/js/dataTables.buttons.min.js') }}"></script>
            <script src="{{ URL::asset('vendor/datatables/extras/TableTools/Buttons-1.4.2/js/buttons.bootstrap4.min.js') }}"></script>
            <script src="{{ URL::asset('vendor/datatables/extras/TableTools/Buttons-1.4.2/js/buttons.html5.min.js') }}"></script>
            <script src="{{ URL::asset('vendor/datatables/extras/TableTools/Buttons-1.4.2/js/buttons.print.min.js') }}"></script>
            <script src="{{ URL::asset('vendor/datatables/extras/TableTools/JSZip-2.5.0/jszip.min.js') }}"></script>
            <script src="{{ URL::asset('vendor/datatables/extras/TableTools/pdfmake-0.1.32/pdfmake.min.js') }}"></script>
            <script src="{{ URL::asset('vendor/datatables/extras/TableTools/pdfmake-0.1.32/vfs_fonts.js') }}"></script>
            
            <script src="{{ URL::asset('vendor/pnotify/pnotify.custom.js') }}"></script>

            <!-- Specific Page Vendor For the Wizard -->
            <script src="{{ URL::asset('vendor/jquery-validation/jquery.validate.js') }}"></script>
            <script src="{{ URL::asset('vendor/bootstrap-wizard/jquery.bootstrap.wizard.js') }}"></script>
            <script src="{{ URL::asset('vendor/ios7-switch/ios7-switch.js') }}"></script>
            
            <!-- Specific Page Vendor For the Charts  -->
            
            <script src="{{ URL::asset('vendor/chartist/chartist.js') }}"></script>
            

            <!-- Theme Base, Components and Settings -->
            <script src="{{ URL::asset('js/theme.js') }}" defer></script>
            
            
            <!-- Theme Custom -->
            <script src="{{ URL::asset('js/custom.js') }}" ></script>
            
            
            <!-- Theme Initialization Files -->
            <script src="{{ URL::asset('js/theme.init.js') }}" defer></script>

            <!-- Specific Page Vendor For the Nestable-->		
            <script src="{{ URL::asset('vendor/jquery-nestable/jquery.nestable.js') }}"></script>
            <script src="{{ URL::asset('js/examples/examples.nestable.js') }}"></script>
            
            <!-- Examples -->
            <script src="{{ URL::asset('js/examples/examples.dashboard.js') }}"></script>

            <!-- Examples -->
            <script src="{{ URL::asset('js/examples/examples.datatables.default.js') }}"></script>
            <script src="{{ URL::asset('js/examples/examples.datatables.row.with.details.js') }}"></script>
            <script src="{{ URL::asset('js/examples/examples.datatables.tabletools.js') }}"></script>
            
            
            <!-- Examples -->
            <script src="{{ URL::asset('js/examples/examples.modals.js') }}"></script>

            <script src="{{ URL::asset('js/examples/examples.modals.js') }}"></script>
            <!-- Examples For the Wizard-->
            <script src="{{ URL::asset('js/examples/examples.wizard.js') }}"></script>
            
            <!-- Examples For the Nestable-->
            <script src="{{ URL::asset('js/examples/examples.charts.js') }}"></script>

            
            <!-- Code to handle Admin Requests-->

            
            <script src="{{ URL::asset('js/jquery-confirm.min.js') }}"></script>
            <script src="{{ URL::asset('js/numeral.min.js') }}"></script>
            <script src="{{ URL::asset('js/moment.js') }}"></script>
            <script src="{{ URL::asset('js/custom/bootstable.js') }}"></script>

            <script src="{{ URL::asset('js/es6-promise.auto.js') }}"></script>
            <script src="{{ URL::asset('js/jspdf.min.js') }}"></script>
            <script src="{{ URL::asset('js/html2canvas.min.js') }}"></script>
            <script src="{{ URL::asset('js/html2pdf.min.js') }}"></script>
            <script src="{{ URL::asset('js/jspdf.plugin.autotable.min.js') }}"></script>

            
            @livewireScripts
            <script src="{{ URL::asset('js/turbo.js') }}" data-turbolinks-eval="false" data-turbo-eval="false"></script>
            <script src="{{ URL::asset('js/sweetalert2.all.min.js') }}"></script>
            <!-- start of js content -->
            @section('pagejs')
            @show

            @stack('modals')

            
            
            <x-livewire-alert::scripts /> 
        </body>
</html>