<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Ledgerevidence
 * 
 * @property int $ledgerevidenceid
 * @property int $ledgerid
 * @property int $rentpaymenttxnid
 * 
 * @property Ledger $ledger
 * @property Rentpayment $rentpayment
 *
 * @package App\Models
 */
class Ledgerevidence extends Model
{
	protected $table = 'ledgerevidence';
	protected $primaryKey = 'ledgerevidenceid';
	public $timestamps = false;

	protected $casts = [
		'ledgerid' => 'int',
		'rentpaymenttxnid' => 'int'
	];

	protected $fillable = [
		'ledgerid',
		'rentpaymenttxnid'
	];

	public function ledger()
	{
		return $this->belongsTo(Ledger::class, 'ledgerid');
	}

	public function rentpayment()
	{
		return $this->belongsTo(Rentpayment::class, 'rentpaymenttxnid');
	}
}
