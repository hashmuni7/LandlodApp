<div>
    <x-slot name="title">
        Property
    </x-slot>
    

    <x-slot name="header">
        <header class="page-header">
            <h2>Property</h2>
        
            <div class="right-wrapper text-right">
                <ol class="breadcrumbs">
                    <li>
                        <a href="{{-- url('/adminhome') --}}">
                            <i class="fas fa-home"></i>
                        </a>
                    </li>
                    <li><span>Property</span></li>                    
                </ol>
        
                <a class="sidebar-right-toggle" ><i class="fas fa-chevron-left"></i></a>
            </div>
        </header>
    </x-slot>

    <div class="row">
        <div class="container-fluid mb-3">
            <section class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-xl-8">
                            <div class="col-xl-12">
                                <h2 class="center ">                                    
                                    <strong>
                                        {{$property->property}}
                                    </strong>
                                </h2>
                            </div>
                            <div class="row">
                                <div class="col-xl-3 stag ">
                                    <span class="head-tag">Tenants</span>
                                    <span class="body-tag">{{ $property->spaces()->where('occupied', 1)->count() }}</span>
                                </div>
                                <div class="col-xl-3 stag ">
                                    <span class="head-tag">Spaces</span>
                                    <span class="body-tag">{{{ $property->spaces()->count() }}}</span>
                                </div>
                                <div class="col-xl-3 stag ">
                                    <span class="head-tag">Unpaid Rent</span>
                                    <span class="body-tag">UGX 6,000,000,000</span>
                                </div>
                            </div>
                            <hr class="short">

                            <div class="row">
                                
                                <div class="col-xl-3 stag mb-3">
                                    <span clas="head-tag">District</span>
                                    <span class="body-tag">{{ $property->district }}</span>
                                </div>
                                <div class="col-xl-3 stag mb-3">
                                    <span class="head-tag">City</span>
                                    <span class="body-tag">{{ $property->city }}</span>
                                </div>
                                <div class="col-xl-3 stag mb-3">
                                    <span class="head-tag">Address</span>
                                    <span class="body-tag">{{ $property->address }}</span>
                                </div>
                                <div class="col-xl-3 stag mb-3">
                                    <span class="head-tag">Late Payment Fee</span>
                                    <span class="body-tag">UGX {{ $property->latefee }}</span>
                                </div> 
                                <div class="col-xl-3 stag mb-3">
                                    <span class="head-tag">Grace Period</span>
                                    <span class="body-tag">{{ $property->graceperiod }}days</span>
                                </div>
                                <div class="col-xl-3 stag mb-3">
                                    <span class="head-tag">Account Number</span>
                                    <span class="body-tag">{{ $property->phonenumber }}</span>
                                </div>
                            </div>
                            <hr class="short">
                            
                                <p class="alternative-font ">Landlord</p>
                            
                            
                            <div class="row">                            
                                <div class="col-xl-3 stag mb-3">
                                    <span clas="head-tag text-primary">Name</span>
                                    <span class="body-tag">{{ $property->firstname . ' ' . $property->lastname }}</span>
                                </div>
                                <div class="col-xl-3 stag mb-3">
                                    <span class="head-tag">Phone</span>
                                    <span class="body-tag">{{ $property->phone }}</span>
                                </div>
                                <div class="col-xl-6 stag mb-3">
                                    <span class="head-tag">Email</span>
                                    <span class="body-tag">{{ $property->email }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-4 text-center">
                            <i class="mt-4 fas fa-home" style="font-size: 9em;" aria-hidden="true"></i>
                            <h4 class="center">                                    
                                <strong>
                                    Outstanding Balance: UGX 500,000
                                </strong>
                            </h4>
                            <button type="button" class="btn btn-primary btn-md btn-block">Pay Rent</button>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="row">
                        <div class="col-xl-4 m-auto">
                            <div class="btn-group d-flex" role="group">
                                <a class="btn btn-default w-100" role="button" href="{{url("/properties/property/edit/$property->propertyid")}}">Edit</a>
                                <a class="btn btn-default w-100" role="button" href="{{url("/properties/property/addspace/$property->propertyid")}}">Add Space</a>
                                <a class="btn btn-default w-100" role="button" href="{{url("/properties/property/addtenant/$property->propertyid")}}">Add Tenant</a>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </section>
        </div>
    </div>

    <div class="row">
        <div class="col-md-12">
            <div class="tabs">
                <ul class="nav nav-tabs">
                    <li class="nav-item {{ $activeTab === 'payments' ? 'active' : ''}}" wire:click.prevent="activateTab('payments')">
                        <a class="nav-link" href="#payments" data-toggle="tab"><i class="fas fa-star"></i> Payments</a>
                    </li>
                    <li class="nav-item {{ $activeTab === 'spaces' ? 'active' : ''}}" wire:click.prevent="activateTab('spaces')">
                        <a class="nav-link" href="#spaces" data-toggle="tab">Spaces</a>
                    </li>
                </ul>
                <div class="tab-content">
                    <div id="payments" class="tab-pane {{ $activeTab === 'payments' ? 'active' : ''}}">                            
                        <div class="row">
                            <div class="col-md-12">
                                <section class="card">
                                    @livewire('admin.tables.property-payments', ['property' => $property])
                                </section>
                            </div>
                        </div>
                        
                    </div>
                    <div id="spaces" class="tab-pane {{ $activeTab === 'spaces' ? 'active' : ''}}">
                        <div class="container-fluid">
                            <section class="card">
                                @livewire('admin.tables.property-spaces', ['property' => $property])
                            </section>
                        </div>
                    </div>                        
                </div>
            </div>
        </div>
    </div>
</div>
