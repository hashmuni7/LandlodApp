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
                            <div class="card-body col-lg-8">
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
                                            <label class="col-form-label" for="formGroupExampleInput">Base Price</label>
                                            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="">
                                        </div>                                        
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <label class="col-form-label" for="formGroupExampleInput">Base Price Charged Time (days)</label>
                                            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="">
                                        </div>
                                    </div>
                                    
                                </div>                                
                                <div class="row form-group">
                                    <div class="col-lg-4">
                                        <div class="form-group">
                                            <label class="col-form-label" for="formGroupExampleInput">Charge Late Fee</label>
                                            <div class="form-radio mb-2 mr-sm-2 mb-sm-0" >
                                                <div class="radio-custom">
                                                    <input type="radio" id="male" value="1" name="sex" class="p-p">
                                                    <label for="Male">Yes</label>
                                                </div>
    
                                                <div class="radio-custom">
                                                    <input type="radio" id="female" value="0" name="sex" class="p-p">
                                                    <label for="Female">No</label>
                                                </div>
                                                <input type="text" id="" class="hidden" name="gender">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <div class="form-group">
                                            <label class="col-form-label" for="formGroupExampleInput">Late Fee</label>
                                            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="">
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <div class="form-group">
                                            <label class="col-form-label" for="formGroupExampleInput">Grace Period</label>
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

