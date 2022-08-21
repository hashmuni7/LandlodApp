@extends('landlord.layout')

@section('title')
    Single Property
@endsection


@section('content')
<section role="main" class="content-body">
        <header class="page-header">
            <h2>Single Property</h2>
        
            <div class="right-wrapper text-right">
                <ol class="breadcrumbs">
                    <li>
                        <a href="{{-- url('/adminhome') --}}">
                            <i class="fas fa-home"></i>
                        </a>
                    </li>
                    <li><span>My Properties</span></li>
                    <li><span>Single Property</span></li>
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
                                            Zai Plaza
                                        </strong>
                                    </h2>
                                </div>
                                <div class="row">
                                    <div class="col-xl-3 stag ">
                                        <span class="head-tag">Tenants</span>
                                        <span class="body-tag">123</span>
                                    </div>
                                    <div class="col-xl-3 stag ">
                                        <span class="head-tag">Spaces</span>
                                        <span class="body-tag">200</span>
                                    </div>
                                    <div class="col-xl-3 stag ">
                                        <span class="head-tag">Unpaid Rent</span>
                                        <span class="body-tag">UGX 6,000,000,000</span>
                                    </div>
                                </div>
                                <hr class="short">

                                <div class="row">
                                    
                                    <div class="col-xl-3 stag mb-3">
                                        <span clas="head-tag">District</span>
                                        <span class="body-tag">Kampala</span>
                                    </div>
                                    <div class="col-xl-3 stag mb-3">
                                        <span class="head-tag">City</span>
                                        <span class="body-tag">Kampala</span>
                                    </div>
                                    <div class="col-xl-3 stag mb-3">
                                        <span class="head-tag">Address</span>
                                        <span class="body-tag">Plot 4 Hashim Street</span>
                                    </div>
                                    <div class="col-xl-3 stag mb-3">
                                        <span class="head-tag">Floors</span>
                                        <span class="body-tag">5</span>
                                    </div>
                                    <div class="col-xl-3 stag mb-3">
                                        <span class="head-tag">Lowest Floor</span>
                                        <span class="body-tag">-4</span>
                                    </div>
                                    <div class="col-xl-3 stag mb-3">
                                        <span class="head-tag">Highest Floor</span>
                                        <span class="body-tag">3</span>
                                    </div>
                                    <div class="col-xl-3 stag mb-3">
                                        <span class="head-tag">Late Payment Fee</span>
                                        <span class="body-tag">UGX 50,000</span>
                                    </div> 
                                    <div class="col-xl-3 stag mb-3">
                                        <span class="head-tag">Grace Period</span>
                                        <span class="body-tag">5 days</span>
                                    </div>
                                    <div class="col-xl-3 stag mb-3">
                                        <span class="head-tag">Rent Account</span>
                                        <span class="body-tag">MM Number</span>
                                    </div>
                                    <div class="col-xl-3 stag mb-3">
                                        <span class="head-tag">Account Number</span>
                                        <span class="body-tag">0705 948 974</span>
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
                            <div class="col-xl-4 m-auto">
                                <div class="btn-group d-flex" role="group">
                                    <a class="btn btn-default w-100" role="button">Edit</a>
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
         
        


         


        
        <!-- end: page -->
    </section>
@endsection

@section('pagejs')
  
    <script src="{{-- URL::asset('js/custom/admindash.js') --}}"></script>

    
@endsection

