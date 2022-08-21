<?php

namespace App\Traits;

trait Figures
{

    public function percentage($whole , $portion) 
    {
        
        return $whole != 0 ?  number_format((float)($portion/$whole), 2, '.', '') : 0;
    }

    public function ugx($amount){
        if($amount >= 0)
        {
            $formatedAmount =  number_format($amount, 0, '.', ',');
            return "UGX $formatedAmount";
        }
        else{
            $amount = -1 * $amount;
            $formatedAmount =  number_format($amount, 0, '.', ',');
            return "UGX ($formatedAmount)";
        }
        
    }

}
