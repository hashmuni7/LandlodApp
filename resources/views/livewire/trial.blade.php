<div>
    <x-slot name="title">
        Test
    </x-slot>
    

    <x-slot name="header">
        <header class="page-header">
            <h2>Test Page</h2>
        
            <div class="right-wrapper text-right">
                <ol class="breadcrumbs">
                    <li>
                        <a href="{{-- url('/adminhome') --}}">
                            <i class="fas fa-home"></i>
                        </a>
                    </li>
                    <li><span>Test Page</span></li>                    
                </ol>
        
                <a class="sidebar-right-toggle" ><i class="fas fa-chevron-left"></i></a>
            </div>
        </header>
    </x-slot>
    
    <input type="date" wire:model="number" >
    <p>Message:  {{$message->format('D, d M Y')}}</p>
   
    <button class="btn btn-primary" wire:click.prevent="createTenures()">Create Tenures</button>
    <p></p>
    @foreach ($results as $result)
        {{$result}}
    @endforeach

    
</div>
