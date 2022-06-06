import AppContext from '../context/AppContext'
import React, {useEffect, useState, useContext, useLayoutEffect, useRef} from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { render } from 'react-dom'

const options = {
  chart: {
    type: 'spline'
  },
  title: {
    text: 'My chart'
  },
  series: [
    {
      data: [1, 2, 1, 4, 3, 6]
    }
  ]
};

export default function TestThis(){
  const context = useContext(AppContext)
  const [testState, setTestState] = useState('initial')

  useEffect(()=>{
    console.log('in effect')
    setTestState('new text')
  },[])

  useEffect(()=>{
    console.log('context', context)
  },[context])
  return(
    <>
      hello {testState}
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  )
}