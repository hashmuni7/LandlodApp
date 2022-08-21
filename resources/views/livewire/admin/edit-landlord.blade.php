<div>
    <x-slot name="title">
        Landlord
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
                    <li><span>Edit</span></li>                     
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
    
                    <h2 class="card-title">Landlord One</h2>
                    <p class="card-subtitle">Landlord ID: {{$landlord->id}}</p>
                </header>
                <div class="card-body">
                    
                    <form wire:submit.prevent="submit"  >
                        {{ csrf_field() }}
                        <div class="row">
                            <div class="card-body col-lg-8">
                                <div class="row form-group">
                                    <div class="col-lg-4">
                                        <div class="form-group @error('landlordFirstname') has-danger @enderror">
                                            <label class="col-form-label" for="formGroupExampleInput">First Name</label>
                                            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="" wire:model="landlordFirstname">
                                            @error('landlordFirstname')
                                                <div>
                                                    <label class="error">                                          
                                                        <strong>{{ $message }}</strong>
                                                    </label>
                                                </div>
                                            @enderror
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <div class="form-group @error('landlordLastname') has-danger @enderror">
                                            <label class="col-form-label" for="formGroupExampleInput">Last Name</label>
                                            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="" wire:model="landlordLastname">
                                            @error('landlordLastname')
                                                <div>
                                                    <label class="error">                                          
                                                        <strong>{{ $message }}</strong>
                                                    </label>
                                                </div>
                                            @enderror
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <div class="form-group @error('landlordOthernames') has-danger @enderror">
                                            <label class="col-form-label" for="formGroupExampleInput">Other Names</label>
                                            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="" wire:model="landlordOthernames">
                                            @error('landlordOthernames')
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
                                    <div class="col-lg-4">
                                        <div class="form-group @error('landlordSex') has-danger @enderror">
                                            <label class="col-form-label" for="formGroupExampleInput">Sex</label>
                                            <div class="form-radio mb-2  row ml-1" >
                                                <div class="radio-custom col-sm-6">
                                                    <input type="radio" id="male" value="1" name="sex" wire:model="landlordSex" class="p-p">
                                                    <label for="Male">Male</label>
                                                </div>
    
                                                <div class="radio-custom col-sm-6">
                                                    <input type="radio" id="female" value="0" name="sex" wire:model="landlordSex" class="p-p">
                                                    <label for="Female">Female</label>
                                                </div>
                                                <input type="text" id="" class="hidden" name="gender">
                                                @error('landlordSex')
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
                                        <div class="form-group @error('landlordStatus') has-danger @enderror" >
                                            <label class="col-form-label" for="formGroupExampleInput">Status</label>
                                            <div class="form-radio mb-2  row ml-1" >
                                                <div wire:ignore class="switch switch-sm switch-primary">
                                                    <input    type="checkbox" name="switch"    data-plugin-ios-switch checked="checked" wire:model="landlordStatus"/>
                                                </div>
                                                    
                                            </div>
                                            @error('landlordStatus')
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
                                        <div class="form-group @error('landlordPhone') has-danger @enderror">
                                            <label class="col-form-label" for="formGroupExampleInput">Phone Number</label>
                                            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="" wire:model="landlordPhone">
                                            @error('landlordPhone')
                                                <div>
                                                    <label class="error">                                          
                                                        <strong>{{ $message }}</strong>
                                                    </label>
                                                </div>
                                            @enderror
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="form-group @error('landlordEmail') has-danger @enderror">
                                            <label class="col-form-label" for="formGroupExampleInput">Email</label>
                                            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="" wire:model="landlordEmail">
                                            @error('landlordEmail')
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
                                            <label class="col-form-label" for="formGroupExampleInput">Password</label>
                                            <button class="btn btn-primary btn-block" type="button" style="width: 13em">Change Password</button>
                                        </div>
                                    </div>
                                    
                                </div>                                
                                <div class="row form-group">
                                    <div class="col-lg-6">
                                        <div class="form-group">                                           
                                            <button class="btn btn-primary btn-block" type="submit" style="width: 13em">Save</button>
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
            //         text: 'Landlord Edit Success ' + event.detail.check,
            //         addclass: 'notification-dark stack-bottomright',
            //         icon: 'fas fa-user',
            //         stack: stack_bottomright
            //     });
            //     console.log(event.detail.check);
            // });
            

        </script>
    @endsection

    
</div>
