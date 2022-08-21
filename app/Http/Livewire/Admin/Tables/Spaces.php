<?php

namespace App\Http\Livewire\Admin\Tables;

use Livewire\Component;
use App\Traits\CustomWithPagination;

use App\Models\Property;
use App\Models\Space;

class Spaces extends Component
{
    use CustomWithPagination;

    public $pageName = 'spacess';
    public $perPage = 10;
    protected $paginationTheme = 'bootstrap';
    protected $spaces;

    public function render()
    {
        $this->spaces = Space::select('*')
                            ->selectRaw('spaces.spaceid, users.firstname, users.lastname, users.othernames')
                            ->leftjoin('propertys', 'spaces.propertyid', '=', 'propertys.propertyid')
                            ->leftjoin('tenures', 'spaces.spaceid', 'tenures.spaceid')
                            ->leftjoin('users', 'tenures.userid', 'users.id')
                            ->paginate($this->perPage, ['*'], $this->pageName);

        return view('livewire.admin.tables.spaces',
            [
                'spaces' => $this->spaces
            ]
        );
    }
}
