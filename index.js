if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success, error);
} else {
  document.body.innerHTML = "Geolocation Tidak Didukung di browser ini, coba browser lain!";
}

function success(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  // Kirim lokasi ke server untuk validasi
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "validate-location.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const response = JSON.parse(xhr.responseText);
      if (response.valid) {
        window.location.href = response.redirect_url; // Redirect ke JotForm
      } else {
        document.body.innerHTML =
          "<div style='display: flex; align-items: center; justify-content: center;'><div style='display: flex; align-items: center;'><h2 style='font-family: Arial, sans-serif'>Akses Ditolak!</h2></div></div><div style='display: flex; align-items: center; justify-content: center;'><div style='display: flex; align-items: center;'><p style='font-family: Arial, sans-serif'>QR Code ini hanya bisa dipindai di kawasan Perum Peruri Karawang</p></div></div>";
      }
    }
  };
  xhr.send("latitude=" + latitude + "&longitude=" + longitude);
}

function error() {
  document.body.innerHTML = "Unable to retrieve your location.";
}
