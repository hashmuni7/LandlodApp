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
                    <th>Date</th>
                    <th>Category</th>
                    <th class="text-right">Debit</th>
                    <th class="text-right">Credit</th>
                    <th class="text-right">Closing</th>                                    
                </tr>
            </thead>
            <tbody>
                 
                @foreach ($txns as $txn)
                    <tr>                                    
                        <td>{{ $txn->date->format('D, d M Y h:m')}}</td>
                        @if ($txn->transactiontypeid == 1)
                            <td>{{$txn->transactiontype}} ({{$txn->startdate}}-{{$txn->enddate}})</td>
                        @else
                            <td>{{$txn->transactiontype}}</td>
                        @endif
                        
                        <td class="text-right">{{$txn->debit}}</td>
                        <td class="text-right">{{$txn->credit}}</td>
                        <td class="text-right">{{$txn->balance}}</td>                                    
                    </tr>
                @endforeach                       
            </tbody>
        </table>
          {{ $txns->links() }}             
    </div>
</div>



