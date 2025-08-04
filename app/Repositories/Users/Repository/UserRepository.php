<?php

namespace App\Repositories\Users\Repository;

use App\Models\User;
use App\Repositories\Users\Interface\IUserRepository;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;

class UserRepository implements IUserRepository
{
    public function __construct(
        private User $user
    ) {}

    public function getSingleUser(string $id)
    {
        $user = $this->user->find($id);

        return $user;
    }

    public function updateProfile(Request $request)
    {
        $validated_req = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email,'.$request->user()->id,
            'phone' => 'required|regex:/^\+\d+$/|unique:users,phone,'.$request->user()->id,
        ], [
            'phone.regex' => 'The phone must be a valid phone number And Starting With + Country Code - Example: +8801xxxxxxxxx',
        ]);

        try {

            $throttleKey = 'profile_update_'.$request->user()->id;
            if (RateLimiter::tooManyAttempts($throttleKey, 3)) {
                $seconds = RateLimiter::availableIn($throttleKey);

                throw new Exception('Too many attempts. Try again After '.ceil($seconds / 60).' minutes.');
            }

            RateLimiter::hit($throttleKey, 900);

            $user = $this->getSingleUser($request->user()->id);
            if (empty($user)) {
                throw new Exception('Something Went Wrong While Updating Profile');
            }

            $user->fill($validated_req);

            if ($user->isDirty('email')) {
                $user->email_verified_at = null;
            }

            if ($user->save()) {
                return [
                    'status' => true,
                    'message' => 'Profile Updated Successfully',
                ];
            }

            throw new Exception('Something Went Wrong While Updating Profile');
        } catch (Exception $e) {
            return [
                'status' => false,
                'message' => $e->getMessage(),
            ];
        }
    }

    public function updatePassword(Request $request)
    {
        $validated_req = $request->validate([
            'current_password' => 'required|current_password',
            'password' => 'required|min:8',
            'password_confirmation' => 'required|same:password',
        ]);

        try {

            $throttleKey = 'password_update_'.$request->user()->id;
            if (RateLimiter::tooManyAttempts($throttleKey, 1)) {
                $seconds = RateLimiter::availableIn($throttleKey);

                throw new Exception('Too many attempts. Try again After '.ceil($seconds / 60).' minutes.');
            }

            RateLimiter::hit($throttleKey, 900);

            $user = $this->getSingleUser($request->user()->id);

            if (empty($user)) {
                throw new Exception('Something Went Wrong While Updating Profile');
            }

            if ($user->update(['password' => bcrypt($request->password)])) {
                return [
                    'status' => true,
                    'message' => 'Password Updated Successfully',
                ];
            }

            throw new Exception('Something Went Wrong While Updating Password');
        } catch (Exception $e) {
            return [
                'status' => false,
                'message' => $e->getMessage(),
            ];
        }
    }

    public function destroyAccount(Request $request)
    {
        $request->validate([
            'current_password' => 'required|current_password',
        ]);

        try {

            $user = $this->getSingleUser($request->user()->id);

            if (empty($user)) {
                throw new Exception('Something Went Wrong While Updating Profile');
            }

            if ($user->delete()) {
                return [
                    'status' => true,
                    'message' => 'Account Deleted Successfully',
                ];
            }

            throw new Exception('Something Went Wrong While Deleting Account');
            throw new Exception('Something Went Wrong While Updating Password');
        } catch (Exception $e) {
            return [
                'status' => false,
                'message' => $e->getMessage(),
            ];
        }

    }
}
