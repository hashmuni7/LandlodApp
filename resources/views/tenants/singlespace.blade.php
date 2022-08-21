@extends('tenants.layout')

@section('title')
    Single Space
@endsection


@section('content')
<section role="main" class="content-body">
        <header class="page-header">
            <h2>Single Space</h2>
        
            <div class="right-wrapper text-right">
                <ol class="breadcrumbs">
                    <li>
                        <a href="{{-- url('/adminhome') --}}">
                            <i class="fas fa-home"></i>
                        </a>
                    </li>
                    <li><span>My Spaces</span></li>
                    <li><span>Single Space</span></li>
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
                                            L1-04
                                        </strong>
                                    </h2>
                                </div>
                                <div class="row">
                                    <div class="col-xl-3 stag mb-3">
                                        <span class="head-tag">Space Code</span>
                                        <span class="body-tag">2734618</span>
                                    </div>
                                    <div class="col-xl-3 stag mb-3">
                                        <span class="head-tag">Property</span>
                                        <span class="body-tag">Zai Plaza</span>
                                    </div>
                                    <div class="col-xl-3 stag mb-3">
                                        <span class="head-tag">Landlord</span>
                                        <span class="body-tag">Mugalu Shaban</span>
                                    </div>
                                    <div class="col-xl-3 stag mb-3">
                                        <span class="head-tag">Moved In</span>
                                        <span class="body-tag">Sat, 23 Jun 2020</span>
                                    </div>
                                    <div class="col-xl-3 stag mb-3">
                                        <span class="head-tag">Tenure Period (Days)</span>
                                        <span class="body-tag">30</span>
                                    </div>
                                    <div class="col-xl-3 stag mb-3">
                                        <span class="head-tag">Monthly Rent Fee</span>
                                        <span class="body-tag">UGX 500,000</span>
                                    </div>
                                    <div class="col-xl-3 stag mb-3">
                                        <span class="head-tag">Late Payment Fee</span>
                                        <span class="body-tag">UGX 50,000</span>
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
        


         


        
        <!-- end: page -->
    </section>
@endsection

@section('pagejs')
  
    <script src="{{-- URL::asset('js/custom/admindash.js') --}}"></script>

    
@endsection

