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
import TableViewIcon from '@mui/icons-material/TableView';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import ViewListIcon from '@mui/icons-material/ViewList';

export default function DisplayTypePicker(props) {
  const context = useContext(AppContext)
  const [open, setOpen] = React.useState(true);


  const handleChange = (event, nextView) => {
    // console.log('clicked', event, nextView, context)
    context.setToggleChartTable(nextView);
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
          <TableViewIcon />
        </ListItemIcon>
        <ListItemText primary="Display Type" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding dense>

              <ListItemButton
                selected={context.toggleChartTable === 'chart'}
                onClick={(event) => handleChange(event, 'chart')}
                sx={{ pl: 4,pt:0, pb:0, mt:0, mb:0  }}
                dense
              >
                <ListItemIcon>
                  <InsertChartIcon />
                </ListItemIcon>
                <ListItemText primary="Chart" />
              </ListItemButton>
              <ListItemButton
                selected={context.toggleChartTable === 'table'}
                onClick={(event) => handleChange(event, 'table')}
                sx={{ pl: 4,pt:0, pb:0, mt:0, mb:0  }}
                dense
              >
                <ListItemIcon>
                  <ViewListIcon />
                </ListItemIcon>
                <ListItemText primary="Table" />
              </ListItemButton>

        </List>
      </Collapse>
    </List>
  );
}
