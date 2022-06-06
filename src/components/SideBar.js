
import React, {useEffect, useState, useRef, useContext} from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import Chart from './Chart1';
import Deposits from './Deposits';
import Orders from './Orders';
import ColumnChartMaker from './ColumnChartMaker';
import AppContext from '../context/AppContext'
import ColumnTableMaker from './ColumnTableMaker';
import LoadingPage from './LoadingPage';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(3),
          // width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();
const returnMainContent = (type, status, loadingPageText)=>{
  // console.log('type', type, 'status', status)
  if(status === 'done'){
    if(type === 'chart'){
      return <ColumnChartMaker />
    }
    else if(type === 'table'){
      return <ColumnTableMaker />
    }
    else{
      return `wrong content type ${type}`
    }
  }
  else if(status === 'processing' || status === 'requested'){
    return <LoadingPage text={loadingPageText} />
    // return <LoadingPage />
  }
  else{
    return <>
      there must have been some sort of processing error {status}
    </>
  }
}


export default function SideBar(props){
  // console.log('sidebar props', props)
  const {isOpen} = props

  const context = useContext(AppContext)

  const [open, setOpen] = React.useState(isOpen);
  const [refHeight, setRefHeight] = useState(200)
  const chartRef = useRef(null)
  const toggleDrawer = () => {
    console.log('toggled drawere will now be', !open)
    setOpen(!open);
  };

  useEffect(()=>{
    // console.log('chartRef', chartRef, chartRef?.current, chartRef?.current?.clientHeight)

  },[chartRef])

  return(
    <>
    {isOpen && <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
          open={true}
        >
          {/* <Drawer variant="permanent" open={open}> */}
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <Typography
                // component="h1"
                variant="h6"
                color="inherit"
                sx={{ pl:2, pr:5 }}
              >
                Plot Options
              </Typography>
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav" dense>
            {mainListItems(open, context.toggleChartTable)}
            {/* <Divider sx={{ my: 1 }} /> */}
            {secondaryListItems}
          </List>
        </Drawer>}
    </>
  )
}