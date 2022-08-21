<?php

namespace App\Http\Livewire\Pages;

use Livewire\Component;
use App\Traits\CustomWithPagination;
use Illuminate\Support\Facades\Auth;

use App\Models\Property;
use App\Models\User;

class Properties extends Component
{
    use CustomWithPagination;

    public $pageName = 'properties';
    public $perPage = 10;
    protected $paginationTheme = 'bootstrap';
    protected $propertys;
    public User $user;
    
    
    public function render()
    {
        $this->propertys = Property::select('*')
                                    //->where('userid', $this->landlord->id)
                                    ->leftjoin('districts', 'propertys.districtid', '=', 'districts.districtid')
                                    ->leftjoin('users', 'propertys.userid', '=', 'users.id')
                                    ->paginate($this->perPage, ['*'], $this->pageName);
        $this->user = User::select('*')->where('id', Auth::user()->id)->first();
        return view('livewire.pages.properties',
            [
                'propertys' => $this->propertys,
                'user' => $this->user
            ]
        );
    }
}
