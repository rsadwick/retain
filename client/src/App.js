import React, { Component } from "react";

import logo from "./img/logo.svg";
import "./App.css";

import ItemApi from "./api/itemService.js";
import ItemsSetFormApi from "./api/setItemFormModel.js";
import LoginFormApi from "./api/loginFormModel.js";
import DeviceSupportModel from "./api/deviceSupportModel.js";
import LocationTypeModel from "./api/locationTypeModel.js";
import ErrorModel from "./api/errorModel.js";

import Header from "./components/header.jsx";
import List from "./containers/ItemList.jsx";
import ItemDetails from "./containers/ItemDetails.jsx";
import Home from "./containers/Home.jsx";
import SetItemForm from "./containers/SetItemForm.jsx";
import SearchItemsForm from "./containers/SearchItemsForm.jsx";
import LoginForm from "./containers/LoginForm.jsx";
import SignUpForm from "./containers/SignUpForm.jsx";
import Error from "./containers/Error.jsx";

import initReactFastclick from 'react-fastclick';

import { HashRouter as Router, Route  } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      selectedItem: null,
      setItemFormModel: ItemsSetFormApi.get(),
      locations: [],
      searchTerm: '',
      profile: LoginFormApi.get(),
      token: '',
      device: DeviceSupportModel.get(),
      locationTypeModel: LocationTypeModel.get(),
      errors: ErrorModel.get()
      
    };

    initReactFastclick();

    this.csrftoken = '';

    this.getItems = this.getItems.bind(this);
    this.getItemDetailById = this.getItemDetailById.bind(this);
    this.getItemById = this.getItemById.bind(this);

    this.handleInputSetItemChange = this.handleInputSetItemChange.bind(this);
    this.handleInputSetItemSubmit = this.handleInputSetItemSubmit.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.getLocations = this.getLocations.bind(this);
    this.handleImageUploadComplete = this.handleImageUploadComplete.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.onVoiceRecordClick = this.onVoiceRecordClick.bind(this);
    this.onVoiceStopClick = this.onVoiceStopClick.bind(this);
    this.onVoiceRecordSuccess = this.onVoiceRecordSuccess.bind(this);
    this.onVoiceRecordError = this.onVoiceRecordError.bind(this);
    this.onDevice = this.onDevice.bind(this);
    this.handleLocationTypeChange = this.handleLocationTypeChange.bind(this);
    this.getLocationTypeByName = this.getLocationTypeByName.bind(this);
    this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
    this.handleLogoutSubmit = this.handleLogoutSubmit.bind(this);
    this.handleItemDelete = this.handleItemDelete.bind(this);
    this.markItemForDelete = this.markItemForDelete.bind(this);
    this.unMarkItemForDelete = this.unMarkItemForDelete.bind(this);
    this.deleteItemComplete = this.deleteItemComplete.bind(this);
  }

  componentDidMount() {    
    ItemApi.getCsrfServerSide().then(data => {
      this.setState({ token: data.items });
    });
  }

  //api methods
  getItems() {
    ItemApi.requestItems().then(data => {
      var errorModel = this.state.errors;
      if(data.errors){
        errorModel.isNotLoggedIn = true;
        this.setState({ errors: errorModel });
      }
      else{
        errorModel.isNotLoggedIn = false;
        this.setState({ errors: errorModel });
        this.setState({ items: data.items });
      }
    });
  }

  getItemById(id){
    let itemId = Number(id);

    ItemApi.requestItemById(itemId).then(data =>{
      this.setState({ setItemFormModel: data.item });   
      this.getLocations();
    });
  }

  getItemDetailById(id) {
    let itemId = Number(id);
    let item = ItemApi.getByCacheFromId(itemId);
    //if there isn't an item - request it:
    if(!item){
      ItemApi.requestItems().then(data => {
        
        this.setState({ items: data.items });
        item = ItemApi.getByCacheFromId(itemId);
        this.setState({ selectedItem: item });
      });
    }

    this.setState({ selectedItem: item });
  }

  getLocations() {
    var locationTypeId = this.state.setItemFormModel.location.location_type;
    var errorModel = this.state.errors; 
    
    if(locationTypeId === 0){locationTypeId = 1;}

    ItemApi.searchByLocationType(locationTypeId).then(data => {
      if(data.error){
        errorModel.isNotLoggedIn = true;
        this.setState({ errors: errorModel });

      }
      else{
        errorModel.isNotLoggedIn = false;
        this.setState({ errors: errorModel });
        this.setState({ locations: data.items });
      }
      
    });
  }

  //set item form methods

  handleInputSetItemChange(event) {
    var model = this.state.setItemFormModel;
    var field = event.target;
    var value = field.value;
 
    if (field.type === 'checkbox') {
      value = field.checked;
    }

    else if (field.type === 'select-one') {

      if(field.name === 'location_type'){
        ItemApi.searchByLocationType(value).then(data => {  
          var locationTypeModel = this.state.locationTypeModel;    
          model.location[field.name] = value;
          this.setState({ locationTypeModel: locationTypeModel });
          this.setState({ locations: data.items });
        });
      }
      else{
        model.location[field.name] = value;
      }
    }

    else {
      model[field.name] = value;
    }

    model.token = this.state.token;

    this.setState({ setItemFormModel: model });
  }

  handleImageUploadComplete(data){
    let model = this.state.setItemFormModel;
    let photos =  this.state.setItemFormModel.photos;
    photos.photo_guid = data.photo_guid;
    photos.output_url = data.output_url;
    
    model.photos = photos;
    
    this.setState({ setItemFormModel: model });   
  }

  handleImageChange(event){
    let model = this.state.setItemFormModel;
    let reader = new FileReader();
    let file = event.target.files[0];

    if (file && file.type.match('image.*')) {
      reader.readAsDataURL(file);
    }

    reader.onloadend = () => {
      let photos =  {output_url: file, input_url: reader.result};
      model.photos = photos;
      ItemApi.setImage(model, this.state.token, this.handleImageUploadComplete);
      this.setState({ setItemFormModel: model });    
    }     
  }

  handleInputSetItemSubmit(event) {
    event.preventDefault();
    let errorModel = this.state.errors;
    ItemApi.getCsrfServerSide().then(data => {
      this.setState({ token: data.items });
      ItemApi.setItem(this.state.setItemFormModel, this.state.token).then(request => {  
        if(request.items){
          request.items.isSaved = true;
          this.setState({ setItemFormModel: request.items });   
        }
        else{
          errorModel.isNotLoggedIn = true;
          this.setState({errors : errorModel});
        }
      });
    });
    
  }

  handleSearchChange(event){
    var field = event.target;
    var value = field.value;

    this.setState({ searchTerm: value });
  }

  handleSearchSubmit(event){
    event.preventDefault();
    var searchTerm = this.state.searchTerm;
    ItemApi.searchItems(searchTerm).then(data => {
      this.setState({ items: data.items });
    });
  }

  handleLocationTypeChange(event){
    event.preventDefault();
    var field = event.target;
    var value = field.value;
    var model = this.state.locationTypeModel;

    ItemApi.searchByLocationType(value).then(data => {      
      this.setState({ locationTypeModel: model });
      this.setState({ locations: data.items });
    });
  }

  handleLoginChange(event){
    var model = this.state.profile;
    var field = event.target;
    var value = field.value;
 
    model[field.name] = value;

    this.setState({ profile: model });
  }

  handleLoginSubmit(event){
    event.preventDefault();
    
    let profileModel = this.state.profile;
    let errorModel = this.state.errors; 

    //get a new token
    ItemApi.getCsrfServerSide().then(data => {
      if(data.error){
        errorModel.isNotConnected = data.error;
        this.setState({errors: errorModel});
      }
      else{
        
        this.setState({ token: data.items });

        profileModel.token = this.state.token;
        
          //login with that token
        ItemApi.login(profileModel).then(request => {  
          profileModel.isLoggedIn = request.data.success;
          profileModel.redirect = request.data.redirect;

          if(request.data.success){
            errorModel.isNotConnected = false;
            errorModel.isNotLoggedIn = false;
          }
          else{
            errorModel.errorOnLogin = true;
          }

          this.setState({errors : errorModel});
          this.setState({profile : profileModel});

        }); 
      }
    });
  }

  markItemForDelete(event){
    var itemModel = this.state.setItemFormModel;
    itemModel.isMarkedForDelete = true;
    this.setState({ setItemFormModel: itemModel }); 
  }

  unMarkItemForDelete(event){
    var itemModel = this.state.setItemFormModel;
    itemModel.isMarkedForDelete = false;
    this.setState({ setItemFormModel: itemModel }); 
  }

  deleteItemComplete(){
    let itemModel = this.state.setItemFormModel;
    itemModel.isDeleted = false;
    this.setState({ setItemFormModel: itemModel }); 
  }

  handleItemDelete(event){
    event.preventDefault();
    let itemModel = this.state.setItemFormModel;
    let profileModel = this.state.profile;

    ItemApi.deleteItem(this.state.setItemFormModel.id, profileModel).then(request => {  
      
      itemModel.isDeleted = true;
      this.setState({ setItemFormModel: itemModel }); 
     /* if(request.success){
        profileModel.isLoggedIn = false;
        errorModel.isNotConnected = false;
        errorModel.isNotLoggedIn = true;
        
      }
      else{
        errorModel.isNotConnected = false;
      }
      this.setState({profile : profileModel});
      this.setState({errors : errorModel});
      */
    });

  }

  handleLogoutSubmit(event){
    ItemApi.logout().then(request => {  
      let profileModel = this.state.profile;
      let errorModel = this.state.errors; 

      if(request.success){
        profileModel.isLoggedIn = false;
        errorModel.isNotConnected = false;
        errorModel.isNotLoggedIn = true;
        
      }
      else{
        errorModel.isNotConnected = false;
      }
      this.setState({profile : profileModel});
      this.setState({errors : errorModel});
      
    });
  }

  handleSignUpSubmit(event){
    event.preventDefault();

    ItemApi.getCsrfServerSide().then(data => {
      this.setState({ token: data.items });

      var profile = this.state.profile;
      profile.token = this.state.token;
      ItemApi.signup(profile);
    });
  }

  onVoiceRecordClick(event){
    console.log('voice check');
    let options = {
       language: "en-US",
       matches: 5,
       prompt: "",      //Android only
       showPopup: true,  //Android only
       showPartial : false
    }

    var model = this.state.device;
    model.isRecording = true;
    this.setState({ device: model });
    var scope = this;
    
    window.plugins.speechRecognition.startListening(
      function(result){
        scope.setState({ searchTerm: result[0] });
        console.log(result);
      },

      function(errormsg){
        console.log(errormsg);
      }, 

      options
    );
  }

  onVoiceStopClick(){
    var model = this.state.device;
    var scope = this;
    window.plugins.speechRecognition.stopListening(
      function(){
        model.isRecording = false;
        scope.setState({ device: model });
      },
      
      function(){
        console.log('error in the stop')
      }
    )
  }

  onVoiceRecordSuccess(){
    console.log('yes we goood!');
  }

  onVoiceRecordError(){
    console.log('error');
  }

  onDevice(){
    var model = this.state.device;

    if(window.cordova){
      model.isCordova = true;
      model.platform = window.device.platform;

      if(window.device.platform === 'Android'){
        model.isAndroid = true;
      }

      window.plugins.speechRecognition.requestPermission(
        function(){
          console.log("requested permission granted");        
          model.hasVoiceFeatures = true;
        }, 
        function(){
          model.hasVoiceFeatures = false;
        });
    }

    this.setState({ device: model });
  }

  getLocationTypeByName(id){
    return ItemApi.getLocationTypeByName(id, LocationTypeModel.get().types);
  }

  render() {

    return (
      <Router>
        <div className="boatr-container">
          <Header logo={logo} />

          <Route exact path="/"  
            render={() => (
                <Home profile={this.state.profile} errors={this.state.errors} handleLogoutSubmit={this.handleLogoutSubmit}
              />
            )} />

          <Route
            path="/list"
            render={() => (
              <List getItems={this.getItems} items={this.state.items} errors={this.state.errors} />
            )}
          />

          <Route
            path="/search"
            render={() => (
              <SearchItemsForm getItems={this.getItems}
                               items={this.state.items} 
                               onDevice={this.onDevice}
                               searchTerm={this.state.searchTerm}
                               onChange={this.handleSearchChange} 
                               onSubmit={this.handleSearchSubmit}
                               onTap={this.onVoiceRecordClick}
                               onClick={this.onVoiceRecordClick}
                               onStopClick={this.onVoiceStopClick}
                               hasVoiceFeatures={this.state.device.hasVoiceFeatures}
                               isAndroid={this.state.device.isAndroid}
                               isRecording={this.state.device.isRecording}
                               errors={this.state.errors}
                                />
            )}
          />

          <Route
            path="/detail/:id"
            render={props => (
              <ItemDetails
                getItemDetailById={this.getItemDetailById}
                selectedItem={this.state.selectedItem}
                getLocationTypeByName={this.getLocationTypeByName}
                {...props}
              />
            )}
          />

          <Route
            exact
            path="/set-item/"
            render={() => (
              <SetItemForm
                model={this.state.setItemFormModel}
                isEdit={false}
                locationOptions={this.state.locationOptions}
                getLocations={this.getLocations}
                locations={this.state.locations}
                onChange={this.handleInputSetItemChange}
                onSubmit={this.handleInputSetItemSubmit}
                onImageChange={this.handleImageChange}
                onImageUploadComplete={this.handleImageUploadComplete}
                csrftoken={this.state.token}
                onSearchLocationTypeChange={this.handleLocationTypeChange}
                locationTypes={this.state.locationTypeModel}
                errors={this.state.errors}
              />
            )}
          />

           <Route
            exact
            path="/set-item/:id"
            render={ props => (
              <SetItemForm
                model={this.state.setItemFormModel}
                isEdit={true}
                locationOptions={this.state.locationOptions}
                locations={this.state.locations}
                getItemById={this.getItemById}
                onChange={this.handleInputSetItemChange}
                onSubmit={this.handleInputSetItemSubmit}
                onImageChange={this.handleImageChange}
                onImageUploadComplete={this.handleImageUploadComplete}
                csrftoken={this.state.token}
                onSearchLocationTypeChange={this.handleLocationTypeChange}
                locationTypes={this.state.locationTypeModel}
                errors={this.state.errors}
                onDelete={this.handleItemDelete}
                onMarkItemForDelete={this.markItemForDelete}
                onUnmarkItemForDelete={this.unMarkItemForDelete}
                onDeleteComplete={this.deleteItemComplete}
                {...props}
              />
            )}
          />

          <Route
            exact
            path="/login/"
            render={() => (
              <LoginForm
                model={this.state.profile}
                onChange={this.handleLoginChange}
                onSubmit={this.handleLoginSubmit}
                csrftoken={this.state.token}
                errors={this.state.errors}
                onDevice={this.onDevice}
              />
            )}
          />

          <Route
            exact
            path="/create-account/"
            render={() => (
              <SignUpForm
                model={this.state.profile}
                onChange={this.handleLoginChange}
                onSubmit={this.handleSignUpSubmit}
                csrftoken={this.state.token}
              />
            )}
          />

           <Route
            exact
            path="/error/"
            render={() => (
              <Error
              
              />
            )}
          />

        </div>
      </Router>

      
    );
  }
}

export default App;
