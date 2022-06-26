export const simpleValidateForm = (form: any):boolean => {
  let flag = true;
  Object.entries(form).forEach((keyValuePair:any) => {
    const [ key, value ] = keyValuePair;
    if( value === 'None' || value === -1 || value === ''  ){
      flag = false
    }
  });
  return flag;
}

export const deepValidateForm = () => {

}