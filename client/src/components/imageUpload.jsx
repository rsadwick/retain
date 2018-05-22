import React from 'react';
function ImageUpload(props){
    let images = "None";
    if(props.images){

        images = 
            <div>
                <img width="50px" height="50px" src={props.images.output_url} alt="of yours" />
            </div>
    }
    
    return(

        <div className="row">
            <div className="col-xs-2">
                {images}
            </div>

            <div className="col-xs-10">
                <input type="file" name="file" onChange={props.onImageChange} />
            </div>
        </div>
    )
}

export default ImageUpload;



