import chalk from 'chalk';
import dedent from 'dedent-js'

export const printError = (error) => {
  console.log(chalk.bgRed(' Error  ') + error);
};

export const printSuccess = (msg) => {
  console.log(`${(chalk.bgGreen(' Success '))} ${msg}`);
};

export const printHelp = () => {
  console.log(
    dedent`${chalk.bgCyan(' HELP ')}
    Без параметров - вывод погоды
    -s [CITY] для установки города
    -h для вывода помощи
    -t [API-KEY] для сохранения токена
    `
  )
};

export const printWeather = (res, icon) => {
  console.log(
    dedent`${chalk.bgYellowBright(' WEATHER ')} Погода в городе ${res.name}
    ${icon}  ${res.weather[0].description}
    Температура: ${res.main.temp} °С (ощущается как ${res.main.feels_like} °С)
    Влажность: ${res.main.humidity}%
    Скорость ветра: ${res.wind.speed} м/с
    `
  )
}