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
import SideBar from './SideBar';
import SingleStationPage from './SingleStationPage';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
      // return <SingleStationPage />
      return <ColumnChartMaker />
    }
    else if(type === 'table'){
      // return <SingleStationPage />
      return <ColumnTableMaker />
    }
    else if(type === 'singleStation'){
      return <>
        <ColumnChartMaker chartType = {'box'}/>
        <ColumnChartMaker chartType = {'column'}/>
        <ColumnChartMaker chartType = {'allTrace'}/>
        <ColumnTableMaker />
      </>

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

function DashboardContent() {
  const context = useContext(AppContext)

  const [open, setOpen] = React.useState(true);
  const [refHeight, setRefHeight] = useState(200)
  const chartRef = useRef(null)
  const [displayType, setDisplayType] = useState(context.toggleChartTable)

  useEffect(()=>{
    if(context.stationCardList.length === 1){
      setDisplayType('singleStation')
    }
    else{
      if(context.toggleChartTable !== displayType){
        setDisplayType(context.toggleChartTable)
      }
    }

  },[context.toggleChartTable, context.stationCardList, displayType])
  const toggleDrawer = () => {
    console.log('toggled drawere will now be', !open)
    setOpen(!open);
  };

  useEffect(()=>{
    // console.log('chartRef', chartRef, chartRef?.current, chartRef?.current?.clientHeight)

  },[chartRef])

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        {/* <AppBar position="absolute" open={open}> */}
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              // sx={{
              //   marginRight: '36px',
              //   ...(open && { display: 'none' }),
              // }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Water 5-Year Traces Tool 
            </Typography>
            {/* <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
          </Toolbar>
        </AppBar>
        <SideBar  isOpen = {context.dataStatus?.status === 'done' ? true : false} />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            // flexGrow: 1,
            width: '100%',
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth={false} sx={{ mt: 4, mb: 4 }} ref={chartRef}>
            <Grid container spacing={1}>
              {returnMainContent(displayType, context.dataStatus?.status, context.dataStatus?.text)}
              {/* <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Chart parentHeight={240} station={'GLDA3'}/>
                </Paper>
              </Grid> */}
              {/* Recent Deposits */}
              {/* <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid> */}
              {/* Recent Orders */}
              {/* <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Orders />
                </Paper>
              </Grid> */}
            </Grid>
            {/* <Copyright sx={{ pt: 4 }} /> */}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}