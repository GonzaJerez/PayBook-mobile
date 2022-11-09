export const getRange = (max:number, range?:number)=>{
  const min = (range) ? max - range : 1
  const years:string[] = []

  for (let i = max; i >= min; i--) {
      years.push(String(i))
  }
  return years
}