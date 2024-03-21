import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import DataObjectIcon from '@mui/icons-material/DataObject';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';



import React, {useState,  useContext, useEffect} from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AppContext from '../context/AppContext'


export default function DataTypePicker(props) {
  const context = useContext(AppContext)
  const [open, setOpen] = useState(true);
  const [alignment, setAlignment] = useState('left');
  const [buttons, setButtons] = useState([])

  const handleChange = (event, nextView) => {
    // setAlignment(newAlignment);
    console.log('data type button clicked this is the value', nextView)
    context.setDataType(nextView);
  };

  useEffect(()=>{
    setButtons(returnButtons(context.toggleChartTable))
    // console.log('context', context)
    // {context.toggleChartTable === 'table'

  },[context.toggleChartTable])
  
  // const buttons = [
  //   <ToggleButton value = "raw"  key="Raw">Raw</ToggleButton>,
  //   <ToggleButton value = "adj"  key="Adj">Adj</ToggleButton>,
  //   <ToggleButton value = "both"  key="Both">Both</ToggleButton>
  // ];
  

  // const handleChange = (event, nextView) => {
  //   console.log('clicked', event, nextView, context)
  //   context.setDataType(nextView);
  // };

  const control = {
    value: context.dataType,
    onChange: handleChange,
    exclusive: true,
    color:"primary"
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const handleDataTypeClick=(inputType)=>{
    context.setDataType(inputType)
  }


  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', pt:0, mt:0, pb:0, mb:0}}
      component="nav"
      aria-labelledby="nested-list-subheader"
      disablePadding
      dense
    >
     
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <DataObjectIcon />
        </ListItemIcon>
        <ListItemText primary="Data Type" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <ToggleButtonGroup  size="small"  variant="text" aria-label="small button group"  {...control}>
          
          {buttons}
        </ToggleButtonGroup>
      </Collapse>
    </List>
  );
}


function returnButtons(displayType){
  // console.log('dtatype', displayType)
  
  const dataObj = {
    raw:<ToggleButton value = "raw"  key="Raw">Raw</ToggleButton>,
    adj:<ToggleButton value = "adj"  key="Adj">Adj</ToggleButton>,
    both:<ToggleButton value = "both"  key="Both">Both</ToggleButton>
  }

  if(displayType === 'table'){
    return [ dataObj.raw, dataObj.adj]
  }
  else{
   return [ dataObj.raw, dataObj.adj, dataObj.both]
  }

}