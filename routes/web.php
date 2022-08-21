<?php
use App\Http\Livewire\Dashboard;
use App\Http\Livewire\Pages\AddPropertyToLandlord;
use App\Http\Livewire\Pages\AddSpaceToLandlord;
use App\Http\Livewire\Pages\AddSpaceToProperty;
use App\Http\Livewire\Pages\AddTenantToLandlord;
use App\Http\Livewire\Pages\AddTenantToProperty;
use App\Http\Livewire\Pages\EditProperty;
use Illuminate\Support\Facades\Route;
use App\Http\Livewire\Pages\Landlords;
use App\Http\Livewire\Pages\SingleLandlord;
use App\Http\Livewire\Pages\EditLandlord;
use App\Http\Livewire\Pages\SingleSpace;
use App\Http\Livewire\Pages\ChangeTenant;
use App\Http\Livewire\Pages\LeaseToRegisteredTenant;
use App\Http\Livewire\Pages\UserProfile;
use App\Http\Livewire\Pages\SingleProperty;
use App\Http\Livewire\Pages\Spaces;
use App\Http\Livewire\Tables\Payments;
use App\Http\Livewire\Pages\Properties;
use App\Http\Livewire\Tester\TestPayment;
use App\Http\Livewire\Trial;

use App\Http\Controllers\Logic\USSDPayments;


// Guest Route Classes
use App\Http\Controllers\Guest\AboutUs;
use App\Http\Controllers\Guest\Services;
use App\Http\Controllers\Guest\Contact;
use App\Http\Controllers\Guest\Blog;
//use App\Http\Livewire\Guest\AboutUs;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
})->name('home');

Route::get('/views/{pageNumber}', function ($pageNumber) {
    switch ($pageNumber){
        case 1: 
            return view('common.login');

        case 201: 
            return view('admin.landlords');

        case 202: 
            return view('admin.properties');

        case 203: 
            return view('admin.tenants');

        case 204: 
            return view('admin.spaces');

        case 207: 
            return view('admin.singlelandlord');

        case 208: 
            return view('admin.editlandlord');

        case 209: 
            return view('admin.editproperty');

        case 210: 
            return view('admin.singleproperty');

        case 211: 
            return view('admin.addspace');

        case 212: 
            return view('admin.addtenant');

        case 213: 
            return view('admin.singlespace');

        case 214: 
            return view('admin.payments');

        case 301: 
            return view('landlord.properties');

        case 302: 
            return view('landlord.singleproperty');

        case 303: 
            return view('landlord.editproperty');

        case 304: 
            return view('landlord.addspace');

        case 305: 
            return view('landlord.addtenant');

        case 306: 
            return view('landlord.singlespace');

        case 307: 
            return view('landlord.spacehistory');

        case 400: 
            return view('tenants.dash');
        
        case 401: 
            return view('tenants.myspaces');

        case 402: 
            return view('tenants.singlespace');

        case 403: 
            return view('tenants.profile');

        case 404: 
            return view('tenants.oldspaces'); 

        default: 
            return 'Page Not Found';    
    }
    
    
});

Route::middleware(['auth:sanctum', 'verified'])->get('/dashboard', Dashboard::class)->name('dashboard');

Route::post('/paymentussd', [USSDPayments::class, 'handleRequest']);
Route::group(['middleware' => 'auth:sanctum'],function(){
    Route::get('/landlords', Landlords::class)->name('landlords');
    Route::get('/try', Trial::class);

    Route::get('/landlords/{landlordid}', SingleLandlord::class);
    Route::get('/landlords/landlord/editlandlord/{landlordid}', EditLandlord::class);
    Route::post('/landlords/landlord/editlandlord', [EditLandlord::class, 'sendForm'])->name('checkform');
    Route::get('/landlords/landlord/addproperty/{landlordid}', AddPropertyToLandlord::class);
    Route::get('/landlords/landlord/addspace/{landlordid}', AddSpaceToLandlord::class);
    Route::get('/landlords/landlord/addtenant/{landlordid}', AddTenantToLandlord::class);
    Route::get('/spaces/space/{spaceid}', SingleSpace::class);
    Route::get('/spaces/space/changetenant/{spaceid}', ChangeTenant::class);
    Route::get('/spaces/space/leasetenant/{spaceid}', LeaseToRegisteredTenant::class);

    Route::get('/properties', Properties::class)->name('properties');
    Route::get('/properties/property/{propertyid}', SingleProperty::class);
    Route::get('/properties/property/edit/{propertyid}', EditProperty::class);
    Route::get('/properties/property/addspace/{propertyid}', AddSpaceToProperty::class);
    Route::get('/properties/property/addtenant/{propertyid}', AddTenantToProperty::class);

    Route::get('/spaces', Spaces::class)->name('spaces');

    Route::get('/payments', Payments::class)->name('payments');
    Route::get('/payments/test', TestPayment::class)->name('test-payment');

    Route::get('/userprofile/{userid}', UserProfile::class);
});

Route::group(['middleware' => ['guest']], function(){
    
});

Route::get('/landlodcompany', [AboutUs::class])->name('company');
Route::get('/company', [AboutUs::class, 'index'])->name('company');
Route::get('/services', [Services::class, 'index'])->name('services');
Route::get('/blog', [Blog::class, 'index'])->name('blog');
Route::get('/contact', [Contact::class, 'index'])->name('contact');

