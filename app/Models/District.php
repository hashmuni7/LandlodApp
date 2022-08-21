<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class District
 * 
 * @property int $districtid
 * @property string $district
 * 
 * @property Collection|Property[] $properties
 *
 * @package App\Models
 */
class District extends Model
{
	protected $table = 'districts';
	protected $primaryKey = 'districtid';
	public $timestamps = false;

	protected $fillable = [
		'district'
	];

	public function properties()
	{
		return $this->hasMany(Property::class, 'districtid');
	}
}
