
// const stationIds = ["GLDA3"]
// const stationIds = ["GBRW4","GRNU1","YDLC2","TPIC2","CLSC2","GJLOC","BMDC2","MPSC2","DRGC2","VCRC2","NVRN5","GLDA3"]
// const stationIds = ["YDLC2","GJLOC","DRGC2","NVRN5","VCRC2","TPIC2","CLSC2","BMDC2","MPSC2","GRNU1","GBRW4","GLDA3"]
// const dataMonths = ['apr22']
// const dataMonths = [ 'jan22', 'feb22', 'mar22', 'apr22', 'may22']
// const startYear = 2021
// const startMonth = 12
const basinGroups = {
  green: {
    stations:['GBRW4', 'GRNU1', 'YDLC2'],
    printName: 'Green'
  },
  gunnison: {
    stations:['TPIC2', 'BMDC2', 'MPSC2', 'CLSC2','GJLOC','GJLOCREG'],
    printName: 'Gunnison'
  },
  sanJuan: {
    stations:['DRGC2', 'VCRC2', 'NVRN5'],
    printName: 'San Juan'
  },
  powell: {
    stations:['GLDA3'],
    printName: 'Powell'
  }
}

const stationIds = (() => {
  const returnAr = []
  for(const basinName in basinGroups){
    // console.log('basin name', basinName)
    const groupStations = basinGroups[basinName]['stations']
    returnAr.push(...groupStations)
  }
  // console.log('returnAr', returnAr)
  return [...returnAr]
})()


const settings = {
  defaultChartDataType: 'raw'
}

function makeDataMonths(startYear, startMonth, lastDate = new Date()){
  const endDateMath = lastDate.setMonth(lastDate.getMonth()+3)
  const endDate = new Date(endDateMath)
  const endMonth = endDate.getMonth()
  const endYear = endDate.getFullYear()
  const currYear = new Date().toLocaleDateString('en-US', {year:  "2-digit"})
  const dataObj = Object.create({})
  dataObj.orderAr = []
  const startDate = new Date(`${startMonth}/1/${startYear}`)
  const endDate1 = new Date(`${endMonth}/1/${endYear}`)
  const nextMonth = new Date(startDate)
  nextMonth.setMonth(startDate.getMonth() + 1)
  let currDate = startDate
  while(currDate <= endDate){
    const monthShort = currDate.toLocaleDateString('en-US', {month: 'short'}).toLowerCase()
    const pushYear = currDate.toLocaleDateString('en-US', {year:  "2-digit"})
    const waterYearFull = currDate.getMonth()+1>9 && currDate.getMonth()<13 ? currDate.getFullYear()+1: currDate.getFullYear()
    const waterYear = waterYearFull.toString().slice(2, 4)
    const monthYear =  `${monthShort}${pushYear}`
    dataObj.orderAr.push(monthYear)
    dataObj[monthYear] = {
      monthName: monthShort.toUpperCase(),
      monthNum: monthNumMap[monthShort]['monthNum'],
      fullYear: currDate.getFullYear()
    }
    currDate.setMonth(currDate.getMonth() + 1)
  }
  // console.log('dataObj', dataObj)
  return dataObj
}
const monthNumMap = {
  jan: {
    monthNum: '01',
    monthName: 'JAN', 
    dayNum: '01'
  },
  feb:{
    monthNum: '02',
    monthName:'FEB',
    dayNum: '01'
  },
  mar:{
    monthNum: '03',
    monthName:'MAR',
    dayNum: '01'
  },
  apr:{
    monthNum: '04',
    monthName:'APR',
    dayNum: '01'
  },
  may:{
    monthNum: '05',
    monthName:'MAY',
    dayNum: '01'
  },
  jun:{
    monthNum: '06',
    monthName:'JUN',
    dayNum: '01'
  },
  jul:{
    monthNum: '07',
    monthName:'JUL',
    dayNum: '01'
  },
  aug:{
    monthNum: '08',
    monthName:'AUG',
    dayNum: '01'
  },
  sep:{
    monthNum: '09',
    monthName:'SEP',
    dayNum: '01'
  },
  oct:{
    monthNum: '10',
    monthName:'OCT',
    dayNum: '01'
  },
  nov:{
    monthNum: '11',
    monthName:'NOV',
    dayNum: '01'
  },
  dec:{
    monthNum: '12',
    monthName:'DEC',
    dayNum: '01'
  }
}



export {stationIds, makeDataMonths, settings, basinGroups}

// https://www.cbrfc.noaa.gov/outgoing/32month/archive/adj/dec21/ADJ.2022-12-01.RAW.GLDA3.dec21.txt