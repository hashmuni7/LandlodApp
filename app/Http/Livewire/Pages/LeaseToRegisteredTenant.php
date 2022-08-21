<?php

namespace App\Http\Livewire\Pages;

use Livewire\Component;

use App\Models\User;
use App\Models\Property;
use App\Models\Space;
use Jantinnerezo\LivewireAlert\LivewireAlert;

class LeaseToRegisteredTenant extends Component
{
    use LivewireAlert;
    
    public $tenantPhoneNumber = '';
    public $tenantEmail = '';
    public $spaceid;
    

    protected $rules = [
        'tenantPhoneNumber' => 'required',
        'tenantEmail' => 'required|email',      
        ];

    // public function updated($propertyName)
    // {
    //     $this->validateOnly($propertyName);
    // }

    public function render()
    {
        return view('livewire.pages.lease-to-registered-tenant');
    }

    public function mount($spaceid)
    {
        $this->spaceid = $spaceid;
    }

    public function leaseToTenant()
    {
        $this->validate();
        $this->alert('success', 'Space Leased!' , [
                'position' =>  'top-end', 
                'timer' =>  3000,  
                'toast' =>  true, 
        ]);

        // $space = Space::where('spaces.spaceid', $this->spaceid)
        //                 ->update([
        //                     ''
        //                 ]);


      
      //return redirect()->to("/spaces/space/$this->space");  
    }

    // public function updatedProperty($value)
    // {
    //     //$this->reset('space');
    //     $this->spaces = Space::select('*')->where('propertys.userid', $this->landlord->id)
    //                             ->where('spaces.propertyid', '=', $value)
    //                             ->leftjoin('propertys', 'spaces.propertyid', '=', 'propertys.propertyid')
    //                             ->get();
    //     $this->alert('success', 'Tenant Added' , [
    //         'position' =>  'top-end', 
    //         'timer' =>  3000,  
    //         'toast' =>  true, 
    //   ]);
    // }
}

