
      function initMap() {
        var map = new google.maps.Map(document.getElementById("map"), {
          zoom: 4,
          center: { lat: 37.09024, lng: -95.712891 }
        });

        var marker = new google.maps.Marker({
          position: map.getCenter(),
          map: map,
          draggable: true
        });

        google.maps.event.addListener(marker, "dragend", function(event) {
          document.getElementById("lat").value = event.latLng.lat();
          document.getElementById("lng").value = event.latLng.lng();
          getWeather(event.latLng.lat(), event.latLng.lng());
        });
      }

      function getWeather(lat, lng) {
  var API_KEY = "054b80cc171da00c94ae747741e9c14e";
  var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${API_KEY}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // Extract the necessary weather information from the API response
      var today = data.list[0];
      var yesterday = data.list[8];
      var tomorrow = data.list[16];

      // Update the UI with the weather data
      document.getElementById("today-temp").innerHTML = (today.main.temp)/10 + "°C";
      document.getElementById("yesterday-temp").innerHTML = (yesterday.main.temp)/10 + "°C";
      document.getElementById("tomorrow-temp").innerHTML = (tomorrow.main.temp)/10 + "°C";
      document.getElementById("today-humidity").innerHTML = today.main.humidity + "%";
      document.getElementById("yesterday-humidity").innerHTML = yesterday.main.humidity + "%";
      document.getElementById("tomorrow-humidity").innerHTML = tomorrow.main.humidity + "%";
    })
    .catch(error => console.error(error));
}
