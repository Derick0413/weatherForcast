const API_KEY = "bb35543af24443458b920823251304";

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();

  if (!city) {
    alert("도시 이름을 입력해주세요!");
    return;
  }

  const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&lang=ko`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("도시를 찾을 수 없습니다.");
      }
      return response.json();
    })
    .then(data => {
      const resultDiv = document.getElementById("weatherResult");
      const weather = data.current;
      const location = data.location;

      resultDiv.innerHTML = `
        <div class="bg-blue-50 p-4 rounded-xl shadow-md">
          <h3 class="text-xl font-semibold mb-2">${location.name}, ${location.country}</h3>
          <img src="https:${weather.condition.icon}" alt="날씨 아이콘" class="mx-auto mb-2 w-16 h-16" />
          <p><strong>🌤️ 날씨:</strong> ${weather.condition.text}</p>
          <p><strong>🌡️ 온도:</strong> ${weather.temp_c}°C</p>
          <p><strong>🥶 체감 온도:</strong> ${weather.feelslike_c}°C</p>
          <p><strong>💧 습도:</strong> ${weather.humidity}%</p>
        </div>
      `;
    })
    .catch(error => {
      document.getElementById("weatherResult").innerHTML = `<p class="text-red-500">${error.message}</p>`;
    });
}
