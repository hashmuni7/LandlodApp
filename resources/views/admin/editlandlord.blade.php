@extends('admin.layout')

@section('title')
    Edit Property
@endsection


@section('content')
<section role="main" class="content-body">
        <header class="page-header">
            <h2>Edit Landlord</h2>
        
            <div class="right-wrapper text-right">
                <ol class="breadcrumbs">
                    <li>
                        <a href="{{-- url('/adminhome') --}}">
                            <i class="fas fa-home"></i>
                        </a>
                    </li>
                    <li><span>My Properties</span></li>
                    <li><span>Edit Landlord</span></li>
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
                                    <div class="col-lg-4">
                                        <div class="form-group">
                                            <label class="col-form-label" for="formGroupExampleInput">Sex</label>
                                            <div class="form-radio mb-2  row ml-1" >
                                                <div class="radio-custom col-sm-6">
                                                    <input type="radio" id="male" value="1" name="sex" class="p-p">
                                                    <label for="Male">Male</label>
                                                </div>
    
                                                <div class="radio-custom col-sm-6">
                                                    <input type="radio" id="female" value="0" name="sex" class="p-p">
                                                    <label for="Female">Female</label>
                                                </div>
                                                <input type="text" id="" class="hidden" name="gender">
                                            </div>
                                        </div>
                                    </div> 
                                    <div class="col-lg-4">
                                        <div class="form-group">
                                            <label class="col-form-label" for="formGroupExampleInput">Status</label>
                                            <div class="form-radio mb-2  row ml-1" >
                                                <div class="switch switch-sm switch-primary">
                                                    <input type="checkbox" name="switch" data-plugin-ios-switch checked="checked" />
                                                </div>
                                                    
                                            </div>
                                        </div>
                                    </div>                                                                       
                                </div>
                                <div class="row form-group">
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <label class="col-form-label" for="formGroupExampleInput">Phone Number (Primary)</label>
                                            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="">
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <label class="col-form-label" for="formGroupExampleInput">Phone Number (Secondary)</label>
                                            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="">
                                        </div>
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <label class="col-form-label" for="formGroupExampleInput">Email (Primary)</label>
                                            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="">
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <label class="col-form-label" for="formGroupExampleInput">Email (Secondary)</label>
                                            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="">
                                        </div>
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <label class="col-form-label" for="formGroupExampleInput">Password</label>
                                            <button class="btn btn-primary btn-block" style="width: 13em">Change Password</button>
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

