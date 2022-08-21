@extends('admin.layout')

@section('title')
    Payments
@endsection


@section('content')
<section role="main" class="content-body">
        <header class="page-header">
            <h2>Payments</h2>
        
            <div class="right-wrapper text-right">
                <ol class="breadcrumbs">
                    <li>
                        <a href="{{-- url('/adminhome') --}}">
                            <i class="fas fa-home"></i>
                        </a>
                    </li>                    
                    <li><span>Payments</span></li>
                </ol>
        
                <a class="sidebar-right-toggle" ><i class="fas fa-chevron-left"></i></a>
            </div>
        </header>

        <!-- start: page -->
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
        

        
        <!-- end: page -->
    </section>
@endsection

@section('pagejs')
  
    <script src="{{-- URL::asset('js/custom/admindash.js') --}}"></script>

    
@endsection

