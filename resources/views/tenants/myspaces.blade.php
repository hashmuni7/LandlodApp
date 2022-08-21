@extends('tenants.layout')

@section('title')
    My Spaces
@endsection


@section('content')
<section role="main" class="content-body">
        <header class="page-header">
            <h2>My Spaces</h2>
        
            <div class="right-wrapper text-right">
                <ol class="breadcrumbs">
                    <li>
                        <a href="{{-- url('/adminhome') --}}">
                            <i class="fas fa-home"></i>
                        </a>
                    </li>
                    <li><span>My Spaces</span></li>
                </ol>
        
                <a class="sidebar-right-toggle" ><i class="fas fa-chevron-left"></i></a>
            </div>
        </header>

        <!-- start: page -->
        <div class="row">
            <div class="col-lg-12 col-xl-6">
                <section class="card card-horizontal mb-4">
                    <header class="card-header bg-primary">
                        <div class="card-header-icon">
                            <i class="fas fa-music"></i>
                        </div>
                    </header>
                    <div class="card-body p-4">
                        <h3 class="font-weight-semibold mt-3">L1-04</h3>
                        <div class="row">
                            <div class="col-xl-6 stag">
                                <span class="head-tag">Space Code</span>
                                <span class="body-tag">2734618</span>
                            </div>
                            <div class="col-xl-6 stag">
                                <span class="head-tag">Property</span>
                                <span class="body-tag">Zai Plaza</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xl-6 stag">
                                <span class="head-tag">Balance</span>
                                <span class="body-tag">UGX 500,000</span>
                            </div>
                            <div class="col-xl-6 stag">
                                <button type="button" class="btn btn-primary mt-2" style="width: 10em">Details</button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div class="col-lg-12 col-xl-6">
                <section class="card card-horizontal mb-4">
                    <header class="card-header bg-primary">
                        <div class="card-header-icon">
                            <i class="fas fa-music"></i>
                        </div>
                    </header>
                    <div class="card-body p-4">
                        <h3 class="font-weight-semibold mt-3">L1-04</h3>
                        <div class="row">
                            <div class="col-xl-6 stag">
                                <span class="head-tag">Space Code</span>
                                <span class="body-tag">2734618</span>
                            </div>
                            <div class="col-xl-6 stag">
                                <span class="head-tag">Property</span>
                                <span class="body-tag">Zai Plaza</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xl-6 stag">
                                <span class="head-tag">Balance</span>
                                <span class="body-tag">UGX 500,000</span>
                            </div>
                            <div class="col-xl-6 stag">
                                <button type="button" class="btn btn-primary mt-2" style="width: 10em">Details</button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div> 
        <div class="container-fluid">
            <section class="card">
                <header class="card-header card-header-transparent">
                    <div class="card-actions">
                        <a href="#" class="card-action card-action-toggle" data-card-toggle></a>
                        <a href="#" class="card-action card-action-dismiss" data-card-dismiss></a>
                    </div>
    
                    <h2 class="card-title">Projects Stats</h2>
                </header>
                <div class="card-body">
                    <table class="table table-responsive-md table-striped mb-0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Space Name</th>
                                <th>Space Code</th>
                                <th>Property</th>
                                <th>balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>L1-04</td>
                                <td>2734618</td>
                                <td>Zai Plaza</td>
                                <td>UGX 500,000</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>L1-04</td>
                                <td>2734618</td>
                                <td>Zai Plaza</td>
                                <td>UGX 500,000</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>L1-04</td>
                                <td>2734618</td>
                                <td>Zai Plaza</td>
                                <td>UGX 500,000</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>L1-04</td>
                                <td>2734618</td>
                                <td>Zai Plaza</td>
                                <td>UGX 500,000</td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
            </section>
        </div>      
        


         


        
        <!-- end: page -->
    </section>
@endsection

@section('pagejs')
  
    <script src="{{-- URL::asset('js/custom/admindash.js') --}}"></script>

    
@endsection

