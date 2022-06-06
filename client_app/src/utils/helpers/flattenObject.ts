interface KeyValuePair {
  key: string, 
  value: string,
}

export const flattenObject = (obj:any) => {
  const flattened:any = {}

  Object.keys(obj).forEach((key) => {
    const value = obj[key]

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(flattened, flattenObject(value))
    } else {
      flattened[key] = value
    }
  })
  return flattened
}

export const createKeyValueArrayFromObject = (obj:any, bannedKeys:Array<any> = []): Array<KeyValuePair> => {
  const arr: Array<KeyValuePair> = [];
  Object.entries(obj).map((pair:any) => {
    if(!bannedKeys.includes(pair[0]))
        arr.push(pair)
  })
  return arr;
}