<?php

namespace App\Http\Livewire\Tables;

use Rappasoft\LaravelLivewireTables\DataTableComponent;
use Rappasoft\LaravelLivewireTables\Views\Column;
use App\Models\Rentpayment;

use App\Traits\Figures;

use App\Models\User;
use App\Models\Space;
use App\Models\Property;
use Illuminate\Database\Eloquent\Builder;

class PaymentsToSpace extends DataTableComponent
{
    use Figures;
    //protected $model = Rentpayment::class;
    public Space $space;

    public function configure(): void
    {
        $this->setPrimaryKey('id');
    }

    public function columns(): array
    {
        return [
            Column::make('Status', 'status')
                    ->format(function($value, $column, $row) {
                        return  view('livewire.components.tables.badgeaction', 
                        ['value' => $value]
                    );
                    }),
            Column::make('Date', 'date')
                    ->format(function($value){
                        return $value ? $value->format('D, d M Y H:i:s') : $value;
                    }),
            Column::make('Space Code', 'spaceid'),    
            Column::make('Amount', 'amount')
                    ->format(function($value){
                        return $this->ugx($value);
                    }),
            Column::make('Receipt No', 'rentpaymenttxnid'),
            Column::make('Property', 'rentpaymenttxnid')
                ->format(function($value, $column, $row) {
                            return  $column->property; // get the name of property
                        }),
            Column::make('Channel', 'rentpaymenttxnid')
                ->format(function($value, $column, $row) {
                    return  $column->inchannel; // get the name of inchannel
                }),
            Column::make('Channel Txn ID', 'rentpaymenttxnid')
                ->format(function($value, $column, $row) {
                    return  $column->inchanneltxnid; // get the name of inchanneltxnid
                }),
            Column::make('Channel Memo', 'rentpaymenttxnid')
                ->format(function($value, $column, $row) {
                    return  $column->channelinfo; // get the name of channelinfo
                }),
            // Column::make("Rentpaymenttxnid", "rentpaymenttxnid")
            //     ->sortable(),
            // Column::make("Amount", "amount")
            //     ->sortable(),
            // Column::make("Spaceid", "spaceid")
            //     ->sortable(),
            // Column::make("Status", "status")
            //     ->sortable(),
            // Column::make("Date", "date")
            //     ->sortable(),
            // Column::make("Description", "description")
            //     ->sortable(),
            // Column::make("Inchannelid", "inchannelid")
            //     ->sortable(),
            // Column::make("Inchanneltxnid", "inchanneltxnid")
            //     ->sortable(),
            // Column::make("Receiptno", "receiptno")
            //     ->sortable(),
            // Column::make("Channelinfo", "channelinfo")
            //     ->sortable(),
            // Column::make("Channeltxncharges", "channeltxncharges")
            //     ->sortable(),
            // Column::make("Created at", "created_at")
            //     ->sortable(),
            // Column::make("Updated at", "updated_at")
            //     ->sortable(),
        ];
    }

    public function builder(): Builder
    {
        $query = Rentpayment::query()
        ->select('rentpaymenttxnid', 'amount', 'rentpayments.spaceid', 'status', 'date',
                              'description', 'rentpayments.inchannelid', 'inchanneltxnid', 'inchannels.inchannel',
                              'receiptno', 'channelinfo', 'spaces.spacename', 'propertys.property')
        ->where('spaces.spaceid', $this->space->spaceid)
        ->leftjoin('inchannels', 'rentpayments.inchannelid', '=', 'inchannels.inchannelid')
        ->leftjoin('spaces', 'rentpayments.spaceid', '=', 'spaces.spaceid')
        ->leftjoin('propertys', 'spaces.propertyid', '=', 'propertys.propertyid')
        ->orderby('date', 'desc');
       
       // ->when($this->getFilter('startdate'), fn ($query, $startdate) => $query->where('date', '>=', $startdate))
       // ->when($this->getFilter('enddate'), fn ($query, $enddate) => $query->where('date', '<=', $enddate));

        // if($this->hasFilter('spaceid')) 
        // {
            
        //     $query->where('spaces.spaceid', $this->getFilter('spaceid'));
        // }
        
        return $query;

    }

    public function setTableDataClass(Column $column, $row): ?string
    {
        return 'actions-hover';
    }

    public function mount(Space $space)
    {
        $this->space = $space;
    }
}
