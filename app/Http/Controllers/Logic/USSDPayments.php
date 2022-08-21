<?php

namespace App\Http\Controllers\Logic;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\Logic\Transactions;
use Illuminate\Support\Facades\Http;
use App\Traits\Figures;
use App\Models\Space;

class USSDPayments extends Controller
{
    use Figures;
    public $sessionId;  
    public $serviceCode;
    public $phoneNumber;
    public $text;
    public $spaceid;
    public $amount;
    public $payerPhoneNumber;      
    public function handleRequest(Request $request)
    {
        
        $this->sessionId   = $request->sessionId;
        $this->serviceCode = $request->serviceCode;
        $this->phoneNumber = $request->phoneNumber;
        $this->text        = $request->text;

        if($this->text == "")
        {
            $response = "CON Welcome to The Landlod.\n";
            $response .= "1. Pay Rent. \n";
            $response .= "2. Check Rent Balance.";
            return $response;
        }
        else 
        {
            //echo "CON Enter Space Code.";
            $textArray = explode("*", $this->text);
            switch($textArray[0]){
                case 1: 
                    $this->payRentSteps($textArray);
                break;
                case 2: 
                    $this->checkRentDue($textArray);
                break;
                default:
                    echo "END Invalid choice. Please try again";
            }
        }
    }

    public function payRentSteps($textArray){
        
        $level = count($textArray);
        if($level == 1){
            echo "CON Please Enter Space Code:";
        } else if($level == 2){
            echo "CON Please Enter Amount:";
        }else if($level == 3){
            echo "CON Please Enter PIN:";
        }else if($level == 4){
                $this->spaceid = $textArray[1];
                $this->amount = $textArray[2];
                $txn = (new Transactions)->addPayment($this->spaceid, $this->amount, 'Rent Payment', $this->phoneNumber);
                if($txn['status'])
                {
                    //$formattedPhoneNumber = str_replace("+", "black", "<body text='%body%'>");
                    $space = Space::select('*')
                                    ->where('spaceid', $this->spaceid)
                                    ->leftjoin('propertys', 'spaces.propertyid', 'propertys.propertyid')
                                    ->first();
                    $this->sendSmsAfterPayment
                                                (
                                                    $this->phoneNumber,
                                                    $this->getMessage($this->amount, $space->spaceid, $space->spacename, $space->property, $space->balance) 
                                                );

                    $txnCharges = $this->ugx($txn['data']->channeltxncharges);
                    $paidAmountFormatted = $this->ugx($this->amount);
                    $response = "END Transaction Successful\n";
                    $response .= "Paid $paidAmountFormatted Rent for $space->spaceid. Charges: $txnCharges";
                    echo $response;
                }
                else{
                    echo "END Transaction Failed. Please try again";
                }   
        }
    }

    public function checkRentDue($textArray){
        
        $level = count($textArray);
        if($level == 1){
            echo "CON Please Enter Space Code:";

        }else if($level == 2){
            $this->spaceid = $textArray[1];
            //echo "END " . $textArray[1];
            $space = Space::select('*')
                                    ->where('spaceid', $this->spaceid)
                                    ->leftjoin('propertys', 'spaces.propertyid', 'propertys.propertyid')
                                    ->first();
           if ($space->balance < 0)
           {
                $response = "END Outstanding Rent for $space->spacename ";
                $response .= "($space->spaceid) is " . $this->ugx($space->balance);
                echo $response;
           } 
           if ($space->balance >= 0)
           {
                $response = "END Rent balance for $space->spacename \n";
                $response .= "($space->spaceid) is " . $this->ugx($space->balance);
                echo $response;
           }
        }
        // else{
        //     echo "END Invalid Selection. Please try again";
        // }
    }

    public function sendSms()
    {
        //: http://www.egosms.co/api/v1/json/
        /**
         * {
         *      "method":"SendSms",
         *      "userdata":
         *              {"username":"xxxxxx","password":"xxxxxx"},
         *      "msgdata":
         *              [{"number":"2567xxxxxxxx","message":"xxxxxx","senderid":"xxxxxx"}]
         *  }
         * 
         */

        // Success
        // {
        //      "Status":"OK","Cost":"xxxx","MsgFollowUpUniqueCode":"xxxxx"
        // }

        // Failed
        // {
        //      "Status":"Failed","Message":"xxxxxx"
        // }

        $response = Http::post('http://www.egosms.co/api/v1/json/', [
            'method'=>'SendSms',
            'userdata'=> array(
                            'username'=>'hash',// Egosms Username
                            'password'=>'RDP4isgJnUefcSp' //Egosms Password
                            ),
            'msgdata'=> array(
                            array(
                                'number'=> '+256705949874',
                                'message'=>'The Landlod App',
                                'senderid'=>'Egosms'
                            )
                        )
        ]);

        return $response;


    }

    public function sendSmsAfterPayment($phoneNumber, $message)
    {
        $response = Http::post('http://www.egosms.co/api/v1/json/', [
            'method'=>'SendSms',
            'userdata'=> array(
                            'username'=>'hash',// Egosms Username
                            'password'=>'RDP4isgJnUefcSp' //Egosms Password
                            ),
            'msgdata'=> array(
                            array(
                                'number'    => $phoneNumber,
                                'message'   => $message,
                                'senderid'  => 'Egosms'
                            )
                        )
        ]);

        return $response;


    }

    public function getMessage($amount, $spaceid, $spacename, $propertyname, $balance)
    {
        $amount = $this->ugx($amount);
        $response =  "Landlod App \n";
        $newBalance = $this->ugx($balance);
        $response .= "You have paid $amount for ($spaceid) $spacename on $propertyname. Your new rent balance is $newBalance\n";

        return $response;
    }


}
