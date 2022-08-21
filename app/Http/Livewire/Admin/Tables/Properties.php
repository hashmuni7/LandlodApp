<?php

namespace App\Http\Livewire\Admin\Tables;

use Livewire\Component;
use App\Traits\CustomWithPagination;

use App\Models\Property;

class Properties extends Component
{
    use CustomWithPagination;

    public $pageName = 'properties';
    public $perPage = 10;
    protected $paginationTheme = 'bootstrap';
    protected $propertys;
    
    
    public function render()
    {
        $this->propertys = Property::select('*')
                                    //->where('userid', $this->landlord->id)
                                    ->leftjoin('districts', 'propertys.districtid', '=', 'districts.districtid')
                                    ->leftjoin('users', 'propertys.userid', '=', 'users.id')
                                    ->paginate($this->perPage, ['*'], $this->pageName);
        return view('livewire.admin.tables.properties',
            [
                'propertys' => $this->propertys
            ]
        );
    }
}
