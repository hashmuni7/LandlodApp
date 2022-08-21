<?php

namespace App\Http\Livewire\Tester;

use App\Models\Inchannel;
use App\Models\Rentpayment;
use App\Models\Space;
use App\Models\RentalPeriod;
use App\Models\Ledger;
use App\Http\Controllers\Logic\Transactions;
use Carbon\Carbon;
use Livewire\Component;
use Jantinnerezo\LivewireAlert\LivewireAlert;

class TestPayment extends Component
{
    use LivewireAlert;
    public $spaceCode = 30664470001;
    public $paymentAmount;
    public $inChannel;
    public $inChannels;
    public $txnCharges = 990;
    public $description = '';
    public $clientNumber = '+256705949874';
    public $data;

    public function render()
    {
        return view('livewire.tester.test-payment');
    }

    public function mount()
    {

        $this->inChannels = Inchannel::all();
       // $this->data = new Transactions;
    }

    public function addTestPayment()
    {

        $makeTransaction = (new Transactions)->addPayment($this->spaceCode, $this->paymentAmount, $this->description, $this->clientNumber);

        if($makeTransaction['status'])
        {
            $this->alert('success', $makeTransaction['msg'] , [
                'position' =>  'top-end', 
                'timer' =>  3000,  
                'toast' =>  true 
          ]);
        }
        else
        {
            $this->alert('error', $makeTransaction['msg'] , [
                'position' =>  'top-end', 
                'timer' =>  3000,  
                'toast' =>  true 
          ]);
        }
        // $payment = Rentpayment::create([
        //     'amount' => $this->paymentAmount,
        //     'spaceid' => $this->spaceCode,
        //     'status' => 1,
        //     'date' => Carbon::now(),
        //     'description' => 'Test Payment',
        //     'inchannelid' => $this->inChannel,
        //     'inchanneltxnid' => 13567892789,
        //     'receiptno' => 50831522,
        //     'channelinfo' => 'Test Test',
        //     'channeltxncharges' => $this->txnCharges

        // ]);

        // $space = Space::select('spaces.spaceid', 'spaces.spacename', 'spaces.propertyid', 'spaces.occupied', 'spaces.rentprice', 'spaces.rentalperiod',  
        //                         'spaces.initialpaymentfor', 'spaces.latecharge', 'spaces.latefee', 'spaces.graceperiod', 'spaces.balance', 'spaces.readyfortenant',
        //                         'spaces.createdby', 'propertys.propertyid', 'propertys.property')
        //                 ->where('spaces.spaceid', $payment->spaceid)
        //                 ->leftjoin('propertys', 'spaces.propertyid', '=', 'propertys.propertyid')
        //                 ->first();
        // $tenant = RentalPeriod::selectRaw('rentalperiods.rentalperiodid, rentalperiods.spaceid, rentalperiods.startdate,
        //                                       rentalperiods.enddate, rentalperiods.status, rentalperiods.tenureid, tenures.userid,
        //                                       users.firstname, users.lastname, users.othernames, users.sex, users.phone, users.email')
        //                                ->where('rentalperiods.spaceid', $payment->spaceid)
        //                                ->where('rentalperiods.status', 1)       
        //                                ->leftjoin('tenures', 'rentalperiods.tenureid', '=', 'tenures.tenureid')
        //                                ->leftjoin('users', 'tenures.userid', '=', 'users.id')
        //                                ->first();
        
        
        // $tenureid = $tenant->tenureid;
        


        // $txn = Ledger::create([
        //             'tenureid' => $tenureid,
        //             'date' => Carbon::now(),
        //             'transactiontypeid' => 4,
        //             'description' => 'Test Payment',
        //             'credit' => $payment->amount,
        //             'balance' => $space->balance + $payment->amount
        //         ]);

        // $space->balance = $txn->balance;
        // $space->save();

        
    }
}
