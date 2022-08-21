<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Transactiontype
 * 
 * @property int $transactiontypeid
 * @property string $transactiontype
 * @property bool $drcr
 * @property bool $status
 * @property int $updatedby
 * 
 * @property Collection|Ledger[] $ledgers
 *
 * @package App\Models
 */
class Transactiontype extends Model
{
	protected $table = 'transactiontypes';
	protected $primaryKey = 'transactiontypeid';
	public $timestamps = false;

	protected $casts = [
		'drcr' => 'bool',
		'status' => 'bool',
		'updatedby' => 'int'
	];

	protected $fillable = [
		'transactiontype',
		'drcr',
		'status',
		'updatedby'
	];

	public function ledgers()
	{
		return $this->hasMany(Ledger::class, 'transactiontypeid');
	}
}
