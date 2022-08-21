<div>
    <x-slot name="title">
        Add Property
    </x-slot>
    

    <x-slot name="header">
        <header class="page-header">
            <h2>Add Property</h2>
        
            <div class="right-wrapper text-right">
                <ol class="breadcrumbs">
                    <li>
                        <a href="{{-- url('/adminhome') --}}">
                            <i class="fas fa-home"></i>
                        </a>
                    </li>
                    <li><span>Landlord</span></li>
                    <li><span>Edit</span></li>                     
                </ol>
        
                <a class="sidebar-right-toggle" ><i class="fas fa-chevron-left"></i></a>
            </div>
        </header>
    </x-slot>

    <div class="row">
        <div class="container-fluid mb-3">
            <section class="card">
                <header class="card-header card-header-transparent">
                    <div class="card-actions">
                        
                    </div>
    
                    <h2 class="card-title">Add Property To Landlord</h2>
                    <p class="card-subtitle">Landlord ID: {{$landlord->id}}</p>
                </header>
                <div class="card-body">
                    
                    <form wire:submit.prevent="addProperty"  >
                        {{ csrf_field() }}
                        <div class="row">
                            <div class="card-body col-lg-8">
                                <div class="row form-group">
                                    <div class="col-lg-8">
                                        <div class="form-group @error('property') has-danger @enderror">
                                            <label class="col-form-label" for="PropertyName">Property Name</label>
                                            <input type="text" class="form-control" id="propertyName" placeholder="" wire:model="property">
                                            @error('property')
                                                <div>
                                                    <label class="error">                                          
                                                        <strong>{{ $message }}</strong>
                                                    </label>
                                                </div>
                                            @enderror
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <div class="form-group @error('status') has-danger @enderror" >
                                            <label class="col-form-label" for="formGroupExampleInput">Status</label>
                                            <div class="form-radio mb-2  row ml-1" >
                                                <div wire:ignore class="switch switch-sm switch-primary">
                                                    <input    type="checkbox" name="switch2"    data-plugin-ios-switch  wire:model="status"/>
                                                </div>
                                                    
                                            </div>
                                            @error('status')
                                                <div>
                                                    <label class="error">                                          
                                                        <strong>{{ $message }}</strong>
                                                    </label>
                                                </div>
                                            @enderror
                                        </div>
                                    </div>
                                </div> 
                                <div class="row form-group">
                                    <div class="col-lg-4">
                                        <div class="form-group @error('district') has-danger @enderror">
                                            <label class="col-form-label" for="District">District</label>
                                            <select name="" id="" wire:model="district" class="form-select form-control">
                                                <option value="">Select Distict</option>
                                                @foreach ($districts as $district)
                                                    <option value="{{$district->districtid}}">{{$district->district}}</option>
                                                @endforeach
                                            </select>
                                            @error('district')
                                                <div>
                                                    <label class="error">                                          
                                                        <strong>{{ $message }}</strong>
                                                    </label>
                                                </div>
                                            @enderror
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <div class="form-group @error('city') has-danger @enderror">
                                            <label class="col-form-label" for="city">City</label>
                                            <input type="text" class="form-control" id="city" placeholder="" wire:model="city">
                                            @error('city')
                                                <div>
                                                    <label class="error">                                          
                                                        <strong>{{ $message }}</strong>
                                                    </label>
                                                </div>
                                            @enderror
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <div class="form-group @error('address') has-danger @enderror">
                                            <label class="col-form-label" for="address">Address</label>
                                            <input type="text" class="form-control" id="address" placeholder="" wire:model="address">
                                            @error('address')
                                                <div>
                                                    <label class="error">                                          
                                                        <strong>{{ $message }}</strong>
                                                    </label>
                                                </div>
                                            @enderror
                                        </div>
                                    </div>
                                </div>                               
                                <div class="row form-group">                                     
                                    <div class="col-lg-4">
                                        <div class="form-group @error('chargeLateFee') has-danger @enderror" >
                                            <label class="col-form-label" for="formGroupExampleInput">Charge Late Fee</label>
                                            <div class="form-radio mb-2  row ml-1" >
                                                <div wire:ignore class="switch switch-sm switch-primary">
                                                    <input    type="checkbox" name="switch"    data-plugin-ios-switch  wire:model="chargeLateFee"/>
                                                </div>
                                                    
                                            </div>
                                            @error('chargeLateFee')
                                                <div>
                                                    <label class="error">                                          
                                                        <strong>{{ $message }}</strong>
                                                    </label>
                                                </div>
                                            @enderror
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <div class="form-group @error('lateFee') has-danger @enderror">
                                            <label class="col-form-label" for="lateFee">Late Fee</label>
                                            <input type="number" class="form-control" id="lateFee" placeholder="" wire:model="lateFee">
                                            @error('lateFee')
                                                <div>
                                                    <label class="error">                                          
                                                        <strong>{{ $message }}</strong>
                                                    </label>
                                                </div>
                                            @enderror
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <div class="form-group @error('gracePeriod') has-danger @enderror">
                                            <label class="col-form-label" for="gracePeriod">Grace Period <span>In Months</span></label>
                                            <input type="number" class="form-control" id="gracePeriod" placeholder="" wire:model="gracePeriod">
                                            @error('gracePeriod')
                                                <div>
                                                    <label class="error">                                          
                                                        <strong>{{ $message }}</strong>
                                                    </label>
                                                </div>
                                            @enderror
                                        </div>
                                    </div>                                                                       
                                </div>
                                <div class="row form-group">
                                    <div class="col-lg-4">
                                        <div class="form-group @error('accountNumber') has-danger @enderror">
                                            <label class="col-form-label" for="PropertyName">Account Number</label>
                                            <input type="text" class="form-control" id="propertyName" placeholder="" wire:model="accountNumber">
                                            @error('accountNumber')
                                                <div>
                                                    <label class="error">                                          
                                                        <strong>{{ $message }}</strong>
                                                    </label>
                                                </div>
                                            @enderror
                                        </div>
                                    </div>
                                </div>                                
                                <div class="row form-group">
                                    <div class="col-lg-6">
                                        <div class="form-group">                                           
                                            <button class="btn btn-primary btn-block" type="submit" style="width: 13em">Add Property</button>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </form>
                    
                </div>                    
            </section>
        </div>
    </div>

    @section('pagejs')
        <!-- Code to handle Admin Requests-->
        <script>
           
            

        </script>
    @endsection

    
</div>
