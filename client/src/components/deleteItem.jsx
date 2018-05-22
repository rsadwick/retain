import React from 'react';
function deleteItem(props){
    function renderDeleteButton(){
        return (
        <span>
            <hr/>
            <button onClick={props.onMarkItemForDelete} type="button" className="btn btn-attention btn-block">Delete</button>
        </span>);
    }

    function renderDeleteConfirmation(){
        return( 
        <div>
            <hr/>
            <h3>Are you sure you want to delete {props.title}?</h3>
            <div className="btn-group btn-group-lg btn-group-justified" role="group" aria-label="...">
                
                <div className="btn-group" role="group">    
                    <button onClick={props.onUnmarkItemForDelete} type="button" className="btn btn-default">Cancel</button>
                </div>

                <div className="btn-group" role="group">
                    <button onClick={props.onDelete} type="button" className="btn btn-danger">Delete</button>
                </div>
            </div>
        </div>
        );
    }

    function determineComponentToRender(){
        if(props.isEdit && !props.isMarkedForDelete){
            return renderDeleteButton();
        }
        else if(props.isEdit && props.isMarkedForDelete){
            return renderDeleteConfirmation();
        }

        return null; 
    }
   
    let html = determineComponentToRender();
    
    return (
        html
    ); 
}

export default deleteItem;