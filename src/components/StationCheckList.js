import React, {useEffect, useState, useContext, useReducer} from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ButtonGroup from '@mui/material/ButtonGroup';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import AppContext from '../context/AppContext'

import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import { styled } from '@mui/material/styles';
import {basinGroups} from '../config'
import FormControlLabel from '@mui/material/FormControlLabel';




// const divStyle = {
//   color: 'blue',
//   backgroundImage: 'url(' + imgUrl + ')',
// };

// function HelloWorldComponent() {
//   return <div style={divStyle}>Hello World!</div>;
// }
// .MenuItem.Mui-selected {
//   color: blue;
// }
// const SecondaryAction3 = styled(ListItemSecondaryAction)<
//   ListItemSecondaryActionProps
// >(() => ({
//   "&.MuiListItemSecondaryAction-root": {
//     backgroundColor: "cyan",
//     visibility: "visible",
//     "&:hover": {
//       background: "yellow",
//       visibility: "hidden"
//     }
//   }
// }));
const CustomListItem = styled(ListItem)(({ theme }) => ({
  // border: "1px solid blue",
    // "&:hover $listItemSecondaryAction": {
    //   visibility: "inherit"
    // },
    // '& .MuiListItemSecondaryAction': {
    //   visibility: 'hidden',
    //   color: 'pink'
    // },
}));
const CustomListItemSecondarySandbox = styled(ListItemSecondaryAction)(({ theme }) => {
  console.log('theme', theme)
  return ({
  "&.MuiListItemSecondaryAction-root": {
    backgroundColor: "cyan",
    visibility: "hidden",
    "&:hover": {
      background: "yellow",
      visibility: "visible"
    }
  }
})});
// MuiListItemSecondaryAction
{/* <div class="MuiListItemSecondaryAction-root css-518kzi-MuiListItemSecondaryAction-root"><button class="MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeSmall MuiButton-textSizeSmall MuiButtonBase-root  css-1knaqv7-MuiButtonBase-root-MuiButton-root" tabindex="0" type="button">Only<span class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"></span></button></div> */}
const CustomListItemSecondaryAction = styled(ListItemSecondaryAction)(({theme}) =>({
  visibility: "hidden",
  color: theme.palette.secondary.main,
  cursor: "pointer",
  display:"flex",
  "& .hidden": {
    display: "flex",
    backgroundColor:'red'
  },
  transition: theme.transitions.create(['visibility', 'transform'], {
    duration: theme.transitions.duration.standard,
  }),

  "&:hover,  &.Mui-focusVisible ": {
    // backgroundColor: theme.palette.secondary.main,
    // color: 'black',
    visibility: "visible",
    // transform: "scale(1.3)",
    // display:"flex",
    // boxShadow: '90px 0px 0px 8px var(--box-shadow)',
  },
  '&:focused':{
    backgroundColor:'red'
  }
}))

const StyledIconButton = styled(ListItemSecondaryAction)(`
  &:hover, &.Mui-focusVisible {
    // background-color: red;
    font-size: 0.1em;
    // disabled;
    // visibility:hidden;
    // display:none;
    // position:fixed;

  }
`);

// const CustomListItemSecondaryAction = styled(ListItemSecondaryAction)`
// ${({ theme }) => `
// visibility: visible;
// color: red;
// cursor: pointer;
// ${'' /* background-color: ${theme.palette.primary.main}; */}
// ${'' /* transition: ${theme.transitions.create(['background-color', 'transform'], { */}
//   ${'' /* duration: theme.transitions.duration.standard, */}
// ${'' /* })}; */}
// &:hover {
//   ${'' /* visibility: hidden; */}
//   background-color: ${theme.palette.secondary.main};
//   transform: scale(1.3);
// }
// `}
// `

function makeBasinStatus(basinConfig, selectedStations, checkedBasinName, checkedBasinStatus){
  const returnObj = Object.create({})
  for(const basinName in basinConfig){
    const basinInfo = basinConfig[basinName]
    const basinStations = basinInfo.stations
    const selectedBasinStations = basinStations.filter(currStation => selectedStations.indexOf(currStation)>=0)
    const basinHasStations = selectedBasinStations.length >0
    if(checkedBasinName && basinName === checkedBasinName){
      returnObj[basinName] = !checkedBasinStatus
    }
    else{
      if(basinHasStations){
        // console.log('basi stations', basinStations)
        // console.log('selectedBasinStations', selectedBasinStations)
        const isIndeterminate = selectedBasinStations.length < basinStations.length
        // console.log('is inderet', isIndeterminate)
        returnObj[basinName] = isIndeterminate ? 'indeterminate' : true
      }
      else{
        returnObj[basinName] = basinHasStations
      }
    }
  }
  // console.log('basin status return obj', returnObj)
  return returnObj

}
function basinCheckboxReducer(state, action){
  // console.log('iin basin checkboc reudcer', state, action)
  const {type, payload} = action
  const {checkedStations, basinName, stationHandleToggle, value} = payload
  switch(type){
    case 'basinCheckToggle':
      const nextStatus = makeBasinStatus(basinGroups, checkedStations, basinName, state[basinName])
      // console.log('next status', nextStatus)
      // console.log('should be toggling station now', stationHandleToggle)
      stationHandleToggle({type: 'basinToggle', value: {basinStatus:nextStatus, basinInfo: basinGroups}})
      return {...nextStatus}
    case 'stationCheckboxToggle':
      // console.log('station checkbox toggle action', state, action)
      const nextStatusCheckbox = makeBasinStatus(basinGroups, checkedStations)
      // console.log('next status checkbox', nextStatusCheckbox)
      return {...nextStatusCheckbox}
    default:
      console.log('in default data status reducer acase')        

  }

}

export default function StationCheckList(props) {
  const context = useContext(AppContext)
  // console.log('station checklist props', props)
  const [open, setOpen] = React.useState(true);
  const [basinOpen, dispatchBasinCheckboxStatus] = useReducer(basinCheckboxReducer, makeBasinStatus(basinGroups, context.stationCardList));

  const [checked, setChecked] = React.useState(context.stationCardList);
  const [stationList, setStationList] = useState([])
  const basinList = Object.keys(basinGroups)
  useEffect(()=>{
    if(context.allStationList && context.allStationList.length > 0 ){
      setStationList(context.allStationList)
      setChecked(context.allStationList)
      // console.log('chartData', context.chartData)
    }
  },[context.allStationList])

  const handleClick = () => {
    setOpen(!open);
  };

  const handleBasinClick = ({value, basinName, checkedStations, basinStationArray, stationHandleToggle}) => {
    // console.log('handle basin click',value, basinName, checkedStations, basinStationArray)
    // console.log('value', value)
    // console.log('dispatching basin checkbo xstus')
    dispatchBasinCheckboxStatus({type:'basinCheckToggle', payload:{checkedStations, basinName, stationHandleToggle, value}})
    
    // setBasinOpen(!basinOpen);
  };

  // useEffect(()=>{
  //   if(props.open === false){

  //     setOpen(props.open)
  //   }

  // },[props.open])

  // useEffect(()=>{
  //   console.log('curr basinOpen', basinOpen)
  // },[basinOpen])

  const handleToggle = ({type, value}={}) => {
    // console.log('in handletoggle')
    let newChecked
    // let newChecked = value !== 'none' ? [...checked] : []
    // console.log('ty[e', type, 'value', value)
    // console.log('new checked top', newChecked)
    if(type === 'all'){
      newChecked = stationList
    }
    else if(type === 'basinToggle'){
      const {basinStatus, basinInfo} = value
      if(basinStatus && basinInfo){
        newChecked = []
        for(const basin in basinInfo){
          const basinStations = basinInfo[basin]['stations']
          if(basinStatus[basin]){
            newChecked.push(...basinStations)
          }
        }
        // console.log('new checked', newChecked)


      }

    }
    else if(type === 'checkbox'){
      const currentIndex = checked.indexOf(value);
      newChecked = [...checked]
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
      
    }
    else if(type === 'only'){
      if(!value){
        console.log('there is an error here because no value was supplied')
        return
      }
      newChecked = [value]
    }
    
    // if(value!== 'all' && value!=='none'){
      //   const currentIndex = checked.indexOf(value);
      //   newChecked = [...checked]
      //   if (currentIndex === -1) {
        //     newChecked.push(value);
        //   } else {
          //     newChecked.splice(currentIndex, 1);
          //   }
          // }
          // else{
            //   newChecked = value === 'none' ? [] : stationList
            // }
            // console.log('new checked bottom', newChecked)
    dispatchBasinCheckboxStatus({type:'stationCheckboxToggle', payload:{checkedStations:newChecked}})
    setChecked(newChecked)
    // console.log('newChecked', newChecked)
    context.setStationCardList(newChecked)
  };
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', pt:0, mt:0, pb:0, mb:0 }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      dense
      // subheader={
      //   <ListSubheader component="div" id="nested-list-subheader">
      //     Nested List Items
      //   </ListSubheader>
      // }
    >
     
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Station Visibility" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List dense sx={{ pl:'25px', bgcolor: 'background.paper', pt:0, mt:0, pb:0, mb:0 }}>
            {basinList.map((basinName) => {
              const basinInfo = basinGroups[basinName]
              const basinStationArray = basinInfo['stations']
              const labelIdBasin = `checkbox-list-label-${basinName}`
              const basinComponentStart1 = <CustomListItem
                  key={basinName}
                  // sx={{height:'25px'}}
                  disablePadding
                  dense
                  // sx={{pt:0, pb:0, mt:0, mb:0, pr:0, pl:0}}
                  >
                  <FormControlLabel
                    // label={basinInfo.printName}
                    label={<Typography sx={{fontSize:'15px'}}>{basinInfo.printName}</Typography>}
                    sx={{fontSize: '1px'}}
                    control={
                      <Checkbox
                        size="small"
                        edge="start"
                        checked={basinOpen ? basinOpen[basinName] : false}
                        value={basinName}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelIdBasin}}
                        onChange={(e)=>handleBasinClick({value: e.target.value, basinName, checkedStations: context.stationCardList, basinStationArray, stationHandleToggle: handleToggle})}
                        // sx={{pr:0, }}
                        indeterminate={basinOpen[basinName]==='indeterminate'}
                        sx={{pt:0, pb:0}}
                      />
                    }
                  />
                  
                  
                  
                </CustomListItem>

              const component2Array = [basinComponentStart1]
              const components = basinStationArray.map((stationName,i) =>{
                component2Array.push(<StationCheckListInner value={stationName} key={i} handleToggle={handleToggle} checked={checked}/>)
                return <StationCheckListInner value={stationName} handleToggle={handleToggle} key={i+1} checked={checked}/>
              })
              return component2Array
              {/* console.log('components', components) */}
            })}
            <ListItem
              key={'none'}
              // sx={{height:'25px'}}
              disablePadding
              dense
              // sx={{pt:1, pb:0, mt:0, mb:0}}
            >
              
              {/* <Stack direction="row" spacing={0}> */}
                <Button
                  size="small"
                  onClick={()=>handleToggle({type:'all'})}
                >
                  Select All
                </Button>

              {/* </Stack> */}
            </ListItem>

          </List>
      </Collapse>
    </List>
  );
}



function StationCheckListInner(props){
  const {value, handleToggle, checked} = props
  const labelId = `checkbox-list-label-${value}`;

              return (
                <ListItem
                  key={value}
                  // sx={{height:'25px'}}
                  // disablePadding
                  dense
                  sx={{pt:0, pb:0, mt:0, mb:0, pl:0}}
                  alignItems="flex-start"
                  disableGutters
                  >
                  <ListItemButton role={undefined} onClick={()=>handleToggle({type: 'checkbox', value}) } focusVisibleClassName='focused' dense sx={{pt:0, pb:0}}>
                    <ListItemIcon>
                      <Checkbox
                        size="small"
                        edge="start"
                        checked={checked.indexOf(value) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                        sx={{pt:0, pb:0, pr:0}}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={`${value}`} sx={{pl:0, ml:0}}/>
                  </ListItemButton>
                  <ListItemSecondaryAction
                    sx={{
                      mr:0,
                      visibility: 'visible',
                      opacity:0,
                      '&:hover, &:focus': {
                        // visibility:'hidden'
                        opacity:1
                      }
                    }}
                  >
                    <Button 
                      variant="text" 
                      size="small"
                      onClick={()=>handleToggle({type: 'only', value}) } 
                    >
                      Only
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              );
} 





{/* <List dense sx={{ pl:'25px', bgcolor: 'background.paper', pt:0, mt:0, pb:0, mb:0 }}>
          {stationList.map((value) => {
            const labelId = `checkbox-list-label-${value}`;

            return (
              <CustomListItem
                key={value}
                // sx={{height:'25px'}}
                disablePadding
                dense
                sx={{pt:0, pb:0, mt:0, mb:0}}
                // secondaryAction={
                //   <Button 
                //     variant="text" 
                //     size="small"
                //     onClick={handleToggle({type: 'only', value}) } 
                //   >
                //     Only
                //   </Button>
                // }
                >
                <ListItemButton role={undefined} onClick={handleToggle({type: 'checkbox', value}) } focusVisibleClassName='focused' dense sx={{pt:0, pb:0}}>
                  <ListItemIcon>
                    <Checkbox
                      size="small"
                      edge="start"
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                      sx={{pt:0, pb:0}}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={`${value}`} />
                </ListItemButton>
                <ListItemSecondaryAction
                  sx={{
                    mr:0,
                    visibility: 'visible',
                    opacity:0,
                    '&:hover, &:focus': {
                      // visibility:'hidden'
                      opacity:1
                    }
                  }}
                >
                  <Button 
                    variant="text" 
                    size="small"
                    onClick={handleToggle({type: 'only', value}) } 
                  >
                    Only
                  </Button>
                </ListItemSecondaryAction>
              </CustomListItem>
            );
          })}
          <ListItem
            key={'none'}
            // sx={{height:'25px'}}
            disablePadding
            dense
            // sx={{pt:1, pb:0, mt:0, mb:0}}
          >
            
            {/* <Stack direction="row" spacing={0}> */}
              // <Button
              //   size="small"
              //   onClick={handleToggle({type:'all'})}
              // >
              //   Select All
              // </Button>

            {/* </Stack> */}
          // </ListItem>

        // </List> */}
































{/* <CustomListItem
key={value}
// sx={{height:'25px'}}
disablePadding
dense
sx={{pt:0, pb:0, mt:0, mb:0}}
secondaryAction={
  <Button 
    variant="text" 
    size="small"
    onClick={handleToggle({type: 'only', value}) } 
  >
    Only
  </Button>
}
>
<ListItemButton role={undefined} onClick={handleToggle({type: 'checkbox', value}) } focusVisibleClassName='focused' dense sx={{pt:0, pb:0}}>
  <ListItemIcon>
    <Checkbox
      size="small"
      edge="start"
      checked={checked.indexOf(value) !== -1}
      tabIndex={-1}
      disableRipple
      inputProps={{ 'aria-labelledby': labelId }}
      sx={{pt:0, pb:0}}
    />
  </ListItemIcon>
  <ListItemText id={labelId} primary={`${value}`} />
</ListItemButton>
</CustomListItem> */}

// return (
//   <CustomListItem
//     key={value}
//     // sx={{height:'25px'}}
//     disablePadding
//     dense
//     sx={{pt:0, pb:0, mt:0, mb:0}}
//     // classes={{ container: classes.friendsListItem }}

//   >
//     <ListItemButton role={undefined} onClick={handleToggle({type: 'checkbox', value}) } focusVisibleClassName='focused' dense sx={{pt:0, pb:0}}>
//       <ListItemIcon>
//         <Checkbox
//           size="small"
//           edge="start"
//           checked={checked.indexOf(value) !== -1}
//           tabIndex={-1}
//           disableRipple
//           inputProps={{ 'aria-labelledby': labelId }}
//           sx={{pt:0, pb:0}}
//         />
//       </ListItemIcon>
//       <ListItemText id={labelId} primary={`${value}`} />
//       <CustomListItemSecondarySandbox>

//         only
//       </CustomListItemSecondarySandbox>
    
//     </ListItemButton>
//   </CustomListItem>
// );