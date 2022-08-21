<?php

namespace App\Http\Livewire\Pages;

use Livewire\Component;
use App\Traits\CustomWithPagination;

use Illuminate\Support\Facades\Auth;

use App\Models\Property;
use App\Models\Space;
use App\Models\User;

class Spaces extends Component
{
    use CustomWithPagination;

    public $pageName = 'spacess';
    public $perPage = 10;
    protected $paginationTheme = 'bootstrap';
    protected $spaces;
    public User $user;

    public function render()
    {
        $this->spaces = Space::select('*')
                            ->selectRaw('spaces.spaceid, users.firstname, users.lastname, users.othernames')
                            ->leftjoin('propertys', 'spaces.propertyid', '=', 'propertys.propertyid')
                            ->leftjoin('tenures', 'spaces.spaceid', 'tenures.spaceid')
                            ->leftjoin('users', 'tenures.userid', 'users.id')
                            ->paginate($this->perPage, ['*'], $this->pageName);

        $this->user = User::select('*')->where('id', Auth::user()->id)->first();

        return view('livewire.pages.spaces',
            [
                'spaces' => $this->spaces,
                'user' => $this->user
            ]
        );
    }
}
