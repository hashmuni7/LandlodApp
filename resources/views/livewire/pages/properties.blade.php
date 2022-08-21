<div>
    <x-slot name="title">
        Properties
    </x-slot>
    

    <x-slot name="header">
        <header class="page-header">
            <h2>Properties</h2>
            <div class="right-wrapper text-right">
                <ol class="breadcrumbs">
                    <li>
                        <a href="{{-- url('/adminhome') --}}">
                            <i class="fas fa-home"></i>
                        </a>
                    </li>
                    <li><span>Properties</span></li>
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
    
                    <h2 class="card-title">Properties</h2>
                </header>
                <div class="card-body">
                    <div class="container-row mb-4">
                        @php
                            $fetchFor;
                            if(Auth::user()->usercategory->usercategoryid == 1)
                            {
                                $fetchFor = 0;
                            }elseif (Auth::user()->usercategory->usercategoryid == 200)
                            {
                                $fetchFor = 1;
                            }
                        @endphp
                        @livewire('tables.landlord-properties', ['landlord' => $user, 'fetchFor' => $fetchFor])
                        
                    </div>
                    
                    

                    

                    
                </div>
            </section>
        </div>
    </div>

   

</div>
