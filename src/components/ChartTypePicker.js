import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';



import React, {  useContext} from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AppContext from '../context/AppContext'


export default function ChartTypePicker(props) {
  const context = useContext(AppContext)
  const [open, setOpen] = React.useState(true);


  const handleChange = (event, nextView) => {
    // console.log('clicked', event, nextView, context)
    context.setDisplayChartType(nextView);
  };



  const handleClick = () => {
    setOpen(!open);
  };



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
          <GraphicEqIcon />
        </ListItemIcon>
        <ListItemText primary="Chart Type" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding dense>

              <ListItemButton
                selected={context.displayChartType === 'column'}
                onClick={(event) => handleChange(event, 'column')}
                sx={{ pl: 4,pt:0, pb:0, mt:0, mb:0  }}
                dense
              >
                <ListItemIcon>
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Column" />
              </ListItemButton>
              <ListItemButton
                selected={context.displayChartType === 'boxplot'}
                onClick={(event) => handleChange(event, 'boxplot')}
                sx={{ pl: 4,pt:0, pb:0, mt:0, mb:0  }}
                dense
              >
                <ListItemIcon>
                  <CandlestickChartIcon />
                </ListItemIcon>
                <ListItemText primary="Box Plot" />
              </ListItemButton>

        </List>
      </Collapse>
    </List>
  );
}
