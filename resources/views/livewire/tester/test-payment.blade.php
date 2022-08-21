<div>
    <x-slot name="title">
        Test Payment
    </x-slot>
    

    <x-slot name="header">
        <header class="page-header">
            <h2>Test Payment</h2>
        
            <div class="right-wrapper text-right">
                <ol class="breadcrumbs">
                    <li>
                        <a href="{{-- url('/adminhome') --}}">
                            <i class="fas fa-home"></i>
                        </a>
                    </li>
                    <li><span>Test Payment Page</span></li>
                              
                </ol>
        
                <a class="sidebar-right-toggle" ><i class="fas fa-chevron-left"></i></a>
            </div>
        </header>
    </x-slot>

    <div class="row">
        <div class="container-fluid mb-3">
            <section class="card">
                <header class="card-header card-header-transparent">
                    <div class="card-actions">
                        
                    </div>
    
                    <h2 class="card-title">Test Payments to Landlod App</h2>
                </header>
                <div class="card-body">
                    
                    <form wire:submit.prevent="addTestPayment"  >
                        {{ csrf_field() }}
                        <div class="row">
                            <div class="card-body col-lg-8">
                                <div class="row form-group">
                                    <div class="col-lg-8">
                                        <div class="form-group ">
                                            <label for="SpaceCode">SpaceCode</label>
                                            <input type="name" class="form-control p-p" id="spaceCode" name="spaceCode" placeholder="30664470001" wire:model="spaceCode" required>
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <div class="form-group">
                                            <label for="Amount">Amount</label>
                                            <input type="name" class="form-control p-p" id="paymentAmount" name="paymentAmount" placeholder="50000" wire:model="paymentAmount" required>
                                        </div>
                                    </div>
                                </div> 
                                <div class="row form-group">
                                    <div class="col-lg-4">
                                        <div class="form-group>
                                            <label class="col-form-label" for="Channel">Channel</label>
                                            <select name="" id="" wire:model="inChannel" class="form-select form-control">
                                                <option value="">Select Channel</option>
                                                @foreach ($inChannels as $inChannel)
                                                    <option value="{{$inChannel->inchannelid}}">{{$inChannel->inchannel}}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div class="col-lg-4">
                                        <div class="form-group col-md-12">
                                            <label for="Amount">Transaction Charges</label>
                                            <input type="name" class="form-control p-p" id="txnCharges" name="txnCharges" placeholder="990" wire:model="txnCharges" required>
                                        </div>
                                    </div>
                                </div>                               
                                <div class="row form-group">
                                    <div class="col-lg-6">
                                        <div class="form-group">                                           
                                            <button class="btn btn-primary btn-block" type="submit" style="width: 13em">Add Payment</button>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </form>
                    
                </div>                    
            </section>
        </div>
    </div>

    @section('pagejs')
        <!-- Code to handle Admin Requests-->
        <script>
           
            

        </script>
    @endsection

    
</div>

