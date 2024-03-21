import React, {useEffect, useState, useContext, useReducer} from 'react';
// import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
import DashboardIcon from '@mui/icons-material/Dashboard';
// import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
// import StarBorder from '@mui/icons-material/StarBorder';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// import TextField from '@mui/material/TextField';
// import IconButton from '@mui/material/IconButton';
// import CommentIcon from '@mui/icons-material/Comment';
// import ListItem from '@mui/material/ListItem';
import AppContext from '../context/AppContext'
// import ChartTypePicker from './ChartTypePicker';
import DateSelectComponent from './DateSelectComponent'
// import { dateFormat } from 'highcharts';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function makeInitStateOpen(stations){
  const returnObj = Object.create({})
  stations.map(currStn=>{
    returnObj[currStn] = false
  })
  return returnObj
}

function checkArraysEqual(ar1, ar2){
  return ar1.length === ar2.length && ar2.length > 0 && ar2.every(item => ar1.indexOf(item) > -1)
}


function makeStationDates(stationData){
  const rawStationData =  stationData['raw']
  const adjStationData =  stationData['adj']
  function getLastDate(inputData, dataType){
    const stationDates = Object.keys(inputData)
    // console.log('stationDates', stationDates)
    const lastStationIndex = stationDates.length -1
    const date1Index =  stationDates.length >1 ? lastStationIndex -1 : lastStationIndex
    const date2Index = lastStationIndex
    return {date1: stationDates[date1Index], date2:stationDates[date2Index]}
    // return {date1: stationDates[lastStationIndex -1], date2:stationDates[lastStationIndex]} //this is what it was before adding gloc and fixing for when only had one monthof data
  }
  function getLastDates(){
    return {raw: getLastDate(rawStationData, 'raw'), adj: getLastDate(adjStationData, 'adj')}
  }
  return {getLastDates}
}

function setRadioValueReducer(state,action){
  // console.log('set radio value reducer', state, action)
  const {type, payload, contextDispatcher} = action
  switch(type){
    case 'dateTypeChange':

      contextDispatcher({type: 'typeToggle', payload: payload === 'bulk' })
      return payload
  }
}

export default function TableDatePicker(props) {
  const context = useContext(AppContext)
  const [open, setOpen] = React.useState(false);
  const [bulkOptionsOpen, setBulkOptionsOpen] = useState(false)
  const [stationListOpen, setStationListOpen] = useState(false)
  const [stationOpenList, setStationOpenList] = React.useState(makeInitStateOpen(context.stationCardList))
  const [checked, setChecked] = React.useState(context.stationCardList);
  const [stationList, setStationList] = useState([])
  const [allStationDates, setAllStationDates] = useState()
  const [radioValue, dipatchSetRadioValue] = useReducer(setRadioValueReducer, context.bulkDates.selected === true ? 'bulk': 'individual');
  useEffect(()=>{
    // console.log('context', context)
  },[context])
  useEffect(()=>{
    if(context.agnosticStationData && Object.keys(context.agnosticStationData).length > 0 ){
      setStationList(Object.keys(context.agnosticStationData))
      setChecked(context.stationCardList)
      // console.log('chartData', context.chartData)
    }
  },[context.stationCardList, context.agnosticStationData])

  const handleClick = () => {
    setOpen(!open);
  };
  const handleRadioChange = (event) => {
    // console.log('event value', event.target.value)
    dipatchSetRadioValue({type: 'dateTypeChange', payload: event.target.value, contextDispatcher:context.dispatchBulkDatesUpdate});
  };

  

  useEffect(()=>{
    // for each station that's selected go though agnostic data. get the data type, so 
    // raw or adjusted (not both, i guess default to adj) and pull dates and then put
    // in object that has stations and thier dataes. acualtyy maybe don't need contxt sation list
    //maybe can use stationlist that is in state
    // console.log('openlist',stationOpenList)
    // console.log('station data')
    // console.log('these are things that are triggering update', context.stationCardList, context.toggleChartTable,  context.agnosticStationData, context.dataType, context.bulkDates.dateList)
    if(context.stationCardList && context.stationCardList.length > 0){
      const nextStateObject = Object.create({})
      const initStationDateObject = Object.create({})
      const allStationDateOptions = [...context.bulkDates.dateList]
      const newAllStationDates = [...allStationDateOptions]
      // console.log('why is this undefind or null', context.stationCardList)
      context.stationCardList.map(currStation =>{
        const currDataType = context.dataType === 'both' ? 'adj' : context.dataType
        const stationData = context.agnosticStationData[currStation][currDataType]
        const rawStationData =  context.agnosticStationData[currStation]['raw']
        const adjStationData =  context.agnosticStationData[currStation]['adj']
        const stationDataDates = makeStationDates(context.agnosticStationData[currStation])
        const returnDates = stationDataDates.getLastDates()
        // console.log('stationDat', stationDataDates)
        // console.log('the function', stationDataDates.getLastDates())
        // const stationDatesBothTypes = {raw: Object.keys(rawStationData), adj: Object.keys(adjStationData)}
        const stationDates = Object.keys(stationData)
        console.log('array equality',  checkArraysEqual(allStationDateOptions, stationDates), 'all dates', allStationDateOptions, 'stateion dates', stationDates)
        if(checkArraysEqual(allStationDateOptions, stationDates) == false){
          // console.log('inside here')
          stationDates.map(currStationDate =>{
            if(newAllStationDates.indexOf(currStationDate)<0){
              newAllStationDates.push(currStationDate)
            }
          })
          // console.log('dispatchBulkDatesUpdate station compare dates')
          console.log('need to fix this')
          // context.dispatchBulkDatesUpdate({type: 'dateUpdate', payload:newAllStationDates})
        }
        nextStateObject[currStation] = stationDates
        // console.log('station dates', stationDates, 'curr station', currStation)
        const lastStationIndex = stationDates.length -1
        const lastDates = {date1: stationDates[lastStationIndex -1], date2:stationDates[lastStationIndex]}
        // const lastDatesBothTypes = {raw: {date1: }}
        // console.log('cur station', currStation)
        // console.log('currDataDyte', currDataType)
        // console.log('stationData', stationData)
        // console.log('stationDates', stationDates)
        // initStationDateObject[currStation] = lastDates
        initStationDateObject[currStation] = {...returnDates}

        // console.log('lastDates', lastDates)
        
      })
      // console.log('nextStateObject', nextStateObject)
      // console.log('initStationDateObject', initStationDateObject)
      // console.log('dispatching initload', 'list', context.stationCardList, 'toggletype', context.toggleChartTable,  'agnosticstationdata', context.agnosticStationData,'datatype', context.dataType, 'bulk dates datelis', context.bulkDates.dateList)
      console.log('dispatching init load from tabledatepicker')
      context.dispatchSetStationCompareDates({type: 'initLoad', payload:initStationDateObject})
      setAllStationDates(nextStateObject)
    }

  },[context.stationCardList, context.toggleChartTable,  context.agnosticStationData, context.dataType, context.bulkDates.dateList])

  useEffect(()=>{
    console.log('context.stationCardList changed', context.stationCardList)
    // console.log('table data changed')
  },[context.stationCardList])
  useEffect(()=>{
    console.log('context.toggleChartTable changed', context.toggleChartTable)
    // console.log('table data changed')
  },[context.toggleChartTable])

  useEffect(()=>{
    console.log('context.dataType changed', context.dataType)
    // console.log('table data changed')
  },[context.dataType])

  useEffect(()=>{
    console.log('context.agnosticStationData changed', context.agnosticStationData)
    // console.log('table data changed')
  },[context.agnosticStationData])

  useEffect(()=>{
    console.log('context.bulkDates.dateList changed', context.bulkDates.dateList)
    // console.log('table data changed')
  },[context.bulkDates.dateList])


  
  // useEffect(()=>{
  //   // console.log('curr checke', checked)
  //   console.log('all station dates', allStationDates)
  // },[allStationDates])

  const handleToggle = (value) => () => {
    // console.log('value here', value)
    const currentIndex = stationOpenList[value];
    const newChecked = {...stationOpenList, [value]:!currentIndex}
    setStationOpenList(newChecked)
  }

  const buttons = <>
    <ToggleButton sx={{pl:0.3, pr:0.3, fontSize: '11px', pt:0.3, pb: 0.3, m:0}} value = "bulk"  key="bulk">All Stations</ToggleButton>
    <ToggleButton sx={{pl:0.3, pr:0.3, fontSize: '11px', pt:0.3, pb: 0.3, m:0}} value = "individual"  key="individual">Individual Station</ToggleButton>
  </>

  // const control = {
  //   value: context.bulkDates.selected ? 'bulk' :'individual',
  //   onChange: ()=>context.dispatchBulkDatesUpdate({type: 'typeToggle', payload: !context.bulkDates.selected}),
  //   exclusive: true,
  //   color:"primary"
  // };

  // const handleToggle1 = useMemo(value=>{
  //   const currentIndex = stationOpenList[value];
  //   const newChecked = {...stationOpenList, [value]:!currentIndex}
  //   setStationOpenList(newChecked)
  // },[])

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', pt:0, mt:0, pb:0, mb:0 }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      dense
      // subheader={
      //   <ListSubheader component="div" id="nested-list-subheader">
      //     Nested List Items
      //   </ListSubheader>
      // }
    >
     
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Table Date Picker" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {/* <ToggleButtonGroup  size="small"  variant="text" aria-label="small button group"  {...control}>
          
          {buttons}
        </ToggleButtonGroup> */}
        <FormControl margin={'dense'} fullWidth={true} sx={{pl:3, fontSize: '8px'}}>
          <RadioGroup
            row
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={radioValue}
            onChange={handleRadioChange}
            size="small"
            sx={{fontSize:'1px'}}
          >
            <FormControlLabel sx={{fontSize:'0.5rem', pl:0}} value="bulk" control={<Radio size="small" />} label="Bulk Set Dates" />
              <Collapse in={radioValue === 'bulk'} timeout="auto" unmountOnExit>
              {<StationDateOptions test = 'iyyyayayay' newStationDates = {context.bulkDates.dateList ? context.bulkDates.dateList : null} stationDates={context.bulkDates.dateList ? context.bulkDates.dateList : null}  station={'bulk'} />}
              </Collapse>
            <FormControlLabel sx={{fontSize:'1px'}} value="individual" control={<Radio size="small" />} label="Set Individual Dates" />
              <Collapse in={radioValue === 'individual'} timeout="auto" unmountOnExit>
                {context.stationCardList.map((currStation) => {
                  const labelId = `checkbox-list-label-${currStation}`;
                  const stationDates = []
                

                  return (
                    <div key={currStation}>

                    <ListItemButton role={undefined} onClick={handleToggle(currStation)} dense sx={{pt:0, pb:0}}>
                      <ListItemIcon>
                      {stationOpenList[currStation] ? <ExpandLess /> : <ExpandMore />} 
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={`${currStation}`} />
                    </ListItemButton>
                    <Collapse in={stationOpenList[currStation] } timeout="auto" unmountOnExit>
                    {<StationDateOptions test = 'iyyyayayay' newStationDates = {allStationDates ? allStationDates[currStation] : null} stationDates={stationDates} station={currStation} />}
                      
                    </Collapse>
                    </div>
                    
                  );
                })}
              </Collapse>
          </RadioGroup>
        </FormControl>
        {/* <List dense sx={{ pl:'25px', bgcolor: 'background.paper', pt:0, mt:0, pb:0, mb:0 }}>
          <ListItemButton role={undefined} onClick={()=>{setBulkOptionsOpen(!bulkOptionsOpen)}} dense sx={{pl:0, pt:0, pb:0}}>
            <ListItemIcon>
              {bulkOptionsOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemIcon>
            <ListItemText id={'labelId'} primary={`Bulk Set Dates`} />
          </ListItemButton>
          <ListItemButton disabled = {false} role={undefined} onClick={()=>{setStationListOpen(!stationListOpen)}} dense sx={{pl:0, pt:0, pb:0}}>
            <ListItemIcon>
              {stationListOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemIcon>
            <ListItemText id={'labelId'} primary={`Set Individual Dates`} />
          </ListItemButton>
        </List> */}
      </Collapse>
    </List>
  );
}

// return (
//   <List
//     sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', pt:0, mt:0, pb:0, mb:0 }}
//     component="nav"
//     aria-labelledby="nested-list-subheader"
//     dense
//     // subheader={
//     //   <ListSubheader component="div" id="nested-list-subheader">
//     //     Nested List Items
//     //   </ListSubheader>
//     // }
//   >
   
//     <ListItemButton onClick={handleClick}>
//       <ListItemIcon>
//         <DashboardIcon />
//       </ListItemIcon>
//       <ListItemText primary="Table Date Picker" />
//       {open ? <ExpandLess /> : <ExpandMore />}
//     </ListItemButton>
//     <Collapse in={open} timeout="auto" unmountOnExit>
//       <List dense sx={{ pl:'25px', bgcolor: 'background.paper', pt:0, mt:0, pb:0, mb:0 }}>
//         {context.stationCardList.map((value) => {
//           const labelId = `checkbox-list-label-${value}`;
//           const stationDates = context.boxPlotData[value]
        

//           return (
//             <ListItem
//               key={value}
//               // sx={{height:'25px'}}
//               disablePadding
//               dense
//               sx={{pt:0, pb:0, mt:0, mb:0}}
//             >
//               <ListItemButton role={undefined} onClick={handleToggle(value)} dense sx={{pt:0, pb:0}}>
//                 <ListItemIcon>
//                 {stationOpenList[value] ? <ExpandLess /> : <ExpandMore />} 
//                 </ListItemIcon>
//                 <ListItemText id={labelId} primary={`${value}`} />
//                 <Collapse in={stationOpenList[value]} timeout="auto" unmountOnExit>
//                   {/* {stationDateOptions(stationDates)} */}
                  
//                 </Collapse>
//               </ListItemButton>
//             </ListItem>
//           );
//         })}
//       </List>
//     </Collapse>
//   </List>
// );
// }


function StationDateOptions(props){
  // console.log('station dates', fcstDates)
  // console.log('station date options propts', props)
  const [checkedState, setCheckedState] = useState()
  const stationDates = props.stationDates ? Object.keys(props.stationDates) : [];
  return(
    <List component="div" disablePadding  sx={{ pl:'25px', bgcolor: 'background.paper', pt:0, mt:0, pb:0, mb:0 }}>
                  {
                    <Box sx={{ width: '100%' }}>
                      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                        <Grid item xs={6}>
                          <DateSelectComponent id={'date1'} label={'Date 1'} stationDates = {props.newStationDates ? props.newStationDates : []} station={props.station ? props.station : null} />
                        </Grid>
                        <Grid item xs={6}>
                          <DateSelectComponent id={'date2'} label={'Date 2'} stationDates = {props.newStationDates ? props.newStationDates : []} station = {props.station ? props.station : null}/>
                        </Grid>
                        
                      </Grid>
                    </Box>
                  }
                </List>
  )
}


// <Box
// component="form"
// sx={{
  
// }}
// noValidate
// autoComplete="off"
// >
// <TextField id="outlined-basic" label="Outlined" variant="outlined" />
// <TextField id="filled-basic" label="Filled" variant="filled" />
// </Box>


// function StationDateOptions(props){
//   // console.log('station dates', fcstDates)
//   const [checkedState, setCheckedState] = useState()
//   const stationDates = Object.keys(props.stationDates)
//   return(
//     <List component="div" disablePadding  sx={{ pl:'25px', bgcolor: 'background.paper', pt:0, mt:0, pb:0, mb:0 }}>
//                   {
//                     stationDates.map(currDate=>{
//                       const labelIdDate = `checkbox-list-label-${currDate}`;
//                       return(
//                         <ListItem
//                           key={currDate}
//                           // sx={{height:'25px'}}
//                           disablePadding
//                           dense
//                           sx={{pt:0, pb:0, mt:0, mb:0}}
//                         >
//                           <ListItemButton role={undefined} onClick={(event, value)=>(console.log('clicked value', value, 'currDate', currDate))} dense sx={{pt:0, pb:0}}>
//                             <ListItemIcon>
//                               <DateSelectComponent />
//                             </ListItemIcon>
//                             <ListItemText id={labelIdDate} primary={`${currDate}`} />
//                           </ListItemButton>

//                          </ListItem>
//                       )
//                     })
//                   }
//                 </List>
//   )
// }