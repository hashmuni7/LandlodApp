<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Warning
 * 
 * @property int $warningid
 * @property int $spaceid
 * @property float $firstrule
 * @property float $secondrule
 * @property float $thirdrule
 * @property int $updatedby
 * 
 * @property Space $space
 * @property User $user
 *
 * @package App\Models
 */
class Warning extends Model
{
	protected $table = 'warnings';
	protected $primaryKey = 'warningid';
	public $timestamps = false;

	protected $casts = [
		'spaceid' => 'int',
		'firstrule' => 'float',
		'secondrule' => 'float',
		'thirdrule' => 'float',
		'updatedby' => 'int'
	];

	protected $fillable = [
		'spaceid',
		'firstrule',
		'secondrule',
		'thirdrule',
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
}
