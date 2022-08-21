<?php

namespace App\Http\Livewire\Admin\Tables;

use Livewire\Component;
use App\Traits\CustomWithPagination;

use App\Models\User;
use App\Models\Rentpayment;

class PaymentsToSpace extends Component
{
    use CustomWithPagination;
    public $pageName = 'spacepayments';
    protected $paginationTheme = 'bootstrap';
    //public $tenant;
    public $perPage = 10;
    protected $spacePayments;
    public $space;
    
    public function render()
    {
        return view('livewire.admin.tables.payments-to-space', 
        [
            'spacePayments' => $this->spacePayments
        ]);
    }

    public function mount()
    {
        $this->spacePayments = Rentpayment::select('rentpaymenttxnid', 'amount', 'rentpayments.spaceid', 'status', 'date',
                                      'description', 'rentpayments.inchannelid', 'inchanneltxnid', 'inchannels.inchannel',
                                      'receiptno', 'channelinfo', 'spaces.spacename', 'propertys.property')
                                ->where('rentpayments.spaceid', $this->space->spaceid)
                                ->leftjoin('inchannels', 'rentpayments.inchannelid', '=', 'inchannels.inchannelid')
                                ->leftjoin('spaces', 'rentpayments.spaceid', '=', 'spaces.spaceid')
                                ->leftjoin('propertys', 'spaces.propertyid', '=', 'propertys.propertyid')
                                ->paginate($this->perPage, ['*'], $this->pageName);
    }
}
