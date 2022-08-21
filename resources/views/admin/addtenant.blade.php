@extends('admin.layout')

@section('title')
    Add Tenant
@endsection


@section('content')
<section role="main" class="content-body">
        <header class="page-header">
            <h2>Add Tenant</h2>
        
            <div class="right-wrapper text-right">
                <ol class="breadcrumbs">
                    <li>
                        <a href="{{-- url('/adminhome') --}}">
                            <i class="fas fa-home"></i>
                        </a>
                    </li>
                    <li><span>My Properties</span></li>
                    <li><span>Add Tenant</span></li>
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
                            <div class="card-body col-lg-8">
                                <div class="row form-group">
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <label class="col-form-label" for="formGroupExampleInput">Tenant Phone Number</label>
                                            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="">
                                        </div>
                                    </div>                                                                    
                                </div>
                                <div class="row form-group">
                                    <div class="col-lg-4">
                                        <div class="form-group">
                                            <label class="col-form-label" for="formGroupExampleInput">First Name</label>
                                            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="">
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <div class="form-group">
                                            <label class="col-form-label" for="formGroupExampleInput">Last Name</label>
                                            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="">
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <div class="form-group">
                                            <label class="col-form-label" for="formGroupExampleInput">Other Names</label>
                                            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="">
                                        </div>
                                    </div>                               
                                </div>
                                <div class="row form-group">
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <label class="col-form-label" for="formGroupExampleInput">Space Name</label>
                                            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="">
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <label class="col-form-label" for="formGroupExampleInput">Space Code</label>
                                            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="">
                                        </div>
                                    </div>                                
                                </div>                                                                                                                                                                
                                <div class="row form-group">
                                    <div class="col-lg-6">
                                        <div class="form-group">                                           
                                            <button class="btn btn-primary btn-block" style="width: 13em">Save</button>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
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

