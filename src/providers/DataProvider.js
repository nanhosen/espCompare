import React, { useState, useEffect, useReducer } from 'react'
import { AppContext } from '../context/AppContext'
import {formatESPData, formatForHighcharts}  from '../actions/formatESPData'
import axios from 'axios'
import {stationIds, makeDataMonths} from '../config.js'
import makeInitDateState from '../actions/makeInitState'
import LoadingPage from '../components/LoadingPage'
// import useAxios from 'axios-hooks'

// function reducerHere(state, action){
//   switch(action.type){
//     case 'processData' : 
//       console.log('formatting data from reducer')
//       return formatESPData(action.payload)
//   }
// }
 
function UpdatedLoading(props) {
  const {station, monthYear} = props
  // const statusPage = (
  //   <LoadingPage station={station} monthYear = {monthYear} />
  // );
  return <LoadingPage station={station} monthYear = {monthYear} />;
}


async function* generatorFunctionStation(stationAr, dataMonthDynamic) {
  // console.log('in generatorFunctionStation')
  for(const station of stationAr) {
    // console.log('station in station array in generatorFunctionStation', station)
    try{

      yield* generatorFunctionMonthGPT(station, dataMonthDynamic)
    }
    catch(e){
      console.log('error caught')
    }
  }
}

// gpt version
///
async function* generatorFunctionMonthGPT(station, dataMonthDynamic) {
  const stationDataMonths = { raw: [], adj: [] };
  const colorAr = ["#0fb5ae", "#4046ca", "#f68511", "#de3d82", "#7e84fa", "#72e06a", "#147af3", "#7326d3", "#e8c600", "#cb5d00", "#008f5d", "#bce931"];

  for (const monthYear of dataMonthDynamic.orderAr) {
    const monthData = dataMonthDynamic[monthYear];
    const year = monthData.fullYear;
    const monthNum = monthData.monthNum;
    const dayNum = '01';
    const urlAdj = `https://www.cbrfc.noaa.gov/outgoing/32month/archive/adj/${monthYear}/ADJ.${year}-${monthNum}-${dayNum}.RAW.${station}.${monthYear}.txt`;
    const urlRaw = `https://www.cbrfc.noaa.gov/outgoing/32month/archive/raw/${monthYear}/RAW.${station}.${monthYear}.txt`;
    
    
    let espMonthDataRaw;
    let espMonthDataAdj;

    try {
      espMonthDataRaw = await getUrlData(urlRaw);
      // console.log('url raw', urlRaw)
      if (!espMonthDataRaw.error && espMonthDataRaw.data) {
        stationDataMonths.raw.push(monthYear);
      } else {
        // Try alternative URL for station GJLOC
        if (station === 'GJLOC') {
          const newUrl = `https://www.cbrfc.noaa.gov/outgoing/32month/archive/raw/${monthYear}/RAW.${station}UNREG.${monthYear}.txt`;
          espMonthDataRaw = await getUrlData(newUrl);
          if (!espMonthDataRaw.error && espMonthDataRaw.data) {
            stationDataMonths.raw.push(monthYear);
          }
        }
      }
    } catch (e) {
      console.log('Error fetching raw data:', e);
    }

    try {
      espMonthDataAdj = await getUrlData(urlAdj);
      // console.log('url adj', urlAdj)
      if (!espMonthDataAdj.error && espMonthDataAdj.data) {
        stationDataMonths.adj.push(monthYear);
      }
    } catch (e) {
      console.log('Error fetching adjusted data:', e);
    }

    const dataReturnObj = {
      raw: espMonthDataRaw ? espMonthDataRaw.data : undefined,
      adj: espMonthDataAdj ? espMonthDataAdj.data : undefined
    };
    // console.log(JSON.stringify(dataReturnObj), 'dataReturnObj')
    const noData = !dataReturnObj.raw && !dataReturnObj.adj;
    const monthIndex = dataMonthDynamic.orderAr.indexOf(monthYear);
    const yieldObjNoData = { error: `no data for ${monthYear}`, monthYear, station };
    const yieldObjData = { data: { ...dataReturnObj }, station, monthYear, color: colorAr[monthIndex], stationDataMonths };
    // console.log('yieldObjData', yieldObjData,'yieldObjData')

    yield noData ? { ...yieldObjNoData } : { ...yieldObjData };
  }
}
///
///


async function* generatorFunctionMonth(station, dataMonthDynamic) {
  // console.log('in generatorFunctionMonth', dataMonthDynamic)
  // console.log(dataMonthDynamic)
  // console.log('dataMonthDynamic.orderAr', dataMonthDynamic.orderAr)
  const stationDataMonths = {raw:[], adj:[]}
  // console.log('station data months up here', stationDataMonths)
  let i=0
  const colorAr = ["#0fb5ae", "#4046ca", "#f68511", "#de3d82", "#7e84fa", "#72e06a", "#147af3", "#7326d3", "#e8c600", "#cb5d00", "#008f5d", "#bce931"]
  console.log('station, ', station)

    for(const monthYear of dataMonthDynamic.orderAr) {
      const monthIndex = dataMonthDynamic.orderAr.indexOf(monthYear)
      // console.log(colorAr[monthIndex])
      const monthData = dataMonthDynamic[monthYear]
      // console.log('monthData', monthData)
      const year = monthData.fullYear
      // const monthAbbrev = monthData.monthName
      const monthNum = monthData.monthNum
      // const {monthNum, dayNum} = monthDateMap[month] ? monthDateMap[month] : undefined
      const dayNum = '01'
      let urlAdj = `https://www.cbrfc.noaa.gov/outgoing/32month/archive/adj/${monthYear}/ADJ.${year}-${monthNum}-${dayNum}.RAW.${station}.${monthYear}.txt`
      let urlRaw = `https://www.cbrfc.noaa.gov/outgoing/32month/archive/raw/${monthYear}/RAW.${station}.${monthYear}.txt`
      // console.log('urlAdj', urlAdj)
      // console.log('urlRaw', urlRaw)
      // https://www.cbrfc.noaa.gov/outgoing/32month/archive/raw/dec21/RAW.2021-12-01.RAW.DRGC2.dec21.txt
      // https://www.cbrfc.noaa.gov/outgoing/32month/archive/raw/${monthYear}/RAW.${station}.${monthYear}.txt
      let espMonthDataAdj
      let espMonthDataRaw

      const dataReturnObj = Object.create({})
      try{
        // const espMonthDataRaw = await axios.get(urlRaw)
        // const espMonthDataAdj = await axios.get(urlAdj)
        try{

          espMonthDataRaw = await getUrlData(urlRaw)
          if(station ==='GJLOC'){
            console.log(espMonthDataRaw,'espMonthDataRaw')
          }
          // console.log('raw data data', espMonthDataRaw)
          if(!espMonthDataRaw.error && espMonthDataRaw.data){
            // console.log('handle an error here raw')
            // console.log('I found raw data', monthYear)
            // console.log('this is the raw data that I found esp', espMonthDataRaw.data)
            stationDataMonths.raw.push(monthYear)
            dataReturnObj['raw'] = espMonthDataRaw.data
          }
          else{
            console.log('data error month', monthYear, 'data Error raw', espMonthDataRaw)
            // this does not go in catch because te bad url does not trigger error
            if(station === 'GJLOC'){
              try{
                console.log('tried with other url')
                urlRaw = `https://www.cbrfc.noaa.gov/outgoing/32month/archive/raw/${monthYear}/RAW.${station}UNREG.${monthYear}.txt`
                espMonthDataRaw = await getUrlData(urlRaw)
                console.log('second GJT request worked',espMonthDataRaw)
                if(!espMonthDataRaw.error && espMonthDataRaw.data){
                  console.log('should be adding gjt data')
                  // console.log('handle an error here raw')
                  // console.log('I found raw data', monthYear)
                  // console.log('this is the raw data that I found esp', espMonthDataRaw.data)
                  stationDataMonths.raw.push(monthYear)
                  dataReturnObj['raw'] = espMonthDataRaw.data
                  console.log('not making it somehow', dataReturnObj)
                }
                else{
                  console.log('for some reason no data')
                }
              }
              catch(e){
                console.log('error', e)
                console.log('second gjt request didnt work')
              }
            }
            return 'raw data error' 
          }
        }
        catch(e){
          console.log('catch raw data error here') 
        }
        try{
          console.log('!!!!!!!!!!!!! made it here',urlAdj)
          espMonthDataAdj = await getUrlData(urlAdj)
          console.log('adj data here', espMonthDataAdj)
          if(!espMonthDataAdj.error && espMonthDataAdj.data){
            // console.log('handle an error here adj')
            dataReturnObj['adj'] = espMonthDataAdj.data
            stationDataMonths.adj.push(monthYear)
          }
          else{
            // console.log('data error month', monthYear, 'data Error adj', espMonthDataAdj)
            // return 'adjusted data error' 
          }
        }
        catch(e){
          console.log('catch adj data here')
        }
        // if(monthYear ==='aug22'){
        //   console.log('this is recent august data', station, monthYear)
        //   console.log('data adjusted', espMonthDataAdj)
        //   console.log('data raw', espMonthDataRaw)
        //   console.log('dataReturnObj', dataReturnObj)
        // }
        console.log('dataReturnObj', dataReturnObj)
        // console.log('stationdat months', stationDataMonths )
        const noData = Object.keys(dataReturnObj).length <1 ? true : false
        console.log('no data value', noData)
        const yieldObjNoData = {error: `no data for ${monthYear}`, monthYear, station} 
        const yieldObjData =  {data: {...dataReturnObj}, station, monthYear, color: colorAr[monthIndex], stationDataMonths};
        console.log('yieldObjData', yieldObjData)
        
        yield noData ? {...yieldObjNoData} : {...yieldObjData}
      }
      catch(e){
        yield {error: JSON.stringify(e), station, monthYear};

      }
      i = i+1
    }
}



async function getUrlData(url){
  // const proxyUrl =' https://www.cbrfc.noaa.gov/dbdata/ndb2/test'
  // const proxyUrl =' https://www.cbrfc.noaa.gov/dbdata/ndb2/getNOAAData'
  try{
    const urlData = await axios.get(url)
    return urlData
  }
  catch(e){
    return {error: JSON.stringify(e)}
  }
} 
async function makeInitialState(dataStateDispatcher, setLoadingPageComponent){
  // console.log('making initial state')
  const currYear = new Date().getFullYear()
  const lastYear =  new Date().getFullYear() -1
  const lastYearTwoDigits = String(lastYear).slice(-2);
  const oldestYear = 2020
  const highchartsData = []
  // const currYear = 
  const dataMonthDynamic = makeDataMonths(lastYear,10)
  // const dataMonthDynamic = makeDataMonths(2021, 12)
  let i = 0
  // console.log('dataMonth ', dataMonthDynamic)
  dataStateDispatcher({type: 'initState', payload:{status: 'requesting', text: `requesting data`}})
  // console.log('station ids', stationIds)
  const generator =  generatorFunctionStation(stationIds, dataMonthDynamic)
  dataStateDispatcher({type: 'initState', payload:{status: 'requested', text: `data requested`}})
  // console.log('after generator')
  const stationDataAgnostic = Object.create({})
  const allStationTraces = Object.create({})
  // const stationDataAgnostic = Object.create({raw:Object.create({}), adj:Object.create({})})
  const highchartsMedianColumnData = Object.create({})
  const highchartsBoxplotData = Object.create({})
  const monthlyData = Object.create({})
  const stationArray = []
  for await (const value of generator) {
    // console.log('value', JSON.stringify(value))
    // console.log('')
    // console.log('')
    // console.log('')
    // console.log('')
    dataStateDispatcher({type: 'initState', payload:{status: 'processing', text: `processing ${value.station}: ${value.monthYear}`}})
    setLoadingPageComponent(<UpdatedLoading station={value.station} monthYear={value.monthYear} />)
    // console.log('for const value of generator. value', value.monthYear, 'station', value.station, 'monthyear', value)
    const monthData = Object.create({})
    // console.log('geenrator alue', 'station', value.station, value.monthYear, value, value.color)
    monthData.name = value.monthYear
    // console.log('station', value.station, value.monthYear)
    if(stationArray.indexOf(value.station)<0){
      stationArray.push(value.station)

    }
    // console.log('format ESP data from make initial state for value')
    if(value.error ||(value.data && Object.keys(value.data).length<1) ){
      // console.log('there is a value error here', value)
    }   
    else{
      // console.log('there is no value error here', value)
      // console.log('formatting raw')
      // console.log('formatting raw', value.data.raw)
      const formattedData = value.data.raw ? formatESPData(value.data.raw) : null
      // console.log('formatting adj')
      // console.log('formatting adj',value.data.adj)
      const formattedDataAdj = value.data.adj ? formatESPData(value.data.adj) : null
      // console.log('formatting raw again')
      const formattedDataRaw = value.data.raw ? formatESPData(value.data.raw) : null
      // console.log('formatting raw again')
      const allTraceDataRaw = value.data.raw ? formatESPData(value.data.raw, 'allTraceData') : null
      // console.log('formatting adj again')
      const allTraceDataAdj = value.data.adj ? formatESPData(value.data.adj, 'allTraceData') : null
      // console.log('alltrcace data dj', allTraceDataAdj)
      // console.log('formatteddat/da', formattedData)
      // console.log('value.data.raw', value.data.raw)/
      // console.log('value.data.adj', value.data.adj)
      // console.log('formattedDataAdj/da', formattedDataAdj)
      // console.log('formattedDataRaw/da', formattedDataRaw)

      if(!stationDataAgnostic[value.station]){
        stationDataAgnostic[value.station] = {raw:{}, adj:{}}
      }

      if(!allStationTraces[value.station]){
        allStationTraces[value.station] = {raw:{}, adj:{}}
      }

      if(!highchartsMedianColumnData[value.station]){
        highchartsMedianColumnData[value.station] = Object.create({})
        highchartsMedianColumnData[value.station].series=[]
      }
      if(!highchartsBoxplotData[value.station]){
        highchartsBoxplotData[value.station] = Object.create({})
        // highchartsBoxplotData[value.station].series=[]
      }
      const highTest1 = formatForHighcharts({[value.monthYear]:formattedData}, i).formatMedianColumnHighcharts()
      const boxPlotFormat = formatForHighcharts({[value.monthYear]:formattedData}).formatBoxPlotHighcharts()
      if(formattedDataRaw){
        stationDataAgnostic[value.station]['raw'][value.monthYear] =formattedDataRaw 
      }
      if(formattedDataAdj){
        stationDataAgnostic[value.station]['adj'][value.monthYear] = formattedDataAdj 
      }

      if(allTraceDataRaw){
        allStationTraces[value.station]['raw'][value.monthYear] =allTraceDataRaw 
      }
      if(allTraceDataAdj){
        allStationTraces[value.station]['adj'][value.monthYear] = allTraceDataAdj 
      }

      // console.log('stationDataAgnostic', stationDataAgnostic)
      highchartsMedianColumnData[value.station]['series'].push(highTest1.series[0])
      highchartsMedianColumnData[value.station]['categories']=highTest1.categories
      // highchartsMedianColumnData[value.station]['color']=value.color
      // console.log(highchartsMedianColumnData[value.station])
      highchartsBoxplotData[value.station][value.monthYear]=boxPlotFormat
      i = i + 1
      
    }
    // const highchartsColumnData = formatForHighcharts(stationDataAgnostic[value.station]['adj']).formatMedianColumnHighcharts()
  }
  dataStateDispatcher({type: 'initState', payload:{status: 'done', text: 'done processing data'}})
  // console.log('returning and reporting')
  // console.log('stationdataagnostic', stationDataAgnostic)
  return {highchartsMedianColumnData,  stationDataAgnostic, stationArray, allStationTraces}
  // return {highchartsMedianColumnData, highchartsBoxplotData, stationDataAgnostic}

}
function setBulkDatesReducer(state, action){
  // console.log('state', action)
  switch(action.type){
    case 'typeToggle':
      return {...state, selected: action.payload}
    case 'dateUpdate'  :
      return {...state, dateList: action.payload}
    case 'bulkSet':
      const {dateId, setDate} = action.payload
      const nextState = {...state}
      if(dateId && setDate){
        nextState['selectedDates'][dateId]= setDate
      }
      else{
        console.log('bulk dates reducer doenst have either dateId or SetDate or both', dateId, setDate)
      }
      return {...nextState}
    default:
      return {...state}  
  }
}


function setStationCompareDatesReducer(state, action){
  console.log('reducer action', action, 'reducer state', state)
  const {station, dateId, setDate, dataType} = action.payload
  switch(action.type){
    case 'initLoad':
      return action.payload
      // return{...state, ...makeInitDateState(action.payload)}
    case 'setDate':  
      // console.log('state', state)
      // console.log('station', station, 'dateId', dateId, 'setDate', setDate)
      const changeThis = state[station][dataType]
      // console.log('changeThis', changeThis)
      changeThis[dateId] = setDate
      // console.log('changeThis 2', changeThis)
      const nextState = {...state}
      nextState[station][dataType] = {...changeThis}
      // console.log('nextState', nextState)

      return{...nextState}
    case 'bulkSet': 
      // console.log('state', state, 'action', action)
      const nextStateBulk = {...state}
      for (const station in state){
        const stationData = nextStateBulk[station]
        for(const dataType in stationData){
          nextStateBulk[station][dataType][dateId] = setDate
        }

      }
      // console.log('next state bulk', nextStateBulk)
      return {...nextStateBulk}

    default:
      return {...state}  
  }
}

function dataStatusReducer(state, action){
  // console.log('data status reducer state', state, 'action', action)
  switch(action.type){
    case 'initState':
      return action.payload
    default:
      console.log('in default data status reducer acase')  
  }
}

// makeInitialState()

export default function DataProvider({children}){
  // const [columnChartData, setColumnChartData] = useState()
  // const [boxPlotData, setBoxPlotData] = useState()
  const [stationCardList, setStationCardList] = useState([])
  const [stationCompareDates, dispatchSetStationCompareDates] = useReducer(setStationCompareDatesReducer, {})
  const [displayChartType, setDisplayChartType] = useState("boxplot")
  const [displayTableType, setDisplayTableType] = useState("original")
  const [chartSize, setChartSize] = useState(6)
  const [toggleChartTable, setToggleChartTable] = useState('table')
  const [dataStatus, dispatchDataStatus] = useReducer(dataStatusReducer, null)
  const [loadingPageComponent, setLoadingPageComponent] = useState()
  const [agnosticStationData, setAgnosticStationData] = useState()
  const [dataType, setDataType] = useState('raw')
  const [allStationList, setAllStationList] = useState([])
  const [allStationTraces, setAllStationTraces] = useState()
  const [bulkDates, dispatchBulkDatesUpdate] = useReducer(setBulkDatesReducer, {selected: false, dateList: [], selectedDates: {date1: null, date2: null}})
  useEffect(()=>{
    async function makeInit(){
      // const dataTest = await axios.get('https://www.cbrfc.noaa.gov/outgoing/32month/archive/adj/apr22/ADJ.2022-04-01.RAW.YDLC2.apr22.txt')
      // console.log('dataTest', dataTest)
      console.log(' i am in use effect and should only run once')
      const initState = await makeInitialState(dispatchDataStatus, setLoadingPageComponent)
      // console.log('initState', initState)
      // filterDispatch({type: 'initLoad', payload:{...initState}})

      // console.log('initialState', initState)
      // setColumnChartData(initState.highchartsMedianColumnData)
      setStationCardList(initState.stationArray)
      setAllStationList(initState.stationArray)
      // setBoxPlotData(initState.highchartsBoxplotData)
      setAgnosticStationData(initState.stationDataAgnostic)
      setAllStationTraces(initState.allStationTraces)
      // dispatchSetStationCompareDates({type: 'initLoad', payload:Object.keys(initState.highchartsMedianColumnData)})
    }
    makeInit()
  },[])

  // useEffect(()=>{
  //   console.log('i am a test and should only run once')
  // },[])

  return (
    <AppContext.Provider value={{stationCardList, setStationCardList, displayChartType, setDisplayChartType,displayTableType, setDisplayTableType, chartSize, setChartSize, toggleChartTable, setToggleChartTable, stationCompareDates, dispatchSetStationCompareDates, dataStatus, loadingPageComponent, agnosticStationData, dataType, setDataType, allStationList, setAllStationList, bulkDates, dispatchBulkDatesUpdate, allStationTraces}}>
          {children}
    </AppContext.Provider>
  );
}




// https://www.cbrfc.noaa.gov/outgoing/32month/archive/raw/sep2
// https://www.cbrfc.noaa.gov/outgoing/32month/archive/adj/sep22/ADJ.2022-09-01.RAW.GLDA3.sep22.txt

// works 
// https://www.cbrfc.noaa.gov/outgoing/32month/archive/raw/sep22/RAW.VCRC2.sep22.txt