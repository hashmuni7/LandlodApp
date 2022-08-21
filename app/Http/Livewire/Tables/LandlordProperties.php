<?php

namespace App\Http\Livewire\Tables;

use Illuminate\Database\Eloquent\Builder;
use Rappasoft\LaravelLivewireTables\DataTableComponent;
use Rappasoft\LaravelLivewireTables\Views\Column;
use App\Traits\Figures;
use Illuminate\Support\Facades\Auth;

use App\Models\Property;
use App\Models\User;
use App\Models\Space;

class LandlordProperties extends DataTableComponent
{
    use Figures;
    //public bool $paginationEnabled = true;
    //public bool $showPagination = true;
    //public string $pageName = 'properties';
    public User $landlord;
    public array $propertiesToFetch = array(
        0 => 'for the owner to view',
        1 => 'for a specific landlord',
        2 => 'for selected landlords'
    );

    public int $propertiesToFetchSelected = 0;

    public function configure(): void
    {
        $this->setPrimaryKey('propertyid');
    }

    

    // public function render()
    // {
    //     $this->propertysForLandlord = Property::select('*')
    //                                             ->where('userid', $this->landlord->id)
    //                                             ->leftjoin('districts', 'propertys.districtid', '=', 'districts.districtid')
    //                                             ->paginate($this->propertysPerPage, ['*'], $this->pageName);
    //     return view('livewire.tables.landlord-properties',
    //         [
    //             'propertysForLandlord' => $this->propertysForLandlord,
    //         ]
    //     );
    // }

    public function columns(): array
    {
        return [
            Column::make('Property', 'property')
                    ->sortable()
                    ->searchable(),
            Column::make('Spaces', 'propertyid')
                    ->sortable()
                    ->format(function($value, $column, $row) {
                        return  $column->spacesCount;
                   
                    }),
            Column::make('District', 'district.district')
                    ->sortable()
                    ->searchable(),
            Column::make('City', 'city')
                    ->sortable()
                    ->searchable(),
            Column::make('Balance', 'propertyid')
                    ->format(function($value, $column, $row){
                        return $this->ugx($column->balance);
                    })
                    ->sortable(),
            Column::make('Action', 'propertyid')
                ->format(function($value, $column, $row) {
                    return  view('livewire.components.tables.landlordpropertiesaction', 
                    ['value' => $value]
                );
                }),
        ];
    }

    public function builder(): Builder
    {
        $query = Property::query()
                            ->selectRaw(
                                'propertyid, property, district, city, 
                                (select 
                                count(*)
                                from spaces 
                                
                                where spaces.propertyid = propertys.propertyid
                                ) as spacesCount , 
                                (select 
                                sum(balance)
                                from spaces 
                                
                                where spaces.propertyid = propertys.propertyid
                                ) as balance'
                                
                            );

        switch ($this->propertiesToFetchSelected) {
            case 1:
                $query->where('userid', $this->landlord->id);
                $query->leftjoin('districts', 'propertys.districtid', '=', 'districts.districtid');
            break;
            
            default:
                $query->leftjoin('districts', 'propertys.districtid', '=', 'districts.districtid');
            break;
        }
    //   if(Auth::user()->usercategory->usercategoryid == 1){
          
    //   }else if(Auth::user()->usercategory->usercategoryid == 200){
          
    //   }                   
                            // 
                            // ->leftjoin('districts', 'propertys.districtid', '=', 'districts.districtid');
        return $query;

    }

    public function setTableDataClass(Column $column, $row): ?string
    {
        
        // $class = null;
        // if($column->column() === 'balance' && $row->balance < 0)
        // {
        //     $class =  'text-danger';
        //     return $class;
        // }

        // if($column->column() === 'propertyid') {
        //     $class = 'actions-hover';
        //     return $class;
        // }

        // if($class == null){return null;}
        return "";
        
    }

    public function mount(User $landlord, $fetchFor)
    {
        $this->landlord = $landlord;
        $this->propertiesToFetchSelected = $fetchFor;
    }
}
