<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Menu
 * 
 * @property int $menuid
 * @property int|null $parentid
 * @property string $menu
 * @property string $menuurl
 * @property int $parentrank
 * @property int $childrank
 * 
 * @property Collection|Accessmenu[] $accessmenus
 *
 * @package App\Models
 */
class Menu extends Model
{
	protected $table = 'menus';
	protected $primaryKey = 'menuid';
	public $timestamps = false;

	protected $casts = [
		'parentid' => 'int',
		'parentrank' => 'int',
		'childrank' => 'int'
	];

	protected $fillable = [
		'parentid',
		'menu',
		'menuurl',
		'parentrank',
		'childrank'
	];

	public function accessmenus()
	{
		return $this->hasMany(Accessmenu::class, 'menuid');
	}
}
