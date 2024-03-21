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
import YearFcstTable from './YearFcstTable'
import MonthlyFcstTable from './MonthlyFcstTable'


export default function ColumnTableMaker(props){
  const context = useContext(AppContext) 
  useEffect(()=>{
    // console.log('context', context)
  },[context])
  const [stationList, setStationList] = useState()
  useEffect(()=>{
    if(context.stationCardList && context.stationCardList.length > 0 ){
      setStationList(context.stationCardList)
      // console.log('chartData', context.stationCardList, context)
    }
  },[context.stationCardList])
  if(context.dataStatus.status === 'done'){
    if(context.stationCardList &&context.stationCardList.length>0){
      return(
  
        context.stationCardList.map((currStation,i)=>{
          if(context.displayTableType == 'original'){
            return(
              <>
                <YearFcstTable   key={i} station={currStation}/>
              </>
            )
          }
          else{
            return(
              <>
                <MonthlyFcstTable   key={i+1} station={currStation}/>
              </>
            )
          }
        })
      )
    }
    else{
      return(
        <>
          No Stations Selected
        </>
      )
    }

  }
  else{
    const displayText = context?.dataStatus?.text? context.dataStatus.text : 'No Text Returned'
    return(
      <div key={123456}>
        {/* Requesting Data... */}
        {displayText}
      </div>
    )
  }

}



// function TableGroup(props){
//   const {station} = props 
//   const context = useContext(AppContext)
//   const [tableData, setTableData]= useState()
//   const [tableDates, setTableDates] = useState(null)

//   useEffect(()=>{
//     if(context.stationCompareDates && context.stationCompareDates[station] && context?.agnosticStationData[station]){
//       const dataDisplayType = context.dataType === 'both' ? 'raw' :  context.dataType
//       const {date1, date2} = context.stationCompareDates[station][dataDisplayType]
//       setTableDates({date1, date2})
//       const month1Info = context.agnosticStationData[station][dataDisplayType][date1]
//       const month2Info = context.agnosticStationData[station][dataDisplayType][date2]
//       const month1Data = month1Info
//       const month2Data = month2Info
//       const month1Years = Object.keys(month1Info)
//       const month2Years = month2Info ? Object.keys(month2Info) : []
//       const yearArray = checkArrayEquality(month1Years, month2Years) ? month1Years : month1Years
//       const dataByFcstYear = Object.create({})
//       dataByFcstYear.dataKey = month1Info.dataKey
//       yearArray.map((currYear,i)=>{
//         const month1YearData = month1Data[currYear]
//         const month2YearData = month2Data[currYear]

//         const month1Sim = month1YearData ? createRowSim(
//           date1, 
//           month1YearData.ninety,
//           month1YearData.seventy,
//           month1YearData.median,
//           month1YearData.thirty,
//           month1YearData.tenth,
//         ) : null
//         const month2Sim = month2YearData ? createRowSim(
//           date2, 
//           month2YearData.ninety,
//           month2YearData.seventy,
//           month2YearData.median,
//           month2YearData.thirty,
//           month2YearData.tenth,
//         ) : null
//         const rowSims = month1Sim && month2Sim ? [month1Sim, month2Sim] : null
//         const rowDiff = rowSims ?  createRowDiff(rowSims[1], rowSims[0]) : null
//         // console.log('curr year', currYear, 'rowSims', rowSims, 'rowDiff', rowDiff)
        
//         if(rowDiff && rowSims){
//           // console.log('i should be making data')
//           dataByFcstYear[currYear]={rowSims, rowDiff}
//         }
//         else{
//           // console.log(' i dont have the right data', rowDiff, rowSims)
//         }
//       })
//       // console.log('dataByFcstYear', dataByFcstYear)
//       setTableData(dataByFcstYear)
//     }
//     else{
//       console.log('missing important intofo',context.stationCompareDates , context.stationCompareDates[station] , context?.agnosticStationData[station])
//     }

//     // console.log('month1years', month1Years, 'month2years', month2Years, checkArrayEquality(month1Years, month2Years),yearArray)
//     // console.log('month1Info',month1Info, month1Data, 'month2Data 2 adt', month2Data)
//     // console.log(station, context.boxPlotData[station], date1, date2)
//   },[context.agnosticStationData, context.stationCompareDates, context.dataType,context.dataType, station])

//   useEffect(()=>{
//     // console.log('tabledata', tableData)
//   },[tableData])

//   if(tableData){

//     return(
//       <Grid item xs={6} md={6} lg={6}   component="div">
//         <Paper
        
//           sx={{
//             p: 2,
//             display: 'flex',
//             flexDirection: 'column',
//             height: 750,
//           }}
//         >
//         <Typography align="left" variant='h6'>
//           Chance of Exceeding River Levels for: {station} ({ context.dataType === 'both' ? 'adj' :  context.dataType}) {tableDates ? tableDates.date2 : 'Missing'} - {tableDates ? tableDates.date1 : 'Missing'}
//         </Typography>
//         {/* <Typography align="left">Forecast Period: 2022-10-01 - 2027-04-06    </Typography> */}
  
//           <SingleTable key={props.station} station = {props.station} stationData = {tableData ? tableData : null} />
  
//         </Paper>
//       </Grid>
//     )
//   }
//   else{
//     return(
//       <>
        
//       </>
//     )

//   }


//   const message = `Truncation should be conditionally applicable on this long line of text
//   as this is a much longer line than what the container can support. `;
// }

// function SingleTable(props){
//   // console.log('single table props', props)
//   // console.log('props station t', Object.keys(props.stationData))
    

 
//   // console.log('rowDiff', rowDiff)
  
//   const StyledTableRow = styled(TableRow)(({ theme }) => ({
//     textAlign:'center',
//   }));
//   const HeaderCell = styled(TableCell)(({ theme }) => ({
//     textAlign:'center',
//     fontWeight:'bold'
//     // color:'red' 
//     // '&:nth-of-type(odd)': {
//     //   backgroundColor: theme.palette.action.hover,
//     // },
//     // // hide last border
//     // '&:last-child td, &:last-child th': {
//     //   border: 0,
//     // },
//   }));
//   // const ColoredDiffcell = styled(TableCell)((props) => {
//   //   // console.log('cell props', props.children, Number.isFinite(props.children))
//   //   let cellColor = 'white'
//   //   if(Number.isFinite(props.children)){
//   //     cellColor = returnColorObject(props.children) ? returnColorObject(props.children) : 'white'
//   //   }
//   //   return({
//   //   backgroundColor: cellColor,
//   //   whiteSpace: 'nowrap'
//   // })});
//   // const invoiceSubtotal = subtotal(rows);
//   // const invoiceTaxes = TAX_RATE * invoiceSubtotal;
//   // const invoiceTotal = invoiceTaxes + invoiceSubtotal;
//   {/* <TableCell sx={{ mr: 2, borderRight: '0.01px solid #e0e0e0' }}>Start Date</TableCell> */}
//   if (props.stationData && Object.keys(props.stationData).length>0){
//     // console.log('props.stationdata', props.stationData, 'object keys',Object.keys(props.stationData) )
//     const {dataKey, ...years} = props.stationData
//     const testDataYear = Object.keys(years)[0]
//     const testData = props.stationData[testDataYear]
//     // console.log('etstData', testData)
//     const testRowDiff = testData?.rowDiff
//     const testRowSims = testData?.rowSimms
//     // console.log('rest', rest)
//     return(
//       <TableContainer component={Paper} key={1}>
//       <Table key={2} sx={{ minWidth: 300, maxWidth:700 }} size="small" aria-label="spanning table">
//         <TableHead>
  
//           <StyledTableRow hover>
//             <HeaderCell>Year</HeaderCell>
//             <HeaderCell >Sim Date</HeaderCell>
//             <HeaderCell >90%</HeaderCell>
//             <HeaderCell >70%</HeaderCell>
//             <HeaderCell >50%</HeaderCell>
//             <HeaderCell >30%</HeaderCell>
//             <HeaderCell >10%</HeaderCell>
//           </StyledTableRow>
//         </TableHead>
//         <TableBody>
//           {/* {rowSims.map((row,i) => { */}
//             {/* console.log('row', row) */}
//             {/* return ( */}
//            {/* { WaterYearRows(testData.rowSims, testData.rowDiff)} */}
//            {/* { WaterYearRows(rowSims, rowDiff)} */}
//            {
//               Object.keys(years).map((currYear, i)=>{
//                 {/* console.log('currYear', currYear) */}
//                const currYearData = props.stationData[currYear]
//                {/* console.log('ucrryeardata', currYearData, currYearData.rowSims, currYearData.rowDiff) */}
//               return <WaterYearRows key = {i} index={i} forecastYear ={currYear} rowSims = {currYearData.rowSims} rowDiff ={currYearData.rowDiff} />
//             })
  
//            }
  
  
//         </TableBody>
//       </Table>
//     </TableContainer>
//     )
//   }
//   else{
//     return(
//       <>

//         'hi'
//       </>
//     )

//   }
// }

// function WaterYearRows(rowProps){
//   const {index, forecastYear, rowSims, rowDiff } = rowProps
//   // function WaterYearRows(index, forecastYear, rowSims, rowDiff){
//     // console.log('rowSims in function', rowSims)
//     // console.log('rowprops', rowProps)
//     const ColoredDiffcell = styled(TableCell)((props) => {
//     // console.log('diff cellprops', props)
//     // console.log('cell props', props.children, Number.isFinite(props.children))
//     let cellColor = 'white'
//     const checkNum = Number.isFinite(props.children) ? props.children
//       : props.percentvalue ? props.percentvalue
//         : props.children
//     if(Number.isFinite(checkNum)){
//       // console.log('number', checkNum, 'ty[epf checknum', typeof checkNum, 'props children', props.children, 'has 0', props.children[0], props.children[1])
//       const colorFunction = props.children[1] ? returnColorObjectPercent : returnColorObject
//       // console.log('color function', colorFunction)
//       cellColor = colorFunction(checkNum) ? colorFunction(checkNum) : 'white'
//       // cellColor = returnColorObject(checkNum) ? returnColorObject(checkNum) : 'white'
//       const percentColor = returnColorObjectPercent(checkNum<0 ? checkNum * -1 : checkNum)
//       // console.log('number', checkNum, 'percent color', percentColor)
//       if(checkNum < -500){
//         // console.log('below 500', checkNum, 'color', cellColor)

//       }
//     }
//     else{
//       // console.log('not a number', checkNum,'is this a number', Number.isFinite(checkNum[0]))
//     }
//     return({
//     backgroundColor: cellColor,
//     textAlign:'center',
//     whiteSpace: 'nowrap',
//     padding:'1.5px'
//   })});
//   const StyledTableRow = styled(TableRow)(({ theme }) => ({
//     textAlign:'center',
//     padding:'1.5px'
//   }));

//   const DataTableCell = styled(TableCell)(({ theme }) => ({
//     textAlign:'center',
//     padding:'1.5px'
//   }));

//   const DateTableCell = styled(TableCell)(({ theme }) => ({
//     textAlign:'center',
//     padding:'1.5px'
//   }));

//   if(rowSims && rowDiff){
//     // console.log('i should be returning a row', rowSims, rowDiff)
//     const absDiffPercentninetyDiff = Math.round(rowDiff.ninetyDiff.percentDiff) < 0 ? Math.round(rowDiff.ninetyDiff.percentDiff) * -1 : Math.round(rowDiff.ninetyDiff.percentDiff)
//     const absDiffPercentseventyDiff = Math.round(rowDiff.seventyDiff.percentDiff) < 0 ? Math.round(rowDiff.seventyDiff.percentDiff) * -1 : Math.round(rowDiff.seventyDiff.percentDiff)
//     const absDiffPercentfiftyDiff = Math.round(rowDiff.fiftyDiff.percentDiff) < 0 ? Math.round(rowDiff.fiftyDiff.percentDiff) * -1 : Math.round(rowDiff.fiftyDiff.percentDiff)
//     const absDiffPercentthirtyDiff = Math.round(rowDiff.thirtyDiff.percentDiff) < 0 ? Math.round(rowDiff.thirtyDiff.percentDiff) * -1 : Math.round(rowDiff.thirtyDiff.percentDiff)
//     const absDiffPercenttenDiff = Math.round(rowDiff.tenDiff.percentDiff) < 0 ? Math.round(rowDiff.tenDiff.percentDiff) * -1 : Math.round(rowDiff.tenDiff.percentDiff)
//     // console.log('diff 90', Math.round(rowSims[0].ninety))
//     return(
//       <>
//         <StyledTableRow key={index + 1} hover>
//               <TableCell sx={{backgroundColor: '#f5f5f5', textAlign:'right', fontWeight: 'bold'}} rowSpan={2} >{forecastYear}</TableCell>
//               <DateTableCell >{rowSims[0].simDate}</DateTableCell>
//               <DataTableCell >{Math.round(rowSims[0].ninety)}</DataTableCell>
//               <DataTableCell >{Math.round(rowSims[0].seventy)}</DataTableCell>
//               <DataTableCell >{Math.round(rowSims[0].fifty)}</DataTableCell>
//               <DataTableCell >{Math.round(rowSims[0].thirty)}</DataTableCell>
//               <DataTableCell >{Math.round(rowSims[0].ten)}</DataTableCell>
//             </StyledTableRow>
//             <StyledTableRow key={index + 2} hover>
              
//               <DateTableCell >{rowSims[1].simDate}</DateTableCell>
//               <DataTableCell >{Math.round(rowSims[1].ninety)}</DataTableCell>
//               <DataTableCell >{Math.round(rowSims[1].seventy)}</DataTableCell>
//               <DataTableCell >{Math.round(rowSims[1].fifty)}</DataTableCell>
//               <DataTableCell >{Math.round(rowSims[1].thirty)}</DataTableCell>
//               <DataTableCell >{Math.round(rowSims[1].ten)}</DataTableCell>
//             </StyledTableRow>
//           {/* )})} */}
  
//           <StyledTableRow key={index + 3} hover>
//             <TableCell ></TableCell>
//             <ColoredDiffcell   sx={{fontSize: '12', textAlign: 'left' }} >difference</ColoredDiffcell>
//             <ColoredDiffcell   >{rowDiff.ninetyDiff.absVal}</ColoredDiffcell>
//             <ColoredDiffcell   >{rowDiff.seventyDiff.absVal}</ColoredDiffcell>
//             <ColoredDiffcell   >{rowDiff.fiftyDiff.absVal}</ColoredDiffcell>
//             <ColoredDiffcell   >{rowDiff.thirtyDiff.absVal}</ColoredDiffcell>
//             <ColoredDiffcell   >{rowDiff.tenDiff.absVal}</ColoredDiffcell>
            
//           </StyledTableRow>
//           <StyledTableRow key={index + 4} sx={{borderBottom:'1.5px solid #202020'}} hover>
//             <TableCell ></TableCell>
//             <ColoredDiffcell  sx={{fontSize: '12', textAlign: 'left' }}>difference %</ColoredDiffcell>
//             <ColoredDiffcell  percentvalue={Math.round(rowDiff.ninetyDiff.percentDiff)}>{absDiffPercentninetyDiff}%</ColoredDiffcell>
//             <ColoredDiffcell  percentvalue={Math.round(rowDiff.seventyDiff.percentDiff)} >{absDiffPercentseventyDiff}%</ColoredDiffcell>
//             <ColoredDiffcell  percentvalue={Math.round(rowDiff.fiftyDiff.percentDiff)} >{absDiffPercentfiftyDiff}%</ColoredDiffcell>
//             <ColoredDiffcell  percentvalue={Math.round(rowDiff.thirtyDiff.percentDiff)} >{absDiffPercentthirtyDiff}%</ColoredDiffcell>
//             <ColoredDiffcell  percentvalue={Math.round(rowDiff.tenDiff.percentDiff)} >{absDiffPercenttenDiff}%</ColoredDiffcell>
            
//           </StyledTableRow>
//       </>
//     )
//   }
//   else{
//     return(
//       <>
//         'no row sims or no row diff'
//       </>
//     )

//   }

// }


// function createRowSim(simDate, ninety, seventy, fifty, thirty, ten) {
//   return { simDate, ninety, seventy, fifty, thirty, ten };
// }

// function createRowDiff(sim1Obj, sim2Obj){
//   if(!sim1Obj || !sim2Obj){
//     return {}
//   }
//   else{
//     // console.log('i am here', sim1Obj, sim2Obj)
//     const ninetyDiff = {absVal: Math.round(sim1Obj.ninety - sim2Obj.ninety), percentDiff: calcPercentDiff(sim1Obj.ninety , sim2Obj.ninety)}
//     const seventyDiff = {absVal: Math.round(sim1Obj.seventy - sim2Obj.seventy), percentDiff: calcPercentDiff(sim1Obj.seventy , sim2Obj.seventy)}
//     const fiftyDiff = {absVal: Math.round(sim1Obj.fifty - sim2Obj.fifty), percentDiff: calcPercentDiff(sim1Obj.fifty , sim2Obj.fifty)}
//     const thirtyDiff = {absVal: Math.round(sim1Obj.thirty - sim2Obj.thirty), percentDiff: calcPercentDiff(sim1Obj.thirty , sim2Obj.thirty)}
//     const tenDiff = {absVal: Math.round(sim1Obj.ten - sim2Obj.ten), percentDiff: calcPercentDiff(sim1Obj.ten , sim2Obj.ten)}
//     return {ninetyDiff, seventyDiff, fiftyDiff, thirtyDiff, tenDiff}
//   }
// }



// const rowSims = [
//   createRowSim('2022-04-01',3436.6,4677.9,5455.59,6537.69,8372.52),
//   createRowSim('2022-02-01',3509.35,4783.25,5489.54,6528.45,8472.89)
// ]

// const rowDiff = createRowDiff(rowSims[1],rowSims[0])
// // const rowDiff = createRowDiff(rowSims[0],rowSims[1])



// function returnColorObjectPercent(value){
//   // console.log('percent value input', value)
//   const colorLevObj = {
    
//     neg200: {inRange: value <= -200, color:'#d43d51'},
//     neg100: {inRange: value >-200 && value <=-100, color:'#de656d'},
//     neg50: {inRange: value >-100 && value <= -50, color:'#e5888a'},
//     neg25: {inRange: value >-50 && value <= -25, color:'#e9a8a8'},
//     neg10: {inRange: value >-25 && value <= -1, color:'#eac8c8'},
//     pos10: {inRange: value >=1 && value <= 25, color:'#d8e7e1'},
//     pos25: {inRange: value >25 && value <= 50, color:'#c2d5ce'},
//     pos75: {inRange: value >50 && value <=75, color:'#9bc1b4'},
//     pos100: {inRange: value >75 && value <=100, color:'#74ae9c'},
//     pos200: {inRange: value >100 && value <=200, color:'#4a9a83'},
//     abv200: {inRange: value >200, color:'#00876c'},
//   }
//   if(!value){ 
//     return {}
//   }
//   else{
//     for(const lev in colorLevObj) {
//       const currLevInfo = colorLevObj[lev]
//       if(currLevInfo.inRange === true){
//         return currLevInfo.color
//       } 
//     }
//   }
// }

// function returnColorObject(value){
//   // console.log('straight value input', value)
//   const colorLevObj = {
    
//     neg200: {inRange: value <= -500, color:'#d43d51'},
//     neg100: {inRange: value >-500 && value <=-200, color:'#de656d'},
//     neg50: {inRange: value >-200 && value <= -75, color:'#e5888a'},
//     neg25: {inRange: value >-75 && value <= -50, color:'#e9a8a8'},
//     neg10: {inRange: value >-50 && value <= -1, color:'#eac8c8'},
//     pos10: {inRange: value >=1 && value <= 50, color:'#d8e7e1'},
//     pos50: {inRange: value >50 && value <= 75, color:'#c2d5ce'},
//     pos75: {inRange: value >75 && value <=200, color:'#9bc1b4'},
//     pos100: {inRange: value >200 && value <=500, color:'#74ae9c'},
//     // pos200: {inRange: value >500 && value <=700, color:'#4a9a83'},
//     abv200: {inRange: value >500, color:'#00876c'},
//   }
//   if(value<-500){
//     // console.log('value under 500', value, colorLevObj)
//   }
//   if(!value){
//     return {}
//   }
//   else{
//     for(const lev in colorLevObj) {
//       const currLevInfo = colorLevObj[lev]
//       if(currLevInfo.inRange === true){
//         // console.log('found a hit', currLevInfo.color)
//         return currLevInfo.color
//       }
//     }
//   }
// }

// // function returnColorObject(inputNumber){
// //   const colorObj = {
// //     pos10000000: '#00876c',
// //     pos500: '#4a9a83',
// //     pos200: '#74ae9c',
// //     pos100: '#9bc1b4',
// //     pos0: '#c2d5ce',
// //     pos5: '#e8e8e8',
// //     neg100: '#eac8c8',
// //     neg200: '#e9a8a8',
// //     neg500: '#e5888a',
// //     neg10000000: '#de656d',
// //     // neg100: '#d43d51'
// //   }
// //   let returnCol = 'white'
// //   const rangeAr = [-10000000,-500,-200,-100, 0,5, 100, 200, 500,1000000000]
// //   const red = rangeAr.reduce((prev,curr,i)=>{
// //     // console.log('input', inputNumber, 'pre v', prev, 'curr', curr, checkRange(inputNumber, prev, curr))
// //     if(checkRange(inputNumber, prev, curr)){
// //       // console.log('I match!!', 'input', inputNumber, prev, curr)
// //       const catName = prev < 0 ?`neg${-1*prev}` : `pos${prev}`
// //       // console.log('catName', catName, colorObj[catName])
// //       returnCol = colorObj[catName]
// //     }
// //     // return checkRange(inputNumber, prev, curr)
// //     return curr
// //   })
// //   return returnCol
// // } 

// // function checkRange(input, lowRange, highRange){
// //   // console.log('input', input, 'lowRange', lowRange, 'highRange', highRange-1, (input-lowRange)*(input-highRange-1) < 0)
// //   return (input-lowRange)*(input-highRange-1) < 0
// // }

// // const colorObj = {
// //   neg100: '#00876c',
// //   neg80: '#4a9a83',
// //   neg60: '#74ae9c',
// //   neg40: '#9bc1b4',
// //   neg20: '#c2d5ce',
// //   abs0: '#e8e8e8',
// //   pos20: '#eac8c8',
// //   pos40: '#e9a8a8',
// //   pos60: '#e5888a',
// //   pos80: '#de656d',
// //   pos100: '#d43d51'
// // }





// // (x-a)*(x-b)<0

// // a=10
// // b=20
// // x=5

// // 5-10 * 5-20 = 75

// // a = 10
// // b=20
// // x=15

// // 15-10 * 15-20 = -25

// // a = 10
// // b=20
// // x=10

// // 10-10 * 10-20 = 0