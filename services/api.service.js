import https from 'https';
import { getKeyValue } from './storage.service.js';
import { printError } from './log.service.js';

export const getIcon = (icon) => {
	switch (icon.slice(0, -1)) {
		case '01':
			return '☀️';
		case '02':
			return '🌤️';
		case '03':
			return '☁️';
		case '04':
			return '☁️';
		case '09':
			return '🌧️';
		case '10':
			return '🌦️';
		case '11':
			return '🌩️';
		case '13':
			return '❄️';
		case '50':
			return '🌫️';
	}
};

const getWeather = async (data, token) => {
  let dataWeather = '';

  try {
    const urlWeather = new URL('https://api.openweathermap.org/data/2.5/weather');
    urlWeather.searchParams.append('lat', data.lat);
    urlWeather.searchParams.append('lon', data.lon);
    urlWeather.searchParams.append('appid', token);
    urlWeather.searchParams.append('lang', 'ru');
    urlWeather.searchParams.append('units', 'metric');
  
    return new Promise((resolve, reject) => {
      https.get(urlWeather, (res) => {
        res.on('data', (chunk) => {
          dataWeather += chunk;
        });
    
        res.on('end', () => {
          resolve(JSON.parse(dataWeather));
        });
  
        res.on('error', (err) => {
          reject(err.message);
          printError(err.message);
        });
      })
    })
  } catch (error) {
    return printError('Указан не правильный токен')
  }
}

export const getDataCity = async (city) => {

  const token = process.env.TOKEN ?? await getKeyValue('token');

  if (!token) {
    throw new Error('Не задан ключ API, задайте его через команду -t [API_KEY]');
  }

  let dataCity = '';

  const urlDataCity = new URL('https://api.openweathermap.org/geo/1.0/direct')
  urlDataCity.searchParams.append('q', city);
  urlDataCity.searchParams.append('appid', token);

  return new Promise((resolve, reject) => {
    https.get(urlDataCity, (response) => {
      response.on('data', (chunk) => {
        dataCity += chunk;
      });
  
      response.on('end', () => {
        dataCity = JSON.parse(dataCity);
        getWeather(dataCity[0], token).then((data) => {
          resolve(data);
        }).catch(() => {
          printError(' Указан не правильный токен');
        });
      });

      response.on('error', (err) => {
        reject(err.message);
        printError(err.message);
      })
    });
  })
}