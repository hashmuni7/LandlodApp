<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Rentpayment
 * 
 * @property int $rentpaymenttxnid
 * @property float $amount
 * @property int $spaceid
 * @property bool $status
 * @property Carbon $date
 * @property string $description
 * @property int $inchannelid
 * @property int $inchanneltxnid
 * @property int|null $receiptno
 * @property string $channelinfo
 * @property float $channeltxncharges
 * 
 * @property Space $space
 * @property Inchannel $inchannel
 * @property Collection|Ledgerevidence[] $ledgerevidences
 *
 * @package App\Models
 */
class Rentpayment extends Model
{
	protected $table = 'rentpayments';
	protected $primaryKey = 'rentpaymenttxnid';
	public $timestamps = false;

	protected $casts = [
		'amount' => 'float',
		'spaceid' => 'int',
		'status' => 'bool',
		'inchannelid' => 'int',
		'inchanneltxnid' => 'int',
		'receiptno' => 'int',
		'channeltxncharges' => 'float'
	];

	protected $dates = [
		'date'
	];

	protected $fillable = [
		'amount',
		'spaceid',
		'status',
		'date',
		'description',
		'inchannelid',
		'inchanneltxnid',
		'receiptno',
		'channelinfo',
		'channeltxncharges'
	];

	public function space()
	{
		return $this->belongsTo(Space::class, 'spaceid');
	}

	public function inchannel()
	{
		return $this->belongsTo(Inchannel::class, 'inchannelid');
	}

	public function ledgerevidences()
	{
		return $this->hasMany(Ledgerevidence::class, 'rentpaymenttxnid');
	}
}
