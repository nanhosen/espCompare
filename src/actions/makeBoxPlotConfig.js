// import { chart } from "highcharts"
import { formatForHighcharts } from "./formatESPData"

var n=1
const defaultDataKey = ['10', '30', 'median', '70', '90']
const configInit = {

  chart: {
      type: 'boxplot',
      spacingBottom:0.1,
      
      // marginBottom:10
  },

  title: {
      text: 'Highcharts box plot styling'
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
          fontSize: 'italic'
      }
  },
},

  xAxis: {
    title: {
      text: 'Water Year',
      style: {
        fontSize: '1.1em'
      }
  }
  },

  yAxis: {
      title: {
          text: ''
      }
  },
  tooltip: {
    formatter: function(tooltip){
      const symbol = '●'
      const dot = '<span style="color:' + this.series.color + '">' + symbol + '</span>' 
      // console.log('this from formatter', this)
      // console.log('tooltip from formatter', tooltip)
      const currDataArray = this.series.chart.options.series.filter(currMonthData=>currMonthData.name === this.series.name )
      // console.log('serioes data', this.series.chart.options.series)
      const currDataObject = currDataArray[0]
      // console.log('currDataArray', currDataArray)
      // console.log('currDataObject', currDataObject)
      const currMonthYearData = currDataObject.data[this.point.index]
      const currFcstYear = this.point.category
      // console.log(currMonthYearData, 'asdf')
      
      const tooltipArray = [dot,`<b>${this.series.name} (${currFcstYear})</b><br />`]
      currMonthYearData.map((currData, index)=>{
        const dataName = defaultDataKey[index]
        // console.log('dataname', dataName, currData)
        tooltipArray.push(`<b>${dataName}%</b>:`)
        // tooltipArray.push(':')
        tooltipArray.push(Math.round(currData))
        tooltipArray.push('<br>')
      })
      // console.log('tooltip array', tooltipArray)
      // console.log('joined', tooltipArray.join(' '))
      return tooltipArray.join(' ')
    },
    // headerFormat: 'hi{point.category}<br />',
    // pointFormatter: function() {
    //   // const x = this.x;
    //   // const currentData = this.series.data.find(data => data.x === x);
    //   // this.series.data.find(data=>{
    //   //   console.log('data from find thing', data)
    //   // })
    //   // console.log('this key', this.key)
    //   // console.log('series name', this.series.name)
    //   // console.log('this series data', this.series.data)
    //   // console.log('curretn data', currentData)
    //   // console.log('this data group', this.dataGroup)
    //   // console.log('this name', this.name)
    //   // console.log('this category (year)', this.category)
    //   // console.log('this', this)
    //   // console.log('this data', this.series.data[this.index])
    //   // console.log('all months data for year', this.series.data[this.index].series.chart.options.series)
    //   // console.log(this.series.chart.options.series)
    //   // this.series.chart.options.series.filter(currMonthData=>{
    //   //   console.log(currMonthData.name, currMonthData, 'from mappingthing')
    //   // })
    //   const currDataArray = this.series.chart.options.series.filter(currMonthData=>currMonthData.name === this.series.name )
    //   const currDataObject = currDataArray[0]
    //   const currMonthYearData = currDataObject.data[this.index]
    //   const tooltipArray = [`<b>${this.series.name}</b><br />`]
    //   currMonthYearData.map((currData, index)=>{
    //     const dataName = defaultDataKey[index]
    //     console.log('dataname', dataName, currData)
    //     tooltipArray.push(`<b>${dataName}%</b>:`)
    //     // tooltipArray.push(':')
    //     tooltipArray.push(Math.round(currData))
    //     tooltipArray.push('<br>')
    //   })
    //   // console.log('tooltip array', tooltipArray)
    //   // console.log('joined', tooltipArray.join(' '))
    //   return tooltipArray.join(' ')
    //   // dataKey: (5) ['10', '30', 'median', '70', '90']
    //   // console.log('curr ten',currMonthYearData[0])
    //   // console.log('curr 30',currMonthYearData[1])
    //   // console.log('curr 50',currMonthYearData[2])
    //   // console.log('curr 70',currMonthYearData[3])
    //   // console.log('curr 90',currMonthYearData[4])
    //   // const boxplotValues = currentData ? currentData.options : {};
    //   // return `Max: ${boxplotValues.high}<br>
    //   //         Q3: ${boxplotValues.q3}<br>
    //   //         Median: ${boxplotValues.median}<br>
    //   //         Q1: ${boxplotValues.q1}<br>
    //   //         Low: ${boxplotValues.low}<br>`;
    //   }
  },

  plotOptions: {
      boxplot: {
          groupPadding:0.2,
          boxDashStyle: 'solid',
          // fillColor: 'pink',
          lineColor: 'black',
          lineWidth: 1,
          // medianColor: '#0C5DA5',
          medianDashStyle: 'solid',
          medianWidth: 1,
          stemColor: 'black',
          stemDashStyle: 'solid',
          stemWidth: 1,
          whiskerColor: 'black',
          whiskerLength: '20%',
          whiskerWidth: 1,
          pointWidth:10
      },
       series: {
        boostThreshold: 2000  
          /* groupPadding: -5 */
        //   states: {
        //     hover: {
        //         enabled: false
        //     }
        // }
          
          
      }
  },

  

}
// oxPlotData:
// BMDC2:
// apr22:
// data: (6) [Array(5), Array(5), Array(5), Array(5), Array(5), Array(5)]
// dataKey: (5) ['10', '30', 'median', '70', '90']
// name: "apr22"
// yearKey: (6) ['2022', '2023', '2024', '2025', '2026', '2027']
// [[Prototype]]: Object
// dec21: {name: 'dec

// this is what makeBoxplotData incoming data looks like:
// apr22:
// 2022:
// maxVal: 836.53
// median: 505.801
// minVal: 278.897
// ninety: 359.52709999999996
// seventy: 397.81690000000003
// seventyfive: 381.809
// sum: 15537.258
// tenth: 722.8915000000001
// thirty: 597.8976
// twentyfive: 641.68975
// yearData: (30) [667.005, 390.854, 744.082, 369.852, 836.53, 516.905, 563.578, 651.368, 684.587, 365.481, 364.355, 427.571, 294.696, 591.5730000000001, 612.655, 278.897, 361.79799999999994, 442.818, 785.528, 689.7180000000001, 720.537, 339.08899999999994, 378.79400000000004, 400.80100000000004, 537.897, 494.697, 425.268, 538.018, 576.031, 486.275]
// yearKey: (6) ['2022', '2023', '2024', '2025', '2026', '2027']
// [[Prototype]]: Object
// 2023: 


// this is what need for format for highcharts:

// apr22:
// 2022:
// maxVal: 9385.923
// median: 4956.058499999999
// minVal: 2995.898
// ninety: 3812.3433
// seventy: 4499.327499999999
// seventyfive: 4419.161
// sum: 155716.453
// tenth: 6637.667400000002
// thirty: 5618.779299999999
// twentyfive: 5776.879500000001
// yearData: (30) [5052.964, 4514.134, 5790.85, 4843.185, 9385.923, 4403.955, 6557.442000000001, 4930.661999999999, 8439.096999999998, 3931.6820000000002, 5127.352000000001, 2995.898, 4981.455, 4922.768, 5143.547, 3829.02, 4519.873, 4519.002, 5787.549000000001, 5564.74, 7359.696, 3268.6589999999997, 5177.383000000001, 4464.7789999999995, 6367.898999999999, 5744.871, 4368.908, 4096.981, 5963.926, 3662.253]
// yearKey: (6) ['2022', '2023', '2024', '2025', '2026', '2027']
// [[Prototype]]: Object
// 2023: {medi



function makeBoxplotData(data){
  const returnData = Object.create({})
  // console.log('datahere %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%', data)
  for(const monthYear in data){
    returnData[monthYear]= Object.create({})
    const allStationData = data[monthYear]
    returnData[monthYear] = formatForHighcharts({[monthYear]:allStationData}).formatBoxPlotHighcharts()
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

export function makeConfig({propHeight, propWidth}, station, agnosticData, dataType){
  // console.log('agnostic data', agnosticData)
  // const {height, width} = size
  const width = propWidth - 50
  // console.log('data', stationData, propHeight, station)
  // const dataKey = stationData.dataKey
  // const propHeight = 520
  // const {plotData: data, name, yearKey: categories} = data
  // const height = propHeight ? `${600-20}px` : '200px'
  // const height = propHeight ? `${propHeight-20}px` : '200px'
  // console.log('agnosticData', agnosticData)
  const rawBoxplotFormat = makeBoxplotData(agnosticData.raw)
  const adjBoxplotFormat = makeBoxplotData(agnosticData.adj)
  // const reshapedData = reshapeData(stationData)
  const inputData = Object.create({})
  if(dataType === 'both'){
    inputData.raw = makeBoxplotData(agnosticData.raw)
    inputData.adj = makeBoxplotData(agnosticData.adj)
  }
  else if(dataType === 'raw'){
    inputData.raw = makeBoxplotData(agnosticData.raw)
  }
  else if(dataType === 'adj'){
    inputData.adj = makeBoxplotData(agnosticData.adj)
  }
  else{
    console.log('input data type is wrong', dataType, 'going to use adjusted data')
    inputData.raw = makeBoxplotData(agnosticData.raw)

  }
  const reshapedDataBoth = reshapeDataBoth(inputData)
  // console.log('reshapedData', reshapedData)
  // console.log('reshapedDataBoth', reshapedDataBoth)
  const seriesArray = []
  let  categories

  for(const dataType in reshapedDataBoth){
    const currData = reshapedDataBoth[dataType]
    const currSeries = currData.series
    // let mostRecentThreeMonths
    // if(currSeries.length >3){
    //   const lastIndex = currSeries.length -1
    //   mostRecentThreeMonths = [ currSeries[lastIndex-2], currSeries[lastIndex-1], currSeries[lastIndex]]
    // }
    // else{
    //   mostRecentThreeMonths = currSeries
    // }
    seriesArray.push(...currSeries)
    // console.log('cotagoeries', currData)
     categories = currData.categories
  }
  const bothTypesObject = {categories, series: seriesArray}
  // console.log('bothTycategoriespesObject.series array', categories)
  // console.log('bothTypesObject', bothTypesObject)
  // console.log('itinit coreshapedDatanfig', reshapedData)
  // const newConfig = Object.assign({}, configInit, data.series, {})
  const newxaxis = {...configInit.xAxis}
  const newConfig = 
    {
      ...configInit, 
      chart: {...configInit.chart, width},
      series:bothTypesObject.series, 
      xAxis:{...configInit.xAxis, categories}, 
      // chart: {...configInit.chart, height},
      title:{
        ...configInit.title,
        text:`${makePlotTitle(station)} Excedance Probability Forecast`
      }
    }
  // console.log('nnewconfig', newConfig)
  return newConfig


}
const equals = (a, b) =>
  a.length === b.length &&
  a.every((v, i) => v === b[i]);
//   boxplot: {
//     boxDashStyle: 'Dash',
//     fillColor: '#F0F0E0',
//     lineWidth: 2,
//     medianColor: '#0C5DA5',
//     medianDashStyle: 'ShortDot',
//     medianWidth: 3,
//     stemColor: '#A63400',
//     stemDashStyle: 'dot',
//     stemWidth: 1,
//     whiskerColor: '#3D9200',
//     whiskerLength: '20%',
//     whiskerWidth: 3
// }
function reshapeData(inputData,dataType){
  // console.log('type', dataType, 'input data', inputData, 'leng', Object.keys(inputData).length)
    if(Object.keys(inputData).length >3){
      const firstKey = Object.keys(inputData)[0];
      delete inputData[firstKey];
    }
  // console.log('inputData', inputData)
  const seriesAr = []
  let categoriesAr
  let i = 0
  const allDataYearsWithDuplicates = [] //  adding all data years here and then will do a set to delete duplicates. this is to get the years that will go at the bottom of the chart
  for(const monthName in inputData){
    const currDat = inputData[monthName]
    const dataYears = currDat.yearKey
    allDataYearsWithDuplicates.push(...dataYears)
  }
  const allDataYearsUnique = new Set(allDataYearsWithDuplicates)
  const sortedYearLabels = [...allDataYearsUnique].sort((a, b) => a.localeCompare(b))
  // console.log('sortedYearLabels', typeof(sortedYearLabels))
  // console.log('sortedYearLabels', sortedYearLabels)
  // const colorAr = ["#f94144","#f3722c","#f8961e","#f9c74f","#90be6d","#43aa8b","#577590","#f94144","#f3722c","#f8961e","#f9c74f","#90be6d","#43aa8b","#577590","#f94144","#f3722c","#f8961e","#f9c74f","#90be6d","#43aa8b","#577590","#f94144","#f3722c","#f8961e","#f9c74f","#90be6d","#43aa8b","#577590","#f94144","#f3722c","#f8961e","#f9c74f","#90be6d","#43aa8b","#577590","#f94144","#f3722c","#f8961e","#f9c74f","#90be6d","#43aa8b","#577590","#f94144","#f3722c","#f8961e","#f9c74f","#90be6d","#43aa8b","#577590"]
  // const colorAr = ["#0fb5ae", "#4046ca", "#f68511", "#de3d82", "#7e84fa", "#72e06a", "#147af3", "#7326d3", "#e8c600", "#cb5d00", "#008f5d", "#bce931"]
  // const colorAr = ["#88e99a", "#a41415", "#aaf841", "#942bf3", "#769d31", "#69306e", "#2cf52b", "#f058a4", "#0b5313", "#edb4ec", "#19a71f", "#ab719e", "#f0e746", "#3451d3", "#fb7810", "#1aa7ee", "#914c0f", "#1ceaf9", "#4f4447", "#dee7bc", "#598d83", "#fab899"]
  // const colorAr =["#85e8b7", "#f849b6", "#5ac230", "#961d6b", "#069668"]
  const colorAr = ["#003f5c","#7a5195","#bc5090","#ef5675","#374c80","#ff764a","#ffa600"  ]
  for(const monthName in inputData){
    const monthData = inputData[monthName]
    // console.log('monthData', monthData)
    // console.log(i, monthName, colorAr[i])
    const dataColor = colorAr[i] ? colorAr[i] : 'black'
    // const {name, data, yearKey: categories} = monthData
    const {name, data, yearKey} = monthData
    const fullDataAr = []
    sortedYearLabels.map((currYear, i)=>{ //mapping over list of full years. if a the list year doesn't exist in the datset will create blank data array
      const currDataIndex = yearKey.indexOf(currYear)
      if (currDataIndex >=0){
        fullDataAr.push(data[currDataIndex])
      }
      else{
        fullDataAr.push([])
      }

    })
    // console.log('fullDataAr', fullDataAr)
    // yearKey looks like this: ['2024', '2025', '2026', '2027']. Need to check against all data years because some will be missing years. for example, some datasets have the year 2023 but this one doesnt so need to ad a blank array or something for 2023
    const seriesName = dataType ?  `${name}${dataType}` : name
    // console.log('categories', categories)
    seriesAr.push(
      {
        name:seriesName, 
        data: fullDataAr, 
        color:dataColor,
        colorIndex: dataColor,
        fillColor: dataColor,
        medianColor: 'black',
        whiskerColor: 'black',
        whiskerLength: '90%',
        stemColor: 'black',
      }
    )
    // if(!categoriesAr){
    //   categoriesAr = categories
    // }
    // if(!equals(categories, categoriesAr)){
    //   console.log('different years', categories, categoriesAr)
    // }
    i = i + 1
  }
  // console.log('returnObj', {series: seriesAr, categories: categoriesAr})
  return {series: seriesAr, categories: sortedYearLabels}
}




function reshapeDataBoth(inputData={}){
  const {raw, adj} = inputData
  const returnObj = Object.create({})

  for(const type in inputData){
    const currData = inputData[type]
    // console.log('currData', reshapeData(currData, type))
    returnObj[type] = reshapeData(currData, type)
    // reshapeData(currData, type)

  }
  return returnObj
  // const seriesAr = []
  // let categoriesAr
  // let i = 0
  // // const colorAr = ["#f94144","#f3722c","#f8961e","#f9c74f","#90be6d","#43aa8b","#577590","#f94144","#f3722c","#f8961e","#f9c74f","#90be6d","#43aa8b","#577590","#f94144","#f3722c","#f8961e","#f9c74f","#90be6d","#43aa8b","#577590","#f94144","#f3722c","#f8961e","#f9c74f","#90be6d","#43aa8b","#577590","#f94144","#f3722c","#f8961e","#f9c74f","#90be6d","#43aa8b","#577590","#f94144","#f3722c","#f8961e","#f9c74f","#90be6d","#43aa8b","#577590","#f94144","#f3722c","#f8961e","#f9c74f","#90be6d","#43aa8b","#577590"]
  // const colorAr = ["#0fb5ae", "#4046ca", "#f68511", "#de3d82", "#7e84fa", "#72e06a", "#147af3", "#7326d3", "#e8c600", "#cb5d00", "#008f5d", "#bce931"]
  // for(const monthName in inputData){
  //   const monthData = inputData[monthName]
  //   // console.log(i, monthName, colorAr[i])
  //   const dataColor = colorAr[i] ? colorAr[i] : 'black'
  //   const {name, data, yearKey: categories} = monthData
  //   seriesAr.push(
  //     {
  //       name, 
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
  //   if(!categoriesAr){
  //     categoriesAr = categories
  //   }
  //   if(!equals(categories, categoriesAr)){
  //     console.log('different years')
  //   }
  //   i = i + 1
  //   // console.log('categories', categories)
  // }
  // return {series: seriesAr, categories: categoriesAr}
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

function makePlotColor(id){
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
  return titleObj[id] ? titleObj[id] : id
}