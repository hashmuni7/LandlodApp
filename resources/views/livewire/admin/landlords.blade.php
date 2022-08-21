<div>
    <x-slot name="title">
        Landlords
    </x-slot>
    

    <x-slot name="header">
        <header class="page-header">
            <h2>Landlords</h2>
        
            <div class="right-wrapper text-right">
                <ol class="breadcrumbs">
                    <li>
                        <a href="{{-- url('/adminhome') --}}">
                            <i class="fas fa-home"></i>
                        </a>
                    </li>
                    <li><span>Landlords</span></li>                    
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
    
                    <h2 class="card-title">Landlords</h2>
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
                                    <input wire:model="search"  type="search" class="form-control input-rounded w-75" placeholder="Search Landlords ..." style="float: right;">
                                </div>
                            </div>
                        </div>
                        
                        <table class="table table-responsive-md table-striped mb-0 mt-2"
                                                        id="table"
                                data-toggle="table"
                                data-height="460" >
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th  wire:click.prevent="sortField('lastname')" style="cursor: pointer">
                                        Landlord 
                                        @if ($sortField === 'lastname')
                                            @if ($sortDirection === 'asc')
                                                <i class="fas fa-sort-up"></i>
                                            @else
                                            <i class="fas fa-sort-down"></i>
                                            @endif
                                        @else
                                        <i class="text-muted fas fa-sort"></i>
                                        @endif                                        
                                    </th>
                                    <th wire:click.prevent="sortField('id')" style="cursor: pointer"> 
                                        Properties
                                        @if ($sortField === 'id')
                                            @if ($sortDirection === 'asc')
                                                <i class="fas fa-sort-up"></i>
                                            @else
                                                <i class="fas fa-sort-down"></i>
                                            @endif
                                        @else
                                        <i class="text-muted fas fa-sort" ></i>
                                        @endif 
                                    </th>
                                    <th >Spaces <i class=""></i></th>
                                    <th>Tenants</th>
                                    <th>Occupancy</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                @foreach ($landlords as $landlord)
                                    <tr>
                                        <td>{{$loop->iteration}}</td>
                                        <td>{{$landlord->firstname}}  {{$landlord->lastname}}</td>
                                        <td>3</td>
                                        <td>34</td>
                                        <td>30</td>
                                        <td>92%</td>
                                        <td class="actions-hover actions-fade">                                            
                                            <a class="ws-normal pointer btn btn-xs btn-primary text-white" href="{{ url("/landlords/$landlord->id") }}"><i class="fas fa-eye"></i> View</a>
                                        </td>
                                    </tr>
                                @endforeach
                                
                            </tbody>
                        </table>
                        {{$landlords->links()}}
                    </div>
                    
                    

                    

                    
                </div>
            </section>
        </div>
    </div>

   

</div>
