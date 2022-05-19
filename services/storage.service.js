import os from 'os';
import path from 'path';
import fs from 'fs/promises';

const filePath = path.join(os.homedir(), 'weather-data.json');

export const saveKeyValue = async (key, value) => {
  let data = {};

  if (await isExist(filePath)) {
    const file = await fs.readFile(filePath);
    data = JSON.parse(file);
  }

  data[key] = value;
  await fs.writeFile(filePath, JSON.stringify(data));
};

export const getKeyValue = async (key) => {
  if (await isExist(filePath)) {
    const file = await fs.readFile(filePath);
    const data = JSON.parse(file);
    return data[key]
  }
  return undefined;
}

const isExist = async (path) => {
  try {
    await fs.stat(path);
    return true;
  } catch (error) {
    return false;
  }
}