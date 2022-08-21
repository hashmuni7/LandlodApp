<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Property
 * 
 * @property int $propertyid
 * @property string $property
 * @property int $districtid
 * @property string $city
 * @property string $address
 * @property string|null $spotcode
 * @property int $userid
 * @property int $graceperiod
 * @property float $latefee
 * @property bool $latecharge
 * @property string $phonenumber
 * @property int $createdby
 * @property Carbon $createdon
 * @property int $updatedby
 * 
 * @property District $district
 * @property User $user
 * @property Collection|Space[] $spaces
 *
 * @package App\Models
 */
class Property extends Model
{
	protected $table = 'propertys';
	protected $primaryKey = 'propertyid';
	public $timestamps = false;

	protected $casts = [
		'districtid' => 'int',
		'userid' => 'int',
		'graceperiod' => 'int',
		'latefee' => 'float',
		'latecharge' => 'bool',
		'createdby' => 'int',
		'updatedby' => 'int'
	];

	protected $dates = [
		'createdon'
	];

	protected $fillable = [
		'property',
		'districtid',
		'city',
		'address',
		'spotcode',
		'userid',
		'graceperiod',
		'latefee',
		'latecharge',
		'phonenumber',
		'createdby',
		'createdon',
		'updatedby'
	];

	public function district()
	{
		return $this->belongsTo(District::class, 'districtid');
	}

	public function user()
	{
		return $this->belongsTo(User::class, 'updatedby');
	}

	public function spaces()
	{
		return $this->hasMany(Space::class, 'propertyid');
	}
}
