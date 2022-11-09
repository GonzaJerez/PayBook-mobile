export const currencyFormat = (num:number):string =>{

  return '$' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

export const currencyShortFormat = (num:number):string =>{

  return '$' + (num / 1000).toFixed(1) + 'k'
}