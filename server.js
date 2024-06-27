const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

let severeThunderstormCount = 0;
let tornadoWarningCount = 0;

// Function to fetch and count weather warnings
async function fetchWeatherWarnings() {
  try {
    const response = await axios.get('https://api.weather.gov/alerts/active');
    const alerts = response.data.features;

    severeThunderstormCount = 0;
    tornadoWarningCount = 0;

    alerts.forEach(alert => {
      const eventType = alert.properties.event;
      if (eventType === 'Severe Thunderstorm Warning') {
        severeThunderstormCount++;
      } else if (eventType === 'Tornado Warning') {
        tornadoWarningCount++;
      }
    });
  } catch (error) {
    console.error('Error fetching weather warnings:', error);
  }
}

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to get weather warnings
app.get('/warnings', (req, res) => {
  res.json({
    severeThunderstormCount,
    tornadoWarningCount,
  });
});

// Schedule the fetch function to run every minute
setInterval(fetchWeatherWarnings, 1 * 60 * 1000);
fetchWeatherWarnings(); // Initial fetch

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
