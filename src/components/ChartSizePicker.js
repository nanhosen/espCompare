import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import ViewComfyAltIcon from '@mui/icons-material/ViewComfyAlt';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


import React, {  useContext} from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AppContext from '../context/AppContext'


export default function ChartSizePicker(props) {
  const context = useContext(AppContext)
  const [open, setOpen] = React.useState(true);


  const handleChange = (event, nextView) => {
    console.log('clicked', event, nextView, context)
    context.setDisplayChartType(nextView);
  };



  const handleClick = () => {
    setOpen(!open);
  };



  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', pt:0, mt:0, pb:0, mb:0 }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      dense
    >
     
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <ViewComfyAltIcon />
        </ListItemIcon>
        <ListItemText primary="Chart Size" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>

              {<DiscreteSliderValues/>}

        </List>
      </Collapse>
    </List>
  );
}



const marks = [

  {
    value: 6,
    label: 'Medium',
  },
  {
    value: 12,
    label: 'Large',
  }
];

function valuetext(value) {
  return ``;
}

function valueLabelFormat(value) {
  return marks.findIndex((mark) => mark.value === value) + 1;
}

function DiscreteSliderValues() {
  const context = useContext(AppContext)

  return (
    <Box sx={{ width: 200, pl:6 }}>
      <Slider
        size="small"
        aria-label=""
        defaultValue={6}
        valueLabelFormat={valueLabelFormat}
        getAriaValueText={valuetext}
        step={null}
        valueLabelDisplay="off"
        marks={marks}
        max={12}
        min={6}
        onChange = {(event, value)=>{context.setChartSize(value === 0 ? 3 : value)}}
      />
    </Box>
  );
}
