<?php

namespace App\Http\Livewire\Pages;

use Livewire\Component;
use Livewire\WithFileUploads;
use Illuminate\Support\Facades\Storage;
use App\Models\User;
use Jantinnerezo\LivewireAlert\LivewireAlert;

class UserProfile extends Component
{
    use LivewireAlert;
    use WithFileUploads;
    public $userid;
    public $profilePhoto;
    public User $user;
    

    public function render()
    {
        return view('livewire.pages.user-profile');
    }

    public function mount($userid)
    {
        $this->userid = $userid;
        $this->user = User::select('*')->where('id', $this->userid)->first();
        
    }

    // public function leaseToTenant()
    // {
    //     $this->validate();
    //     $this->alert('success', 'Space Leased!' , [
    //             'position' =>  'top-end', 
    //             'timer' =>  3000,  
    //             'toast' =>  true, 
    //     ]);
    // }

    public function save()
    {
        // if($this->profilePhoto->extension())
        // {
        //     $this->alert('success', $this->profilePhoto->extension() , [
        //         'position' =>  'top-end', 
        //         'timer' =>  3000,  
        //         'toast' =>  true, 
        //     ]);
        // }
        // else{
        //     $this->alert('error', 'Error' , [
        //         'position' =>  'top-end', 
        //         'timer' =>  3000,  
        //         'toast' =>  true, 
        //     ]);
        // }
        $fileName = $this->userid . '.' . $this->profilePhoto->extension();
       
        $this->profilePhoto->storeAs('public', $fileName);
            
        $this->user->profile_photo_path = $fileName;
        $saved = $this->user->save();
        if($saved)
        {
            $this->alert('success', 'Profile Photo Saved' , [
                'position' =>  'top-end', 
                'timer' =>  3000,  
                'toast' =>  true, 
            ]);
        }
        else{
            $this->alert('error', 'Profile Photo NOT Saved' , [
                'position' =>  'top-end', 
                'timer' =>  3000,  
                'toast' =>  true, 
            ]);
        }

        

    }
}
