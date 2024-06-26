import React, {useEffect, useState, useContext} from 'react';

import AppContext from '../context/AppContext'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectVariants(props) {
  const context = useContext(AppContext)
  const [age, setAge] = React.useState('');
  const [dateListOne, setDateListOne] = useState(props.stationDates)
  const [selectValue, setSelectValue] = useState('')
  // console.log('station dates', props.stationDates, 'station', props.station, 'id', props.id)

  useEffect(()=>{
    // console.log(context.stationCompareDates, context.stationCompareDates[props.station][props.id])
    // console.log('props here', props)
    if(props.id && props.station && props.station!=='bulk' && context.stationCompareDates && context.dataType){

      const type = context.stationCompareDates[props.station][context.dataType][props.id] ?context.stationCompareDates[props.station][context.dataType][props.id]  : ''
      setSelectValue(type)
    }
    if(props.station === 'bulk'){

    } 
  },[context.stationCompareDates, props, context.dataType])

  useEffect(()=>{
    if(props.station === 'bulk' && props.id){
      if(context.bulkDates.selectedDates[props.id]){
        setSelectValue(context.bulkDates.selectedDates[props.id])
      }
    }
  },[context.bulkDates, props, context.dataType])

  const handleChange = (event) => {
    setAge(event.target.value);
    // console.log('onchange select dispatch');
    context.dispatchSetStationCompareDates({type: props.station === 'bulk' ? 'bulkSet' : 'setDate', payload: {station: props.station, dateId: props.id, dataType: context.dataType, setDate: event.target.value}})
    if(props.station === 'bulk'){
      console.log('dispatching from dateselectcomponent line 43')
      context.dispatchBulkDatesUpdate({
        type: 'bulkSet', 
        payload: {dateId: props.id, setDate: event.target.value}
      })
    }


    // context.
  };
  // const handleFormat = (newFormats, stateKey, dispatchFn) => {
  //   if(newFormats){
  //     dispatchFn({type: stateKey, payload: newFormats})
  //   }
  // };
  const otherId = props.id === 'date1' ? 'date2' : 'date1'
  // console.log('otherid', otherId)
  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 80 }}  size="small">
        <InputLabel 
          sx={{
              fontSize: '0.9rem',
            // fontSize:'18px'
            '& .MuiInputLabel': {
              fontSize: '0.1rem',
              color:'pink'
            }
            }} 
          id="demo-simple-select-standard-label"
        >
          {props.label}
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={selectValue}
          onChange={handleChange}
          // onChange={(event)=>{console.log('onchange select dispatch');return context.dispatchSetStationCompareDates({type: props.station === 'bulk' ? 'bulkSet' : 'setDate', payload: {station: props.station, dateId: props.id, dataType: context.dataType, setDate: event.target.value}})}}
          label={props.label}
        >
        {
          dateListOne.map((currDate, i) =>{
            {/* console.log('datelist', context.stationCompareDates[props.station][props.id]) */}
            {/* const setDate = context.stationCompareDates[props.station][props.id] */}
            const otherDate =  props.station !== 'bulk' ? context.stationCompareDates[props.station][otherId] : null
            {/* console.log('currDate', currDate, 'otherdate', otherDate) */}
            const isDisabled = otherDate === currDate ? true : false
            {/* const selectedDate = context.stationCompareDates[props.station][props.id] */}
            return <MenuItem key={i} value={currDate} disabled={isDisabled}>{currDate}</MenuItem>
            {/* if(currDate !== selectedDate){

            } */}
          })
        }
          {/* <MenuItem value="">
            <em>Nonert</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>
      </FormControl>
    </div>
  );
}

{/* <FormControl fullWidth>
  <InputLabel variant="standard" htmlFor="uncontrolled-native">
    Age
  </InputLabel>
  <NativeSelect
    defaultValue={30}
    inputProps={{
      name: 'age',
      id: 'uncontrolled-native',
    }}
  >
    <option value={10}>Ten</option>
    <option value={20}>Twenty</option>
    <option value={30}>Thirty</option>
  </NativeSelect>
</FormControl> */}
// #demo-simple-select-standard
// <label class
// ="MuiInputLabel-root 
// MuiInputLabel-formControl
//  MuiInputLabel-animated
//   MuiInputLabel-sizeSmall
//    MuiInputLabel-standard
//     MuiFormLabel-root 
//     MuiFormLabel-colorPrimary
//      css-4f56uo-MuiFormLabel-root-MuiInputLabel-root" data-shrink="false" id="demo-simple-select-standard-label">Date 2</label>




// .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root

// document.querySelector("#demo-simple-select-standard")


// <div tabindex="0" role="button" aria-expanded="false" aria-haspopup="listbox" aria-labelledby=
// "demo-simple-select-standard-label demo-simple-select-standard"
//  id="demo-simple-select-standard" 
//  class="MuiSelect-select MuiSelect-standard MuiInput-input MuiInputBase-input 
//  MuiInputBase-inputSizeSmall css-jd1zyo-MuiSelect-select-MuiInputBase-input-MuiInput-input">
//  <span class="notranslate">​</span></div>