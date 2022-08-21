<?php

namespace App\Http\Livewire\Tables;

use Livewire\Component;
use App\Traits\CustomWithPagination;

use App\Models\User;
use App\Models\Rentpayment;

class Payments extends Component
{
    use CustomWithPagination;
    public $pageName = 'paymentss';
    protected $paginationTheme = 'bootstrap';
    //public $tenant;
    public $perPage = 10;
    protected $payments;
    

    public function render()
    {
        return view('livewire.tables.payments',
            [
                'payments' => $this->payments
            ]
        );
    }

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
    }
}
