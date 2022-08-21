<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

/**
 * Class User
 * 
 * @property int $id
 * @property string $firstname
 * @property string $email
 * @property Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $two_factor_secret
 * @property string|null $two_factor_recovery_codes
 * @property string|null $remember_token
 * @property int|null $current_team_id
 * @property string|null $profile_photo_path
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string $lastname
 * @property string|null $othernames
 * @property bool $sex
 * @property string $phone
 * @property bool $status
 * @property bool $archived
 * @property int $usercategoryid
 * 
 * @property Usercategory $usercategory
 * @property Collection|Inchannel[] $inchannels
 * @property Collection|Outchannel[] $outchannels
 * @property Collection|Property[] $properties
 * @property Collection|Space[] $spaces
 * @property Collection|Tenure[] $tenures
 * @property Collection|Userrole[] $userroles
 * @property Collection|Warning[] $warnings
 *
 * @package App\Models
 */
class User extends Authenticatable
{
	protected $table = 'users';
	public $timestamps = false;

	protected $casts = [
		'current_team_id' => 'int',
		'sex' => 'bool',
		'status' => 'bool',
		'archived' => 'bool',
		'usercategoryid' => 'int'
	];

	protected $dates = [
		'email_verified_at'
	];

	protected $hidden = [
		'password',
		'two_factor_secret',
		'remember_token'
	];

	protected $fillable = [
		'firstname',
		'email',
		'email_verified_at',
		'password',
		'two_factor_secret',
		'two_factor_recovery_codes',
		'remember_token',
		'current_team_id',
		'profile_photo_path',
		'lastname',
		'othernames',
		'sex',
		'phone',
		'status',
		'archived',
		'usercategoryid'
	];

	public function usercategory()
	{
		return $this->belongsTo(Usercategory::class, 'usercategoryid');
	}

	public function inchannels()
	{
		return $this->hasMany(Inchannel::class, 'updatedby');
	}

	public function outchannels()
	{
		return $this->hasMany(Outchannel::class, 'updatedby');
	}

	public function properties()
	{
		return $this->hasMany(Property::class, 'updatedby');
	}

	public function spaces()
	{
		return $this->hasMany(Space::class, 'tenantid');
	}

	public function tenures()
	{
		return $this->hasMany(Tenure::class, 'updatedby');
	}

	public function userroles()
	{
		return $this->hasMany(Userrole::class, 'userid');
	}

	public function warnings()
	{
		return $this->hasMany(Warning::class, 'updatedby');
	}
}
