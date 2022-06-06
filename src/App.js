import logo from './logo.svg';
import './App.css';
import Dashboard from './components/Dashboard';
import DataProvider from './providers/DataProvider'
import Chart from './components/Chart1'
import TestThis from './components/TestThis';
import { Grid, Box, Divider, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { Profiler } from 'react';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';



const theme = createTheme({
  friendsListItem: {
    "&:hover $actions": {
      visibility: "hidden"
    }
  },
  // status: {
  //   danger: orange[500],
  // },
});
function App() {
  console.log('rendering app')
  return (
    <div className="App">
    <Profiler id="first" onRender={(input)=>{console.log(input)}}>
      <DataProvider>
        <ThemeProvider theme={theme}>
          <Dashboard />
          {/* <Chart /> */}
        </ThemeProvider>

      </DataProvider>
      </Profiler>
    </div>
  );
}

export default App;
