import ReactDOM from "react-dom";
import React, {useEffect, useState, useContext} from 'react';
import AppContext from '../context/AppContext'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';


// const styles = theme => ({
//   root: {
//     width: "100%",
//     maxWidth: 360,
//     backgroundColor: theme.palette.background.paper
//   },
//   listItemSecondaryAction: {
//     visibility: "hidden",
//   },
//   listItem: {
//     border: "1px solid blue",
//     "&:hover $listItemSecondaryAction": {
//       visibility: "inherit"
//     }
//   }
// });


const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 400,
  color: theme.palette.text.primary,
}));


export default function LoadingPage(props){
  const context = useContext(AppContext)
  const [chartConfig, setChartConfig] = useState('hi')
  // useEffect(()=>{
  //   // console.log('chart context', context)
  //   if(context && context.boxPlotData){

  //   }
  // },[context])
  if(props.text){
    return(
      <Box sx={{ flexGrow: 1, px: 3 }}>
      <StyledPaper
        sx={{
          my: 1,
          mx: 'auto',
          p: 2,
        }}
      >

            <Typography variant="h6">
              {props.text}
            </Typography>

      </StyledPaper>
      </Box>  
    )
  }
  else{
    return(
      <Card>
        <CardContent>
          <Typography>
              issue with props text {JSON.stringify(props)}
          </Typography>
        </CardContent>
      </Card>
    )
  }
}