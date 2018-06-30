import React, { Component } from 'react';

class About extends Component {

  render() {
    return (
      <div className="container">
     
        <div className="module">
            <h2>About</h2>
            <p>Retainer is published by <a onClick={this.props.handleAboutThirdEye} href="https://3ee.com/">3EE.COM</a></p>
            <hr/>
            <h2>Thank You</h2>
            <p>Thank you for using Retainer!  Feel free to rate this app anytime you want.  If you have any problems, contact us
                through our website above for support.
            </p>
            <hr/>
            <h2>Credits</h2>
            <p><strong>Producer</strong>: Bennie Ficarrotta </p>
            <p><strong>Engineer</strong>: Ryan Sadwick</p>
            <p><strong>Splash screen</strong>: Photo by Charlie Harutaka on Unsplash</p>
        </div>
      </div>

    );
  }
}

export default About;
