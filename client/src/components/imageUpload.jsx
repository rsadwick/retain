import React from 'react';
function ImageUpload(props){
    let images = '';
    let deleteBtn = '';
    if(props.images){

        images = 
            <div>
                <img className="image-preview" src={props.images.output_url} alt="the content you uploaded" />
            </div>

        deleteBtn = 
            <span><hr/><button onClick={props.onImageRemoval} type="button" className="btn btn-danger">remove</button></span>
            
    }
    
    return(

        <div className="row">
            <div className="col-xs-3">
                {images}
            </div>

            <div className="col-xs-9">
                <input type="file" name="file" className="input-upload-file" onChange={props.onImageChange} />
                {deleteBtn}
            </div>
            
        </div>
    )
}

export default ImageUpload;



