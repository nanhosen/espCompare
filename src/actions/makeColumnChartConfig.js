import { formatForHighcharts } from "./formatESPData"
export function makeConfig(data, {propHeight, propWidth}, station,agnosticData, dataType){
  // console.log('data', data)
  const {categories, series} = data
  const height = propHeight ? `${propHeight-20}px` : '200px'
  const width = propWidth - 50
  const rawMedianData = makeMedianData(agnosticData.raw)
  const adjMedianData = makeMedianData(agnosticData.adj)
  const inputData = Object.create({})

  if(dataType === 'both'){
    inputData.raw = makeMedianData(agnosticData.raw)
    inputData.adj = makeMedianData(agnosticData.adj)
  }
  else if(dataType === 'raw'){
    inputData.raw = makeMedianData(agnosticData.raw)
  }
  else if(dataType === 'adj'){
    inputData.adj = makeMedianData(agnosticData.adj)
  }
  else{
    console.log('input data type is wrong', dataType, 'going to use adjusted data')
    inputData.raw = makeMedianData(agnosticData.raw)

  }
  // console.log('input data', inputData)
  const reshapedDataBoth = reshapeDataBoth(inputData)
  // console.log('reshapedDataBoth', reshapedDataBoth)
  const seriesArray = []
  for(const dataType in reshapedDataBoth){
    const currData = reshapedDataBoth[dataType]
    const currSeries = currData.series
    seriesArray.push(...currSeries)
  }
  // console.log('serieos array', seriesArray)
  // console.log('series', series)
  // const bothTypesObject = {...reshapedData, series: seriesArray}
  // console.log('adjMedian', adjMedianData, 'adj raw', rawMedianData, 'reashapedboth', reshapedDataBoth)
  // console.log('itinit config', configInit)
  // const newConfig = Object.assign({}, configInit, data.series, {})
  const newxaxis = {...configInit.xAxis, categories}
  const newConfig = 
    {
      ...configInit, 
      chart:{...configInit.chart, width},
      series: seriesArray, 
      xAxis:{...configInit.xAxis, categories}, 
      // chart: {...configInit.chart, height},
      title:{
        ...configInit.title,
        text:`${makePlotTitle(station)} Median Forecast`
      }
    }
  // console.log('nnewconfig', newConfig)
  return newConfig


}
const equals = (a, b) =>
  a.length === b.length &&
  a.every((v, i) => v === b[i]);
var n=1
const colorAr = ["#0fb5ae", "#4046ca", "#f68511", "#de3d82", "#7e84fa", "#72e06a", "#147af3", "#7326d3", "#e8c600", "#cb5d00", "#008f5d", "#bce931"]

const configInit = {
  chart: {
      type: 'column',
      // height:'200px'
  },
  title: {
      text: '',
      align: 'left',
  },
  subtitle: {
    text: 'median',
    align: 'left',
},
legend: {
  layout: 'vertical',
  backgroundColor: '#FFFFFF',
  align: 'right',
  verticalAlign: 'top',
  floating: false,
  x: 0,
  y: 25,
  title: {
    text: 'Forecast Month<br/><span style="font-size: 9px; color: #666; font-weight: normal">(Click to hide)</span>',
    style: {
        fontStyle: 'italic'
    }
},
},
  subtitle: {
      text: ''
  },
  xAxis: {
      categories: ["2022","2023","2024","2025","2026","2027"],
      crosshair: true
  },
  yAxis: {
      min: 0,
      endOnTick:true,
      tickInterval:100,
      title: {
          text: ''
      }
  },
  tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
  },
  plotOptions: {
      column: {
          pointPadding: 0.2,
          borderWidth: 0
      },
      series: {
        events: {
            hide: function () {

            }
        }
      },
      colors: colorAr
  },
  // series:[{"name":"feb22","data":[6257.433000000001,8537.610499999999,8989.46,9106.5395,9085.471,1695.4189999999999]},{"name":"mar22","data":[5233.83,8386.6415,8921.1905,9096.1875,9075.9375,2044.792]},{"name":"apr22","data":[4664.1955,8187.751,8910.541000000001,9114.053500000002,9103.1335,2545.48]},{"name":"may22","data":[3704.1385,8131.341,8892.2495,9093.7435,9101.8795,3494.147]}]
} 

function reshapeData(inputData,dataType){
  // console.log('type', dataType, 'input data', inputData) 
  const returnObj = Object.create({})
  const seriesAr = []
  let categoriesAr
  // let i = 0
  // const colorAr = ["#f94144","#f3722c","#f8961e","#f9c74f","#90be6d","#43aa8b","#577590","#f94144","#f3722c","#f8961e","#f9c74f","#90be6d","#43aa8b","#577590","#f94144","#f3722c","#f8961e","#f9c74f","#90be6d","#43aa8b","#577590","#f94144","#f3722c","#f8961e","#f9c74f","#90be6d","#43aa8b","#577590","#f94144","#f3722c","#f8961e","#f9c74f","#90be6d","#43aa8b","#577590","#f94144","#f3722c","#f8961e","#f9c74f","#90be6d","#43aa8b","#577590","#f94144","#f3722c","#f8961e","#f9c74f","#90be6d","#43aa8b","#577590"]
  // const colorAr = ["#0fb5ae", "#4046ca", "#f68511", "#de3d82", "#7e84fa", "#72e06a", "#147af3", "#7326d3", "#e8c600", "#cb5d00", "#008f5d", "#bce931"]
  for(const monthName in inputData){
    const monthData = inputData[monthName]
    // console.log('monthData', monthData)
    const {series, categories} = monthData
    // console.log('series', series, 'categories', categories)
    const seriesData = series[0]
    const {name, data} = seriesData
    const seriesNames = dataType ?  `${name}${dataType}` : name
    const newSeriesData = {name: seriesNames, data}
    returnObj.categories = categories
    seriesAr.push(newSeriesData)

    // console.log(i, monthName, colorAr[i])
    // const dataColor = colorAr[i] ? colorAr[i] : 'black'
  //   const {name, data, yearKey: categories} = monthData
    // const seriesName = dataType ?  `${name}${dataType}` : name
  //   // console.log('categories', categories)
  //   // console.log('series name', seriesName)
  //   seriesAr.push(
  //     {
  //       name:seriesName, 
  //       data, 
  //       color:dataColor,
  //       colorIndex: dataColor,
  //       fillColor: dataColor,
  //       medianColor: 'black',
  //       whiskerColor: 'black',
  //       whiskerLength: '90%',
  //       stemColor: 'black',
  //     }
  //   )
    if(!categoriesAr){
      categoriesAr = categories
    }
    // if(!equals(categories, categoriesAr)){
    //   console.log('different years')
    // }
  //   i = i + 1
  }
  // console.log('this will be the data', {series: seriesAr, categories: categoriesAr})
  return {series: seriesAr, categories: categoriesAr}
}

function makeMedianData(data){
  const returnData = Object.create({})
  // console.log('datahere', data)
  for(const monthYear in data){
    returnData[monthYear]= Object.create({})
    const allStationData = data[monthYear]
    returnData[monthYear] = formatForHighcharts({[monthYear]:allStationData}).formatMedianColumnHighcharts()
    // highchartsMedianColumnData[value.station]['series'].push(highTest1.series[0])
    // highchartsMedianColumnData[value.station]['categories']=highTest1.categories
    // console.log('allStatioonData', allStationData)
    // for(const year in allStationData){
    //   const stationMonthData = allStationData[year]
    //   console.log('year', year)
    //   console.log('stationmonthdata', stationMonthData)
    //   // console.log('boxplotFormat', boxPlotFormat)
    // }
  }
  // console.log('returnData', returnData)
  return returnData
  // const boxPlotFormat = formatForHighcharts({[value.monthYear]:formattedData}).formatBoxPlotHighcharts()

}


function makePlotTitle(id){
  const titleObj = {
    YDLC2: "Yampa",
    GJLOC:"GJLOC",
    DRGC2:"Durango",
    NVRN5:"Navajo",
    VCRC2:"Vallecito",
    TPIC2:"Taylor Park",
    CLSC2:"Crystal",
    BMDC2:"Blue Mesa",
    MPSC2:"Morrow Point",
    GRNU1:"Flaming Gorge",
    GBRW4:"Fontenelle",
    GLDA3:"Lake Powell"
  }
  return titleObj[id] ? `${titleObj[id]} (${id})` : id
}


function reshapeDataBoth(inputData={}){
  // console.log('input data intor reshape data both', inputData)
  const {raw, adj} = inputData
  const returnObj = Object.create({})

  for(const type in inputData){
    const currData = inputData[type]
    // console.log('currData', reshapeData(currData, type))
    returnObj[type] = reshapeData(currData, type)
    reshapeData(currData, type)

  }
  return returnObj
  
}