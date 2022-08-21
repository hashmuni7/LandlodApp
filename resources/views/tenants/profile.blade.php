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
            <div class="col-md-12">
                <div class="tabs">
                    <ul class="nav nav-tabs">
                        <li class="nav-item active">
                            <a class="nav-link" href="#popular" data-toggle="tab"><i class="fas fa-star"></i> General</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#recent" data-toggle="tab">Recent</a>
                        </li>
                    </ul>
                    <div class="tab-content">
                        <div id="popular" class="tab-pane active">
                            <p>General</p>
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
                                    <div class="form-group row" id="pupilSex">
                                        <label class="col-sm-3 control-label text-sm-right pt-2">Gender</label>
                                        <div class="form-radio mb-2 mr-sm-2 mb-sm-0" >
                                            <div class="radio-custom">
                                                <input type="radio" id="male" value="1" name="sex" class="p-p">
                                                <label for="Male">Male</label>
                                            </div>

                                            <div class="radio-custom">
                                                <input type="radio" id="female" value="0" name="sex" class="p-p">
                                                <label for="Female">Female</label>
                                            </div>
                                            <input type="text" id="" class="hidden" name="gender">
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
                                </div>
                            </div>
                            
                        </div>
                        <div id="recent" class="tab-pane">
                            <p>Recent</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitat.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        


         


        
        <!-- end: page -->
    </section>
@endsection

@section('pagejs')
  
    <script src="{{-- URL::asset('js/custom/admindash.js') --}}"></script>

    
@endsection

