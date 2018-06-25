import React, { Component } from 'react';
import SelectOptions from '../components/selectOptions.jsx';
import SelectLocationType from '../components/selectLocationType.jsx';
import ImageUpload from '../components/imageUpload.jsx';
import CsrfToken from '../components/djangoCsrfToken.jsx';
import DeleteComponent from '../components/deleteItem.jsx';
import { Redirect } from "react-router-dom";

class SetItemForm extends Component {

    componentDidMount() {
       
        if(this.props.isEdit){
            this.props.getItemById(this.props.match.params.id);
        }
        else{
            this.props.getLocations();
        }
    }

    componentWillMount(){
        if(this.props.model.isDeleted && this.props.isEdit){
            this.props.onDeleteComplete();
        }
    }

    render() {
        if(this.props.errors.isNotLoggedIn){
            return <Redirect to='/login' />;
        }

        if(this.props.model.isDeleted && this.props.isEdit){
            return <Redirect to='/list' />;
        }

        let itemSaved = (this.props.model.isSaved) ? <div className="alert alert-success" role="alert">{this.props.model.title} has been saved.</div> : '';

        var selectedLocation = this.props.model.location.name;
        
        return (
            <div className="container">
            <form onSubmit={this.props.onSubmit} className="module">
            {itemSaved}
            <CsrfToken csrftoken={this.props.csrftoken}/>

                 <div className="form-group">
                    <label>Name</label>
                    <input
                        className="form-control"
                        name="title"
                        type="string"
                        value={this.props.model.title}
                        onChange={this.props.onChange} />
                </div>

                <div className="form-group">
                    <label>add photo:</label>
                        
                    <ImageUpload    
                        images={this.props.model.photos} 
                        onChange={this.props.onChange}
                        onLoadEnd={this.props.onLoadEnd}
                        onImageChange={this.props.onImageChange}
                        onImageUploadComplete={this.props.onImageUploadComplete}
                        onImageRemoval={this.props.onImageRemoval}
                    />
                    
                </div>
                <div className="form-group">
                    <label>Location Type:</label>
                    <SelectLocationType locations={this.props.locationTypes.types} onChange={this.props.onChange} selected={this.props.model.location.location_type}/>
                </div>
                
                <div className="form-group">
                    <label>location:</label>
                    <SelectOptions locations={this.props.locations} onChange={this.props.onChange} selected={selectedLocation} />   
                </div>

                 <div className="form-group">
                    <label>
                        description: </label>
                        <textarea
                            className="form-control"
                            name="description"
                            type="string"
                            value={this.props.model.description}
                            onChange={this.props.onChange} />
                   
                </div>

                <button type="submit" className="btn btn-water btn-block">Save</button>
                <DeleteComponent isEdit={this.props.isEdit} 
                                 isMarkedForDelete={this.props.model.isMarkedForDelete}
                                 onMarkItemForDelete={this.props.onMarkItemForDelete}
                                 onUnmarkItemForDelete={this.props.onUnmarkItemForDelete}
                                 onDelete={this.props.onDelete}
                                 title={this.props.model.title} />

            </form>
        </div>
        );
    }
}

export default SetItemForm;
