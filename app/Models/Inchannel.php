<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Inchannel
 * 
 * @property int $inchannelid
 * @property string $inchannel
 * @property string|null $logourl
 * @property int $updatedby
 * 
 * @property User $user
 * @property Collection|Rentpayment[] $rentpayments
 *
 * @package App\Models
 */
class Inchannel extends Model
{
	protected $table = 'inchannels';
	protected $primaryKey = 'inchannelid';
	public $timestamps = false;

	protected $casts = [
		'updatedby' => 'int'
	];

	protected $fillable = [
		'inchannel',
		'logourl',
		'updatedby'
	];

	public function user()
	{
		return $this->belongsTo(User::class, 'updatedby');
	}

	public function rentpayments()
	{
		return $this->hasMany(Rentpayment::class, 'inchannelid');
	}
}
