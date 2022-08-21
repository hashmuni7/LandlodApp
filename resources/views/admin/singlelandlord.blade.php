@extends('admin.layout')

@section('title')
    Single Landlord
@endsection


@section('content')
<section role="main" class="content-body">
        <header class="page-header">
            <h2>Single Landlord</h2>
        
            <div class="right-wrapper text-right">
                <ol class="breadcrumbs">
                    <li>
                        <a href="{{-- url('/adminhome') --}}">
                            <i class="fas fa-home"></i>
                        </a>
                    </li>
                    <li><span>My Landlords</span></li>
                    <li><span>Single Landlord</span></li>
                </ol>
        
                <a class="sidebar-right-toggle" ><i class="fas fa-chevron-left"></i></a>
            </div>
        </header>

        <!-- start: page -->
        <div class="row">
            <div class="container-fluid mb-3">
                <section class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-xl-8">
                                <div class="col-xl-12">
                                    <h2 class="center">                                    
                                        <strong>
                                            Kabuye Hashim
                                        </strong>
                                    </h2>
                                </div>
                                <div class="row">
                                    <div class="col-xl-3 stag mb-3">
                                        <span class="head-tag">Sex</span>
                                        <span class="body-tag">Male</span>
                                    </div>
                                    <div class="col-xl-3 stag mb-3">
                                        <span class="head-tag">Properties</span>
                                        <span class="body-tag">3</span>
                                    </div>
                                    <div class="col-xl-3 stag mb-3">
                                        <span class="head-tag">Spaces</span>
                                        <span class="body-tag">34</span>
                                    </div>
                                    <div class="col-xl-3 stag mb-3">
                                        <span class="head-tag">Tenants</span>
                                        <span class="body-tag">30</span>
                                    </div>
                                    <div class="col-xl-3 stag mb-3">
                                        <span class="head-tag">Occupancy</span>
                                        <span class="body-tag">92%</span>
                                    </div>
                                    <div class="col-xl-3 stag mb-3">
                                        <span class="head-tag">Phone Number (Primary)</span>
                                        <span class="body-tag">0705949874</span>
                                    </div>
                                    <div class="col-xl-6 stag mb-3">
                                        <span class="head-tag">Email</span>
                                        <span class="body-tag" style="font-size: 1.1em">hashmuni7hashmuni7hashmuni7@gmail.com</span>
                                    </div>                                     
                                    
                                </div>
                            </div>
                            <div class="col-xl-4 text-center">
                                <i class="mt-4 fas fa-home" style="font-size: 9em;" aria-hidden="true"></i>
                                <h4 class="center">                                    
                                    <strong>
                                        Outstanding Balance: UGX 500,000
                                    </strong>
                                </h4>
                                <button type="button" class="btn btn-primary btn-md btn-block">Pay Rent</button>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="row">
                            <div class="col-xl-7 m-auto">
                                <div class="btn-group d-flex" role="group">
                                    <a class="btn btn-default w-100" role="button">Edit</a>
                                    <a class="btn btn-default w-100" role="button">Add Property</a>
                                    <a class="btn btn-default w-100" role="button">Add Space</a>
                                    <a class="btn btn-default w-100" role="button">Add Tenant</a>                                                                      
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </section>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <div class="tabs">
                    <ul class="nav nav-tabs">
                        <li class="nav-item active">
                            <a class="nav-link" href="#popular" data-toggle="tab"><i class="fas fa-star"></i> Payments</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#properties" data-toggle="tab">Properties</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#spaces" data-toggle="tab">Spaces</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#tenants" data-toggle="tab">Tenants</a>
                        </li>
                    </ul>
                    <div class="tab-content">
                        <div id="popular" class="tab-pane active">                            
                            <div class="row">
                                <div class="col-md-12">
                                    <section class="card">
                                        <header class="card-header card-header-transparent">
                                            <div class="card-actions">
                                                
                                            </div>
                            
                                            <h2 class="card-title">Payments</h2>
                                        </header>
                                        <div class="card-body">
                                            <table class="table table-responsive-md table-striped mb-0">
                                                <thead>
                                                    <tr>
                                                        <th>Status</th>
                                                        <th>Date</th>
                                                        <th>Space Code</th>
                                                        <th>Amount</th>
                                                        <th>Receipt No</th>
                                                        <th>Space Name</th>
                                                        <th>Property</th>
                                                        <th>Channel</th>
                                                        <th>Channel Txn ID</th>
                                                        <th>Channel Memo</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Processing</td>
                                                        <td>Mon, 24 July 2020 16:34</td>
                                                        <td>2734618</td>
                                                        <td>UGX 500,000</td>
                                                        <td>34568920</td>
                                                        <td>L1-04</td>
                                                        <td>Zai Plaza</td>
                                                        <td>MTN Mobile Money</td>
                                                        <td>90643780987</td>
                                                        <td>Rent L1-04 Kabuye</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Complete</td>
                                                        <td>Mon, 24 July 2020 16:34</td>
                                                        <td>2734618</td>
                                                        <td>UGX 500,000</td>
                                                        <td>34568920</td>
                                                        <td>L1-04</td>
                                                        <td>Zai Plaza</td>
                                                        <td>MTN Mobile Money</td>
                                                        <td>90643780987</td>
                                                        <td>Rent L1-04 Kabuye</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Complete</td>
                                                        <td>Mon, 24 July 2020 16:34</td>
                                                        <td>2734618</td>
                                                        <td>UGX 500,000</td>
                                                        <td>34568920</td>
                                                        <td>L1-04</td>
                                                        <td>Zai Plaza</td>
                                                        <td>MTN Mobile Money</td>
                                                        <td>90643780987</td>
                                                        <td>Rent L1-04 Kabuye</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Complete</td>
                                                        <td>Mon, 24 July 2020 16:34</td>
                                                        <td>2734618</td>
                                                        <td>UGX 500,000</td>
                                                        <td>34568920</td>
                                                        <td>L1-04</td>
                                                        <td>Zai Plaza</td>
                                                        <td>MTN Mobile Money</td>
                                                        <td>90643780987</td>
                                                        <td>Rent L1-04 Kabuye</td>
                                                    </tr>
                                                    
                                                </tbody>
                                            </table>
                                        </div>
                                    </section>
                                </div>
                            </div>
                            
                        </div>
                        <div id="properties" class="tab-pane">
                            <div class="container-fluid">
                                <section class="card">
                                    <header class="card-header card-header-transparent">
                                        <div class="card-actions">
                                            <a href="#" class="card-action card-action-toggle" data-card-toggle></a>
                                            <a href="#" class="card-action card-action-dismiss" data-card-dismiss></a>
                                        </div>
                        
                                        <h2 class="card-title">Properties</h2>
                                    </header>
                                    <div class="card-body">
                                        <table class="table table-responsive-md table-striped mb-0">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Property</th>
                                                    <th>City</th>
                                                    <th>Balance</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>Zai Plaza</td>
                                                    <td>Kampala</td>
                                                    <td>UGX 500,000</td>
                                                </tr>
                                                <tr>
                                                    <td>1</td>
                                                    <td>Zai Plaza</td>
                                                    <td>Kampala</td>
                                                    <td>UGX 500,000</td>
                                                <tr>
                                                    <td>1</td>
                                                    <td>Zai Plaza</td>
                                                    <td>Kampala</td>
                                                    <td>UGX 500,000</td>
                                                </tr>
                                                <tr>
                                                    <td>1</td>
                                                    <td>Zai Plaza</td>
                                                    <td>Kampala</td>
                                                    <td>UGX 500,000</td>
                                                </tr>
                                                
                                            </tbody>
                                        </table>
                                    </div>
                                </section>
                            </div>
                        </div>
                        <div id="spaces" class="tab-pane">
                            <div class="row">
                                <div class="col-md-12">
                                    <section class="card">
                                        <header class="card-header card-header-transparent">
                                            <div class="card-actions">
                                                
                                            </div>
                            
                                            <h2 class="card-title">Spaces</h2>
                                        </header>
                                        <div class="card-body">
                                            <table class="table table-responsive-md table-striped mb-0">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Space Name</th>
                                                        <th>Space Code</th>
                                                        <th>Status</th>
                                                        <th>Balance</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>L1-04</td>
                                                        <td>2734618</td>
                                                        <td>Occupied</td>
                                                        <td>UGX 500,000</td>                                    
                                                    </tr>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>L1-04</td>
                                                        <td>2734618</td>
                                                        <td>Occupied</td>
                                                        <td>UGX 500,000</td>                                    
                                                    </tr>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>L1-04</td>
                                                        <td>2734618</td>
                                                        <td>Occupied</td>
                                                        <td>UGX 500,000</td>                                    
                                                    </tr>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>L1-04</td>
                                                        <td>2734618</td>
                                                        <td>Occupied</td>
                                                        <td>UGX 500,000</td>                                    
                                                    </tr>
                                                    
                                                </tbody>
                                            </table>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>                        
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-12">
                <section class="card">
                    <header class="card-header card-header-transparent">
                        <div class="card-actions">
                            
                        </div>
        
                        <h2 class="card-title">Ledgers</h2>
                    </header>
                    <div class="card-body">
                        <table class="table table-responsive-md table-striped mb-0">
                            <thead>
                                <tr>                                    
                                    <th>Date</th>
                                    <th>Category</th>
                                    <th class="text-right">Debit</th>
                                    <th class="text-right">Credit</th>
                                    <th class="text-right">Closing</th>                                    
                                </tr>
                            </thead>
                            <tbody>
                                <tr>                                    
                                    <td>Mon, 24 July 2020 16:34</td>
                                    <td>Opening balance</td>
                                    <td class="text-right"></td>
                                    <td class="text-right"></td>
                                    <td class="text-right">0</td>                                    
                                </tr>
                                <tr>                                    
                                    <td>Mon, 24 Aug 2020 16:34</td>
                                    <td>Rent (24/07/20-24/08/20)</td>
                                    <td class="text-right">500,000</td>
                                    <td class="text-right"></td>
                                    <td class="text-right">500,000</td>                                    
                                </tr>
                                <tr>                                    
                                    <td>Mon, 24 Sept 2020 16:34</td>
                                    <td>Rent (24/08/20-24/09/20)</td>
                                    <td class="text-right">500,000</td>
                                    <td class="text-right"></td>
                                    <td class="text-right">1,000,000</td>                                    
                                </tr>
                                <tr>                                    
                                    <td>Sat, 30 July 2020 16:34</td>
                                    <td>Late Fee</td>
                                    <td class="text-right">50,000</td>
                                    <td class="text-right"></td>
                                    <td class="text-right">1,050,000</td>                                    
                                </tr>
                                <tr>                                    
                                    <td>Sat, 30 July 2020 16:34</td>
                                    <td>Rent Payment</td>
                                    <td class="text-right"></td>
                                    <td class="text-right">500,000</td>
                                    <td class="text-right">550,000</td>                                    
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div> 

        <div class="row">
            <div class="col-md-12">
                <section class="card">
                    <header class="card-header card-header-transparent">
                        <div class="card-actions">
                            
                        </div>
        
                        <h2 class="card-title">Space History</h2>
                    </header>
                    <div class="card-body">
                        <table class="table table-responsive-md table-striped mb-0">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Tenant</th>
                                    <th>Tenures</th>
                                    <th>Amount</th>
                                    <th>Paid</th>
                                    <th>Balance</th>                                    
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Mon, 24 July 2020</td>
                                    <td>Mon, 24 July 2020</td>
                                    <td>Kabuye Hashim</td>
                                    <td>3</td>
                                    <td>UGX 3,500,000</td>
                                    <td>UGX 3,000,000</td>
                                    <td>UGX 500,000</td>                                    
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Mon, 24 July 2020</td>
                                    <td>Mon, 24 July 2020</td>
                                    <td>Kabuye Hashim</td>
                                    <td>3</td>
                                    <td>UGX 3,500,000</td>
                                    <td>UGX 3,000,000</td>
                                    <td>UGX 500,000</td>                                    
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Mon, 24 July 2020</td>
                                    <td>Mon, 24 July 2020</td>
                                    <td>Kabuye Hashim</td>
                                    <td>3</td>
                                    <td>UGX 3,500,000</td>
                                    <td>UGX 3,000,000</td>
                                    <td>UGX 500,000</td>                                    
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Mon, 24 July 2020</td>
                                    <td>Mon, 24 July 2020</td>
                                    <td>Kabuye Hashim</td>
                                    <td>3</td>
                                    <td>UGX 3,500,000</td>
                                    <td>UGX 3,000,000</td>
                                    <td>UGX 500,000</td>                                    
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Mon, 24 July 2020</td>
                                    <td>Mon, 24 July 2020</td>
                                    <td>Kabuye Hashim</td>
                                    <td>3</td>
                                    <td>UGX 3,500,000</td>
                                    <td>UGX 3,000,000</td>
                                    <td>UGX 500,000</td>                                    
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
        


         


        
        <!-- end: page -->
    </section>
@endsection

@section('pagejs')
  
    <script src="{{-- URL::asset('js/custom/admindash.js') --}}"></script>

    
@endsection

