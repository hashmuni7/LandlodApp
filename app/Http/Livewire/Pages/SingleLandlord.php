<?php

namespace App\Http\Livewire\Pages;

use Livewire\Component;
use App\Traits\CustomWithPagination; 
use App\Traits\Figures;


// External Includes
use App\Http\Controllers\Logic\BusinessLogic;
use App\Models\User;
use App\Models\Property;
use App\Models\Space;

class SingleLandlord extends Component
{
    use CustomWithPagination;
    use Figures;

    public $pageName = 'spaces';
    public $landlordid;
    public $landlord;
    protected $propertysForLandlord;
    protected $spacesForLandlord;
    public $spacesPerPage = 10;
    public $searchSpacesOfLandlord = '';
    public $propertysPerPage = 4;
    protected $paginationTheme = 'bootstrap';
    //public $spaces = 2;

    public $activeTab = 'payments';
    public $outstandingBalance;
    

    public function mount($landlordid)
    {
        $this->landlordid = $landlordid;
        
        
    }

    public function activateTab($activeTab)
    {
        $this->activeTab = $activeTab;
    }


    public function render()
    {
        $this->landlord = User::select('id', 'firstname', 'lastname', 'sex', 'phone', 'email')
                                ->where('id', $this->landlordid)
                                ->first();

        $this->outstandingBalance = Space::selectRaw('sum(balance) as bal')
                                            ->where('propertys.userid', $this->landlordid)
                                            ->leftjoin('propertys', 'spaces.propertyid', 'propertys.propertyid')
                                            ->groupBy('propertys.userid')
                                            ->first();

        

        // $this->propertysForLandlord = Property::select('*')
        //                                         ->where('userid', $this->landlord->id)
        //                                         ->leftjoin('districts', 'propertys.districtid', '=', 'districts.districtid')
        //                                         ->paginate($this->propertysPerPage, ['*'], 'properties');
        //$this->propertysForLandlord->setPageName('properties');
                                                
        // $this->spacesForLandlord = Space::select('*')->where('propertys.userid', $this->landlord->id)
        //                                     ->leftjoin('propertys', 'spaces.propertyid', '=', 'propertys.propertyid')
        //                                     ->paginate($this->spacesPerPage, ['*'], $this->pageName);

        return view('livewire.pages.single-landlord',
            [
                'landlord' => $this->landlord,
                'outstandingBalance' => $this->outstandingBalance
            ]
        );
    }
}
