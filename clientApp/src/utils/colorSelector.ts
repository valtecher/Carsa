export const handleColorSelect = ( percent: number ) => {
  const colors = { great: '#C6E781', good: '#E7E381', medium: '#E7BE81', bad: '#E78181' }
  if( percent >= 75 ) {
    return colors.great;
  } else if( percent >= 50 && percent < 75) {
    return colors.good
  } else if( percent >= 25 && percent < 50 ) {
    return colors.medium
  } else {
    return colors.bad
  }
}