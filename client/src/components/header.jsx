import React from 'react';
import { Link } from "react-router-dom";
function Header(props){
    return(
        <header className="App-header container">

            <div className="row">
                <div className="col-xs-2">
                <Link
                    to={"/"}>
                   <img src={props.logo} className="App-logo" alt="logo" />
                </Link>

                </div>
                <div className="col-xs-10">
                    <h1 className="app-title">Retain</h1>
                </div>
            </div>

        </header>
    )
}

export default Header;



