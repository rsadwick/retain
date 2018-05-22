import React, { Component } from 'react';
import Detail from '../components/detail.jsx';

class ItemDetails extends Component {

  componentDidMount() {
    this.props.getItemDetailById(this.props.match.params.id);
  }

  render() {
    let hasPhoto = false;
    if(this.props.selectedItem && this.props.selectedItem.photos){
      hasPhoto = true;
    }
    if (this.props.selectedItem) {
      let locationTypeName = this.props.getLocationTypeByName(this.props.selectedItem.location.location_type)
      return (
        <div>
          <Detail selectedItem={this.props.selectedItem} hasPhoto={hasPhoto} locationTypeName={locationTypeName} />
        </div>
      );
    }
    else {
      return (
        <div></div>
      )
    }

  }
}

export default ItemDetails;