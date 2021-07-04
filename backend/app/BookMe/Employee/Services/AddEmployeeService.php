<?php


namespace App\BookMe\Employee\Services;


use App\BookMe\Employee\Repositories\EmployeeRepository;
use App\BookMe\User\Enums\AccountType;
use App\BookMe\User\Repositories\UserRepository;
use App\BookMe\Utility\Response;
use App\Models\Employee;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

class AddEmployeeService
{
    private UserRepository $userRepository;
    private EmployeeRepository $employeeRepository;

    public function __construct(UserRepository $userRepository,
                                EmployeeRepository $employeeRepository)
    {
        $this->userRepository = $userRepository;
        $this->employeeRepository = $employeeRepository;
    }

    public function execute(array $request): JsonResponse
    {

        try {
            $userObject = $this->prepareUserObject($request);
            $user=$this->userRepository->addUser($userObject);
            $user->account_type=$request['account_type'];
            $user->save();
            $employee=new Employee;
            $employee->job_title=$request['job_title'];
            $employee->user()->associate($user)->save();
            return Response::build($user, 200, "msg/success.create");
        } catch (Exception $e) {
            return Response::build([], 400, "msg/error.create");
        }
    }

    private function prepareUserObject($request): array
    {
        return array_merge(
            $request,
            ['password' => Hash::make($request['password'])]
        );
    }
}
