<?php

namespace App\Http\Livewire\Admin\Tables;

use Livewire\Component;
use App\Traits\CustomWithPagination;

use App\Models\User;
use App\Models\Rentpayment;
use App\Models\Ledger;

class SpaceLedger extends Component
{
    use CustomWithPagination;
    public $pageName = 'ledger';
    protected $paginationTheme = 'bootstrap';
    public $perPage = 10;
    protected $txns;
    public $space;

    public function render()
    {
        $this->txns = Ledger::select('ledgerid', 'ledger.tenureid', 'ledger.date', 'ledger.rentalperiodid',
                                      'ledger.transactiontypeid', 'ledger.debit', 'ledger.credit', 'ledger.balance',
                                      'rentalperiods.startdate', 'rentalperiods.enddate', 'transactiontypes.transactiontype')
                             ->where('tenures.spaceid', $this->space->spaceid)
                             ->orderBy('ledger.date', 'desc')
                             ->leftjoin('rentalperiods', 'ledger.rentalperiodid', '=', 'rentalperiods.rentalperiodid')
                             ->leftjoin('transactiontypes', 'ledger.transactiontypeid', '=', 'transactiontypes.transactiontypeid')
                             ->leftjoin('tenures', 'ledger.tenureid', '=', 'tenures.tenureid')
                             ->paginate($this->perPage, ['*'], $this->pageName);
        return view('livewire.admin.tables.space-ledger', 
            [
                'txns' => $this->txns
            ]
        );
    }

    public function mount()
    {
        
    }                   
}
