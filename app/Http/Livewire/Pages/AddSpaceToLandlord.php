<?php

namespace App\Http\Livewire\Pages;


use Livewire\Component;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

use App\Models\User;
use App\Models\Property;
use App\Models\Space;
use App\Models\Tenure;
use Jantinnerezo\LivewireAlert\LivewireAlert;

class AddSpaceToLandlord extends Component
{
    use LivewireAlert;
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
    public Space $spaceCreated;

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
        return view('livewire.pages.add-space-to-landlord');
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
        $txn = DB::transaction(function () {
            $this->spaceCreated = Space::create([
                'spacename' => $this->spaceName,
                'propertyid' => $this->property,
                'occupied' => true,
                'tenantid' => 38, // System Tenant
                'rentprice' => $this->rentPrice,
                'rentalperiod' => $this->rentalPeriod,
                'initialpaymentfor' => $this->initialPayment,
                'latecharge' => $this->chargeLateFee,
                'latefee' => $this->lateFee,
                'graceperiod' => $this->gracePeriod,
                'balance' => 0,
                'readyfortenant' => true,
                'createdby' => Auth::user()->id    
            ]);
    
            $tenureCreated = Tenure::create([
                'spaceid' => $this->spaceCreated->spaceid,
                'userid' => $this->spaceCreated->tenantid,
                'spacetenurestatus' => 1,
                'startdate' => Carbon::now(),
                'updatedby' => $this->spaceCreated->createdby
            ]);
            return true;
        });

        if($txn)
        {
            $this->flash('success', 'Space Added' , [
                'position' =>  'top-end', 
                'timer' =>  3000,  
                'toast' =>  true 
          ]);
          $spaceid = $this->spaceCreated->spaceid;
          return redirect()->to("/spaces/space/$spaceid");
        }
        else{
            $this->flash('error', 'Action Failed' , [
                'position' =>  'top-end', 
                'timer' =>  3000,  
                'toast' =>  true 
          ]);
        }
        

        
    }
}
