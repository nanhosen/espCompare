import checkArrayEquality from './checkArrayEquality';
import {calcPercentDiff} from '../actions/calStats'

export default function formatTableData(stationName, stationData, stationDates){
  const {date1, date2} = stationDates
  const month1Info = stationData?.[date1]
  const month2Info = stationData?.[date2]
  const {data: month1Data, yearKey: month1Years, dataKey} = month1Info
  const {data: month2Data, yearKey: month2Years} = month2Info
  // console.log(date1, date2, month1Data, month2Data, month2Years)
  const yearArray = checkArrayEquality(month1Years, month2Years) ? month1Years : []
  const dataByFcstYear = Object.create({})
  dataByFcstYear.dataKey = dataKey
  yearArray.map((currYear,i)=>{
    const month1YearData = getStatNameByIndex(dataKey, month1Data[i])
    const month2YearData = getStatNameByIndex(dataKey, month2Data[i])
    
  })
}

function getStatNameByIndex(dataKey, dataArray){
  const returnObject = Object.create({})
  dataKey.map((indexName, index)=>{
    returnObject[indexName]=dataArray[index]
  })
  return returnObject
}

function createRowSim(simDate, ninety, seventy, fifty, thirty, ten) {
  return { simDate, ninety, seventy, fifty, thirty, ten };
}

function createRowDiff(sim1Obj, sim2Obj){
  if(!sim1Obj || !sim2Obj){
    return {}
  }
  else{
    // console.log('i am here', sim1Obj, sim2Obj)
    const ninetyDiff = Math.round(sim1Obj.ninety - sim2Obj.ninety)
    const seventyDiff = Math.round(sim1Obj.seventy - sim2Obj.seventy)
    const fiftyDiff = Math.round(sim1Obj.fifty - sim2Obj.fifty)
    const thirtyDiff = Math.round(sim1Obj.thirty - sim2Obj.thirty)
    const tenDiff = Math.round(sim1Obj.ten - sim2Obj.ten)
    return {ninetyDiff, seventyDiff, fiftyDiff, thirtyDiff, tenDiff}
  }
}


// useEffect(()=>{
//   const {date1, date2} = stationDates
//   const month1Info = context.boxPlotData[station][date1]
//   const month2Info = context.boxPlotData[station][date2]
//   const month1Data = month1Info.data
//   const month2Data = month2Info.data
//   // const year1month1Info = 
//   // const year1month1Info = 
//   // const year2month1Info = 
//   const month1Years = month1Info.yearKey
//   const month2Years = month2Info.yearKey
//   const yearArray = checkArrayEquality(month1Years, month2Years) ? month1Years : []

//   const dataByFcstYear = Object.create({})
//   dataByFcstYear.dataKey = month1Info.dataKey
//   yearArray.map((currYear,i)=>{
//     const month1YearData = month1Data[i]
//     const month2YearData = month2Data[i]
//     const ninetyIndex = 4
//     const seventyFiveIndex = 3
//     const fiftyIndex = 2
//     const twentyFiveIndex = 1
//     const tenIndex = 0
//     const month1Sim = createRowSim(
//       month1Info.name, 
//       month1YearData[ninetyIndex],
//       month1YearData[seventyFiveIndex],
//       month1YearData[fiftyIndex],
//       month1YearData[twentyFiveIndex],
//       month1YearData[tenIndex],
//     )
//     const month2Sim = createRowSim(
//       month2Info.name, 
//       month2YearData[ninetyIndex],
//       month2YearData[seventyFiveIndex],
//       month2YearData[fiftyIndex],
//       month2YearData[twentyFiveIndex],
//       month2YearData[tenIndex],
//     )
//     const rowSims = [month1Sim, month2Sim]
//     const rowDiff = createRowDiff(rowSims[0], rowSims[1])

//     dataByFcstYear[currYear]={rowSims, rowDiff}
//   })
//   // console.log('dataByFcstYear', dataByFcstYear)
//   setTableData(dataByFcstYear)

//   // console.log('month1years', month1Years, 'month2years', month2Years, checkArrayEquality(month1Years, month2Years),yearArray)
//   // console.log('month1Info',month1Info, month1Data, 'month2Data 2 adt', month2Data)
//   // console.log(station, context.boxPlotData[station], date1, date2)
// },[context.boxplotData, context.stationCompareDates])