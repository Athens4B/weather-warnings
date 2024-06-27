const axios = require('axios');

// Function to fetch and count weather warnings
async function getWeatherWarnings() {
  try {
    // Fetch data from the National Weather Service API
    const response = await axios.get('https://api.weather.gov/alerts/active');
    const alerts = response.data.features;

    // Initialize counters
    let severeThunderstormCount = 0;
    let tornadoWarningCount = 0;

    // Process alerts
    alerts.forEach(alert => {
      const eventType = alert.properties.event;
      if (eventType === 'Severe Thunderstorm Warning') {
        severeThunderstormCount++;
      } else if (eventType === 'Tornado Warning') {
        tornadoWarningCount++;
      }
    });

    // Display results
    console.log(`Severe Thunderstorm Warnings: ${severeThunderstormCount}`);
    console.log(`Tornado Warnings: ${tornadoWarningCount}`);
  } catch (error) {
    console.error('Error fetching weather warnings:', error);
  }
}

// Call the function
getWeatherWarnings();
