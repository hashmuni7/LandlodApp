<?php

namespace App\Http\Livewire\Admin\Tables;

use Livewire\Component;
use App\Traits\CustomWithPagination;

use App\Models\User;
use App\Models\Rentpayment;

class PropertyPayments extends Component
{
    use CustomWithPagination;
    public $pageName = 'rentpayments';
    public $property;
    public $perPage = 10;
    protected $rentPayments;
    protected $paginationTheme = 'bootstrap';

    public function render()
    {
        return view('livewire.admin.tables.property-payments', 
        [
            'rentPayments' => $this->rentPayments
        ]);
    }

    public function mount()
    {
        $this->rentPayments = Rentpayment::select('rentpaymenttxnid', 'amount', 'rentpayments.spaceid', 'status', 'date',
                                      'description', 'rentpayments.inchannelid', 'inchanneltxnid', 'inchannels.inchannel',
                                      'receiptno', 'channelinfo', 'spaces.spacename', 'propertys.property')
                                ->where('propertys.propertyid', $this->property->propertyid)
                                ->leftjoin('inchannels', 'rentpayments.inchannelid', '=', 'inchannels.inchannelid')
                                ->leftjoin('spaces', 'rentpayments.spaceid', '=', 'spaces.spaceid')
                                ->leftjoin('propertys', 'spaces.propertyid', '=', 'propertys.propertyid')
                                ->paginate($this->perPage, ['*'], $this->pageName);
    }
}
