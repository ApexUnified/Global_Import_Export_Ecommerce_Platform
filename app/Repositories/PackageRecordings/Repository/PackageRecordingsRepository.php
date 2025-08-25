<?php

namespace App\Repositories\PackageRecordings\Repository;

use App\Jobs\PackageVideoDestroyOnAWS;
use App\Jobs\PackageVideoStoreOnAWS;
use App\Jobs\PackageVideoUpdateOnAWS;
use App\Models\Order;
use App\Models\PackageRecording;
use App\Repositories\PackageRecordings\Interface\IPackageRecordingsRepository;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PackageRecordingsRepository implements IPackageRecordingsRepository
{
    public function __construct(
        private PackageRecording $package_recording,
        private Order $order
    ) {}

    public function getAllPackageRecordings(Request $request)
    {
        $package_recordings = $this->package_recording
            ->with(['order', 'order.customer.user'])
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return $package_recordings;
    }

    public function getSinglePackageRecording(string $id)
    {
        $package_recording = $this->package_recording
            ->with(['order'])
            ->find($id);

        return $package_recording;
    }

    public function storePackageRecording(Request $request)
    {
        $validated_req = $request->validate([
            'order_id' => ['required', 'exists:orders,id'],
            'package_video' => ['required', 'file', 'mimetypes:video/webm,video/mp4', 'max:10485760'],
        ], [
            'order_id.required' => 'The Order Field Is Required.',
            'order_id.exists' => 'The selected order is invalid.',
            'package_video.required' => 'The Package Video Field Is Required.',
            'package_video.file' => 'The Package Video Field Must Be A File.',
            'package_video.mimetypes' => 'The Package Video Field Must Be A Video File.',
            'package_video.max' => 'The Package Video Field Must Be Less Than 10GB.',
        ]);

        try {

            unset($validated_req['package_video']);
            $created = $this->package_recording
                ->create($validated_req);

            if (empty($created)) {
                throw new Exception('Something Went Wrong While Creating Package Recording');
            }

            $video = $request->file('package_video');
            $new_video_file = 'OPV-'.time().uniqid().'.'.$video->getClientOriginalExtension();
            $tempPath = 'temp/uploads/'.$new_video_file;

            Storage::disk('local')->put($tempPath, file_get_contents($video->getRealPath()));

            dispatch(new PackageVideoStoreOnAWS($tempPath, $created));

            return [
                'status' => true,
                'message' => 'Package Recording Created Successfully',
            ];

        } catch (Exception $e) {
            return [
                'status' => false,
                'message' => $e->getMessage(),

            ];
        }
    }

    // public function updatePackageRecording(Request $request, string $id)
    // {
    //     $validated_req = $request->validate([
    //         'order_id' => ['required', 'exists:orders,id'],
    //         ...($request->filled('package_video') ? ['package_video' => ['required', 'file', 'mimetypes:video/webm,video/mp4', 'max:10485760']] : []),
    //     ]);

    //     try {
    //         $package_recording = $this->package_recording->find($id);
    //         if (empty($package_recording)) {
    //             throw new Exception('Package Recording Not Found');
    //         }

    //         $updated = $package_recording->update($validated_req);

    //         if (! $updated) {
    //             throw new Exception('Something Went Wrong While Updating The Package Recording');
    //         }

    //         if ($request->hasFile('package_video')) {

    //             if (! empty($package_recording->package_video)) {
    //                 dispatch(new PackageVideoDestroyOnAWS($package_recording->package_video));
    //                 unset($validated_req['package_video']);
    //             }

    //             $video = $request->file('package_video');
    //             $new_video_file = 'OPV-'.time().uniqid().'.'.$video->getClientOriginalExtension();
    //             $tempPath = 'temp/uploads/'.$new_video_file;

    //             Storage::disk('local')->put($tempPath, (string) $video);

    //             dispatch(new PackageVideoUpdateOnAWS($tempPath, $package_recording));
    //         }

    //         return [
    //             'status' => true,
    //             'message' => 'Package Recording Updated Successfully',
    //         ];

    //     } catch (Exception $e) {
    //         return [
    //             'status' => false,
    //             'message' => $e->getMessage(),

    //         ];
    //     }
    // }

    public function destroyPackageRecording(string $id)
    {

        try {
            $package_recording = $this->package_recording->find($id);
            if (empty($package_recording)) {
                throw new Exception('Package Recording Not Found');
            }

            if (! empty($package_recording->package_video)) {
                dispatch(new PackageVideoDestroyOnAWS($package_recording->package_video));
            }

            $deleted = $package_recording->delete();

            if (! $deleted) {
                throw new Exception('Something Went Wrong While Deleting Package Recording');
            }

            return [
                'status' => true,
                'message' => 'Package Recording Deleted Successfully',
            ];
        } catch (Exception $e) {
            return [
                'status' => false,
                'message' => $e->getMessage(),

            ];
        }
    }

    public function destroyPackageRecordingBySelection(Request $request)
    {
        try {
            $ids = $request->array('ids');

            if (blank($ids)) {
                throw new Exception('Package Recording ID Not Found');
            }

            foreach ($ids as $id) {

                $response = $this->destroyPackageRecording($id);
                if ($response['status'] === false) {
                    throw new Exception($response['message']);
                }

            }

            return [
                'status' => true,
                'message' => 'Selected Package Recordings Deleted Successfully',
            ];

        } catch (Exception $e) {
            return [
                'status' => false,
                'message' => $e->getMessage(),

            ];
        }
    }

    public function getOrders()
    {
        return $this->order
            ->with(['customer.user'])
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'name' => $order->order_no.' - '.$order->customer->user->name,
                ];
            });
    }
}
