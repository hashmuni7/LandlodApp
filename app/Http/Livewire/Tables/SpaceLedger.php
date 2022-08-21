<?php

namespace App\Http\Livewire\Tables;

use Rappasoft\LaravelLivewireTables\DataTableComponent;
use Rappasoft\LaravelLivewireTables\Views\Column;
use App\Models\Ledger;
use App\Traits\Figures;

use App\Models\User;
use App\Models\RentPayment;
use App\Models\Space;
use App\Models\Property;
use Illuminate\Database\Eloquent\Builder;

class SpaceLedger extends DataTableComponent
{
    use Figures;
    public Space $space;
    protected $listeners = ['refreshComponent' => '$refresh'];
    protected $model = Ledger::class;

    public function configure(): void
    {
        $this->setPrimaryKey('id');
    }

    public function mount(Space $space)
    {
        $this->space = $space;
    } 

    public function columns(): array
    {
        return [
            Column::make('Date', 'date')
                    ->format(function($value){
                        return $value ? $value->format('D, d M Y H:i:s') : $value;
                    }),
            Column::make('Description', 'transactiontypeid')
                        ->format(function($value, $column, $row){
                            if($value == 1){
                                return $column->transactiontype . " ($column->startdate - $column->enddate)";
                            }
                            else{
                                return $column->transactiontype;
                            }
                            
                        }), 
            Column::make('Debit', 'debit')
                    ->format(function($value){
                        return $this->ugx($value);
                    }),
            Column::make('Credit', 'credit')
                    ->format(function($value){
                        return $this->ugx($value);
                    }),
            Column::make('Balance', 'balance')
                    ->format(function($value){
                        return $this->ugx($value);
                    })

        ];
    }

    public function builder(): Builder
    {
        $query = Ledger::query()
        ->select('ledgerid', 'ledger.tenureid', 'ledger.date', 'ledger.rentalperiodid',
                                      'ledger.transactiontypeid', 'ledger.debit', 'ledger.credit', 'ledger.balance',
                                      'rentalperiods.startdate', 'rentalperiods.enddate', 'transactiontypes.transactiontype')
        ->where('tenures.spaceid', $this->space->spaceid)
        ->orderBy('ledger.date', 'desc')
        ->leftjoin('rentalperiods', 'ledger.rentalperiodid', '=', 'rentalperiods.rentalperiodid')
        ->leftjoin('transactiontypes', 'ledger.transactiontypeid', '=', 'transactiontypes.transactiontypeid')
        ->leftjoin('tenures', 'ledger.tenureid', '=', 'tenures.tenureid');
       
       // ->when($this->getFilter('startdate'), fn ($query, $startdate) => $query->where('date', '>=', $startdate))
       // ->when($this->getFilter('enddate'), fn ($query, $enddate) => $query->where('date', '<=', $enddate));

        return $query;

    }

    
}
