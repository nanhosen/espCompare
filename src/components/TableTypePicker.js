import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';



import React, {  useContext} from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AppContext from '../context/AppContext'


export default function TableTypePicker(props) {
  const context = useContext(AppContext)
  const [open, setOpen] = React.useState(true);


  const handleChange = (event, nextView) => {
    // console.log('clicked', event, nextView, context)
    context.setDisplayTableType(nextView);
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
        <ListItemText primary="Table Type" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding dense>
              <ListItemButton
                selected={context.displayTableType === 'original'}
                onClick={(event) => handleChange(event, 'original')}
                sx={{ pl: 4,pt:0, pb:0, mt:0, mb:0  }}
                dense
              >
                <ListItemIcon>
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Yearly" />
              </ListItemButton>
              <ListItemButton
                selected={context.displayTableType === 'new'}
                onClick={(event) => handleChange(event, 'new')}
                sx={{ pl: 4,pt:0, pb:0, mt:0, mb:0  }}
                dense
              >
                <ListItemIcon>
                  <CandlestickChartIcon />
                </ListItemIcon>
                <ListItemText primary="Monthly" />
              </ListItemButton>
              

        </List>
      </Collapse>
    </List>
  );
}
