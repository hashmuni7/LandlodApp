<?php

namespace App\Http\Livewire\Admin;

use Livewire\Component;

use App\Models\User;
use App\Models\District;
use App\Models\Property;
use Carbon\Carbon;
use Jantinnerezo\LivewireAlert\LivewireAlert;

class AddPropertyToLandlord extends Component
{
    use LivewireAlert;
    // Attributes
    public $landlord;

    public $landlordid;
    public $property;
    public $district;
    public $city;
    public $address;
    public $chargeLateFee = false;
    public $lateFee;
    public $gracePeriod;
    public $accountNumber;
    public $status = true;

    public $districts;

    // Validation Rules
    protected $rules = [
        'property' => 'required',
        'district' => 'required',
        'city' => 'required',
        'address' => 'required',
        'chargeLateFee' => 'required',
        'lateFee' => 'required',
        'gracePeriod' => 'required',
        'accountNumber' => 'required',
        'status' => 'required'        
        ];

    public function updated($propertyName)
    {
        $this->validateOnly($propertyName);
    }

    public function render()
    {
        return view('livewire.admin.add-property-to-landlord',
            [
                'landlord' => $this->landlord,
                'districts' => $this->districts
            ]
        );
    }

    public function mount($landlordid)
    {
        $this->landlordid = $landlordid;

        $this->landlord = User::select('*')->where('id', $this->landlordid)->first();
        $this->districts = District::all();

    }

    public function addProperty()
    {
        $this->validate();

        Property::create([
            'property' => $this->property,
            'districtid' => $this->district,
            'city' => $this->city,
            'address' => $this->address,
            'userid' => $this->landlord->id,
            'graceperiod' => $this->gracePeriod,
            'latecharge' => $this->chargeLateFee,
            'latefee' => $this->lateFee,
            'phonenumber' => $this->accountNumber,
            'createdby' => 1,
            'createdon' => Carbon::now(),
            'updatedby' => 1    
        ]);

        $this->flash('success', 'Property Added' , [
            'position' =>  'top-end', 
            'timer' =>  3000,  
            'toast' =>  true, 
            'text' =>  "Landlord has a new property now", 
      ]);

      return redirect()->to("/landlords/$this->landlordid");
    }
}
