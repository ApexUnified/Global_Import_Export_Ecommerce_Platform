<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Repositories\Users\Interface\IUserRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function __construct(
        private IUserRepository $user
    ) {}

    public function index(Request $request)
    {
        $users = $this->user->getAllUsers($request);
        $search = $request->input('search');

        return Inertia::render('Dashboard/Users/index', compact('users', 'search'));
    }

    public function create()
    {
        $roles = $this->user->getAllRoles();

        return Inertia::render('Dashboard/Users/create', compact('roles'));
    }

    public function store(Request $request)
    {
        $created = $this->user->storeUser($request);

        if ($created['status'] === false) {
            return back()->with('error', $created['message']);
        }

        return to_route('dashboard.users.index')->with('success', $created['message']);
    }

    public function show(string $id)
    {

        if (empty($id)) {
            return back()->with('error', 'User ID Not Found');
        }

        $user = $this->user->getSingleUser($id);

        if (empty($user)) {
            return back()->with('error', 'User Not Found');
        }

        return Inertia::render('Dashboard/Users/show', compact('user'));
    }

    public function edit(string $id)
    {

        if (empty($id)) {
            return back()->with('error', 'User ID Not Found');
        }

        $user = $this->user->getSingleUser($id);
        if (empty($user)) {
            return back()->with('error', 'User Not Found');
        }

        $roles = $this->user->getAllRoles();

        return Inertia::render('Dashboard/Users/edit', compact('user', 'roles'));

    }

    public function update(Request $request, string $id)
    {

        if (empty($id)) {
            return back()->with('error', 'User ID Not Found');
        }

        $updated = $this->user->updateUser($request, $id);

        if ($updated['status'] === false) {
            return back()->with('error', $updated['message']);
        }

        return to_route('dashboard.users.index')->with('success', $updated['message']);
    }

    public function destroy(string $id)
    {
        if (empty($id)) {
            return back()->with('error', 'User ID Not Found');
        }

        $user = $this->user->getSingleUser($id);

        if (empty($user)) {
            return back()->with('error', 'User Not Found');
        }

        $deleted = $this->user->destroyUser($id);

        if ($deleted['status'] === false) {
            return back()->with('error', $deleted['message']);
        }

        return back()->with('success', $deleted['message']);
    }

    public function destroyBySelection(Request $request)
    {
        $deleted = $this->user->destroyUserBySelection($request);

        if ($deleted['status'] === false) {
            return back()->with('error', $deleted['message']);
        }

        return back()->with('success', $deleted['message']);
    }
}
