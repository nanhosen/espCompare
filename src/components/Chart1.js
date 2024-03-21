import React, {useEffect, useState, useContext} from 'react';
import Highcharts from 'highcharts'
// import Highcharts from "highcharts/highstock";
import HighchartsReact from 'highcharts-react-official'
import Button from '@mui/material/Button';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import AppContext from '../context/AppContext'
import Title from './Title';
import { makeConfig } from '../actions/makeColumnChartConfig';

export default function Chart(props){
  // console.log('chart props', props)
  const context = useContext(AppContext)
  const [chartConfig, setChartConfig] = useState()
  useEffect(()=>{
    // console.log('chart context', context)
    if(context.agnosticStationData){
      const currConfig = makeConfig( {propHeight:props.height, propWidth:props.width}, props.station, context.agnosticStationData[props.station], context.dataType)
      // const currConfig = makeConfig(context.chartData[props.station], {propHeight:props.height, propWidth:props.width}, props.station, context.agnosticStationData[props.station], context.dataType)
      // console.log('currConfig', currConfig)
      setChartConfig(currConfig)
    }
  },[context.agnosticStationData, props, context.dataType])
  if(chartConfig){
    return(
      <div>
        <HighchartsReact 
          highcharts={Highcharts} 
          options={chartConfig} 
          // constructorType={"stockChart"}  
        />
      </div>
    )
  }
  else{
    return(
      <div>
        waiting for chart config
      </div>
    )
  }
}








// const formatChartData = (inputData)=>{
//   const noZeros = inputData.filter((curr,i)=>{
//     if(i == 0){
//       return curr
//     }
//     else{
//       if(curr.q!== 0 && curr.h!== 0){
//         return curr
//       }
//     }
//   })
//   const formatted = noZeros.map(currData=>[currData.q, currData.h])
//   return formatted
// }





// const makeStageInfoArray = (info) =>{ 
//   const levs = makeArray(info)
//   const stageLines = []
//   const stageBands = []
//   const bandAr=[]
//   const lineAr=[]
//   const dataAboveObs=[]
//   if(levs){
//     levs.map((curr,i) =>{
//       if(curr.level&&curr.color&&curr.includeBand){
//         bandAr.push(curr)
//       }
//       if(curr.level&&curr.includeLine){
//         lineAr.push(curr)
//       }
//     })
//     bandAr.sort(byProperty('level')).map((curr,i)=>{
//         stageBands.push({ // Action
//           from: curr.level,
//           to:bandAr[i+1] ? bandAr[i+1].level : 1000,
//           color: curr?.color ?? 'rgba(0,0,0,0)',
//         })
//     })

//     lineAr.map(curr=>{
//       const textName = curr.level ? `${curr.name}: ${Math.round((curr.level + Number.EPSILON) * 10) / 10}`: curr.name
//       stageLines.push({
//         value: curr.level,
//         // color: currLevInfo.color,
//         color: 'black',
//         label: {
//           text: textName,
//           align: 'left',
//           x: 10,
//         }
//       })
//     })
  
//   }
//   return{stageLines, stageBands}
// }


// const makeArray = (info) =>{ 

//   const levs = [
//       {
//       name: 'Bank Full',
//       level: info?.bank,
//       flow: info?.bankf,
//       color: 'rgba(145, 195, 92, 0.15)',
//       includeLine: true,
//       includeBand: true
//       },
//       {
//       name: 'Action'  ,
//       level: info?.action,
//       flow: info?.actionf,
//       color: 'rgba(255, 247, 5, 0.25)',
//       includeLine: true,
//       includeBand: true
//       },
//       {
//       name: 'Flood',
//       level: info?.flood,
//       flow: info?.floodf,
//       color: 'rgba(255, 178, 5, 0.15)',
//       includeLine: true,
//       includeBand: true
//       },
//       {
//       name: 'Moderate Flood',
//       level: info?.modflood,
//       flow: info?.modfloodf,
//       color: 'rgba(255, 52, 5, 0.15)',
//       includeLine: true,
//       includeBand: true
//       },
//       {
//       name: 'Major Flood', 
//       level: info?.majflood,
//       flow: info?.majfloodf,
//       color: 'rgba(182, 5, 255, 0.15)',
//       includeLine: true,
//       includeBand: true
//       }
//     ]

//   return levs
  
// }

// var byProperty = function(prop) {
//   return function(a,b) {
//       if (typeof a[prop] == "number") {
//           return (a[prop] - b[prop]);
//       } else {
//           return ((a[prop] < b[prop]) ? -1 : ((a[prop] > b[prop]) ? 1 : 0));
//       }
//   };
// };
