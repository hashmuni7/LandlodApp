<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Accessmenu
 * 
 * @property int $menuaccessid
 * @property int $usercategoryid
 * @property int $menuid
 * 
 * @property Menu $menu
 * @property Usercategory $usercategory
 *
 * @package App\Models
 */
class Accessmenu extends Model
{
	protected $table = 'accessmenu';
	protected $primaryKey = 'menuaccessid';
	public $timestamps = false;

	protected $casts = [
		'usercategoryid' => 'int',
		'menuid' => 'int'
	];

	protected $fillable = [
		'usercategoryid',
		'menuid'
	];

	public function menu()
	{
		return $this->belongsTo(Menu::class, 'menuid');
	}

	public function usercategory()
	{
		return $this->belongsTo(Usercategory::class, 'usercategoryid');
	}
}
