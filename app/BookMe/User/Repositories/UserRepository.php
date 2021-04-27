<?php


namespace App\BookMe\User\Repositories;

use App\BookMe\Reservation\Repositories\ReservationRepository;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;


class UserRepository
{
    protected $user;
    protected ReservationRepository $reservationRepository;

    public function __construct(User $user,
                                ReservationRepository $reservationRepository)
    {
        $this->user = $user;
        $this->reservationRepository = $reservationRepository;
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
        return $this->user->where('id',$user->id)->update(['password'=> Hash::make($request['new_password'])]);
    }

    public function updateData($user,$request)
    {
        return $this->user->where('id',$user->id)->update([
            'email'=>$request['email'],
            'phone'=>$request['phone']
            ]);
    }

    public function userReservationsCount($user)
    {
        return Reservation::where('client_id', $user->id)->get()->count();
    }

}
