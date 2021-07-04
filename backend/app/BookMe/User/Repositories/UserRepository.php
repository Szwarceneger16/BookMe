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

    public function getUserWithClient($user)
    {
        return [
            'id'=>$user->id,
            'first_name'=>$user->first_name,
            'last_name'=>$user->last_name,
            'email'=>$user->email,
            'phone'=>$user->phone,
            'account_type'=>$user->account_type,
            'client_id'=>$user->client->id ?? null,
        ];
    }
    public function getUserWithEmployee($user)
    {
        return [
            'id'=>$user->id,
            'first_name'=>$user->first_name,
            'last_name'=>$user->last_name,
            'email'=>$user->email,
            'phone'=>$user->phone,
            'account_type'=>$user->account_type,
            'employee_id'=>$user->employee->id ?? null,
            'job_title'=>$user->employee->job_title ?? null,
        ];
    }

}
