import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import './index.css';

import App from './App';

import registerServiceWorker from './registerServiceWorker';

function initApp() {
    // Render the main app react component into the app div.
    // For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
    ReactDOM.render(<App />, document.getElementById('root')); 
}

// The usingCordova function returns true if cordova is in the window
if(window.cordova){
    // Init app on device ready
    document.addEventListener("deviceready", () => {
        initApp();
    }, false);
}
else{
    // Init app immediately
    initApp();
}


registerServiceWorker();