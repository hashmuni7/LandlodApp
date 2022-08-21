
<div>
    <x-slot name="title">
        Add Tenant
    </x-slot>
    

    <x-slot name="header">
        <header class="page-header">
            <h2>Add Tenant</h2>
        
            <div class="right-wrapper text-right">
                <ol class="breadcrumbs">
                    <li>
                        <a href="{{-- url('/adminhome') --}}">
                            <i class="fas fa-home"></i>
                        </a>
                    </li>
                    <li><span>Property</span></li>
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
    
                    <h2 class="card-title">Add Tenant To Property</h2>
                    <p class="card-subtitle">Property ID: {{$property->propertyid}}</p>
                </header>
                <div class="card-body">
                    
                    <form wire:submit.prevent="addTenant" class="form-bordered ">
                        {{ csrf_field() }}
                        <div class="row">
                            <div class="card-body col-lg-8">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-lg-4">
                                            <div class="form-group @error('tenantFirstname') has-danger @enderror">
                                                <label class="col-form-label" for="formGroupExampleInput">First Name</label>
                                                <input type="text" class="form-control" id="formGroupExampleInput" placeholder="" wire:model="tenantFirstname">
                                                @error('tenantFirstname')
                                                    <div>
                                                        <label class="error">                                          
                                                            <strong>{{ $message }}</strong>
                                                        </label>
                                                    </div>
                                                @enderror
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class=" @error('tenantLastname') has-danger @enderror">
                                                <label class="col-form-label" for="formGroupExampleInput">Last Name</label>
                                                <input type="text" class="form-control" id="formGroupExampleInput" placeholder="" wire:model="tenantLastname">
                                                @error('tenantLastname')
                                                    <div>
                                                        <label class="error">                                          
                                                            <strong>{{ $message }}</strong>
                                                        </label>
                                                    </div>
                                                @enderror
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class=" @error('tenantOthernames') has-danger @enderror">
                                                <label class="col-form-label" for="formGroupExampleInput">Other Names</label>
                                                <input type="text" class="form-control" id="formGroupExampleInput" placeholder="" wire:model="tenantOthernames">
                                                @error('tenantOthernames')
                                                    <div>
                                                        <label class="error">                                          
                                                            <strong>{{ $message }}</strong>
                                                        </label>
                                                    </div>
                                                @enderror
                                            </div>
                                        </div>
                                    </div>                                
                                    <div class="row">
                                        <div class="col-lg-4">
                                            <div class="form-group @error('tenantSex') has-danger @enderror">
                                                <label class="col-form-label" for="formGroupExampleInput">Gender</label>
                                                <div class="form-radio mb-2  row ml-1" >
                                                    <div class="radio-custom col-sm-6">
                                                        <input type="radio" id="male" value="1" name="sex" wire:model="tenantSex" class="p-p">
                                                        <label for="Male">Male</label>
                                                    </div>
        
                                                    <div class="radio-custom col-sm-6">
                                                        <input type="radio" id="female" value="0" name="sex" wire:model="tenantSex" class="p-p">
                                                        <label for="Female">Female</label>
                                                    </div>                                                    
                                                    @error('tenantSex')
                                                    <div>
                                                        <label class="error">                                          
                                                            <strong>{{ $message }}</strong>
                                                        </label>
                                                    </div>
                                                @enderror
                                                </div>
                                            </div>
                                        </div> 
                                        <div class="col-lg-4">
                                            <div class="form-group @error('tenantStatus') has-danger @enderror" >
                                                <label class="col-form-label" for="formGroupExampleInput">Status</label>
                                                <div class="form-radio mb-2  row ml-1" >
                                                    <div wire:ignore class="switch switch-sm switch-primary">
                                                        <input    type="checkbox" name="switch"    data-plugin-ios-switch checked="checked" wire:model="tenantStatus"/>
                                                    </div>
                                                        
                                                </div>
                                                @error('tenantStatus')
                                                    <div>
                                                        <label class="error">                                          
                                                            <strong>{{ $message }}</strong>
                                                        </label>
                                                    </div>
                                                @enderror
                                            </div>
                                        </div>                                                                       
                                    </div>
                                    <div class="row ">
                                        <div class="col-lg-6">
                                            <div class="form-group @error('tenantPhone') has-danger @enderror">
                                                <label class="col-form-label" for="formGroupExampleInput">Phone Number</label>
                                                <input type="text" class="form-control" id="formGroupExampleInput" placeholder="" wire:model="tenantPhone">
                                                @error('tenantPhone')
                                                    <div>
                                                        <label class="error">                                          
                                                            <strong>{{ $message }}</strong>
                                                        </label>
                                                    </div>
                                                @enderror
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="form-group @error('tenantEmail') has-danger @enderror">
                                                <label class="col-form-label" for="formGroupExampleInput">Email</label>
                                                <input type="text" class="form-control" id="formGroupExampleInput" placeholder="" wire:model="tenantEmail">
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
                                    <div class="col-lg-4">
                                        <div class="form-group @error('space') has-danger @enderror">
                                            <label class="col-form-label" for="space">Space</label>
                                            <select name="" id="" wire:model="space" class="form-select form-control">
                                                <option value="">Select Space</option>
                                                @foreach ($spaces as $space)
                                                    <option value="{{$space->spaceid}}">{{$space->spacename}}</option>
                                                @endforeach
                                            </select>
                                            @error('space')
                                                <div>
                                                    <label class="error">                                          
                                                        <strong>{{ $message }}</strong>
                                                    </label>
                                                </div>
                                            @enderror
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

