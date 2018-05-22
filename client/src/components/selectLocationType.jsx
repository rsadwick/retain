import React from 'react';
function SelectLocationType(props) {
    let options = props.locations.map(function(option, index){
        return(
            <option key={option.id} value={option.id} name={option.name}>{option.name}</option>
        )
    })
  return (

    <select id={props.id} 
            className="form-control"
            name='location_type'
            value={props.selected} 
            onChange={props.onChange}>
            {options}
    </select>

  )
}

export default SelectLocationType;