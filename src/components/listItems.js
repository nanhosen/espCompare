import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import StationCheckList from './StationCheckList';
import ChartTypePicker from './ChartTypePicker';
import TableTypePicker from './TableTypePicker';
import ChartSizePicker from './ChartSizePicker';
import DisplayTypePicker from './DisplayTypePicker';
import TableDatePicker from './TableDatePicker';
import DataTypePicker from './DataTypePicker';


const makeListItems = (open, displayType)=>{
  // console.log('open', open, 'displayType', displayType)
  if(displayType === 'chart'){
    return (
      <>
        <StationCheckList open = {open}/>
        <Divider sx={{ my: 1 }} />
        <DisplayTypePicker open = {open}/>
        <Divider sx={{ my: 1 }} />
        <ChartTypePicker open = {open}/>
        <Divider sx={{ my: 1 }} />
        <ChartSizePicker open = {open}/>
        <Divider sx={{ my: 1 }} />
        <DataTypePicker />
      </>
    )
  }
  else if(displayType === 'table'){
    return (
      <>
        <StationCheckList open = {open}/>
        <Divider sx={{ my: 1 }} />
        <DisplayTypePicker open = {open}/>
        <TableTypePicker open = {open}/>
        <TableDatePicker />
        <Divider sx={{ my: 1 }} />
        <DataTypePicker />

      </>
    )
  }
  else if(displayType === 'singleStation'){
    return (
      <>
        <StationCheckList open = {open}/>
        <Divider sx={{ my: 1 }} />
        {/* <DisplayTypePicker open = {open}/> */}
        {/* <Divider sx={{ my: 1 }} /> */}
        {/* <ChartTypePicker open = {open}/> */}
        {/* <Divider sx={{ my: 1 }} /> */}
        <ChartSizePicker open = {open}/>
        <Divider sx={{ my: 1 }} />
        <TableDatePicker />
        <Divider sx={{ my: 1 }} />
        <DataTypePicker />
        {/* <DataTypePicker /> */}
      </>
    )
  }
  else{
    return(`invalid display type ${displayType}`)
  }
}

export function mainListItems(open, displayType){
  return (
  <React.Fragment>
    {makeListItems(open, displayType)}

      {/* <StationCheckList open = {open}/>
      <Divider sx={{ my: 1 }} />
      <DisplayTypePicker open = {open}/>
      <Divider sx={{ my: 1 }} />
      <ChartTypePicker open = {open}/>
      <Divider sx={{ my: 1 }} />
      <ChartSizePicker open = {open}/> */}

  </React.Fragment>
)}

export const secondaryListItems = (
  <React.Fragment>
    {/* <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton> */}
  </React.Fragment>
);