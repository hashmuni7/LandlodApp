
<!DOCTYPE html>
<html>
	<head>

		<!-- Basic -->
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">	

		<title></title>	

		<meta name="keywords" content="HTML5 Template" />
		<meta name="description" content="Porto - Responsive HTML5 Template">
		<meta name="author" content="okler.net">

		<!-- Favicon -->
        <link rel="icon" href="{{ URL::asset('img/small-logo.ico') }}"  type="image/x-icon" />
		<link rel="shortcut icon" href="{{ URL::asset('guest/img/favicon.ico" type="image/x-icon')}}" />
		<link rel="apple-touch-icon" href="{{ URL::asset('guest/img/apple-touch-icon.png')}}">

		<!-- Mobile Metas -->
		<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, shrink-to-fit=no">

		<!-- Web Fonts  -->
		<link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700&display=swap" rel="stylesheet" type="text/css">

		<!-- Vendor CSS -->
		<link rel="stylesheet" href="{{URL::asset('guest/vendor/bootstrap/css/bootstrap.min.css')}}">
		<link rel="stylesheet" href="{{URL::asset('guest/vendor/fontawesome-free/css/all.min.css')}}">
		<link rel="stylesheet" href="{{URL::asset('guest/vendor/animate/animate.compat.css')}}">
		<link rel="stylesheet" href="{{URL::asset('guest/vendor/simple-line-icons/css/simple-line-icons.min.css')}}">
		<link rel="stylesheet" href="{{URL::asset('guest/vendor/owl.carousel/assets/owl.carousel.min.css')}}">
		<link rel="stylesheet" href="{{URL::asset('guest/vendor/owl.carousel/assets/owl.theme.default.min.css')}}">
		<link rel="stylesheet" href="{{URL::asset('guest/vendor/magnific-popup/magnific-popup.min.css')}}">

		<!-- Theme CSS -->
		<link rel="stylesheet" href="{{URL::asset('guest/css/theme.css')}}">
		<link rel="stylesheet" href="{{URL::asset('guest/css/theme-elements.css')}}">
		<link rel="stylesheet" href="{{URL::asset('guest/css/theme-blog.css')}}">
		<link rel="stylesheet" href="{{URL::asset('guest/css/theme-shop.css')}}">


		<!-- Demo CSS -->
		<link rel="stylesheet" href="{{URL::asset('guest/css/demos/demo-finance.css')}}">
		<!-- Skin CSS -->
		<link rel="stylesheet" href="{{URL::asset('guest/css/skins/skin-finance.css')}}"> 

		<!-- Theme Custom CSS -->
		<link rel="stylesheet" href="{{URL::asset('guest/css/custom.css')}}">

		<!-- Head Libs -->
		<script src="{{URL::asset('guest/vendor/modernizr/modernizr.min.js')}}"></script>
        @yield('pagecs')
        @livewireStyles
	</head>
    <body>

            <div class="body">
                <header id="header" class="header-effect-shrink" data-plugin-options="{'stickyEnabled': true, 'stickyEffect': 'shrink', 'stickyEnableOnBoxed': true, 'stickyEnableOnMobile': true, 'stickyChangeLogo': true, 'stickyStartAt': 30, 'stickyHeaderContainerHeight': 70}">
                    <div class="header-body border-0">
                        <div class="header-container container">
                            <div class="header-row">
                                <div class="header-column">
                                    <div class="header-row">
                                        <div class="header-logo">
                                            <a href="{{ url('/') }}">
                                                
                                                <img alt="Landlod App" width="170" height="45" src="{{URL::asset('img/landlod.png')}}">
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="header-column justify-content-end">
                                    <div class="header-row">
                                        <div class="header-nav header-nav-links order-2 order-lg-1">
                                            <div class="header-nav-main header-nav-main-square header-nav-main-effect-2 header-nav-main-sub-effect-1">
                                                <nav class="collapse">
                                                    <ul class="nav nav-pills" id="mainNav">
                                                        <li>
                                                            <a class="nav-link {{ Route::currentRouteNamed( 'home' ) ?  'active' : '' }}" href="{{ url('/') }}">
                                                                Home
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a class="nav-link {{ Route::currentRouteNamed( 'company' ) ?  'active' : '' }}" href="{{route('company')}}">
                                                                Company
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a class="nav-link {{ Route::currentRouteNamed( 'services' ) ?  'active' : '' }}" href="{{route('services')}}">
                                                                Features
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a class="nav-link {{ Route::currentRouteNamed( 'blog' ) ?  'active' : '' }}" href="{{route('blog')}}">
                                                                News
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a class="nav-link {{ Route::currentRouteNamed( 'contact' ) ?  'active' : '' }}" href="{{route('contact')}}">
                                                                Contact
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </nav>
                                            </div>
                                            <button class="btn header-btn-collapse-nav" data-toggle="collapse" data-target=".header-nav-main nav">
                                                <i class="fas fa-bars"></i>
                                            </button>
                                        </div>
                                        <div class="order-1 order-lg-2 ml-2">
                                            @auth
                                                <a href="{{ url('/dashboard') }}" class="btn btn-outline btn-rounded btn-primary btn-with-arrow">Dashboard</a>
                                            @else
                                                <a href="{{ route('login') }}" class="btn btn-outline btn-rounded btn-quaternary btn-with-arrow">Login<span><i class="fas fa-sign-in-alt"></i></span></a>
    
                                                @if (Route::has('register'))
                                                    <a href="{{ route('register') }}" class="btn btn-outline btn-rounded btn-primary btn-with-arrow">Register<span><i class="fas fa-chevron-right"></i></span></a>
                                                @endif
                                            @endauth
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <div role="main" class="main">
                    <!-- start: page -->
                        {{ $slot }}
                    <!-- end: page -->
                </div>
       

        <footer id="footer" class="custom-footer bg-color-light m-0">
                    <div class="container py-4">
                        <div class="row text-center text-lg-left pt-5 pb-4">
                            <div class="col-md-3 mb-4 mb-lg-0">
                                <a href="#" class="text-decoration-none">
                                    <img alt="Landlod App" class="img-fluid" width="190" height="45" src="{{URL::asset('guest/img/logos/landlod.png')}}">
                                </a>
                            </div>
                            <div class="col-md-2 mb-4 mb-lg-0">
                                <h5 class="text-color-dark font-weight-bold mb-1">Services</h5>
                                <ul>
                                    <li>
                                        <a class="custom-text-color-1" href="tel:+8001234567" target="_blank" title="Call Us">
                                            800 123 4567
                                        </a>
                                    </li>
                                    <li>
                                        <a class="custom-text-color-1" href="demo-finance-contact-us.html" title="Contact Us">
                                            Contact Us
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="col-md-2 mb-4 mb-lg-0">
                                <h5 class="text-color-dark font-weight-bold mb-1">Company</h5>
                                <ul>
                                    <li>
                                        <a class="custom-text-color-1" href="demo-finance-company.html" title="About Us">
                                            About Us
                                        </a>
                                    </li>
                                    <li>
                                        <a class="custom-text-color-1" href="demo-finance-team.html" title="Team">
                                            Team
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="col-md-2 mb-4 mb-lg-0">
                                <h5 class="text-color-dark font-weight-bold mb-1">Policies</h5>
                                <ul>
                                    <li>
                                        <a class="custom-text-color-1" href="#" title="Privacy policy">
                                            Privacy policy
                                        </a>
                                    </li>
                                    <li>
                                        <a class="custom-text-color-1" href="#" title="Terms of Use">
                                            Terms of Use
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="col-md-3">
                                <ul class="social-icons custom-social-icons float-lg-right">
                                    <li class="social-icons-facebook">
                                        <a href="http://www.facebook.com/" target="_blank" title="Facebook">
                                            <i class="fab fa-facebook-f"></i>
                                        </a>
                                    </li>
                                    <li class="social-icons-twitter">
                                        <a href="http://www.twitter.com/" target="_blank" title="Twitter">
                                            <i class="fab fa-twitter"></i>
                                        </a>
                                    </li>
                                    <li class="social-icons-instagram">
                                        <a href="http://www.instagram.com/" target="_blank" title="Instagram">
                                            <i class="fab fa-instagram"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="footer-copyright bg-color-light m-0 pt-3 pb-3">
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-12 text-center pt-3">
                                    <p class="custom-text-color-1">© Copyright 2020. All Rights Reserved.</p>
                                </div>
                            </div>
                        </div>
                    </div>
        </footer>
        
        <!-- Vendor -->
        <script src="{{ URL::asset('guest/vendor/jquery/jquery.min.js') }}"></script>
        <script src="{{ URL::asset('guest/vendor/jquery.appear/jquery.appear.min.js') }}"></script>
        <script src="{{ URL::asset('guest/vendor/jquery.easing/jquery.easing.min.js') }}"></script>
        <script src="{{ URL::asset('guest/vendor/jquery.cookie/jquery.cookie.min.js') }}"></script>
        <script src="{{ URL::asset('guest/vendor/popper/umd/popper.min.js') }}"></script>
        <script src="{{ URL::asset('guest/vendor/bootstrap/js/bootstrap.min.js') }}"></script>
        <script src="{{ URL::asset('guest/vendor/common/common.min.js') }}"></script>
        <script src="{{ URL::asset('guest/vendor/jquery.validation/jquery.validate.min.js') }}"></script>
        <script src="{{ URL::asset('guest/vendor/jquery.easy-pie-chart/jquery.easypiechart.min.js') }}"></script>
        <script src="{{ URL::asset('guest/vendor/jquery.gmap/jquery.gmap.min.js') }}"></script>
        <script src="{{ URL::asset('guest/vendor/jquery.lazyload/jquery.lazyload.min.js') }}"></script>
        <script src="{{ URL::asset('guest/vendor/isotope/jquery.isotope.min.js') }}"></script>
        <script src="{{ URL::asset('guest/vendor/owl.carousel/owl.carousel.min.js') }}"></script>
        <script src="{{ URL::asset('guest/vendor/magnific-popup/jquery.magnific-popup.min.js') }}"></script>
        <script src="{{ URL::asset('guest/vendor/vide/jquery.vide.min.js') }}"></script>
        <script src="{{ URL::asset('guest/vendor/vivus/vivus.min.js') }}"></script>

        <!-- Theme Base, Components and Settings -->
        <script src="{{ URL::asset('guest/js/theme.js') }}"></script>

        <!-- Current Page Vendor and Views -->


        <!-- Current Page Vendor and Views -->
        <script src="{{ URL::asset('guest/js/views/view.contact.js') }}"></script>

        <!-- Demo -->
        <script src="{{ URL::asset('guest/js/demos/demo-finance.js') }}"></script>

        <!-- Theme Custom -->
        <script src="{{ URL::asset('guest/js/custom.js') }}"></script>


        <!-- Theme Initialization Files -->
        <script src="{{ URL::asset('guest/js/theme.init.js') }}"></script>

        <x-livewire-alert::scripts /> 
        @section('pagejs')
    </body>
</html>



