<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Space
 * 
 * @property int $spaceid
 * @property string $spacename
 * @property int $propertyid
 * @property bool $occupied
 * @property int|null $tenantid
 * @property float $rentprice
 * @property int $rentalperiod
 * @property int $initialpaymentfor
 * @property bool $latecharge
 * @property float $latefee
 * @property int $graceperiod
 * @property float $balance
 * @property bool $readyfortenant
 * @property int $createdby
 * 
 * @property Property $property
 * @property User|null $user
 * @property Collection|Rentalperiod[] $rentalperiods
 * @property Collection|Rentpayment[] $rentpayments
 * @property Collection|Tenure[] $tenures
 * @property Collection|Warning[] $warnings
 *
 * @package App\Models
 */
class Space extends Model
{
	protected $table = 'spaces';
	protected $primaryKey = 'spaceid';
	public $timestamps = false;

	protected $casts = [
		'propertyid' => 'int',
		'occupied' => 'bool',
		'tenantid' => 'int',
		'rentprice' => 'float',
		'rentalperiod' => 'int',
		'initialpaymentfor' => 'int',
		'latecharge' => 'bool',
		'latefee' => 'float',
		'graceperiod' => 'int',
		'balance' => 'float',
		'readyfortenant' => 'bool',
		'createdby' => 'int'
	];

	protected $fillable = [
		'spacename',
		'propertyid',
		'occupied',
		'tenantid',
		'rentprice',
		'rentalperiod',
		'initialpaymentfor',
		'latecharge',
		'latefee',
		'graceperiod',
		'balance',
		'readyfortenant',
		'createdby'
	];

	public function property()
	{
		return $this->belongsTo(Property::class, 'propertyid');
	}

	public function user()
	{
		return $this->belongsTo(User::class, 'tenantid');
	}

	public function rentalperiods()
	{
		return $this->hasMany(Rentalperiod::class, 'spaceid');
	}

	public function rentpayments()
	{
		return $this->hasMany(Rentpayment::class, 'spaceid');
	}

	public function tenures()
	{
		return $this->hasMany(Tenure::class, 'spaceid');
	}

	public function warnings()
	{
		return $this->hasMany(Warning::class, 'spaceid');
	}
}
