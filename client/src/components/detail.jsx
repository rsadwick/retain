import React from 'react';
import { Link } from "react-router-dom";
function Detail(props) {
    let photoDetail = <span></span>
    if(props.hasPhoto){
        photoDetail = <img src={props.selectedItem.photos.output_url} width="100%" height="200" alt="" />
    }
    return (
        <div className="container">
            <div className="module">
                <h1>{props.selectedItem.title}</h1>
                <hr/>
                <p>
               
               
                <Link
                className="btn btn-info btn-sm"
                    to={"/set-item/" + props.selectedItem.id}>
                    Edit
                </Link>

                 <Link
                    className="btn btn-info btn-sm pull-right"
                    to={"/list/"}>
                    Back to List
                </Link>
                </p>

                <p>{photoDetail}</p>
                <p>Located at {props.locationTypeName} within {props.selectedItem.location.name}</p>
                <p>{props.selectedItem.description}</p>
            </div>
        </div>

    )
}

export default Detail;