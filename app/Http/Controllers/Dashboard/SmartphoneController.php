<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Repositories\Smartphones\Interface\ISmartphoneRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SmartphoneController extends Controller
{
    public function __construct(
        private ISmartphoneRepository $smartphone
    ) {}

    public function index(Request $request)
    {
        $smartphones = $this->smartphone->getAllSmartphones($request);

        // return $smartphones;
        $search = $request->input('search');

        return Inertia::render('Dashboard/Smartphones/index', compact('smartphones', 'search'));
    }

    public function create()
    {
        $colors = $this->smartphone->getColors();
        $model_names = $this->smartphone->getModelNames();
        $capacities = $this->smartphone->getCapacities();

        return Inertia::render('Dashboard/Smartphones/create', compact('colors', 'model_names', 'capacities'));
    }

    public function store(Request $request)
    {

        $created = $this->smartphone->storeSmartphone($request);

        if ($created['status'] === false) {
            return back()->with('error', $created['message']);
        }

        return to_route('dashboard.smartphones.index')->with('success', $created['message']);

    }

    public function show(string $id)
    {
        if (empty($id)) {
            return back()->with('error', 'SmartPhone Id not found');
        }

        $smartphone = $this->smartphone->getSingleSmartphone($id);
        if (empty($smartphone)) {
            return back()->with('error', 'SmartPhone not found');
        }

        return Inertia::render('Dashboard/Smartphones/show', compact('smartphone'));
    }

    public function edit(string $id)
    {
        if (empty($id)) {
            return back()->with('error', 'SmartPhone Id not found');
        }

        $smartphone = $this->smartphone->getSingleSmartphone($id);
        if (empty($smartphone)) {
            return back()->with('error', 'SmartPhone not found');
        }

        $colors = $this->smartphone->getColors();
        $model_names = $this->smartphone->getModelNames();
        $capacities = $this->smartphone->getCapacities();

        return Inertia::render('Dashboard/Smartphones/edit', compact('smartphone', 'colors', 'model_names', 'capacities'));
    }

    public function update(Request $request, string $id)
    {

        if (empty($id)) {
            return back()->with('error', 'SmartPhone Id not found');
        }

        $updated = $this->smartphone->updateSmartphone($request, $id);
        if ($updated['status'] === false) {
            return back()->with('error', $updated['message']);
        }

        return to_route('dashboard.smartphones.index')->with('success', $updated['message']);
    }

    public function destroy(string $id)
    {
        if (empty($id)) {
            return back()->with('error', 'SmartPhone Id not found');
        }

        $smartphone = $this->smartphone->getSingleSmartphone($id);
        if (empty($smartphone)) {
            return back()->with('error', 'SmartPhone not found');
        }

        $deleted = $this->smartphone->destroySmartphone($id);
        if ($deleted['status'] === false) {
            return back()->with('error', $deleted['message']);
        }

        return back()->with('success', $deleted['message']);
    }

    public function destroyBySelection(Request $request)
    {
        $deleted = $this->smartphone->destroySmartphoneBySelection($request);

        if ($deleted['status'] === false) {
            return back()->with('error', $deleted['message']);
        }

        return back()->with('success', $deleted['message']);
    }
}
