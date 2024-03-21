import ReactDOM from "react-dom";
import Highcharts from "highcharts";
import HighchartsMore from "highcharts/highcharts-more";
import HighchartsReact from "highcharts-react-official";
import Boost from 'highcharts/modules/boost';
import React, {useEffect, useState, useContext, useMemo} from 'react';
import AppContext from '../context/AppContext'
import {makeConfig} from '../actions/makeAllTraceConfig'



HighchartsMore(Highcharts);



export default function AllTraceChart(props){
  // console.log('chart props', props)
  const context = useContext(AppContext)
  // const [chartConfig, setChartConfig] = useState()
  const chartConfig = useMemo(()=>makeConfig(
    {propHeight: props.height, 
    propWidth: props.width}, 
    props.station, 
    context.allStationTraces[props.station], 
    context.dataType,
    context.stationCompareDates[props.station]),
    [context.stationCardLists, context.allStationTraces, context.dataType, props, context.stationCompareDates])
  
  // useEffect(()=>{
  //   console.log('chart config changed all trace', chartConfig)
  // },[chartConfig])
  // useEffect(()=>{
  //   // console.log('chart context', context)
  //   if(context && context.allStationTraces){
  //     const currConfig = makeConfig({ propHeight: props.height, propWidth: props.width}, props.station, context.allStationTraces[props.station], context.dataType)
  //     // console.log('currConfig', currConfig)
  //     setChartConfig(currConfig)
  //     // console.log('context', context)
  //   }
  // },[ context.stationCardLists, context.allStationTraces, context.dataType, props])
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