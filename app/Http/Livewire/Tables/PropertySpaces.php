<?php

namespace App\Http\Livewire\Tables;

use App\Models\Property;
use Rappasoft\LaravelLivewireTables\DataTableComponent;
use Rappasoft\LaravelLivewireTables\Views\Column;
use App\Models\Space;
use App\Traits\Figures;
use Illuminate\Database\Eloquent\Builder;

class PropertySpaces extends DataTableComponent
{
    use Figures;
    public Property $property;
    //protected $model = Space::class;

    public function configure(): void
    {
        $this->setPrimaryKey('spaceid');
    }

    public function columns(): array
    {
        return [
            
            Column::make("Spacename", "spacename")
                ->sortable(),
            Column::make("Space Code", "spaceid")
                ->sortable(),    
            Column::make("Propertyid", "property.property")
                ->sortable(),
            Column::make("Occupied", "occupied")
                    ->format(function($value, $column, $row) {
                        return  view('livewire.components.tables.badgeaction', 
                        ['value' => $value]
                    );
                    })
                ->sortable(),
            Column::make("Tenantid", "tenantid")
                ->sortable()
                ->format(function($value, $column, $row){
                    return $column->firstname . " " . $column->lastname;
                }),
            Column::make("Rentprice", "rentprice")
                ->sortable()
                ->format(function($value){
                    return $this->ugx($value);
                }),
                Column::make('Balance', 'balance')
                        ->sortable()
                        ->format(function($value, $column, $row){
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
        return Space::query()
                        ->selectRaw('spaces.spacename, spaces.spaceid, spaces.occupied, spaces.rentprice,
                                    spaces.balance, users.firstname, users.lastname, users.id')
                        ->where('propertys.propertyid', $this->property->propertyid)
                        
                        ->leftjoin('propertys', 'spaces.propertyid', '=', 'propertys.propertyid') 
                        ->leftjoin('users', 'spaces.tenantid', '=', 'users.id');

    }

    public function mount(Property $property)
    {
        $this->property = $property;
    }
}
