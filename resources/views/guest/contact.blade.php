<x-guest-layout>
    
    <x-slot name="title">
        Company
    </x-slot>

    <!--The page starts from here-->
    <div>
        <section class="section section-no-border bg-color-tertiary custom-parallax-medium-padding m-0">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <h1 class="text-uppercase font-weight-bold text-center m-0">Contact</h1>
                    </div>
                </div>
            </div>
        </section>

        <section class="section section-no-border bg-color-light custom-section-spacement-1 m-0 pb-0">
            <div class="container">
                <div class="row text-center text-lg-left">
                    <div class="col-md-6 col-lg-3 custom-min-height-1 custom-center-xs">
                        <img src="img/demos/finance/icons/custom-icon-6.png" alt class="mb-3" />
                        <h4 class="font-weight-semibold mb-3">Address</h4>
                        <p class="custom-text-color-1">
                            123 Porto Av<br>
                            Porto, PT 12345<br>
                            Second Floor
                        </p>
                    </div>
                    <div class="col-md-6 col-lg-3 custom-min-height-1 custom-center-xs">
                        <img src="img/demos/finance/icons/custom-icon-7.png" alt class="mb-3" />
                        <h4 class="font-weight-semibold mb-3">Phone</h4>
                        <ul class="custom-list-style-3">
                            <li>
                                <span class="title text-color-dark">Office <span class="custom-text-color-1 float-right">:</span></span>
                                <span class="value">
                                    <a href="tel:+18001234567" class="custom-text-color-1">800 123 4567</a>
                                </span>
                            </li>
                            <li>
                                <span class="title text-color-dark">Sale <span class="custom-text-color-1 float-right">:</span></span>
                                <span class="value">
                                    <a href="tel:+18001234567" class="custom-text-color-1">800 123 4568</a>
                                </span>
                            </li>
                            <li>
                                <span class="title text-color-dark">Admin <span class="custom-text-color-1 float-right">:</span></span>
                                <span class="value">
                                    <a href="tel:+18001234567" class="custom-text-color-1">800 123 4569</a>
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div class="col-md-6 col-lg-3 custom-min-height-1 custom-center-xs">
                        <img src="img/demos/finance/icons/custom-icon-8.png" alt class="mb-3" />
                        <h4 class="font-weight-semibold mb-3">Email</h4>
                        <ul class="custom-list">
                            <li>
                                <a href="mail:you@domain.com" class="custom-text-color-1" title="Contact Us">hello@finance.com</a>
                            </li>
                            <li>
                                <a href="mail:you@domain.com" class="custom-text-color-1" title="Sales">sales@finance.com</a>
                            </li>
                            <li>
                                <a href="mail:you@domain.com" class="custom-text-color-1" title="Careers">careers@finance.com</a>
                            </li>
                        </ul>
                    </div>
                    <div class="col-md-6 col-lg-3 custom-min-height-1 custom-center-xs">
                        <img src="img/demos/finance/icons/custom-icon-9.png" alt class="mb-3" />
                        <h4 class="font-weight-semibold mb-3">Social media</h4>
                        <ul class="custom-list">
                            <li>
                                <i class="fab fa-facebook-square custom-text-color-1 mr-2"></i>
                                <a href="http://www.facebook.com" class="custom-text-color-1" title="Facebook">Facebook</a>
                            </li>
                            <li>
                                <i class="fab fa-twitter-square custom-text-color-1 mr-2"></i>
                                <a href="http://www.twitter.com" class="custom-text-color-1" title="Twitter">Twitter</a>
                            </li>
                            <li>
                                <i class="fab fa-linkedin custom-text-color-1 mr-2"></i>
                                <a href="http://www.linkedin.com" class="custom-text-color-1" title="Linkedin">Linkedin</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <section class="section section-no-border section-primary custom-section-spacement-1 m-0">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-8 text-center">
                        <h2 class="text-uppercase font-weight-bold text-color-light d-block">Get In Touch</h2>
                        <p class="text-4 text-color-light mb-5">send us your needs</p>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-lg-8">
                        <form class="contact-form custom-form-style contact-page" action="php/contact-form.php" method="POST">
                            <div class="contact-form-success alert alert-success d-none mt-4" id="contactFormSuccess">
                                <strong>Success!</strong> Your message has been sent to us.
                            </div>

                            <div class="contact-form-error alert alert-danger d-none mt-4" id="contactFormError">
                                <strong>Error!</strong> There was an error sending your message.
                                <span class="mail-error-message text-1 mt-2 d-block" id="contactFormErrorMessage"></span>
                            </div>

                            <input type="hidden" name="subject" value="Contact Message Received" />
                            <div class="form-row">
                                <div class="form-group col-lg-6">
                                    <div class="form-control-custom">
                                        <i class="icon-user icons text-color-light"></i>
                                        <input type="text" value="" data-msg-required="Please enter your name." maxlength="100" class="form-control" name="name" placeholder="Name *" required>
                                    </div>
                                </div>
                                <div class="form-group col-lg-6">
                                    <div class="form-control-custom">
                                        <i class="icon-envelope icons text-color-light"></i>
                                        <input type="email" value="" data-msg-required="Please enter your email address." data-msg-email="Please enter a valid email address." maxlength="100" class="form-control" name="email" placeholder="Email *" required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-lg-6">
                                    <div class="form-control-custom">
                                        <i class="icon-call-out icons text-color-light"></i>
                                        <input type="text" value="" data-msg-required="Please enter your phone number." maxlength="100" class="form-control" name="phone" id="phone" placeholder="Phone *" required>
                                    </div>
                                </div>
                                <div class="form-group col-lg-6">
                                    <div class="form-control-custom custom-select-style mb-0">
                                        <i class="icon-target icons text-color-light"></i>
                                        <select data-msg-required="Please select..." class="form-control" name="selectSample" id="selectSample" placeholder="Services *" required>
                                            <option value="">...</option>
                                            <option value="Option 1">Option 1</option>
                                            <option value="Option 2">Option 2</option>
                                            <option value="Option 3">Option 3</option>
                                            <option value="Option 4">Option 4</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col">
                                    <div class="form-control-custom">
                                        <i class="icon-bubble icons text-color-light"></i>
                                        <textarea maxlength="5000" data-msg-required="Please enter your message." rows="10" class="form-control" name="message" placeholder="Message *" required></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="form-row text-center">
                                <div class="form-group col">
                                    <input type="submit" value="Submit Now" class="btn btn-outline custom-btn-style-4 text-uppercase" data-loading-text="Loading...">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>

        <!-- Google Maps - Go to the bottom of the page to change settings and map location. -->
        <div id="googlemaps"></div>
    </div>
  
    @section('pagejs')
    <!-- Code to handle Admin Requests -->
    <script src="{{ URL::asset('js/custom/accounts.js') }}"></script>
    <!-- Current Page Vendor and Views -->
		<script src="{{ URL::asset('guest/js/views/view.contact.js') }}"></script>

		<!-- Demo -->
		<script src="{{ URL::asset('guest/js/demos/demo-finance.js') }}"></script>

		<!-- Theme Custom -->
		<script src="{{ URL::asset('guest/js/custom.js') }}"></script>


		<!-- Theme Initialization Files -->
		<script src="{{ URL::asset('guest/js/theme.init.js') }}"></script>


		<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY"></script>
		<script>

			/*
			Map Settings

				Find the Latitude and Longitude of your address:
					- https://www.latlong.net/
					- http://www.findlatitudeandlongitude.com/find-address-from-latitude-and-longitude/

			*/

			// Map Markers
			var mapMarkers = [{
				address: "New York, NY 10017",
				html: "<strong>Porto Finance</strong><br>New York, NY 10017<br><br><a href='#' onclick='mapCenterAt({latitude: 40.75198, longitude: -73.96978, zoom: 16}, event)'>[+] zoom here</a>",
				icon: {
					image: "img/demos/finance/map-pin.png",
					iconsize: [88, 58],
					iconanchor: [88, 58]
				}
			}];

			// Map Initial Location
			var initLatitude = 40.75198;
			var initLongitude = -73.96978;

			// Map Extended Settings
			var mapSettings = {
				controls: {
					draggable: (($.browser.mobile) ? false : true),
					panControl: true,
					zoomControl: true,
					mapTypeControl: true,
					scaleControl: true,
					streetViewControl: true,
					overviewMapControl: true
				},
				scrollwheel: false,
				markers: mapMarkers,
				latitude: initLatitude,
				longitude: initLongitude,
				zoom: 14
			};

			var map = $('#googlemaps').gMap(mapSettings),
				mapRef = $('#googlemaps').data('gMap.reference');

			// Map text-center At
			var mapCenterAt = function(options, e) {
				e.preventDefault();
				$('#googlemaps').gMap("centerAt", options);
			}

			// Styles from https://snazzymaps.com/
			var styles = [{"featureType":"administrative.locality","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"invert_lightness":true}]},{"featureType":"administrative.locality","elementType":"labels.icon","stylers":[{"invert_lightness":true}]}];

			var styledMap = new google.maps.StyledMapType(styles, {
				name: 'Styled Map'
			});

			mapRef.mapTypes.set('map_style', styledMap);
			mapRef.setMapTypeId('map_style');

		</script>
        
    @endsection
    
</x-guest-layout>