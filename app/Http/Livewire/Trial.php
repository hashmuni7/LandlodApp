<?php

namespace App\Http\Livewire;

use Livewire\Component;
use Illuminate\Pagination\LengthAwarePaginator;
use App\Models\User;
use App\Models\Usercategory;
use App\Models\Property;
use App\Models\District;
use App\Models\Space;
use App\Models\Tenure;
use Carbon\Carbon;
use RealRashid\SweetAlert\Facades\Alert;

use \NumberFormatter;

class Trial extends Component
{
    public $foo = 'Try';
    public $landlords;
    public $things;
    public $number = '12/12/21';
    public $methodExecuted = false;
    public $message;
    public $results = [];
    
    public function getHim()
    {
        return 'Well & Good';
    }

    public function fetchNumber($number)
    {
        $num = new NumberFormatter('en', NumberFormatter::SPELLOUT);
        if(is_Numeric($number))
        {
            $this->things = $num->format($number);
            return $this->things;
        }
        else
        {
            $this->things = $num->format(0);
            return $this->things;
        }
    }

    public function createPropertys()
    {
        if (!$this->methodExecuted) {
            $propertys = [];
            $num = new NumberFormatter('en', NumberFormatter::SPELLOUT);
            $numberOfPropertys = 0;
            $districts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

            $landlords = User::select('*')->where('usercategoryid', 200)->get();
            foreach ($landlords as $landlord) {
                for ($i=0; $i < 5; $i++) {
                    
                    $randIndex = array_rand($districts);
                    $randomDistrict = District::select('*')->where('districtid', $districts[$randIndex])->first();
                    $propertys = Property::create([
                        'property' => 'Property ' . $num->format($numberOfPropertys),
                        'districtid' => $randomDistrict->districtid,
                        'city' => $randomDistrict->district,
                        'address' => $randomDistrict->district,
                        'userid' => $landlord->id,
                        'graceperiod' => 3,
                        'latefee' => 50000,
                        'latecharge' => 1,
                        'phonenumber' => '0705949' . strval($numberOfPropertys + 100),
                        'createdby' => 1,
                        'createdon' => Carbon::now(),
                        'updatedby' => 1
        
                    ]);
                    $numberOfPropertys++;
                }
                
            }
            $this->methodExecuted = true;

          
                $this->message = 'Properties Created Successfully';
                $this->results = Property::select('*')->get();
        }else
        {
            $this->message = 'Properties Created Successfully';
            $this->results = Property::select('*')->get();
        }


        
    }

    public function correctCases()
    {
        $propertys = Property::select('*')->get();
        foreach ($propertys as $property) {
            $property->property = ucwords($property->property);
            $property->save();
        }
        $this->message = 'Properties Created Successfully';
        $this->results = Property::select('*')->get();
    }

    public function correctNumbering()
    {
        $num = new NumberFormatter('en', NumberFormatter::SPELLOUT);
        $propertys = Property::select('*')->get();
        foreach ($propertys as $property) {
            $property->property = 'Property ' . ucwords($num->format($property->propertyid)); //ucwords($property->property);
            $property->phonenumber = '0705949' . strval(100 + $property->propertyid);
            $property->save();
        }
        $this->message = 'Properties Corrected Successfully';
        $this->results = Property::select('*')->get();
    }

    public function deletePropertys()
    {
        $user = User::select('*')->where('usercategoryid', 200)->orderBy('id', 'desc')->first();
        Property::select('*')->where('userid', $user->id)->delete();

        $this->results = Property::select('*')->get();
        $records = $this->results->count();
        $this->message = "Deleted $records Successfully";
        

    }

    public function createSpaces()
    {
        
        $prices = [
                    100000, 150000, 200000, 250000, 300000, 350000, 400000, 450000, 500000,
                    600000, 650000, 700000, 750000, 800000, 850000, 900000, 950000, 1000000,
                    1200000, 1500000, 2000000, 2500000, 3000000
                ];
        $propertys = Property::select('*')->get();
        
        foreach ($propertys as $property) {
            for ($i=1; $i <= 10; $i++) { 
                Space::create([
                    'spacename' => 'S-P' . strval($property->propertyid) . "-" . strval($i),
                    'propertyid' => $property->propertyid,
                    'occupied' => 0,
                    'rentprice' => $prices[array_rand($prices)],
                    'rentalperiod' => 30,
                    'initialpaymentfor' => 3,
                    'latecharge' => 1,
                    'latefee' => 50000,
                    'graceperiod' => 7,
                    'balance' => 0,
                    'readyfortenant' => 1,
                    'createdby' => 1
                ]);

                
            }
        }

        $this->results = Space::select('*')->get();
        $spaceCount = $this->results->count();
        $this->message = "$spaceCount Spaces Created Successfully";
        
        
    }

    public function createTenants()
    {
        for ($i=1; $i <= 450; $i++) { 
            User::create([
                'firstname' => 'Tenant',
                'email' => 'tenant' . strval($i) . '@app',
                'password' => '$2y$10$FxhT44cEOs007ojatB0XK.fXnOI.EcoFccSDwQn4UuqUs2Lum5OC.',
                'lastname' => strval($i),
                'sex' => array_rand([0,1]),
                'phone' => '0705631' . (100 + $i),
                'status' => 1,
                'archived' => 0,
                'usercategoryid' => 300,
            ]);
        }

        $this->results = User::select('*')->where('usercategoryid', 300)->get();
        $tenantCount = $this->results->count();
        $this->message = "$tenantCount Tenants Created Successfully";
    }

    public function createTenures()
    {
        $landlords = User::select('*')->where('usercategoryid', 200)->take(3)->get();
        $tenants = User::select('*')->where('usercategoryid', 300)->take(50)->get();
        $tenantCount = 0;
        foreach($landlords as $landlord)
        {
            $properties = Property::select('*')->where('userid', $landlord->id)->take(2)->get();
            foreach($properties as $property)
            {
                $spaces = Space::select('*')
                                ->where('occupied', 0)
                                ->where('propertyid', $property->propertyid)
                                ->take(5)
                                ->get();

                foreach($spaces as $space){
                    Tenure::create([
                        'spaceid' => $space->spaceid,
                        'userid' => $tenants->get($tenantCount)->id,
                        'startdate' => Carbon::now(),
                        'updatedby' => 1
                    ]);
                    $tenantCount++;
                }                

                
            }
        }
        
        
        // foreach($tenants as $tenant){
            
        // }
        $this->results = Tenure::select('*')->get();
        $tenantCount = $this->results->count();
        $this->message = "$tenantCount Tenures Input";
    }


    public function render()
    {
        //->format('D, d M Y')
        //$this->landlords = User::all();
        //$num = new NumberFormatter('en', NumberFormatter::SPELLOUT);
        Alert::success('Success Title', 'Success Message');
        $this->message = Carbon::parse($this->number);

        return view('livewire.trial',
            ['results' => $this->results],
            ['message' => $this->message],
            //['processed' => str_replace(' ', '', $this->message)]
        );
    }
}
