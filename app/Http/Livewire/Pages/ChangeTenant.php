<?php

namespace App\Http\Livewire\Pages;

use Livewire\Component;
use App\Traits\CustomWithPagination;

use App\Http\Controllers\Logic\Transactions;
use Jantinnerezo\LivewireAlert\LivewireAlert;


// Models
use App\Models\User;
use App\Models\Property;
use App\Models\Space;
use App\Models\Rentalperiod;
use App\Models\Ledger;
use App\Models\Tenure;
use App\Models\Transactiontype;
use Carbon\Carbon;
use App\Traits\Figures;


class ChangeTenant extends Component
{
    use LivewireAlert;
    use CustomWithPagination;
    use Figures;
    protected $space;
    protected $tenant;
    public $spaceid;
    public $bbb = 'first';

    public $chargeTenantAmount;
    public $chargeTenantDescription = '';

    public $settleTenantAmount;
    public $settleTenantDescription = '';

    public $refundTenantAmount;
    public $refundTenantDescription = '';

    public $ledgerAmount;
    public $ledgerDescription = '';
    public $transactionTypeID = 2;

    public $activeTab = 'ledgers';
    protected $listeners = ['refreshComponent' => '$refresh'];
    

    public function render()
    {
        $this->tenant = RentalPeriod::selectRaw('rentalperiods.rentalperiodid, rentalperiods.spaceid, rentalperiods.startdate,
                                              rentalperiods.enddate, rentalperiods.status, rentalperiods.tenureid, tenures.userid,
                                              users.firstname, users.lastname, users.othernames, users.sex, users.phone, users.email')
                                       ->where('rentalperiods.spaceid', $this->spaceid)
                                       ->where('rentalperiods.status', 1)       
                                       ->leftjoin('tenures', 'rentalperiods.tenureid', '=', 'tenures.tenureid')
                                       ->leftjoin('users', 'tenures.userid', '=', 'users.id')
                                       ->first();

        $this->space = Space::select('spaces.spaceid', 'spaces.spacename', 'spaces.propertyid', 'spaces.occupied', 'spaces.rentprice', 'spaces.rentalperiod',  
                                      'spaces.initialpaymentfor', 'spaces.latecharge', 'spaces.latefee', 'spaces.graceperiod', 'spaces.balance', 'spaces.readyfortenant',
                                      'spaces.createdby', 'propertys.propertyid', 'propertys.property')
                        ->where('spaces.spaceid', $this->spaceid)
                        ->leftjoin('propertys', 'spaces.propertyid', '=', 'propertys.propertyid')
                        ->first();

        return view('livewire.pages.change-tenant',
            [
                'tenant' => $this->tenant,
                'space' => $this->space
            ]
        );
    }

    public function mount($spaceid)
    {
        $this->spaceid = $spaceid;
        

    }

    public function activateTab($activeTab)
    {
        $this->activeTab = $activeTab;
        
    }

    public function postInLedger()
    {
        $makeTransaction = (new Transactions)
                            ->postLedger
                            (
                                $this->spaceid, 
                                $this->transactionTypeID, 
                                Carbon::now(), 
                                $this->ledgerDescription, 
                                $this->ledgerAmount
                            );
        $this->emit('refreshComponent');                
        $this->emitTo('tables.space-ledger','refreshComponent');                   
        $this->dispatchBrowserEvent('charged-tenant-success');

        if($makeTransaction['status'])
        {

            $this->alert('success', $makeTransaction['msg'] , [
                'position' =>  'top-end', 
                'timer' =>  3000,  
                'toast' =>  true 
          ]);
        }
        else
        {
            $this->alert('error', $makeTransaction['msg'] , [
                'position' =>  'top-end', 
                'timer' =>  3000,  
                'toast' =>  true 
          ]);
        }
    }

    public function getTransactionTypeID($ID)
    {
        $this->transactionTypeID = $ID;
    }

    

    public function chargeTenant()
    {
        $space = Space::select('spaces.spaceid', 'spaces.spacename', 'spaces.propertyid', 'spaces.occupied', 'spaces.rentprice', 'spaces.rentalperiod',  
                                'spaces.initialpaymentfor', 'spaces.latecharge', 'spaces.latefee', 'spaces.graceperiod', 'spaces.balance', 'spaces.readyfortenant',
                                'spaces.createdby', 'propertys.propertyid', 'propertys.property')
                        ->where('spaces.spaceid', $this->spaceid)
                        ->leftjoin('propertys', 'spaces.propertyid', '=', 'propertys.propertyid')
                        ->first();
        $tenant = RentalPeriod::selectRaw('rentalperiods.rentalperiodid, rentalperiods.spaceid, rentalperiods.startdate,
                                              rentalperiods.enddate, rentalperiods.status, rentalperiods.tenureid, tenures.userid,
                                              users.firstname, users.lastname, users.othernames, users.sex, users.phone, users.email')
                                       ->where('rentalperiods.spaceid', $this->spaceid)
                                       ->where('rentalperiods.status', 1)       
                                       ->leftjoin('tenures', 'rentalperiods.tenureid', '=', 'tenures.tenureid')
                                       ->leftjoin('users', 'tenures.userid', '=', 'users.id')
                                       ->first();
        $amount = $this->chargeTenantAmount;
        $description = $this->chargeTenantDescription;
        $tenureid = $tenant->tenureid;
        $balance = $space->balance - $amount;
        


        $txn = Ledger::create([
                    'tenureid' => $tenureid,
                    'date' => Carbon::now(),
                    'transactiontypeid' => 3,
                    'description' => $description,
                    'debit' => $amount,
                    'balance' => $balance
                ]);

        $space->balance = $txn->balance;
        $space->save();
        
        $this->emitTo('tables.space-ledger','refreshComponent');
        $this->dispatchBrowserEvent('charged-tenant-success');
        $this->alert('success', 'Tenant Charged' , [
            'position' =>  'top-end', 
            'timer' =>  3000,  
            'toast' =>  true 
      ]);
    }

    public function settleTenant()
    {
        $space = Space::select('spaces.spaceid', 'spaces.spacename', 'spaces.propertyid', 'spaces.occupied', 'spaces.rentprice', 'spaces.rentalperiod',  
                                'spaces.initialpaymentfor', 'spaces.latecharge', 'spaces.latefee', 'spaces.graceperiod', 'spaces.balance', 'spaces.readyfortenant',
                                'spaces.createdby', 'propertys.propertyid', 'propertys.property')
                        ->where('spaces.spaceid', $this->spaceid)
                        ->leftjoin('propertys', 'spaces.propertyid', '=', 'propertys.propertyid')
                        ->first();
        $tenant = RentalPeriod::selectRaw('rentalperiods.rentalperiodid, rentalperiods.spaceid, rentalperiods.startdate,
                                              rentalperiods.enddate, rentalperiods.status, rentalperiods.tenureid, tenures.userid,
                                              users.firstname, users.lastname, users.othernames, users.sex, users.phone, users.email')
                                       ->where('rentalperiods.spaceid', $this->spaceid)
                                       ->where('rentalperiods.status', 1)       
                                       ->leftjoin('tenures', 'rentalperiods.tenureid', '=', 'tenures.tenureid')
                                       ->leftjoin('users', 'tenures.userid', '=', 'users.id')
                                       ->first();
        $amount = $this->settleTenantAmount;
        $description = $this->settleTenantDescription;
        $tenureid = $tenant->tenureid;
        $balance = $space->balance + $amount;
        


        $txn = Ledger::create([
                    'tenureid' => $tenureid,
                    'date' => Carbon::now(),
                    'transactiontypeid' => 6,
                    'description' => $description,
                    'credit' => $amount,
                    'balance' => $balance
                ]);

        $space->balance = $txn->balance;
        $space->save();
        
        $this->emitTo('tables.space-ledger','refreshComponent');
        $this->dispatchBrowserEvent('charged-tenant-success');
        $this->alert('success', 'Tenant Settled' , [
            'position' =>  'top-end', 
            'timer' =>  3000,  
            'toast' =>  true 
      ]);
    }

    public function refundTenant()
    {
        $space = Space::select('spaces.spaceid', 'spaces.spacename', 'spaces.propertyid', 'spaces.occupied', 'spaces.rentprice', 'spaces.rentalperiod',  
                                'spaces.initialpaymentfor', 'spaces.latecharge', 'spaces.latefee', 'spaces.graceperiod', 'spaces.balance', 'spaces.readyfortenant',
                                'spaces.createdby', 'propertys.propertyid', 'propertys.property')
                        ->where('spaces.spaceid', $this->spaceid)
                        ->leftjoin('propertys', 'spaces.propertyid', '=', 'propertys.propertyid')
                        ->first();
        $tenant = RentalPeriod::selectRaw('rentalperiods.rentalperiodid, rentalperiods.spaceid, rentalperiods.startdate,
                                              rentalperiods.enddate, rentalperiods.status, rentalperiods.tenureid, tenures.userid,
                                              users.firstname, users.lastname, users.othernames, users.sex, users.phone, users.email')
                                       ->where('rentalperiods.spaceid', $this->spaceid)
                                       ->where('rentalperiods.status', 1)       
                                       ->leftjoin('tenures', 'rentalperiods.tenureid', '=', 'tenures.tenureid')
                                       ->leftjoin('users', 'tenures.userid', '=', 'users.id')
                                       ->first();
        $amount = $this->refundTenantAmount;
        $description = $this->refundTenantDescription;
        $tenureid = $tenant->tenureid;
        $balance = $space->balance - $amount;
        


        $txn = Ledger::create([
                    'tenureid' => $tenureid,
                    'date' => Carbon::now(),
                    'transactiontypeid' => 5,
                    'description' => $description,
                    'debit' => $amount,
                    'balance' => $balance
                ]);

        $space->balance = $txn->balance;
        $space->save();
        
        $this->emitTo('tables.space-ledger','refreshComponent');
        $this->dispatchBrowserEvent('charged-tenant-success');
        $this->alert('success', 'Tenant Settled' , [
            'position' =>  'top-end', 
            'timer' =>  3000,  
            'toast' =>  true 
      ]);
    }
}
