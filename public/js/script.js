document.addEventListener("DOMContentLoaded", () => {
    const weatherButton = document.querySelector("button");
    const locationInput = document.querySelector("input");
    const weatherDisplay = document.querySelector(".weather-display-container");
    const weatherContainer = document.querySelector(".weather-container");
    const cityName = document.getElementById("cityName");
    const temperature = document.getElementById("temperature");
    const condition = document.getElementById("condition");

    weatherButton.addEventListener("click", async () => {
        const location = locationInput.value;

        if (location) {
            try {
                const response = await axios.get(`/weather`, { params: { location } });
                const data = response.data;

                cityName.textContent = `weather in ${data.name}`;
                temperature.textContent = data.main.temp;
                condition.textContent = data.weather[0].description;

                weatherContainer.style.display = "none";
                weatherDisplay.style.display = "block";

            } catch (error) {
                alert("Could not retrieve weather data. Please try again.");
                console.error(error);
            }
        } else {
            alert("Please enter a city name and country code.");
        }
    });
});