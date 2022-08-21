<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Tenure
 * 
 * @property int $tenureid
 * @property int $spaceid
 * @property bool|null $spacetenurestatus
 * @property int $userid
 * @property bool|null $tenantaccept
 * @property Carbon $startdate
 * @property Carbon|null $enddate
 * @property int|null $spaceotp
 * @property Carbon|null $spaceotpexpiry
 * @property int $updatedby
 * 
 * @property Space $space
 * @property User $user
 * @property Collection|Ledger[] $ledgers
 * @property Collection|Rentalperiod[] $rentalperiods
 *
 * @package App\Models
 */
class Tenure extends Model
{
	protected $table = 'tenures';
	protected $primaryKey = 'tenureid';
	public $timestamps = false;

	protected $casts = [
		'spaceid' => 'int',
		'spacetenurestatus' => 'bool',
		'userid' => 'int',
		'tenantaccept' => 'bool',
		'spaceotp' => 'int',
		'updatedby' => 'int'
	];

	protected $dates = [
		'startdate',
		'enddate',
		'spaceotpexpiry'
	];

	protected $fillable = [
		'spaceid',
		'spacetenurestatus',
		'userid',
		'tenantaccept',
		'startdate',
		'enddate',
		'spaceotp',
		'spaceotpexpiry',
		'updatedby'
	];

	public function space()
	{
		return $this->belongsTo(Space::class, 'spaceid');
	}

	public function user()
	{
		return $this->belongsTo(User::class, 'updatedby');
	}

	public function ledgers()
	{
		return $this->hasMany(Ledger::class, 'tenureid');
	}

	public function rentalperiods()
	{
		return $this->hasMany(Rentalperiod::class, 'tenureid');
	}
}
