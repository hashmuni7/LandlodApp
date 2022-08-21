<div>
    <x-slot name="title">
        Add Space
    </x-slot>
    

    <x-slot name="header">
        <header class="page-header">
            <h2>Add Space</h2>
        
            <div class="right-wrapper text-right">
                <ol class="breadcrumbs">
                    <li>
                        <a href="{{-- url('/adminhome') --}}">
                            <i class="fas fa-home"></i>
                        </a>
                    </li>
                    <li><span>Landlord</span></li>
                    <li><span>Add Space</span></li>                     
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
    
                    <h2 class="card-title">Add Space To Landlord</h2>
                    <p class="card-subtitle">Landlord ID: {{$landlord->id}}</p>
                </header>
                <div class="card-body">
                    
                    <form wire:submit.prevent="addSpace"  >
                        {{ csrf_field() }}
                        <div class="row">
                            <div class="card-body col-lg-8">
                                <div class="row form-group">
                                    <div class="col-lg-4">
                                        <div class="form-group @error('property') has-danger @enderror">
                                            <label class="col-form-label" for="property">Property</label>
                                            <select name="" id="" wire:model="property" class="form-select form-control">
                                                <option value="">Select Property</option>
                                                @foreach ($propertys as $property)
                                                    <option value="{{$property->propertyid}}">{{$property->property}}</option>
                                                @endforeach
                                            </select>
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
                                        <div class="form-group @error('spaceName') has-danger @enderror">
                                            <label class="col-form-label" for="spaceName">Space Name</label>
                                            <input type="text" class="form-control" id="spaceName" placeholder="" wire:model="spaceName">
                                            @error('spaceName')
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
                                        <div class="form-group @error('rentPrice') has-danger @enderror">
                                            <label class="col-form-label" for="rentPrice">Rent Price</label>
                                            <input type="number" class="form-control" id="rentPrice" placeholder="" wire:model="rentPrice">
                                            @error('rentPrice')
                                                <div>
                                                    <label class="error">                                          
                                                        <strong>{{ $message }}</strong>
                                                    </label>
                                                </div>
                                            @enderror
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <div class="form-group @error('rentalPeriod') has-danger @enderror">
                                            <label class="col-form-label" for="rentalPeriod">Rental Period <span class="text-small">(In days)</span></label>
                                            <input type="number" class="form-control" id="rentalPeriod" placeholder="" wire:model="rentalPeriod">
                                            @error('rentalPeriod')
                                                <div>
                                                    <label class="error">                                          
                                                        <strong>{{ $message }}</strong>
                                                    </label>
                                                </div>
                                            @enderror
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <div class="form-group @error('initialPayment') has-danger @enderror">
                                            <label class="col-form-label" for="initialPayment">How many months will the Initial payment cover</label>
                                            <input type="number" class="form-control" id="initialPayment" placeholder="" wire:model="initialPayment">
                                            @error('initialPayment')
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
                                    <div class="col-lg-6">
                                        <div class="form-group">                                           
                                            <button class="btn btn-primary btn-block" type="submit" style="width: 13em">Add Space</button>
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

