import React, {useEffect, useState, useContext, useRef} from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import ListItem from '@mui/material/ListItem';
import AppContext from '../context/AppContext'
import ChartTypePicker from './ChartTypePicker';
import DateSelectComponent from './DateSelectComponent'
import { dateFormat } from 'highcharts';

function makeInitStateOpen(stations){
  const returnObj = Object.create({})
  stations.map(currStn=>{
    returnObj[currStn] = false
  })
  return returnObj
}

export default function TableDatePicker(props) {
  const context = useContext(AppContext)
  const [open, setOpen] = React.useState(true);
  const [stationOpenList, setStationOpenList] = React.useState(makeInitStateOpen(context.stationCardList))
  const [checked, setChecked] = React.useState(context.stationCardList);
  const [stationList, setStationList] = useState([])
  useEffect(()=>{
    if(context.chartData && Object.keys(context.chartData).length > 0 ){
      setStationList(Object.keys(context.chartData))
      setChecked(context.stationCardList)
      // console.log('chartData', context.chartData)
    }
  },[context.stationCardList])

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(()=>{
    // console.log('openlist',stationOpenList)

  },[stationOpenList])

  useEffect(()=>{
    // console.log('curr checke', checked)
  },[checked])

  const handleToggle = (value) => () => {
    console.log('value here', value)
    const currentIndex = stationOpenList[value];
    const newChecked = {...stationOpenList, [value]:!currentIndex}
    setStationOpenList(newChecked)


  };

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
        <List dense sx={{ pl:'25px', bgcolor: 'background.paper', pt:0, mt:0, pb:0, mb:0 }}>
          {context.stationCardList.map((value) => {
            const labelId = `checkbox-list-label-${value}`;
            const stationDates =context.boxPlotData[value]
            {/* console.log('stationDates', stationDates) */}
          

            return (
              <div key={value}>

              <ListItemButton role={undefined} onClick={handleToggle(value)} dense sx={{pt:0, pb:0}}>
                <ListItemIcon>
                {stationOpenList[value] ? <ExpandLess /> : <ExpandMore />} 
                </ListItemIcon>
                <ListItemText id={labelId} primary={`${value}`} />
              </ListItemButton>
              <Collapse in={stationOpenList[value] } timeout="auto" unmountOnExit>
              {<StationDateOptions stationDates={stationDates} station={value} />}
                {/* <List component="div" disablePadding  sx={{ pl:'25px', bgcolor: 'background.paper', pt:0, mt:0, pb:0, mb:0 }}>
                  {
                    stationDates.map(currDate=>{
                      const labelIdDate = `checkbox-list-label-${currDate}`;
                      return(
                        <ListItem
                          key={currDate}
                          // sx={{height:'25px'}}
                          disablePadding
                          dense
                          sx={{pt:0, pb:0, mt:0, mb:0}}
                        >
                          <ListItemButton role={undefined} onClick={(event, value)=>(console.log('clicked value', value, 'currDate', currDate))} dense sx={{pt:0, pb:0}}>
                            <ListItemIcon>
                              <Checkbox
                                size="small"
                                edge="start"
                                checked={true}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                                sx={{pt:0, pb:0}}
                              />
                            </ListItemIcon>
                            <ListItemText id={labelIdDate} primary={`${currDate}`} />
                          </ListItemButton>

                         </ListItem>
                      )
                    })
                  }
                </List> */}
              </Collapse>
              </div>
              
            );
          })}
        </List>
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
  const [checkedState, setCheckedState] = useState()
  const stationDates = Object.keys(props.stationDates)
  return(
    <List component="div" disablePadding  sx={{ pl:'25px', bgcolor: 'background.paper', pt:0, mt:0, pb:0, mb:0 }}>
                  {
                    <Box sx={{ width: '100%' }}>
                      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                        <Grid item xs={6}>
                          <DateSelectComponent id={'date1'} label={'Date 1'} stationDates = {stationDates} station={props.station} />
                        </Grid>
                        <Grid item xs={6}>
                          <DateSelectComponent id={'date2'} label={'Date 2'} stationDates = {stationDates} station = {props.station}/>
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