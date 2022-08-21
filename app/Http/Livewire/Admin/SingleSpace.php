<?php

namespace App\Http\Livewire\Admin;

use Livewire\Component;
use App\Traits\CustomWithPagination;


// Models
use App\Models\User;
use App\Models\Property;
use App\Models\Space;
use App\Models\Rentalperiod;


class SingleSpace extends Component
{
    use CustomWithPagination;

    protected $space;
    protected $tenant;
    public $spaceid;

    public $activeTab = 'payments';

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

        return view('livewire.admin.single-space',
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
}
