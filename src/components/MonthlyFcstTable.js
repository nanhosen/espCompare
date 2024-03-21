import React, {useEffect, useState, useRef, useContext} from 'react';
import AppContext from '../context/AppContext'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import checkArrayEquality from '../actions/checkArrayEquality';
import formatTableData from '../actions/formatTableData';
import {calcPercentDiff} from '../actions/calStats'
import { CallMissedOutgoing } from '@mui/icons-material';
export default function MonthlyFcstTable(props){
  const monthNameKeyCalendarYear = {
    1:'jan',
    2:'feb',
    3:'mar',
    4:'apr',
    5:'may',
    6:'jun',
    7:'jul',
    8:'aug',
    9:'sep',
    10:'oct',
    11:'nov',
    12:'dec'
  }
  const monthNameKeyWaterYear = {

    1:'oct',
    2:'nov',
    3:'dec',
    4:'jan',
    5:'feb',
    6:'mar',
    7:'apr',
    8:'may',
    9:'jun',
    10:'jul',
    11:'aug',
    12:'sep'
  }
  const {station} = props 
  const context = useContext(AppContext)
  const [tableDataOrig, setTableDataOrig]= useState()
  const [tableData, setTableData] = useState(null)
  const [tableIssuanceMonths, setTableIssuanceMonths] = useState(null)
  const [tableDates, setTableDates] = useState(null)
  useEffect(()=>{
    console.log('monthly table saw data type change', context.dataType)
  },[context.dataType])
  useEffect(()=>{
    console.log('table saw data type change', context.dataType)
    if(context.stationCompareDates && context.stationCompareDates[station] && context?.agnosticStationData[station]){
      const dataDisplayType = context.dataType === 'both' ? 'raw' :  context.dataType
      const {date1, date2} = context.stationCompareDates[station][dataDisplayType]
      setTableDates({date1, date2})
      const unformattedData =  context.agnosticStationData[station][dataDisplayType]
      // console.log('table data', context.agnosticStationData[station][dataDisplayType])
      const issuanceMonths = Object.keys(unformattedData)
      // console.log('issuanceMonths,',issuanceMonths)
      // console.log('unformattedData', unformattedData)
      // const tableDataOrigDataArray = Object.create({})
      const tableDataOrigDataObject = Object.create({})
      // tableDataOrigDataObject looks like this
      // {'jan24':{ the key is the forecast date. so, these are the volumes forecast for january
        // jan23:200, the keys down here are the issuance date. so that is the forecast for january issued in january
        // feb23:230, 
        // mar23:25
    //   }
    // }
      for( const issuanceDate in unformattedData){
        const issuanceData = unformattedData[issuanceDate]
        // console.log('issuance data', issuanceData)
        for(const fcstYear in issuanceData){
          const fcstYearData = issuanceData[fcstYear]?.monthlyStatData
          for(const fcstMonth in fcstYearData){
            const fcstMonthVolume = fcstYearData[fcstMonth]?.median
            // const monthName = monthNameKeyCalendarYear[fcstMonth]
            const monthName = monthNameKeyWaterYear[fcstMonth]
            const yearName = String(fcstYear).slice(-2)
            const fcstDateStr = `${monthName}${yearName}`
            // console.log('fcstDateStr', fcstDateStr)
            // console.log('fcstMonth', fcstMonth, 'year', fcstYear, 'data', fcstMonthVolume, 'monthName', monthName)
            // if(!tableDataOrigDataArray.hasOwnProperty(fcstDateStr)){
            //   tableDataOrigDataArray[fcstDateStr]={
            //     data:[],
            //     simDates:[]
            //   }
            // }
            // tableDataOrigDataArray[fcstDateStr]['simDates'].push(issuanceDate)
            // tableDataOrigDataArray[fcstDateStr]['data'].push(fcstMonthVolume)
            if(!tableDataOrigDataObject.hasOwnProperty(fcstDateStr)){
              tableDataOrigDataObject[fcstDateStr]=Object.create({})
              }
            tableDataOrigDataObject[fcstDateStr][issuanceDate]=fcstMonthVolume
          }
        }
      }
      // console.log('tableDataOrigDataArray', tableDataOrigDataArray)
      // console.log('tableDataOrigDataObject', tableDataOrigDataObject)
      const {tableRowData, tableIssuanceMonths} = makeIntoRowData(issuanceMonths,tableDataOrigDataObject)
      // console.log('tableRowData', tableRowData)
      setTableData(tableRowData)
      setTableIssuanceMonths(tableIssuanceMonths)
      //data is fed in rows, so need to reorganize to send an entire forecast month data. right now it is by issuance month
      // so think want data to look like this:
      //okay that is tableDataOrigDataArray setup
    //   {'jan24':{
    //     data: [200,230,255,253]
    //     simDates: [jan23, feb23, mar23]
    //   }
    // }
    //the danger here is that the sim dates are the columns and if just go by index could get data in wrong sim date. think will have
    // to do the object keys as the sim dates wanted and then find index of that to make sure that i have that data. coul
    // data obj way will look like this:
    // {'jan24':{
          // jan23:200,
          // feb23:230, 
          // mar23:25
      //   }
      // }
      const month1Info = context.agnosticStationData[station][dataDisplayType][date1]
      const month2Info = context.agnosticStationData[station][dataDisplayType][date2]
      const month1Data = month1Info
      const month2Data = month2Info
      const month1Years = Object.keys(month1Info)
      const month2Years = month2Info ? Object.keys(month2Info) : []
      const yearArray = checkArrayEquality(month1Years, month2Years) ? month1Years : month1Years
      const dataByFcstYear = Object.create({})
      dataByFcstYear.fcstDateStr = month1Info.fcstDateStr
      yearArray.map((currYear,i)=>{
        const month1YearData = month1Data[currYear]
        const month2YearData = month2Data[currYear]

        const month1Sim = month1YearData ? createRowSim(
          date1, 
          month1YearData.ninety,
          month1YearData.seventy,
          month1YearData.median,
          month1YearData.thirty,
          month1YearData.tenth,
        ) : null
        const month2Sim = month2YearData ? createRowSim(
          date2, 
          month2YearData.ninety,
          month2YearData.seventy,
          month2YearData.median,
          month2YearData.thirty,
          month2YearData.tenth,
        ) : null
        const rowSims = month1Sim && month2Sim ? [month1Sim, month2Sim] : null
        const rowDiff = rowSims ?  createRowDiff(rowSims[1], rowSims[0]) : null
        // console.log('curr year', currYear, 'rowSims', rowSims, 'rowDiff', rowDiff)
        
        if(rowDiff && rowSims){
          // console.log('i should be making data')
          dataByFcstYear[currYear]={rowSims, rowDiff}
        }
        else{
          // console.log(' i dont have the right data', rowDiff, rowSims)
        }
      })
      // console.log('setTableDataOrig dataByFcstYear', dataByFcstYear)
      setTableDataOrig(dataByFcstYear)
    }
    else{
      console.log('missing important intofo',context.stationCompareDates , context.stationCompareDates[station] , context?.agnosticStationData[station])
    }

    // console.log('month1years', month1Years, 'month2years', month2Years, checkArrayEquality(month1Years, month2Years),yearArray)
    // console.log('month1Info',month1Info, month1Data, 'month2Data 2 adt', month2Data)
    // console.log(station, context.boxPlotData[station], date1, date2)
  },[context.agnosticStationData, context.stationCompareDates, context.dataType, station])

  useEffect(()=>{
    // console.log('tabledata', tableData)
  },[tableData])

  if(tableData && tableIssuanceMonths){

    return(
      <Grid item xs={6} md={6} lg={6}   component="div">
        <Paper
        
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 750,
          }}
        >
        <Typography align="left" variant='h6'>
          Chance of Exceeding River Levels for: {station} ({ context.dataType === 'both' ? 'adj' :  context.dataType}) {tableDates ? tableDates.date2 : 'Missing'} - {tableDates ? tableDates.date1 : 'Missing'}
        </Typography>
        {/* <Typography align="left">Forecast Period: 2022-10-01 - 2027-04-06    </Typography> */}
  
          <SingleTable key={props.station} station = {props.station} tableData = {tableData ? tableData : null} issuanceMonths = {tableIssuanceMonths} />
  
        </Paper>
      </Grid>
    )
  }
  else{
    return(
      <>
        
      </>
    )

  }


  const message = `Truncation should be conditionally applicable on this long line of text
  as this is a much longer line than what the container can support. `;
}
function sortDateStrAr(dateStrAr){
  // const dateStrAr = ['jan23', 'apr23', 'jan22', 'mar23'];
  function convertToDatetime(dateStr) {
    const monthStr = dateStr.slice(0, 3);
    const yearStr = dateStr.slice(3);
  
    const monthDict = {
      jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
      jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
    };
  
    const month = monthDict[monthStr.toLowerCase()];
    const year = parseInt(yearStr) + 2000;
  
    return new Date(year, month);
  }
  
  const sortedDateStrAr = dateStrAr.slice().sort((a, b) => {
    const dateA = convertToDatetime(a);
    const dateB = convertToDatetime(b);
    // return dateB - dateA; // Sorting in newest to oldest for dates or descending for strings
    return dateA - dateB; // Sorting in oldest to newest for dates or ascending for strings
  });
  
  // console.log(sortedDateStrAr);
  return sortedDateStrAr
}
function roundVal(inputVal, places){
  const isNum = !isNaN(inputVal)
  return isNum ? inputVal.toFixed(places) : 'M'
}
function makeIntoRowData(issuanceMonths, dataObject){
  //issuance months are all the forecast issuance months as mmmYYY, so jan23
  //data object is this: 
  // {'jan24':{ the key is the forecast date. so, these are the volumes forecast for january
        // jan23:200, the keys down here are the issuance date. so that is the forecast for january issued in january
        // feb23:230, 
        // mar23:25
    //   }
    // }
  const rowDataAr = []  
  const sortedIssuanceMonths =   sortDateStrAr(issuanceMonths)
  const forecastDateMonths = Object.keys(dataObject)
  const sortedFcstMonths =   sortDateStrAr(forecastDateMonths)
  const lastFourFcstMonths = sortedFcstMonths
  // const lastFourFcstMonths = sortedFcstMonths.slice(-20)
  const lastFourIssuanceMonths = sortedIssuanceMonths.slice(-4)
  // console.log('dataobject', dataObject)
  // console.log('issuanceMonths', issuanceMonths)
  // console.log('sortedIssuanceMonths', sortedIssuanceMonths)
  // console.log('lastFourIssuanceMonths', lastFourIssuanceMonths)
  // console.log('sortedFcstMonths', sortedFcstMonths)
  for(const fcstMonth of lastFourFcstMonths){
    // console.log('fcst month', fcstMonth)
    const fcstMonthRowData = [fcstMonth]
    const fcstMonthVolumeData = dataObject[fcstMonth]
    for (const issuanceMonth of lastFourIssuanceMonths){
      // console.log('fcst issuanceMonth', issuanceMonth)
      const issuanceMonthVol = fcstMonthVolumeData[issuanceMonth]
      fcstMonthRowData.push(issuanceMonthVol ? roundVal(issuanceMonthVol,2) : 'M')
      // console.log('fcst issuanceMonthVol', issuanceMonthVol)
    }
    // console.log('fcstMonthRowData', fcstMonthRowData)
    const arraySum = fcstMonthRowData.reduce((partialSum, a) => {
      if(!isNaN(parseInt(a))){
        return partialSum + parseInt(a)
      }
      else{
        return partialSum

      }
      }, 0);
    // console.log('fcstMonthRowData', fcstMonthRowData)
    // console.log('arraySum', arraySum)
    if(arraySum >0){

      rowDataAr.push(fcstMonthRowData)
    }

  }
  // console.log('rowDataAr', rowDataAr)
  return {tableRowData: rowDataAr, tableIssuanceMonths: lastFourIssuanceMonths}
  // okay, i am done here finishing for tdoay. last step is to format the data into rows so that the data looks like this:
  // [issuanceDate vol1, vol2, vol3, vol4, vol5]
  // am passing the issuanceMonths variable so that can make sure data is really under right month. will do like for fcst Date
  // in dateobject, and then for issuancedate in issuance months, if if isssuancedate in dateobject, push value else push missing 
  // or something like that. still have to figure out how to restrict the dates along the top and side but am getting closer
}
function SingleTable(props){
  // console.log('single table props', props)
  const {tableData, issuanceMonths} = props
  // console.log('props station t', Object.keys(tableData))
    

 
  // console.log('rowDiff', rowDiff)
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    textAlign:'center',
  }));
  const HeaderCell = styled(TableCell)(({ theme }) => ({
    textAlign:'center',
    fontWeight:'bold'
    // color:'red' 
    // '&:nth-of-type(odd)': {
    //   backgroundColor: theme.palette.action.hover,
    // },
    // // hide last border
    // '&:last-child td, &:last-child th': {
    //   border: 0,
    // },
  }));
  // const ColoredDiffcell = styled(TableCell)((props) => {
  //   // console.log('cell props', props.children, Number.isFinite(props.children))
  //   let cellColor = 'white'
  //   if(Number.isFinite(props.children)){
  //     cellColor = returnColorObject(props.children) ? returnColorObject(props.children) : 'white'
  //   }
  //   return({
  //   backgroundColor: cellColor,
  //   whiteSpace: 'nowrap'
  // })});
  // const invoiceSubtotal = subtotal(rows);
  // const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  // const invoiceTotal = invoiceTaxes + invoiceSubtotal;
  {/* <TableCell sx={{ mr: 2, borderRight: '0.01px solid #e0e0e0' }}>Start Date</TableCell> */}
  if (tableData && issuanceMonths){
    // console.log('props.stationdata', tableData) 
    // console.log('props.issuanceMonths', issuanceMonths) 
    
    const issuanceMonthsList = issuanceMonths.map((currMon,i)=><HeaderCell key={i}>{currMon}</HeaderCell>)
    // console.log('rest', rest)
    return(
      <TableContainer component={Paper} key={1}>
          the dates across the top are sim dates. The dates along the rows are the forecast dates
      <Table key={2} sx={{ minWidth: 300, maxWidth:700 }} size="small" aria-label="spanning table">
        <TableHead>
          <StyledTableRow hover>
            <HeaderCell >Fcst Date</HeaderCell>
            {issuanceMonthsList}
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {/* {rowSims.map((row,i) => { */}
            {/* console.log('row', row) */}
            {/* return ( */}
           {/* { WaterYearRows(testData.rowSims, testData.rowDiff)} */}
           {/* { WaterYearRows(rowSims, rowDiff)} */}
           {
            tableData.map((rowData,i)=>{

              return <WaterYearRows key = {i} index={i} rowData = {rowData} />
            })

  
           }
  
  
        </TableBody>
      </Table>
    </TableContainer>
    )
  }
  else{
    return(
      <>

        'hi'
      </>
    )

  }
}

function WaterYearRows(rowProps){
  const {index, rowData} = rowProps
  // rowData looks like this: ['mar27', 26.286, 26.279, 26.2795, 26.2705]
  // function WaterYearRows(index, forecastYear, rowSims, rowDiff){
    // console.log('rowSims in function', rowSims)
    // console.log('rowprops', rowProps)
    const ColoredDiffcell = styled(TableCell)((props) => {
    // console.log('diff cellprops', props)
    // console.log('cell props', props.children, Number.isFinite(props.children))
    let cellColor = 'white'
    const checkNum = Number.isFinite(props.children) ? props.children
      : props.percentvalue ? props.percentvalue
        : props.children
    if(Number.isFinite(checkNum)){
      // console.log('number', checkNum, 'ty[epf checknum', typeof checkNum, 'props children', props.children, 'has 0', props.children[0], props.children[1])
      const colorFunction = props.children[1] ? returnColorObjectPercent : returnColorObject
      // console.log('color function', colorFunction)
      cellColor = colorFunction(checkNum) ? colorFunction(checkNum) : 'white'
      // cellColor = returnColorObject(checkNum) ? returnColorObject(checkNum) : 'white'
      const percentColor = returnColorObjectPercent(checkNum<0 ? checkNum * -1 : checkNum)
      // console.log('number', checkNum, 'percent color', percentColor)
      if(checkNum < -500){
        // console.log('below 500', checkNum, 'color', cellColor)

      }
    }
    else{
      // console.log('not a number', checkNum,'is this a number', Number.isFinite(checkNum[0]))
    }
    return({
    backgroundColor: cellColor,
    textAlign:'center',
    whiteSpace: 'nowrap',
    padding:'1.5px'
  })});
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    textAlign:'center',
    padding:'1.5px'
  }));

  const DataTableCell = styled(TableCell)(({ theme }) => ({
    textAlign:'center',
    padding:'1.5px'
  }));

  const DateTableCell = styled(TableCell)(({ theme }) => ({
    textAlign:'center',
    padding:'1.5px'
  }));

  if(rowData){
    // console.log('i should be returning a row', rowSims, rowDiff)
    // const absDiffPercentninetyDiff = Math.round(rowDiff.ninetyDiff.percentDiff) < 0 ? Math.round(rowDiff.ninetyDiff.percentDiff) * -1 : Math.round(rowDiff.ninetyDiff.percentDiff)
    // const absDiffPercentseventyDiff = Math.round(rowDiff.seventyDiff.percentDiff) < 0 ? Math.round(rowDiff.seventyDiff.percentDiff) * -1 : Math.round(rowDiff.seventyDiff.percentDiff)
    // const absDiffPercentfiftyDiff = Math.round(rowDiff.fiftyDiff.percentDiff) < 0 ? Math.round(rowDiff.fiftyDiff.percentDiff) * -1 : Math.round(rowDiff.fiftyDiff.percentDiff)
    // const absDiffPercentthirtyDiff = Math.round(rowDiff.thirtyDiff.percentDiff) < 0 ? Math.round(rowDiff.thirtyDiff.percentDiff) * -1 : Math.round(rowDiff.thirtyDiff.percentDiff)
    // const absDiffPercenttenDiff = Math.round(rowDiff.tenDiff.percentDiff) < 0 ? Math.round(rowDiff.tenDiff.percentDiff) * -1 : Math.round(rowDiff.tenDiff.percentDiff)
    // // console.log('diff 90', Math.round(rowSims[0].ninety))
    // rowData looks like this: ['mar27', 26.286, 26.279, 26.2795, 26.2705]
    const rowItems = rowData.map(cellData=><DateTableCell key={index + 2}>{cellData}</DateTableCell>)
    // console.log('row items', rowItems)
    return(
      <>
        <StyledTableRow key={index + 1} hover>
          {rowItems}
        </StyledTableRow>
  

      </>
    )
  }
  else{
    return(
      <>
        'no row sims or no row diff'
      </>
    )

  }

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
    const ninetyDiff = {absVal: Math.round(sim1Obj.ninety - sim2Obj.ninety), percentDiff: calcPercentDiff(sim1Obj.ninety , sim2Obj.ninety)}
    const seventyDiff = {absVal: Math.round(sim1Obj.seventy - sim2Obj.seventy), percentDiff: calcPercentDiff(sim1Obj.seventy , sim2Obj.seventy)}
    const fiftyDiff = {absVal: Math.round(sim1Obj.fifty - sim2Obj.fifty), percentDiff: calcPercentDiff(sim1Obj.fifty , sim2Obj.fifty)}
    const thirtyDiff = {absVal: Math.round(sim1Obj.thirty - sim2Obj.thirty), percentDiff: calcPercentDiff(sim1Obj.thirty , sim2Obj.thirty)}
    const tenDiff = {absVal: Math.round(sim1Obj.ten - sim2Obj.ten), percentDiff: calcPercentDiff(sim1Obj.ten , sim2Obj.ten)}
    return {ninetyDiff, seventyDiff, fiftyDiff, thirtyDiff, tenDiff}
  }
}



const rowSims = [
  createRowSim('2022-04-01',3436.6,4677.9,5455.59,6537.69,8372.52),
  createRowSim('2022-02-01',3509.35,4783.25,5489.54,6528.45,8472.89)
]

const rowDiff = createRowDiff(rowSims[1],rowSims[0])
// const rowDiff = createRowDiff(rowSims[0],rowSims[1])



function returnColorObjectPercent(value){
  // console.log('percent value input', value)
  const colorLevObj = {
    
    neg200: {inRange: value <= -200, color:'#d43d51'},
    neg100: {inRange: value >-200 && value <=-100, color:'#de656d'},
    neg50: {inRange: value >-100 && value <= -50, color:'#e5888a'},
    neg25: {inRange: value >-50 && value <= -25, color:'#e9a8a8'},
    neg10: {inRange: value >-25 && value <= -1, color:'#eac8c8'},
    pos10: {inRange: value >=1 && value <= 25, color:'#d8e7e1'},
    pos25: {inRange: value >25 && value <= 50, color:'#c2d5ce'},
    pos75: {inRange: value >50 && value <=75, color:'#9bc1b4'},
    pos100: {inRange: value >75 && value <=100, color:'#74ae9c'},
    pos200: {inRange: value >100 && value <=200, color:'#4a9a83'},
    abv200: {inRange: value >200, color:'#00876c'},
  }
  if(!value){ 
    return {}
  }
  else{
    for(const lev in colorLevObj) {
      const currLevInfo = colorLevObj[lev]
      if(currLevInfo.inRange === true){
        return currLevInfo.color
      } 
    }
  }
}

function returnColorObject(value){
  // console.log('straight value input', value)
  const colorLevObj = {
    
    neg200: {inRange: value <= -500, color:'#d43d51'},
    neg100: {inRange: value >-500 && value <=-200, color:'#de656d'},
    neg50: {inRange: value >-200 && value <= -75, color:'#e5888a'},
    neg25: {inRange: value >-75 && value <= -50, color:'#e9a8a8'},
    neg10: {inRange: value >-50 && value <= -1, color:'#eac8c8'},
    pos10: {inRange: value >=1 && value <= 50, color:'#d8e7e1'},
    pos50: {inRange: value >50 && value <= 75, color:'#c2d5ce'},
    pos75: {inRange: value >75 && value <=200, color:'#9bc1b4'},
    pos100: {inRange: value >200 && value <=500, color:'#74ae9c'},
    // pos200: {inRange: value >500 && value <=700, color:'#4a9a83'},
    abv200: {inRange: value >500, color:'#00876c'},
  }
  if(value<-500){
    // console.log('value under 500', value, colorLevObj)
  }
  if(!value){
    return {}
  }
  else{
    for(const lev in colorLevObj) {
      const currLevInfo = colorLevObj[lev]
      if(currLevInfo.inRange === true){
        // console.log('found a hit', currLevInfo.color)
        return currLevInfo.color
      }
    }
  }
}

// function returnColorObject(inputNumber){
//   const colorObj = {
//     pos10000000: '#00876c',
//     pos500: '#4a9a83',
//     pos200: '#74ae9c',
//     pos100: '#9bc1b4',
//     pos0: '#c2d5ce',
//     pos5: '#e8e8e8',
//     neg100: '#eac8c8',
//     neg200: '#e9a8a8',
//     neg500: '#e5888a',
//     neg10000000: '#de656d',
//     // neg100: '#d43d51'
//   }
//   let returnCol = 'white'
//   const rangeAr = [-10000000,-500,-200,-100, 0,5, 100, 200, 500,1000000000]
//   const red = rangeAr.reduce((prev,curr,i)=>{
//     // console.log('input', inputNumber, 'pre v', prev, 'curr', curr, checkRange(inputNumber, prev, curr))
//     if(checkRange(inputNumber, prev, curr)){
//       // console.log('I match!!', 'input', inputNumber, prev, curr)
//       const catName = prev < 0 ?`neg${-1*prev}` : `pos${prev}`
//       // console.log('catName', catName, colorObj[catName])
//       returnCol = colorObj[catName]
//     }
//     // return checkRange(inputNumber, prev, curr)
//     return curr
//   })
//   return returnCol
// } 

// function checkRange(input, lowRange, highRange){
//   // console.log('input', input, 'lowRange', lowRange, 'highRange', highRange-1, (input-lowRange)*(input-highRange-1) < 0)
//   return (input-lowRange)*(input-highRange-1) < 0
// }

// const colorObj = {
//   neg100: '#00876c',
//   neg80: '#4a9a83',
//   neg60: '#74ae9c',
//   neg40: '#9bc1b4',
//   neg20: '#c2d5ce',
//   abs0: '#e8e8e8',
//   pos20: '#eac8c8',
//   pos40: '#e9a8a8',
//   pos60: '#e5888a',
//   pos80: '#de656d',
//   pos100: '#d43d51'
// }





// (x-a)*(x-b)<0

// a=10
// b=20
// x=5

// 5-10 * 5-20 = 75

// a = 10
// b=20
// x=15

// 15-10 * 15-20 = -25

// a = 10
// b=20
// x=10

// 10-10 * 10-20 = 0