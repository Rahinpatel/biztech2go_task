export function isNumber(str:any) {
    if (str.trim() === '') {
      return false;
    }
  
    return !isNaN(str);
  }