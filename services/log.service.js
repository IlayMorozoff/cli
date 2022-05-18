import chalk from 'chalk';
import dedent from 'dedent-js'

export const printError = (error) => {
  console.log(chalk.bgRed(' Error ') + error);
};

export const printSuccess = (msg) => {
  console.log(chalk.bgGreen(' Success ') + msg);
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
}

// `${chalk.bgCyan('Help'} \n
// Без параметров - вывод погоды \n
// -s [CITY] для установки города \n
// -h для вывода помощи \n
// -t [API-KEY] для сохранения токена \n
// `))