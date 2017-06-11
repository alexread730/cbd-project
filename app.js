$(document).ready(function() {
   $(".button-collapse").sideNav();
   $('#modal1').modal();
   $('.trigger').click();
   $('.weather').hide();
   $('.weather').fadeIn(2000);
   let latitude = 0;
   let longitude = 0;
   navigator.geolocation.getCurrentPosition(function(location) {
     latitude = location.coords.latitude
     longitude = location.coords.longitude
     console.log(location.coords.latitude);
     console.log(location.coords.longitude);
     console.log(location.coords.accuracy);
   });


   $('.btn').click(function() {
     $.getJSON(`https://api.weather.com/v1/geocode/${latitude}/${longitude}/forecast/daily/5day.json?language=en-US&units=e&apiKey=f43934a981fc48f5926e5929d3ee0760`)
      .then(function(response) {
        console.log(response);
        let moonPhase = response.forecasts[0].lunar_phase;
        let temperature = response.forecasts[0].night.hi;
        let phaseDay = response.forecasts[0].lunar_phase_day;
        let humidityLunacy = response.forecasts[0].night.rh;
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

        $('.moon-phase').text(`Moon Phase: ${moonPhase}`);
        $('.temperature').text(`Max Temperature: ${temperature}`);
        $('.phase-day').text(`Phase Day: ${phaseDay}`);
        $('.humidity').text(`Humidity: ${humidityLunacy}%`)
        $('.lunacy-index').text(`${lunacyIndex}%`);
        $('.lunacy-index').hide();
        $('.lunacy-index').fadeIn(2000);


        console.log(humidityLunacy);
        console.log(tempLunacy);
        console.log(moonLunacy);
        console.log(longitude);
        console.log(latitude);

      })
   })
})
