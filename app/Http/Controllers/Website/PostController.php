<?php

namespace App\Http\Controllers\Website;

use App\Http\Controllers\Controller;
use App\Repositories\Posts\Interface\IPostRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    public function __construct(
        private IPostRepository $post
    ) {}

    public function index(Request $request)
    {

        $data = $this->post->getPostsForWebsite($request);

        $all_posts = $data['posts'];
        $next_page_url = $data['next_page_url'];

        // return $posts;

        return Inertia::render('Website/Posts/index', compact('all_posts', 'next_page_url'));
    }

    public function getMorePosts(Request $request)
    {
        if (! $request->has('page')) {
            return back();
        }

        $posts = $this->post->getInfinityScrollablePostsForWebsite($request);

        return response()->json([
            'status' => true,
            'posts' => $posts['posts'],
            'next_page_url' => $posts['next_page_url'],
        ]);
    }

    public function bookmark(Request $request)
    {
        $bookmarked = $this->post->toggleBookmark($request);

        if ($bookmarked['status'] === false) {
            return back()->with('error', $bookmarked['message']);
        }

        return back()->with('success', $bookmarked['message']);
    }

    public function getSinglePostBySlug(?string $slug = null)
    {

        if (empty($slug)) {
            return response()->json(['status' => false]);
        }

        $post = $this->post->getSinglePostBySlug($slug);

        if (empty($post)) {
            return response()->json(['status' => false]);
        }

        return response()->json(['status' => true, 'post' => $post]);
    }
}
