import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Home extends Component {

  render() {
    var authButton = (this.props.errors.isNotLoggedIn) ? 
    <Link to={"/login"} className="btn btn-water btn-block">Login</Link>
    :
    <a onClick={this.props.handleLogoutSubmit} className="btn btn-attention btn-block">Logout</a>
    
    return (
      <div className="container">
        <div className="module">
          <Link to={"/search"} className="btn btn-water btn-block">Search for an Item</Link>
          <Link to={"/list"} className="btn btn-water btn-block">View Items</Link>
          <Link to={"/set-item"} className="btn btn-water btn-block">Create new Item</Link>
        </div>
        <hr/>
        {authButton}
      </div>
    );
  }
}

export default Home;
