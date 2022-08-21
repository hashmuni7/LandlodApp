<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Ledger
 * 
 * @property int $ledgerid
 * @property int $tenureid
 * @property Carbon $date
 * @property int|null $rentalperiodid
 * @property int $transactiontypeid
 * @property string|null $description
 * @property float|null $debit
 * @property float|null $credit
 * @property float $balance
 * 
 * @property Tenure $tenure
 * @property Rentalperiod|null $rentalperiod
 * @property Transactiontype $transactiontype
 * @property Collection|Ledgerevidence[] $ledgerevidences
 *
 * @package App\Models
 */
class Ledger extends Model
{
	protected $table = 'ledger';
	protected $primaryKey = 'ledgerid';
	public $timestamps = false;

	protected $casts = [
		'tenureid' => 'int',
		'rentalperiodid' => 'int',
		'transactiontypeid' => 'int',
		'debit' => 'float',
		'credit' => 'float',
		'balance' => 'float'
	];

	protected $dates = [
		'date'
	];

	protected $fillable = [
		'tenureid',
		'date',
		'rentalperiodid',
		'transactiontypeid',
		'description',
		'debit',
		'credit',
		'balance'
	];

	public function tenure()
	{
		return $this->belongsTo(Tenure::class, 'tenureid');
	}

	public function rentalperiod()
	{
		return $this->belongsTo(Rentalperiod::class, 'rentalperiodid');
	}

	public function transactiontype()
	{
		return $this->belongsTo(Transactiontype::class, 'transactiontypeid');
	}

	public function ledgerevidences()
	{
		return $this->hasMany(Ledgerevidence::class, 'ledgerid');
	}
}
