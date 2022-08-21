
<!DOCTYPE html>
<html>
	<head>
        <meta charset="utf-8">

        <!-- Mobile Metas -->
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="turbolinks-cache-control" content="no-preview">

        <title>Landlod | Log In</title>
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

        <section role="main" class="content-body">
            <section class="body-sign">
                <div class="center-sign">
                    <a href="#" class="logo float-left">
                        <img src="{{ URL::asset('img/landlod.png') }}" height="54"  alt="Landlod logo" />
                    </a>
        
                    <div class="panel card-sign">
                        <div class="card-title-sign mt-3 text-right">
                            <h2 class="title text-uppercase font-weight-bold m-0"><i class="fas fa-user mr-1"></i> Sign In</h2>
                        </div>
                        <div class="card-body">
                            @if (session('status'))
                                <div class="mb-4 font-medium text-sm text-green-600">
                                    {{ __('status') }}
                                </div>
                            @endif
                            
                            <form class="form-horizontal" method="POST" action="{{route('login')}}"> <!-- action="route('login')" -->
                                        {{ csrf_field() }}
        
                                <div class="form-group mb-3{{ $errors->has('Email') ? ' has-error' : '' }}">
                                    <label for="Email">Email</label>
                                    <div class="input-group">
                                        <input id="email" name="email" type="email" class="form-control form-control-lg" value="{{ old('username') }}" required autofocus />
                                        <span class="input-group-append">
                                            <span class="input-group-text">
                                                <i class="fas fa-user"></i>
                                            </span>
                                        </span>
                                    </div>
                                        
                                        @if ($errors->has('email'))
                                        <div>
                                            <label class="error">                                          
                                                <strong>{{ $errors->first('email') }}</strong>
                                            </label>
                                        </div>
                                    @endif
                                    
                                </div>
                                
        
                                <div class="form-group mb-3{{ $errors->has('password') ? ' has-error' : '' }}">
                                    <div class="clearfix">
                                        <label for="password" class="float-left">Password</label>									
                                    </div>
                                    <div class="input-group">
                                        <input id="password" name="password" type="password" class="form-control form-control-lg" required/>
                                        <span class="input-group-append">
                                            <span class="input-group-text">
                                                <i class="fas fa-lock"></i>
                                            </span>
                                        </span>
                                    </div>  
                                        @if ($errors->has('password'))
                                            <div>
                                                <label class="error">
                                                    <strong>{{ $errors->first('password') }}</strong>
                                                </label>
                                            </div>
                                        @endif						
                                </div>
                                
                            
        
                                <div class="row">
                                    <div class="col-sm-12 text-right">
                                        <x-jet-button class="btn btn-primary mt-2 w-100">
                                            {{ __('Login') }}
                                        </x-jet-button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
        
                    <p class="text-center text-muted mt-3 mb-3">&copy; Copyright {{date('Y')}}. All Rights Reserved.</p>
                </div>
            </section>
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
        <script src="{{ URL::asset(mix('js/app.js')) }}"  data-turbolinks-track="reload"></script>
        <script src="{{ URL::asset('js/turbo.js') }}" data-turbolinks-eval="false" data-turbo-eval="false"></script>
        <script src="{{ URL::asset('js/sweetalert2.all.min.js') }}"></script>
        <!-- start of js content -->
        @section('pagejs')
        @show

        @stack('modals')

        
        
        <x-livewire-alert::scripts /> 
    </body>
</html>




