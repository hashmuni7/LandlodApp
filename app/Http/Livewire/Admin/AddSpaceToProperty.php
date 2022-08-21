<?php

namespace App\Http\Livewire\Admin;

use Livewire\Component;
use App\Models\User;
use App\Models\District;
use App\Models\Property;
use App\Models\Space;
use Carbon\Carbon;
use Jantinnerezo\LivewireAlert\LivewireAlert;
class AddSpaceToProperty extends Component
{
    use LivewireAlert;
    // Attributes
    public $landlord;
    public $focusProperty;
    public $propertyid;
    public $property;
    public $spaceName;
    public $rentPrice;
    public $rentalPeriod;
    public $initialPayment;
    public $chargeLateFee = false;
    public $lateFee;
    public $gracePeriod;

    // Validation Rules
    protected $rules = [
        'spaceName' => 'required',
        'rentPrice' => 'required',
        'initialPayment' => 'required',
        'chargeLateFee' => 'required',
        'lateFee' => 'required',
        'gracePeriod' => 'required'        
        ];

    public function updated($propertyName)
    {
        $this->validateOnly($propertyName);
    }

    public function render()
    {
        return view('livewire.admin.add-space-to-property');
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
       
        // Initialize some values from property       
        $this->chargeLateFee = $this->focusProperty->latecharge;
        $this->lateFee = $this->focusProperty->latefee;
        $this->gracePeriod = $this->focusProperty->graceperiod;

    }

    public function addSpace()
    {
         $this->validate();

        $newSpace = Space::create([
            'spacename' => $this->spaceName,
            'propertyid' => $this->focusProperty->propertyid,
            'occupied' => false,
            'rentprice' => $this->rentPrice,
            'rentalperiod' => $this->rentalPeriod,
            'initialpaymentfor' => $this->initialPayment,
            'latecharge' => $this->chargeLateFee,
            'latefee' => $this->lateFee,
            'graceperiod' => $this->gracePeriod,
            'balance' => 0,
            'readyfortenant' => true,
            'createdby' => 1    
        ]);

        $this->flash('success', 'Space Added' , [
            'position' =>  'top-end', 
            'timer' =>  3000,  
            'toast' =>  true 
      ]);

      return redirect()->to("/spaces/space/$newSpace->spaceid");
    }
}
