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

    public function getUserId(): int
    {
        return $this->user->where('id', Auth::id())->select('id')->first();
    }

    public function getUserData(): Model
    {
        return $this->user->find(Auth::id());
    }

    public function getUserStatus(): object
    {
        return $this->user->where('id', Auth::id())->select('status')->first();
    }

    public function updateData($data): bool
    {
        $user = $this->getUserData();
        $user->phone = $data['phone'] ?? $user->phone;;
        $user->email = $data['email'] ?? $user->email;
        return $user->save();
    }

    public function findOrFailUser(): object
    {
        return $this->user->findOrFail(Auth::id());
    }


}
