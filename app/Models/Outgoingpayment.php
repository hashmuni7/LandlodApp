<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Outgoingpayment
 * 
 * @property int $outgoingpaymentstxnid
 * @property int $outchannelid
 * @property float $amount
 * @property string $phonenumber
 * @property bool $status
 * @property float $charges
 * 
 * @property Outchannel $outchannel
 *
 * @package App\Models
 */
class Outgoingpayment extends Model
{
	protected $table = 'outgoingpayments';
	protected $primaryKey = 'outgoingpaymentstxnid';
	public $timestamps = false;

	protected $casts = [
		'outchannelid' => 'int',
		'amount' => 'float',
		'status' => 'bool',
		'charges' => 'float'
	];

	protected $fillable = [
		'outchannelid',
		'amount',
		'phonenumber',
		'status',
		'charges'
	];

	public function outchannel()
	{
		return $this->belongsTo(Outchannel::class, 'outchannelid');
	}
}
