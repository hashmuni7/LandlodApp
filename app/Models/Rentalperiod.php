<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Rentalperiod
 * 
 * @property int $rentalperiodid
 * @property int $spaceid
 * @property Carbon $startdate
 * @property Carbon $enddate
 * @property int $tenureid
 * @property bool $status
 * 
 * @property Space $space
 * @property Tenure $tenure
 * @property Collection|Ledger[] $ledgers
 *
 * @package App\Models
 */
class Rentalperiod extends Model
{
	protected $table = 'rentalperiods';
	protected $primaryKey = 'rentalperiodid';
	public $timestamps = false;

	protected $casts = [
		'spaceid' => 'int',
		'tenureid' => 'int',
		'status' => 'bool'
	];

	protected $dates = [
		'startdate',
		'enddate'
	];

	protected $fillable = [
		'spaceid',
		'startdate',
		'enddate',
		'tenureid',
		'status'
	];

	public function space()
	{
		return $this->belongsTo(Space::class, 'spaceid');
	}

	public function tenure()
	{
		return $this->belongsTo(Tenure::class, 'tenureid');
	}

	public function ledgers()
	{
		return $this->hasMany(Ledger::class, 'rentalperiodid');
	}
}
