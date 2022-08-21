<?php

namespace App\Http\Livewire\Pages;

use Livewire\Component;
use App\Traits\CustomWithPagination;
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


class SingleSpace extends Component
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

    public $activeTab = 'payments';

    

    public function render()
    {
        // $this->tenant = RentalPeriod::selectRaw('rentalperiods.rentalperiodid, rentalperiods.spaceid, rentalperiods.startdate,
        //                                       rentalperiods.enddate, rentalperiods.status, rentalperiods.tenureid, tenures.userid,
        //                                       users.firstname, users.lastname, users.othernames, users.sex, users.phone, users.email')
        //                                ->where('rentalperiods.spaceid', $this->spaceid)
        //                               // ->where('rentalperiods.status', 1)       
        //                                ->leftjoin('tenures', 'rentalperiods.tenureid', '=', 'tenures.tenureid')
        //                                ->leftjoin('users', 'tenures.userid', '=', 'users.id')
        //                                ->first();
        $this->tenant = Space::selectRaw('users.firstname, users.lastname, users.othernames, users.sex, users.phone, users.email')
                                       ->where('spaces.spaceid', $this->spaceid)
                                      // ->where('rentalperiods.status', 1)
                                       ->leftjoin('users', 'id', '=', 'users.id')
                                       ->first();
        $this->space = Space::select('spaces.spaceid', 'spaces.spacename', 'spaces.propertyid', 'spaces.occupied', 'spaces.rentprice', 'spaces.rentalperiod',  
                                      'spaces.initialpaymentfor', 'spaces.latecharge', 'spaces.latefee', 'spaces.graceperiod', 'spaces.balance', 'spaces.readyfortenant',
                                      'spaces.createdby', 'propertys.propertyid', 'propertys.property')
                        ->where('spaces.spaceid', $this->spaceid)
                        ->leftjoin('propertys', 'spaces.propertyid', '=', 'propertys.propertyid')
                        ->first();

        return view('livewire.pages.single-space',
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
    public function chargeRent()
    {
        $space = Space::select('spaces.spaceid', 'spaces.spacename', 'spaces.propertyid', 'spaces.occupied', 'spaces.rentprice', 'spaces.rentalperiod',  
                                'spaces.initialpaymentfor', 'spaces.latecharge', 'spaces.latefee', 'spaces.graceperiod', 'spaces.balance', 'spaces.readyfortenant',
                                'spaces.createdby', 'propertys.propertyid', 'propertys.property')
                        ->where('spaces.spaceid', $this->spaceid)
                        ->leftjoin('propertys', 'spaces.propertyid', '=', 'propertys.propertyid')
                        ->first();
        // $tenant = RentalPeriod::selectRaw('rentalperiods.rentalperiodid, rentalperiods.spaceid, rentalperiods.startdate,
        //                                       rentalperiods.enddate, rentalperiods.status, rentalperiods.tenureid, tenures.userid,
        //                                       users.firstname, users.lastname, users.othernames, users.sex, users.phone, users.email')
        //                                ->where('rentalperiods.spaceid', $this->spaceid)
        //                                ->where('rentalperiods.status', 1)       
        //                                ->leftjoin('tenures', 'rentalperiods.tenureid', '=', 'tenures.tenureid')
        //                                ->leftjoin('users', 'tenures.userid', '=', 'users.id')
        //                                ->first();
        

        // $updateValues = Tenure::where('tenures.spacetenurestatus', null)->get();
        // foreach ($updateValues as $val) {
        //     $val->update(['spacetenurestatus' => true]);
        //     $val->save();
        // }
        // //$updateValues->save();
        $tenure = Tenure::select('*')
                            ->where('tenures.spaceid', $this->spaceid)
                            ->where('tenures.spacetenurestatus', 1)
                            ->first();
        
        $activeRentalPeriod = Rentalperiod::where('spaceid', $this->spaceid)
                                            ->where('status', 1)
                                            ->update([
                                                'status' => 0
                                            ]);
        $rentalPeriod = Rentalperiod::create([
            'spaceid' => $this->spaceid,
            'startdate' => Carbon::now(),
            'enddate' => Carbon::now(),
            'tenureid' => $tenure->tenureid,
            'status' => 1
        ]);
        $amount = $space->rentprice;
        $description = "Monthly Rent";
        $tenureid = $tenure->tenureid;
        $balance = $space->balance - $amount;
        


        $txn = Ledger::create([
                    'tenureid' => $tenureid,
                    'date' => Carbon::now(),
                    'transactiontypeid' => 1,
                    'rentalperiodid' => $rentalPeriod->rentalperiodid,
                    'description' => $description,
                    'debit' => $amount,
                    'balance' => $balance
                ]);

        $space->balance = $txn->balance;
        $space->save();
        
        $this->emitTo('tables.space-ledger','refreshComponent');
        $this->dispatchBrowserEvent('charged-tenant-success');
        $this->alert('success', 'Rent Charged' , [
            'position' =>  'top-end', 
            'timer' =>  3000,  
            'toast' =>  true 
      ]);
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
