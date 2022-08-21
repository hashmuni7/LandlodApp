<?php

namespace App\Http\Livewire\Pages;

use Livewire\Component;
use App\Models\User;
use App\Models\Property;
use App\Models\Space;
use Jantinnerezo\LivewireAlert\LivewireAlert;

class AddTenantToProperty extends Component
{
    use LivewireAlert;
    //public $landlordid;
    //public $landlord;
    public $tenant;
    public $tenantFirstname = '';
    public $tenantLastname = '';
    public $tenantOthernames = '';
    public $tenantSex = '';
    public $tenantStatus = true;
    public $tenantPhone = '';
    public $tenantEmail = '';
    public $tenantPassword = '';

    //public $propertys;
    public $property;
    public $space;
    public $spaces;

    protected $rules = [
        'tenantFirstname' => 'required',
        'tenantLastname' => 'required',
        'tenantSex' => 'required',
        'tenantStatus' => 'required',
        'tenantPhone' => 'required',
        'tenantEmail' => 'required',
        'space' => 'required'        
        ];

    public function updated($propertyName)
    {
        $this->validateOnly($propertyName);
    }
    public function render()
    {
        return view('livewire.pages.add-tenant-to-property');
    }

    public function mount($propertyid)
    {
        $this->propertyid = $propertyid;

        //$this->landlord = User::select('*')->where('id', $this->landlordid)->first();
        $this->property = Property::select('*')
                                    ->where('propertyid', $propertyid)                                    
                                    ->first();
        $this->spaces = Space::select('*')
                                ->where('spaces.propertyid', $propertyid)
                                ->where('spaces.occupied', 0)
                                ->leftjoin('propertys', 'spaces.propertyid', '=', 'propertys.propertyid')
                                ->get();                    
        
    }

    public function addTenant()
    {
        $this->validate();
        $this->flash('success', 'Tenant Added' , [
            'position' =>  'top-end', 
            'timer' =>  3000,  
            'toast' =>  true, 
      ]);
      
      return redirect()->to("/spaces/space/$this->space");  
    }
}
