import React from 'react';
function djangoCsrfToken(props){
    return(
        <input type="hidden" name="csrfmiddlewaretoken" value={props.csrftoken} />
    )
}

export default djangoCsrfToken;



