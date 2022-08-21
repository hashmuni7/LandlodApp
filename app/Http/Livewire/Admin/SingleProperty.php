<?php

namespace App\Http\Livewire\Admin;

use Livewire\Component;
use App\Models\Property;

class SingleProperty extends Component
{
    public $property;
    public $propertyid;
    public $activeTab = 'payments';

    public function activateTab($activeTab)
    {
        $this->activeTab = $activeTab;
    }

    public function render()
    {
        $this->property = Property::select('*')
                                     ->where('propertyid', $this->propertyid)
                                     ->leftjoin('districts', 'propertys.districtid', '=', 'districts.districtid')
                                     ->leftjoin('users', 'propertys.userid', '=', 'users.id')
                                     ->first();
        return view('livewire.admin.single-property');
    }

    public function mount($propertyid)
    {
        $this->propertyid = $propertyid;
    }
}
