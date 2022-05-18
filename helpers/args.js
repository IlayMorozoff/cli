export const getArgs = (args) => {
  const res = {};
  
  const newArgs = args.slice(2, args.length);

  newArgs.forEach((value, index, arr) => {
    if (value.startsWith('-')) {
      res[value[1]] = true;
      if (!!arr[index + 1] && !arr[index + 1].startsWith('-')) {
        res[value[1]] = arr[index + 1];
      }
    }
  })

  return res;
}