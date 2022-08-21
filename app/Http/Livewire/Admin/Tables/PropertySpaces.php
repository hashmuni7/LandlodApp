<?php

namespace App\Http\Livewire\Admin\Tables;

use Livewire\Component;
use App\Traits\CustomWithPagination;

use App\Models\User;
use App\Models\Rentpayment;
use App\Models\Space;

class PropertySpaces extends Component
{
    use CustomWithPagination;
    public $pageName = 'propertyspaces';
    public $property;
    public $perPage = 10;
    protected $paginationTheme = 'bootstrap';
    protected $spaces;

    public function render()
    {
        $this->spaces = Space::select('*')->where('propertys.propertyid', $this->property->propertyid)
                                            ->leftjoin('propertys', 'spaces.propertyid', '=', 'propertys.propertyid')
                                            ->paginate($this->perPage, ['*'], $this->pageName);
        return view('livewire.admin.tables.property-spaces', 
        [
            'spaces' => $this->spaces
        ]);
    }

    public function mount()
    {
        
    }
}
