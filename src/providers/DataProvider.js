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
    yield* generatorFunctionMonth(station, dataMonthDynamic)
  }
}

async function* generatorFunctionMonth(station, dataMonthDynamic) {
  // console.log('in generatorFunctionMonth')
  // console.log(dataMonthDynamic)
  // console.log('dataMonthDynamic.orderAr', dataMonthDynamic.orderAr)
  let i=0
  const colorAr = ["#0fb5ae", "#4046ca", "#f68511", "#de3d82", "#7e84fa", "#72e06a", "#147af3", "#7326d3", "#e8c600", "#cb5d00", "#008f5d", "#bce931"]


    for(const monthYear of dataMonthDynamic.orderAr) {
      // console.log('monthYear', monthYear)
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
      // console.log('url', url)
      // https://www.cbrfc.noaa.gov/outgoing/32month/archive/raw/dec21/RAW.2021-12-01.RAW.DRGC2.dec21.txt
      // https://www.cbrfc.noaa.gov/outgoing/32month/archive/raw/${monthYear}/RAW.${station}.${monthYear}.txt
      // let espMonthDataAdj
      // let espMonthDataRaw
      try{
        const espMonthDataAdj = await axios.get(urlAdj)
        const espMonthDataRaw = await axios.get(urlRaw)
        // console.log('data adjusted', espMonthDataAdj)
        // console.log('data raw', espMonthDataRaw)

        // console.log('espMonthData', espMonthData)
        yield {data: {adj:espMonthDataAdj.data, raw:espMonthDataRaw.data}, station, monthYear, color: colorAr[monthIndex]};
      }
      catch(e){
        yield {error: JSON.stringify(e), station, monthYear};

      }
      i = i+1
    }
}

async function makeInitialState(dataStateDispatcher, setLoadingPageComponent){
  console.log('making initial state')
  const currYear = new Date().getFullYear()
  const oldestYear = 2020
  const highchartsData = []
  const dataMonthDynamic = makeDataMonths(2021, 12)
  let i = 0
  // console.log('dataMonth', dataMonthDynamic)
  dataStateDispatcher({type: 'initState', payload:{status: 'requesting', text: `requesting data`}})
  // console.log('station ids', stationIds)
  const generator =  generatorFunctionStation(stationIds, dataMonthDynamic)
  dataStateDispatcher({type: 'initState', payload:{status: 'requested', text: `data requested`}})
  // console.log('after generator')
  const stationDataAgnostic = Object.create({})
  // const stationDataAgnostic = Object.create({raw:Object.create({}), adj:Object.create({})})
  const highchartsMedianColumnData = Object.create({})
  const highchartsBoxplotData = Object.create({})
  const monthlyData = Object.create({})
  for await (const value of generator) {
    // console.log('value', value)
    dataStateDispatcher({type: 'initState', payload:{status: 'processing', text: `processing ${value.station}: ${value.monthYear}`}})
    setLoadingPageComponent(<UpdatedLoading station={value.station} monthYear={value.monthYear} />)
    // console.log('for const value of generator. value', value.monthYear, 'station', value.station, 'monthyear', value)
    const monthData = Object.create({})
    // console.log('geenrator alue', 'station', value.station, value.monthYear, value, value.color)
    monthData.name = value.monthYear
    // console.log('format ESP data from make initial state for value')
    if(value.error){

    }
    else{
      // console.log('value', value)
      const formattedData = formatESPData(value.data.raw,  i)
      const formattedDataAdj = formatESPData(value.data.raw,  i)
      const formattedDataRaw = formatESPData(value.data.adj,  i)
      // console.log('formatteddat/da', formattedData)
      if(!stationDataAgnostic[value.station]){
        stationDataAgnostic[value.station] = {raw:{}, adj:{}}
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
      stationDataAgnostic[value.station]['raw'][value.monthYear] =formattedDataRaw
      stationDataAgnostic[value.station]['adj'][value.monthYear] =formattedDataAdj
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
  console.log('returning and reporting')
  return {highchartsMedianColumnData, highchartsBoxplotData, stationDataAgnostic}

}

function setStationCompareDatesReducer(state, action){
  // console.log('reducer action', action, 'reducer state', state)
  switch(action.type){
    case 'initLoad':
      return{...state, ...makeInitDateState(action.payload)}
    case 'setDate':  
      const {station, dateId, setDate} = action.payload
      // console.log('state', state)
      // console.log('station', station, 'dateId', dateId, 'setDate', setDate)
      const changeThis = state[station]
      // console.log('changeThis', changeThis)
      changeThis[dateId] = setDate
      // console.log('changeThis 2', changeThis)
      const nextState = {...state}
      nextState[station] = {...changeThis}

      return{...nextState}
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
  const [columnChartData, setColumnChartData] = useState()
  const [boxPlotData, setBoxPlotData] = useState()
  const [stationCardList, setStationCardList] = useState([])
  const [stationCompareDates, dispatchSetStationCompareDates] = useReducer(setStationCompareDatesReducer, {})
  const [displayChartType, setDisplayChartType] = useState('column')
  const [chartSize, setChartSize] = useState(6)
  const [toggleChartTable, setToggleChartTable] = useState('chart')
  const [dataStatus, dispatchDataStatus] = useReducer(dataStatusReducer, null)
  const [loadingPageComponent, setLoadingPageComponent] = useState()
  const [agnosticStationData, setAgnosticStationData] = useState()
  const [dataType, setDataType] = useState('both')
  useEffect(()=>{
    async function makeInit(){
      // const dataTest = await axios.get('https://www.cbrfc.noaa.gov/outgoing/32month/archive/adj/apr22/ADJ.2022-04-01.RAW.YDLC2.apr22.txt')
      // console.log('dataTest', dataTest)
      console.log(' i am in use effect and should only run once')
      const initState = await makeInitialState(dispatchDataStatus, setLoadingPageComponent)
      // filterDispatch({type: 'initLoad', payload:{...initState}})

      // console.log('initialState', initState)
      setColumnChartData(initState.highchartsMedianColumnData)
      setStationCardList(Object.keys(initState.highchartsMedianColumnData))
      setBoxPlotData(initState.highchartsBoxplotData)
      setAgnosticStationData(initState.stationDataAgnostic)
      dispatchSetStationCompareDates({type: 'initLoad', payload:Object.keys(initState.highchartsMedianColumnData)})
    }
    makeInit()
  },[])

  // useEffect(()=>{
  //   console.log('i am a test and should only run once')
  // },[])

  return (
    <AppContext.Provider value={{chartData: columnChartData, stationCardList, setStationCardList, boxPlotData, displayChartType, setDisplayChartType, chartSize, setChartSize, toggleChartTable, setToggleChartTable, stationCompareDates, dispatchSetStationCompareDates, dataStatus, loadingPageComponent, agnosticStationData, dataType, setDataType}}>
          {children}
    </AppContext.Provider>
  );
}