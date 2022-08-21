@extends('admin.layout')

@section('title')
    Tenants
@endsection


@section('content')
<section role="main" class="content-body">
        <header class="page-header">
            <h2>Tenants</h2>
        
            <div class="right-wrapper text-right">
                <ol class="breadcrumbs">
                    <li>
                        <a href="{{-- url('/adminhome') --}}">
                            <i class="fas fa-home"></i>
                        </a>
                    </li>                    
                    <li><span>Tenants</span></li>
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
        
                        <h2 class="card-title">Tenants</h2>
                    </header>
                    <div class="card-body">
                        <table class="table table-responsive-md table-striped mb-0">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Tenant</th>
                                    <th>Space Name</th>
                                    <th>Space Code</th>                                    
                                    <th>Balance</th>                                     
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Kabuye Hashim</td>
                                    <td>L1-04</td>
                                    <td>2389763</td>                                    
                                    <td>UGX 500,000</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Kabuye Hashim</td>
                                    <td>L1-04</td>
                                    <td>2389763</td>                                    
                                    <td>UGX 500,000</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Kabuye Hashim</td>
                                    <td>L1-04</td>
                                    <td>2389763</td>                                    
                                    <td>UGX 500,000</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Kabuye Hashim</td>
                                    <td>L1-04</td>
                                    <td>2389763</td>                                    
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

