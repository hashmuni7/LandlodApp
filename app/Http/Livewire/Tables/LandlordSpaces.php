<?php

namespace App\Http\Livewire\Tables;

use Rappasoft\LaravelLivewireTables\DataTableComponent;
use Rappasoft\LaravelLivewireTables\Views\Column;
use App\Models\Space;
use Illuminate\Database\Eloquent\Builder;
use App\Traits\Figures;

class LandlordSpaces extends DataTableComponent
{
    use Figures;
    //protected $model = Space::class;
    public array $spacesToFetch = array(
        0 => 'for the owner to view',
        1 => 'for a specific landlord',
        2 => 'for selected landlords'
    );

    public int $spacesToFetchSelected = 0;

    public function configure(): void
    {
        $this->setPrimaryKey('id');
    }

    public function columns(): array
    {
        return [
            
            Column::make("Spacename", "spacename")
                ->sortable(),
            Column::make("Spaceid", "spaceid")
                ->sortable(),
            Column::make('Property', 'property.property')
                ->searchable(),
            Column::make("Rentprice", "rentprice")
                ->sortable()
                ->format(function($value){
                    return $this->ugx($value);
                }),
            Column::make("Balance", "balance")
                ->sortable()
                ->format(function($value){
                    return $this->ugx($value);
                }),
            Column::make('Action', 'spaceid')
                ->format(function($value, $column, $row) {
                    return  view('livewire.components.tables.landlordspacesaction', 
                    ['value' => $value]
                );
                }),
        
        ];
    }

    public function builder(): Builder
    {
        return Space::select('*')->with('property');
        // $query = Space::query()
        //                 ->selectRaw('spaces.spacename, spaces.spaceid, spaces.occupied, spaces.rentprice,
        //                             spaces.balance, propertys.property, users.firstname, users.lastname, users.id')
                        
                        
        //                 ->leftjoin('propertys', 'spaces.propertyid', '=', 'propertys.propertyid') 
        //                 ->leftjoin('users', 'spaces.tenantid', '=', 'users.id');

        // switch ($this->spacesToFetchSelected) {
        //     case 1:
        //         $query->where('propertys.userid', $this->landlord->id);
        //     break;
        // }
        // return $query;
    }
}
