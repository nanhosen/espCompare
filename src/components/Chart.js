import React, {useEffect, useState, useContext} from 'react';
import { useTheme } from '@mui/material/styles';
// import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import AppContext from '../context/AppContext'

const configInit = {
  chart: {
      type: 'column'
  },
  title: {
      text: ''
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
      }
  },
  series:[{"name":"feb22","data":[6257.433000000001,8537.610499999999,8989.46,9106.5395,9085.471,1695.4189999999999]},{"name":"mar22","data":[5233.83,8386.6415,8921.1905,9096.1875,9075.9375,2044.792]},{"name":"apr22","data":[4664.1955,8187.751,8910.541000000001,9114.053500000002,9103.1335,2545.48]},{"name":"may22","data":[3704.1385,8131.341,8892.2495,9093.7435,9101.8795,3494.147]}]
} 

export default function Chart() {
  const theme = useTheme();
  const context = useContext(AppContext)
  const [chartConfig, setChartConfig] = useState(configInit)
  const [chartConfig1, setChartConfig1] = useState()

  useEffect(()=>{
    console.log('context', context)
    if(context.columnChartData){
      console.log('data is here')
      // setChartConfig1('config')
    }
  },[context])

  useEffect(()=>{
    console.log('context', context)
    if(context.columnChartData){
      const config = {
        chart: {
            type: 'column'
        },
        title: {
            text: ''
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
            }
        },
        series:[{"name":"feb22","data":[6257.433000000001,8537.610499999999,8989.46,9106.5395,9085.471,1695.4189999999999]},{"name":"mar22","data":[5233.83,8386.6415,8921.1905,9096.1875,9075.9375,2044.792]},{"name":"apr22","data":[4664.1955,8187.751,8910.541000000001,9114.053500000002,9103.1335,2545.48]},{"name":"may22","data":[3704.1385,8131.341,8892.2495,9093.7435,9101.8795,3494.147]}]
      } 

      // setChartConfig1(config)
    }

  },[context.columnChartData])

  if(context.columnChartData){
    return <div>
    <HighchartsReact
      highcharts={Highcharts}
      options={configInit}
    />
  </div>
  }
  else{

    return (
      <React.Fragment>
        <Title>Today</Title>

      </React.Fragment>
    );
  }
}