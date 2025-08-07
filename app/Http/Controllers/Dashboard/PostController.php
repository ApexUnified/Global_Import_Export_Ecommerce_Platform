<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Repositories\Floors\Interface\IFloorRepostitory;
use App\Repositories\Posts\Interface\IPostRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    public function __construct(
        private IPostRepository $post,
        private IFloorRepostitory $floor
    ) {}

    public function index(Request $request)
    {

        $posts = $this->post->getAllPosts($request);

        return Inertia::render('Dashboard/Posts/index', compact('posts'));
    }

    public function create()
    {

        $floors = $this->floor->getAllWithoutPaginateFloors();

        return Inertia::render('Dashboard/Posts/create', compact('floors'));
    }

    public function store(Request $request)
    {

        $created = $this->post->storePost($request);
        if ($created['status'] === false) {
            return back()->with('error', $created['message']);
        }

        return to_route('dashboard.posts.index')->with('success', $created['message']);
    }

    public function show(string $slug)
    {
        if (empty($slug)) {
            return back()->with('error', 'Slug Not Found');
        }

        $post = $this->post->getSinglePostBySlug($slug);

        if (empty($post)) {
            return back()->with('error', 'Post Not Found');
        }

        return Inertia::render('Dashboard/Posts/show', compact('post'));
    }

    public function edit(string $slug)
    {
        if (empty($slug)) {
            return back()->with('error', 'Slug Not Found');
        }

        $post = $this->post->getSinglePostBySlug($slug);

        if (empty($post)) {
            return back()->with('error', 'Post Not Found');
        }

        $floors = $this->floor->getAllWithoutPaginateFloors();

        return Inertia::render('Dashboard/Posts/edit', compact('post', 'floors'));
    }

    public function update(Request $request, string $slug)
    {
        if (empty($slug)) {
            return back()->with('error', 'Slug Not Found');
        }

        $updated = $this->post->updatePost($request, $slug);

        if ($updated['status'] === false) {
            return back()->with('error', $updated['message']);
        }

        return to_route('dashboard.posts.index')->with('success', $updated['message']);
    }

    public function destroy(string $id)
    {
        if (empty($id)) {
            return back()->with('error', 'Post ID Not Found');
        }

        $deleted = $this->post->destroyPost($id);

        if ($deleted['status'] === false) {
            return back()->with('error', $deleted['message']);
        }

        return back()->with('success', $deleted['message']);

    }

    public function destroyBySelection(Request $request)
    {
        $deleted = $this->post->destroyPostBySelection($request);

        if ($deleted['status'] === false) {
            return back()->with('error', $deleted['message']);
        }

        return back()->with('success', $deleted['message']);
    }

    public function googleLocationAutoComplete(Request $request)
    {

        $response = $this->post->autoCompleteLocations($request);

        if ($response['status'] === false) {
            return response()->json(['status' => false, 'message' => $response['message']], 400);
        }

        return response()->json(['status' => true, 'data' => $response['data']], 200);

    }

    public function googleLocationPlaceDetails(Request $request)
    {
        if (empty($request->input('place_id'))) {
            return response()->json(['status' => false, 'message' => 'Place ID Not Found'], 400);
        }

        $response = $this->post->placeDetails($request->input('place_id'));

        if ($response['status'] === false) {
            return response()->json(['status' => false, 'message' => $response['message']], 400);
        }

        return response()->json(['status' => true, 'data' => $response['data']], 200);
    }
}
