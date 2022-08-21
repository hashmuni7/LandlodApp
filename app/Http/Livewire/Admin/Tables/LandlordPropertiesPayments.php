<?php

namespace App\Http\Livewire\Admin\Tables;

use Livewire\Component;
use App\Traits\CustomWithPagination;

use App\Models\User;
use App\Models\Rentpayment;

class LandlordPropertiesPayments extends Component
{
    use CustomWithPagination;
    public $pageName = 'rentpayments';
    public $landlord;
    public $perPage = 3;
    protected $landlordPropertiesPayments;
    protected $paginationTheme = 'bootstrap';

    public function render()
    {
        $this->landlordPropertiesPayments = Rentpayment::select('rentpaymenttxnid', 'amount', 'rentpayments.spaceid', 'status', 'date',
                                      'description', 'rentpayments.inchannelid', 'inchanneltxnid', 'inchannels.inchannel',
                                      'receiptno', 'channelinfo', 'spaces.spacename', 'propertys.property')
                                ->where('propertys.userid', $this->landlord->id)
                                ->leftjoin('inchannels', 'rentpayments.inchannelid', '=', 'inchannels.inchannelid')
                                ->leftjoin('spaces', 'rentpayments.spaceid', '=', 'spaces.spaceid')
                                ->leftjoin('propertys', 'spaces.propertyid', '=', 'propertys.propertyid')
                                ->paginate($this->perPage, ['*'], $this->pageName);
        return view(
            'livewire.admin.tables.landlord-properties-payments',
            [
                'landlordPropertiesPayments' => $this->landlordPropertiesPayments
            ]
        );
    }

    // public function mount($landlord)
    // {
    //     //$this->landlord = $landlord;
    //     $this->getPayments();
    // }

    // public function getPayments()
    // {
    //     $payments = 

    //     $this->landlordPropertiesPayments = $payments;
    // }
}
