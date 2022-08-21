<?php

namespace App\Http\Livewire\Admin;

use Livewire\Component;
use App\Models\User;
use App\Models\District;
use App\Models\Property;
use Carbon\Carbon;
use Jantinnerezo\LivewireAlert\LivewireAlert;

class EditProperty extends Component
{
    // Attributes
    public $landlord;
    use LivewireAlert;

    public $propertyid;
    public $focusProperty;
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
        return view('livewire.admin.edit-property');
    }

    public function mount($propertyid)
    {
        $this->propertyid = $propertyid;
        $this->focusProperty =  Property::select('*')
                                     ->where('propertyid', $this->propertyid)
                                     ->leftjoin('districts', 'propertys.districtid', '=', 'districts.districtid')
                                     ->leftjoin('users', 'propertys.userid', '=', 'users.id')
                                     ->first();
        $this->landlord = User::select('*')->where('id', $this->focusProperty->userid)->first();
        $this->districts = District::all();

        // Initialise the fields with current values
        $this->property = $this->focusProperty->property;
        $this->district = $this->focusProperty->districtid;
        $this->city = $this->focusProperty->city;
        $this->address = $this->focusProperty->address;
        $this->chargeLateFee = $this->focusProperty->latecharge;
        $this->lateFee = $this->focusProperty->latefee;
        $this->gracePeriod = $this->focusProperty->graceperiod;
        $this->accountNumber = $this->focusProperty->phonenumber;
        

    }

    public function editProperty()
    {
        $this->validate();

        Property::where('propertyid', $this->focusProperty->propertyid)->update([
            'property' => $this->property,
            'districtid' => $this->district,
            'city' => $this->city,
            'address' => $this->address,
            'userid' => $this->landlord->id,
            'graceperiod' => $this->gracePeriod,
            'latecharge' => $this->chargeLateFee,
            'latefee' => $this->lateFee,
            'phonenumber' => $this->accountNumber,
            'updatedby' => 1    
        ]);

        $this->alert('success', 'Property Updated' , [
            'position' =>  'top-end', 
            'timer' =>  3000,  
            'toast' =>  true, 
      ]);

      //return redirect()->to("/landlords/$this->landlordid");
    }
}
