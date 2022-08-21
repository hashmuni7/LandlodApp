<div>
    <x-slot name="title">
        Payments
    </x-slot>
    

    <x-slot name="header">
        <header class="page-header">
            <h2>Payments</h2>
        
            <div class="right-wrapper text-right">
                <ol class="breadcrumbs">
                    <li>
                        <a href="{{-- url('/adminhome') --}}">
                            <i class="fas fa-home"></i>
                        </a>
                    </li>
                    <li><span>Payments</span></li>                    
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
    
                    <h2 class="card-title">Payments</h2>
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
                                    <input wire:model="search"  type="search" class="form-control input-rounded w-75" placeholder="Search Payments ..." style="float: right;">
                                </div>
                            </div>
                        </div>
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
                                @foreach ($payments as $payment)
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
                       
                        {{$payments->links()}}
                    </div>
                    
                    

                    

                    
                </div>
            </section>
        </div>
    </div>

   

</div>


