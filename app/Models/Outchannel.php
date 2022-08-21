<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Outchannel
 * 
 * @property int $outchannelid
 * @property string $outchannel
 * @property string|null $logourl
 * @property int $updatedby
 * 
 * @property User $user
 * @property Collection|Outgoingpayment[] $outgoingpayments
 *
 * @package App\Models
 */
class Outchannel extends Model
{
	protected $table = 'outchannels';
	protected $primaryKey = 'outchannelid';
	public $timestamps = false;

	protected $casts = [
		'updatedby' => 'int'
	];

	protected $fillable = [
		'outchannel',
		'logourl',
		'updatedby'
	];

	public function user()
	{
		return $this->belongsTo(User::class, 'updatedby');
	}

	public function outgoingpayments()
	{
		return $this->hasMany(Outgoingpayment::class, 'outchannelid');
	}
}
