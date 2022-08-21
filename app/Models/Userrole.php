<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Userrole
 * 
 * @property int $userroleid
 * @property int $userid
 * @property int $usercategoryid
 * 
 * @property User $user
 * @property Usercategory $usercategory
 *
 * @package App\Models
 */
class Userrole extends Model
{
	protected $table = 'userroles';
	protected $primaryKey = 'userroleid';
	public $timestamps = false;

	protected $casts = [
		'userid' => 'int',
		'usercategoryid' => 'int'
	];

	protected $fillable = [
		'userid',
		'usercategoryid'
	];

	public function user()
	{
		return $this->belongsTo(User::class, 'userid');
	}

	public function usercategory()
	{
		return $this->belongsTo(Usercategory::class, 'usercategoryid');
	}
}
