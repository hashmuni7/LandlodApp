<?php

namespace App\Http\Livewire\Pages;

use Livewire\Component;

use App\Models\User;
use App\Models\District;
use App\Models\Property;
use Carbon\Carbon;
use Jantinnerezo\LivewireAlert\LivewireAlert;

class AddPropertyToLandlord extends Component
{
    /*
    1. Get the landlord ID
    2. Get the property details
    3. Insert the property in database with the owner as landlord ID
    
    
    
    */
    // Attributes
    use LivewireAlert;
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
        'property' => 'required|max:100',
        'district' => 'required',
        'city' => 'required|max:100',
        'address' => 'required|max:100',
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
        return view('livewire.pages.add-property-to-landlord',
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

        $propertyCreated = Property::create([
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

      return redirect()->to("/properties/property/$propertyCreated->propertyid");
    }
}
