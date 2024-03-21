import ReactDOM from "react-dom";
import Highcharts from "highcharts";
import HighchartsMore from "highcharts/highcharts-more";
import HighchartsReact from "highcharts-react-official";
import Boost from 'highcharts/modules/boost';
import React, {useEffect, useState, useContext} from 'react';
import AppContext from '../context/AppContext'
import {makeConfig} from '../actions/makeBoxPlotConfig'



HighchartsMore(Highcharts);



export default function BoxPlotChart(props){
  // console.log('chart props', props)
  const context = useContext(AppContext)
  const [chartConfig, setChartConfig] = useState()
  useEffect(()=>{
    // console.log('chart context', context)
    if(context && context.agnosticStationData){
      const currConfig = makeConfig({ propHeight: props.height, propWidth: props.width}, props.station, context.agnosticStationData[props.station], context.dataType)
      // console.log('currConfig', currConfig)
      setChartConfig(currConfig)
      // console.log('context', context)
    }
  },[ context.stationCardLists, context.agnosticStationData, context.dataType, props])
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