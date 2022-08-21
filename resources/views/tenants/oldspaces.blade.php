@extends('tenants.layout')

@section('title')
    Old Spaces
@endsection


@section('content')
<section role="main" class="content-body">
        <header class="page-header">
            <h2>My Old Spaces</h2>
        
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
            <div class="container-fluid">
                <section class="card">
                    <header class="card-header card-header-transparent">
                        <div class="card-actions">
                            <a href="#" class="card-action card-action-toggle" data-card-toggle></a>
                            <a href="#" class="card-action card-action-dismiss" data-card-dismiss></a>
                        </div>
        
                        <h2 class="card-title">Archive</h2>
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
         </div>
              
        


         


        
        <!-- end: page -->
    </section>
@endsection

@section('pagejs')
  
    <script src="{{-- URL::asset('js/custom/admindash.js') --}}"></script>

    
@endsection

