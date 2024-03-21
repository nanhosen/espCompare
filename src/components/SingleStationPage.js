import React, {useEffect, useState, useContext, useRef, useLayoutEffect} from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import AppContext from '../context/AppContext'
import Chart from './Chart1';
import BoxPlotChart from './BoxPlotChart'

export default function SingleStationPage(props){
  const context = useContext(AppContext)
  useEffect(()=>{
    // console.log('context', context)
  },[context])
  const [stationList, setStationList] = useState()
  useEffect(()=>{
    if(context.stationCardList && context.stationCardList.length > 0 ){
      setStationList(context.stationCardList)
      // console.log('chartData', context.stationCardList, context)
      console.log('station card list changed')
    }
  },[context.stationCardList])
  if(context.dataStatus?.status === 'done'){

    if(context.stationCardList &&context.stationCardList.length>0){
      return(
  
        context.stationCardList.map((currStation,i)=><SingleChart type = {context.displayChartType}  key={i} station={currStation} chartSize={context.chartSize}/>)
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
      <div>
        {/* Requesting Data... */}
        {displayText}
      </div>
    )
  }

}
const useRefDimensions = (ref) => {
  const [dimensions, setDimensions] = useState({ width: 1, height: 2 })
  React.useEffect(() => {
    if (ref.current) {
      const { current } = ref
      const boundingRect = current.getBoundingClientRect()
      const { width, height } = boundingRect
      setDimensions({ width: Math.round(width), height: Math.round(height) })
    }
  }, [ref])
  // console.log('dimensions', dimensions)
  return dimensions
}

function SingleChart(props){
  const {station, type, chartSize} = props
  const [parentRefHeight, setParentRefHeight] = useState(null)
  const [parentRefWidth, setParentRefWidth] = useState(null)
  const parentRef = useRef(null)
  const context = useContext(AppContext)

  const dimensions = useRefDimensions(parentRef)

  useLayoutEffect(()=>{
    // console.log('parentRef', 'height', parentRef?.current?.clientHeight, 'width', parentRef?.current?.clientWidth )
    // console.log('parentRef', parentRef, parentRef?.current, parentRef?.current?.clientHeight, parentRef?.current?.clientWidth)
    if(parentRef?.current?.clientHeight){
      setParentRefHeight(parentRef?.current?.clientHeight)
    }
    if(parentRef?.current?.clientWidth){
      setParentRefWidth(parentRef?.current?.clientWidth)
    }
  },[parentRef.current, context.chartSize])



  return(
    <Grid item xs={chartSize} md={chartSize} lg={chartSize} ref={parentRef}  component="div">
      <Paper
      
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: 500,
        }}
      >{
        type === 'column'
          ? <Chart station={station} height={parentRefHeight} width={parentRefWidth} chartSize={context.chartSize} />
          : <BoxPlotChart station={station} height={parentRefHeight} width={parentRefWidth} chartSize={context.chartSize} />
      }
        {/* <BoxPlotChart station={station} height={parentRefHeight} width={parentRefWidth} /> */}
        {/* <Chart station={station} height={parentRefHeight} width={parentRefWidth} /> */}
      </Paper>
    </Grid>
  )
}

// function NumberList(props) {
//   const numbers = props.numbers;
//   const listItems = numbers.map((number) =>
//     <li>{number}</li>
//   );
//   return (
//     <ul>{listItems}</ul>
//   );
// }

// const numbers = [1, 2, 3, 4, 5];