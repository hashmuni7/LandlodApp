<?php

namespace App\Http\Livewire\Tables;

use App\Models\Property;
use Rappasoft\LaravelLivewireTables\DataTableComponent;
use Rappasoft\LaravelLivewireTables\Views\Column;
use App\Models\User;
use App\Traits\Figures;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Builder as EloquentBuilder;

class Landlords extends DataTableComponent
{
    use Figures;
    //protected $model = User::class;

    public function configure(): void
    {
        $this->setPrimaryKey('id');
        $this->setPageName('landlords');
    }

    public function columns(): array
    {
        return [
            Column::make('Landlord', 'firstname')
                ->sortable()
                ->format(function($value, $column, $row) {
                    return $column->firstname . " " . $column->lastname;
                })
                ->searchable(),
            Column::make('E-mail', 'email')
                ->sortable()
                ->searchable(),
            Column::make('Properties', 'id')
            ->format(function($value, $column, $row) {
                return Property::select('*')->where('userid' , $column->id)->count();
                
                //return $value;
            }),
            Column::make('Action', 'id')
            ->format(function($value, $column, $row) {
                return  view('livewire.components.tables.landlordsaction', 
                    ['value' => $value]
                );
                //return $value;
            }),
        ];
    }

    public function builder(): Builder
    {
        return User::query()
                    ->selectRaw(
                        'id, firstname, lastname, email'
                     )
                    // ->selectRaw(
                    //     'id, firstname, lastname, email, 
                    //     (select count(*) from propertys where propertys.userid = users.id) as propertiesCount, 
                    //     count(spaces.propertyid) as spacesCount, 
                    //     count(if(spaces.occupied = 1, spaces.occupied, null)) as tenants'
                    //     )
                    ->where('usercategoryid', 200);
                    // ->leftjoin('propertys', 'users.id', '=', 'propertys.userid')
                    // ->leftjoin('spaces', 'propertys.propertyid', '=', 'spaces.propertyid')
                    // ->groupBy( 'users.id' )
    }
                    
      
}
