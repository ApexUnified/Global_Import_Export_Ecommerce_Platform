<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Repositories\Floors\Interface\IFloorRepostitory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FloorController extends Controller
{
    public function __construct(
        private IFloorRepostitory $floor
    ) {}

    public function index(Request $request)
    {
        $floors = $this->floor->getAllFloors($request);

        $search = $request->input('search');

        return Inertia::render('Dashboard/Floors/index', compact('floors', 'search'));
    }

    public function create()
    {
        return Inertia::render('Dashboard/Floors/create');

    }

    public function store(Request $request)
    {
        $created = $this->floor->storeFloor($request);

        if ($created['status'] === false) {
            return back()->with('error', $created['message']);
        }

        return to_route('dashboard.floors.index')->with('success', $created['message']);
    }

    public function edit(string $id)
    {
        if (empty($id)) {
            return back()->with('error', 'Floor ID Not Found');
        }

        $floor = $this->floor->getSingleFloor($id);

        if (empty($floor)) {
            return back()->with('error', 'Floor Not Found');
        }

        return Inertia::render('Dashboard/Floors/edit', compact('floor'));
    }

    public function update(Request $request, string $id)
    {
        if (empty($id)) {
            return back()->with('error', 'Floor ID Not Found');
        }

        $updated = $this->floor->updateFloor($request, $id);

        if ($updated['status'] === false) {
            return back()->with('error', $updated['message']);
        }

        return to_route('dashboard.floors.index')->with('success', $updated['message']);
    }

    public function destroy(string $id)
    {
        if (empty($id)) {
            return back()->with('error', 'Floor ID Not Found');
        }

        $deleted = $this->floor->destroyFloor($id);
        if ($deleted['status'] === false) {
            return back()->with('error', $deleted['message']);
        }

        return back()->with('success', $deleted['message']);
    }

    public function destroyBySelection(Request $request)
    {
        $deleted = $this->floor->destroyFloorBySelection($request);
        if ($deleted['status'] === false) {
            return back()->with('error', $deleted['message']);
        }

        return back()->with('success', $deleted['message']);
    }
}
