<div>
    <x-slot name="title">
        {{$space->spacename}}
    </x-slot>
    

    <x-slot name="header">
        <header class="page-header">
            <h2>{{$space->spacename}}</h2>
        
            <div class="right-wrapper text-right">
                <ol class="breadcrumbs">
                    <li>
                        <a href="{{-- url('/adminhome') --}}">
                            <i class="fas fa-home"></i>
                        </a>
                    </li>
                    <li><span>Space</span></li>                    
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
                                <h2 class="center">                                    
                                    <strong>
                                        {{$space->spacename}}
                                    </strong>
                                </h2>
                            </div>
                            <div class="row">
                                <div class="col-xl-3 stag mb-3">
                                    <span class="head-tag">Space Code</span>
                                    <span class="body-tag">{{$space->spaceid}}</span>
                                </div>
                                <div class="col-xl-3 stag mb-3">
                                    <span class="head-tag">Property</span>
                                    <span class="body-tag">{{$space->property}}</span>
                                </div>
                                <div class="col-xl-3 stag mb-3">
                                    <span class="head-tag">Status</span>
                                    <span class="body-tag">{{$space->occupied ? 'Occupied' : 'Vacant'}}</span>
                                </div>
                                <div class="col-xl-3 stag mb-3">
                                    <span class="head-tag">Rent</span>
                                    <span class="body-tag">UGX {{number_format($space->rentprice)}}</span>
                                </div>
                                <div class="col-xl-3 stag mb-3">
                                    <span class="head-tag">Rental Period</span>
                                    <span class="body-tag">{{$space->rentalperiod}} Days</span>
                                </div>
                                <div class="col-xl-3 stag mb-3">
                                    <span class="head-tag">First Payment</span>
                                    <span class="body-tag">{{$space->initialpaymentfor}} months</span>
                                </div>
                                <div class="col-xl-3 stag mb-3">
                                    <span class="head-tag">Charge Late Fee</span>
                                    <span class="body-tag">{{$space->latecharge ? 'Yes' : 'No'}}</span>
                                </div>
                                <div class="col-xl-3 stag mb-3">
                                    <span class="head-tag">Late Fee</span>
                                    <span class="body-tag">UGX {{$space->latefee ? $space->latefee : '--'}}</span>
                                </div>
                                <div class="col-xl-3 stag mb-3">
                                    <span class="head-tag">Grace Period in days</span>
                                    <span class="body-tag">{{$space->graceperiod}} days</span>
                                </div>
                               
                                                                     
                                
                            </div>
                            <hr />
                            <p class="h3">Tenant</p>
                            @if ($space->occupied)
                            <div class="row">
                                <div class="col-xl-6 stag mb-3">
                                    <span class="head-tag">Name</span>
                                    <span class="body-tag">{{$tenant->firstname}} {{$tenant->lastname}} {{$tenant->othernames}}</span>
                                </div>
                                <div class="col-xl-3 stag mb-3">
                                    <span class="head-tag">Gender</span>
                                    <span class="body-tag">{{$tenant->sex ? 'Male' : 'Female'}}</span>
                                </div>
                                <div class="col-xl-3 stag mb-3">
                                    <span class="head-tag">Phone Number</span>
                                    <span class="body-tag">{{$tenant->phone}}</span>
                                </div>
                                <div class="col-xl-6 stag mb-3">
                                    <span class="head-tag">Email</span>
                                    <span class="body-tag">{{$tenant->email}}</span>
                                </div>
                            </div>
                            @endif
                            @if (!$space->occupied)
                            <div class="row">
                                <div class="col-xl-6 stag mb-3">
                                    
                                    <span class="body-tag">Vacant</span>
                                </div>
                            </div>
                            @endif
                            
                            
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
                        <div class="col-xl-7 m-auto">
                            <div class="btn-group d-flex" role="group">
                                <a class="btn btn-default w-100" role="button">Charge</a>
                                    <a class="btn btn-default w-100" role="button">Settle</a>
                                    <a class="btn btn-default w-100" role="button">Refund</a>
                                    <a class="btn btn-default w-100" role="button">Change Tenant</a>
                                    <a class="btn btn-default w-100" role="button">Send Reminder</a>                                                                      
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
                    <li class="nav-item {{ $activeTab === 'ledgers' ? 'active' : ''}}" wire:click.prevent="activateTab('ledgers')">
                        <a class="nav-link" href="#ledgers" data-toggle="tab">Ledgers</a>
                    </li>
                    <li class="nav-item {{ $activeTab === 'spaceHistory' ? 'active' : ''}}" wire:click.prevent="activateTab('spaceHistory')">
                        <a class="nav-link" href="#spaceHistory" data-toggle="tab">Space History</a>
                    </li>
                </ul>
                <div class="tab-content">
                    <div id="payments" class="tab-pane {{ $activeTab === 'payments' ? 'active' : ''}}">                            
                        <div class="row">
                            <div class="col-md-12">
                                <section class="card">
                                    @livewire('admin.tables.payments-to-space', ['space' => $space])
                                </section>
                            </div>
                        </div>
                        
                    </div>
                    <div id="ledgers" class="tab-pane {{ $activeTab === 'ledgers' ? 'active' : ''}}">
                        <div class="container-fluid">
                            <section class="card">
                                @livewire('admin.tables.space-ledger', ['space' => $space])
                            </section>
                        </div>
                    </div>
                    <div id="spaceHistory" class="tab-pane {{ $activeTab === 'spaceHistory' ? 'active' : ''}}">
                        <div class="container-fluid">
                            <section class="card">
                                @livewire('admin.tables.space-history', ['space' => $space])
                            </section>
                        </div>
                    </div>                        
                </div>
            </div>
        </div>
    </div>
</div>
