<?php
function validateLocation($latitude, $longitude, $allowedLatitude, $allowedLongitude, $radius) {
    $earthRadius = 6371; // Radius bumi dalam kilometer

    $latDiff = deg2rad($allowedLatitude - $latitude);
    $lonDiff = deg2rad($allowedLongitude - $longitude);

    $a = sin($latDiff / 2) * sin($latDiff / 2) +
         cos(deg2rad($latitude)) * cos(deg2rad($allowedLatitude)) *
         sin($lonDiff / 2) * sin($lonDiff / 2);
    $c = 2 * atan2(sqrt($a), sqrt(1 - $a));

    $distance = $earthRadius * $c;

    return $distance <= $radius;
}

$latitude = $_POST['latitude'];
$longitude = $_POST['longitude'];
$allowedLatitude = -6.3233323; // Ganti dengan latitude lokasi yang diizinkan
$allowedLongitude = 107.2983415; // Ganti dengan longitude lokasi yang diizinkan
$radius = 0.5; // Radius dalam kilometer (misalnya 0.5 km = 500 meter)

if (validateLocation($latitude, $longitude, $allowedLatitude, $allowedLongitude, $radius)) {
    echo json_encode(['valid' => true, 'redirect_url' => 'https://youtube.com']);
} else {
    echo json_encode(['valid' => false]);
}
?>
