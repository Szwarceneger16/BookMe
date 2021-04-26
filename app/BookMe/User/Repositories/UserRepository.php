<?php


namespace App\BookMe\User\Repositories;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;


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

    public function getAuthUser()
    {
        return $this->user->find(Auth::id());
    }

    public function updatePassword(object $user, $request)
    {
        return $this->user->where('id',$user->id)->update(['password'=> Hash::make($request['password'])]);
    }

    public function updateData($user,$request)
    {
        return $this->user->where('id',$user->id)->update([
            'email'=>$request['email'],
            'phone'=>$request['phone']
            ]);
    }

}
