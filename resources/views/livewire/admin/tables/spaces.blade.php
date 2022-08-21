<div>
    <x-slot name="title">
        Spaces
    </x-slot>
    

    <x-slot name="header">
        <header class="page-header">
            <h2>Spaces</h2>
        
            <div class="right-wrapper text-right">
                <ol class="breadcrumbs">
                    <li>
                        <a href="{{-- url('/adminhome') --}}">
                            <i class="fas fa-home"></i>
                        </a>
                    </li>
                    <li><span>Spaces</span></li>                    
                </ol>
        
                <a class="sidebar-right-toggle" ><i class="fas fa-chevron-left"></i></a>
            </div>
        </header>
    </x-slot>

    
    <div class="row">
        <div class="col-md-12">
            <section class="card">
                <header class="card-header card-header-transparent">
                    <div class="card-actions">
                        <a href="#" class="card-action card-action-toggle" data-card-toggle></a>
                        <a href="#" class="card-action card-action-dismiss" data-card-dismiss></a>
                    </div>
    
                    <h2 class="card-title">Spaces</h2>
                </header>
                <div class="card-body">
                    <div class="container-row mb-4">
                        <div class="row">
                            <div class="form-group col-lg-6">
                                <div class="" style="max-width: 5em">
                                    
                                    <select name="" id="" wire:model="perPage" class="form-select form-control">
                                        <option value="10">10</option>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="99999">All</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <input wire:model="search"  type="search" class="form-control input-rounded w-75" placeholder="Search Spaces ..." style="float: right;">
                                </div>
                            </div>
                        </div>
                        <table class="table table-responsive-md table-striped mb-0">
                            <thead>
                                <tr>
                                    <th>#</th>                                    
                                    <th>Space Code</th>
                                    <th>Space Name</th>
                                    <th>Property</th>
                                    <th>Status</th>
                                    <th>Tenant</th>                                    
                                    <th>Balance</th>                                     
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($spaces as $key => $space)
                                    <tr>
                                        <td>{{$spaces->firstItem() + $key}}</td>
                                        <td><a href="{{url("/spaces/space/$space->spaceid")}}">{{$space->spaceid}}</a></td> 
                                        <td>{{ $space->spacename }}</td>
                                        <td>{{ $space->property }}</td>
                                        <td><span class="badge {{$space->occupied ? 'badge-success' : 'badge-danger'}}">{{$space->occupied ? 'Occupied' : 'Vacant'}}</span></td> 
                                        <td>{{ $space->firstname . ' ' .  $space->lastname}}</td>                                    
                                        <td>UGX 500,000</td>
                                    </tr>   
                                @endforeach
                            </tbody>
                        </table>
                       
                        {{$spaces->links()}}
                    </div>
                    
                    

                    

                    
                </div>
            </section>
        </div>
    </div>

   

</div>

