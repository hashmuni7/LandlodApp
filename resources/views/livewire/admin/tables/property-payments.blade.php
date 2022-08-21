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
                    <th>Status</th>
                    <th>Date</th>
                    <th>Space Code</th>
                    <th>Amount</th>
                    <th>Receipt No</th>
                    <th>Space Name</th>
                    <th>Property</th>
                    <th>Channel</th>
                    <th>Channel Txn ID</th>
                    <th>Channel Memo</th>
                </tr>
            </thead>
            <tbody>        
                @foreach ($rentPayments as $payment)
                    <tr>
                        <td><span class="badge {{$payment->status ? 'badge-success' : 'badge-danger'}}">{{$payment->status ? 'Success' : 'Processing'}}</span></td>
                        <td>{{$payment->date}}</td>
                        <td>{{$payment->spaceid}}</td>
                        <td>{{$payment->amount}}</td>
                        <td>{{$payment->receiptno}}</td>
                        <td>{{$payment->spacename}}</td>
                        <td>{{$payment->property}}</td>
                        <td>{{$payment->inchannel}}</td>
                        <td>{{$payment->inchanneltxnid}}</td>
                        <td>{{$payment->channelinfo}}</td>
                    </tr>   
                @endforeach
            </tbody>
        </table>
        {{$rentPayments->links()}}       
    </div>
</div>



