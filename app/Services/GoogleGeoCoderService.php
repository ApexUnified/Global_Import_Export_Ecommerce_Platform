<?php

namespace App\Services;

use Http;
use Illuminate\Http\Request;

class GoogleGeoCoderService
{
    public string $apiKey;

    public function __construct(

    ) {
        $this->apiKey = config('services.google_maps_api_key');
    }

    public function getAddressFromLatLng(string $lat, string $lng)
    {

        $url = "https://maps.googleapis.com/maps/api/geocode/json?latlng={$lat},{$lng}&key={$this->apiKey}";
        $response = Http::get($url);

        if ($response->failed()) {
            return ['status' => false, 'message' => 'Something went wrong While Fetching Address'];
        }

        $data = $response->json();

        return ['status' => true, 'data' => $data];
    }

    public function autoCompleteLocations(Request $request)
    {

        $url = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input={$request->get('search')}&key={$this->apiKey}";
        $response = Http::get($url);

        if ($response->failed()) {
            return ['status' => false, 'message' => 'Something went wrong While Fetching Address'];
        }

        $data = $response->json();

        return ['status' => true, 'data' => $data];
    }

    public function placeDetails(string $placeId)
    {
        $url = "https://maps.googleapis.com/maps/api/place/details/json?place_id={$placeId}&key={$this->apiKey}";
        $response = Http::get($url);

        if ($response->failed()) {
            return ['status' => false, 'message' => 'Something went wrong While Fetching Address'];
        }

        $data = $response->json();

        return ['status' => true, 'data' => ['lat' => $data['result']['geometry']['location']['lat'], 'lng' => $data['result']['geometry']['location']['lng']]];
    }
}
