<?php

namespace App\Repositories\Posts\Repository;

use App\Jobs\PostDestroyOnAWSJob;
use App\Jobs\PostStoreOnAWSJob;
use App\Jobs\PostUpdateOnAWSjob;
use App\Models\Post;
use App\Repositories\Posts\Interface\IPostRepository;
use App\Services\GoogleGeoCoderService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Str;

class PostRepository implements IPostRepository
{
    public function __construct(
        private Post $post,
        private GoogleGeoCoderService $googleGeoCoderService
    ) {}

    public function getAllPosts(Request $request)
    {
        $posts = $this->post->latest()->paginate(10);

        return $posts;
    }

    public function getSinglePostBySlug(string $slug)
    {
        $post = $this->post->where('slug', $slug)->first();

        return $post;
    }

    public function getSinglePostById(string $id)
    {
        $post = $this->post->find($id);

        return $post;
    }

    public function storePost(Request $request)
    {

        $validated_req = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'images' => ['nullable', 'max:35', 'array'],
            'videos' => ['nullable', 'max:5', 'array'],
            'tag' => ['nullable', 'string', 'max:50', 'starts_with:#', function ($attribute, $value, $fail) {
                if (str_contains($value, ',')) {
                    $fail('Only One Tag Allowed In The Post');
                }

                if (substr_count($value, '#') > 1 || str_contains($value, ' ') || str_contains($value, ',')) {
                    return $fail('Only one hashtag is allowed without spaces or commas.');
                }
            }],

            'post_type' => ['required', 'string', 'in:Review,Inquiry'],
            'status' => ['required', 'boolean'],
            'floor' => ['nullable', 'string'],
            'latitude' => ['nullable', 'numeric'],
            'longitude' => ['nullable', 'numeric'],
            'location_name' => ['nullable', 'string'],
            'status' => ['required', 'boolean'],
        ], [
            'images.max' => 'The :attribute field must not exceed 35 files.',
            'videos.max' => 'The :attribute field must not exceed 5 files.',
            'tag.max' => 'The :attribute field must not exceed 50 characters.',
            'tag.starts_with' => 'The :attribute field must start with #.',

        ]);

        $validator = Validator::make($request->allFiles(), [
            'images.*' => [
                'mimes:jpg,jpeg,png',
                'max:10240',
                'dimensions:min_width=1280,min_height=720,max_width=1920,max_height=1080',
            ],

            'videos.*' => [
                'mimes:mp4,mov,avi',
                'max:1048576',
            ],
        ], [
            'images.*.mimes' => 'Only JPG, JPEG, PNG, images are allowed.',
            'images.*.max' => 'Each image must not exceed 10MB.',
            'images.*.dimensions' => 'Each image must be at least 1280x720 pixels and not exceed 1920x1080 pixels.',
            'videos.*.mimes' => 'Only MP4, MOV, and AVI videos are allowed.',
            'videos.*.max' => 'Each video must not exceed 1GB.',

        ], [
            'images.*' => 'image',
            'videos.*' => 'video',
        ]);

        if ($validator->fails()) {
            throw ValidationException::withMessages([
                'file_error' => $validator->errors()->first(),
            ]);
        }

        try {

            $validated_req = array_filter($validated_req, function ($value, $key) {
                return ! in_array($key, ['images', 'videos']);
            }, ARRAY_FILTER_USE_BOTH);

            // Get Location Name  From Google Api Behalf Of Lat/lng
            if (empty($validated_req['location_name']) && ! empty($validated_req['latitude']) && ! empty($validated_req['longitude'])) {
                $response = $this->googleGeoCoderService->getLocationNameFromLatLng($validated_req['latitude'], $validated_req['longitude']);
                if ($response['status'] === false) {
                    throw new Exception($response['message']);
                }

                $validated_req['location_name'] = $response['place_name'] ?? 'No Location Name Found';
            }

            $post = $this->post->create($validated_req);
            if (empty($post)) {
                throw new Exception('Something Went Wrong While Creating Post');
            }

            if ($request->hasFile('images')) {
                $paths = [];

                foreach ($request->file('images') as $image) {
                    $new_name = time().uniqid().'-'.Str::random(10).'.'.$image->getClientOriginalExtension();
                    $tempPath = $image->storeAs('temp/uploads', $new_name, 'local');
                    $paths[] = $tempPath;
                }

                dispatch(new PostStoreOnAWSJob(['images' => $paths], $post));

            }

            if ($request->hasFile('videos')) {
                $paths = [];

                foreach ($request->file('videos') as $video) {
                    $new_name = time().uniqid().'-'.Str::random(10).'.'.$video->getClientOriginalExtension();
                    $tempPath = $video->storeAs('temp/uploads', $new_name, 'local');
                    $paths[] = $tempPath;
                }

                dispatch(new PostStoreOnAWSJob(['videos' => $paths], $post));
            }

            return [
                'status' => true,
                'message' => 'Post Created Successfully'.$request->hasFile('images') && $request->hasFile('videos') ? 'Please Wait While We Upload Your Files On Server' : '',
                'post' => $post,
            ];

        } catch (Exception $e) {
            return [
                'status' => false,
                'message' => $e->getMessage(),
            ];
        }
    }

    public function updatePost(Request $request, string $slug)
    {

        $validated_req = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'images' => ['nullable', 'max:35', 'array'],
            'videos' => ['nullable', 'max:5', 'array'],
            'tag' => ['nullable', 'string', 'max:50', 'starts_with:#', function ($attribute, $value, $fail) {
                if (str_contains($value, ',')) {
                    $fail('Only One Tag Allowed In The Post');
                }

                if (substr_count($value, '#') > 1 || str_contains($value, ' ') || str_contains($value, ',')) {
                    return $fail('Only one hashtag is allowed without spaces or commas.');
                }
            }],

            'post_type' => ['required', 'string', 'in:Review,Inquiry'],
            'status' => ['required', 'boolean'],
            'floor' => ['nullable', 'string'],
            'status' => ['required', 'boolean'],
        ], [
            'images.max' => 'The :attribute field must not exceed 35 files.',
            'videos.max' => 'The :attribute field must not exceed 5 files.',
            'tag.max' => 'The :attribute field must not exceed 50 characters.',
            'tag.starts_with' => 'The :attribute field must start with #.',

        ]);

        $validator = Validator::make($request->allFiles(), [
            'new_images.*' => [
                'mimes:jpg,jpeg,png',
                'max:10240',
                'dimensions:min_width=1280,min_height=720,max_width=1920,max_height=1080',
            ],

            'new_videos.*' => [
                'mimes:mp4,mov,avi',
                'max:1048576',
            ],
        ], [
            'new_images.*.mimes' => 'Only JPG, JPEG, PNG, images are allowed.',
            'new_images.*.max' => 'Each image must not exceed 10MB.',
            'new_images.*.dimensions' => 'Each image must be at least 1280x720 pixels and not exceed 1920x1080 pixels.',
            'new_videos.*.mimes' => 'Only MP4, MOV, and AVI videos are allowed.',
            'new_videos.*.max' => 'Each video must not exceed 1GB.',

        ], [
            'images.*' => 'image',
            'videos.*' => 'video',
        ]);

        if ($validator->fails()) {
            throw ValidationException::withMessages([
                'file_error' => $validator->errors()->first(),
            ]);
        }

        try {

            $post = $this->getSinglePostBySlug($slug);

            if (empty($post)) {
                throw new Exception('Post Not Found');
            }

            $validated_req = array_filter($validated_req, function ($value, $key) {
                return ! in_array($key, ['images', 'videos']);
            }, ARRAY_FILTER_USE_BOTH);

            if ($request->filled('deleted_images')) {
                $deleted = $request->array('deleted_images');
                $deleted_image_urls = array_map(function ($deletedItem) {
                    return $deletedItem['url'] ?? null;
                }, $deleted);

                dispatch(new PostDestroyOnAWSJob(['images' => $deleted_image_urls]));

                $oldImages = $post->images ?? [];

                $remeaning_images = array_filter($oldImages, function ($image) use ($deleted) {
                    return ! in_array($image, $deleted);
                });

                $remaining_images_array = array_values($remeaning_images);

                $validated_req['images'] = $remaining_images_array;
            }

            if ($request->filled('deleted_videos')) {
                $deleted = $request->array('deleted_videos');
                $deleted_video_urls = array_map(function ($deletedItem) {
                    return $deletedItem['url'] ?? null;
                }, $deleted);

                dispatch(new PostDestroyOnAWSJob(['videos' => $deleted_video_urls]));

                $old_videos = $post->videos ?? [];

                $remeaning_videos = array_filter($old_videos, function ($video) use ($deleted) {
                    return ! in_array($video, $deleted);
                });

                $remaining_videos_array = array_values($remeaning_videos);

                $validated_req['videos'] = $remaining_videos_array;
            }

            $updated = $post->update($validated_req);

            if (! $updated) {
                throw new Exception('Something Went Wrong While Updating Post');
            }

            if ($request->hasFile('new_images')) {
                $paths = [];

                foreach ($request->file('new_images') as $image) {
                    $new_name = time().uniqid().'-'.Str::random(10).'.'.$image->getClientOriginalExtension();
                    $tempPath = $image->storeAs('temp/uploads', $new_name, 'local');
                    $paths[] = $tempPath;
                }

                dispatch(new PostUpdateOnAWSjob(['images' => $paths], $post));

            }

            if ($request->hasFile('new_videos')) {
                $paths = [];

                foreach ($request->file('new_videos') as $video) {
                    $new_name = time().uniqid().'-'.Str::random(10).'.'.$video->getClientOriginalExtension();
                    $tempPath = $video->storeAs('temp/uploads', $new_name, 'local');
                    $paths[] = $tempPath;
                }

                dispatch(new PostUpdateOnAWSjob(['videos' => $paths], $post));
            }

            $post->refresh();

            return [
                'status' => true,
                'message' => 'Post Updated Successfully '.$request->hasFile('images') && $request->hasFile('videos') ? 'Please Wait While We Upload Your Files On Server' : '',
                'post' => $post,
            ];

        } catch (Exception $e) {
            return [
                'status' => false,
                'message' => $e->getMessage(),
            ];
        }
    }

    public function destroyPost(string $id)
    {
        try {
            $post = $this->getSinglePostById($id);

            if (empty($post)) {
                throw new Exception('Post Not Found');
            }

            if (! blank($post->post_image_urls)) {
                dispatch(new PostDestroyOnAWSJob(['images' => $post->post_image_urls]));
            }

            if (! blank($post->post_video_urls)) {
                dispatch(new PostDestroyOnAWSJob(['videos' => $post->post_video_urls]));
            }

            $deleted = $post->delete();

            if (! $deleted) {
                throw new Exception('Something Went Wrong While Deleting Post');
            }

            return [
                'status' => true,
                'message' => 'Post Deleted Successfully',
            ];

        } catch (Exception $e) {
            return [
                'status' => false,
                'message' => $e->getMessage(),
            ];
        }
    }

    public function destroyPostBySelection(Request $request)
    {
        try {

            $ids = $request->array('ids');
            if (blank($ids)) {
                throw new Exception('Please Select Atleast One Post');
            }

            $posts = $this->post->whereIn('id', $ids)->get();
            if ($posts->isEmpty()) {
                throw new Exception('Given Post Ids Are incorrect');
            }

            foreach ($posts as $post) {
                if (! blank($post->post_image_urls)) {
                    dispatch(new PostDestroyOnAWSJob(['images' => $post->post_image_urls]));
                }

                if (! blank($post->post_video_urls)) {
                    dispatch(new PostDestroyOnAWSJob(['videos' => $post->post_video_urls]));
                }

                $post->delete();
            }

            return [
                'status' => true,
                'message' => 'Posts Deleted Successfully',
            ];

        } catch (Exception $e) {
            return [
                'status' => false,
                'message' => $e->getMessage(),
            ];
        }
    }

    public function autoCompleteLocations(Request $request)
    {

        try {
            $response = $this->googleGeoCoderService->autoCompleteLocations($request);
            if ($response['status'] === false) {
                throw new Exception($response['message']);
            }

            return [
                'status' => true,
                'data' => $response['data'],
            ];

        } catch (Exception $e) {
            return [
                'status' => false,
                'message' => $e->getMessage(),
            ];
        }

    }

    public function placeDetails(string $placeId)
    {
        try {

            $response = $this->googleGeoCoderService->placeDetails($placeId);
            if ($response['status'] === false) {
                throw new Exception($response['message']);
            }

            return [
                'status' => true,
                'data' => ['lat' => $response['data']['lat'], 'lng' => $response['data']['lng'], 'place_name' => $response['data']['place_name'], 'formatted_address' => $response['data']['formatted_address']],
            ];

        } catch (Exception $e) {
            return [
                'status' => false,
                'message' => $e->getMessage(),
            ];
        }
    }
}
