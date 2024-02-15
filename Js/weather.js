/**
 * Set your account access keys when the page and scripts have loaded.
 * const aeris = new AerisWea`ther('CLIENT_ID', 'CLIENT_SECRET');
 */
const aeris = new AerisWeather(
    'JKAzXgPM9dMI1HMeaeVSL',
    '0GEoRTSsi3ftgVvvGt1SPHAwBEf1vKufxLQQ3x4U'
);

//Display a Basic Observation (Current Forecast)
function basic1day(zipCode) {
    const target = document.getElementById('currWeather');
    $('#currWeather').html('');
    const request = aeris.api().endpoint('observations').place(zipCode);
    request.get().then((result) => {
        const {
            ob
        } = result.data;
        console.log(result.data);
        if (ob) {
            $("#tempContainer").html(ob.tempF + '&deg;');
            $("#weatherIcon").attr("src", `https://cdn.aerisapi.com/wxblox/icons/${
                                     ob.icon || 'na.png'
                                   }`);
            //             const html = `
            //       <div class="cols">
            //       <div>
            //           <img class="icon" src="https://cdn.aerisapi.com/wxblox/icons/${
            //             ob.icon || 'na.png'
            //           }">
            //       </div>
            //       <div>
            //           <p class="temp">${ob.tempF}<span>&deg;F</span></p>
            //           <p class="wx">${ob.weatherPrimary}</p>
            //       </div>
            //   </div>
            //           `;
            //             target.innerHTML = html;
        }
    });
}

// 3-Day Forecast
function forecast3day(zipCode) {
    const target3 = document.getElementById('forecast3day');
    $('#forecast3day').html('');
    const request3day = aeris.api().endpoint('forecasts').place(zipCode).limit(3);
    request3day.get().then((result) => {
        const data = result.data;
        const {
            periods
        } = data[0];
        if (periods) {
            periods.reverse().forEach((period) => {
                const date = new Date(period.dateTimeISO);
                const icon = `https://cdn.aerisapi.com/wxblox/icons/${
          period.icon || 'na.png'
        }`;
                const maxTempF = period.maxTempF || 'N/A';
                const minTempF = period.minTempF || 'N/A';
                const weather = period.weatherPrimary || 'N/A';

                const html = `
                        <div class="card">
                            <div class="card-body">
                                <p class="title">${aeris.utils.dates.format(
                                  date,
                                  'eeee'
                                )}</p>
                                <p class="temps"><span>High:</span>${maxTempF}</p>
                                <p><img class="icon" src="${icon}"></p>
                                <p class="wx">${weather}</p>
                                <p class="temps"><span>Low:</span>${minTempF}</p>
                            </div>
                        </div>
                    `;

                target3.insertAdjacentHTML('afterbegin', html);
            });
        }
    });
}

// 5-Day Forcast
function forecast5day(zipCode) {
    const target5 = document.getElementById('forecast5day');
    $('#forecast5day').html('');
    const request5day = aeris.api().endpoint('forecasts').place(zipCode).limit(5);
    request5day.get().then((result) => {
        const data = result.data;
        const {
            periods
        } = data[0];
        if (periods) {
            periods.reverse().forEach((period) => {
                const date = new Date(period.dateTimeISO);
                const icon = `https://cdn.aerisapi.com/wxblox/icons/${
          period.icon || 'na.png'
        }`;
                const maxTempF = period.maxTempF || 'N/A';
                const minTempF = period.minTempF || 'N/A';
                const weather = period.weatherPrimary || 'N/A';

                const html = `
                        <div class="card">
                            <div class="card-body">
                                <p class="title">${aeris.utils.dates.format(
                                  date,
                                  'eeee'
                                )}</p>
                                <p class="temps"><span>High:</span>${maxTempF}</p>
                                <p><img class="icon" src="${icon}"></p>
                                <p class="wx">${weather}</p>
                                <p class="temps"><span>Low:</span>${minTempF}</p>
                            </div>
                        </div>
                    `;

                target5.insertAdjacentHTML('afterbegin', html);
            });
        }
    });
}