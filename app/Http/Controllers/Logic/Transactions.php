<?php

namespace App\Http\Controllers\Logic;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Models\Ledger;
use App\Models\Space;
use App\Models\Rentpayment;
use App\Models\Inchannel;
use App\Models\Rentalperiod;
use App\Models\Transactiontype;

use Carbon\Carbon;

class Transactions extends Controller
{
    protected $status = false;
    protected $msg = "Transaction Failed";
    protected $data = array();
    /**
     * Make a templat of how the response data
     * should be arranged
     *
     * @return array
     */
    public function response($status, $msg, $data)
    {
        $response = array(
            'status' => $status,
            'msg' => $msg,
            'data' => $data,
        );
            return  $response;
    }
    /*
    Adding a rent payment to the system.
    1. Check if the Space has a tenant and is verified to receive payment.
    2. Fetch transaction details of payment and insert in DB
    3. 
    
    
    */
    public function addPayment($spaceid, $amount, $description, $clientNumber)
    {   
        
        $response = DB::transaction(function () use ($spaceid, $amount, $description, $clientNumber) {
            $status = false;
            $msg = "Transaction Failed";
            $data = array();
            $spaceOccupied = Space::selectRaw('spaces.spaceid, spaces.spacename, spaces.occupied')
                        ->where('spaceid', $spaceid)
                        ->first();
            if(!$spaceOccupied)
            {
                $status = false;
                $msg = "Space Does NOT exist!!";
            }
            elseif( $spaceOccupied->occupied){
                $payment = Rentpayment::create([
                    'amount' => $amount,
                    'spaceid' => $spaceid,
                    'status' => 1,
                    'date' => Carbon::now(),
                    'description' => $description,
                    'inchannelid' => $this->getChannel(),
                    'inchanneltxnid' => $this->getTxnID(),
                    'receiptno' => null,
                    'channelinfo' => "$clientNumber",
                    'channeltxncharges' => $this->getCharges($amount)
                ]);
        
                $this->postLedger($payment->spaceid, 4, $payment->date, $payment->description, $payment->amount);
            
                $status = true;
                $msg = "Payment Successful";
                $data = $payment;
            }
            else{
                $msg = "Space is not occupied yet!!";
            }
            return $this->response($status, $msg, $data);
        });  
        return $response; 
    }

    public function getCharges($amount)
    {
        $charges = 0;
        switch ($amount) {
            case $amount >= 500 && $amount < 2501:
                return $charges = 150;
                break;
            
            case $amount >= 2501 && $amount < 5001:
                return $charges = 250;
                break;

            case $amount >= 5001 && $amount < 15001:
                return $charges = 300;
                break;
                
            case $amount >= 15001 && $amount < 30001:
                return $charges = 500;
                break;

            case $amount >= 30001 && $amount < 45001:
                return $charges = 550;
                break;
            
            case $amount >= 45001 && $amount < 60001:
                return $charges = 600;
                break;

            case $amount >= 60001 && $amount < 125001:
                return $charges = 800;
                break;
                
            case $amount >= 125001 && $amount < 250001:
                return $charges = 1250;
                break;

            case $amount >= 250001 && $amount < 500001:
                return $charges = 4200;
                break;
            
            case $amount >= 500001 && $amount < 1000001:
                return $charges = 8500;
                break;

            case $amount >= 1000001 && $amount < 2000001:
                return $charges = 10000;
                break;
                
            case $amount >= 2000001 && $amount < 3000001:
                return $charges = 11000;
                break;

            case $amount >= 3000001 && $amount < 4000001:
                return $charges = 11500;
                break;
                
            case $amount >= 4000001 && $amount < 5000001:
                return $charges = 12500;
                break;

            case $amount >= 5000000:
                return $charges = 20000;
                break;
                
            default:
                return $charges = 500;
                break;
        }
    }

    public function getTxnID()
    {
        return rand(50831519000, 2000831519000);
    }

    public function getChannel()
    {
        $inchannels = InChannel::all()->toArray();
        $id = array_rand($inchannels);
        //dd($inchannels);
        return $inchannels[$id]['inchannelid'];
    }

    public function postLedger($spaceid, $transactionType, $date, $description, $amount)
    {
        /**
         * Get the transaction type to be posted
         * Insert the record in ledger
         * debit or credit ledger based on the transaction type
         */
        $response = DB::transaction(function () use ($spaceid, $transactionType, $date, $description, $amount)
        {
            
            $rentalPeriodID = null;
            if($transactionType != 1)
            {
                $space = Space::selectRaw('spaces.spaceid, spaces.spacename, spaces.balance, rentalperiods.tenureid')
                                ->where('spaces.spaceid', $spaceid)
                                ->where('rentalperiods.status', 1)
                                ->leftjoin('rentalperiods', 'spaces.spaceid', '=', 'rentalperiods.spaceid')
                                ->first();

                $ledgerDirection = $this->getTxnDirection($transactionType, $amount, $space->balance);
                $txn = Ledger::create([
                            'tenureid' => $space->tenureid,
                            'date' => $date,
                            'transactiontypeid' => $transactionType,
                            'description' => $description,
                            $ledgerDirection['drcr'] => $amount,
                            'balance' => $ledgerDirection['newBalance']
                        ]);
        
                $space->balance = $txn->balance;
                $space->save();
                $this->status = true;
                $this->msg = "Transaction Successful";
                return $this->response($this->status, $this->msg, $this->data);
            }
            else{
                return $this->response($this->status, $this->msg, $this->data);
            }
            
        });

        return $response;

    }

    public function getTxnDirection($transactionTypeID, $amount, $currentBalance)
    {
        $dbcrSign = 'credit';
        $newBalance = 0;
        $dir = Transactiontype::select('drcr')->where('transactiontypeid', $transactionTypeID)->first();
        if($dir->drcr == 0)
        {
            $dbcrSign = 'debit';
            $newBalance = $currentBalance - $amount;
        }
        else{
            $dbcrSign = 'credit';
            $newBalance = $currentBalance + $amount;
        }

        return array(
            'drcr' => $dbcrSign,
            'newBalance' => $newBalance
        );

    }
}
