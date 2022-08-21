<div>
    <x-slot name="title">
        Properties
    </x-slot>
    

    <x-slot name="header">
        <header class="page-header">
            <h2>Properties</h2>
        
            <div class="right-wrapper text-right">
                <ol class="breadcrumbs">
                    <li>
                        <a href="{{-- url('/adminhome') --}}">
                            <i class="fas fa-home"></i>
                        </a>
                    </li>
                    <li><span>Properties</span></li>                    
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
    
                    <h2 class="card-title">Properties</h2>
                </header>
                <div class="card-body">
                    <div class="container-row mb-4">
                        <div class="row">
                            <div class="form-group col-lg-6">
                                <div class="" style="max-width: 5em">
                                    
                                    <select name="" id="" wire:model="perPage" class="form-select form-control">
                                        <option value="3">3</option>
                                        <option value="8">8</option>
                                        <option value="10">10</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <input wire:model="search"  type="search" class="form-control input-rounded w-75" placeholder="Search Properties ..." style="float: right;">
                                </div>
                            </div>
                        </div>
                        <table class="table table-responsive-md table-striped mb-0">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Property</th>
                                    <th>City</th>
                                    <th>District</th>
                                    <th>Spaces</th>
                                    <th>Tenants</th>
                                    <th>Occupancy</th>
                                    <th>Balance</th>                                     
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($propertys as $key => $property)
                                    <tr>
                                        <td>{{$propertys->firstItem() + $key}}</td>
                                        <td><a href="{{url("/properties/property/$property->propertyid")}}">{{$property->property}}</a></td>
                                        <td>{{$property->city}}</td>
                                        <td>{{$property->district}}</td>
                                        <td>{{$property->spaces()->count()}}</td>
                                        <td>{{$property->spaces()->where('occupied', 1)->count()}}</td>
                                        <td>{{ ($property->spaces()->where('occupied', 1)->count() / $property->spaces()->count()) * 100}}%</td>
                                        <td>900,000</td>
                                    </tr>   
                                @endforeach
                            </tbody>
                        </table>
                       
                        {{$propertys->links()}}
                    </div>
                    
                    

                    

                    
                </div>
            </section>
        </div>
    </div>

   

</div>
