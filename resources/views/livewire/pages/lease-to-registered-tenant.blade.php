
<div>
    <x-slot name="title">
        Add Tenant
    </x-slot>
    

    <x-slot name="header">
        <header class="page-header">
            <h2>Edit Landlord</h2>
        
            <div class="right-wrapper text-right">
                <ol class="breadcrumbs">
                    <li>
                        <a href="{{-- url('/adminhome') --}}">
                            <i class="fas fa-home"></i>
                        </a>
                    </li>
                    <li><span>Landlord</span></li>
                    <li><span>Add Tenant</span></li>                     
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
    
                    <h2 class="card-title">Lease Space to New Tenant</h2>
                    <p class="card-subtitle">Landlord ID: </p>
                </header>
                <div class="card-body">
                    
                    <form wire:submit.prevent="leaseToTenant" class="form-bordered ">
                        {{ csrf_field() }}
                        <div class="row">
                            <div class="card-body col-lg-8">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-lg-4">
                                            <div class="form-group @error('tenantPhoneNumber') has-danger @enderror">
                                                <label class="col-form-label" for="formGroupExampleInput">Phone Number</label>
                                                <input type="text" class="form-control" id="formGroupExampleInput" placeholder="" wire:model="tenantPhoneNumber">
                                                @error('tenantPhoneNumber')
                                                    <div>
                                                        <label class="error">                                          
                                                            <strong>{{ $message }}</strong>
                                                        </label>
                                                    </div>
                                                @enderror
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class=" @error('tenantEmail') has-danger @enderror">
                                                <label class="col-form-label" for="formGroupExampleInput">Email</label>
                                                <input type="email" class="form-control" id="formGroupExampleInput" placeholder="" wire:model="tenantEmail">
                                                @error('tenantEmail')
                                                    <div>
                                                        <label class="error">                                          
                                                            <strong>{{ $message }}</strong>
                                                        </label>
                                                    </div>
                                                @enderror
                                            </div>
                                        </div>
                                    </div>                                
                                    
                                </div> 
                                                                                           
                                <div class="row form-group">
                                    <div class="col-lg-6">
                                        <div class="form-group">                                           
                                            <button class="btn btn-primary btn-block" type="submit" style="width: 13em">Add Tenant</button>
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
            // var stack_bottomright = {"dir1": "up", "dir2": "left", "firstpos1": 15, "firstpos2": 15};
            // window.addEventListener('editty', event => {
                
            //     var notice = new PNotify({
            //         title: 'Notification',
            //         text: 'tenant Edit Success ' + event.detail.check,
            //         addclass: 'notification-dark stack-bottomright',
            //         icon: 'fas fa-user',
            //         stack: stack_bottomright
            //     });
            //     console.log(event.detail.check);
            // });
            

        </script>
    @endsection

    
</div>

