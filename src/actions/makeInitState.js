export default function makeInitDateState(inputStations = []){
  const returnObj = Object.create({})
  inputStations.map(currStn =>{
    returnObj[currStn] = {date1: 'apr22', date2: 'may22'}

  })
  // returnObj['YLDC2'] = {date1:'dec21'}

  return {...returnObj}
}

