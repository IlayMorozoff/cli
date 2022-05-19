#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { printHelp, printSuccess, printError, printWeather } from './services/log.service.js';
import { saveKeyValue, getKeyValue } from './services/storage.service.js';
import { getDataCity, getIcon } from './services/api.service.js';

const saveToket = async (token) => {
  if (!token.length){
    printError('Не передан token');
    return;
  }
  try {
    await saveKeyValue('token', token);
    printSuccess('Токен сохранен');
  } catch (error) {
    printError(e.message);
  }
}

const saveCity = async (city) => {
  if (!city.length){
    printError('Не передан город');
    return;
  }
  try {
    await saveKeyValue('city', city);
    printSuccess('Город сохранен');
  } catch (error) {
    printError(e.message);
  }
}

const getForcast = async () => {
  try {
    const city = process.env.CITY ?? await getKeyValue('city');
    const data = await getDataCity(city);

    printWeather(data, getIcon(data.weather[0].icon));

    if (!data) {
      throw new Error('Указан не правильный токен');
    }

    if (data.cod === 404) {
      throw new Error('Неверно указан город');
    } else if (data.cod === 401) {
      throw new Error('Неверно указан токен');
    } else {
      if (data.cod !== 200) {
        throw new Error('Неизвестная ошибка');
      }

    }
  } catch (error) {
    printError(error.message);
  }
}

const initCLI = () => {
  const args = getArgs(process.argv)
  if (args.h) {
    return printHelp();
  }

  if (args.s) {
    return saveCity(args.s);
  }

  if (args.t) {
    return saveToket(args.t);
  }
  return getForcast();
}

initCLI();