import React, { Component } from 'react';

class Error extends Component {

  render() {
    return (
      <div className="container">
     
        <div className="module">
            <p>We are having problems connecting to the internet from your device.  
                Please check your connection and try again.</p>
        </div>
      </div>

    );
  }
}

export default Error;
