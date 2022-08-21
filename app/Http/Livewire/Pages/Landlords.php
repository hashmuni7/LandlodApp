<?php

namespace App\Http\Livewire\Pages;

use Livewire\Component;
use Livewire\WithPagination;


// External Includes
use App\Http\Controllers\Logic\BusinessLogic;
use App\Models\User;


class Landlords extends Component
{
    use WithPagination;

    protected $logic;
    protected $landlords;
    public $search = '';
    public $sortField = 'id';
    public $sortDirection = 'asc';
    public $result = "landlords";
    public $perPage = 10;
    protected $paginationTheme = 'bootstrap';
    

    public function mount()
    {
        
    }

    public function sortField($sortField)
    {
        
        if($this->sortField === $sortField)
        {
            $this->sortDirection = $this->sortDirection === 'asc' ? 'desc' : 'asc';

        }else
        {
            $this->sortDirection = 'asc';
        }
        $this->sortField = $sortField;

        
    }

    public function updatingSearch()
    {
        $this->resetPage();
    }

    public function render()
    {
        $this->landlords = User::where('lastname', 'LIKE', "%$this->search%")
        ->where('usercategoryid', 200)
        //->orWhere('lastname', 'LIKE', "%$this->search%")
        ->orderBy($this->sortField, $this->sortDirection)
        //->take(10);
        ->paginate($this->perPage);
        
        return view('livewire.pages.landlords', ['landlords' => $this->landlords]);
    }
}
