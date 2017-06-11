$(document).ready(function() {
   $(".button-collapse").sideNav();
   $('.calc').hide();
   $('.tooltipped').tooltip({delay: 50});
   let latitude = 0;
   let longitude = 0;
   navigator.geolocation.getCurrentPosition(function(location) {
     latitude = location.coords.latitude
     longitude = location.coords.longitude
     console.log(location.coords.latitude);
     console.log(location.coords.longitude);
     console.log(location.coords.accuracy);
   });

     $.getJSON(`https://api.weather.com/v1/geocode/${latitude}/${longitude}/forecast/daily/5day.json?language=en-US&units=e&apiKey=f43934a981fc48f5926e5929d3ee0760`)
      .then(function(response) {
        let forecastsArray = response.forecasts;
        console.log(forecastsArray);

        for (var i = 1; i < forecastsArray.length; i++) {
          let moonPhase = response.forecasts[i].lunar_phase;
          let temperature = response.forecasts[i].night.hi;
          let phaseDay = response.forecasts[i].lunar_phase_day;
          let humidityLunacy = response.forecasts[i].night.rh;
          let day = forecastsArray[i].dow;
          let moonLunacy = 0;
          let tempLunacy = 0;


          getMoonLunacy(phaseDay);
          getTempLunacy(temperature);

          let lunacyIndex = ((moonLunacy + tempLunacy + humidityLunacy)/3).toFixed();

          function getMoonLunacy(phaseDay) {
            if (phaseDay > 15) {
              let difference = phaseDay - 15;
              phaseDay = 15 - difference;
            }

            if (phaseDay < 1) {
              moonLunacy = 0;
            } else if (phaseDay <4) {
              moonLunacy = 26;
            } else if (phaseDay < 7) {
              moonLunacy = 46;
            } else if (phaseDay < 10) {
              moonLunacy = 66;
            } else if (phaseDay < 12) {
              moonLunacy = 80;
            } else if (phaseDay <= 15) {
              moonLunacy = 100;
            }
          }

          function getTempLunacy(temperature) {
            if (temperature < 60) {
              tempLunacy = 0;
            } else if (temperature < 65) {
              tempLunacy = 26;
            } else if (temperature < 70) {
              tempLunacy = 46;
            } else if (temperature < 75) {
              tempLunacy = 66;
            } else if (temperature < 80) {
              tempLunacy = 80;
            } else if (temperature >= 80) {
              tempLunacy = 100;
            }
          }

          $(`.day${i}`).text(`${day}: ${lunacyIndex}%`);

        }
        $('.forecast-section').hide();
        $('.forecast-section').fadeIn(2000);

        console.log(longitude);
        console.log(latitude);

      })
})
