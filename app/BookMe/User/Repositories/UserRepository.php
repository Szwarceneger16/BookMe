<?php


namespace App\BookMe\User\Repositories;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;


class UserRepository
{
    protected $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function addUser($data)
    {
        return $this->user->create($data);
    }

    public function getAuthUserInfo(){
        $current_user = Auth::user();
        if (isset($current_user)){
            $current_user_object = $this->user->where('id', $current_user->id)->get([
                'first_name',
                'last_name',
                'email',
            ])[0];
            return $current_user_object;
        }
        else {
            return null;
        }
    }
}
