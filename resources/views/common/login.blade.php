<!doctype html>
<html lang="{{ app()->getLocale() }}" class="fixed">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no">

        <title>Landlod | Log In</title>

        <!-- Vendor CSS -->
		<link rel="stylesheet" href="{{ URL::asset('vendor/bootstrap/css/bootstrap.css') }}" />
		<link rel="stylesheet" href="{{ URL::asset('vendor/animate/animate.css') }}">

		<link rel="stylesheet" href="{{ URL::asset('vendor/font-awesome/css/all.min.css') }}" />
		<link rel="stylesheet" href="{{ URL::asset('vendor/magnific-popup/magnific-popup.css') }}" />
		<link rel="stylesheet" href="{{ URL::asset('vendor/bootstrap-datepicker/css/bootstrap-datepicker3.css') }}" />

		<!-- Specific Page Vendor CSS -->
		<link rel="stylesheet" href="{{ URL::asset('vendor/jquery-ui/jquery-ui.css') }}" />
		<link rel="stylesheet" href="{{ URL::asset('vendor/jquery-ui/jquery-ui.theme.css') }}" />
		<link rel="stylesheet" href="{{ URL::asset('vendor/bootstrap-multiselect/css/bootstrap-multiselect.css') }}" />
		<link rel="stylesheet" href="{{ URL::asset('vendor/morris/morris.css') }}" />

		<!-- Theme CSS -->
		<link rel="stylesheet" href="{{ URL::asset('css/theme.css') }}" />

		<!-- Theme Custom CSS -->
		<link rel="stylesheet" href="{{ URL::asset('css/custom.css') }}">

		<!-- Head Libs -->
        <script src="{{ URL::asset('vendor/modernizr/modernizr.js') }}"></script>
       
    </head>
    <body>
        <!-- start: page -->
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
                        <form class="form-horizontal" method="POST" > <!-- action="route('login')" -->
                                    {{ csrf_field() }}

							<div class="form-group mb-3{{ $errors->has('username') ? ' has-error' : '' }}">
								<label for="username">Usrname</label>
								<div class="input-group">
									<input id="username" name="username" type="name" class="form-control form-control-lg" value="{{ old('username') }}" required autofocus />
									<span class="input-group-append">
										<span class="input-group-text">
											<i class="fas fa-user"></i>
										</span>
                                    </span>
                                </div>
                                    
                                    @if ($errors->has('username'))
                                    <div>
                                        <label class="error">                                          
                                            <strong>{{ $errors->first('username') }}</strong>
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
									<button type="submit" class="btn btn-primary mt-2 w-100">Sign In</button>
								</div>
							</div>
						</form>
					</div>
				</div>

				<p class="text-center text-muted mt-3 mb-3">&copy; Copyright {{date('Y')}}. All Rights Reserved.</p>
			</div>
		</section>
        <!-- end: page -->
        

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
        
        
        <!-- Theme Base, Components and Settings -->
        <script src="{{ URL::asset('js/theme.js') }}"></script>
        
        <!-- Theme Custom -->
        <script src="{{ URL::asset('js/custom.js') }}"></script>
        
        <!-- Theme Initialization Files -->
        <script src="{{ URL::asset('js/theme.init.js') }}"></script>
        
    </body>
</html>




