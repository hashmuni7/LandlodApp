<div>
    <div class="row">
        <div class="form-group col-lg-6">
            <div class="" style="max-width: 5em">
                
                <select name="" id="" wire:model="propertysPerPage" class="form-select form-control">
                    <option value="3">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                </select>
            </div>
        </div>
        <div class="col-lg-6">
            <div class="form-group">
                <input wire:model="searchPropertysOfLandlord"  type="search" class="form-control input-rounded w-75" placeholder="Search Landlord's Properties ..." style="float: right;">
            </div>
        </div>
    </div>
    <div class="card-body">
        <table class="table table-responsive-md table-striped mb-0">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Property</th>
                    <th>Spaces</th>
                    <th>Distict</th>
                    <th>City</th>
                    <th>Balance</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($propertysForLandlord as $property)
                    <tr>
                        <td>{{$loop->iteration}}</td>
                        <td>{{$property->property}}</td>
                        <td>{{$property->spaces()->count()}}</td>
                        <td>{{$property->district}}</td>
                        <td>{{$property->city}}</td>
                        <td>900000</td>
                    </tr>   
                @endforeach
            </tbody>
        </table>
        {{$propertysForLandlord->links()}}
        {{$propertysForLandlord->getPageName()}}
        {{$propertysForLandlord->url(1)}}
    </div>
</div>
