<?php

namespace App\Http\Livewire\Admin;

use Livewire\Component;
use App\Traits\CustomWithPagination; //use Livewire\WithPagination;
//use App\Http\Livewire\Traits\WithPagination;


// External Includes
use App\Http\Controllers\Logic\BusinessLogic;
use App\Models\User;
use App\Models\Property;
use App\Models\Space;

class SingleLandlord extends Component
{
    use CustomWithPagination;

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

        // $this->propertysForLandlord = Property::select('*')
        //                                         ->where('userid', $this->landlord->id)
        //                                         ->leftjoin('districts', 'propertys.districtid', '=', 'districts.districtid')
        //                                         ->paginate($this->propertysPerPage, ['*'], 'properties');
        //$this->propertysForLandlord->setPageName('properties');
                                                
        $this->spacesForLandlord = Space::select('*')->where('propertys.userid', $this->landlord->id)
                                            ->leftjoin('propertys', 'spaces.propertyid', '=', 'propertys.propertyid')
                                            ->paginate($this->spacesPerPage, ['*'], $this->pageName);

        return view('livewire.admin.single-landlord',
            [
                'landlord' => $this->landlord,
                'propertysForLandlord' => $this->propertysForLandlord,
                'spacesForLandlord' => $this->spacesForLandlord,
                'message' => $this->queryString
            ]
        );
    }
}
