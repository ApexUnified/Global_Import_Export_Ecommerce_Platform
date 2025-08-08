<?php

namespace App\Repositories\Users\Repository;

use App\Models\Role;
use App\Models\User;
use App\Repositories\Users\Interface\IUserRepository;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;

class UserRepository implements IUserRepository
{
    public function __construct(
        private User $user,
        private Role $role
    ) {}

    public function getSingleUser(string $id)
    {
        $user = $this->user->with(['roles', 'supplier'])->find($id);

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

    public function getAllUsers(Request $request)
    {
        $users = $this->user
            ->with(['roles'])
            ->when(! empty($request->input('search')), function ($query) use ($request) {
                $query->where(function ($query) use ($request) {
                    $query->where('name', 'like', '%'.$request->input('search').'%')
                        ->orWhere('email', 'like', '%'.$request->input('search').'%')
                        ->orWhere('phone', 'like', '%'.$request->input('search').'%')
                        ->orWhereHas('roles', function ($query) use ($request) {
                            $query->where('name', 'like', '%'.$request->input('search').'%');
                        });
                });
            })
            ->latest()
            ->paginate(10)->withQueryString();

        return $users;
    }

    public function storeUser(Request $request)
    {
        $validated_req = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'phone' => ['required', 'regex:/^\+\d+$/', 'unique:users,phone'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'role_id' => ['required', 'exists:roles,id'],
            'is_active' => ['required', 'boolean'],
        ], [
            'phone.regex' => 'The phone must be a valid phone number And Starting With + Country Code - Example: +8801xxxxxxxxx',
            'role_id.exists' => 'The selected role is invalid.',
            'role_id.required' => 'The Role Field Is Required.',

        ]);

        try {
            unset($validated_req['role_id']);

            $role = $this->role->where('id', $request->input('role_id'))->first();
            if (empty($role)) {
                throw new Exception('Something Went Wrong While Creating New User');
            }

            if ($role->name === 'Supplier') {
                $request->validate([
                    'company_name' => ['required', 'max:255'],
                ]);
            }

            $created = $this->user->create($validated_req);
            if (empty($created)) {
                throw new Exception('Something Went Wrong While Creating New User');
            }

            if ($role->name === 'Supplier') {
                $created->supplier()->create(['company_name' => $request->input('company_name')]);
            }

            $created->syncRoles($role->name);

            return [
                'status' => true,
                'message' => 'User Created Successfully',
            ];

        } catch (Exception $e) {
            return [
                'status' => false,
                'message' => $e->getMessage(),
            ];
        }
    }

    public function updateUser(Request $request, string $id)
    {

        $validated_req = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,'.$id],
            'phone' => ['required', 'regex:/^\+\d+$/', 'unique:users,phone,'.$id],
            ...(
                $request->filled('password')
                ||
                $request->filled('password_confirmation')
                ? ['password' => ['required', 'string', 'min:8', 'confirmed']]
                :
                []
            ),
            'role_id' => ['required', 'exists:roles,id'],
            'is_active' => ['required', 'boolean'],
        ], [
            'phone.regex' => 'The phone must be a valid phone number And Starting With + Country Code - Example: +8801xxxxxxxxx',
            'role_id.exists' => 'The selected role is invalid.',
            'role_id.required' => 'The Role Field Is Required.',

        ]);

        try {
            unset($validated_req['role_id']);

            $user = $this->getSingleUser($id);

            if (empty($user)) {
                throw new Exception('Something Went Wrong While Updating User');
            }

            $role = $this->role->where('id', $request->input('role_id'))->first();
            if (empty($role)) {
                throw new Exception('Something Went Wrong While Updating  User');
            }

            // Supplier Logic
            if ($role->name !== 'Supplier' && $user->supplier()->exists()) {
                $user->supplier()->delete();
            }

            if ($role->name === 'Supplier' && ! $user->supplier()->exists()) {
                $user->supplier()->create(['company_name' => $request->input('company_name')]);
            }

            if ($role->name === 'Supplier' && $user->supplier()->exists()) {
                $user->supplier()->update(['company_name' => $request->input('company_name')]);
            }
            // Supplier Logic

            $updated = $user->update($validated_req);

            if (! $updated) {
                throw new Exception('Something Went Wrong While updating User');
            }

            $user->syncRoles($role->name);

            return [
                'status' => true,
                'message' => 'User Updated Successfully',
            ];
        } catch (Exception $e) {
            return [
                'status' => false,
                'message' => $e->getMessage(),
            ];
        }
    }

    public function destroyUser(string $id)
    {
        try {
            $user = $this->getSingleUser($id);

            if (empty($user)) {
                throw new Exception('Something Went Wrong While Deleting User');
            }

            $deleted = $user->delete();

            if (! $deleted) {
                throw new Exception('Something Went Wrong While Deleting User');
            }

            return [
                'status' => true,
                'message' => 'User Deleted Successfully',
            ];
        } catch (Exception $e) {
            return [
                'status' => false,
                'message' => $e->getMessage(),
            ];
        }
    }

    public function destroyUserBySelection(Request $request)
    {
        try {
            $ids = $request->array('ids');

            if (blank($ids)) {
                throw new Exception('Something Went Wrong While Deleting User');
            }

            $deleted = $this->user->destroy($ids);

            if ($deleted !== count($ids)) {
                throw new Exception('Something Went Wrong While Deleting User');
            }

            return [
                'status' => true,
                'message' => 'User Deleted Successfully',
            ];
        } catch (Exception $e) {
            return [
                'status' => false,
                'message' => $e->getMessage(),
            ];
        }
    }

    public function getAllRoles()
    {
        return $this->role->all();
    }
}
