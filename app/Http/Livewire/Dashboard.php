<?php

namespace App\Http\Livewire;

use App\Models\Property;
use Livewire\Component;
use App\Traits\CustomWithPagination;
use Illuminate\Support\Facades\Auth;


use App\Models\User;
use App\Models\Rentpayment;
use App\Models\Space;

use Carbon\Carbon;

class Dashboard extends Component
{
    use CustomWithPagination;
    public $pageName = 'paymentss';
    protected $paginationTheme = 'bootstrap';
    //public $tenant;
    public $perPage = 10;
    protected $payments;
    public User $user;
    public $propertys;
    public $landlords;
    public $spaces;
    public $time;
    
    public function mount()
    {
        $this->payments = Rentpayment::select('rentpaymenttxnid', 'amount', 'rentpayments.spaceid', 'status', 'date',
                                      'description', 'rentpayments.inchannelid', 'inchanneltxnid', 'inchannels.inchannel',
                                      'receiptno', 'channelinfo', 'spaces.spacename', 'propertys.property')                                
                                ->leftjoin('inchannels', 'rentpayments.inchannelid', '=', 'inchannels.inchannelid')
                                ->leftjoin('spaces', 'rentpayments.spaceid', '=', 'spaces.spaceid')
                                ->leftjoin('propertys', 'spaces.propertyid', '=', 'propertys.propertyid')
                                ->orderBy('date', 'desc')
                                ->paginate($this->perPage, ['*'], $this->pageName);
        $this->user = User::select('*')->where('id', Auth::user()->id)->first();

        $this->propertys = Property::all()->count();
        $this->spaces = Space::all()->count();
        $this->landlords = User::select('*')->where('usercategoryid', 200)->count();
        $this->time = Carbon::now();
                                
    }
    
    public function render()
    {
        return view('livewire.dashboard',
        [
            'payments' => $this->payments,
            'user' => $this->user

        ]
    );
    }
}
