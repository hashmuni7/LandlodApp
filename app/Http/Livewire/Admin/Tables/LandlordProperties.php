<?php

namespace App\Http\Livewire\Admin\Tables;

use Livewire\Component;
use App\Traits\CustomWithPagination; //use Livewire\WithPagination;

use App\Models\Property;

class LandlordProperties extends Component
{
    use CustomWithPagination;

    public $pageName = 'properties';
    protected $propertysForLandlord;
    public $landlord;
    public $propertysPerPage = 2;
    protected $paginationTheme = 'bootstrap';

    

    public function render()
    {
        $this->propertysForLandlord = Property::select('*')
                                                ->where('userid', $this->landlord->id)
                                                ->leftjoin('districts', 'propertys.districtid', '=', 'districts.districtid')
                                                ->paginate($this->propertysPerPage, ['*'], $this->pageName);
        return view('livewire.admin.tables.landlord-properties',
            [
                'propertysForLandlord' => $this->propertysForLandlord,
            ]
        );
    }
}
