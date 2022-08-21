<div>
    <div class="row">
        <div class="form-group col-lg-6">
            <div class="" style="max-width: 5em">
                
                <select name="" id="" wire:model="perPage" class="form-select form-control">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="99999">50</option>
                </select>
            </div>
        </div>
        <div class="col-lg-6">
            <div class="form-group">
                <!--<input wire:model="searchPropertysOfLandlord"  type="search" class="form-control input-rounded w-75" placeholder="Search Landlord's Properties ..." style="float: right;">-->
            </div>
        </div>
    </div>
    <div class="card-body">
        <table class="table table-responsive-md table-striped mb-0">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Space Name</th>
                    <th>Space Code</th>
                    <th>Status</th>
                    <th>Balance</th>
                </tr>
            </thead>
            <tbody>        
                @foreach ($spaces as $key => $space)
                                                
                    <tr>
                                                        
                        <td>{{$spaces->firstItem() + $key}}</td>
                        <td>{{$space->spacename}}</td>
                        <td><a href="{{url("/spaces/space/$space->spaceid")}}">{{$space->spaceid}}</a></td>
                        <td><span class="badge {{$space->occupied ? 'badge-success' : 'badge-danger'}}">{{$space->occupied ? 'Occupied' : 'Vacant'}}</span></td>
                        <td>{{'UGX ' . number_format($space->rentprice)}}</td>                                    
                    </tr>
                @endforeach
            </tbody>
        </table>
        {{$spaces->links()}}       
    </div>
</div>




