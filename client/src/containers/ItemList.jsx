import React, { Component } from 'react';
import Items from '../components/items.jsx';
class ItemList extends Component {

  componentDidMount() {
    this.props.getItems();
  }

  render() {
    return (
      <div className="container">
        <Items items={this.props.items} isShared={this.props.isShared} isSearch={this.props.isSearch} errors={this.props.errors}/>
      </div>
    );
  }
}

export default ItemList;