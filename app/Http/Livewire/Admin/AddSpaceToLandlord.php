<?php

namespace App\Http\Livewire\Admin;

use Livewire\Component;

use App\Models\User;
use App\Models\Property;
use App\Models\Space;
use Jantinnerezo\LivewireAlert\LivewireAlert;
class AddSpaceToLandlord extends Component
{
    // Attributes
    public $landlord;

    public $landlordid;
    public $property;
    public $spaceName;
    public $rentPrice;
    public $rentalPeriod;
    public $initialPayment;
    public $chargeLateFee = false;
    public $lateFee;
    public $gracePeriod;

    public $propertys;

    // Validation Rules
    protected $rules = [
        'property' => 'required',
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
        return view('livewire.admin.add-space-to-landlord');
    }

    public function mount($landlordid)
    {
        $this->landlordid = $landlordid;

        $this->landlord = User::select('*')->where('id', $this->landlordid)->first();
        $this->propertys = Property::select('*')
                                    ->where('userid', $this->landlord->id)                                    
                                    ->get();

    }

    public function addSpace()
    {
        $this->validate();

        Space::create([
            'spacename' => $this->spaceName,
            'propertyid' => $this->property,
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

      return redirect()->to("/landlords/$this->landlordid");
    }
}
