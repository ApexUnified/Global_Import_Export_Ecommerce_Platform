<?php

namespace App\Http\Controllers;

use App\Repositories\Categories\Interface\ICategoryRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function __construct(
        private ICategoryRepository $category
    ) {}

    public function index(Request $request)
    {
        $categories = $this->category->getAllCategories($request);
        $search = $request->input('search');

        return Inertia::render('Dashboard/Categories/index', compact('categories', 'search'));
    }

    public function create()
    {
        return Inertia::render('Dashboard/Categories/create');
    }

    public function store(Request $request)
    {
        $created = $this->category->storeCategory($request);

        if ($created['status'] === false) {
            return back()->with('error', $created['message']);
        }

        return to_route('dashboard.categories.index')->with('success', $created['message']);
    }

    public function show(string $id)
    {
        if (empty($id)) {
            return back()->with('error', 'Category ID Not found');
        }

        $category = $this->category->getSingleCategory($id);

        if (empty($category)) {
            return back()->with('error', 'Category Not found');
        }

        return Inertia::render('Dashboard/Categories/show', compact('category'));
    }

    public function edit(string $id)
    {
        if (empty($id)) {
            return back()->with('error', 'Category ID Not found');
        }

        $category = $this->category->getSingleCategory($id);

        if (empty($category)) {
            return back()->with('error', 'Category Not found');
        }

        return Inertia::render('Dashboard/Categories/edit', compact('category'));
    }

    public function update(Request $request, string $id)
    {
        if (empty($id)) {
            return back()->with('error', 'Category ID Not found');
        }

        $updated = $this->category->updateCategory($request, $id);

        if ($updated['status'] === false) {
            return back()->with('error', $updated['message']);
        }

        return to_route('dashboard.categories.index')->with('success', $updated['message']);
    }

    public function destroy(string $id)
    {
        if (empty($id)) {
            return back()->with('error', 'Category ID Not found');
        }

        $deleted = $this->category->destroyCategory($id);

        if ($deleted['status'] === false) {
            return back()->with('error', $deleted['message']);
        }

        return back()->with('success', $deleted['message']);
    }

    public function destroyBySelection(Request $request)
    {
        $deleted = $this->category->destroyCategoryBySelection($request);

        if ($deleted['status'] === false) {
            return back()->with('error', $deleted['message']);
        }

        return back()->with('success', $deleted['message']);
    }
}
