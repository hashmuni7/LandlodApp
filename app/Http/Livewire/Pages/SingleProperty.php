<?php

namespace App\Http\Livewire\Pages;

use Livewire\Component;
use App\Models\Property;
use App\Models\Space;
use App\Traits\Figures;

class SingleProperty extends Component
{
    use Figures;
    public $property;
    public $propertyid;
    public $activeTab = 'payments';
    public $balance = 0;

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

        $query = Space::selectRaw("sum(balance) as bal")
                        ->where('spaces.propertyid', $this->propertyid)
                        ->first();

        
        $this->balance = $query;

        return view('livewire.pages.single-property');
    }

    public function mount($propertyid)
    {
        $this->propertyid = $propertyid;
    }
}
