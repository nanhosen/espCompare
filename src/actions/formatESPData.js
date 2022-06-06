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



export function formatESPData(data, i){
  // const {month, station, data} = espData
  // console.log('month', month)
  // console.log('dataHere', data)
  // console.log('making forecast data object for station', station)
  // const forecastDataByYear = makeYearFcstYearObj(data)
  const testThis = new fullObjectCapabilities(data)
  const statData = testThis.getFcstYearMedianNinetyTenth()
  // console.log('medianData', medianData)
// 
  // console.log('testThis', 'month', month, testThis.getFcstYearMedianNinetyTenth())
  // console.log(testThis.getCandlestickData())
  // console.log('median', JSON.stringify(testThis.getFcstYearStats('median')))
  return statData
  // return testThis.getFcstYearStats('median')
}

function fullObjectCapabilities(data){
  // console.log('making forecast data object fullOjbectCapabilities')
  const fullDataObject = makeYearFcstYearObj(data)
  function getFcstYearAr(){
    return Object.keys(fullDataObject)
  }
  function getDataYearObYearSum() {
    const summedObj = Object.create({})
    const fcstYearAr = getFcstYearAr()
    fcstYearAr.map(currFcstYear=>{
      const currFcstYearData = fullDataObject[currFcstYear]
      summedObj[currFcstYear] = Object.create({})
      for(const currObYear in currFcstYearData){
        const currObYearDataAr = currFcstYearData[currObYear]
        summedObj[currFcstYear][currObYear] = jStat.sum(currObYearDataAr)
      }
    })
    return summedObj
  }
  function getDataYearObjYearAr(){
    const dataYearObject = getDataYearObYearSum()
    const flatObj = Object.create({})
    for(const fcstYear in dataYearObject){
      flatObj[fcstYear] = []
      for(const obYear in dataYearObject[fcstYear]){
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

    const fcstYearData = getDataYearObjYearAr()
    returnObj.type = type
    for(const fcstYear in fcstYearData){
      returnObj.yearAr.push(fcstYear)
      const fcstYearDataAr = fcstYearData[fcstYear]
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
  function getCandlestickData(){
    // An array of arrays with 5 or 4 values. In this case, the values correspond to x,open,high,low,close. If the first value is a string, it is applied as the name of the point, and the x value is inferred. The x value can also be omitted, in which case the inner arrays should be of length 4. Then the x value is automatically calculated, either starting at 0 and incremented by 1, or from pointStart and pointInterval given in the series options.
    let returnObj = Object.create({})
    const returnAr = []
    const ranges = []
    const averages = []
    const fcstYearData = getDataYearObjYearAr()
    // console.log('fcstyeardata', fcstYearData)
    for(const fcstYear in fcstYearData){
      console.log(fcstYear)
      const fcstYearDataAr = fcstYearData[fcstYear]
      const openClose = jStat.median(fcstYearDataAr)
      const high = jStat.percentile(fcstYearDataAr, 0.9)
      const low = jStat.percentile(fcstYearDataAr, 0.1)
      returnObj[fcstYear] = [openClose, high, low, openClose]
      returnAr.push([parseFloat(fcstYear), openClose, high, low, openClose])
      averages.push([parseFloat(fcstYear), openClose])
      ranges.push([parseFloat(fcstYear),low, high])
    }
    // console.log('ranges', JSON.stringify(ranges))
    // console.log('averages', JSON.stringify(averages))
  }
  function getFcstYearMedianNinetyTenth(){
    // An array of arrays with 5 or 4 values. In this case, the values correspond to x,open,high,low,close. If the first value is a string, it is applied as the name of the point, and the x value is inferred. The x value can also be omitted, in which case the inner arrays should be of length 4. Then the x value is automatically calculated, either starting at 0 and incremented by 1, or from pointStart and pointInterval given in the series options.
    let returnObj = Object.create({})
    const returnAr = []
    const ranges = []
    const averages = []
    const yearKey = []
    const fcstYearData = getDataYearObjYearAr()
    // console.log('fcstyeardata', fcstYearData)
    for(const fcstYear in fcstYearData){
      yearKey.push(fcstYear)
      // console.log(fcstYear)
      const fcstYearDataAr = fcstYearData[fcstYear]
      const median = jStat.median(fcstYearDataAr)
      // const ninety = jStat.percentile(fcstYearDataAr, 0.9)
      // const seventyfive = jStat.percentile(fcstYearDataAr, 0.75)
      // const seventy = jStat.percentile(fcstYearDataAr, 0.70)
      // const thirty = jStat.percentile(fcstYearDataAr, 0.30)
      // const twentyfive = jStat.percentile(fcstYearDataAr, 0.25)
      // const tenth = jStat.percentile(fcstYearDataAr, 0.1)

      const ninety = jStat.percentile(fcstYearDataAr, 0.1)
      const seventyfive = jStat.percentile(fcstYearDataAr, 0.25)
      const seventy = jStat.percentile(fcstYearDataAr, 0.30)
      const thirty = jStat.percentile(fcstYearDataAr, 0.70)
      const twentyfive = jStat.percentile(fcstYearDataAr, 0.75)
      const tenth = jStat.percentile(fcstYearDataAr, 0.9)

      const maxVal = Math.max(...fcstYearDataAr)
      const minVal = Math.min(...fcstYearDataAr)
      const sum = jStat.sum(fcstYearDataAr)
      returnObj[fcstYear] = {median, ninety, seventyfive, seventy, thirty, twentyfive, tenth, sum, maxVal, minVal, yearData: fcstYearDataAr, yearKey}
      // // returnAr.push([parseFloat(fcstYear), openClose, high, low, openClose])
      // averages.push([parseFloat(fcstYear), openClose])
      // ranges.push([parseFloat(fcstYear),low, high])
    }
    return returnObj
    // console.log('ranges', JSON.stringify(ranges))
    // console.log('averages', JSON.stringify(averages))
  }
  return {getDataYearObYearSum, getFcstYearAr, getDataYearObjYearAr, getCandlestickData, getFcstYearStats, fullDataObject, getFcstYearMedianNinetyTenth}
}

function makeYearFcstYearObj(data){

  const dataSplit = data.split(/\r?\n/);
  const yearData = dataSplit[2]
  const yearArray = yearData.split(' ').filter(curr => curr.length > 0 && Number.isInteger(Number(curr)))
  const forecastDataObject = Object.create({})
  dataSplit.map((currRow, i)=>{
    if(i>2){
      const currRowAr = currRow.split(' ').filter(curr => curr.length > 0 )
      // console.log(currRowAr[0])
      if(currRowAr[0]){

        const currFcstDate = currRowAr[0].split('/')
        const currFcstMonth = currFcstDate[0]
        const currFcstYear = currFcstDate[1]
        let currFcstWaterYear = currFcstMonth >=10 && currFcstMonth<=12 ? makeWaterYear(currFcstYear) : currFcstYear
        currRowAr.splice(0, 1)
        if(!forecastDataObject[currFcstWaterYear]){
          forecastDataObject[currFcstWaterYear] = {}
        }
        currRowAr.map((currVol, i)=>{
          if(yearArray[i] && !forecastDataObject[currFcstWaterYear][yearArray[i]]){
            forecastDataObject[currFcstWaterYear][yearArray[i]] = []
          }
          forecastDataObject[currFcstWaterYear][yearArray[i]].push(parseFloat(currVol))
          // console.log(currVol, yearArray[i])
        })
      }
      // console.log(currFcstDate)
    }
  })
  // console.log('forecastDataObject', forecastDataObject)
  return forecastDataObject
}

function makeWaterYear(year){
  const nextYear = parseFloat(year)+1
  return nextYear.toString()
}