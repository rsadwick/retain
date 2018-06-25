import React from 'react';
function SelectOptions(props) {
    let options = props.locations.map(function(option, index){
        return(
            <option key={option.id} value={option.name} name={option.name}>{option.name}</option>
        )
    })
  return (

    <select id={props.id} 
            className="form-control"
            name='name'
            value={props.selected} 
            onBlur={props.onChange}
            onChange={props.onChange}>
            {options}
    </select>

  )
}

export default SelectOptions;