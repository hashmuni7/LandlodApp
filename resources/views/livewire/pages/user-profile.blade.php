
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
                    
                    <form wire:submit.prevent="save" class="form-bordered ">
                        {{ csrf_field() }}
                        <div class="row">
                            <div class="card-body col-lg-8">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col">
                                            @if ($user->profile_photo_path)
                                                <img src="{{asset("storage/$user->profile_photo_path")}}"/>
                                                <!--<img src="{{asset("storage/photos/AzTlJd4yWVyKSesHNDOSzUt3vpUWL37pxNotkRuZ.png")}}"/>-->
                                            @endif
                                            <div wire:loading wire:target="profilePhoto">Uploading...</div>
                                            @if ($profilePhoto)
                                                <img src="{{$profilePhoto->temporaryUrl()}}"/>
                                            @endif
                                            <div class="form-group @error('profilePhoto') has-danger @enderror">
                                                <label class="col-form-label" for="formGroupExampleInput">Profile Photo</label>
                                                <input type="file" class="form-control" id="formGroupExampleInput" placeholder="" wire:model="profilePhoto">
                                                @error('profilePhoto')
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
                                            @if ($profilePhoto)
                                                <button class="btn btn-primary btn-block" type="submit" style="width: 13em">Save</button>
                                            @endif                                          
                                            
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


