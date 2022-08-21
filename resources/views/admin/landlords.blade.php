@extends('admin.layout')

@section('title')
    Landlords
@endsection


@section('content')
<section role="main" class="content-body">
        <header class="page-header">
            <h2>Landlords</h2>
        
            <div class="right-wrapper text-right">
                <ol class="breadcrumbs">
                    <li>
                        <a href="{{-- url('/adminhome') --}}">
                            <i class="fas fa-home"></i>
                        </a>
                    </li>
                    <li><span>Landlords</span></li>
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
                            <a href="#" class="card-action card-action-toggle" data-card-toggle></a>
                            <a href="#" class="card-action card-action-dismiss" data-card-dismiss></a>
                        </div>
        
                        <h2 class="card-title">Landlords</h2>
                    </header>
                    <div class="card-body">
                        <table class="table table-responsive-md table-striped mb-0">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Landlord</th>
                                    <th>Properties</th>
                                    <th>Spaces</th>
                                    <th>Tenants</th>
                                    <th>Occupancy</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Kabuye Hashim</td>
                                    <td>3</td>
                                    <td>34</td>
                                    <td>30</td>
                                    <td>92%</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Kabuye Hashim</td>
                                    <td>3</td>
                                    <td>34</td>
                                    <td>30</td>
                                    <td>92%</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Kabuye Hashim</td>
                                    <td>3</td>
                                    <td>34</td>
                                    <td>30</td>
                                    <td>92%</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Kabuye Hashim</td>
                                    <td>3</td>
                                    <td>34</td>
                                    <td>30</td>
                                    <td>92%</td>
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

