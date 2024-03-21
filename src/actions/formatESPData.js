import {calcPercentDiff} from "./calStats";
import { monthDateMap} from '../config.js'
var { jStat } = require('jstat')


// const { FixedWidthParser } = require('fixed-width-parser');
// const fixyInstance = require('fixy')
// const fixedWidthParser = new FixedWidthParser([
//   {
//     name: 'station',
//     start: 14,
//     width: 8,
//   },

// ]);

export function formatForHighcharts(statData = {}, i){
  // console.log('data coming into format for highcharts', statData)
  const colorAr = ["#0fb5ae", "#4046ca", "#f68511", "#de3d82", "#7e84fa", "#72e06a", "#147af3", "#7326d3", "#e8c600", "#cb5d00", "#008f5d", "#bce931"]
  // console.log('statData', statData)
  // console.log('statData', statData, 'i', i, colorAr[i])
//   {
//     name: 'Observations',
//     data: [
//         [760, 801, 848, 895, 965],
//         [733, 853, 939, 980, 1080],
//         [714, 762, 817, 870, 918],
//         [724, 802, 806, 871, 950],
//         [834, 836, 864, 882, 910]
//     ],
//     tooltip: {
//         headerFormat: '<em>Experiment No {point.key}</em><br/>'
//     }
// }
  function formatAllTraceSeriesHighcharts(){
    
  }
  function formatBoxPlotHighcharts(){
    const boxData = []
    const oulierData = []
    const series = []

    //box data order: [bottom whisker, bottom of box, median, top of box, top whisker]
    //outliers is separate array of [min, max] 
    // console.log('statData boc', statData)
    const fcstYearDataObj = Object.create({})
    fcstYearDataObj.statType = 'box'
    fcstYearDataObj.data = {}
    // console.log('statData', statData)
    for(const fcstIssueMonth in statData){
      // console.log('statData', statData)
      const seriesObj = Object.create({})
      seriesObj.name = fcstIssueMonth
      seriesObj.data = []
      seriesObj.yearKey = []
      seriesObj.dataKey = ['10', '30', 'median', '70', '90']
      // seriesObj.yearKey = []
      for(const fcstYear in statData[fcstIssueMonth]){
        // console.log('fcstYear', fcstYear, statData[fcstIssueMonth])
        // if(categories.indexOf(fcstYear)<0){
        //   categories.push(fcstYear)
        // }
        seriesObj.yearKey.push(fcstYear)
        const currIssueFcstYearData = statData[fcstIssueMonth][fcstYear]
        // console.log(currIssueFcstYearData)
        seriesObj.data.push(
          [
            currIssueFcstYearData.tenth, 
            currIssueFcstYearData.thirty,
            currIssueFcstYearData.median,
            currIssueFcstYearData.seventy,
            currIssueFcstYearData.ninety
          ]
        )
        // seriesObj.yearKey.push(fcstYear)
      }
      series.push(seriesObj)
      // console.log('seriesobj', seriesObj)
    }
    // console.log('series', series)
    return {...series[0]}
  }
  function formatMedianColumnHighcharts(){
    const categories = []
    const series = []
    // {"name":"feb22","data":[7811.168133333334,9733.068800000001,9978.76263333333,10009.37573333333,10014.989433333332,359.17780000000005]}
    const fcstYearDataObj = Object.create({})
    fcstYearDataObj.statType = 'median'
    fcstYearDataObj.data = {}
    let colorI = 0
    // console.log('statData', statData)
    for(const fcstIssueMonth in statData){
      // console.log()
      const seriesObj = Object.create({})
      seriesObj.name = fcstIssueMonth
      seriesObj.data = []
      // seriesObj.color = 'black'
      // seriesObj.yearKey = []
      for(const fcstYear in statData[fcstIssueMonth]){
        // console.log('fcstYear', fcstYear, statData[fcstIssueMonth])
        if(categories.indexOf(fcstYear)<0){
          categories.push(fcstYear)
        }
        const currIssueFcstYearData = statData[fcstIssueMonth][fcstYear]
        // console.log(currIssueFcstYearData)
        seriesObj.data.push(currIssueFcstYearData.median)
        // seriesObj.yearKey.push(fcstYear)
      }
      series.push(seriesObj)
      // console.log('seriesobj', seriesObj)
    }
    return {categories, series}
  }

  return {formatMedianColumnHighcharts, formatBoxPlotHighcharts}
}



export function formatESPData(data, returnType = 'statData'){
  // console.log(returnType, 'return type')
  // const {month, station, data} = espData
  // console.log('month', month)
  // console.log('dataHere', data) //data okay here
  // console.log('making forecast data object for station', station)
  // const forecastDataByYear = parseStringData(data)
  let testThis = new fullObjectCapabilities(data) //data okay here
  // const yearlyData = testThis.getMonthlyAndYearlyStats()
  // const statData = testThis.getFcstYearMedianNinetyTenth()
  // const monthlyData = testThis.getMontlyVolumeStats()
  // const returnYearly = Object.create({})
  // for(const fcstYear in monthlyData){
  //   const monthlyStats = monthlyData[fcstYear]
  //   const yearlyStats = statData[fcstYear]
  //   returnYearly[fcstYear] = {monthlyStats, ...yearlyStats}
  // }
  let yearlyData = testThis.getMonthlyAndYearlyStats() //data not okay here
  // console.log('data after format esp function thing', yearlyData)
  // const statData = testThis.getFcstYearMedianNinetyTenth() // this was original return but added monthly and moved everything into the thing it calls now

  // console.log('testThis getAllTraceData', testThis.getAllTraceData())
  // console.log('medianData', medianData)
// 
  // console.log('testThis', 'month', month, testThis.getFcstYearMedianNinetyTenth())
  // console.log(testThis.getCandlestickData())
  // console.log('median', JSON.stringify(testThis.getFcstYearStats('median')))
  return returnType === 'allTraceData' ? testThis.getAllTraceData() : yearlyData 
  // return testThis.getFcstYearStats('median')
}

function fullObjectCapabilities(data){
  // console.log('making forecast data object fullOjbectCapabilities')
  // console.log('data in full Object capabilities', data) //data okay here
  // console.log('calling parseStringData from fullObjectCapabilities')
  let fullDataObject = parseStringData(data) //not okay here
  // console.log('done calling parseStringData from fullObjectCapabilities')
  // console.log('full data object', JSON.stringify(fullDataObject))
  // fullDataObject returns data organized like this:
  // {2024: (year of forecast)
  //   1991: [ value, value, value, value] 1991 is the reforecast year. value is the monthy value indexed by month. So, the first value is january. only years with all 12 monts of data will be returned
  //   1992: [ value, value, value, value]
  // }
  // console.log('full data object', fullDataObject)
  function getFcstYearAr(){
    return Object.keys(fullDataObject)
  }
  function getMonthlyAndYearlyStats(){
    let yearlyStats =getFcstYearMedianNinetyTenth()
    let monthlyStats = getMontlyVolumeStats()
    let returnYearly = Object.create({})
    let yearlyStatYears = Object.keys(yearlyStats)
    let monthlyStatYears = Object.keys(monthlyStats)
    let combinedSet = new Set([...monthlyStatYears, ...yearlyStatYears]);
    // console.log('combinedSet', combinedSet)
    let allYearsSorted = [...combinedSet].sort((a, b) => a.localeCompare(b));
    for(let fcstYear of allYearsSorted){
      // console.log('fcstYear', fcstYear)
      let monthlyStatData = monthlyStats[fcstYear]
      let yearlyStatData = yearlyStats[fcstYear]
      returnYearly[fcstYear] = {monthlyStatData, ...yearlyStatData}
    }
    return returnYearly
  }
  function getMonthyVolumes(){
    let monthlyVolsAllYears = Object.create({})
    for(let fcstYear in fullDataObject){
      // dataByRefcstYear looks like this:
      // {
          // 1991: [45.709, 55.813, 46.987, 37.643, 40.212, 116.128, 114.744, 180.151, 82.905, 42.777, 27.006, 26.652] //Big Deal!!!!! This is starting in cotober ovtober october
          // 1992: [30.578, 35.963, 31.08, 28.187, 29.785, 92.499, 161.099, 325.422, 513.128, 279.722, 209.134, 81.646]
        // }
      let refcstByMonth = Object.create({})  //this is an object that holds the reforecast values for each month.  The number of values is the number of reforecast years
      let dataByRefcstYear = fullDataObject[fcstYear]
      for(let refcstYear in dataByRefcstYear){
        let monthlyRefcstVolumes = dataByRefcstYear[refcstYear] //this is an array. each value is a monthly forecast. the first forecast is jan, second is feb, etc // actually i think the first fcst is october
        // console.log('date check', monthlyRefcstVolumes)
        monthlyRefcstVolumes.map((monthlyVol, index)=>{
          let monthNum = index + 1
          if (!refcstByMonth.hasOwnProperty(monthNum)) {
            refcstByMonth[monthNum] = [];
          }
          refcstByMonth[monthNum].push(monthlyVol)
        })
      }
      monthlyVolsAllYears[fcstYear] = refcstByMonth
      
    }
    return monthlyVolsAllYears
  }

  function getMontlyVolumeStats(){
    let monthlyVolumes = getMonthyVolumes()
    let monthlyVolumeStatsByYear = Object.create({})
    for(let fcstYear in monthlyVolumes){
      let fcstYearMonthlyData = monthlyVolumes[fcstYear]
      let currYearMonthStats = Object.create({})
      for(let fcstMonth in fcstYearMonthlyData){
        let monthData = fcstYearMonthlyData[fcstMonth]
        let monthlyStats = getPercentiles(monthData)
        currYearMonthStats[fcstMonth]=monthlyStats
      }
      monthlyVolumeStatsByYear[fcstYear] = currYearMonthStats
    }
    return monthlyVolumeStatsByYear

  }
  function getDataYearObYearSum() {
    let summedObj = Object.create({})
    let fcstYearAr = getFcstYearAr()
    fcstYearAr.map(currFcstYear=>{
      let currFcstYearData = fullDataObject[currFcstYear]
      summedObj[currFcstYear] = Object.create({})
      for(let currObYear in currFcstYearData){
        let currObYearDataAr = currFcstYearData[currObYear]
        summedObj[currFcstYear][currObYear] = jStat.sum(currObYearDataAr)
      }
    })
    return summedObj
  }
  function getDataYearObjYearAr(){
    let dataYearObject = getDataYearObYearSum()
    let flatObj = Object.create({})
    for(let fcstYear in dataYearObject){
      flatObj[fcstYear] = []
      for(let obYear in dataYearObject[fcstYear]){
        flatObj[fcstYear].push(dataYearObject[fcstYear][obYear])
      }
    }
    // console.log('flatObj', flatObj)
    return flatObj
  }
  function getFcstYearStats(type, percentileLevel){
    let returnObj = Object.create({})
    returnObj.dataAr = []
    returnObj.yearAr = []

    let fcstYearData = getDataYearObjYearAr()
    returnObj.type = type
    for(let fcstYear in fcstYearData){
      returnObj.yearAr.push(fcstYear)
      let fcstYearDataAr = fcstYearData[fcstYear]
      if(type === 'median'){
        // returnObj[fcstYear]=jStat.median(fcstYearDataAr)
        returnObj[fcstYear]=jStat.mean(fcstYearDataAr)
        // returnObj.dataAr.push(jStat.median(fcstYearDataAr))
        returnObj.dataAr.push(jStat.mean(fcstYearDataAr))

      }
      else if(type === 'percentile'){
        returnObj[fcstYear]=jStat.percentile(fcstYearDataAr, percentileLevel)
      }
    }
    return returnObj
  }

  function getAllTraceData(){
    let returnObj = new Object({})
    for (let forecastYear in fullDataObject){
      let allTraceYearData = fullDataObject[forecastYear]
      for(let traceYear in allTraceYearData){
        let traceYearData = allTraceYearData[traceYear]
        if(!returnObj[traceYear]){
          returnObj[traceYear] = []
        }
        returnObj[traceYear] = [...returnObj[traceYear], ...traceYearData]


      }
    }
    // console.log('returnObj', returnObj)
    return {...returnObj}


  }
  function getCandlestickData(){
    // An array of arrays with 5 or 4 values. In this case, the values correspond to x,open,high,low,close. If the first value is a string, it is applied as the name of the point, and the x value is inferred. The x value can also be omitted, in which case the inner arrays should be of length 4. Then the x value is automatically calculated, either starting at 0 and incremented by 1, or from pointStart and pointInterval given in the series options.
    let returnObj = Object.create({})
    let returnAr = []
    let ranges = []
    let averages = []
    let fcstYearData = getDataYearObjYearAr()
    // console.log('fcstyeardata', fcstYearData)
    for(let fcstYear in fcstYearData){
      // console.log(fcstYear)
      let fcstYearDataAr = fcstYearData[fcstYear]
      let openClose = jStat.median(fcstYearDataAr)
      let high = jStat.percentile(fcstYearDataAr, 0.9)
      let low = jStat.percentile(fcstYearDataAr, 0.1)
      returnObj[fcstYear] = [openClose, high, low, openClose]
      returnAr.push([parseFloat(fcstYear), openClose, high, low, openClose])
      averages.push([parseFloat(fcstYear), openClose])
      ranges.push([parseFloat(fcstYear),low, high])
    }
    // console.log('ranges', JSON.stringify(ranges))
    // console.log('averages', JSON.stringify(averages))
  }

  function getPercentiles(dataAr){
    let median = jStat.median(dataAr)
    // let ninety = jStat.percentile(dataAr, 0.9)
    // let seventyfive = jStat.percentile(dataAr, 0.75)
    // let seventy = jStat.percentile(dataAr, 0.70)
    // let thirty = jStat.percentile(dataAr, 0.30)
    // let twentyfive = jStat.percentile(dataAr, 0.25)
    // let tenth = jStat.percentile(dataAr, 0.1)

    let ninety = jStat.percentile(dataAr, 0.1)
    let seventyfive = jStat.percentile(dataAr, 0.25)
    let seventy = jStat.percentile(dataAr, 0.30)
    let thirty = jStat.percentile(dataAr, 0.70)
    let twentyfive = jStat.percentile(dataAr, 0.75)
    let tenth = jStat.percentile(dataAr, 0.9)

    let maxVal = Math.max(...dataAr)
    let minVal = Math.min(...dataAr)
    let sum = jStat.sum(dataAr)
    return {median, ninety, seventyfive, seventy, thirty, twentyfive, tenth, sum, maxVal, minVal}
  }
  function getFcstYearMedianNinetyTenth(){
    // An array of arrays with 5 or 4 values. In this case, the values correspond to x,open,high,low,close. If the first value is a string, it is applied as the name of the point, and the x value is inferred. The x value can also be omitted, in which case the inner arrays should be of length 4. Then the x value is automatically calculated, either starting at 0 and incremented by 1, or from pointStart and pointInterval given in the series options.
    let returnObj = Object.create({})
    let returnAr = []
    let ranges = []
    let averages = []
    let yearKey = []
    let fcstYearData = getDataYearObjYearAr()
    // console.log('fcstyeardata', fcstYearData)
    for(let fcstYear in fcstYearData){
      yearKey.push(fcstYear)
      // console.log(fcstYear)
      let fcstYearDataAr = fcstYearData[fcstYear]
      // console.log('fcst year', fcstYear, fcstYearDataAr)
      let median = jStat.median(fcstYearDataAr)
      // let ninety = jStat.percentile(fcstYearDataAr, 0.9)
      // let seventyfive = jStat.percentile(fcstYearDataAr, 0.75)
      // let seventy = jStat.percentile(fcstYearDataAr, 0.70)
      // let thirty = jStat.percentile(fcstYearDataAr, 0.30)
      // let twentyfive = jStat.percentile(fcstYearDataAr, 0.25)
      // let tenth = jStat.percentile(fcstYearDataAr, 0.1)

      let ninety = jStat.percentile(fcstYearDataAr, 0.1)
      let seventyfive = jStat.percentile(fcstYearDataAr, 0.25)
      let seventy = jStat.percentile(fcstYearDataAr, 0.30)
      let thirty = jStat.percentile(fcstYearDataAr, 0.70)
      let twentyfive = jStat.percentile(fcstYearDataAr, 0.75)
      let tenth = jStat.percentile(fcstYearDataAr, 0.9)

      let maxVal = Math.max(...fcstYearDataAr)
      let minVal = Math.min(...fcstYearDataAr)
      let sum = jStat.sum(fcstYearDataAr)
      returnObj[fcstYear] = {median, ninety, seventyfive, seventy, thirty, twentyfive, tenth, sum, maxVal, minVal, yearData: fcstYearDataAr, yearKey}
      // // returnAr.push([parseFloat(fcstYear), openClose, high, low, openClose])
      // averages.push([parseFloat(fcstYear), openClose])
      // ranges.push([parseFloat(fcstYear),low, high])
    }
    return returnObj
    // console.log('ranges', JSON.stringify(ranges))
    // console.log('averages', JSON.stringify(averages))
  }
  return {getMonthlyAndYearlyStats, getDataYearObYearSum, getFcstYearAr, getDataYearObjYearAr, getCandlestickData, getFcstYearStats, fullDataObject, getFcstYearMedianNinetyTenth, getAllTraceData}
}

function parseStringData(data){
  // console.log('in parse string data 382')
  if(!data){
    return {error: 'no data'}
  }
  // console.log('data', data)
  const dataSplit = data.split(/\r?\n/);
  // console.log('data in to parseStringData', data)
  // console.log('dataspltip', dataSplit)
  const yearData = dataSplit[2]
  // console.log('yuear yearData', yearData)
  // yearArray is the array of reforecast years
  const yearArray = yearData.split(' ').filter(curr => curr.length > 0 && Number.isInteger(Number(curr))) 
  // fcstDates is a object where keys are the forecast water year and the values are an array of months in that water year. tyring to get rid of incomplete water years
  const fcstDates = {}
  // console.log('year array', yearArray)
  //  unfiltered object has all years data. Have one that is filtered so that incomplete water year data isn't displayed
  const unfilteredForecastDataObject = Object.create({})
  dataSplit.map((currRow, i)=>{
    // const yearKeys = []
    // console.log('currRow', currRow)

    if(i>2){
      const currRowAr = currRow.split(' ').filter(curr => curr.length > 0 )
      // console.log('currRowAr', currRowAr)
      // console.log('currRowAr[0]', currRowAr[0])
      if(currRowAr[0]){
        const currFcstDateFull = currRowAr[0]
        // if(yearKeys.indexOf(currFcstDateFull)<0){
        //   yearKeys.push(currFcstDateFull)
        // }

        const currFcstDate = currRowAr[0].split('/')
        const currFcstMonth = currFcstDate[0]
        const currFcstYear = currFcstDate[1]
        // console.log('currFcstDate', currFcstDate)
        // console.log('currFcstMonth', currFcstMonth)
        // console.log('currFcstYear', currFcstYear)
        let currFcstWaterYear = currFcstMonth >=10 && currFcstMonth<=12 ? makeWaterYear(currFcstYear) : currFcstYear
        // console.log('currFcstWaterYear', currFcstWaterYear)
        // Check if the year is already a key in fcstDates
        if (!fcstDates.hasOwnProperty(currFcstWaterYear)) {
          fcstDates[currFcstWaterYear] = [];
        }
        fcstDates[currFcstWaterYear].push(currFcstMonth)
        currRowAr.splice(0, 1)
        if(!unfilteredForecastDataObject[currFcstWaterYear]){
          unfilteredForecastDataObject[currFcstWaterYear] = {}
        }
        currRowAr.map((currVol, i)=>{
          // console.log('year array', yearArray, 'i', i, 'currvol', currVol)
          // console.log('forecastdatobjcect,', unfilteredForecastDataObject, 'currfcstwatersyera', currFcstWaterYear)
          if(yearArray[i] && !unfilteredForecastDataObject[currFcstWaterYear][yearArray[i]]){
            unfilteredForecastDataObject[currFcstWaterYear][yearArray[i]] = []
          }
          unfilteredForecastDataObject[currFcstWaterYear][yearArray[i]].push(parseFloat(currVol))
          // console.log(currVol, yearArray[i])
        })
        // unfilteredForecastDataObject[currFcstWaterYear]['yearKeys'].push(currFcstDateFull)
      }
      // console.log(currFcstDate)
    }
  })
  // unfilteredForecastDataObject.yearKeys = yearKeys
  // console.log('fcstDates', fcstDates)
  // console.log('yearArray', yearArray)
  // console.log('unfilteredForecastDataObject', unfilteredForecastDataObject)
  //  create new object that only has years with 12 months of data. That way partial years are not displayed. 
  var filteredForecastDataObject = Object.create({})
  // console.log('this should be empty',filteredForecastDataObject)
  for (const fcstYear in unfilteredForecastDataObject) {
    const reforecastData = unfilteredForecastDataObject[fcstYear]; //data is okay here
    // console.log('reforecastData line 452', fcstYear, reforecastData) // raw data is okay here
    const isValid = Object.values(reforecastData).every(array => array.length >= 12);
    // console.log('reforecastData after isValid', fcstYear, reforecastData) //data is okay here

    // console.log('is valid', isValid)
    if (isValid) {
      // console.log('reforecastData in If', fcstYear, reforecastData) //data is okay here

        filteredForecastDataObject[fcstYear] = reforecastData;
    }
  }
  // console.log('filteredForecastDataObject keys', Object.keys(filteredForecastDataObject)) //not okay here
  // console.log('filteredForecastDataObject', filteredForecastDataObject) //not okay here
  // console.log('done with the parsestrindata function')
  return filteredForecastDataObject
}

function makeWaterYear(year){
  const nextYear = parseFloat(year)+1
  return nextYear.toString()
}