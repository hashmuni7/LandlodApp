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

class LandlordPropertiesPayments extends DataTableComponent
{
    use Figures;
    //protected $model = Rentpayment::class;
    public User $landlord;
   // public bool $showSearch = false;
    public array $paymentsToFetch = array(
        0 => 'for the owner to view',
        1 => 'for a specific landlord',
        2 => 'for selected landlords'
    );

    public int $paymentsToFetchSelected = 0;

    public function mount(User $landlord, $fetchFor)
    {
        $this->landlord = $landlord;
        $this->paymentsToFetchSelected = $fetchFor;
    }

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
                 //   ->asHtml(),
            Column::make('Date', 'date')
                    ->format(function($value){
                        return $value ? $value->format('D, d M Y H:i:s') : $value;
                    }),
            Column::make('Space Code', 'spaceid')->searchable(),
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
        ];
    }

//     public function filters(): array
// {
//     $id = 1;//$this->landlord->id;
//     $spaces = Space::selectRaw('spaces.spacename, spaces.spaceid, spaces.occupied, spaces.rentprice,
//                                 spaces.balance, users.firstname, users.lastname, users.id')
//                     ->when($this->paymentsToFetchSelected == 1, fn ($query, $id) => $query->where('propertys.userid', $id))
//                     //->where('propertys.userid', $this->landlord->id)
                    
//                     ->leftjoin('propertys', 'spaces.propertyid', '=', 'propertys.propertyid') 
//                     ->leftjoin('users', 'spaces.tenantid', '=', 'users.id')->get();

//     $spacesEditted = ['' => 'Any'];
//     foreach ($spaces as $key => $value) {
//         $spacesEditted["$value->spaceid"] = "$value->spaceid";
//     }

//     $properties = Property::selectRaw(
//                             'propertyid, property, district, city, 
//                             (select 
//                             count(*)
//                             from spaces 
                            
//                             where spaces.propertyid = propertys.propertyid
//                             ) as spacesCount , 
//                             (select 
//                             sum(balance)
//                             from spaces 
                            
//                             where spaces.propertyid = propertys.propertyid
//                             ) as balance'
                            
//                         )
//                         ->when( $this->paymentsToFetchSelected == 1, fn ($query, $id) => $query->where('userid', $this->landlord->id))
//                         //->where('userid', $this->landlord->id)useriduserid
//                         ->leftjoin('districts', 'propertys.districtid', '=', 'districts.districtid')
//                         ->get();
//     $propertiesEditted = ['' => 'Any'];
//     foreach ($properties as $key => $value) {
//         $propertiesEditted["$value->propertyid"] = "$value->property";
//     }
//     // $spacesEditted = [
        
//     //     'two' => 'j2222j',
//     // ];

//     // $spacesEditted['56788'] =  'jhjkhj';
//     return [
//         // 'spaceid' => Filter::make('Space Code')
//         //     ->select($spacesEditted),
//         'propertyid' => Filter::make('Property')
//             ->select($propertiesEditted),
//          'startdate' => Filter::make('Start Date')
//             ->date([
//                 'min' => now()->subYear()->format('Y-m-d'), // Optional
//                 'max' => now()->format('Y-m-d') // Optional
//             ]),
//         'enddate' => Filter::make('End Date')
//             ->date([
//                 'min' => now()->subYear()->format('Y-m-d'), // Optional
//                 'max' => now()->format('Y-m-d') // Optional
//             ]),
//     ];
// }

    public function builder(): Builder
    {
        $query = Rentpayment::query()
        ->select('rentpaymenttxnid', 'amount', 'rentpayments.spaceid', 'status', 'date',
                              'description', 'rentpayments.inchannelid', 'inchanneltxnid', 'inchannels.inchannel',
                              'receiptno', 'channelinfo', 'spaces.spacename', 'propertys.property')
       // ->where('propertys.userid', $this->landlord->id)
        ->leftjoin('inchannels', 'rentpayments.inchannelid', '=', 'inchannels.inchannelid')
        ->leftjoin('spaces', 'rentpayments.spaceid', '=', 'spaces.spaceid')
        ->leftjoin('propertys', 'spaces.propertyid', '=', 'propertys.propertyid')
        ->orderby('date', 'desc');
    //    ->when($this->getFilter('startdate'), fn ($query, $startdate) => $query->where('date', '>=', $startdate))
    //    ->when($this->getFilter('enddate'), fn ($query, $enddate) => $query->where('date', '<=', $enddate));

        // if($this->hasFilter('propertyid')) 
        // {
        //     //$this->removeFilter('spaceid');
        //     $query->where('propertys.propertyid', $this->getFilter('propertyid'));
        // }

        switch ($this->paymentsToFetchSelected) {
            case 1:
                $query->where('propertys.userid', $this->landlord->id);
            break;
        }
        return $query;

    }

    public function setTableDataClass(Column $column, $row): ?string
    {
        return 'actions-hover';
    }
}
