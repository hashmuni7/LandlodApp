<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Usercategory
 * 
 * @property int $usercategoryid
 * @property string $usercategory
 * 
 * @property Collection|Accessmenu[] $accessmenus
 * @property Collection|Userrole[] $userroles
 * @property Collection|User[] $users
 *
 * @package App\Models
 */
class Usercategory extends Model
{
	protected $table = 'usercategorys';
	protected $primaryKey = 'usercategoryid';
	public $timestamps = false;

	protected $fillable = [
		'usercategory'
	];

	public function accessmenus()
	{
		return $this->hasMany(Accessmenu::class, 'usercategoryid');
	}

	public function userroles()
	{
		return $this->hasMany(Userrole::class, 'usercategoryid');
	}

	public function users()
	{
		return $this->hasMany(User::class, 'usercategoryid');
	}
}
