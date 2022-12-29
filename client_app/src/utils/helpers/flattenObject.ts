interface KeyValuePair {
  key: string, 
  value: string,
}

export const flattenObject = (obj:any) => {
  const flattened:any = {}
  if(!obj) return;
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

export const createKeyValueArrayFromObject = (obj:any, bannedKeys:Array<any> = []): Array<any> => {
  if(!obj) return []
  return Object.entries(obj).filter(([key]:any) => {
    let isBannedKeyFoundAsSubstring:boolean = false
    bannedKeys.forEach((bannedKey:string) => { 
      if(bannedKey.includes(key) ){
        isBannedKeyFoundAsSubstring = true;
      }
    })
    return !isBannedKeyFoundAsSubstring
  })
}